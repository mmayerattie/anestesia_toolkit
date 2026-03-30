import type { DrugCard } from '../../types'

interface DrugCardPreviewProps {
  card: DrugCard
  onSelect: (card: DrugCard) => void
}

const categoryColors: Record<string, string> = {
  'Hipnotico': 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  'Disociativo': 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300',
  'Benzodiacepina': 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
  'Opioide': 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  'BNM': 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
  'Reversor': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  'Anticolinergico': 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300',
  'Vasopresor': 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
  'Agonista alfa-2': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300',
  'Anestesico local': 'bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-300',
}

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function getCategoryColor(category: string): string {
  const key = normalize(category)
  for (const [k, v] of Object.entries(categoryColors)) {
    if (normalize(k) === key) return v
  }
  return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
}

export default function DrugCardPreview({ card, onSelect }: DrugCardPreviewProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(card)}
      className="w-full text-left rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 active:scale-[0.98]"
      style={{ minHeight: '44px' }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 leading-tight">
          {card.name}
        </h3>
        <span
          className={`shrink-0 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getCategoryColor(card.category)}`}
        >
          {card.category}
        </span>
      </div>
      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
        <span>
          <span className="font-medium text-gray-600 dark:text-gray-300">Inicio:</span>{' '}
          {card.onset}
        </span>
        <span className="text-gray-300 dark:text-gray-600">|</span>
        <span>
          <span className="font-medium text-gray-600 dark:text-gray-300">Duracion:</span>{' '}
          {card.duration}
        </span>
      </div>
    </button>
  )
}
