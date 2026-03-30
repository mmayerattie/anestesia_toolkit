/**
 * OpenFDA API wrapper — free, no key required (1000 req/day limit).
 * https://api.fda.gov
 *
 * Used to fetch the drug_interactions section from FDA drug labels.
 */

const OPENFDA_BASE = 'https://api.fda.gov/drug/label.json';
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
 * Fetch the drug_interactions label text for a given drug name.
 *
 * Returns the raw interaction text from the FDA label, or null if
 * not found, rate-limited, or on error.
 */
export async function getDrugInteractionLabel(
  drugName: string,
): Promise<string | null> {
  try {
    const query = encodeURIComponent(drugName);
    const url = `${OPENFDA_BASE}?search=drug_interactions:${query}&limit=1`;
    const res = await fetchWithTimeout(url);

    // 429 = rate limited — throw so the caller knows OpenFDA failed
    if (res.status === 429) {
      throw new Error('OpenFDA rate limit reached (429). Intente mas tarde.');
    }

    if (!res.ok) return null;

    const data = await res.json();
    const results = data?.results;
    if (!Array.isArray(results) || results.length === 0) return null;

    const interactions = results[0]?.drug_interactions;
    if (!Array.isArray(interactions) || interactions.length === 0) return null;

    // The drug_interactions field is an array of strings; join them.
    return interactions.join(' ');
  } catch {
    // Network / timeout / parse error
    return null;
  }
}

/**
 * Search OpenFDA for interaction text mentioning two specific drugs.
 *
 * This narrows the search to labels that mention both drug names
 * in their drug_interactions section, providing more relevant results
 * for a specific pair.
 *
 * Returns the raw interaction text or null.
 */
export async function getPairInteractionLabel(
  drugName1: string,
  drugName2: string,
): Promise<string | null> {
  try {
    const q1 = encodeURIComponent(drugName1);
    const q2 = encodeURIComponent(drugName2);
    const url = `${OPENFDA_BASE}?search=drug_interactions:${q1}+AND+drug_interactions:${q2}&limit=1`;
    const res = await fetchWithTimeout(url);

    // 429 = rate limited — throw so the caller knows OpenFDA failed
    if (res.status === 429) {
      throw new Error('OpenFDA rate limit reached (429). Intente mas tarde.');
    }

    if (!res.ok) return null;

    const data = await res.json();
    const results = data?.results;
    if (!Array.isArray(results) || results.length === 0) return null;

    const interactions = results[0]?.drug_interactions;
    if (!Array.isArray(interactions) || interactions.length === 0) return null;

    return interactions.join(' ');
  } catch (err) {
    // Re-throw rate limit errors so the UI can display them
    if (err instanceof Error && err.message.includes('429')) throw err;
    return null;
  }
}
