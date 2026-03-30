import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import Disclaimer from './components/Disclaimer'
import { useThemeStore } from './stores/themeStore'

const VademecumPage = lazy(() => import('./modules/vademecum/VademecumPage'))
const ChecklistPage = lazy(() => import('./modules/checklist/ChecklistPage'))
const ConverterPage = lazy(() => import('./modules/converter/ConverterPage'))
const DosagePage = lazy(() => import('./modules/dosage/DosagePage'))
const AboutPage = lazy(() => import('./modules/about/AboutPage'))

function App() {
  const theme = useThemeStore((s) => s.theme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else if (theme === 'light') {
      root.classList.remove('dark')
    } else {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      const apply = () => {
        if (mq.matches) root.classList.add('dark')
        else root.classList.remove('dark')
      }
      apply()
      mq.addEventListener('change', apply)
      return () => mq.removeEventListener('change', apply)
    }
  }, [theme])

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="min-h-dvh flex flex-col bg-gray-50 dark:bg-gray-900">
            <Disclaimer />
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Cargando...
            </div>
          </div>
        }
      >
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/vademecum" replace />} />
            <Route path="vademecum" element={<VademecumPage />} />
            <Route path="dosage" element={<DosagePage />} />
            <Route path="converter" element={<ConverterPage />} />
            <Route path="checklist" element={<ChecklistPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route
              path="*"
              element={
                <div className="text-center py-16">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    Pagina no encontrada
                  </h2>
                  <p className="text-gray-500">Use el menu de navegacion para volver.</p>
                </div>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
