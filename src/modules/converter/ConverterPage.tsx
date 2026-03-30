import { useState } from 'react';
import {
  mgToMcg,
  mcgToMg,
  mgToG,
  gToMg,
  mcgToG,
  gToMcg,
  mgPerKgToMg,
  mcgKgMinToMlH,
  mgHToMlH,
  mlHToMcgKgMin,
  mmHgToCmH2O,
  cmH2OToMmHg,
  mmHgToKPa,
  kPaToMmHg,
  cmH2OToKPa,
  kPaToCmH2O,
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  mlToL,
  lToMl,
} from './conversions';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Category = 'masa' | 'infusiones' | 'presion' | 'temperatura' | 'volumen';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Parse string to a positive number, or return NaN */
function parsePositive(raw: string): number {
  if (raw.trim() === '') return NaN;
  const n = Number(raw);
  if (n < 0) return NaN;
  return n;
}

/** Format a number to 2 decimal places for display. Returns "—" when invalid. */
function fmt(n: number): string {
  if (!Number.isFinite(n)) return '—';
  // Avoid "-0.00"
  const rounded = Math.round(n * 100) / 100;
  return rounded.toFixed(2);
}

/** Format a number with up to 6 decimal places, trimming trailing zeros. */
function fmtPrecise(n: number): string {
  if (!Number.isFinite(n)) return '—';
  const rounded = Math.round(n * 1_000_000) / 1_000_000;
  return rounded.toFixed(6).replace(/\.?0+$/, '') || '0';
}

// ---------------------------------------------------------------------------
// Shared UI atoms
// ---------------------------------------------------------------------------

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-3 mt-1">
      {children}
    </h3>
  );
}

function InputLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1"
    >
      {children}
    </label>
  );
}

function NumInput({
  id,
  value,
  onChange,
  placeholder,
  min,
  max,
  step,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: string;
}) {
  return (
    <input
      id={id}
      type="number"
      inputMode="decimal"
      min={min ?? 0}
      max={max}
      step={step ?? 'any'}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full min-h-[44px] px-3 py-2 text-base rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
    />
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2 py-1">
      <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0">{label}</span>
      <span className="text-base font-mono font-semibold text-gray-900 dark:text-gray-100 text-right break-all">
        {value}
      </span>
    </div>
  );
}

function FormulaBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-sm text-amber-900 dark:text-amber-200 font-mono leading-relaxed">
      {children}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-3">
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Category tabs
// ---------------------------------------------------------------------------

const categories: { key: Category; label: string; icon: string }[] = [
  { key: 'masa', label: 'Masa', icon: '' },
  { key: 'infusiones', label: 'Infusiones IV', icon: '' },
  { key: 'presion', label: 'Presion', icon: '' },
  { key: 'temperatura', label: 'Temp.', icon: '' },
  { key: 'volumen', label: 'Volumen', icon: '' },
];

// ---------------------------------------------------------------------------
// MASA section
// ---------------------------------------------------------------------------

function MassSection() {
  const [mg, setMg] = useState('');
  const [mcg, setMcg] = useState('');
  const [g, setG] = useState('');
  const [dosePerKg, setDosePerKg] = useState('');
  const [weight, setWeight] = useState('');

  const mgVal = parsePositive(mg);
  const mcgVal = parsePositive(mcg);
  const gVal = parsePositive(g);
  const doseVal = parsePositive(dosePerKg);
  const wVal = parsePositive(weight);

  return (
    <div className="space-y-4">
      <Card>
        <SectionTitle>mg → mcg / g</SectionTitle>
        <InputLabel htmlFor="mass-mg">Valor (mg)</InputLabel>
        <NumInput id="mass-mg" value={mg} onChange={setMg} placeholder="Ej: 500" />
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <ResultRow label="mcg" value={fmt(mgToMcg(mgVal))} />
          <ResultRow label="g" value={fmtPrecise(mgToG(mgVal))} />
        </div>
      </Card>

      <Card>
        <SectionTitle>mcg → mg / g</SectionTitle>
        <InputLabel htmlFor="mass-mcg">Valor (mcg)</InputLabel>
        <NumInput id="mass-mcg" value={mcg} onChange={setMcg} placeholder="Ej: 250" />
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <ResultRow label="mg" value={fmt(mcgToMg(mcgVal))} />
          <ResultRow label="g" value={fmtPrecise(mcgToG(mcgVal))} />
        </div>
      </Card>

      <Card>
        <SectionTitle>g → mg / mcg</SectionTitle>
        <InputLabel htmlFor="mass-g">Valor (g)</InputLabel>
        <NumInput id="mass-g" value={g} onChange={setG} placeholder="Ej: 1" />
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <ResultRow label="mg" value={fmt(gToMg(gVal))} />
          <ResultRow label="mcg" value={fmt(gToMcg(gVal))} />
        </div>
      </Card>

      <Card>
        <SectionTitle>mg/kg → mg totales</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <InputLabel htmlFor="mass-dose-perkg">Dosis (mg/kg)</InputLabel>
            <NumInput id="mass-dose-perkg" value={dosePerKg} onChange={setDosePerKg} placeholder="Ej: 2" />
          </div>
          <div>
            <InputLabel htmlFor="mass-weight">Peso (kg)</InputLabel>
            <NumInput id="mass-weight" value={weight} onChange={setWeight} placeholder="Ej: 70" min={0} max={500} />
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <ResultRow
            label="Dosis total (mg)"
            value={fmt(mgPerKgToMg(doseVal, wVal))}
          />
        </div>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// INFUSIONES IV section (HIGHEST RISK)
// ---------------------------------------------------------------------------

function InfusionSection() {
  // mcg/kg/min → mL/h
  const [inf1Dose, setInf1Dose] = useState('');
  const [inf1Weight, setInf1Weight] = useState('');
  const [inf1Conc, setInf1Conc] = useState('');

  // mg/h → mL/h
  const [inf2Dose, setInf2Dose] = useState('');
  const [inf2Conc, setInf2Conc] = useState('');

  // mL/h → mcg/kg/min
  const [inf3Rate, setInf3Rate] = useState('');
  const [inf3Weight, setInf3Weight] = useState('');
  const [inf3Conc, setInf3Conc] = useState('');

  const i1d = parsePositive(inf1Dose);
  const i1w = parsePositive(inf1Weight);
  const i1c = parsePositive(inf1Conc);
  const r1 = mcgKgMinToMlH(i1d, i1w, i1c);

  const i2d = parsePositive(inf2Dose);
  const i2c = parsePositive(inf2Conc);
  const r2 = mgHToMlH(i2d, i2c);

  const i3r = parsePositive(inf3Rate);
  const i3w = parsePositive(inf3Weight);
  const i3c = parsePositive(inf3Conc);
  const r3 = mlHToMcgKgMin(i3r, i3w, i3c);

  return (
    <div className="space-y-4">
      {/* mcg/kg/min → mL/h */}
      <Card>
        <SectionTitle>mcg/kg/min → mL/h</SectionTitle>
        <FormulaBox>
          <p className="font-semibold mb-1">Fórmula:</p>
          <p>mL/h = (dosis × peso × 60) / (concentración × 1000)</p>
          <p className="text-xs mt-1 opacity-80">
            El ×1000 convierte mg/mL a mcg/mL para que las unidades sean consistentes.
          </p>
        </FormulaBox>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <InputLabel htmlFor="inf1-dose">Dosis deseada (mcg/kg/min)</InputLabel>
            <NumInput id="inf1-dose" value={inf1Dose} onChange={setInf1Dose} placeholder="Ej: 5" />
          </div>
          <div>
            <InputLabel htmlFor="inf1-weight">Peso del paciente (kg)</InputLabel>
            <NumInput id="inf1-weight" value={inf1Weight} onChange={setInf1Weight} placeholder="Ej: 70" min={0} max={500} />
          </div>
          <div>
            <InputLabel htmlFor="inf1-conc">Concentración de la solución (mg/mL)</InputLabel>
            <NumInput id="inf1-conc" value={inf1Conc} onChange={setInf1Conc} placeholder="Ej: 4" />
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <ResultRow label="Velocidad de infusión (mL/h)" value={fmt(r1)} />
          {Number.isFinite(r1) && (
            <div className="mt-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-2 text-xs font-mono text-blue-800 dark:text-blue-300">
              = ({inf1Dose} × {inf1Weight} × 60) / ({inf1Conc} × 1000) = {fmt(r1)} mL/h
            </div>
          )}
        </div>
      </Card>

      {/* mg/h → mL/h */}
      <Card>
        <SectionTitle>mg/h → mL/h</SectionTitle>
        <FormulaBox>
          <p className="font-semibold mb-1">Fórmula:</p>
          <p>mL/h = dosis (mg/h) / concentración (mg/mL)</p>
        </FormulaBox>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <InputLabel htmlFor="inf2-dose">Dosis deseada (mg/h)</InputLabel>
            <NumInput id="inf2-dose" value={inf2Dose} onChange={setInf2Dose} placeholder="Ej: 200" />
          </div>
          <div>
            <InputLabel htmlFor="inf2-conc">Concentración de la solución (mg/mL)</InputLabel>
            <NumInput id="inf2-conc" value={inf2Conc} onChange={setInf2Conc} placeholder="Ej: 10" />
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <ResultRow label="Velocidad de infusión (mL/h)" value={fmt(r2)} />
          {Number.isFinite(r2) && (
            <div className="mt-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-2 text-xs font-mono text-blue-800 dark:text-blue-300">
              = {inf2Dose} / {inf2Conc} = {fmt(r2)} mL/h
            </div>
          )}
        </div>
      </Card>

      {/* mL/h → mcg/kg/min */}
      <Card>
        <SectionTitle>mL/h → mcg/kg/min</SectionTitle>
        <FormulaBox>
          <p className="font-semibold mb-1">Fórmula:</p>
          <p>mcg/kg/min = (mL/h × concentración × 1000) / (peso × 60)</p>
          <p className="text-xs mt-1 opacity-80">
            El ×1000 convierte mg/mL a mcg/mL para que las unidades sean consistentes.
          </p>
        </FormulaBox>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <InputLabel htmlFor="inf3-rate">Velocidad actual (mL/h)</InputLabel>
            <NumInput id="inf3-rate" value={inf3Rate} onChange={setInf3Rate} placeholder="Ej: 5.25" />
          </div>
          <div>
            <InputLabel htmlFor="inf3-weight">Peso del paciente (kg)</InputLabel>
            <NumInput id="inf3-weight" value={inf3Weight} onChange={setInf3Weight} placeholder="Ej: 70" min={0} max={500} />
          </div>
          <div>
            <InputLabel htmlFor="inf3-conc">Concentración de la solución (mg/mL)</InputLabel>
            <NumInput id="inf3-conc" value={inf3Conc} onChange={setInf3Conc} placeholder="Ej: 4" />
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <ResultRow label="Dosis resultante (mcg/kg/min)" value={fmt(r3)} />
          {Number.isFinite(r3) && (
            <div className="mt-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-2 text-xs font-mono text-blue-800 dark:text-blue-300">
              = ({inf3Rate} × {inf3Conc} × 1000) / ({inf3Weight} × 60) = {fmt(r3)} mcg/kg/min
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PRESION section
// ---------------------------------------------------------------------------

function PressureSection() {
  const [mmHg, setMmHg] = useState('');
  const [cmH2O, setCmH2O] = useState('');
  const [kPa, setKPa] = useState('');

  const mmHgVal = parsePositive(mmHg);
  const cmH2OVal = parsePositive(cmH2O);
  const kPaVal = parsePositive(kPa);

  return (
    <div className="space-y-4">
      <Card>
        <SectionTitle>mmHg →</SectionTitle>
        <InputLabel htmlFor="pres-mmhg">Valor (mmHg)</InputLabel>
        <NumInput id="pres-mmhg" value={mmHg} onChange={setMmHg} placeholder="Ej: 120" />
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <ResultRow label="cmH₂O" value={fmt(mmHgToCmH2O(mmHgVal))} />
          <ResultRow label="kPa" value={fmt(mmHgToKPa(mmHgVal))} />
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500">1 mmHg = 1.36 cmH₂O = 0.133322 kPa</p>
      </Card>

      <Card>
        <SectionTitle>cmH₂O →</SectionTitle>
        <InputLabel htmlFor="pres-cmh2o">Valor (cmH₂O)</InputLabel>
        <NumInput id="pres-cmh2o" value={cmH2O} onChange={setCmH2O} placeholder="Ej: 20" />
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <ResultRow label="mmHg" value={fmt(cmH2OToMmHg(cmH2OVal))} />
          <ResultRow label="kPa" value={fmt(cmH2OToKPa(cmH2OVal))} />
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500">1 cmH₂O = 0.7353 mmHg = 0.0981 kPa</p>
      </Card>

      <Card>
        <SectionTitle>kPa →</SectionTitle>
        <InputLabel htmlFor="pres-kpa">Valor (kPa)</InputLabel>
        <NumInput id="pres-kpa" value={kPa} onChange={setKPa} placeholder="Ej: 13.3" />
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <ResultRow label="mmHg" value={fmt(kPaToMmHg(kPaVal))} />
          <ResultRow label="cmH₂O" value={fmt(kPaToCmH2O(kPaVal))} />
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500">1 kPa = 7.5006 mmHg = 10.1972 cmH₂O</p>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TEMPERATURA section
// ---------------------------------------------------------------------------

function TemperatureSection() {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');

  const cVal = celsius.trim() === '' ? NaN : Number(celsius);
  const fVal = fahrenheit.trim() === '' ? NaN : Number(fahrenheit);

  return (
    <div className="space-y-4">
      <Card>
        <SectionTitle>°C → °F</SectionTitle>
        <InputLabel htmlFor="temp-c">Temperatura (°C)</InputLabel>
        <NumInput id="temp-c" value={celsius} onChange={setCelsius} placeholder="Ej: 36.5" />
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <ResultRow label="°F" value={Number.isFinite(cVal) ? fmt(celsiusToFahrenheit(cVal)) : '—'} />
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500">°F = (°C × 9/5) + 32</p>
      </Card>

      <Card>
        <SectionTitle>°F → °C</SectionTitle>
        <InputLabel htmlFor="temp-f">Temperatura (°F)</InputLabel>
        <NumInput id="temp-f" value={fahrenheit} onChange={setFahrenheit} placeholder="Ej: 98.6" />
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <ResultRow label="°C" value={Number.isFinite(fVal) ? fmt(fahrenheitToCelsius(fVal)) : '—'} />
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500">°C = (°F − 32) × 5/9</p>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// VOLUMEN section
// ---------------------------------------------------------------------------

function VolumeSection() {
  const [ml, setMl] = useState('');
  const [l, setL] = useState('');

  const mlVal = parsePositive(ml);
  const lVal = parsePositive(l);

  return (
    <div className="space-y-4">
      <Card>
        <SectionTitle>mL (= cc) → L</SectionTitle>
        <InputLabel htmlFor="vol-ml">Valor (mL)</InputLabel>
        <NumInput id="vol-ml" value={ml} onChange={setMl} placeholder="Ej: 500" />
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <ResultRow label="L" value={fmtPrecise(mlToL(mlVal))} />
          <ResultRow label="cc" value={fmt(mlVal)} />
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500">1 mL = 1 cc (equivalencia exacta)</p>
      </Card>

      <Card>
        <SectionTitle>L → mL / cc</SectionTitle>
        <InputLabel htmlFor="vol-l">Valor (L)</InputLabel>
        <NumInput id="vol-l" value={l} onChange={setL} placeholder="Ej: 1.5" />
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <ResultRow label="mL" value={fmt(lToMl(lVal))} />
          <ResultRow label="cc" value={fmt(lToMl(lVal))} />
        </div>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------

export default function ConverterPage() {
  const [active, setActive] = useState<Category>('masa');

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        Conversor de unidades clínicas
      </h2>

      {/* Category tabs – scrollable on small screens */}
      <div className="flex gap-1 overflow-x-auto pb-1 -mx-1 px-1">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActive(cat.key)}
            className={`flex items-center gap-1.5 min-h-[44px] px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors shrink-0 ${
              active === cat.key
                ? 'bg-blue-600 text-white dark:bg-blue-500'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Active section */}
      <div>
        {active === 'masa' && <MassSection />}
        {active === 'infusiones' && <InfusionSection />}
        {active === 'presion' && <PressureSection />}
        {active === 'temperatura' && <TemperatureSection />}
        {active === 'volumen' && <VolumeSection />}
      </div>
    </div>
  );
}
