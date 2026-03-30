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
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
      {/* Header */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {drugName} — {contextLabels[context] ?? context} {routeLabels[route] ?? route}
      </h3>

      {/* Dose range */}
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Rango: {fmt(minDose)} – {fmt(maxDose)} {unit}
      </p>

      {/* Weight */}
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Peso: {fmt(weight)} kg
      </p>

      {/* Separator */}
      <div className="my-3 border-t border-gray-200 dark:border-gray-700" />

      {/* Calculated result */}
      {isInfusion ? (
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900 dark:text-gray-100">
            Tasa minima: {fmt(minCalc)} {rUnit}
          </p>
          <p className="text-base font-medium text-gray-900 dark:text-gray-100">
            Tasa maxima: {fmt(maxCalc)} {rUnit}
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900 dark:text-gray-100">
            Dosis minima: {fmt(minCalc)} {rUnit}
          </p>
          <p className="text-base font-medium text-gray-900 dark:text-gray-100">
            Dosis maxima: {fmt(maxCalc)} {rUnit}
          </p>
        </div>
      )}

      {/* Absolute max warning */}
      {exceedsAbsoluteMax && maxAbsoluteDose != null && (
        <div className="mt-3 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-3">
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
        <div className="mt-3 rounded-md bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 p-3">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
            Peso fuera del rango habitual. Verificar dosis calculada.
          </p>
        </div>
      )}

      {/* Notes */}
      {notes && (
        <div className="mt-3 rounded-md bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 p-3">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <span className="font-medium">Nota:</span> {notes}
          </p>
        </div>
      )}

      {/* Reference */}
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        <span className="font-medium">Fuente:</span> {reference}
      </p>
    </div>
  )
}
