import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Disclaimer from './Disclaimer'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { to: '/vademecum', label: 'Vademecum' },
  { to: '/dosage', label: 'Dosis' },
  { to: '/converter', label: 'Conversiones' },
  { to: '/checklist', label: 'Checklist' },
  { to: '/about', label: 'Acerca de' },
] as const

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-dvh flex bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-[220px] md:shrink-0 md:fixed md:inset-y-0 md:left-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-30">
        <SidebarContent onNavigate={() => {}} />
      </aside>

      {/* Mobile backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 dark:bg-black/50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile slide-in sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-[260px] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50 md:hidden transform transition-transform duration-200 ease-in-out ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent onNavigate={() => setMenuOpen(false)} />
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-dvh md:ml-[220px]">
        {/* Mobile header with hamburger + theme toggle */}
        <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 md:hidden shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              className="p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-base font-bold tracking-tight text-gray-800 dark:text-gray-100">
              Alexia Anestesia
            </h1>
          </div>
          <ThemeToggle />
        </header>

        <Disclaimer />

        <main className="flex-1 overflow-y-auto px-4 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function SidebarContent({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100 dark:border-gray-700">
        <div>
          <h1 className="text-base font-bold tracking-tight text-gray-800 dark:text-gray-100">
            Alexia Anestesia
          </h1>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Referencia clinica rapida</p>
        </div>
        {/* Theme toggle visible on desktop sidebar too */}
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
                isActive
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'
              }`
            }
          >
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
