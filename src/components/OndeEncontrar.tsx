import { ADDRESS, HOURS, MAPS_EMBED, MAPS_DIRECTIONS } from '../lib/site'
import { Eyebrow, Section, TYPE } from './ui'
import { PinIcon, ClockIcon } from './icons'

export default function OndeEncontrar() {
  return (
    <Section
      id="onde-encontrar"
      bg="ink"
      containerClassName="flex flex-col lg:flex-row lg:items-stretch"
      containerStyle={{ gap: 'clamp(32px,4vw,56px)' }}
    >
        {/* Left — address / hours / directions */}
        <div className="flex flex-col lg:flex-[0_0_42%]" style={{ gap: '20px' }}>
        <Eyebrow tone="gold">ENDEREÇO</Eyebrow>
        <h2
          className="font-serif font-medium text-cream"
          style={{ fontSize: TYPE.title, lineHeight: 1.08 }}
        >
          No coração de Palmas.
        </h2>

        {/* Address in typographic hierarchy */}
        <div className="flex items-start" style={{ gap: '12px' }}>
          <span className="flex-none text-gold" style={{ paddingTop: '2px' }}>
            <PinIcon />
          </span>
          <address className="not-italic">
            <div className="font-sans font-bold text-cream" style={{ fontSize: TYPE.cardTitle, marginBottom: '8px' }}>
              {ADDRESS.place}
            </div>
            <div className="font-sans text-cream/[0.72]" style={{ fontSize: TYPE.cardBody, lineHeight: 1.7 }}>
              {ADDRESS.line1}
              <br />
              {ADDRESS.line2}
              <br />
              {ADDRESS.line3}
            </div>
            <div
              className="font-sans font-semibold text-cream/[0.85]"
              style={{ fontSize: TYPE.cardBody, marginTop: '10px' }}
            >
              {ADDRESS.city} · {ADDRESS.cep}
            </div>
          </address>
        </div>

        {/* Hours (placeholder) */}
        <div className="flex items-start" style={{ gap: '12px' }}>
          <span className="flex-none text-gold" style={{ paddingTop: '2px' }}>
            <ClockIcon />
          </span>
          <div>
            <div className="font-sans font-semibold text-cream/[0.85]" style={{ fontSize: TYPE.cardBody }}>
              {HOURS.weekdays}
            </div>
            <div className="font-sans text-cream/50" style={{ fontSize: '12.5px', marginTop: '4px' }}>
              {HOURS.note}
            </div>
          </div>
        </div>

        <a
          href={MAPS_DIRECTIONS}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex w-fit items-center gap-2 rounded-[5px] border border-gold/50 font-sans font-bold text-gold transition-colors hover:bg-gold hover:text-ink"
          style={{ fontSize: '13.5px', padding: '12px 20px' }}
        >
          Como chegar →
        </a>
      </div>

      {/* Right — dark-styled Google Maps embed inside an editorial frame */}
      <div
        className="h-[300px] w-full overflow-hidden lg:h-auto lg:min-h-[420px] lg:flex-1"
        style={{
          border: '1px solid rgba(201,168,106,0.30)',
          borderRadius: '12px',
          boxShadow: '0 18px 40px rgba(0,0,0,0.35)',
        }}
      >
        <iframe
          title="Mapa — Escritório Douglas Pimentel, Palmas-TO"
          src={MAPS_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
          style={{
            filter: 'invert(90%) hue-rotate(180deg) contrast(0.9) brightness(0.9)',
          }}
        />
        </div>
    </Section>
  )
}
