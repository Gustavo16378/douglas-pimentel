// Business / contact data used across the footer, "Onde encontrar" and OG.

export const CONTACT = {
  phoneDisplay: '(63) 99202-4803',
  instagram: '@douglaspimenteladv',
  instagramUrl: 'https://instagram.com/douglaspimenteladv',
  oab: 'OAB/TO 9376',
} as const

export const ADDRESS = {
  place: 'Espaço Lelé da Cuca',
  line1: 'Av. NS 04 com Av. LO 19, Quadra Arse 72',
  line2: 'Q. 706 Sul, Alameda 8, nº 23 — 1º Andar, Sala 02',
  line3: 'Plano Diretor Sul',
  city: 'Palmas - TO',
  cep: '77022-404',
} as const

// Placeholder — swap for the real weekly hours when confirmed.
export const HOURS = {
  weekdays: 'Segunda a sexta · 08h às 18h',
  note: 'Atendimento também por WhatsApp',
} as const

const MAPS_QUERY = encodeURIComponent(
  'Espaço Lelé da Cuca, Q. 706 Sul, Alameda 8, 23, Plano Diretor Sul, Palmas - TO, 77022-404',
)

// Google Maps embed (no API key required) styled dark in the component wrapper.
export const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&hl=pt-BR&z=16&output=embed`

// "Como chegar" — opens turn-by-turn directions to the office.
export const MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`
