import { useState, useEffect, useMemo } from 'react'
import type { Drug, DosageContext, DosageRange } from '../../types'
import { drugs } from '../../data/drugs'
import DrugInput from '../../components/DrugInput'
import { findDosage } from './dosageData'
import DosageResult from './DosageResult'

const WEIGHT_KEY = 'last_weight'

const contextLabels: Record<DosageContext, string> = {
  induction: 'Induccion',
  maintenance: 'Mantenimiento',
  sedation: 'Sedacion',
  analgesia: 'Analgesia',
}

function loadWeight(): number | null {
  try {
    const stored = localStorage.getItem(WEIGHT_KEY)
    if (stored) {
      const val = parseFloat(stored)
      if (!isNaN(val) && val > 0) return val
    }
  } catch {
    // localStorage unavailable
  }
  return null
}

function saveWeight(weight: number) {
  try {
    localStorage.setItem(WEIGHT_KEY, String(weight))
  } catch {
    // localStorage unavailable
  }
}

export default function DosagePage() {
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null)
  const [weightStr, setWeightStr] = useState(() => {
    const w = loadWeight()
    return w != null ? String(w) : ''
  })
  const [selectedContext, setSelectedContext] = useState<DosageContext | null>(null)

  const weight = useMemo(() => {
    const val = parseFloat(weightStr)
    return !isNaN(val) && val > 0 ? val : null
  }, [weightStr])

  // Persist weight to localStorage
  useEffect(() => {
    if (weight != null) {
      saveWeight(weight)
    }
  }, [weight])

  // Get dosage data for selected drug
  const drugDosage = useMemo(() => {
    if (!selectedDrug) return null
    return findDosage(selectedDrug.name) ?? null
  }, [selectedDrug])

  // Available contexts for selected drug
  const availableContexts = useMemo(() => {
    if (!drugDosage) return []
    const ctxSet = new Set<DosageContext>()
    for (const d of drugDosage.dosages) {
      ctxSet.add(d.context)
    }
    // Maintain stable order
    const order: DosageContext[] = ['induction', 'maintenance', 'sedation', 'analgesia']
    return order.filter((c) => ctxSet.has(c))
  }, [drugDosage])

  // Auto-select first available context when drug changes
  useEffect(() => {
    if (availableContexts.length > 0) {
      if (!selectedContext || !availableContexts.includes(selectedContext)) {
        setSelectedContext(availableContexts[0])
      }
    } else {
      setSelectedContext(null)
    }
  }, [availableContexts]) // eslint-disable-line react-hooks/exhaustive-deps

  // Filter dosage ranges by selected context
  const filteredDosages: DosageRange[] = useMemo(() => {
    if (!drugDosage || !selectedContext) return []
    return drugDosage.dosages.filter((d) => d.context === selectedContext)
  }, [drugDosage, selectedContext])

  const handleDrugSelect = (drug: Drug) => {
    setSelectedDrug(drug)
  }

  const handleClearDrug = () => {
    setSelectedDrug(null)
    setSelectedContext(null)
  }

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    // Allow empty string or valid numeric input
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setWeightStr(val)
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <h1 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-6">
        Calculadora de dosis
      </h1>

      {/* Drug selector */}
      <div className="mb-4">
        <label className="block text-[13px] font-medium text-stone-500 dark:text-stone-400 mb-1">
          Farmaco
        </label>
        {selectedDrug ? (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-teal-50 dark:bg-teal-900/20 px-3 py-1.5 text-sm font-medium text-teal-700 dark:text-teal-400">
              {selectedDrug.name}
              <button
                type="button"
                onClick={handleClearDrug}
                className="ml-1 inline-flex min-w-[44px] min-h-[44px] items-center justify-center rounded-full hover:bg-teal-200 dark:hover:bg-teal-800 focus:outline-none"
                aria-label={`Quitar ${selectedDrug.name}`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          </div>
        ) : (
          <DrugInput
            drugs={drugs}
            onSelect={handleDrugSelect}
            placeholder="Buscar farmaco..."
          />
        )}
      </div>

      {/* Weight input */}
      <div className="mb-4">
        <label
          htmlFor="weight-input"
          className="block text-[13px] font-medium text-stone-500 dark:text-stone-400 mb-1"
        >
          Peso del paciente (kg)
        </label>
        <input
          id="weight-input"
          type="text"
          inputMode="decimal"
          value={weightStr}
          onChange={handleWeightChange}
          placeholder="Ej: 70"
          className="w-full px-3.5 py-2.5 border border-stone-200 dark:border-stone-700 rounded-xl bg-white dark:bg-stone-800/60 text-[15px] text-stone-800 dark:text-stone-200 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400 dark:focus:ring-teal-500/30 dark:focus:border-teal-600 transition-shadow"
          style={{ minHeight: '44px' }}
        />
      </div>

      {/* Context selector pills */}
      {selectedDrug && availableContexts.length > 0 && (
        <div className="mb-6">
          <label className="block text-[13px] font-medium text-stone-500 dark:text-stone-400 mb-2">
            Contexto clinico
          </label>
          <div className="flex flex-wrap gap-2">
            {availableContexts.map((ctx) => (
              <button
                key={ctx}
                type="button"
                onClick={() => setSelectedContext(ctx)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/40 ${
                  selectedContext === ctx
                    ? 'bg-teal-600 text-white dark:bg-teal-600'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
                style={{ minHeight: '44px' }}
              >
                {contextLabels[ctx]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {selectedDrug && weight != null && selectedContext && (
        <div className="space-y-4">
          {filteredDosages.length > 0 ? (
            filteredDosages.map((dosage, idx) => (
              <DosageResult
                key={`${selectedDrug.name}-${dosage.context}-${dosage.route}-${idx}`}
                drugName={selectedDrug.name}
                weight={weight}
                dosageRange={dosage}
              />
            ))
          ) : (
            <div className="rounded-xl bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 p-4">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                No hay datos de dosis para este contexto. Verificar manualmente.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Prompt to enter data */}
      {!selectedDrug && (
        <div className="mt-8 text-center text-sm text-stone-400 dark:text-stone-500">
          Seleccione un farmaco para ver las dosis recomendadas.
        </div>
      )}

      {selectedDrug && weight == null && (
        <div className="mt-8 text-center text-sm text-stone-400 dark:text-stone-500">
          Ingrese el peso del paciente para calcular las dosis.
        </div>
      )}
    </div>
  )
}
