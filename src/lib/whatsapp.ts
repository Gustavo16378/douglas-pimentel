// Single source of truth for every WhatsApp CTA on the page.
// All links point to the same number with a contextual pre-filled message
// so Douglas already knows which section the person came from.

export const WA_NUMBER = '5563992024803'

export function waLink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

/** Contextual pre-filled messages per CTA. */
export const WA_MESSAGES = {
  default:
    'Olá! Vim pelo site da Douglas Pimentel Advocacia e gostaria de uma avaliação do meu caso.',
  hero:
    'Olá! Vim pelo site e gostaria de falar com um advogado sobre o meu caso.',
  navbar:
    'Olá! Vim pelo site e gostaria de falar com um advogado sobre o meu caso.',
  calculadora:
    'Olá, saí do emprego e quero entender o que tenho a receber.',
  palestra:
    'Olá! Gostaria de convidar o Douglas para uma palestra sobre direito do trabalho.',
  ctaFinal:
    'Olá! Não sei se tenho direito a algo e gostaria de uma avaliação do meu caso.',
  onde:
    'Olá! Gostaria de agendar um atendimento no escritório em Palmas.',
  floating:
    'Olá! Vim pelo site e gostaria de tirar uma dúvida com um advogado.',
  // "Seus direitos" cards
  direitoDemissao:
    'Olá! Fui demitido(a) sem justa causa e quero entender o que tenho a receber.',
  direitoHorasExtras:
    'Olá! Acho que tenho horas extras não pagas e quero entender meus direitos.',
  direitoAssedio:
    'Olá! Passei por assédio no trabalho e não sei o que fazer. Pode me ajudar?',
} as const
