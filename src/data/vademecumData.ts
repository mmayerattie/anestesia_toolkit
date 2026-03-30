import type { DrugCard } from '../types'

/**
 * Vademécum Anestésico — Fichas de referencia clínica rápida
 *
 * Fuentes principales:
 *   - Miller's Anesthesia, 9th ed. (2020)
 *   - Stoelting's Pharmacology & Physiology in Anesthetic Practice, 6th ed. (2021)
 *   - Prospectos oficiales ANMAT / insertos del fabricante
 *   - Guías institucionales de preparación de fármacos en anestesia
 *
 * Todos los datos son de referencia. No reemplazan el criterio médico profesional.
 */

export const vademecumData: DrugCard[] = [
  // ============================================================
  // HIPNOTICOS / AGENTES DE INDUCCION
  // ============================================================
  {
    name: 'Propofol',
    category: 'Hipnótico',
    onset: '30-45 s IV',
    peakEffect: '1-2 min',
    duration: '5-10 min (bolo único)',
    metabolism: 'Hepático (CYP2B6) y extrahepático (pulmón, riñón)',
    elimination: 'Renal (metabolitos inactivos)',
    contraindications: [
      'Alergia al propofol o a sus componentes (lecitina de huevo, aceite de soja)',
      'No utilizar para sedación en menores de 3 años en UCI (síndrome por infusión de propofol)',
    ],
    precautions: [
      'Reducir dosis en ancianos, hipovolémicos, ASA III-IV',
      'Hipotensión dosis-dependiente por vasodilatación y depresión miocárdica',
      'Dolor a la inyección: considerar lidocaína previa o en mezcla',
      'No posee efecto analgésico',
    ],
    dilutions: [
      {
        description: 'Ampolla 200 mg/20 mL = 10 mg/mL. Usar sin diluir.',
        concentration: '10 mg/mL',
        commonPreparation: 'Ampolla 200 mg/20 mL (1%). Agitar antes de usar. Descartar si hay separación de fases.',
      },
      {
        description: 'Propofol al 2%: 500 mg/50 mL = 10 mg/mL en vial de infusión.',
        concentration: '20 mg/mL (al 2%)',
        commonPreparation: 'Vial 500 mg/50 mL para infusión continua.',
      },
    ],
    clinicalPearls: [
      'Premedicar con lidocaína 20-40 mg IV o en mezcla (0.5 mL de lidocaína 2% por cada 20 mL de propofol) para reducir dolor a la inyección.',
      'El propofol carece de efecto analgésico; siempre asociar opioide si se requiere analgesia.',
      'Tiene efecto antiemético: útil en pacientes con alto riesgo de NVPO.',
    ],
    reference: 'Miller\'s Anesthesia, 9th ed., Cap. 23; Stoelting\'s Pharmacology, 6th ed., Cap. 5',
  },
  {
    name: 'Tiopental',
    category: 'Hipnótico',
    onset: '30-45 s IV',
    peakEffect: '1 min',
    duration: '5-10 min (bolo único); acumulación con dosis repetidas',
    metabolism: 'Hepático (oxidación microsomal)',
    elimination: 'Renal (metabolitos inactivos). Redistribución rápida a tejido graso.',
    contraindications: [
      'Porfiria aguda intermitente y otras porfirias hepáticas',
      'Alergia a barbitúricos',
      'Estatus asmático (puede liberar histamina)',
    ],
    precautions: [
      'Depresión cardiovascular marcada en hipovolemia',
      'Necrosis tisular si hay extravasación (pH alcalino ~10.5)',
      'No posee efecto analgésico; puede producir hiperalgesia en dosis subanestésicas',
      'Acumulación con dosis repetidas: despertar prolongado',
    ],
    dilutions: [
      {
        description: 'Reconstituir 500 mg en 20 mL de SF o agua destilada = 25 mg/mL (solución al 2.5%).',
        concentration: '25 mg/mL (al 2.5%)',
        commonPreparation: 'Frasco-ampolla 500 mg liofilizado. Reconstituir en 20 mL SF. Usar dentro de 24 h.',
      },
    ],
    clinicalPearls: [
      'Verificar siempre la permeabilidad venosa antes de inyectar: la extravasación causa necrosis tisular grave.',
      'Reduce la presión intracraneana (PIC): útil en neuroanestesia.',
      'Contraindicado en porfirias: siempre descartar antes de usar.',
    ],
    reference: 'Miller\'s Anesthesia, 9th ed., Cap. 23; Stoelting\'s Pharmacology, 6th ed., Cap. 5',
  },
  {
    name: 'Ketamina',
    category: 'Disociativo',
    onset: '30-60 s IV; 3-5 min IM',
    peakEffect: '1-2 min IV; 5-15 min IM',
    duration: '10-20 min IV; 20-60 min IM',
    metabolism: 'Hepático (CYP3A4, CYP2B6). Metabolito activo: norketamina.',
    elimination: 'Renal (metabolitos)',
    contraindications: [
      'Hipertensión arterial no controlada',
      'Eclampsia / preeclampsia severa',
      'Aneurisma aórtico o cerebral conocido',
      'Antecedente de psicosis o esquizofrenia',
      'Hipertensión intracraneana (controvertido; uso aceptado con ventilación controlada)',
    ],
    precautions: [
      'Aumenta la FC, PA y presión intraocular',
      'Produce sialorrea: asociar atropina o glicopirrolato',
      'Reacciones disociativas al despertar (más frecuentes en adultos): asociar benzodiacepina',
      'Mantiene reflejos de vía aérea pero no protege de aspiración',
    ],
    dilutions: [
      {
        description: 'Ampolla 500 mg/10 mL = 50 mg/mL. Diluir para uso IV en bolo.',
        concentration: '50 mg/mL (concentración original)',
        commonPreparation: 'Ampolla 500 mg/10 mL. Para bolo IV: diluir a 10 mg/mL (1 mL en 4 mL SF). Para IM: usar sin diluir.',
      },
      {
        description: 'Diluir 200 mg (4 mL) en 16 mL SF = 10 mg/mL para titulación IV.',
        concentration: '10 mg/mL',
        commonPreparation: 'Preparar jeringa de 20 mL: 4 mL ketamina (200 mg) + 16 mL SF.',
      },
    ],
    clinicalPearls: [
      'Único agente de inducción que mantiene la estabilidad hemodinámica y la ventilación espontánea: ideal para pacientes inestables.',
      'Asociar midazolam 1-2 mg IV para prevenir reacciones disfóricas al despertar.',
      'Produce broncodilatación: considerar en asmáticos graves.',
    ],
    reference: 'Miller\'s Anesthesia, 9th ed., Cap. 23; Stoelting\'s Pharmacology, 6th ed., Cap. 5',
  },
  {
    name: 'Etomidato',
    category: 'Hipnótico',
    onset: '15-45 s IV',
    peakEffect: '1 min',
    duration: '3-8 min',
    metabolism: 'Hepático (hidrólisis por esterasas) y plasmático',
    elimination: 'Renal (metabolitos inactivos)',
    contraindications: [
      'Insuficiencia suprarrenal conocida',
      'No recomendado en infusión continua ni dosis repetidas (supresión adrenal)',
      'Sepsis (supresión adrenal puede empeorar pronóstico)',
    ],
    precautions: [
      'Supresión adrenal transitoria (bloquea 11-beta-hidroxilasa) incluso con dosis única',
      'Mioclonías frecuentes a la inducción: pueden confundirse con convulsiones',
      'Dolor a la inyección',
      'Sin efecto analgésico',
    ],
    dilutions: [
      {
        description: 'Ampolla 20 mg/10 mL = 2 mg/mL. Usar sin diluir.',
        concentration: '2 mg/mL',
        commonPreparation: 'Ampolla 20 mg/10 mL. Lista para uso IV directo.',
      },
    ],
    clinicalPearls: [
      'Agente de elección para inducción en pacientes con inestabilidad hemodinámica (mínimo efecto cardiovascular).',
      'Premedicar con opioide (fentanilo 1-2 mcg/kg) para reducir mioclonías.',
      'No usar en infusión continua ni dosis repetidas por riesgo de crisis adrenal.',
    ],
    reference: 'Miller\'s Anesthesia, 9th ed., Cap. 23; Stoelting\'s Pharmacology, 6th ed., Cap. 5',
  },

  // ============================================================
  // BENZODIACEPINAS
  // ============================================================
  {
    name: 'Midazolam',
    category: 'Benzodiacepina',
    onset: '1-2 min IV; 5-15 min IM',
    peakEffect: '3-5 min IV; 15-30 min IM',
    duration: '15-30 min (sedación); 1-2 h (amnesia)',
    metabolism: 'Hepático (CYP3A4). Metabolito activo: alfa-hidroximidazolam.',
    elimination: 'Renal (metabolitos conjugados)',
    contraindications: [
      'Alergia a benzodiacepinas',
      'Miastenia gravis (sin soporte ventilatorio)',
      'Glaucoma de ángulo cerrado agudo',
    ],
    precautions: [
      'Potencia la depresión respiratoria con opioides',
      'Reducir dosis en ancianos (hasta 50%)',
      'Reducir dosis en insuficiencia hepática',
      'Amnesia anterógrada: advertir al paciente',
    ],
    dilutions: [
      {
        description: 'Ampolla 15 mg/3 mL = 5 mg/mL. Diluir para titulación.',
        concentration: '5 mg/mL (concentración original)',
        commonPreparation: 'Ampolla 15 mg/3 mL. Para titulación: diluir 1 mL (5 mg) en 4 mL SF = 1 mg/mL.',
      },
      {
        description: 'Ampolla 5 mg/5 mL = 1 mg/mL. Lista para uso IV.',
        concentration: '1 mg/mL',
        commonPreparation: 'Ampolla 5 mg/5 mL. Usar sin diluir para titulación IV.',
      },
    ],
    clinicalPearls: [
      'Premedicación ansiolítica de elección: 1-2 mg IV produce amnesia anterógrada en 2-3 min.',
      'Reversor: flumazenil 0.2 mg IV cada 60 s (máx 1 mg). Recordar que el efecto del flumazenil es más corto que el del midazolam.',
      'Ajustar dosis al asociar con opioides: efecto sinérgico sobre depresión respiratoria.',
    ],
    reference: 'Miller\'s Anesthesia, 9th ed., Cap. 23; Stoelting\'s Pharmacology, 6th ed., Cap. 5',
  },
  {
    name: 'Diazepam',
    category: 'Benzodiacepina',
    onset: '1-3 min IV',
    peakEffect: '3-5 min IV',
    duration: '30-90 min (sedación); metabolito activo hasta 200 h',
    metabolism: 'Hepático (CYP2C19, CYP3A4). Metabolitos activos: desmetildiazepam, oxazepam.',
    elimination: 'Renal (metabolitos). Vida media de eliminación prolongada (20-100 h).',
    contraindications: [
      'Alergia a benzodiacepinas',
      'Miastenia gravis (sin soporte ventilatorio)',
      'Insuficiencia respiratoria severa',
      'Glaucoma de ángulo cerrado agudo',
    ],
    precautions: [
      'Formulación con propilenglicol: dolor y tromboflebitis en venas pequeñas',
      'No mezclar con otras soluciones IV (precipita)',
      'Metabolitos activos de larga duración: acumulación en ancianos',
      'Inyectar lentamente (máx 5 mg/min) para evitar depresión respiratoria',
    ],
    dilutions: [
      {
        description: 'Ampolla 10 mg/2 mL = 5 mg/mL. Usar sin diluir, IV directa lenta.',
        concentration: '5 mg/mL',
        commonPreparation: 'Ampolla 10 mg/2 mL. Administrar IV directo lento (máx 5 mg/min). No diluir en SF o Dx (precipita).',
      },
    ],
    clinicalPearls: [
      'Preferir midazolam en anestesia por su menor duración y ausencia de metabolitos activos prolongados.',
      'Si se usa IV: aplicar en vena gruesa y lentamente para minimizar flebitis.',
      'Vida media de eliminación extremadamente larga (20-100 h): considerar sedación residual.',
    ],
    reference: 'Miller\'s Anesthesia, 9th ed., Cap. 23; Stoelting\'s Pharmacology, 6th ed., Cap. 5',
  },
  {
    name: 'Lorazepam',
    category: 'Benzodiacepina',
    onset: '1-5 min IV; 15-30 min IM',
    peakEffect: '5-10 min IV; 60-90 min IM',
    duration: '6-8 h',
    metabolism: 'Hepático (glucuronidación directa, no CYP). Sin metabolitos activos.',
    elimination: 'Renal (conjugados glucurónidos inactivos)',
    contraindications: [
      'Alergia a benzodiacepinas',
      'Insuficiencia respiratoria severa sin soporte ventilatorio',
      'Glaucoma de ángulo cerrado agudo',
    ],
    precautions: [
      'Contiene propilenglicol y polietilenglicol: nefrotoxicidad con infusiones prolongadas',
      'Mayor duración que midazolam: prever sedación residual',
      'Reducir dosis en ancianos e insuficiencia hepática',
      'Absorción IM errática desde sitio deltoides',
    ],
    dilutions: [
      {
        description: 'Ampolla 4 mg/2 mL = 2 mg/mL. Diluir con igual volumen de SF antes de administrar IV.',
        concentration: '2 mg/mL (original); 1 mg/mL (diluido)',
        commonPreparation: 'Ampolla 4 mg/2 mL. Diluir 1:1 con SF para administración IV lenta.',
      },
    ],
    clinicalPearls: [
      'No depende de CYP450: metabolismo más predecible en insuficiencia hepática que midazolam o diazepam.',
      'Duración prolongada (6-8 h): no ideal para premedicación cuando se desea recuperación rápida.',
      'Refrigerar las ampollas: el lorazepam es inestable a temperatura ambiente.',
    ],
    reference: 'Miller\'s Anesthesia, 9th ed., Cap. 23; Stoelting\'s Pharmacology, 6th ed., Cap. 5',
  },

  // ============================================================
  // OPIOIDES
  // ============================================================
  {
    name: 'Fentanilo',
    category: 'Opioide',
    onset: '30-60 s IV',
    peakEffect: '3-5 min IV',
    duration: '30-60 min (bolo único)',
    metabolism: 'Hepático (CYP3A4). Sin metabolitos activos.',
    elimination: 'Renal (metabolitos inactivos). <10% sin modificar.',
    contraindications: [
      'Alergia a fentanilo u opioides sintéticos',
      'Depresión respiratoria severa sin soporte ventilatorio',
    ],
    precautions: [
      'Rigidez de pared torácica con dosis altas o inyección rápida (>5 mcg/kg)',
      'Bradicardia por estímulo vagal',
      'Acumulación con dosis repetidas o infusión prolongada (context-sensitive half-time aumenta)',
      'Precaución en insuficiencia hepática (metabolismo CYP3A4)',
    ],
    dilutions: [
      {
        description: 'Ampolla 500 mcg/10 mL = 50 mcg/mL. Usar sin diluir para bolos.',
        concentration: '50 mcg/mL',
        commonPreparation: 'Ampolla 500 mcg/10 mL. Usar sin diluir. Para titulación: 1-2 mL (50-100 mcg) por bolo.',
      },
      {
        description: 'Diluir 100 mcg (2 mL) en 8 mL SF = 10 mcg/mL para titulación fina.',
        concentration: '10 mcg/mL',
        commonPreparation: 'Jeringa de 10 mL: 2 mL fentanilo + 8 mL SF = 10 mcg/mL.',
      },
    ],
    clinicalPearls: [
      'Inyectar lentamente (>30 s) para evitar rigidez torácica, especialmente con dosis >2 mcg/kg.',
      'La bradicardia responde a atropina. Considerar premedicación con atropina en dosis altas de fentanilo.',
      'El context-sensitive half-time aumenta con infusiones prolongadas (>2 h): considerar remifentanilo para cirugías largas.',
    ],
    reference: 'Miller\'s Anesthesia, 9th ed., Cap. 24; Stoelting\'s Pharmacology, 6th ed., Cap. 7',
  },
  {
    name: 'Sufentanilo',
    category: 'Opioide',
    onset: '1-2 min IV',
    peakEffect: '3-5 min IV',
    duration: '20-45 min (bolo único)',
    metabolism: 'Hepático (CYP3A4). Metabolito activo: desmetilfentanilo (mínima actividad).',
    elimination: 'Renal (metabolitos). <2% sin modificar.',
    contraindications: [
      'Alergia a sufentanilo u opioides sintéticos',
      'Depresión respiratoria sin soporte ventilatorio',
    ],
    precautions: [
      '5-10 veces más potente que fentanilo: extremar precaución con la dosis',
      'Rigidez torácica con dosis altas o inyección rápida',
      'Bradicardia vagal',
      'Context-sensitive half-time más favorable que fentanilo para infusiones de duración moderada',
    ],
    dilutions: [
      {
        description: 'Ampolla 250 mcg/5 mL = 50 mcg/mL. Usar sin diluir o diluir para titulación.',
        concentration: '50 mcg/mL',
        commonPreparation: 'Ampolla 250 mcg/5 mL. Para bolos: usar sin diluir, 0.2-0.5 mL por dosis.',
      },
      {
        description: 'Diluir 50 mcg (1 mL) en 9 mL SF = 5 mcg/mL.',
        concentration: '5 mcg/mL',
        commonPreparation: 'Jeringa de 10 mL: 1 mL sufentanilo + 9 mL SF = 5 mcg/mL para titulación.',
      },
    ],
    clinicalPearls: [
      '5-10 veces más potente que fentanilo. Dosis de inducción típica: 0.1-0.5 mcg/kg IV.',
      'Context-sensitive half-time más corto que fentanilo para infusiones de hasta 8 h.',
      'Mayor estabilidad hemodinámica que fentanilo para cirugía cardíaca a dosis altas.',
    ],
    reference: 'Miller\'s Anesthesia, 9th ed., Cap. 24; Stoelting\'s Pharmacology, 6th ed., Cap. 7',
  },
  {
    name: 'Remifentanilo',
    category: 'Opioide',
    onset: '1-1.5 min IV',
    peakEffect: '1-3 min',
    duration: '3-10 min (independiente de la duración de infusión)',
    metabolism: 'Hidrólisis por esterasas plasmáticas y tisulares inespecíficas. No depende de función hepática ni renal.',
    elimination: 'Renal (metabolito ácido carboxílico inactivo)',
    contraindications: [
      'Alergia a remifentanilo o a otros opioides fentanilo-derivados',
      'No administrar por vía epidural o intratecal (contiene glicina)',
    ],
    precautions: [
      'No administrar en bolo directo en pacientes no intubados (apnea, rigidez)',
      'Bradicardia severa posible, especialmente con betabloqueantes',
      'No posee efecto analgésico residual: planificar analgesia de transición antes de suspender',
      'Hiperalgesia postinfusión descrita: considerar ketamina u otro coadyuvante',
    ],
    dilutions: [
      {
        description: 'Frasco 2 mg liofilizado. Reconstituir en 40 mL SF = 50 mcg/mL.',
        concentration: '50 mcg/mL',
        commonPreparation: 'Frasco 2 mg liofilizado. Reconstituir con 40 mL SF. Rotular: 50 mcg/mL. Estable 24 h a T° ambiente.',
      },
      {
        description: 'Frasco 5 mg liofilizado. Reconstituir en 50 mL SF = 100 mcg/mL.',
        concentration: '100 mcg/mL',
        commonPreparation: 'Frasco 5 mg liofilizado. Reconstituir con 50 mL SF. Para uso con bomba de infusión.',
      },
    ],
    clinicalPearls: [
      'Context-sensitive half-time constante (~3-4 min) independiente de la duración de infusión: ideal para cirugías de duración impredecible.',
      'Planificar analgesia de transición (morfina, ketorolac, bloqueo regional) 20-30 min antes de suspender la infusión.',
      'Metabolismo por esterasas plasmáticas: no se acumula en insuficiencia hepática ni renal.',
    ],
    reference: 'Miller\'s Anesthesia, 9th ed., Cap. 24; Stoelting\'s Pharmacology, 6th ed., Cap. 7',
  },
  {
    name: 'Morfina',
    category: 'Opioide',
    onset: '3-5 min IV; 15-30 min IM/SC',
    peakEffect: '10-20 min IV; 30-60 min IM',
    duration: '3-5 h',
    metabolism: 'Hepático (glucuronidación). Metabolitos activos: morfina-6-glucurónido (M6G, potente), morfina-3-glucurónido (M3G, neuroexcitatorio).',
    elimination: 'Renal (metabolitos conjugados). M6G se acumula en insuficiencia renal.',
    contraindications: [
      'Alergia a morfina',
      'Depresión respiratoria severa sin soporte ventilatorio',
      'Íleo paralítico',
    ],
    precautions: [
      'Liberación de histamina: hipotensión, broncoespasmo, prurito',
      'Acumulación de M6G en insuficiencia renal: depresión respiratoria tardía',
      'Retención urinaria, especialmente vía neuroaxial',
      'Náuseas y vómitos frecuentes',
      'Espasmo del esfínter de Oddi (controvertido; tratar con naloxona o glucagón)',
    ],
    dilutions: [
      {
        description: 'Ampolla 10 mg/1 mL = 10 mg/mL. Diluir para uso IV.',
        concentration: '10 mg/mL (original)',
        commonPreparation: 'Ampolla 10 mg/1 mL. Diluir 1 mL en 9 mL SF = 1 mg/mL para titulación IV.',
      },
      {
        description: 'Diluir 10 mg en 9 mL SF = 1 mg/mL para titulación IV.',
        concentration: '1 mg/mL',
        commonPreparation: 'Jeringa de 10 mL: 1 mL morfina (10 mg) + 9 mL SF.',
      },
    ],
    clinicalPearls: [
      'Opioide de elección para analgesia postoperatoria prolongada por su duración de 3-5 h.',
      'Precaución en insuficiencia renal: el metabolito activo M6G se acumula y puede causar depresión respiratoria tardía.',
      'Libera histamina: evitar bolos rápidos. En asmáticos, considerar fentanilo como alternativa.',
    ],
    reference: 'Miller\'s Anesthesia, 9th ed., Cap. 24; Stoelting\'s Pharmacology, 6th ed., Cap. 7',
  },

  // ============================================================
  // BLOQUEANTES NEUROMUSCULARES (BNM)
  // ============================================================
  {
    name: 'Rocuronio',
    category: 'BNM',
    onset: '60-90 s IV (dosis estándar); 45-60 s (1.2 mg/kg secuencia rápida)',
    peakEffect: '1-3 min',
    duration: '30-45 min (0.6 mg/kg); 60-90 min (1.2 mg/kg)',
    metabolism: 'Mínimo. Eliminación predominantemente hepática sin modificación.',
    elimination: 'Biliar (70%) y renal (30%). Duración prolongada en insuficiencia hepática.',
    contraindications: [
      'Alergia al rocuronio o bromuro',
    ],
    precautions: [
      'Duración prolongada en insuficiencia hepática',
      'Dosis de secuencia rápida (1.2 mg/kg) extiende la duración a 60-90 min',
      'Monitorizar con TOF (tren de cuatro) para guiar reversión',
      'Reacciones anafilácticas descritas (más frecuentes que con otros BNM en algunos reportes)',
    ],
    dilutions: [
      {
        description: 'Ampolla 50 mg/5 mL = 10 mg/mL. Usar sin diluir.',
        concentration: '10 mg/mL',
        commonPreparation: 'Ampolla 50 mg/5 mL. Usar sin diluir. Conservar refrigerado (2-8°C). Estable 60 días a T° ambiente.',
      },
    ],
    clinicalPearls: [
      'BNM no despolarizante de elección para secuencia rápida cuando succinilcolina está contraindicada (1.2 mg/kg).',
      'Reversión completa con sugammadex 2-4 mg/kg (bloqueo moderado) o 16 mg/kg (bloqueo profundo / rescate).',
      'Siempre monitorizar con TOF antes de revertir y antes de extubar (TOF ratio ≥0.9).',
    ],
    reference: 'Miller\'s Anesthesia, 9th ed., Cap. 27; Stoelting\'s Pharmacology, 6th ed., Cap. 12',
  },
  {
    name: 'Vecuronio',
    category: 'BNM',
    onset: '2-3 min IV',
    peakEffect: '3-5 min',
    duration: '25-40 min',
    metabolism: 'Hepático (desacetilación). Metabolito activo: 3-desacetilvecuronio.',
    elimination: 'Biliar (40-60%) y renal (30-40%). Duración prolongada en insuficiencia hepática y renal.',
    contraindications: [
      'Alergia al vecuronio o bromuro',
    ],
    precautions: [
      'Requiere reconstitución: añade tiempo de preparación',
      'El metabolito 3-desacetilvecuronio se acumula en insuficiencia renal',
      'Duración prolongada en insuficiencia hepática',
      'No produce liberación de histamina',
    ],
    dilutions: [
      {
        description: 'Frasco 10 mg liofilizado. Reconstituir en 10 mL SF o agua destilada = 1 mg/mL.',
        concentration: '1 mg/mL',
        commonPreparation: 'Frasco 10 mg liofilizado. Reconstituir con 10 mL SF = 1 mg/mL. Usar dentro de 24 h.',
      },
    ],
    clinicalPearls: [
      'Perfil cardiovascular muy estable: no libera histamina ni bloquea ganglios.',
      'Requiere reconstitución: tener preparado si se usa como primera opción.',
      'Reversible con sugammadex o con neostigmina (si TOF muestra al menos 2 respuestas).',
    ],
    reference: 'Miller\'s Anesthesia, 9th ed., Cap. 27; Stoelting\'s Pharmacology, 6th ed., Cap. 12',
  },
  {
    name: 'Cisatracurio',
    category: 'BNM',
    onset: '2-3 min IV',
    peakEffect: '3-5 min',
    duration: '25-44 min',
    metabolism: 'Degradación de Hofmann (espontánea, no enzimática, pH y temperatura dependiente). Metabolito: laudanosina (mínima relevancia clínica a dosis habituales).',
    elimination: 'Degradación de Hofmann + hidrólisis por esterasas. Independiente de función hepática y renal.',
    contraindications: [
      'Alergia al cisatracurio o al ácido bencenosulfónico',
    ],
    precautions: [
      'No refrigerar la jeringa preparada: la degradación de Hofmann se enlentece con el frío',
      'La hipotermia y la acidosis prolongan su duración de acción',
      'La laudanosina puede acumularse en infusiones muy prolongadas en UCI',
    ],
    dilutions: [
      {
        description: 'Ampolla 10 mg/5 mL = 2 mg/mL. Usar sin diluir para bolos.',
        concentration: '2 mg/mL',
        commonPreparation: 'Ampolla 10 mg/5 mL. Usar sin diluir para bolos. Conservar refrigerado.',
      },
      {
        description: 'Para infusión: diluir 40 mg (20 mL) en 30 mL SF = 0.8 mg/mL.',
        concentration: '0.8 mg/mL',
        commonPreparation: 'Diluir 40 mg en SF hasta 50 mL total. Para bomba de infusión: 1-3 mcg/kg/min.',
      },
    ],
    clinicalPearls: [
      'BNM ideal en insuficiencia renal y hepática: su metabolismo (Hofmann) no depende de ningún órgano.',
      'No libera histamina: excelente estabilidad cardiovascular.',
      'Isómero cis-cis del atracurio: 3-4 veces más potente, menor producción de laudanosina.',
    ],
    reference: 'Miller\'s Anesthesia, 9th ed., Cap. 27; Stoelting\'s Pharmacology, 6th ed., Cap. 12',
  },
  {
    name: 'Succinilcolina',
    category: 'BNM',
    onset: '30-60 s IV; 2-3 min IM',
    peakEffect: '1 min IV',
    duration: '5-10 min',
    metabolism: 'Hidrólisis rápida por pseudocolinesterasa (butirilcolinesterasa) plasmática.',
    elimination: 'Metabolitos inactivos (succinilmonocolina, ácido succínico, colina)',
    contraindications: [
      'Hiperpotasemia o riesgo de hiperpotasemia (quemados >24 h, denervación, miopatías, rabdomiólisis)',
      'Antecedente personal o familiar de hipertermia maligna',
      'Miopatías (distrofias musculares: riesgo de rabdomiólisis e hiperpotasemia letal)',
      'Déficit de pseudocolinesterasa conocido (apnea prolongada)',
      'Lesión medular aguda (después de las primeras 24-72 h y hasta 6-12 meses)',
    ],
    precautions: [
      'Fasciculaciones: aumento transitorio de presión intraocular, intragástrica e intracraneana',
      'Bradicardia sinusal (especialmente con segunda dosis o en niños)',
      'No usar como primera línea en pediatría (riesgo de hiperpotasemia con miopatías ocultas)',
      'En déficit de pseudocolinesterasa: bloqueo prolongado (horas)',
      'Aumento de potasio sérico 0.5-1 mEq/L en pacientes sanos',
    ],
    dilutions: [
      {
        description: 'Ampolla 100 mg/2 mL = 50 mg/mL. Usar sin diluir para bolo IV.',
        concentration: '50 mg/mL',
        commonPreparation: 'Ampolla 100 mg/2 mL. Usar sin diluir. Conservar refrigerado (2-8°C).',
      },
      {
        description: 'Para IM (emergencia sin acceso venoso): usar sin diluir. Dosis IM: 3-4 mg/kg.',
        concentration: '50 mg/mL',
        commonPreparation: 'Ampolla 100 mg/2 mL. Vía IM en deltoides o vasto lateral.',
      },
    ],
    clinicalPearls: [
      'Único BNM despolarizante en uso clínico. Inicio de acción más rápido que cualquier BNM no despolarizante.',
      'Siempre preguntar por antecedentes de hipertermia maligna y miopatías antes de usar.',
      'Tener dantroleno disponible cuando se utiliza succinilcolina (tratamiento de hipertermia maligna).',
    ],
    reference: 'Miller\'s Anesthesia, 9th ed., Cap. 27; Stoelting\'s Pharmacology, 6th ed., Cap. 12',
  },

  // ============================================================
  // REVERSORES
  // ============================================================
  {
    name: 'Neostigmina',
    category: 'Reversor',
    onset: '1-3 min IV',
    peakEffect: '7-11 min',
    duration: '40-60 min',
    metabolism: 'Hidrólisis por esterasas plasmáticas y hepáticas',
    elimination: 'Renal (50% sin modificar)',
    contraindications: [
      'Obstrucción mecánica intestinal o urinaria',
      'Peritonitis',
    ],
    precautions: [
      'Siempre administrar con anticolinérgico (atropina o glicopirrolato) para prevenir bradicardia y efectos muscarínicos',
      'No administrar si el bloqueo neuromuscular es profundo (no hay respuestas al TOF): reversión inadecuada',
      'Efecto "techo" con dosis >70 mcg/kg: no aumentar más allá',
      'Dosis máxima: 5 mg (70 mcg/kg)',
    ],
    dilutions: [
      {
        description: 'Ampolla 0.5 mg/1 mL = 0.5 mg/mL. Administrar IV directa.',
        concentration: '0.5 mg/mL',
        commonPreparation: 'Ampolla 0.5 mg/1 mL. Usar sin diluir. Administrar con atropina (0.01-0.02 mg/kg) o glicopirrolato (0.01 mg/kg).',
      },
      {
        description: 'Ampolla 2.5 mg/5 mL = 0.5 mg/mL. Para dosificación más precisa.',
        concentration: '0.5 mg/mL',
        commonPreparation: 'Ampolla 2.5 mg/5 mL. Dosis habitual: 0.04-0.07 mg/kg + atropina.',
      },
    ],
    clinicalPearls: [
      'Administrar siempre con atropina (0.01-0.02 mg/kg) en la misma jeringa o inmediatamente antes para bloquear efectos muscarínicos.',
      'Esperar al menos 2 respuestas en TOF antes de revertir. Si el bloqueo es profundo, preferir sugammadex (si está disponible).',
      'Verificar TOF ratio ≥0.9 antes de extubar, independientemente del reversor usado.',
    ],
    reference: 'Miller\'s Anesthesia, 9th ed., Cap. 27; Stoelting\'s Pharmacology, 6th ed., Cap. 12',
  },

  // ============================================================
  // ANTICOLINERGICOS / VASOPRESORES
  // ============================================================
  {
    name: 'Atropina',
    category: 'Anticolinérgico',
    onset: '1-2 min IV',
    peakEffect: '2-4 min IV',
    duration: '30-60 min (efecto sobre FC)',
    metabolism: 'Hepático (hidrólisis enzimática)',
    elimination: 'Renal (30-50% sin modificar)',
    contraindications: [
      'Glaucoma de ángulo cerrado no tratado',
      'Taquiarritmias (excepto uso en bradicardia sintomática)',
      'Obstrucción del tracto urinario',
    ],
    precautions: [
      'Dosis <0.5 mg pueden producir bradicardia paradójica (efecto M1 central)',
      'Taquicardia y sequedad de mucosas dosis-dependiente',
      'Puede empeorar taquicardias supraventriculares',
      'Midriasis prolongada: advertir al paciente',
      'Precaución en hipertiroidismo, cardiopatía isquémica',
    ],
    dilutions: [
      {
        description: 'Ampolla 1 mg/1 mL = 1 mg/mL. Usar sin diluir.',
        concentration: '1 mg/mL',
        commonPreparation: 'Ampolla 1 mg/1 mL. Usar sin diluir para bolos IV. Dosis bradicardia: 0.5-1 mg IV.',
      },
    ],
    clinicalPearls: [
      'Dosis mínima efectiva: 0.5 mg IV. Dosis menores pueden causar bradicardia paradójica.',
      'En ACLS para bradicardia sintomática: 0.5-1 mg IV cada 3-5 min, máximo 3 mg.',
      'Siempre tener disponible como co-administración con neostigmina para reversión de BNM.',
    ],
    reference: 'Miller\'s Anesthesia, 9th ed., Cap. 15; Stoelting\'s Pharmacology, 6th ed., Cap. 10',
  },
  {
    name: 'Efedrina',
    category: 'Vasopresor',
    onset: '1-2 min IV',
    peakEffect: '2-5 min',
    duration: '10-15 min',
    metabolism: 'Hepático (mínimo). Mayoría excretada sin modificar.',
    elimination: 'Renal (60-75% sin modificar). Depende del pH urinario.',
    contraindications: [
      'Feocromocitoma',
      'Taquiarritmias severas',
      'Uso concomitante de IMAO (riesgo de crisis hipertensiva)',
    ],
    precautions: [
      'Taquifilaxia con dosis repetidas (agota las reservas de noradrenalina endógena)',
      'Respuesta disminuida en pacientes depletados de catecolaminas (sepsis, shock prolongado)',
      'Aumenta FC y PA: precaución en cardiopatía isquémica',
      'Cruza la placenta: puede causar taquicardia fetal',
    ],
    dilutions: [
      {
        description: 'Ampolla 50 mg/1 mL = 50 mg/mL. Diluir para uso IV.',
        concentration: '50 mg/mL (original)',
        commonPreparation: 'Ampolla 50 mg/1 mL. Diluir 1 ampolla en 9 mL SF = 5 mg/mL. Administrar 1-2 mL (5-10 mg) por bolo IV.',
      },
    ],
    clinicalPearls: [
      'Simpaticomimético indirecto de primera línea para hipotensión durante anestesia raquídea en cesárea (aunque fenilefrina es ahora preferida por guías recientes).',
      'La taquifilaxia aparece después de 3-4 dosis: si no responde, cambiar a fenilefrina o noradrenalina.',
      'Mecanismo indirecto (libera noradrenalina endógena): menos efectiva en pacientes depletados de catecolaminas.',
    ],
    reference: 'Miller\'s Anesthesia, 9th ed., Cap. 15; Stoelting\'s Pharmacology, 6th ed., Cap. 12',
  },
  {
    name: 'Noradrenalina',
    category: 'Vasopresor',
    onset: '1-2 min IV',
    peakEffect: '1-2 min',
    duration: '1-2 min post-suspensión de infusión',
    metabolism: 'Recaptación neuronal (uptake-1) y extraneuronal. COMT y MAO.',
    elimination: 'Renal (metabolitos inactivos: normetanefrina, ácido vanillilmandélico)',
    contraindications: [
      'Hipotensión por hipovolemia no corregida (como causa única sin reposición de volumen)',
      'Trombosis vascular mesentérica o periférica (riesgo de isquemia)',
    ],
    precautions: [
      'Administrar exclusivamente por vía central o por vena periférica gruesa de corta duración',
      'Extravasación causa necrosis tisular severa: tratamiento con fentolamina local',
      'Taquiarritmias posibles, especialmente con halogenados',
      'Reducción del flujo renal y esplácnico a dosis altas',
      'No mezclar con soluciones alcalinas (se inactiva)',
    ],
    dilutions: [
      {
        description: 'Ampolla 4 mg/4 mL = 1 mg/mL. Diluir para infusión continua.',
        concentration: '1 mg/mL (original)',
        commonPreparation: 'Ampolla 4 mg/4 mL (noradrenalina base). Diluir 4 mg (1 ampolla) en 250 mL Dx5% = 16 mcg/mL.',
      },
      {
        description: 'Dilución estándar: 4 mg en 250 mL Dx5% = 16 mcg/mL. Infusión: 0.05-0.5 mcg/kg/min.',
        concentration: '16 mcg/mL',
        commonPreparation: '1 ampolla (4 mg) en 250 mL Dx5%. Iniciar a 2-5 mL/h y titular según PAM.',
      },
      {
        description: 'Dilución concentrada: 8 mg en 250 mL Dx5% = 32 mcg/mL (restricción hídrica).',
        concentration: '32 mcg/mL',
        commonPreparation: '2 ampollas (8 mg) en 250 mL Dx5%. Para situaciones de restricción de volumen.',
      },
    ],
    clinicalPearls: [
      'Diluir siempre en Dx5%, no en SF (la solución salina acelera su degradación).',
      'Preferir vía central. Si se usa vía periférica, usar vena gruesa antecubital y limitar a horas.',
      'Ante extravasación: infiltrar fentolamina 5-10 mg en 10 mL SF en el área afectada lo antes posible.',
    ],
    reference: 'Miller\'s Anesthesia, 9th ed., Cap. 15; Stoelting\'s Pharmacology, 6th ed., Cap. 12',
  },

  // ============================================================
  // AGONISTAS ALFA-2
  // ============================================================
  {
    name: 'Dexmedetomidina',
    category: 'Agonista alfa-2',
    onset: '5-10 min IV (con dosis de carga)',
    peakEffect: '15-30 min',
    duration: '60-120 min post-suspensión',
    metabolism: 'Hepático (CYP2A6, glucuronidación y N-metilación)',
    elimination: 'Renal (95% metabolitos inactivos)',
    contraindications: [
      'Bloqueo AV de segundo o tercer grado sin marcapasos',
      'Hipotensión severa no corregida',
    ],
    precautions: [
      'Bradicardia e hipotensión, especialmente con dosis de carga',
      'Hipertensión transitoria posible con dosis de carga rápida (efecto alfa-2B periférico)',
      'Reducir dosis en insuficiencia hepática',
      'No produce depresión respiratoria significativa: ventaja sobre opioides y benzodiacepinas',
      'El paciente puede parecer dormido pero ser despertable (sedación cooperativa)',
    ],
    dilutions: [
      {
        description: 'Ampolla 200 mcg/2 mL = 100 mcg/mL. Diluir para infusión.',
        concentration: '100 mcg/mL (original)',
        commonPreparation: 'Ampolla 200 mcg/2 mL. Diluir 200 mcg (2 mL) en 48 mL SF = 4 mcg/mL.',
      },
      {
        description: 'Dilución estándar: 200 mcg en 50 mL SF = 4 mcg/mL.',
        concentration: '4 mcg/mL',
        commonPreparation: 'Diluir 1 ampolla (200 mcg) en 48 mL SF. Carga: 1 mcg/kg en 10 min. Mantenimiento: 0.2-0.7 mcg/kg/h.',
      },
    ],
    clinicalPearls: [
      'Sedación "cooperativa": el paciente está sedado pero responde a estímulo verbal. Ideal para procedimientos con paciente despierto (craneotomía, fibrobroncoscopía).',
      'No produce depresión respiratoria clínicamente significativa: ventaja sobre propofol y opioides para sedación.',
      'La dosis de carga puede omitirse para evitar bradicardia e hipotensión; iniciar directamente con infusión de mantenimiento.',
    ],
    reference: 'Miller\'s Anesthesia, 9th ed., Cap. 23; Stoelting\'s Pharmacology, 6th ed., Cap. 10',
  },

  // ============================================================
  // ANESTESICOS LOCALES
  // ============================================================
  {
    name: 'Lidocaína',
    category: 'Anestésico local',
    onset: '1-2 min (infiltración); 5-15 min (bloqueo nervioso); 45-90 s (IV)',
    peakEffect: '5-15 min (infiltración); 15-30 min (bloqueo nervioso)',
    duration: '60-120 min (sin epinefrina); 120-180 min (con epinefrina)',
    metabolism: 'Hepático (CYP1A2, CYP3A4). Metabolito activo: MEGX (monoetilglicinexilidida).',
    elimination: 'Renal (<10% sin modificar)',
    contraindications: [
      'Alergia a anestésicos locales tipo amida',
      'Bloqueo AV completo (sin marcapasos) para uso IV',
    ],
    precautions: [
      'Dosis máxima: 4.5 mg/kg sin epinefrina; 7 mg/kg con epinefrina',
      'Toxicidad sistémica (LAST): convulsiones, arritmias, paro cardíaco',
      'Reducir dosis en insuficiencia hepática y cardíaca (disminución del aclaramiento)',
      'Tener emulsión lipídica (Intralipid 20%) disponible para tratamiento de LAST',
    ],
    dilutions: [
      {
        description: 'Ampolla 200 mg/10 mL = 2% (20 mg/mL). Para infiltración y bloqueos.',
        concentration: '20 mg/mL (2%)',
        commonPreparation: 'Ampolla lidocaína 2% (200 mg/10 mL). Para infiltración: usar pura o diluir al 1%.',
      },
      {
        description: 'Lidocaína 1% (10 mg/mL). Para infiltración local y anestesia regional IV (Bier).',
        concentration: '10 mg/mL (1%)',
        commonPreparation: 'Frasco lidocaína 1% (10 mg/mL). Para bloque Bier: 3 mg/kg máx en 40 mL.',
      },
      {
        description: 'Lidocaína 2% con epinefrina 1:200.000 para infiltración con mayor duración.',
        concentration: '20 mg/mL + epinefrina 5 mcg/mL',
        commonPreparation: 'Frasco lidocaína 2% con epinefrina. Prolonga duración y reduce absorción sistémica.',
      },
    ],
    clinicalPearls: [
      'IV como coadyuvante en anestesia general: bolo 1-1.5 mg/kg + infusión 1-2 mg/kg/h. Reduce requerimiento de opioides y de anestésicos inhalatorios.',
      'Ante sospecha de LAST: suspender inyección, pedir ayuda, administrar Intralipid 20% (1.5 mL/kg bolo + infusión 0.25 mL/kg/min).',
      'Nunca usar lidocaína con epinefrina en zonas con circulación terminal (dedos, pene, pabellón auricular).',
    ],
    reference: 'Miller\'s Anesthesia, 9th ed., Cap. 30; Stoelting\'s Pharmacology, 6th ed., Cap. 7',
  },
  {
    name: 'Bupivacaína',
    category: 'Anestésico local',
    onset: '5-15 min (bloqueo nervioso); 5-10 min (epidural); 2-5 min (intratecal)',
    peakEffect: '20-30 min (bloqueo nervioso); 15-20 min (epidural)',
    duration: '180-480 min (bloqueo nervioso, dependiendo de concentración y sitio)',
    metabolism: 'Hepático (CYP3A4). Metabolitos inactivos.',
    elimination: 'Renal (5% sin modificar)',
    contraindications: [
      'Alergia a anestésicos locales tipo amida',
      'Anestesia regional IV (bloqueo de Bier): riesgo de toxicidad cardíaca grave',
    ],
    precautions: [
      'Dosis máxima: 2.5 mg/kg sin epinefrina; 3 mg/kg con epinefrina',
      'Mayor cardiotoxicidad que lidocaína y ropivacaína: arritmias refractarias al tratamiento convencional',
      'Toxicidad cardíaca: bloqueo de canales de sodio cardíacos prolongado y difícil de revertir',
      'Tener Intralipid 20% disponible siempre que se use bupivacaína',
      'Reducir dosis en embarazadas (mayor sensibilidad a anestésicos locales)',
    ],
    dilutions: [
      {
        description: 'Ampolla 0.5% (5 mg/mL) para bloqueos nerviosos periféricos y epidural.',
        concentration: '5 mg/mL (0.5%)',
        commonPreparation: 'Ampolla bupivacaína 0.5% (50 mg/10 mL). Para bloqueos y epidural.',
      },
      {
        description: 'Bupivacaína hiperbárica 0.5% para uso intratecal (espinal).',
        concentration: '5 mg/mL hiperbárica',
        commonPreparation: 'Ampolla bupivacaína hiperbárica 0.5% (4 mL). Para anestesia espinal: 7.5-15 mg según nivel deseado.',
      },
      {
        description: 'Bupivacaína 0.25% (2.5 mg/mL) para bloqueos con menor bloqueo motor.',
        concentration: '2.5 mg/mL (0.25%)',
        commonPreparation: 'Diluir al 0.25% para infusión epidural continua o bloqueos con menos bloqueo motor.',
      },
    ],
    clinicalPearls: [
      'Nunca usar para bloqueo de Bier (anestesia regional IV): la cardiotoxicidad es desproporcionada y potencialmente letal si se libera el torniquete accidentalmente.',
      'Forma hiperbárica para espinal: la densidad mayor que el LCR permite controlar nivel con la posición del paciente.',
      'Tener Intralipid 20% accesible en cualquier área donde se use bupivacaína para bloqueos regionales.',
    ],
    reference: 'Miller\'s Anesthesia, 9th ed., Cap. 30; Stoelting\'s Pharmacology, 6th ed., Cap. 7',
  },
  {
    name: 'Ropivacaína',
    category: 'Anestésico local',
    onset: '5-15 min (bloqueo nervioso); 10-20 min (epidural)',
    peakEffect: '20-30 min (bloqueo nervioso)',
    duration: '180-360 min (bloqueo nervioso, dependiendo de concentración y sitio)',
    metabolism: 'Hepático (CYP1A2, CYP3A4). Metabolitos inactivos.',
    elimination: 'Renal (1% sin modificar)',
    contraindications: [
      'Alergia a anestésicos locales tipo amida',
      'Anestesia regional IV (bloqueo de Bier)',
    ],
    precautions: [
      'Dosis máxima: 3 mg/kg (sin epinefrina); 3.5 mg/kg (con epinefrina)',
      'Menor cardiotoxicidad que bupivacaína, pero toxicidad sistémica sigue siendo posible',
      'Menor bloqueo motor que bupivacaína a concentraciones equivalentes',
      'Tener Intralipid 20% disponible',
    ],
    dilutions: [
      {
        description: 'Ampolla 0.75% (7.5 mg/mL) para bloqueos nerviosos periféricos.',
        concentration: '7.5 mg/mL (0.75%)',
        commonPreparation: 'Ampolla ropivacaína 0.75% (150 mg/20 mL). Para bloqueos nerviosos y epidural quirúrgica.',
      },
      {
        description: 'Ropivacaína 0.5% (5 mg/mL) para epidural y bloqueos.',
        concentration: '5 mg/mL (0.5%)',
        commonPreparation: 'Ampolla ropivacaína 0.5% (100 mg/20 mL). Para epidural y bloqueos nerviosos.',
      },
      {
        description: 'Ropivacaína 0.2% (2 mg/mL) para infusión epidural continua o bloqueos de planos fasciales.',
        concentration: '2 mg/mL (0.2%)',
        commonPreparation: 'Bolsa ropivacaína 0.2% (200 mg/100 mL). Para infusión continua epidural o perineural.',
      },
    ],
    clinicalPearls: [
      'Menor cardiotoxicidad que bupivacaína: enantiómero S puro con menor afinidad por canales de sodio cardíacos.',
      'A concentraciones bajas (0.2%) produce bloqueo predominantemente sensitivo con mínimo bloqueo motor: ideal para analgesia epidural postoperatoria.',
      'Considerar como alternativa a bupivacaína cuando se desee mayor margen de seguridad cardíaca.',
    ],
    reference: 'Miller\'s Anesthesia, 9th ed., Cap. 30; Stoelting\'s Pharmacology, 6th ed., Cap. 7',
  },
]

// ---------------------------------------------------------------------------
// Helper: find a drug card by name (accent-insensitive)
// ---------------------------------------------------------------------------

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function findDrugCard(name: string): DrugCard | undefined {
  const n = normalize(name)
  return vademecumData.find((card) => normalize(card.name) === n)
}
