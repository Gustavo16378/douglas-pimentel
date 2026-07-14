import { waLink, WA_MESSAGES } from '../lib/whatsapp'
import { Eyebrow, Section, TYPE } from './ui'

const HAIRLINE = '1px solid rgba(26,24,22,0.14)'

const CARDS = [
  {
    q: '"Fui demitido sem justa causa. O que eu recebo?"',
    a: 'Aviso prévio, saldo de salário, 13º e férias proporcionais, FGTS com multa de 40%. Veja o que não pode faltar no seu acerto.',
    msg: WA_MESSAGES.direitoDemissao,
  },
  {
    q: '"Horas extras: como saber se tenho direito?"',
    a: 'Cartão de ponto, banco de horas, escala de trabalho. Entenda os sinais de que você pode estar trabalhando além do que deveria.',
    msg: WA_MESSAGES.direitoHorasExtras,
  },
  {
    q: '"Assédio no trabalho: o que fazer?"',
    a: 'Humilhação constante, ameaças, pressão abusiva. Saiba como identificar, reunir provas e buscar reparação.',
    msg: WA_MESSAGES.direitoAssedio,
  },
]

export default function SeusDireitos() {
  return (
    <Section bg="cream">
      <Eyebrow tone="goldDark" style={{ marginBottom: '16px' }}>
        SEUS DIREITOS
      </Eyebrow>
      <h2
        className="font-serif font-medium text-ink-soft"
        style={{ fontSize: TYPE.title, lineHeight: 1.1, marginBottom: '10px', maxWidth: '15ch' }}
      >
        Pra você entender antes de decidir.
      </h2>

      <div
        className="mt-8 grid"
        style={{
          gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
          columnGap: '36px',
          borderTop: HAIRLINE,
        }}
      >
          {CARDS.map((card) => (
            <div key={card.q} style={{ padding: '30px 0', borderBottom: HAIRLINE }}>
              <div
                className="font-serif italic font-medium text-ink-soft"
                style={{ fontSize: TYPE.cardTitle, lineHeight: 1.35, marginBottom: '10px' }}
              >
                {card.q}
              </div>
              <div
                className="font-sans text-ink-soft/[0.68]"
                style={{ fontSize: TYPE.cardBody, lineHeight: 1.6, marginBottom: '14px' }}
              >
                {card.a}
              </div>
              <a
                href={waLink(card.msg)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans font-bold text-gold-dark transition-opacity hover:opacity-80"
                style={{ fontSize: '13px' }}
              >
                Perguntar sobre isso →
              </a>
            </div>
          ))}
        </div>
    </Section>
  )
}
