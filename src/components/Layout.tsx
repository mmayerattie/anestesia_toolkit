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
    <div className="min-h-dvh flex bg-stone-50 dark:bg-[#0f1117] text-stone-800 dark:text-stone-200">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-[220px] md:shrink-0 md:fixed md:inset-y-0 md:left-0 bg-white dark:bg-[#16171f] border-r border-stone-200/70 dark:border-stone-800/50 z-30">
        <SidebarContent onNavigate={() => {}} />
      </aside>

      {/* Mobile backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-stone-900/20 dark:bg-black/50 backdrop-blur-[2px] z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile slide-in sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-[260px] bg-white dark:bg-[#16171f] border-r border-stone-200/70 dark:border-stone-800/50 z-50 md:hidden transform transition-transform duration-200 ease-out ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent onNavigate={() => setMenuOpen(false)} />
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-dvh md:ml-[220px]">
        {/* Mobile header */}
        <header className="flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-[#16171f]/80 backdrop-blur-md border-b border-stone-200/60 dark:border-stone-800/40 md:hidden shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              className="p-2 -ml-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-stone-500 dark:text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-[15px] font-semibold tracking-tight text-stone-700 dark:text-stone-200">
              Alexia Anestesia
            </span>
          </div>
          <ThemeToggle />
        </header>

        <Disclaimer />

        <main className="flex-1 overflow-y-auto px-4 py-5 md:px-8 md:py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function SidebarContent({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="flex items-center justify-between px-5 pt-6 pb-5">
        <div>
          <h1 className="text-[15px] font-bold tracking-tight text-stone-800 dark:text-stone-100">
            Alexia Anestesia
          </h1>
          <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-0.5 tracking-wide uppercase">
            Referencia clinica
          </p>
        </div>
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 border-t border-stone-100 dark:border-stone-800/50" />

      {/* Navigation */}
      <nav className="flex-1 px-3 pt-4 pb-3 space-y-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all min-h-[44px] ${
                isActive
                  ? 'bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400'
                  : 'text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/50 hover:text-stone-700 dark:hover:text-stone-300'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
