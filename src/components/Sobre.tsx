import sobreImg from '../assets/sobre.jpg'
import { Eyebrow, Container, TYPE } from './ui'

const BIO =
  'Desde 2019, Douglas atua defendendo trabalhadores em Palmas e em todo o Tocantins. Especialista em Direito do Trabalho, já orientou centenas de pessoas que não sabiam por onde começar — e leva esse mesmo cuidado para palestras e conteúdos educativos, pra que cada vez menos gente aceite calada um direito violado.'
const QUOTE = '"Ninguém deveria enfrentar isso sozinho — nem sem saber os próprios direitos."'
const ATTR = '— Douglas Pimentel, OAB/TO 9376'

const quoteBorder = '1px solid rgba(201,168,106,0.35)'

export default function Sobre() {
  return (
    <section id="sobre">
      {/* ---------- Desktop ---------- */}
      <div
        className="hidden lg:flex lg:min-h-[70vh] lg:flex-col lg:justify-center"
        style={{ background: '#14120f' }}
      >
        <Container
          className="flex items-center text-left"
          style={{ paddingTop: 'clamp(96px,10vw,160px)', paddingBottom: 'clamp(96px,10vw,160px)', gap: '64px' }}
        >
          <div className="flex flex-col" style={{ flex: '1 1 0', gap: '20px' }}>
            <Eyebrow tone="gold">QUEM DEFENDE VOCÊ</Eyebrow>
            <h2
              className="font-serif font-medium text-cream"
              style={{ fontSize: TYPE.title, lineHeight: 1.05 }}
            >
              Douglas Pimentel
            </h2>
            <p className="font-sans text-cream/[0.78]" style={{ fontSize: TYPE.body, lineHeight: 1.7, maxWidth: '560px' }}>
              {BIO}
            </p>
            <div
              className="mt-2 flex flex-col"
              style={{ borderTop: quoteBorder, borderBottom: quoteBorder, padding: '24px 0', gap: '10px', maxWidth: '560px' }}
            >
              <div className="font-serif italic text-cream" style={{ fontSize: TYPE.cardTitle, lineHeight: 1.5 }}>
                {QUOTE}
              </div>
              <div className="font-sans font-semibold text-gold" style={{ fontSize: '12px' }}>
                {ATTR}
              </div>
            </div>
          </div>
          {/* Clean editorial frame — sharp original image, straight corners,
              thin gold hairline + soft shadow. No fade / mask / filter. */}
          <div
            className="relative overflow-hidden shadow-2xl"
            style={{
              flex: '0 0 40%',
              height: 'clamp(380px,36vw,480px)',
              border: '1px solid rgba(201,168,106,0.20)',
            }}
          >
            <img
              src={sobreImg}
              alt="Douglas Pimentel"
              className="absolute inset-0 h-full w-full object-cover object-top"
              style={{ objectPosition: 'top center' }}
            />
          </div>
        </Container>
      </div>

      {/* ---------- Mobile ---------- */}
      <div className="lg:hidden" style={{ background: '#14120f' }}>
        <Container
          className="flex flex-col"
          style={{ paddingTop: 'clamp(96px,7vw,120px)', paddingBottom: 'clamp(88px,7vw,112px)', gap: '26px' }}
        >
          <Eyebrow tone="gold" className="text-center">
            QUEM DEFENDE VOCÊ
          </Eyebrow>
          {/* Full-container-width framed rectangle above the text — same clean treatment. */}
          <div
            className="relative w-full overflow-hidden shadow-2xl"
            style={{ aspectRatio: '4 / 5', border: '1px solid rgba(201,168,106,0.20)' }}
          >
            <img
              src={sobreImg}
              alt="Douglas Pimentel"
              className="absolute inset-0 h-full w-full object-cover object-top"
              style={{ objectPosition: 'top center' }}
            />
          </div>
          <h2
            className="text-center font-serif font-medium text-cream"
            style={{ fontSize: 'clamp(30px,8vw,40px)' }}
          >
            Douglas Pimentel
          </h2>
          <p
            className="mx-auto text-center font-sans text-cream/[0.78]"
            style={{ fontSize: '15px', lineHeight: 1.7, maxWidth: '560px' }}
          >
            {BIO}
          </p>
          <div
            className="mx-auto mt-3 flex w-full flex-col"
            style={{ borderTop: quoteBorder, borderBottom: quoteBorder, padding: '22px 4px', gap: '10px', maxWidth: '560px' }}
          >
            <div className="text-center font-serif italic text-cream" style={{ fontSize: '18px', lineHeight: 1.5 }}>
              {QUOTE}
            </div>
            <div className="text-center font-sans font-semibold text-gold" style={{ fontSize: '12px' }}>
              {ATTR}
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
