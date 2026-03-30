import type { DrugDosage } from '../../types'

/**
 * Datos de dosificación de fármacos anestésicos.
 *
 * FUENTES:
 * - Miller's Anesthesia, 9th edition (Miller RD, ed. Elsevier, 2020)
 * - Stoelting's Pharmacology & Physiology in Anesthetic Practice, 6th edition
 *   (Flood P, Rathmell JP, Urman RD. Wolters Kluwer, 2022)
 * - Goodman & Gilman's The Pharmacological Basis of Therapeutics, 14th edition
 *   (Brunton LL, Hilal-Dandan R, Knollmann BC. McGraw-Hill, 2023)
 *
 * ADVERTENCIA: Esta información es de referencia. No reemplaza el criterio
 * clínico profesional. Los rangos de dosis deben ser verificados contra la
 * ficha técnica actual del producto y las condiciones individuales del paciente.
 */
export const dosageData: DrugDosage[] = [
  // ═══════════════════════════════════════════════
  // HIPNOTICOS / AGENTES DE INDUCCION
  // ═══════════════════════════════════════════════

  {
    name: 'Propofol',
    aliases: ['Diprivan'],
    dosages: [
      {
        minDose: 1.5,
        maxDose: 2.5,
        unit: 'mg/kg',
        context: 'induction',
        route: 'IV',
        notes: 'Reducir en ancianos (>65 a), ASA III-IV o premedicados con opioides/benzodiacepinas. En pacientes debilitados: 1-1.5 mg/kg.',
        reference: "Miller's Anesthesia, 9th ed., Cap. 23",
      },
      {
        minDose: 100,
        maxDose: 200,
        unit: 'mcg/kg/min',
        context: 'maintenance',
        route: 'IV',
        notes: 'Ajustar segun respuesta clinica y uso concomitante de opioides. TIVA tipica: 100-150 mcg/kg/min con remifentanilo.',
        reference: "Miller's Anesthesia, 9th ed., Cap. 23",
      },
      {
        minDose: 25,
        maxDose: 75,
        unit: 'mcg/kg/min',
        context: 'sedation',
        route: 'IV',
        notes: 'Sedacion consciente. Titular hasta efecto deseado. Monitorizar ventilacion.',
        reference: "Stoelting's Pharmacology, 6th ed., Cap. 5",
      },
    ],
  },

  {
    name: 'Tiopental',
    aliases: ['Thiopental', 'Pentothal'],
    dosages: [
      {
        minDose: 3,
        maxDose: 5,
        unit: 'mg/kg',
        context: 'induction',
        route: 'IV',
        notes: 'Reducir en ancianos, hipovolemia y pacientes debilitados (1.5-3 mg/kg). Contraindicado en porfiria aguda.',
        reference: "Miller's Anesthesia, 9th ed., Cap. 23",
      },
    ],
  },

  {
    name: 'Ketamina',
    aliases: ['Ketamine', 'Ketalar'],
    dosages: [
      {
        minDose: 1,
        maxDose: 2,
        unit: 'mg/kg',
        context: 'induction',
        route: 'IV',
        notes: 'Mantiene reflejos de via aerea y drive ventilatorio. Puede aumentar FC y PA. Asociar benzodiacepina para reducir fenomenos disociativos al despertar.',
        reference: "Miller's Anesthesia, 9th ed., Cap. 23",
      },
      {
        minDose: 4,
        maxDose: 6,
        unit: 'mg/kg',
        context: 'induction',
        route: 'IM',
        notes: 'Via IM para pacientes sin acceso venoso o pediatricos no cooperadores. Inicio de accion: 3-5 min.',
        reference: "Stoelting's Pharmacology, 6th ed., Cap. 5",
      },
      {
        minDose: 0.1,
        maxDose: 0.5,
        unit: 'mg/kg',
        context: 'analgesia',
        route: 'IV',
        notes: 'Dosis subanestesica para analgesia. Util como adyuvante en dolor cronico y analgesia multimodal perioperatoria.',
        reference: "Miller's Anesthesia, 9th ed., Cap. 23",
      },
      {
        minDose: 0.25,
        maxDose: 0.5,
        unit: 'mg/kg',
        context: 'sedation',
        route: 'IV',
        notes: 'Dosis subanestesica para sedacion procedural. Preserva ventilacion espontanea.',
        reference: "Stoelting's Pharmacology, 6th ed., Cap. 5",
      },
    ],
  },

  {
    name: 'Etomidato',
    aliases: ['Etomidate', 'Amidate'],
    dosages: [
      {
        minDose: 0.2,
        maxDose: 0.3,
        unit: 'mg/kg',
        context: 'induction',
        route: 'IV',
        notes: 'Estabilidad hemodinamica. Eleccion en pacientes con compromiso cardiovascular. Inhibe sintesis de cortisol transitoriamente; evitar dosis repetidas o infusion continua.',
        reference: "Miller's Anesthesia, 9th ed., Cap. 23",
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // BENZODIACEPINAS
  // ═══════════════════════════════════════════════

  {
    name: 'Midazolam',
    aliases: ['Versed', 'Dormicum'],
    dosages: [
      {
        minDose: 0.1,
        maxDose: 0.35,
        unit: 'mg/kg',
        context: 'induction',
        route: 'IV',
        notes: 'Induccion con midazolam solo es infrecuente. Inicio lento (1-2 min). Reducir dosis en ancianos y con opioides concomitantes.',
        reference: "Miller's Anesthesia, 9th ed., Cap. 23",
      },
      {
        minDose: 0.01,
        maxDose: 0.05,
        unit: 'mg/kg',
        context: 'sedation',
        route: 'IV',
        notes: 'Premedicacion o sedacion consciente. Titular en incrementos de 0.5-1 mg. Efecto pico IV: 2-3 min. Dosis habitual adulto: 1-2.5 mg.',
        reference: "Stoelting's Pharmacology, 6th ed., Cap. 3",
      },
    ],
  },

  {
    name: 'Diazepam',
    aliases: ['Valium'],
    dosages: [
      {
        minDose: 0.1,
        maxDose: 0.3,
        unit: 'mg/kg',
        context: 'induction',
        route: 'IV',
        notes: 'Induccion lenta (60-90 s). Larga duracion (vida media 20-100 h). Dolor a la inyeccion IV. Metabolitos activos.',
        reference: "Stoelting's Pharmacology, 6th ed., Cap. 3",
      },
      {
        minDose: 0.04,
        maxDose: 0.2,
        unit: 'mg/kg',
        context: 'sedation',
        route: 'IV',
        notes: 'Sedacion o premedicacion. Titular lentamente. Dosis habitual adulto: 2-10 mg.',
        reference: "Goodman & Gilman, 14th ed., Cap. 19",
      },
    ],
  },

  {
    name: 'Lorazepam',
    aliases: ['Ativan'],
    dosages: [
      {
        minDose: 0.02,
        maxDose: 0.04,
        unit: 'mg/kg',
        context: 'sedation',
        route: 'IV',
        notes: 'Premedicacion o ansiolisis. Inicio IV: 1-5 min. Duracion prolongada (6-10 h). Dosis habitual adulto: 1-2 mg. No tiene metabolitos activos.',
        reference: "Stoelting's Pharmacology, 6th ed., Cap. 3",
      },
      {
        minDose: 0.02,
        maxDose: 0.04,
        unit: 'mg/kg',
        context: 'sedation',
        route: 'IM',
        notes: 'Via IM: absorcion completa, inicio en 15-30 min. Dosis habitual adulto: 1-2 mg.',
        reference: "Stoelting's Pharmacology, 6th ed., Cap. 3",
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // OPIOIDES
  // ═══════════════════════════════════════════════

  {
    name: 'Fentanilo',
    aliases: ['Fentanyl', 'Sublimaze'],
    dosages: [
      {
        minDose: 1,
        maxDose: 3,
        unit: 'mcg/kg',
        context: 'analgesia',
        route: 'IV',
        notes: 'Dosis analgesica para complementar anestesia general. Pico de efecto: 3-5 min.',
        reference: "Miller's Anesthesia, 9th ed., Cap. 24",
      },
      {
        minDose: 5,
        maxDose: 10,
        unit: 'mcg/kg',
        context: 'induction',
        route: 'IV',
        notes: 'Dosis altas para induccion basada en opioides (cirugia cardiaca). Riesgo de rigidez toracica con bolos rapidos. Puede requerir relajante muscular.',
        reference: "Miller's Anesthesia, 9th ed., Cap. 24",
      },
      {
        minDose: 1,
        maxDose: 3,
        unit: 'mcg/kg',
        context: 'sedation',
        route: 'IV',
        notes: 'Dosis para sedacion procedural combinada con hipnotico. Monitorizar ventilacion.',
        reference: "Stoelting's Pharmacology, 6th ed., Cap. 7",
      },
    ],
  },

  {
    name: 'Sufentanilo',
    aliases: ['Sufentanil', 'Sufenta'],
    dosages: [
      {
        minDose: 0.1,
        maxDose: 0.4,
        unit: 'mcg/kg',
        context: 'analgesia',
        route: 'IV',
        notes: 'Dosis analgesica complementaria. 7-10 veces mas potente que fentanilo. Pico de efecto: 3-5 min.',
        reference: "Miller's Anesthesia, 9th ed., Cap. 24",
      },
      {
        minDose: 1,
        maxDose: 8,
        unit: 'mcg/kg',
        context: 'induction',
        route: 'IV',
        notes: 'Dosis altas para cirugia cardiaca. Combinado con hipnotico. Riesgo de rigidez toracica y bradicardia.',
        reference: "Stoelting's Pharmacology, 6th ed., Cap. 7",
      },
    ],
  },

  {
    name: 'Remifentanilo',
    aliases: ['Remifentanil', 'Ultiva'],
    dosages: [
      {
        minDose: 0.05,
        maxDose: 0.2,
        unit: 'mcg/kg/min',
        context: 'maintenance',
        route: 'IV',
        notes: 'Infusion para mantenimiento analgesico en anestesia general. Metabolismo por esterasas plasmaticas; vida media contexto-dependiente ultracorta (~3.5 min). Ajustar segun respuesta.',
        reference: "Miller's Anesthesia, 9th ed., Cap. 24",
      },
      {
        minDose: 0.5,
        maxDose: 1,
        unit: 'mcg/kg',
        context: 'induction',
        route: 'IV',
        notes: 'Bolo para atenuacion de respuesta a laringoscopia. Administrar en >60 s para evitar rigidez toracica y bradicardia.',
        reference: "Stoelting's Pharmacology, 6th ed., Cap. 7",
      },
      {
        minDose: 0.025,
        maxDose: 0.1,
        unit: 'mcg/kg/min',
        context: 'sedation',
        route: 'IV',
        notes: 'Infusion para sedacion procedural. Titular cuidadosamente. Alto riesgo de depresion respiratoria. Monitorizar ventilacion.',
        reference: "Miller's Anesthesia, 9th ed., Cap. 24",
      },
    ],
  },

  {
    name: 'Morfina',
    aliases: ['Morphine'],
    dosages: [
      {
        minDose: 0.05,
        maxDose: 0.15,
        unit: 'mg/kg',
        context: 'analgesia',
        route: 'IV',
        notes: 'Analgesia perioperatoria. Pico de efecto: 15-20 min IV. Titular en incrementos de 1-3 mg. Considerar reduccion en insuficiencia renal (metabolito activo M6G). Libera histamina.',
        reference: "Miller's Anesthesia, 9th ed., Cap. 24",
      },
      {
        minDose: 0.05,
        maxDose: 0.2,
        unit: 'mg/kg',
        context: 'analgesia',
        route: 'IM',
        notes: 'Via IM: inicio en 15-30 min, duracion 3-4 h. Absorcion variable. Dosis habitual adulto: 5-10 mg.',
        reference: "Goodman & Gilman, 14th ed., Cap. 20",
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // BLOQUEANTES NEUROMUSCULARES
  // ═══════════════════════════════════════════════

  {
    name: 'Rocuronio',
    aliases: ['Rocuronium', 'Zemuron'],
    dosages: [
      {
        minDose: 0.6,
        maxDose: 1.2,
        unit: 'mg/kg',
        context: 'induction',
        route: 'IV',
        notes: 'Intubacion: 0.6 mg/kg (onset 60-90 s), 1.0-1.2 mg/kg para secuencia rapida (onset 45-60 s). Revertir con sugammadex 16 mg/kg si es necesario.',
        reference: "Miller's Anesthesia, 9th ed., Cap. 27",
      },
      {
        minDose: 0.1,
        maxDose: 0.2,
        unit: 'mg/kg',
        context: 'maintenance',
        route: 'IV',
        notes: 'Dosis de mantenimiento (bolos). Administrar segun monitoreo de TOF. Intervalo tipico: 20-30 min.',
        reference: "Stoelting's Pharmacology, 6th ed., Cap. 12",
      },
    ],
  },

  {
    name: 'Vecuronio',
    aliases: ['Vecuronium', 'Norcuron'],
    dosages: [
      {
        minDose: 0.08,
        maxDose: 0.12,
        unit: 'mg/kg',
        context: 'induction',
        route: 'IV',
        notes: 'Intubacion: onset 2-3 min con 0.1 mg/kg. Sin efectos cardiovasculares significativos. Metabolismo hepatico; prolongado en insuficiencia hepatica.',
        reference: "Miller's Anesthesia, 9th ed., Cap. 27",
      },
      {
        minDose: 0.01,
        maxDose: 0.02,
        unit: 'mg/kg',
        context: 'maintenance',
        route: 'IV',
        notes: 'Dosis de mantenimiento (bolos). Guiar con TOF. Intervalo tipico: 25-40 min.',
        reference: "Stoelting's Pharmacology, 6th ed., Cap. 12",
      },
    ],
  },

  {
    name: 'Cisatracurio',
    aliases: ['Cisatracurium', 'Nimbex'],
    dosages: [
      {
        minDose: 0.1,
        maxDose: 0.2,
        unit: 'mg/kg',
        context: 'induction',
        route: 'IV',
        notes: 'Intubacion: 0.15 mg/kg (onset 2-3 min). Degradacion de Hofmann (independiente de organos). Ideal en insuficiencia renal o hepatica. Sin liberacion de histamina.',
        reference: "Miller's Anesthesia, 9th ed., Cap. 27",
      },
      {
        minDose: 0.02,
        maxDose: 0.03,
        unit: 'mg/kg',
        context: 'maintenance',
        route: 'IV',
        notes: 'Dosis de mantenimiento (bolos). Guiar con TOF. Intervalo tipico: 20-25 min.',
        reference: "Stoelting's Pharmacology, 6th ed., Cap. 12",
      },
    ],
  },

  {
    name: 'Succinilcolina',
    aliases: ['Succinylcholine', 'Suxamethonium', 'Anectine'],
    dosages: [
      {
        minDose: 1,
        maxDose: 1.5,
        unit: 'mg/kg',
        context: 'induction',
        route: 'IV',
        maxAbsoluteDose: 200,
        maxAbsoluteDoseUnit: 'mg',
        notes: 'Secuencia rapida de intubacion. Onset: 30-60 s, duracion: 5-10 min. CONTRAINDICADO en hiperpotasemia, quemaduras >24h, denervacion, miopatias, antecedente de hipertermia maligna.',
        reference: "Miller's Anesthesia, 9th ed., Cap. 27",
      },
      {
        minDose: 3,
        maxDose: 4,
        unit: 'mg/kg',
        context: 'induction',
        route: 'IM',
        notes: 'Via IM cuando no hay acceso venoso (emergencia pediatrica). Onset: 2-3 min. Mismas contraindicaciones que IV.',
        reference: "Stoelting's Pharmacology, 6th ed., Cap. 12",
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // REVERSORES
  // ═══════════════════════════════════════════════

  {
    name: 'Neostigmina',
    aliases: ['Neostigmine', 'Prostigmin'],
    dosages: [
      {
        minDose: 0.03,
        maxDose: 0.07,
        unit: 'mg/kg',
        context: 'maintenance',
        route: 'IV',
        maxAbsoluteDose: 5,
        maxAbsoluteDoseUnit: 'mg',
        notes: 'Reversion de bloqueo neuromuscular no despolarizante. Administrar SIEMPRE con anticolinergico (atropina 0.01-0.02 mg/kg o glicopirrolato 0.01 mg/kg). Dosis maxima: 5 mg. Usar solo con TOF >= 2 respuestas.',
        reference: "Miller's Anesthesia, 9th ed., Cap. 27",
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // ANTICOLINERGICOS / VASOPRESORES
  // ═══════════════════════════════════════════════

  {
    name: 'Atropina',
    aliases: ['Atropine'],
    dosages: [
      {
        minDose: 0.01,
        maxDose: 0.02,
        unit: 'mg/kg',
        context: 'maintenance',
        route: 'IV',
        maxAbsoluteDose: 1,
        maxAbsoluteDoseUnit: 'mg',
        notes: 'Como anticolinergico asociado a neostigmina. Dosis habitual adulto: 0.5-1 mg. Dosis minima: 0.1 mg (dosis menores pueden causar bradicardia paradojal).',
        reference: "Miller's Anesthesia, 9th ed., Cap. 15",
      },
      {
        minDose: 0.01,
        maxDose: 0.02,
        unit: 'mg/kg',
        context: 'induction',
        route: 'IV',
        maxAbsoluteDose: 3,
        maxAbsoluteDoseUnit: 'mg',
        notes: 'Tratamiento de bradicardia sintomatica. Puede repetirse cada 3-5 min. Dosis para ACLS: 0.5 mg IV cada 3-5 min, maximo 3 mg.',
        reference: "Goodman & Gilman, 14th ed., Cap. 9",
      },
    ],
  },

  {
    name: 'Efedrina',
    aliases: ['Ephedrine'],
    dosages: [
      {
        minDose: 0.1,
        maxDose: 0.2,
        unit: 'mg/kg',
        context: 'maintenance',
        route: 'IV',
        notes: 'Tratamiento de hipotension durante anestesia. Bolos de 5-10 mg IV (adulto). Efecto mixto alfa y beta. Taquifilaxia con dosis repetidas. Inicio: 1-2 min.',
        reference: "Stoelting's Pharmacology, 6th ed., Cap. 12",
      },
    ],
  },

  {
    name: 'Noradrenalina',
    aliases: ['Norepinephrine', 'Levophed'],
    dosages: [
      {
        minDose: 0.01,
        maxDose: 0.3,
        unit: 'mcg/kg/min',
        context: 'maintenance',
        route: 'IV',
        notes: 'Infusion continua para hipotension refractaria o shock vasoplejico. Rango habitual: 0.05-0.3 mcg/kg/min. Administrar por via central preferentemente. Titular segun PAM objetivo.',
        reference: "Miller's Anesthesia, 9th ed., Cap. 15",
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // AGONISTAS ALFA-2
  // ═══════════════════════════════════════════════

  {
    name: 'Dexmedetomidina',
    aliases: ['Dexmedetomidine', 'Precedex'],
    dosages: [
      {
        minDose: 0.5,
        maxDose: 1.0,
        unit: 'mcg/kg',
        context: 'sedation',
        route: 'IV',
        notes: 'Dosis de carga: infundir en 10 minutos. Puede causar bradicardia e hipotension durante la carga. Considerar omitir carga en pacientes con compromiso hemodinamico.',
        reference: "Miller's Anesthesia, 9th ed., Cap. 23",
      },
      {
        minDose: 0.2,
        maxDose: 0.7,
        unit: 'mcg/kg/h',
        context: 'maintenance',
        route: 'IV',
        notes: 'Infusion de mantenimiento para sedacion. Hasta 1.4 mcg/kg/h en algunos protocolos. Sedacion sin depresion respiratoria significativa. Monitorizar FC y PA.',
        reference: "Stoelting's Pharmacology, 6th ed., Cap. 5",
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // ANESTESICOS LOCALES
  // ═══════════════════════════════════════════════

  {
    name: 'Lidocaína',
    aliases: ['Lidocaine', 'Xylocaine'],
    dosages: [
      {
        minDose: 1,
        maxDose: 4.5,
        unit: 'mg/kg',
        context: 'analgesia',
        route: 'regional',
        maxAbsoluteDose: 300,
        maxAbsoluteDoseUnit: 'mg',
        notes: 'Uso regional/local. Dosis maxima sin epinefrina: 4.5 mg/kg (max 300 mg). Con epinefrina: 7 mg/kg (max 500 mg). La dosis real depende del tipo de bloqueo y sitio de inyeccion.',
        reference: "Miller's Anesthesia, 9th ed., Cap. 30",
      },
      {
        minDose: 1,
        maxDose: 1.5,
        unit: 'mg/kg',
        context: 'induction',
        route: 'IV',
        notes: 'Bolo IV para atenuar respuesta hemodinamica a laringoscopia/intubacion. Administrar 1-3 min antes de la intubacion. NO confundir con dosis maxima regional (4.5 mg/kg).',
        reference: "Stoelting's Pharmacology, 6th ed., Cap. 10",
      },
    ],
  },

  {
    name: 'Bupivacaína',
    aliases: ['Bupivacaine', 'Marcaine'],
    dosages: [
      {
        minDose: 1,
        maxDose: 2.5,
        unit: 'mg/kg',
        context: 'analgesia',
        route: 'regional',
        maxAbsoluteDose: 175,
        maxAbsoluteDoseUnit: 'mg',
        notes: 'Uso regional/local EXCLUSIVAMENTE. Dosis maxima sin epinefrina: 2.5 mg/kg (max 175 mg). Con epinefrina: 3 mg/kg. Alta cardiotoxicidad. NO usar via IV (riesgo de paro cardiaco). NO usar para anestesia regional IV (Bier). La dosis real depende del tipo de bloqueo y sitio de inyeccion.',
        reference: "Miller's Anesthesia, 9th ed., Cap. 30",
      },
    ],
  },

  {
    name: 'Ropivacaína',
    aliases: ['Ropivacaine', 'Naropin'],
    dosages: [
      {
        minDose: 1,
        maxDose: 3,
        unit: 'mg/kg',
        context: 'analgesia',
        route: 'regional',
        maxAbsoluteDose: 225,
        maxAbsoluteDoseUnit: 'mg',
        notes: 'Uso regional/local. Dosis maxima: 3 mg/kg (max 225 mg). Menor cardiotoxicidad que bupivacaina. Menor bloqueo motor a concentraciones bajas. La dosis real depende del tipo de bloqueo y sitio de inyeccion.',
        reference: "Miller's Anesthesia, 9th ed., Cap. 30",
      },
    ],
  },
]

// Mapa para busqueda rapida por nombre normalizado
const dosageMap = new Map<string, DrugDosage>()

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

for (const drug of dosageData) {
  dosageMap.set(normalize(drug.name), drug)
  for (const alias of drug.aliases) {
    dosageMap.set(normalize(alias), drug)
  }
}

/**
 * Busca datos de dosificacion por nombre de farmaco.
 * Acepta nombre principal o alias, insensible a acentos y mayusculas.
 */
export function findDosage(drugName: string): DrugDosage | undefined {
  return dosageMap.get(normalize(drugName))
}
