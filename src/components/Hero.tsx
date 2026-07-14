import heroImg from '../assets/hero.jpg'
import { waLink, WA_MESSAGES } from '../lib/whatsapp'
import { WaButton, Container, CONTENT_MAX, TYPE, PortraitFade } from './ui'

const badge = 'ADVOCACIA TRABALHISTA — PALMAS, TO'
const titleText = 'Seus direitos valem a briga.'
const subtitle =
  'Do primeiro sinal de injustiça até o acordo justo — sempre do seu lado, nunca do lado da empresa.'
const ctaLabel = 'Falar com um advogado agora'

function Badge() {
  return (
    <div
      className="font-sans font-bold uppercase text-gold"
      style={{ fontSize: TYPE.label, letterSpacing: '0.16em' }}
    >
      {badge}
    </div>
  )
}

function Rating() {
  return (
    <div className="flex items-center gap-1.5 font-sans text-cream/70" style={{ fontSize: '12.5px' }}>
      <span className="text-gold">★</span>
      5.0 — mais de 300 avaliações no Google
    </div>
  )
}

export default function Hero() {
  const href = waLink(WA_MESSAGES.hero)

  return (
    <section aria-label="Apresentação">
      {/* ---------- Desktop: full-bleed portrait (right edge) + text column ---------- */}
      <div className="relative hidden overflow-hidden lg:block" style={{ background: '#14120f' }}>
        {/* Portrait bleeds to the absolute right edge of the viewport, full height.
            Width is capped to the image's own 2:3 aspect via min(40vw, 66.7vh) so
            object-cover ALWAYS fills the height and shows the whole seated body at the
            original zoom — it never crops the hands/legs. Fusion gradients on the left,
            top and base, plus reinforced 35% diagonals in the two top corners. */}
        <div
          className="absolute inset-y-0 right-0 z-0 isolate overflow-hidden"
          style={{ width: 'min(40vw, 66.7vh)' }}
        >
          <img
            src={heroImg}
            alt="Douglas Pimentel, advogado trabalhista"
            className="h-full w-full object-cover object-top"
          />
          <PortraitFade preset="heroDesktop" />
        </div>
        <div className="relative z-[2] mx-auto flex min-h-screen items-center" style={{ maxWidth: CONTENT_MAX }}>
          <div
            className="flex flex-col justify-center text-left"
            style={{ width: '50%', gap: '26px', padding: '96px 48px 72px 48px' }}
          >
            <Badge />
            <h1
              className="font-serif font-medium text-cream"
              style={{ fontSize: TYPE.hero, lineHeight: 1.04, maxWidth: '12ch' }}
            >
              {titleText}
            </h1>
            <p
              className="font-sans text-cream/85"
              style={{ fontSize: TYPE.body, lineHeight: 1.6, maxWidth: '30ch' }}
            >
              {subtitle}
            </p>
            <WaButton href={href} icon className="mt-1.5 w-fit" style={{ fontSize: '14.5px', padding: '16px 26px' }}>
              {ctaLabel}
            </WaButton>
            <Rating />
          </div>
        </div>
      </div>

      {/* ---------- Mobile: photo-first, editorial ---------- */}
      <div className="flex min-h-[100svh] flex-col lg:hidden" style={{ background: '#14120f' }}>
        {/* Portrait opens the page — navbar (transparent) overlays this */}
        <div className="relative isolate w-full overflow-hidden" style={{ height: 'clamp(340px,63svh,620px)' }}>
          <img
            src={heroImg}
            alt="Douglas Pimentel, advogado trabalhista"
            className="h-full w-full object-cover object-top"
          />
          <PortraitFade preset="heroMobile" />
        </div>

        <Container
          className="flex flex-1 flex-col items-center justify-center text-center"
          style={{ paddingTop: 'clamp(22px,6vw,36px)', paddingBottom: 'clamp(30px,7vw,60px)', gap: '16px' }}
        >
          <Badge />
          <h1
            className="font-serif font-medium text-cream"
            style={{ fontSize: 'clamp(36px,9vw,54px)', lineHeight: 1.08, maxWidth: '16ch' }}
          >
            {titleText}
          </h1>
          <p
            className="font-sans text-cream/85"
            style={{ fontSize: '16px', lineHeight: 1.6, maxWidth: '38ch' }}
          >
            {subtitle}
          </p>
          <WaButton href={href} icon className="mt-1 w-fit" style={{ fontSize: '14.5px', padding: '15px 24px' }}>
            {ctaLabel}
          </WaButton>
          <Rating />
        </Container>
      </div>
    </section>
  )
}
