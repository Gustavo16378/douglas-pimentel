import { Eyebrow, Section, TYPE } from './ui'

const ITEMS = [
  {
    text: 'Eu não sabia que tinha direito a nada depois que fui demitida. O Dr. Douglas explicou tudo em linguagem simples e me deixou tranquila desde a primeira conversa.',
    name: 'Marina S.',
  },
  {
    text: 'Fiquei mais de um ano fazendo hora extra sem receber. Hoje sei exatamente quais são meus direitos e me senti acompanhado o tempo todo.',
    name: 'Ricardo T.',
  },
  {
    text: 'Atendimento humano, rápido pelo WhatsApp, sem aquele clima de tribunal que a gente imagina. Recomendo pra quem está insegura sobre o que fazer.',
    name: 'Ana C.',
  },
]

export default function Depoimentos() {
  return (
    <Section id="depoimentos" bg="cream">
      <Eyebrow tone="goldDark" style={{ marginBottom: '16px' }}>
        DEPOIMENTOS
      </Eyebrow>
      <h2
        className="font-serif font-medium text-ink-soft"
        style={{ fontSize: TYPE.title, lineHeight: 1.1, marginBottom: '32px', maxWidth: '16ch' }}
      >
        Quem já passou por isso, conta.
      </h2>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-7">
          {ITEMS.map((item) => (
            <figure
              key={item.name}
              className="flex flex-col"
              style={{ background: '#ece5d8', padding: '32px 26px', gap: '14px' }}
            >
              <div className="font-serif text-gold" style={{ fontSize: '34px', height: '20px' }} aria-hidden="true">
                &ldquo;
              </div>
              <blockquote className="font-sans text-ink-soft" style={{ fontSize: TYPE.cardBody, lineHeight: 1.6 }}>
                {item.text}
              </blockquote>
              <figcaption className="font-sans font-bold text-ink-soft/55" style={{ fontSize: '13px' }}>
                {item.name}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center" style={{ gap: '4px' }}>
          <div className="text-gold" style={{ fontSize: '17px', letterSpacing: '3px' }} aria-hidden="true">
            ★★★★★
          </div>
          <div className="font-sans font-bold text-ink-soft" style={{ fontSize: '13px' }}>
            5.0 no Google
          </div>
          <div className="font-sans text-ink-soft/60" style={{ fontSize: '12px' }}>
            mais de 300 avaliações
          </div>
        </div>
    </Section>
  )
}
