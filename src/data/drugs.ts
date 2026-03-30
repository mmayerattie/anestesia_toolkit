import type { Drug } from '../types'

export const drugs: Drug[] = [
  // === Hipnóticos / Agentes de inducción ===
  { name: 'Propofol', aliases: ['Diprivan'], category: 'Hipnótico', rxcui: '8782' },
  { name: 'Tiopental', aliases: ['Thiopental', 'Pentothal'], category: 'Hipnótico', rxcui: '10154' },
  { name: 'Ketamina', aliases: ['Ketamine', 'Ketalar'], category: 'Disociativo', rxcui: '6130' },
  { name: 'Etomidato', aliases: ['Etomidate', 'Amidate'], category: 'Hipnótico', rxcui: '4100' },

  // === Benzodiacepinas ===
  { name: 'Midazolam', aliases: ['Versed', 'Dormicum'], category: 'Benzodiacepina', rxcui: '6960' },
  { name: 'Diazepam', aliases: ['Valium'], category: 'Benzodiacepina', rxcui: '3322' },
  { name: 'Lorazepam', aliases: ['Ativan'], category: 'Benzodiacepina', rxcui: '6470' },

  // === Opioides ===
  { name: 'Fentanilo', aliases: ['Fentanyl', 'Sublimaze'], category: 'Opioide', rxcui: '4337' },
  { name: 'Sufentanilo', aliases: ['Sufentanil', 'Sufenta'], category: 'Opioide', rxcui: '56795' },
  { name: 'Remifentanilo', aliases: ['Remifentanil', 'Ultiva'], category: 'Opioide', rxcui: '73032' },
  { name: 'Morfina', aliases: ['Morphine'], category: 'Opioide', rxcui: '7052' },

  // === Bloqueantes neuromusculares ===
  { name: 'Rocuronio', aliases: ['Rocuronium', 'Zemuron'], category: 'BNM', rxcui: '68139' },
  { name: 'Vecuronio', aliases: ['Vecuronium', 'Norcuron'], category: 'BNM', rxcui: '11090' },
  { name: 'Cisatracurio', aliases: ['Cisatracurium', 'Nimbex'], category: 'BNM', rxcui: '199343' },
  { name: 'Succinilcolina', aliases: ['Succinylcholine', 'Suxamethonium', 'Anectine'], category: 'BNM', rxcui: '10211' },

  // === Reversores ===
  { name: 'Neostigmina', aliases: ['Neostigmine', 'Prostigmin'], category: 'Reversor', rxcui: '7405' },

  // === Anticolinérgicos / Vasopresores ===
  { name: 'Atropina', aliases: ['Atropine'], category: 'Anticolinérgico', rxcui: '1223' },
  { name: 'Efedrina', aliases: ['Ephedrine'], category: 'Vasopresor', rxcui: '3966' },
  { name: 'Noradrenalina', aliases: ['Norepinephrine', 'Levophed'], category: 'Vasopresor', rxcui: '7512' },

  // === Agonistas alfa-2 ===
  { name: 'Dexmedetomidina', aliases: ['Dexmedetomidine', 'Precedex'], category: 'Agonista alfa-2', rxcui: '203174' },

  // === Anestésicos locales ===
  { name: 'Lidocaína', aliases: ['Lidocaine', 'Xylocaine'], category: 'Anestésico local', rxcui: '6387' },
  { name: 'Bupivacaína', aliases: ['Bupivacaine', 'Marcaine'], category: 'Anestésico local', rxcui: '1767' },
  { name: 'Ropivacaína', aliases: ['Ropivacaine', 'Naropin'], category: 'Anestésico local', rxcui: '72625' },
]

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function findDrug(query: string): Drug | undefined {
  const n = normalize(query)
  return drugs.find((d) => {
    if (normalize(d.name) === n) return true
    return d.aliases.some((a) => normalize(a) === n)
  })
}

export function searchDrugs(query: string): Drug[] {
  if (!query.trim()) return []
  const n = normalize(query)
  return drugs.filter((d) => {
    if (normalize(d.name).includes(n)) return true
    return d.aliases.some((a) => normalize(a).includes(n))
  })
}
