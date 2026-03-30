// === Severity & Interactions ===
export type Severity = 'contraindicated' | 'major' | 'moderate' | 'minor' | 'none' | 'unknown';

export interface DrugInteraction {
  drug1: string;
  drug2: string;
  severity: Severity;
  mechanism: string | null;
  clinicalEffect: string | null;
  source: 'OpenFDA' | 'RxNorm' | 'DrugBank' | 'unknown';
  sourceUrl?: string;
}

// === Dosage ===
export type DosageUnit = 'mg/kg' | 'mcg/kg' | 'mg/kg/h' | 'mcg/kg/min' | 'mcg/kg/h';
export type DosageContext = 'induction' | 'maintenance' | 'sedation' | 'analgesia';
export type DosageRoute = 'IV' | 'IM' | 'inhaled' | 'regional';

export interface DosageRange {
  minDose: number;
  maxDose: number;
  unit: DosageUnit;
  context: DosageContext;
  route: DosageRoute;
  notes: string | null;
  reference: string;
  maxAbsoluteDose?: number; // mg or mcg absolute ceiling
  maxAbsoluteDoseUnit?: string;
}

export interface DrugDosage {
  name: string;
  aliases: string[];
  dosages: DosageRange[];
}

// === Checklist ===
export interface ChecklistItem {
  id: string;
  category: string;
  label: string;
  required: boolean;
}

export interface ChecklistState {
  [id: string]: boolean;
}

// === Drug (master list) ===
export interface Drug {
  name: string;
  aliases: string[];
  rxcui?: string;
  category: string;
}

// === Vademécum ===
export interface DrugDilution {
  description: string;          // e.g., "200 mg en 20 mL SF = 10 mg/mL"
  concentration: string;        // e.g., "10 mg/mL"
  commonPreparation: string;    // e.g., "Ampolla 200 mg/20 mL, usar sin diluir"
}

export interface DrugCard {
  name: string;
  category: string;
  onset: string;               // e.g., "30-45 s IV"
  peakEffect: string;          // e.g., "1-2 min"
  duration: string;            // e.g., "5-10 min"
  metabolism: string;           // e.g., "Hepático (CYP2B6)"
  elimination: string;          // e.g., "Renal"
  contraindications: string[];
  precautions: string[];
  dilutions: DrugDilution[];
  clinicalPearls: string[];    // Practical tips
  reference: string;
}
