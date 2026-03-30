import type { Drug } from '../types'

export const drugs: Drug[] = [
  // === Hipnoticos / Agentes de induccion ===
  { name: 'Propofol', aliases: ['Diprivan'], category: 'Hipnotico' },
  { name: 'Tiopental', aliases: ['Thiopental', 'Pentothal'], category: 'Hipnotico' },
  { name: 'Ketamina', aliases: ['Ketamine', 'Ketalar'], category: 'Disociativo' },
  { name: 'Etomidato', aliases: ['Etomidate', 'Amidate'], category: 'Hipnotico' },

  // === Benzodiacepinas ===
  { name: 'Midazolam', aliases: ['Versed', 'Dormicum'], category: 'Benzodiacepina' },
  { name: 'Diazepam', aliases: ['Valium'], category: 'Benzodiacepina' },
  { name: 'Lorazepam', aliases: ['Ativan'], category: 'Benzodiacepina' },

  // === Opioides ===
  { name: 'Fentanilo', aliases: ['Fentanyl', 'Sublimaze'], category: 'Opioide' },
  { name: 'Sufentanilo', aliases: ['Sufentanil', 'Sufenta'], category: 'Opioide' },
  { name: 'Remifentanilo', aliases: ['Remifentanil', 'Ultiva'], category: 'Opioide' },
  { name: 'Morfina', aliases: ['Morphine'], category: 'Opioide' },

  // === Bloqueantes neuromusculares ===
  { name: 'Rocuronio', aliases: ['Rocuronium', 'Zemuron'], category: 'BNM' },
  { name: 'Vecuronio', aliases: ['Vecuronium', 'Norcuron'], category: 'BNM' },
  { name: 'Cisatracurio', aliases: ['Cisatracurium', 'Nimbex'], category: 'BNM' },
  { name: 'Succinilcolina', aliases: ['Succinylcholine', 'Suxamethonium', 'Anectine'], category: 'BNM' },

  // === Reversores ===
  { name: 'Neostigmina', aliases: ['Neostigmine', 'Prostigmin'], category: 'Reversor' },

  // === Anticolinergicos / Vasopresores ===
  { name: 'Atropina', aliases: ['Atropine'], category: 'Anticolinergico' },
  { name: 'Efedrina', aliases: ['Ephedrine'], category: 'Vasopresor' },
  { name: 'Noradrenalina', aliases: ['Norepinephrine', 'Levophed'], category: 'Vasopresor' },

  // === Agonistas alfa-2 ===
  { name: 'Dexmedetomidina', aliases: ['Dexmedetomidine', 'Precedex'], category: 'Agonista alfa-2' },

  // === Anestesicos locales ===
  { name: 'Lidocaina', aliases: ['Lidocaine', 'Xylocaine'], category: 'Anestesico local' },
  { name: 'Bupivacaina', aliases: ['Bupivacaine', 'Marcaine'], category: 'Anestesico local' },
  { name: 'Ropivacaina', aliases: ['Ropivacaine', 'Naropin'], category: 'Anestesico local' },
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
