import { useState, useMemo, useCallback } from 'react'
import type { Drug, DrugCard } from '../../types'
import { drugs } from '../../data/drugs'
import { vademecumData, findDrugCard } from '../../data/vademecumData'
import DrugInput from '../../components/DrugInput'
import DrugCardPreview from './DrugCardPreview'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

/** Stable category display order. */
const CATEGORY_ORDER = [
  'Hipnotico',
  'Disociativo',
  'Benzodiacepina',
  'Opioide',
  'BNM',
  'Reversor',
  'Anticolinergico',
  'Vasopresor',
  'Agonista alfa-2',
  'Anestesico local',
]

function getUniqueCategories(cards: DrugCard[]): string[] {
  // Collect the original (accented) category names, deduplicated by normalized form
  const seen = new Map<string, string>()
  for (const c of cards) {
    const key = normalize(c.category)
    if (!seen.has(key)) seen.set(key, c.category)
  }

  const ordered: string[] = []
  for (const cat of CATEGORY_ORDER) {
    const original = seen.get(normalize(cat))
    if (original) {
      ordered.push(original)
      seen.delete(normalize(cat))
    }
  }
  // Append any extras not in the predefined order
  for (const original of seen.values()) {
    ordered.push(original)
  }
  return ordered
}

function categoryMatch(a: string, b: string): boolean {
  return normalize(a) === normalize(b)
}

// ---------------------------------------------------------------------------
// Category pill & badge colors
// ---------------------------------------------------------------------------

const categoryColors: Record<string, string> = {
  hipnotico: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-700',
  disociativo: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300 border-violet-200 dark:border-violet-700',
  benzodiacepina: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300 border-sky-200 dark:border-sky-700',
  opioide: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-700',
  bnm: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 border-rose-200 dark:border-rose-700',
  reversor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700',
  anticolinergico: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300 border-teal-200 dark:border-teal-700',
  vasopresor: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 border-red-200 dark:border-red-700',
  'agonista alfa-2': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700',
  'anestesico local': 'bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-300 border-lime-200 dark:border-lime-700',
}

function getCategoryClasses(category: string): string {
  return (
    categoryColors[normalize(category)] ??
    'bg-stone-100 text-stone-800 dark:bg-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-600'
  )
}

function getCategoryPillClass(category: string, active: boolean): string {
  const base = getCategoryClasses(category)
  if (active) {
    return `${base} ring-2 ring-offset-1 ring-teal-500 dark:ring-teal-400 dark:ring-offset-stone-900 border`
  }
  return `${base} border opacity-75 hover:opacity-100`
}

// ---------------------------------------------------------------------------
// Pharmacokinetic item
// ---------------------------------------------------------------------------

function PharmacoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 px-3 py-2">
      <dt className="text-[11px] font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wide">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm font-medium text-stone-800 dark:text-stone-100">
        {value}
      </dd>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Detail View
// ---------------------------------------------------------------------------

function DrugDetail({ card, onBack }: { card: DrugCard; onBack: () => void }) {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 mb-5 focus:outline-none focus:underline"
        style={{ minHeight: '44px' }}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Volver al listado
      </button>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100">
          {card.name}
        </h2>
        <span
          className={`shrink-0 inline-block rounded-full px-3 py-1 text-xs font-semibold ${getCategoryClasses(card.category)}`}
        >
          {card.category}
        </span>
      </div>

      {/* Farmacocinética */}
      <section className="mb-6">
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-3">
          Farmacocinetica
        </h3>
        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          <PharmacoItem label="Inicio" value={card.onset} />
          <PharmacoItem label="Pico" value={card.peakEffect} />
          <PharmacoItem label="Duracion" value={card.duration} />
          <PharmacoItem label="Metabolismo" value={card.metabolism} />
          <PharmacoItem label="Eliminacion" value={card.elimination} />
        </dl>
      </section>

      {/* Dilución y preparación — visually prominent */}
      {card.dilutions.length > 0 && (
        <section className="mb-6">
          <h3 className="text-[11px] font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-3">
            Dilucion y preparacion
          </h3>
          <div className="space-y-3">
            {card.dilutions.map((dil, i) => (
              <div
                key={i}
                className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/30 p-4"
              >
                <p className="font-semibold text-teal-900 dark:text-teal-100 text-sm mb-1.5">
                  {dil.description}
                </p>
                <p className="text-sm text-teal-700 dark:text-teal-300 mb-2">
                  <span className="font-medium">Concentracion:</span> {dil.concentration}
                </p>
                <div className="rounded-lg bg-teal-100/50 dark:bg-teal-900/30 px-3 py-2.5 text-sm text-teal-800 dark:text-teal-200 leading-relaxed">
                  {dil.commonPreparation}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contraindicaciones */}
      {card.contraindications.length > 0 && (
        <section className="mb-6">
          <h3 className="text-[11px] font-semibold uppercase tracking-widest text-red-600 dark:text-red-400 mb-3">
            Contraindicaciones
          </h3>
          <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-4">
            <ul className="list-disc list-inside space-y-1.5 text-sm text-red-800 dark:text-red-300">
              {card.contraindications.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Precauciones */}
      {card.precautions.length > 0 && (
        <section className="mb-6">
          <h3 className="text-[11px] font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-3">
            Precauciones
          </h3>
          <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-4">
            <ul className="list-disc list-inside space-y-1.5 text-sm text-amber-800 dark:text-amber-300">
              {card.precautions.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Tips clínicos */}
      {card.clinicalPearls.length > 0 && (
        <section className="mb-6">
          <h3 className="text-[11px] font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-3">
            Tips clinicos
          </h3>
          <div className="rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 p-4">
            <ul className="space-y-2.5">
              {card.clinicalPearls.map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-stone-700 dark:text-stone-300">
                  <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center text-teal-600 dark:text-teal-400 text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Referencia */}
      <footer className="border-t border-stone-100 dark:border-stone-800 pt-4 mt-6">
        <p className="text-[11px] text-stone-400 dark:text-stone-500">
          <span className="font-medium">Fuente:</span> {card.reference}
        </p>
      </footer>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function VademecumPage() {
  const [selectedCard, setSelectedCard] = useState<DrugCard | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const categories = useMemo(() => getUniqueCategories(vademecumData), [])

  // When user selects a drug from the autocomplete
  const handleSearchSelect = useCallback((drug: Drug) => {
    const card = findDrugCard(drug.name)
    if (card) {
      setSelectedCard(card)
    }
    setSearchQuery('')
  }, [])

  // Filter cards by active category and/or text search
  const filteredCards = useMemo(() => {
    let filtered = vademecumData

    if (activeCategory) {
      filtered = filtered.filter((c) => categoryMatch(c.category, activeCategory))
    }

    if (searchQuery.trim()) {
      const q = normalize(searchQuery)
      filtered = filtered.filter((c) => normalize(c.name).includes(q))
    }

    return filtered
  }, [activeCategory, searchQuery])

  const handleCategoryToggle = (cat: string) => {
    setActiveCategory((prev) => (prev && categoryMatch(prev, cat) ? null : cat))
  }

  const handleCardSelect = (card: DrugCard) => {
    setSelectedCard(card)
  }

  const handleBack = () => {
    setSelectedCard(null)
  }

  // ── Detail view ──────────────────────────────────────────────────────
  if (selectedCard) {
    return (
      <div className="max-w-4xl mx-auto">
        <DrugDetail card={selectedCard} onBack={handleBack} />
      </div>
    )
  }

  // ── Grid view ────────────────────────────────────────────────────────
  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-stone-800 dark:text-stone-100">
          Vademecum anestesico
        </h1>
        <p className="mt-1 text-sm text-stone-400 dark:text-stone-500">
          Fichas de referencia rapida de farmacos anestesicos.
        </p>
      </div>

      {/* Search bar */}
      <div>
        <DrugInput
          drugs={drugs}
          onSelect={handleSearchSelect}
          placeholder="Buscar farmaco..."
        />
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
        {categories.map((cat) => {
          const isActive = activeCategory != null && categoryMatch(activeCategory, cat)
          return (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryToggle(cat)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 ${getCategoryPillClass(cat, isActive)}`}
              style={{ minHeight: '44px' }}
              aria-pressed={isActive}
            >
              {cat}
            </button>
          )
        })}
        {activeCategory && (
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className="rounded-full px-3 py-1.5 text-xs font-medium bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-600 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
            style={{ minHeight: '44px' }}
          >
            Limpiar filtro
          </button>
        )}
      </div>

      {/* Drug card grid */}
      {filteredCards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredCards.map((card) => (
            <DrugCardPreview
              key={card.name}
              card={card}
              onSelect={handleCardSelect}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-white dark:bg-[#1a1b25] shadow-sm shadow-stone-200/40 dark:shadow-black/20 p-8 text-center">
          <p className="text-sm text-stone-400 dark:text-stone-500">
            No se encontraron farmacos
            {activeCategory ? ` en la categoria "${activeCategory}"` : ''}.
          </p>
        </div>
      )}
    </div>
  )
}
