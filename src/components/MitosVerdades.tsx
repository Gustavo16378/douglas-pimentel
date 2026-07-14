import { Eyebrow, Section, TYPE } from './ui'

const HAIRLINE = '1px solid rgba(26,24,22,0.14)'

const PAIRS = [
  {
    myth: 'Quem pede demissão perde tudo',
    truth:
      'Você continua tendo direito a saldo de salário, férias proporcionais e 13º — só fica de fora do FGTS de 40% e do seguro-desemprego.',
  },
  {
    myth: 'Trabalho sem carteira assinada não gera direitos',
    truth:
      'Gera, sim. Provando o vínculo, você pode ter direito às mesmas verbas de quem foi registrado desde o início.',
  },
  {
    myth: 'Processar a empresa me impede de conseguir outro emprego',
    truth:
      'Buscar seus direitos na Justiça do Trabalho é confidencial — não aparece em consulta de antecedentes ou referências.',
  },
  {
    myth: 'Acordo por fora vale mais que acerto na justiça',
    truth:
      'Sem registro formal, esse "acordo" não garante nada — você pode acabar recebendo menos do que realmente tem direito.',
  },
]

export default function MitosVerdades() {
  return (
    <Section bg="cream">
      <Eyebrow tone="goldDark" style={{ marginBottom: '16px' }}>
        MITOS E VERDADES
      </Eyebrow>
      <h2
        className="font-serif font-medium text-ink-soft"
        style={{ fontSize: TYPE.title, lineHeight: 1.1, marginBottom: '10px', maxWidth: '16ch' }}
      >
        O que você ouve por aí — e o que é verdade.
      </h2>

      <div
        className="mt-8 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-14"
        style={{ borderBottom: HAIRLINE }}
      >
          {PAIRS.map((pair) => (
            <div
              key={pair.myth}
              className="flex flex-col"
              style={{ padding: '26px 0', borderTop: HAIRLINE, gap: '12px' }}
            >
              <div className="flex flex-wrap items-baseline" style={{ gap: '10px' }}>
                <span
                  className="flex-none font-sans font-bold uppercase text-ink-soft/40"
                  style={{
                    fontSize: '10.5px',
                    letterSpacing: '0.1em',
                    border: '1px solid rgba(26,24,22,0.25)',
                    borderRadius: '3px',
                    padding: '3px 7px',
                  }}
                >
                  MITO
                </span>
                <span
                  className="font-sans text-ink-soft/40 line-through"
                  style={{ fontSize: TYPE.cardBody }}
                >
                  {pair.myth}
                </span>
              </div>
              <div
                className="font-serif italic text-ink-soft"
                style={{ fontSize: TYPE.cardTitle, lineHeight: 1.4 }}
              >
                {pair.truth}
              </div>
            </div>
          ))}
        </div>
    </Section>
  )
}
