import palestraImg from '../assets/palestra.webp'
import { waLink, WA_MESSAGES } from '../lib/whatsapp'
import { Eyebrow, Section, TYPE } from './ui'

export default function Palestras() {
  return (
    <Section bg="ink">
      <Eyebrow tone="gold" style={{ marginBottom: '18px' }}>
        PALESTRAS
      </Eyebrow>
      <h2
        className="font-serif font-medium text-cream"
        style={{ fontSize: TYPE.title, lineHeight: 1.1, marginBottom: '32px', maxWidth: '16ch' }}
      >
        Direito do trabalho, explicado pra quem trabalha.
      </h2>

        <div className="flex flex-wrap items-start" style={{ gap: '40px' }}>
          <div className="relative" style={{ flex: '1 1 320px', height: 'clamp(225px,28vw,340px)' }}>
            <img
              src={palestraImg}
              alt="Douglas Pimentel palestrando"
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                objectPosition: 'center 15%',
                filter: 'grayscale(30%) contrast(1.08) brightness(0.88)',
                maskImage: 'radial-gradient(ellipse 85% 78% at 50% 40%, black 60%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 85% 78% at 50% 40%, black 60%, transparent 100%)',
              }}
            />
          </div>
          <div className="flex flex-col" style={{ flex: '1 1 300px', maxWidth: '460px', gap: '18px' }}>
            <p
              className="font-sans text-cream/[0.78]"
              style={{ fontSize: TYPE.body, lineHeight: 1.7 }}
            >
              Douglas leva o direito trabalhista para além do escritório — palestras em universidades,
              empresas e eventos, traduzindo a lei para quem mais precisa entender ela.
            </p>
            <a
              href={waLink(WA_MESSAGES.palestra)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit font-sans font-bold text-gold transition-opacity hover:opacity-80"
              style={{ fontSize: '13px' }}
            >
              Convidar para palestrar →
            </a>
          </div>
        </div>
    </Section>
  )
}
