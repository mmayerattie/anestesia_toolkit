# CLAUDE.md — Alexia Anestesia

## Vision general

App web de referencia clinica para anestesiologos. Nombre comercial: **Alexia Anestesia**. Herramienta de consulta rapida para uso diario en quirofano, sin IA generativa, sin recomendaciones. Todo dato proviene de fuentes documentadas (Miller's Anesthesia 9th ed, Stoelting's Pharmacology 6th ed, Goodman & Gilman 14th ed). Diseño minimalista, pensado para usar entre caso y caso desde Mac o iPhone (PWA).

**Estado actual:** v1.0 desplegada en produccion.
**URL:** https://anesthesia-toolkit.vercel.app
**Repo:** https://github.com/mmayerattie/anestesia_toolkit

---

## Filosofia de diseno

- **Referencia, no recomendacion.** La app muestra datos tal cual vienen de la fuente. No interpreta, no sugiere, no genera texto.
- **Velocidad sobre todo.** Minima friccion. El flujo mas comun debe resolverse en menos de 10 segundos.
- **Confianza trazable.** Cada dato tiene su fuente visible (referencia bibliografica con edicion y capitulo).
- **Sin backend.** Todo en el cliente. Persistencia con localStorage. Sin datos clinicos en la nube. Sin APIs externas.
- **Disclaimer visible.** Banner permanente no dismissible: "Herramienta de referencia clinica. No reemplaza el criterio medico profesional."
- **Sin emojis.** La UI es limpia y profesional, sin iconos emoji. Usar SVG icons donde haga falta.

---

## Stack tecnico

| Capa | Tecnologia |
|---|---|
| Frontend | React 19 + TypeScript (strict) |
| Estilos | Tailwind CSS v4 (via @tailwindcss/vite) |
| Routing | React Router v6 |
| Estado | Zustand (con persist middleware para checklist) |
| Drag & Drop | @dnd-kit/core + @dnd-kit/sortable |
| Persistencia | localStorage (checklist, tema, ultimo peso) |
| Build | Vite 7 |
| PWA | vite-plugin-pwa (autoUpdate, workbox precaching) |
| Deploy | Vercel (manual deploy con `vercel deploy --prod`) |

**No se usan:** APIs externas, axios, librerias de UI components (ShadCN, MUI, etc.)

---

## Estructura del proyecto

```
anesthesia_toolkit/
├── public/
│   ├── manifest.json             # PWA manifest (name: "Alexia Anestesia")
│   ├── favicon.svg
│   └── icons/
│       ├── icon-192.png
│       └── icon-512.png
├── src/
│   ├── main.tsx                  # Entry point, BrowserRouter wrapper
│   ├── App.tsx                   # Routes + ErrorBoundary + Suspense + dark mode
│   ├── index.css                 # Tailwind import + theme + dark variant
│   ├── components/
│   │   ├── Layout.tsx            # Sidebar nav (desktop) + hamburger (mobile) + disclaimer
│   │   ├── Disclaimer.tsx        # Banner permanente (role="alert")
│   │   ├── DrugInput.tsx         # Autocomplete input con busqueda accent-insensitive
│   │   ├── ErrorBoundary.tsx     # Catch de errores, mantiene disclaimer visible
│   │   └── ThemeToggle.tsx       # Ciclo light/dark/system con SVG icons
│   ├── modules/
│   │   ├── vademecum/
│   │   │   ├── VademecumPage.tsx     # Grilla de fichas + vista detalle
│   │   │   └── DrugCardPreview.tsx   # Card compacta para la grilla
│   │   ├── dosage/
│   │   │   ├── DosagePage.tsx        # Selector de farmaco + peso + contexto
│   │   │   ├── DosageResult.tsx      # Card de resultado con alertas de seguridad
│   │   │   └── dosageData.ts         # 23 farmacos con rangos de dosis
│   │   ├── converter/
│   │   │   ├── ConverterPage.tsx     # 5 categorias con tabs
│   │   │   └── conversions.ts        # 25 funciones puras de conversion
│   │   ├── checklist/
│   │   │   ├── ChecklistPage.tsx     # Lista con drag-and-drop
│   │   │   ├── ChecklistItem.tsx     # Item sortable individual
│   │   │   └── useChecklist.ts       # Zustand store con 2 keys de localStorage
│   │   └── about/
│   │       └── AboutPage.tsx         # Descripcion, fuentes, citaciones, limitaciones
│   ├── data/
│   │   ├── drugs.ts              # Lista maestra: 23 farmacos con aliases
│   │   ├── vademecumData.ts      # Fichas completas: farmacocinetica, diluciones, contraindicaciones
│   │   └── defaultChecklist.ts   # 23 items default en 4 categorias
│   ├── stores/
│   │   └── themeStore.ts         # Zustand persist para preferencia de tema
│   ├── types/
│   │   └── index.ts              # Tipos compartidos (Drug, DrugCard, DosageRange, ChecklistItem, etc.)
│   └── utils/
│       └── storage.ts            # safeGetItem/safeSetItem con try/catch para localStorage
├── CLAUDE.md
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
└── package.json
```

---

## Modulos

### 1. Vademecum Anestesico (`/vademecum` — landing page)

Fichas de referencia rapida de 23 farmacos. Reemplazo del modulo original de interacciones (las APIs de RxNorm/OpenFDA resultaron inutiles para farmacos anestesicos — la mayoria devuelve "sin interaccion documentada").

**Contenido por farmaco:**
- Farmacocinetica: onset, pico, duracion, metabolismo, eliminacion
- Diluciones y preparaciones estandar (seccion mas prominente — uso diario)
- Contraindicaciones (estilo rojo/alerta)
- Precauciones (estilo ambar)
- Tips clinicos (2-3 por farmaco)
- Referencia bibliografica

**Datos en:** `src/data/vademecumData.ts` (exporta `vademecumData: DrugCard[]` y `findDrugCard()`)

### 2. Calculadora de Dosis (`/dosage`)

Calculo de dosis por peso para 23 farmacos. Datos hardcodeados de Miller's, Stoelting's, Goodman & Gilman.

**Features:**
- Selector de farmaco con autocomplete
- Input de peso (persiste en localStorage)
- Contexto clinico: Induccion / Mantenimiento / Sedacion / Analgesia
- Calculo reactivo sin boton
- Alertas: dosis maxima absoluta (rojo), peso fuera de rango (ambar)
- Notas clinicas siempre visibles
- Soporte para unidades: mg/kg, mcg/kg, mcg/kg/min, mcg/kg/h, mg/kg/h
- Rutas: IV, IM, inhaled, regional

**Datos en:** `src/modules/dosage/dosageData.ts`

### 3. Conversor de Unidades (`/converter`)

Conversiones clinicas puras sin APIs. 25 funciones de conversion en 5 categorias.

**Categorias:** Masa, Infusiones IV, Presion, Temperatura, Volumen
**Critico:** La formula de infusion IV (mcg/kg/min → mL/h) muestra la formula usada junto al resultado para que el clinico pueda verificar.

**Logica en:** `src/modules/converter/conversions.ts`

### 4. Checklist Pre-Anestesia (`/checklist`)

23 items default en 4 categorias (Paciente, Equipo, Farmacos, Plan). Customizable.

**Features:**
- Drag-and-drop (dnd-kit)
- Agregar items custom
- Categorias colapsables
- Barra de progreso con conteo separado de items obligatorios
- "Resetear para nuevo paciente" (limpia checks, mantiene estructura)
- "Restaurar checklist original" (vuelve a los 23 default)
- Ambas acciones con dialogo de confirmacion

**Persistencia:** Dos keys de localStorage: `checklist_structure` y `checklist_state`

### 5. Acerca de (`/about`)

Pagina informativa para el usuario final (perfil medico). Incluye:
- Que hace la app
- Origen de los datos con citaciones bibliograficas completas (autor, edicion, editorial, ano)
- Limitaciones importantes
- Nota tecnica: sin datos de pacientes, sin servidores externos, instalable como PWA

---

## Navegacion

Sidebar lateral (no bottom tabs):
- Desktop (md+): sidebar fija 220px a la izquierda
- Mobile: hamburger menu con slide-in desde la izquierda + backdrop

Items: Vademecum, Dosis, Conversiones, Checklist, Acerca de

---

## Esquema visual

- Fondo: gray-50 (da profundidad contra sidebar blanco)
- Sidebar: blanco, borde derecho sutil
- Item activo: bg-blue-50 text-blue-600
- Texto: gray-800 (no negro puro)
- Dark mode: gray-900/gray-800, toggle con SVG icons (sin emojis)
- Alto contraste para quirofano con luz variable
- Touch targets minimo 44x44px (WCAG, uso con guantes)
- Font minimo 16px en inputs (previene zoom en iOS)

---

## Seguridad y datos

- Sin APIs externas. Todo hardcodeado.
- Sin API keys, tokens, ni secretos.
- Sin `dangerouslySetInnerHTML`, `eval()`, ni inyeccion DOM.
- localStorage solo guarda: checklist, tema, ultimo peso. Sin datos de pacientes.
- `.gitignore` incluye `.env`, `.env.*`, `node_modules`, `dist`, `.vercel`
- ErrorBoundary mantiene disclaimer visible incluso en crash
- Disclaimer presente en: paginas normales, Suspense fallback, ErrorBoundary fallback

---

## Fuentes bibliograficas

Todas las dosis, farmacocinetica y datos clinicos provienen de:

1. **Miller's Anesthesia, 9th ed.** — Miller RD et al. Elsevier, 2020.
2. **Stoelting's Pharmacology, 6th ed.** — Flood P et al. Wolters Kluwer, 2022.
3. **Goodman & Gilman, 14th ed.** — Brunton LL et al. McGraw-Hill, 2023.

---

## Los 23 farmacos incluidos

Propofol, Tiopental, Ketamina, Etomidato, Midazolam, Diazepam, Lorazepam, Fentanilo, Sufentanilo, Remifentanilo, Morfina, Rocuronio, Vecuronio, Cisatracurio, Succinilcolina, Neostigmina, Atropina, Efedrina, Noradrenalina, Dexmedetomidina, Lidocaina, Bupivacaina, Ropivacaina.

---

## Notas para Claude Code

- **No hacer commits automaticamente.** El usuario controla git. Proveer los comandos.
- Priorizar legibilidad sobre optimizacion prematura
- Cada modulo es independiente (no shared state entre modulos salvo la lista de farmacos)
- Los datos hardcodeados deben estar en archivos `.ts` separados, facilmente editables
- Cada entrada de dosis debe tener la fuente bibliografica
- Solo Tailwind puro (sin ShadCN, MUI, etc.)
- Sin emojis en la UI. Usar SVG icons.
- Sidebar lateral, no tabs inferiores.
- Esquema de colores claro (gray-50 fondo, white sidebar).
- Texto en espanol.
