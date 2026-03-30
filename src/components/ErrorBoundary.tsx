import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'
import Disclaimer from './Disclaimer'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-dvh flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Disclaimer />
          <main className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <h1 className="text-xl font-bold mb-4">Error inesperado</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Ocurrio un error en la aplicacion. Recargue la pagina para continuar.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors min-h-[44px]"
              >
                Recargar pagina
              </button>
            </div>
          </main>
        </div>
      )
    }
    return this.props.children
  }
}
