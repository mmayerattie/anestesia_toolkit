import type { DrugInteraction, Severity } from '../../types';
import type { SourceErrors } from './useInteractions';

interface InteractionTableProps {
  interactions: DrugInteraction[];
  sourceErrors: SourceErrors;
}

// ── Severity styling ────────────────────────────────────────────────

const severityConfig: Record<
  Severity,
  { label: string; bg: string; text: string; dot: string }
> = {
  contraindicated: {
    label: 'Contraindicado',
    bg: 'bg-red-100 dark:bg-red-900/40',
    text: 'text-red-800 dark:text-red-300',
    dot: 'bg-red-500',
  },
  major: {
    label: 'Grave',
    bg: 'bg-orange-100 dark:bg-orange-900/40',
    text: 'text-orange-800 dark:text-orange-300',
    dot: 'bg-orange-500',
  },
  moderate: {
    label: 'Moderada',
    bg: 'bg-amber-100 dark:bg-amber-900/40',
    text: 'text-amber-800 dark:text-amber-300',
    dot: 'bg-amber-500',
  },
  minor: {
    label: 'Leve',
    bg: 'bg-yellow-100 dark:bg-yellow-900/40',
    text: 'text-yellow-800 dark:text-yellow-300',
    dot: 'bg-yellow-500',
  },
  none: {
    label: 'Sin interaccion documentada',
    bg: 'bg-green-100 dark:bg-green-900/40',
    text: 'text-green-800 dark:text-green-300',
    dot: 'bg-green-500',
  },
  unknown: {
    label: 'Desconocida',
    bg: 'bg-gray-100 dark:bg-gray-700',
    text: 'text-gray-700 dark:text-gray-300',
    dot: 'bg-gray-400',
  },
};

function SeverityBadge({ severity }: { severity: Severity }) {
  const config = severityConfig[severity];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      <span className={`w-2 h-2 rounded-full ${config.dot}`} aria-hidden />
      {config.label}
    </span>
  );
}

// ── Source label ─────────────────────────────────────────────────────

function SourceLabel({ source }: { source: DrugInteraction['source'] }) {
  if (source === 'unknown') {
    return (
      <span className="text-xs text-gray-400 dark:text-gray-500 italic">
        Sin fuente
      </span>
    );
  }
  return (
    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
      {source}
    </span>
  );
}

// ── Cell text helpers ───────────────────────────────────────────────

function CellText({
  text,
  fallback,
}: {
  text: string | null;
  fallback: string;
}) {
  if (text) {
    return (
      <span className="text-sm text-gray-700 dark:text-gray-300">{text}</span>
    );
  }
  return (
    <span className="text-sm text-gray-400 dark:text-gray-500 italic">
      {fallback}
    </span>
  );
}

// ── Desktop table ───────────────────────────────────────────────────

function DesktopTable({
  interactions,
}: {
  interactions: DrugInteraction[];
}) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Par
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Severidad
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Mecanismo
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Efecto clinico
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Fuente
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {interactions.map((ix, i) => (
            <tr
              key={`${ix.drug1}-${ix.drug2}-${i}`}
              className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                {ix.drug1} + {ix.drug2}
              </td>
              <td className="py-3 px-4">
                <SeverityBadge severity={ix.severity} />
              </td>
              <td className="py-3 px-4 max-w-xs">
                {ix.severity === 'none' ? (
                  <span className="text-sm text-green-600 dark:text-green-400 italic">
                    Sin interaccion documentada
                  </span>
                ) : (
                  <CellText text={ix.mechanism} fallback="Sin datos" />
                )}
              </td>
              <td className="py-3 px-4 max-w-xs">
                {ix.severity === 'none' ? (
                  <span className="text-sm text-gray-400 dark:text-gray-500">
                    --
                  </span>
                ) : (
                  <CellText text={ix.clinicalEffect} fallback="Sin datos" />
                )}
              </td>
              <td className="py-3 px-4">
                <SourceLabel source={ix.source} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Mobile card layout ──────────────────────────────────────────────

function MobileCards({
  interactions,
}: {
  interactions: DrugInteraction[];
}) {
  return (
    <div className="md:hidden space-y-3">
      {interactions.map((ix, i) => (
        <div
          key={`${ix.drug1}-${ix.drug2}-${i}`}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-3"
        >
          {/* Header: drug pair + severity */}
          <div className="flex items-start justify-between gap-2">
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {ix.drug1} + {ix.drug2}
            </span>
            <SeverityBadge severity={ix.severity} />
          </div>

          {ix.severity === 'none' ? (
            <p className="text-sm text-green-600 dark:text-green-400 italic">
              Sin interaccion documentada
            </p>
          ) : (
            <>
              {/* Mechanism */}
              <div>
                <span className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-0.5">
                  Mecanismo
                </span>
                <CellText text={ix.mechanism} fallback="Sin datos" />
              </div>

              {/* Clinical effect */}
              <div>
                <span className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-0.5">
                  Efecto clinico
                </span>
                <CellText text={ix.clinicalEffect} fallback="Sin datos" />
              </div>
            </>
          )}

          {/* Source */}
          <div className="flex justify-end">
            <SourceLabel source={ix.source} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────

export default function InteractionTable({
  interactions,
  sourceErrors,
}: InteractionTableProps) {
  if (interactions.length === 0) return null;

  const hasErrors = sourceErrors.rxnorm || sourceErrors.openfda;

  return (
    <div className="space-y-4">
      {/* Source error banner */}
      {hasErrors && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <span className="text-amber-600 dark:text-amber-400 mt-0.5 shrink-0">
            &#9888;
          </span>
          <div className="text-sm text-amber-800 dark:text-amber-300">
            <p className="font-medium">
              Algunas fuentes no respondieron. Los resultados pueden estar
              incompletos.
            </p>
            <ul className="mt-1 space-y-0.5 text-xs">
              {sourceErrors.rxnorm && (
                <li>
                  No se pudo consultar <strong>RxNorm</strong>. Verificar
                  manualmente.
                </li>
              )}
              {sourceErrors.openfda && (
                <li>
                  No se pudo consultar <strong>OpenFDA</strong>. Verificar
                  manualmente.
                </li>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Results count */}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {interactions.length} par{interactions.length !== 1 ? 'es' : ''}{' '}
        analizado{interactions.length !== 1 ? 's' : ''}
      </p>

      {/* Desktop table */}
      <DesktopTable interactions={interactions} />

      {/* Mobile cards */}
      <MobileCards interactions={interactions} />
    </div>
  );
}
