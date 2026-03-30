import { useState, useRef, useCallback, useEffect } from 'react'
import type { Drug } from '../types'

interface DrugInputProps {
  drugs: Drug[]
  onSelect: (drug: Drug) => void
  placeholder?: string
  excludeNames?: string[]
}

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export default function DrugInput({
  drugs,
  onSelect,
  placeholder = 'Buscar farmaco...',
  excludeNames = [],
}: DrugInputProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Drug[]>([])
  const [highlightIdx, setHighlightIdx] = useState(-1)
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const search = useCallback(
    (q: string) => {
      if (!q.trim()) {
        setResults([])
        return
      }
      const n = normalize(q)
      const excludeSet = new Set(excludeNames.map((e) => normalize(e)))
      const matches = drugs.filter((d) => {
        if (excludeSet.has(normalize(d.name))) return false
        if (normalize(d.name).includes(n)) return true
        return d.aliases.some((a) => normalize(a).includes(n))
      })
      setResults(matches.slice(0, 10))
      setHighlightIdx(-1)
    },
    [drugs, excludeNames],
  )

  const handleChange = (value: string) => {
    setQuery(value)
    setOpen(true)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => search(value), 150)
  }

  const select = (drug: Drug) => {
    onSelect(drug)
    setQuery('')
    setResults([])
    setOpen(false)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || results.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightIdx((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightIdx((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && highlightIdx >= 0) {
      e.preventDefault()
      select(results[highlightIdx])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  useEffect(() => {
    if (highlightIdx >= 0 && listRef.current) {
      const el = listRef.current.children[highlightIdx] as HTMLElement | undefined
      el?.scrollIntoView({ block: 'nearest' })
    }
  }, [highlightIdx])

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        role="combobox"
        aria-expanded={open && results.length > 0}
        aria-haspopup="listbox"
        aria-autocomplete="list"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => query.trim() && setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 border border-stone-200 dark:border-stone-700 rounded-xl bg-white dark:bg-stone-800/60 text-[15px] text-stone-800 dark:text-stone-200 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400 dark:focus:ring-teal-500/30 dark:focus:border-teal-600 transition-shadow"
      />
      {open && results.length > 0 && (
        <ul
          ref={listRef}
          role="listbox"
          className="absolute z-50 w-full mt-1.5 bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700 rounded-xl shadow-lg shadow-stone-200/50 dark:shadow-black/30 max-h-60 overflow-y-auto"
        >
          {results.map((drug, i) => (
            <li
              key={drug.name}
              role="option"
              aria-selected={i === highlightIdx}
              onMouseDown={() => select(drug)}
              className={`px-3.5 py-2.5 cursor-pointer text-sm transition-colors first:rounded-t-xl last:rounded-b-xl ${
                i === highlightIdx
                  ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-800 dark:text-teal-300'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700/50'
              }`}
            >
              <span className="font-medium">{drug.name}</span>
              {drug.aliases.length > 0 && (
                <span className="ml-2 text-stone-400 dark:text-stone-500 text-xs">
                  {drug.aliases.slice(0, 2).join(', ')}
                </span>
              )}
              <span className="ml-2 text-stone-400 dark:text-stone-500 text-[11px] italic">{drug.category}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
