import { useThemeStore } from '../stores/themeStore'

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeStore()
  const isDark = theme === 'dark'

  return (
    <button
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`relative inline-flex h-6 w-14 items-center rounded-full transition-colors min-h-[44px] ${
        isDark ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
      }`}
    >
      <span
        className={`inline-flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-200 ${
          isDark ? 'translate-x-9' : 'translate-x-1'
        }`}
      >
        {isDark ? (
          <svg className="w-2.5 h-2.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
          </svg>
        ) : (
          <svg className="w-2.5 h-2.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <circle cx="12" cy="12" r="5" />
            <path strokeLinecap="round" d="M12 1v2m0 18v2m-9-11h2m18 0h2m-3.64-6.36l-1.42 1.42M6.34 17.66l-1.42 1.42m0-12.73l1.42 1.42m11.32 11.31l1.42 1.42" />
          </svg>
        )}
      </span>
    </button>
  )
}
