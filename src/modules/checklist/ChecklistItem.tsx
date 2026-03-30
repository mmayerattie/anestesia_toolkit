import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { ChecklistItem as ChecklistItemType } from '../../types'

interface ChecklistItemProps {
  item: ChecklistItemType
  checked: boolean
  onToggle: (id: string) => void
  onRemove: (id: string) => void
}

const categoryColors: Record<string, string> = {
  Paciente: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Equipo: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  'Fármacos': 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  Plan: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
}

function getCategoryBadgeClass(category: string): string {
  return categoryColors[category] ?? 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
}

export default function ChecklistItemRow({
  item,
  checked,
  onToggle,
  onRemove,
}: ChecklistItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        flex items-center gap-3 px-3 py-2 min-h-[44px] rounded-xl
        bg-white dark:bg-[#1a1b25] shadow-sm shadow-stone-200/30 dark:shadow-black/10
        ${item.required ? 'border-l-4 border-l-red-400' : ''}
        ${isDragging ? 'opacity-50 shadow-lg z-10' : ''}
        ${checked ? 'bg-stone-50 dark:bg-[#1a1b25]/60' : ''}
      `}
    >
      {/* Drag handle */}
      <button
        type="button"
        className="flex-shrink-0 cursor-grab active:cursor-grabbing touch-none text-stone-300 dark:text-stone-600 hover:text-stone-500 dark:hover:text-stone-400 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Arrastrar para reordenar"
        {...attributes}
        {...listeners}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="6" r="1" fill="currentColor" />
          <circle cx="15" cy="6" r="1" fill="currentColor" />
          <circle cx="9" cy="12" r="1" fill="currentColor" />
          <circle cx="15" cy="12" r="1" fill="currentColor" />
          <circle cx="9" cy="18" r="1" fill="currentColor" />
          <circle cx="15" cy="18" r="1" fill="currentColor" />
        </svg>
      </button>

      {/* Checkbox — wrapper provides 44px touch target */}
      <label className="flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(item.id)}
          className="w-5 h-5 rounded border-stone-300 dark:border-stone-600 focus:ring-teal-500 focus:ring-2 cursor-pointer accent-teal-600"
          aria-label={item.label}
        />
      </label>

      {/* Label and category badge */}
      <div className="flex-1 min-w-0 flex flex-wrap items-center gap-2">
        <span
          className={`text-[14px] leading-tight ${
            checked
              ? 'line-through text-stone-300 dark:text-stone-600'
              : 'text-stone-700 dark:text-stone-200'
          }`}
        >
          {item.label}
          {item.required && (
            <span className="text-red-400 ml-0.5" aria-label="obligatorio">
              *
            </span>
          )}
        </span>
        <span
          className={`inline-flex items-center px-1.5 py-0.5 text-xs font-medium rounded ${getCategoryBadgeClass(item.category)}`}
        >
          {item.category}
        </span>
      </div>

      {/* Delete button */}
      <button
        type="button"
        onClick={() => onRemove(item.id)}
        className="flex-shrink-0 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-stone-300 dark:text-stone-600 hover:text-red-400 dark:hover:text-red-400 rounded transition-colors"
        aria-label={`Eliminar: ${item.label}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      </button>
    </div>
  )
}
