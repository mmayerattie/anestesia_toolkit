import type { ChecklistItem } from '../types'

export const defaultChecklist: ChecklistItem[] = [
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
]
