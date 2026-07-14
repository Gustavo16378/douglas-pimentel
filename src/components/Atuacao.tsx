import { AtuacaoIcon } from './icons'
import { Eyebrow, Section, TYPE } from './ui'

interface Card {
  icon: string
  title: string
  desc: string
}

const CARDS: Card[] = [
  {
    icon: 'demissao',
    title: 'Demissão sem justa causa',
    desc: 'Foi mandado embora sem explicação clara? Pode ter verbas e direitos que ainda não foram acertados.',
  },
  {
    icon: 'horas',
    title: 'Horas extras não pagas',
    desc: 'Ficou além do horário e isso nunca apareceu no pagamento? Isso tem nome — e pode ser recuperado.',
  },
  {
    icon: 'registro',
    title: 'Trabalho sem registro',
    desc: 'Trabalhou "por fora", sem carteira assinada? Isso não te deixa sem direitos — muito pelo contrário.',
  },
  {
    icon: 'acidente',
    title: 'Acidente de trabalho',
    desc: 'Se machucou no trabalho ou por causa dele? Você pode ter direito a estabilidade e reparação.',
  },
  {
    icon: 'verbas',
    title: 'Verbas rescisórias',
    desc: 'Saiu do emprego e as contas não fecham? Aviso prévio, FGTS, 13º e férias precisam estar certos.',
  },
  {
    icon: 'assedio',
    title: 'Assédio e danos morais',
    desc: 'Humilhação, pressão abusiva ou constrangimento no ambiente de trabalho? Isso tem nome, e tem remédio.',
  },
]

const HAIRLINE = '1px solid rgba(26,24,22,0.14)'

function AtuacaoCard({ card, index }: { card: Card; index: number }) {
  return (
    <div className="flex items-start" style={{ gap: '16px', padding: '30px 0', borderBottom: HAIRLINE }}>
      <div
        className="flex-none font-serif italic text-gold-dark/[0.85]"
        style={{ fontSize: '15px', width: '24px', paddingTop: '6px' }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className="flex-none text-gold-dark" style={{ width: '30px', height: '30px', paddingTop: '2px' }}>
        <AtuacaoIcon name={card.icon} />
      </div>
      <div className="flex flex-1 flex-col" style={{ gap: '7px' }}>
        <div className="font-sans font-bold text-ink-soft" style={{ fontSize: TYPE.cardTitle }}>
          {card.title}
        </div>
        <div className="font-sans text-ink-soft/[0.68]" style={{ fontSize: TYPE.cardBody, lineHeight: 1.55 }}>
          {card.desc}
        </div>
      </div>
    </div>
  )
}

export default function Atuacao() {
  return (
    <Section id="atuacao" bg="cream">
      <Eyebrow tone="goldDark" style={{ marginBottom: '16px' }}>
        ATUAÇÃO
      </Eyebrow>
      <h2
        className="font-serif font-medium text-ink-soft"
        style={{ fontSize: TYPE.title, lineHeight: 1.1, marginBottom: '10px', maxWidth: '16ch' }}
      >
        Se algo disso aconteceu com você, a gente conversa.
      </h2>

      <div
        className="mt-10 grid grid-cols-1 lg:grid-cols-3 lg:gap-x-12"
        style={{ borderTop: HAIRLINE }}
      >
        {CARDS.map((card, i) => (
          <AtuacaoCard key={card.title} card={card} index={i} />
        ))}
      </div>
    </Section>
  )
}
