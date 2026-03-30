// ============================================================================
// conversions.ts — Pure conversion functions for clinical anesthesia use
//
// SAFETY-CRITICAL: Every conversion factor is documented with its source.
// All functions are pure: input → output, no side effects.
// ============================================================================

// ---------------------------------------------------------------------------
// MASS CONVERSIONS
// ---------------------------------------------------------------------------

/**
 * Convert milligrams to micrograms.
 * Factor: 1 mg = 1000 mcg
 */
export function mgToMcg(mg: number): number {
  return mg * 1000;
}

/**
 * Convert micrograms to milligrams.
 * Factor: 1 mcg = 0.001 mg
 */
export function mcgToMg(mcg: number): number {
  return mcg / 1000;
}

/**
 * Convert milligrams to grams.
 * Factor: 1 mg = 0.001 g
 */
export function mgToG(mg: number): number {
  return mg / 1000;
}

/**
 * Convert grams to milligrams.
 * Factor: 1 g = 1000 mg
 */
export function gToMg(g: number): number {
  return g * 1000;
}

/**
 * Convert micrograms to grams.
 * Factor: 1 mcg = 0.000001 g
 */
export function mcgToG(mcg: number): number {
  return mcg / 1_000_000;
}

/**
 * Convert grams to micrograms.
 * Factor: 1 g = 1,000,000 mcg
 */
export function gToMcg(g: number): number {
  return g * 1_000_000;
}

/**
 * Convert mg/kg dose to total mg.
 * Formula: total_mg = dose_mg_per_kg × weight_kg
 *
 * @param dosePerKg - Dose in mg/kg
 * @param weightKg - Patient weight in kg
 * @returns Total dose in mg
 */
export function mgPerKgToMg(dosePerKg: number, weightKg: number): number {
  return dosePerKg * weightKg;
}

// ---------------------------------------------------------------------------
// IV INFUSION CONVERSIONS — HIGHEST RISK
// ---------------------------------------------------------------------------

/**
 * Convert mcg/kg/min to mL/h.
 *
 * Formula:
 *   mL/h = (dose_mcg_kg_min × weight_kg × 60) / (concentration_mg_mL × 1000)
 *
 * Derivation:
 *   - dose_mcg_kg_min × weight_kg = total mcg/min
 *   - × 60 = total mcg/h
 *   - concentration_mg_mL × 1000 = concentration in mcg/mL
 *   - mcg/h ÷ mcg/mL = mL/h
 *
 * The ×1000 converts mg/mL → mcg/mL so units cancel correctly.
 *
 * @param doseMcgKgMin - Desired dose in mcg/kg/min
 * @param weightKg - Patient weight in kg
 * @param concentrationMgPerMl - Solution concentration in mg/mL
 * @returns Infusion rate in mL/h
 */
export function mcgKgMinToMlH(
  doseMcgKgMin: number,
  weightKg: number,
  concentrationMgPerMl: number,
): number {
  if (concentrationMgPerMl === 0) return NaN;
  return (doseMcgKgMin * weightKg * 60) / (concentrationMgPerMl * 1000);
}

/**
 * Convert mg/h to mL/h.
 *
 * Formula:
 *   mL/h = dose_mg_h / concentration_mg_mL
 *
 * @param doseMgH - Desired dose in mg/h
 * @param concentrationMgPerMl - Solution concentration in mg/mL
 * @returns Infusion rate in mL/h
 */
export function mgHToMlH(
  doseMgH: number,
  concentrationMgPerMl: number,
): number {
  if (concentrationMgPerMl === 0) return NaN;
  return doseMgH / concentrationMgPerMl;
}

/**
 * Convert mL/h to mcg/kg/min (inverse of mcgKgMinToMlH).
 *
 * Formula:
 *   mcg/kg/min = (mL_h × concentration_mg_mL × 1000) / (weight_kg × 60)
 *
 * Derivation:
 *   - mL/h × concentration_mg_mL = mg/h
 *   - × 1000 = mcg/h
 *   - ÷ 60 = mcg/min
 *   - ÷ weight_kg = mcg/kg/min
 *
 * @param mlH - Infusion rate in mL/h
 * @param weightKg - Patient weight in kg
 * @param concentrationMgPerMl - Solution concentration in mg/mL
 * @returns Dose in mcg/kg/min
 */
export function mlHToMcgKgMin(
  mlH: number,
  weightKg: number,
  concentrationMgPerMl: number,
): number {
  if (weightKg === 0) return NaN;
  return (mlH * concentrationMgPerMl * 1000) / (weightKg * 60);
}

// ---------------------------------------------------------------------------
// PRESSURE CONVERSIONS
// ---------------------------------------------------------------------------

/**
 * Convert mmHg to cmH₂O.
 * Factor: 1 mmHg = 1.36 cmH₂O
 * Source: Standard physics conversion (1 mmHg = 133.322 Pa, 1 cmH₂O = 98.0665 Pa)
 */
export function mmHgToCmH2O(mmHg: number): number {
  return mmHg * 1.36;
}

/**
 * Convert cmH₂O to mmHg.
 * Factor: 1 cmH₂O = 1/1.36 mmHg ≈ 0.73529 mmHg
 */
export function cmH2OToMmHg(cmH2O: number): number {
  return cmH2O / 1.36;
}

/**
 * Convert mmHg to kPa.
 * Factor: 1 mmHg = 0.133322 kPa
 * Source: 1 mmHg = 133.322 Pa = 0.133322 kPa
 */
export function mmHgToKPa(mmHg: number): number {
  return mmHg * 0.133322;
}

/**
 * Convert kPa to mmHg.
 * Factor: 1 kPa = 1/0.133322 mmHg ≈ 7.50062 mmHg
 */
export function kPaToMmHg(kPa: number): number {
  return kPa / 0.133322;
}

/**
 * Convert cmH₂O to kPa.
 * Factor: 1 cmH₂O = 0.0980665 kPa
 * Source: 1 cmH₂O = 98.0665 Pa = 0.0980665 kPa
 */
export function cmH2OToKPa(cmH2O: number): number {
  return cmH2O * 0.0980665;
}

/**
 * Convert kPa to cmH₂O.
 * Factor: 1 kPa = 1/0.0980665 cmH₂O ≈ 10.1972 cmH₂O
 */
export function kPaToCmH2O(kPa: number): number {
  return kPa / 0.0980665;
}

// ---------------------------------------------------------------------------
// TEMPERATURE CONVERSIONS
// ---------------------------------------------------------------------------

/**
 * Convert Celsius to Fahrenheit.
 * Formula: °F = (°C × 9/5) + 32
 */
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

/**
 * Convert Fahrenheit to Celsius.
 * Formula: °C = (°F - 32) × 5/9
 */
export function fahrenheitToCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}

// ---------------------------------------------------------------------------
// VOLUME CONVERSIONS
// ---------------------------------------------------------------------------

/**
 * Convert milliliters to liters.
 * Factor: 1 mL = 0.001 L
 */
export function mlToL(ml: number): number {
  return ml / 1000;
}

/**
 * Convert liters to milliliters.
 * Factor: 1 L = 1000 mL
 */
export function lToMl(l: number): number {
  return l * 1000;
}

/**
 * Convert milliliters to cubic centimeters.
 * Factor: 1 mL = 1 cc (exact equivalence by definition)
 */
export function mlToCc(ml: number): number {
  return ml;
}

/**
 * Convert cubic centimeters to milliliters.
 * Factor: 1 cc = 1 mL (exact equivalence by definition)
 */
export function ccToMl(cc: number): number {
  return cc;
}

/**
 * Convert liters to cubic centimeters.
 * Factor: 1 L = 1000 cc
 */
export function lToCc(l: number): number {
  return l * 1000;
}

/**
 * Convert cubic centimeters to liters.
 * Factor: 1 cc = 0.001 L
 */
export function ccToL(cc: number): number {
  return cc / 1000;
}
