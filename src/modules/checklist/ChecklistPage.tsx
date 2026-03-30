import { useState, useMemo, useCallback } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useChecklist } from './useChecklist'
import ChecklistItemRow from './ChecklistItem'

const CATEGORIES = ['Paciente', 'Equipo', 'Fármacos', 'Plan'] as const

interface ConfirmDialog {
  title: string
  message: string
  confirmLabel: string
  confirmClass: string
  onConfirm: () => void
}

export default function ChecklistPage() {
  const {
    items,
    checks,
    toggleCheck,
    addItem,
    removeItem,
    reorderItems,
    resetChecks,
    restoreDefaults,
  } = useChecklist()

  // Collapsed categories
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(
    new Set(),
  )

  // Add item form
  const [newLabel, setNewLabel] = useState('')
  const [newCategory, setNewCategory] = useState<string>(CATEGORIES[0])
  const [newRequired, setNewRequired] = useState(false)

  // Confirmation dialog
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialog | null>(null)

  // dnd-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // Progress stats
  const stats = useMemo(() => {
    const total = items.length
    const checked = items.filter((item) => checks[item.id]).length
    const requiredItems = items.filter((item) => item.required)
    const requiredTotal = requiredItems.length
    const requiredChecked = requiredItems.filter(
      (item) => checks[item.id],
    ).length
    const percent = total > 0 ? Math.round((checked / total) * 100) : 0
    return { total, checked, requiredTotal, requiredChecked, percent }
  }, [items, checks])

  // Items grouped by category (preserving order)
  const categorizedItems = useMemo(() => {
    const groups: Record<string, typeof items> = {}
    for (const item of items) {
      if (!groups[item.category]) {
        groups[item.category] = []
      }
      groups[item.category].push(item)
    }
    return groups
  }, [items])

  // All category names in order of first appearance
  const categoryOrder = useMemo(() => {
    const seen = new Set<string>()
    const order: string[] = []
    for (const item of items) {
      if (!seen.has(item.category)) {
        seen.add(item.category)
        order.push(item.category)
      }
    }
    return order
  }, [items])

  const toggleCategory = useCallback((category: string) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(category)) {
        next.delete(category)
      } else {
        next.add(category)
      }
      return next
    })
  }, [])

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (over && active.id !== over.id) {
        reorderItems(String(active.id), String(over.id))
      }
    },
    [reorderItems],
  )

  const handleAddItem = useCallback(() => {
    const trimmed = newLabel.trim()
    if (!trimmed) return
    addItem({
      category: newCategory,
      label: trimmed,
      required: newRequired,
    })
    setNewLabel('')
    setNewRequired(false)
  }, [newLabel, newCategory, newRequired, addItem])

  const handleKeyDownAdd = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        handleAddItem()
      }
    },
    [handleAddItem],
  )

  const requestReset = useCallback(() => {
    setConfirmDialog({
      title: 'Resetear para nuevo paciente',
      message:
        'Se desmarcarán todos los ítems del checklist. La estructura y los ítems personalizados se mantendrán.',
      confirmLabel: 'Resetear',
      confirmClass:
        'bg-amber-500 hover:bg-amber-600 focus:ring-amber-500 text-white',
      onConfirm: () => {
        resetChecks()
        setConfirmDialog(null)
      },
    })
  }, [resetChecks])

  const requestRestore = useCallback(() => {
    setConfirmDialog({
      title: 'Restaurar checklist original',
      message:
        'Se eliminarán todos los ítems personalizados y se restaurará el checklist original de 23 ítems. Todos los checks se desmarcarán. Esta acción no se puede deshacer.',
      confirmLabel: 'Restaurar original',
      confirmClass:
        'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white',
      onConfirm: () => {
        restoreDefaults()
        setConfirmDialog(null)
      },
    })
  }, [restoreDefaults])

  const itemIds = useMemo(() => items.map((item) => item.id), [items])

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Checklist pre-anestesia
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Verificación sistemática antes de cada procedimiento
        </p>
      </div>

      {/* Progress bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {stats.checked}/{stats.total} completados
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {stats.percent}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full transition-all duration-300 ${
              stats.percent === 100
                ? 'bg-emerald-500'
                : 'bg-blue-500'
            }`}
            style={{ width: `${stats.percent}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Obligatorios: {stats.requiredChecked}/{stats.requiredTotal} completados
          {stats.requiredChecked < stats.requiredTotal && (
            <span className="text-red-500 dark:text-red-400 ml-1 font-medium">
              ({stats.requiredTotal - stats.requiredChecked} pendientes)
            </span>
          )}
        </div>
      </div>

      {/* Checklist items with drag and drop */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={itemIds}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {categoryOrder.map((category) => {
              const categoryItems = categorizedItems[category] ?? []
              const isCollapsed = collapsedCategories.has(category)
              const categoryChecked = categoryItems.filter(
                (item) => checks[item.id],
              ).length
              const categoryTotal = categoryItems.length

              return (
                <div
                  key={category}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden"
                >
                  {/* Category header */}
                  <button
                    type="button"
                    onClick={() => toggleCategory(category)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    aria-expanded={!isCollapsed}
                  >
                    <div className="flex items-center gap-2">
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
                        className={`text-gray-400 dark:text-gray-500 transition-transform ${
                          isCollapsed ? '' : 'rotate-90'
                        }`}
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {category}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
                      {categoryChecked}/{categoryTotal}
                    </span>
                  </button>

                  {/* Category items */}
                  {!isCollapsed && (
                    <div className="px-3 pb-3 space-y-1.5">
                      {categoryItems.map((item) => (
                        <ChecklistItemRow
                          key={item.id}
                          item={item}
                          checked={!!checks[item.id]}
                          onToggle={toggleCheck}
                          onRemove={removeItem}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </SortableContext>
      </DndContext>

      {/* Add item form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 p-4 space-y-3">
        <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          Agregar ítem
        </h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onKeyDown={handleKeyDownAdd}
            placeholder="Descripción del ítem..."
            className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={newRequired}
              onChange={(e) => setNewRequired(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 dark:border-gray-500 text-blue-600 focus:ring-blue-500 accent-blue-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Obligatorio
            </span>
          </label>
          <button
            type="button"
            onClick={handleAddItem}
            disabled={!newLabel.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Agregar
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={requestReset}
          className="flex-1 px-4 py-2.5 text-sm font-medium text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          Resetear para nuevo paciente
        </button>
        <button
          type="button"
          onClick={requestRestore}
          className="flex-1 px-4 py-2.5 text-sm font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          Restaurar checklist original
        </button>
      </div>

      {/* Confirmation dialog (modal) */}
      {confirmDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setConfirmDialog(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-dialog-title"
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-sm w-full p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              id="confirm-dialog-title"
              className="text-lg font-semibold text-gray-900 dark:text-gray-100"
            >
              {confirmDialog.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {confirmDialog.message}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setConfirmDialog(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmDialog.onConfirm}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${confirmDialog.confirmClass}`}
              >
                {confirmDialog.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
