import DrugInput from '../../components/DrugInput';
import { drugs } from '../../data/drugs';
import InteractionTable from './InteractionTable';
import { useInteractions } from './useInteractions';

export default function InteractionsPage() {
  const {
    selectedDrugs,
    interactions,
    loading,
    sourceErrors,
    addDrug,
    removeDrug,
    clearDrugs,
    checkInteractions,
  } = useInteractions();

  const canCheck = selectedDrugs.length >= 2;
  const hasResults = interactions.length > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Interacciones farmacologicas
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Ingrese dos o mas farmacos para verificar interacciones documentadas.
        </p>
      </div>

      {/* Drug input */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Agregar farmaco
        </label>
        <DrugInput
          drugs={drugs}
          onSelect={addDrug}
          placeholder="Buscar farmaco..."
          excludeNames={selectedDrugs.map((d) => d.name)}
        />

        {/* Selected drug tags */}
        {selectedDrugs.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedDrugs.map((drug) => (
              <span
                key={drug.name}
                className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1.5 rounded-full text-sm font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
              >
                {drug.name}
                <button
                  type="button"
                  onClick={() => removeDrug(drug.name)}
                  className="ml-0.5 p-2 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label={`Quitar ${drug.name}`}
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            ))}
            {selectedDrugs.length > 0 && (
              <button
                type="button"
                onClick={clearDrugs}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 px-3 py-2 min-h-[44px] transition-colors"
              >
                Limpiar todo
              </button>
            )}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => checkInteractions(false)}
          disabled={!canCheck || loading}
          className={`px-5 py-3 rounded-xl text-sm font-semibold transition-colors min-h-[44px] ${
            canCheck && !loading
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm active:bg-blue-800'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
          }`}
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <LoadingSpinner />
              Consultando...
            </span>
          ) : (
            'Verificar interacciones'
          )}
        </button>

        {hasResults && !loading && (
          <button
            type="button"
            onClick={() => checkInteractions(true)}
            className="px-4 py-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors min-h-[44px]"
          >
            Forzar actualizacion
          </button>
        )}
      </div>

      {/* Loading state detail */}
      {loading && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900">
          <LoadingSpinner size="lg" />
          <div className="text-sm text-blue-800 dark:text-blue-300">
            <p className="font-medium">Consultando fuentes...</p>
            <p className="text-xs mt-0.5 text-blue-600 dark:text-blue-400">
              RxNorm (NIH) y OpenFDA. Esto puede tomar unos segundos.
            </p>
          </div>
        </div>
      )}

      {/* Results table */}
      {!loading && hasResults && (
        <InteractionTable
          interactions={interactions}
          sourceErrors={sourceErrors}
        />
      )}

      {/* Empty state after checking with no results (shouldn't happen because we show "none" pairs) */}
      {!loading &&
        !hasResults &&
        canCheck &&
        selectedDrugs.length >= 2 && null}
    </div>
  );
}

// ── Loading spinner ─────────────────────────────────────────────────

function LoadingSpinner({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
  return (
    <svg
      className={`animate-spin ${sizeClass} text-current`}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
