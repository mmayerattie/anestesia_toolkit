import type { ReactNode } from 'react'
import { useThemeStore } from '../stores/themeStore'

const icons: Record<string, ReactNode> = {
  dark: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
    </svg>
  ),
  light: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="5" />
      <path strokeLinecap="round" d="M12 1v2m0 18v2m-9-11h2m18 0h2m-3.64-6.36l-1.42 1.42M6.34 17.66l-1.42 1.42m0-12.73l1.42 1.42m11.32 11.31l1.42 1.42" />
    </svg>
  ),
  system: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path strokeLinecap="round" d="M8 21h8m-4-4v4" />
    </svg>
  ),
}

const labels: Record<string, string> = {
  dark: 'Modo oscuro',
  light: 'Modo claro',
  system: 'Tema del sistema',
}

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeStore()

  const next = () => {
    const order: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system']
    const idx = order.indexOf(theme)
    setTheme(order[(idx + 1) % order.length])
  }

  return (
    <button
      onClick={next}
      aria-label={labels[theme]}
      title={labels[theme]}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-500 dark:text-gray-400"
    >
      {icons[theme]}
    </button>
  )
}
