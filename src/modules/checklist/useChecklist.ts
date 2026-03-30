import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type { ChecklistItem, ChecklistState } from '../../types'
import { defaultChecklist } from '../../data/defaultChecklist'
import { safeGetItem, safeSetItem } from '../../utils/storage'

const STRUCTURE_KEY = 'checklist_structure'
const STATE_KEY = 'checklist_state'

interface ChecklistStore {
  items: ChecklistItem[]
  checks: ChecklistState
  toggleCheck: (id: string) => void
  addItem: (item: Omit<ChecklistItem, 'id'>) => void
  removeItem: (id: string) => void
  reorderItems: (activeId: string, overId: string) => void
  resetChecks: () => void
  restoreDefaults: () => void
}

function loadInitialItems(): ChecklistItem[] {
  return safeGetItem<ChecklistItem[]>(STRUCTURE_KEY, defaultChecklist)
}

function loadInitialChecks(): ChecklistState {
  return safeGetItem<ChecklistState>(STATE_KEY, {})
}

export const useChecklist = create<ChecklistStore>()(
  subscribeWithSelector((set) => ({
    items: loadInitialItems(),
    checks: loadInitialChecks(),

    toggleCheck: (id: string) => {
      set((state) => ({
        checks: {
          ...state.checks,
          [id]: !state.checks[id],
        },
      }))
    },

    addItem: (item: Omit<ChecklistItem, 'id'>) => {
      const newItem: ChecklistItem = {
        ...item,
        id: Date.now().toString(),
      }
      set((state) => ({
        items: [...state.items, newItem],
      }))
    },

    removeItem: (id: string) => {
      set((state) => {
        const newChecks = { ...state.checks }
        delete newChecks[id]
        return {
          items: state.items.filter((item) => item.id !== id),
          checks: newChecks,
        }
      })
    },

    reorderItems: (activeId: string, overId: string) => {
      if (activeId === overId) return
      set((state) => {
        const oldIndex = state.items.findIndex((item) => item.id === activeId)
        const newIndex = state.items.findIndex((item) => item.id === overId)
        if (oldIndex === -1 || newIndex === -1) return state
        const newItems = [...state.items]
        const [moved] = newItems.splice(oldIndex, 1)
        newItems.splice(newIndex, 0, moved)
        return { items: newItems }
      })
    },

    resetChecks: () => {
      set({ checks: {} })
    },

    restoreDefaults: () => {
      set({
        items: defaultChecklist,
        checks: {},
      })
    },
  })),
)

// Persist structure changes to localStorage
useChecklist.subscribe(
  (state) => state.items,
  (items) => {
    safeSetItem(STRUCTURE_KEY, items)
  },
)

// Persist check state changes to localStorage
useChecklist.subscribe(
  (state) => state.checks,
  (checks) => {
    safeSetItem(STATE_KEY, checks)
  },
)
