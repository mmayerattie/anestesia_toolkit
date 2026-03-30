import type { DosageRange } from '../../types'

interface DosageResultProps {
  drugName: string
  weight: number
  dosageRange: DosageRange
}

const contextLabels: Record<string, string> = {
  induction: 'Induccion',
  maintenance: 'Mantenimiento',
  sedation: 'Sedacion',
  analgesia: 'Analgesia',
}

const routeLabels: Record<string, string> = {
  IV: 'IV',
  IM: 'IM',
  inhaled: 'Inhalado',
  regional: 'Regional/Local',
}

/**
 * Formatea un numero a 1 decimal. Si el decimal es .0, lo mantiene.
 */
function fmt(value: number): string {
  return value.toFixed(1)
}

/**
 * Determina si la unidad es de infusion continua (tasa por tiempo).
 */
function isInfusionUnit(unit: string): boolean {
  return unit === 'mcg/kg/min' || unit === 'mg/kg/h' || unit === 'mcg/kg/h'
}

/**
 * Calcula y retorna la unidad resultante para infusiones.
 * mcg/kg/min -> mcg/min
 * mg/kg/h -> mg/h
 */
function resultUnit(unit: string): string {
  if (unit === 'mcg/kg/min') return 'mcg/min'
  if (unit === 'mg/kg/h') return 'mg/h'
  if (unit === 'mcg/kg/h') return 'mcg/h'
  // Bolus units: extraer la parte antes de /kg
  // mg/kg -> mg, mcg/kg -> mcg
  return unit.replace('/kg', '')
}

export default function DosageResult({ drugName, weight, dosageRange }: DosageResultProps) {
  const { minDose, maxDose, unit, context, route, notes, reference, maxAbsoluteDose, maxAbsoluteDoseUnit } =
    dosageRange

  const minCalc = minDose * weight
  const maxCalc = maxDose * weight

  const isInfusion = isInfusionUnit(unit)
  const rUnit = resultUnit(unit)

  // Check if calculated dose exceeds absolute maximum
  const exceedsAbsoluteMax =
    maxAbsoluteDose != null && maxCalc > maxAbsoluteDose

  // Weight out of typical range
  const weightWarning = weight < 30 || weight > 150

  return (
    <div className="rounded-xl bg-white dark:bg-[#1a1b25] shadow-sm shadow-stone-200/40 dark:shadow-black/20 p-5">
      {/* Header */}
      <h3 className="text-[17px] font-semibold text-stone-800 dark:text-stone-100">
        {drugName} — {contextLabels[context] ?? context} {routeLabels[route] ?? route}
      </h3>

      {/* Dose range */}
      <p className="mt-1 text-[13px] text-stone-400 dark:text-stone-500">
        Rango: {fmt(minDose)} – {fmt(maxDose)} {unit}
      </p>

      {/* Weight */}
      <p className="text-[13px] text-stone-400 dark:text-stone-500">
        Peso: {fmt(weight)} kg
      </p>

      {/* Separator */}
      <div className="my-3 border-t border-stone-100 dark:border-stone-800/50" />

      {/* Calculated result */}
      {isInfusion ? (
        <div className="space-y-1">
          <p className="text-[15px] font-semibold text-stone-800 dark:text-stone-100">
            Tasa minima: {fmt(minCalc)} {rUnit}
          </p>
          <p className="text-[15px] font-semibold text-stone-800 dark:text-stone-100">
            Tasa maxima: {fmt(maxCalc)} {rUnit}
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          <p className="text-[15px] font-semibold text-stone-800 dark:text-stone-100">
            Dosis minima: {fmt(minCalc)} {rUnit}
          </p>
          <p className="text-[15px] font-semibold text-stone-800 dark:text-stone-100">
            Dosis maxima: {fmt(maxCalc)} {rUnit}
          </p>
        </div>
      )}

      {/* Absolute max warning */}
      {exceedsAbsoluteMax && maxAbsoluteDose != null && (
        <div className="mt-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-3">
          <p className="text-sm font-medium text-red-800 dark:text-red-300">
            La dosis maxima calculada ({fmt(maxCalc)} {rUnit}) excede la dosis
            maxima absoluta de {fmt(maxAbsoluteDose)}{' '}
            {maxAbsoluteDoseUnit ?? rUnit}. No superar {fmt(maxAbsoluteDose)}{' '}
            {maxAbsoluteDoseUnit ?? rUnit}.
          </p>
        </div>
      )}

      {/* Weight warning */}
      {weightWarning && (
        <div className="mt-3 rounded-lg bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 p-3">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
            Peso fuera del rango habitual. Verificar dosis calculada.
          </p>
        </div>
      )}

      {/* Notes */}
      {notes && (
        <div className="mt-3 rounded-lg bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 p-3">
          <p className="text-sm text-teal-800 dark:text-teal-300">
            <span className="font-medium">Nota:</span> {notes}
          </p>
        </div>
      )}

      {/* Reference */}
      <p className="mt-3 text-[11px] text-stone-400 dark:text-stone-500">
        <span className="font-medium">Fuente:</span> {reference}
      </p>
    </div>
  )
}
