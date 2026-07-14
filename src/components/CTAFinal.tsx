import contatoImg from '../assets/contato.jpg'
import { waLink, WA_MESSAGES } from '../lib/whatsapp'
import { WaButton, Container, TYPE, PortraitFade } from './ui'

export default function CTAFinal() {
  return (
    <section
      id="contato"
      className="relative flex flex-col justify-center overflow-hidden py-24 lg:min-h-[520px] lg:py-28"
      style={{ background: '#14120f' }}
    >
      {/* Desktop/tablet: portrait anchored to the right, fused into the dark */}
      <div
        className="absolute right-0 top-0 hidden h-full overflow-hidden md:block"
        style={{ width: '44%', isolation: 'isolate' }}
        aria-hidden="true"
      >
        <img
          src={contatoImg}
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: 'center 18%' }}
        />
        <PortraitFade preset="ctaDesktop" />
      </div>

      {/* Mobile: portrait as a full-bleed band on top, fusing into the dark */}
      <div
        className="relative isolate mb-9 w-full overflow-hidden md:hidden"
        style={{ height: 'clamp(240px,62vw,360px)' }}
      >
        <img
          src={contatoImg}
          alt="Douglas Pimentel, advogado trabalhista"
          className="h-full w-full object-cover"
          style={{ objectPosition: 'center 15%' }}
        />
        <PortraitFade preset="ctaMobile" />
      </div>

      <Container className="relative z-[2]">
        <div className="flex flex-col" style={{ maxWidth: 'clamp(320px,46vw,560px)', gap: '20px' }}>
          <h2
            className="font-serif font-medium text-cream"
            style={{ fontSize: TYPE.title, lineHeight: 1.1 }}
          >
            Não sabe se tem direito? Pergunte.
          </h2>
          <p className="font-sans text-cream/[0.82]" style={{ fontSize: TYPE.body, lineHeight: 1.6 }}>
            A avaliação do seu caso não custa nada.
          </p>
          <WaButton
            href={waLink(WA_MESSAGES.ctaFinal)}
            icon
            className="mt-1.5 w-fit"
            style={{ fontSize: '14.5px', padding: '15px 22px' }}
          >
            Falar no WhatsApp
          </WaButton>
        </div>
      </Container>
    </section>
  )
}
