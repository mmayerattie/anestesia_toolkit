/**
 * RxNorm API wrapper — NIH, free, no API key required.
 * https://rxnav.nlm.nih.gov/REST
 *
 * Used to resolve drug names to RxCUIs and fetch interaction data.
 */

const RXNORM_BASE = 'https://rxnav.nlm.nih.gov/REST';
const TIMEOUT_MS = 10_000;

/** Internal fetch helper with 10-second abort timeout. */
async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Resolve a drug name to an RxCUI.
 *
 * Priority: use the `knownRxcui` from the local Drug object when available,
 * falling back to an API lookup only when necessary.
 */
export async function getRxCui(
  drugName: string,
  knownRxcui?: string,
): Promise<string | null> {
  // Fast path — the local drug list already has the RxCUI
  if (knownRxcui) return knownRxcui;

  try {
    const url = `${RXNORM_BASE}/rxcui.json?name=${encodeURIComponent(drugName)}`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) return null;

    const data = await res.json();

    // Response shape: { idGroup: { rxnormId: ["12345"] } }
    const ids: string[] | undefined = data?.idGroup?.rxnormId;
    if (ids && ids.length > 0) return ids[0];

    return null;
  } catch {
    // Network / timeout / parse error — caller handles gracefully
    return null;
  }
}

/** Structured interaction data parsed from the RxNorm response. */
export interface RxNormInteraction {
  drug1Name: string;
  drug2Name: string;
  severity: string | null;
  description: string;
  source: string | null;
}

/**
 * Get interactions between a list of RxCUIs.
 *
 * Uses the /interaction/list.json endpoint which accepts multiple RxCUIs
 * separated by `+` and returns all pairwise interactions found.
 *
 * Returns an empty array if the API fails or there are no interactions.
 */
export async function getInteractions(
  rxcuis: string[],
): Promise<RxNormInteraction[]> {
  if (rxcuis.length < 2) return [];

  try {
    const joined = rxcuis.join('+');
    const url = `${RXNORM_BASE}/interaction/list.json?rxcuis=${joined}`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) return [];

    const data = await res.json();
    return parseInteractionResponse(data);
  } catch {
    return [];
  }
}

/**
 * Get interactions for a single pair of RxCUIs.
 *
 * This is more targeted than getInteractions and useful when querying
 * one pair at a time for caching purposes.
 */
export async function getInteractionPair(
  rxcui1: string,
  rxcui2: string,
): Promise<RxNormInteraction[]> {
  try {
    const url = `${RXNORM_BASE}/interaction/list.json?rxcuis=${rxcui1}+${rxcui2}`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) return [];

    const data = await res.json();
    return parseInteractionResponse(data);
  } catch {
    return [];
  }
}

/**
 * Parse the nested RxNorm interaction response into flat interaction objects.
 *
 * Response structure (simplified):
 * {
 *   fullInteractionTypeGroup: [{
 *     fullInteractionType: [{
 *       interactionPair: [{
 *         severity: "high" | "N/A" | ...,
 *         description: "...",
 *         interactionConcept: [
 *           { minConceptItem: { name: "drug1", rxcui: "..." } },
 *           { minConceptItem: { name: "drug2", rxcui: "..." } }
 *         ]
 *       }]
 *     }]
 *   }]
 * }
 */
function parseInteractionResponse(data: unknown): RxNormInteraction[] {
  const results: RxNormInteraction[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const root = data as any;
  const groups = root?.fullInteractionTypeGroup;
  if (!Array.isArray(groups)) return results;

  for (const group of groups) {
    const sourceName: string | null = group?.sourceName ?? null;
    const types = group?.fullInteractionType;
    if (!Array.isArray(types)) continue;

    for (const type of types) {
      const pairs = type?.interactionPair;
      if (!Array.isArray(pairs)) continue;

      for (const pair of pairs) {
        const concepts = pair?.interactionConcept;
        if (!Array.isArray(concepts) || concepts.length < 2) continue;

        const drug1Name: string =
          concepts[0]?.minConceptItem?.name ?? 'Desconocido';
        const drug2Name: string =
          concepts[1]?.minConceptItem?.name ?? 'Desconocido';
        const severity: string | null = pair?.severity ?? null;
        const description: string = pair?.description ?? '';

        results.push({
          drug1Name,
          drug2Name,
          severity,
          description,
          source: sourceName,
        });
      }
    }
  }

  return results;
}
