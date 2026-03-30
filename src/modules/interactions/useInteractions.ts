import { useState, useCallback } from 'react';
import type { Drug, DrugInteraction, Severity } from '../../types';
import { getRxCui, getInteractionPair } from '../../services/rxnorm';
import { getPairInteractionLabel } from '../../services/openfda';
import { safeGetItem, safeSetItem } from '../../utils/storage';

// ── Cache helpers ───────────────────────────────────────────────────
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface CachedInteraction {
  interaction: DrugInteraction;
  timestamp: number;
}

/** Build a deterministic cache key for a drug pair (sorted alphabetically). */
function cacheKey(name1: string, name2: string): string {
  const sorted = [name1, name2].sort((a, b) => a.localeCompare(b));
  return `interaction_${sorted[0]}_${sorted[1]}`;
}

function getCached(name1: string, name2: string): DrugInteraction | null {
  const key = cacheKey(name1, name2);
  const cached = safeGetItem<CachedInteraction | null>(key, null);
  if (!cached) return null;
  if (Date.now() - cached.timestamp > CACHE_TTL_MS) return null;
  return cached.interaction;
}

function setCache(interaction: DrugInteraction): void {
  const key = cacheKey(interaction.drug1, interaction.drug2);
  const entry: CachedInteraction = {
    interaction,
    timestamp: Date.now(),
  };
  safeSetItem(key, entry);
}

// ── Severity mapping ────────────────────────────────────────────────

/** Map raw severity / description text from RxNorm to our Severity enum. */
function mapSeverity(raw: string | null, description?: string): Severity {
  if (!raw && !description) return 'unknown';

  const combined = `${raw ?? ''} ${description ?? ''}`.toLowerCase();

  if (combined.includes('contraindicated')) return 'contraindicated';
  if (combined.includes('major') || combined.includes('high')) return 'major';
  if (combined.includes('moderate')) return 'moderate';
  if (combined.includes('minor') || combined.includes('low')) return 'minor';

  return 'unknown';
}

// ── Pair generation ─────────────────────────────────────────────────

/** Generate all unique pairs from a list of drugs. */
function generatePairs(drugs: Drug[]): [Drug, Drug][] {
  const pairs: [Drug, Drug][] = [];
  for (let i = 0; i < drugs.length; i++) {
    for (let j = i + 1; j < drugs.length; j++) {
      pairs.push([drugs[i], drugs[j]]);
    }
  }
  return pairs;
}

// ── Source error tracking ───────────────────────────────────────────
export interface SourceErrors {
  rxnorm: boolean;
  openfda: boolean;
}

// ── Hook ────────────────────────────────────────────────────────────

export function useInteractions() {
  const [selectedDrugs, setSelectedDrugs] = useState<Drug[]>([]);
  const [interactions, setInteractions] = useState<DrugInteraction[]>([]);
  const [loading, setLoading] = useState(false);
  const [sourceErrors, setSourceErrors] = useState<SourceErrors>({
    rxnorm: false,
    openfda: false,
  });

  // ── Drug selection management ──
  const addDrug = useCallback((drug: Drug) => {
    setSelectedDrugs((prev) => {
      if (prev.some((d) => d.name === drug.name)) return prev;
      return [...prev, drug];
    });
  }, []);

  const removeDrug = useCallback((name: string) => {
    setSelectedDrugs((prev) => prev.filter((d) => d.name !== name));
  }, []);

  const clearDrugs = useCallback(() => {
    setSelectedDrugs([]);
    setInteractions([]);
    setSourceErrors({ rxnorm: false, openfda: false });
  }, []);

  // ── Check interactions ──
  const checkInteractions = useCallback(
    async (bypassCache = false) => {
      if (selectedDrugs.length < 2) return;

      setLoading(true);
      setInteractions([]);
      setSourceErrors({ rxnorm: false, openfda: false });

      const pairs = generatePairs(selectedDrugs);
      const results: DrugInteraction[] = [];
      let anyRxnormFailed = false;
      let anyOpenfdaFailed = false;

      // Process each pair independently — never block on one pair failing
      await Promise.all(
        pairs.map(async ([drug1, drug2]) => {
          // Per-pair failure tracking for caching decisions
          let pairRxnormFailed = false;
          let pairOpenfdaFailed = false;

          // 1. Check cache first (unless forced bypass)
          if (!bypassCache) {
            const cached = getCached(drug1.name, drug2.name);
            if (cached) {
              results.push(cached);
              return;
            }
          }

          // 2. Resolve RxCUIs
          let rxcui1: string | null = null;
          let rxcui2: string | null = null;
          let rxnormInteraction: DrugInteraction | null = null;

          try {
            [rxcui1, rxcui2] = await Promise.all([
              getRxCui(drug1.name, drug1.rxcui),
              getRxCui(drug2.name, drug2.rxcui),
            ]);
          } catch {
            pairRxnormFailed = true;
            anyRxnormFailed = true;
          }

          // 3. Query RxNorm for interaction data if both RxCUIs resolved
          if (rxcui1 && rxcui2) {
            try {
              const rxResults = await getInteractionPair(rxcui1, rxcui2);
              if (rxResults.length > 0) {
                // Take the first (most relevant) interaction
                const rx = rxResults[0];
                rxnormInteraction = {
                  drug1: drug1.name,
                  drug2: drug2.name,
                  severity: mapSeverity(rx.severity, rx.description),
                  mechanism: extractMechanism(rx.description),
                  clinicalEffect: extractClinicalEffect(rx.description),
                  source: 'RxNorm',
                };
              }
            } catch {
              pairRxnormFailed = true;
              anyRxnormFailed = true;
            }
          } else if (!rxcui1 || !rxcui2) {
            pairRxnormFailed = true;
            anyRxnormFailed = true;
          }

          // 4. Query OpenFDA for supplementary label text
          let openfdaText: string | null = null;
          try {
            // Use English aliases for OpenFDA (it's an English-language API)
            const name1 = drug1.aliases[0] ?? drug1.name;
            const name2 = drug2.aliases[0] ?? drug2.name;
            openfdaText = await getPairInteractionLabel(name1, name2);
          } catch {
            pairOpenfdaFailed = true;
            anyOpenfdaFailed = true;
          }

          // 5. Build the final interaction object
          let interaction: DrugInteraction;

          if (rxnormInteraction) {
            // Supplement RxNorm data with OpenFDA text if available
            interaction = {
              ...rxnormInteraction,
              clinicalEffect:
                rxnormInteraction.clinicalEffect ??
                (openfdaText ? truncate(openfdaText, 300) : null),
            };
          } else if (openfdaText) {
            // Only OpenFDA returned data
            interaction = {
              drug1: drug1.name,
              drug2: drug2.name,
              severity: 'unknown',
              mechanism: null,
              clinicalEffect: truncate(openfdaText, 300),
              source: 'OpenFDA',
            };
          } else {
            // No interaction found in any source
            interaction = {
              drug1: drug1.name,
              drug2: drug2.name,
              severity: 'none',
              mechanism: null,
              clinicalEffect: null,
              source: 'unknown',
            };
          }

          // 6. Cache only if BOTH sources responded for this pair
          // Never cache 'none' results when a source failed — we might be missing data
          if (
            interaction.severity !== 'none' ||
            (!pairRxnormFailed && !pairOpenfdaFailed)
          ) {
            setCache(interaction);
          }

          results.push(interaction);
        }),
      );

      // Sort: contraindicated first, then major, moderate, minor, unknown, none
      const severityOrder: Record<Severity, number> = {
        contraindicated: 0,
        major: 1,
        moderate: 2,
        minor: 3,
        unknown: 4,
        none: 5,
      };
      results.sort(
        (a, b) => severityOrder[a.severity] - severityOrder[b.severity],
      );

      setInteractions(results);
      setSourceErrors({
        rxnorm: anyRxnormFailed,
        openfda: anyOpenfdaFailed,
      });
      setLoading(false);
    },
    [selectedDrugs],
  );

  return {
    selectedDrugs,
    interactions,
    loading,
    sourceErrors,
    addDrug,
    removeDrug,
    clearDrugs,
    checkInteractions,
  };
}

// ── Text helpers ────────────────────────────────────────────────────

/** Truncate text to maxLen characters, adding ellipsis if truncated. */
function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + '...';
}

/**
 * Extract a mechanism substring from an RxNorm interaction description.
 *
 * RxNorm descriptions often follow patterns like:
 * "Drug A may increase the ... of Drug B. The mechanism ..."
 * We attempt to extract a concise mechanism phrase. If no clear
 * pattern is found, return the first sentence as a fallback.
 */
function extractMechanism(description: string): string | null {
  if (!description) return null;

  // Try to find mechanism-related phrases
  const mechanismPatterns = [
    /mechanism[:\s]+([^.]+)/i,
    /by\s+(inhibiting|inducing|blocking|enhancing|potentiating|increasing|decreasing)[^.]+/i,
  ];

  for (const pattern of mechanismPatterns) {
    const match = description.match(pattern);
    if (match) return truncate(match[0].trim(), 200);
  }

  // Fallback: return the full description (it usually IS the mechanism)
  return truncate(description, 200);
}

/**
 * Extract the clinical effect from an RxNorm interaction description.
 *
 * Looks for phrases describing what happens clinically.
 */
function extractClinicalEffect(description: string): string | null {
  if (!description) return null;

  // RxNorm descriptions often describe the effect directly
  const effectPatterns = [
    /may\s+(cause|result|increase|decrease|lead|enhance|potentiate)[^.]+/i,
    /risk\s+of\s+[^.]+/i,
    /(?:adverse|toxic|clinical)\s+effect[s]?[:\s]+[^.]+/i,
  ];

  for (const pattern of effectPatterns) {
    const match = description.match(pattern);
    if (match) return truncate(match[0].trim(), 200);
  }

  // Fallback: use the full description as the clinical effect
  return truncate(description, 200);
}
