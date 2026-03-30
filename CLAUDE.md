# CLAUDE.md — Anesthesia Toolkit

## Visión general del proyecto

App web para uso clínico diario de una médica anestesista. Herramienta de referencia rápida, sin IA generativa, sin recomendaciones. Todo dato mostrado proviene de fuentes documentadas o bases de datos oficiales. Diseño minimalista, pensado para usar entre caso y caso, desde Mac o iPhone (PWA-ready).

---

## Filosofía de diseño

- **Referencia, no recomendación.** La app muestra datos tal cual vienen de la fuente. No interpreta, no sugiere, no genera texto.
- **Velocidad sobre todo.** Mínima fricción. El flujo más común debe resolverse en menos de 10 segundos.
- **Confianza trazable.** Cada dato tiene su fuente visible (OpenFDA, DrugBank, RxNorm, referencia bibliográfica).
- **Sin backend complejo.** Todo lo posible en el cliente. Persistencia con localStorage. Sin datos clínicos en la nube.
- **Disclaimer visible.** En header o footer permanente: "Herramienta de referencia. No reemplaza criterio clínico."

---

## Stack técnico

| Capa | Tecnología |
|---|---|
| Frontend | React + TypeScript |
| Estilos | Tailwind CSS |
| Routing | React Router v6 |
| Estado global | Zustand |
| Persistencia local | localStorage (checklist, historial) |
| APIs externas | OpenFDA, RxNorm (NIH), DrugBank (opcional) |
| HTTP client | Axios o fetch nativo |
| Deploy | Vercel (o local en Mac como PWA) |
| PWA | Vite PWA plugin |

---

## Estructura del proyecto

```
anesthesia-toolkit/
├── public/
│   ├── manifest.json          # PWA manifest
│   └── icons/                 # App icons (512x512, 192x192)
├── src/
│   ├── main.tsx
│   ├── App.tsx                # Router + layout principal
│   ├── components/
│   │   ├── Layout.tsx         # Nav tabs + disclaimer footer
│   │   ├── DrugInput.tsx      # Input con autocomplete de fármacos
│   │   └── Disclaimer.tsx     # Banner permanente
│   ├── modules/
│   │   ├── interactions/
│   │   │   ├── InteractionsPage.tsx
│   │   │   ├── InteractionTable.tsx
│   │   │   └── useInteractions.ts     # Lógica + llamadas API
│   │   ├── dosage/
│   │   │   ├── DosagePage.tsx
│   │   │   ├── DosageResult.tsx
│   │   │   └── dosageData.ts          # Datos hardcodeados por fármaco
│   │   ├── converter/
│   │   │   ├── ConverterPage.tsx
│   │   │   └── conversions.ts         # Lógica de conversión
│   │   └── checklist/
│   │       ├── ChecklistPage.tsx
│   │       ├── ChecklistItem.tsx
│   │       └── useChecklist.ts        # Persistencia localStorage
│   ├── data/
│   │   ├── drugs.ts           # Lista maestra de fármacos anestésicos
│   │   └── defaultChecklist.ts
│   ├── services/
│   │   ├── openfda.ts         # Wrapper API OpenFDA
│   │   └── rxnorm.ts          # Wrapper API RxNorm
│   └── types/
│       └── index.ts           # Tipos compartidos
├── CLAUDE.md
├── vite.config.ts
└── package.json
```

---

## Módulo 1 — Drug Interaction Checker

### Descripción
El usuario ingresa N fármacos. La app genera todos los pares posibles y consulta las APIs para traer interacciones documentadas. Muestra una tabla sin interpretación adicional.

### UX flow
1. Input con autocomplete (lista de fármacos anestésicos comunes)
2. Tags removibles por cada fármaco agregado
3. Botón "Verificar interacciones"
4. Tabla de resultados con todos los pares

### APIs a usar

**RxNorm (NIH) — gratuita, sin key**
- Normalizar nombre del fármaco a RxCUI: `GET https://rxnav.nlm.nih.gov/REST/rxcui.json?name={drug}`
- Obtener interacciones: `GET https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis={cui1}+{cui2}`

**OpenFDA — gratuita, sin key (con rate limits)**
- Drug interactions: `GET https://api.fda.gov/drug/label.json?search=drug_interactions:{drug_name}&limit=1`
- Usar para complementar con texto de la etiqueta oficial FDA

**DrugBank API — requiere registro (plan gratuito disponible)**
- Más estructurada y completa. Priorizar si se obtiene key.
- `GET https://api.drugbank.com/v1/drug-interactions?drugbank_id={id}`

### Output — estructura de la tabla

| Par | Severidad | Mecanismo | Efecto clínico | Fuente |
|---|---|---|---|---|
| Propofol + Fentanilo | 🟠 Moderada | Depresión sinérgica SNC | Apnea, hipotensión | OpenFDA |
| Propofol + Midazolam | 🟠 Moderada | Potenciación sedante | Hipotensión | RxNorm |
| Rocuronio + Fentanilo | 🟢 Sin interacción documentada | — | — | RxNorm |

### Severidad — mapeo de colores
- 🔴 Grave / Contraindicated
- 🟠 Moderada / Major
- 🟡 Leve / Minor
- 🟢 Sin interacción documentada

### Reglas importantes
- Mostrar TODOS los pares, incluyendo los sin interacción documentada (para que ella vea que fueron revisados)
- No agregar texto propio. Solo lo que viene de la API.
- Si la API no devuelve datos, mostrar: "Sin datos en [fuente]. Verificar manualmente."
- No bloquear el flujo si una API falla — mostrar resultado parcial con indicación de cuál falló

### Tipos TypeScript

```typescript
type Severity = 'contraindicated' | 'major' | 'moderate' | 'minor' | 'none' | 'unknown';

interface DrugInteraction {
  drug1: string;
  drug2: string;
  severity: Severity;
  mechanism: string | null;
  clinicalEffect: string | null;
  source: 'OpenFDA' | 'RxNorm' | 'DrugBank' | 'unknown';
  sourceUrl?: string;
}
```

---

## Módulo 2 — Calculadora de dosis por peso

### Descripción
La usuaria selecciona un fármaco e ingresa el peso del paciente en kg. La app muestra el rango de dosis documentado y el cálculo resultante. Datos hardcodeados de referencias estándar (Miller's Anesthesia, Goodman & Gilman).

### UX flow
1. Selector de fármaco (dropdown o search)
2. Input numérico: peso en kg
3. Selector de contexto clínico si aplica: Inducción / Mantenimiento / Sedación / Analgesia
4. Resultado inmediato (sin botón, reactivo)

### Estructura de datos — `dosageData.ts`

```typescript
interface DosageRange {
  minDose: number;      // mg/kg o mcg/kg
  maxDose: number;
  unit: 'mg/kg' | 'mcg/kg' | 'mg/kg/h' | 'mcg/kg/min';
  context: 'induction' | 'maintenance' | 'sedation' | 'analgesia';
  route: 'IV' | 'IM' | 'inhaled';
  notes: string | null;  // ej: "Reducir en ancianos"
  reference: string;     // ej: "Miller's Anesthesia, 9th ed."
}

interface DrugDosage {
  name: string;
  aliases: string[];
  dosages: DosageRange[];
}
```

### Fármacos a incluir (mínimo viable)
Propofol, Tiopental, Ketamina, Etomidato, Midazolam, Diazepam, Lorazepam, Fentanilo, Sufentanilo, Remifentanilo, Morfina, Rocuronio, Vecuronio, Cisatracurio, Succinilcolina, Neostigmina, Atropina, Efedrina, Noradrenalina, Dexmedetomidina, Lidocaína, Bupivacaína, Ropivacaína.

### Output

```
Propofol — Inducción IV
Rango: 1.5 – 2.5 mg/kg
Peso: 70 kg
─────────────────────
Dosis mínima: 105 mg
Dosis máxima: 175 mg

Nota: Reducir en ancianos, ASA III-IV o premedicados.
Fuente: Miller's Anesthesia, 9th ed.
```

### Reglas
- El cálculo es instantáneo y reactivo al cambiar peso o contexto
- Si hay nota clínica relevante, mostrarla siempre (sin omitirla)
- Mostrar la referencia bibliográfica en todos los casos

---

## Módulo 3 — Conversor de unidades clínicas

### Descripción
Conversiones frecuentes en anestesia. Calculadora directa, sin APIs.

### Conversiones a implementar

**Masa**
- mg ↔ mcg ↔ g
- mg/kg → mg (requiere peso)

**Infusiones IV**
- mcg/kg/min → mL/h (requiere peso, concentración de la solución)
- mg/h → mL/h (requiere concentración)
- mL/h → mcg/kg/min (inverso)

**Presión**
- mmHg ↔ cmH₂O ↔ kPa

**Temperatura**
- °C ↔ °F

**Volumen**
- mL ↔ L ↔ cc

### UX
- Tabs o acordeón por categoría
- Inputs reactivos (resultado en tiempo real)
- Para infusiones: formulario con campos: dosis deseada + peso + concentración de la solución preparada → resultado en mL/h

---

## Módulo 4 — Checklist pre-anestesia personalizable

### Descripción
Checklist pre-anestesia con ítems base que la médica puede editar, agregar y reordenar. Se persiste en localStorage. Se puede resetear para cada nuevo paciente.

### Checklist base (default)

```typescript
const defaultChecklist = [
  // Evaluación del paciente
  { id: '1', category: 'Paciente', label: 'Consentimiento informado firmado', required: true },
  { id: '2', category: 'Paciente', label: 'Ayuno verificado (sólidos >6h, líquidos >2h)', required: true },
  { id: '3', category: 'Paciente', label: 'Alergias confirmadas', required: true },
  { id: '4', category: 'Paciente', label: 'Medicación habitual relevada', required: true },
  { id: '5', category: 'Paciente', label: 'ASA clasificado', required: false },
  { id: '6', category: 'Paciente', label: 'Vía aérea evaluada (Mallampati, apertura bucal, extensión cervical)', required: true },
  { id: '7', category: 'Paciente', label: 'Antecedentes anestésicos revisados', required: false },
  // Equipo
  { id: '8', category: 'Equipo', label: 'Máquina de anestesia chequeada', required: true },
  { id: '9', category: 'Equipo', label: 'Vaporizadores verificados', required: true },
  { id: '10', category: 'Equipo', label: 'Circuito respiratorio armado y testeado', required: true },
  { id: '11', category: 'Equipo', label: 'Laringoscopio funcional', required: true },
  { id: '12', category: 'Equipo', label: 'TET / ML disponibles (tamaños)', required: true },
  { id: '13', category: 'Equipo', label: 'Acceso venoso confirmado', required: true },
  { id: '14', category: 'Equipo', label: 'Monitoreo conectado (ECG, SpO2, NIBP)', required: true },
  // Fármacos
  { id: '15', category: 'Fármacos', label: 'Inducción preparada', required: true },
  { id: '16', category: 'Fármacos', label: 'Relajante muscular disponible', required: false },
  { id: '17', category: 'Fármacos', label: 'Reversor disponible (sugammadex / neostigmina)', required: false },
  { id: '18', category: 'Fármacos', label: 'Vasopresores disponibles', required: true },
  { id: '19', category: 'Fármacos', label: 'Atropina disponible', required: true },
  { id: '20', category: 'Fármacos', label: 'Adrenalina disponible (emergencia)', required: true },
  // Plan
  { id: '21', category: 'Plan', label: 'Técnica anestésica definida', required: true },
  { id: '22', category: 'Plan', label: 'Plan de vía aérea difícil considerado', required: false },
  { id: '23', category: 'Plan', label: 'Plan analgésico postoperatorio definido', required: false },
];
```

### Features
- Marcar/desmarcar ítems (check)
- Agregar ítem custom con label y categoría
- Eliminar ítems
- Reordenar con drag & drop (react-beautiful-dnd o dnd-kit)
- Botón "Resetear para nuevo paciente" — limpia los checks pero mantiene la estructura
- Botón "Restaurar checklist original" — vuelve al default
- Categorías colapsables
- Los ítems con `required: true` se destacan visualmente

### Persistencia
```typescript
// Guardar estructura (ítems customizados)
localStorage.setItem('checklist_structure', JSON.stringify(items));

// Guardar estado de checks (se borra al resetear)
localStorage.setItem('checklist_state', JSON.stringify(checks));
```

---

## Layout general

### Navegación
Tabs fijas en la parte inferior (mobile-first) o sidebar en desktop:
- 💊 Interacciones
- ⚖️ Dosis
- 🔁 Conversiones
- ✅ Checklist

### Disclaimer permanente
```
⚠️ Herramienta de referencia clínica. No reemplaza el criterio médico profesional.
```
Visible en todas las pantallas, no dismissible.

### Tema visual
- Fondo blanco o gris muy claro
- Tipografía sans-serif, legible (Inter o System UI)
- Sin ornamentación innecesaria
- Alto contraste para uso en quirófano con luz variable
- Dark mode opcional (localStorage preference)

---

## PWA — configuración mínima

```json
// public/manifest.json
{
  "name": "Anesthesia Toolkit",
  "short_name": "AnesToolkit",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#1e293b",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

Vite PWA plugin para service worker y cache offline de la app (los datos hardcodeados funcionan sin internet; las APIs de interacciones requieren conexión).

---

## Rate limits y manejo de errores en APIs

| API | Límite | Con key |
|---|---|---|
| RxNorm (NIH) | Sin límite documentado | No requiere |
| OpenFDA | 1000 req/día sin key | 120.000/día con key gratuita |
| DrugBank | Plan gratuito limitado | Sí, requiere registro |

### Estrategia
- Cachear en localStorage los resultados de interacciones por par de fármacos (TTL: 7 días)
- Si la API falla, mostrar mensaje claro: *"No se pudo consultar [fuente]. Verificar manualmente."*
- Nunca mostrar un error vacío o silencioso

---

## Orden de implementación sugerido

1. Setup del proyecto (Vite + React + TS + Tailwind + Router)
2. Layout base con tabs y disclaimer
3. Lista maestra de fármacos (`drugs.ts`)
4. **Módulo Checklist** — sin APIs, más rápido de testear
5. **Módulo Conversor** — lógica pura, sin APIs
6. **Módulo Dosis** — datos hardcodeados, sin APIs
7. **Módulo Interacciones** — integración APIs RxNorm + OpenFDA
8. PWA setup
9. Dark mode
10. QA en iPhone (Safari)

---

## Notas finales para Claude Code

- Priorizar legibilidad del código sobre optimización prematura
- Cada módulo debe ser completamente independiente (no shared state entre módulos salvo la lista de fármacos)
- Los datos hardcodeados de dosis deben estar en archivos `.ts` separados, fácilmente editables
- Agregar comentarios con la fuente bibliográfica en cada entrada de dosis
- No usar librerías de UI components (ShadCN, MUI, etc.) — solo Tailwind puro para mantener el bundle liviano
