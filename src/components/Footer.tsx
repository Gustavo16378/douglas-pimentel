import logo from '../assets/logo-white.png'
import { CONTACT, ADDRESS } from '../lib/site'
import { waLink, WA_MESSAGES } from '../lib/whatsapp'
import { Container } from './ui'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: '#0f0d0b', paddingTop: 'clamp(44px,6vw,72px)', paddingBottom: '32px' }}>
      <Container>
        <div className="flex flex-wrap" style={{ gap: '32px 56px' }}>
        <div className="flex-none">
          <img
            src={logo}
            alt="Douglas Pimentel Advogado"
            style={{ width: '168px', height: 'auto', display: 'block' }}
          />
        </div>

        <div
          className="flex flex-col font-sans text-cream/60"
          style={{ flex: '1 1 220px', gap: '6px', fontSize: '13px', lineHeight: 1.65 }}
        >
          {ADDRESS.place} — {ADDRESS.line1}
          <br />
          {ADDRESS.line2}, {ADDRESS.line3}
          <br />
          {ADDRESS.city}, {ADDRESS.cep}
        </div>

        <div
          className="flex flex-col font-sans text-cream/60"
          style={{ flex: '1 1 200px', gap: '6px', fontSize: '13px', lineHeight: 1.7 }}
        >
          <a
            href={waLink(WA_MESSAGES.default)}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gold"
          >
            {CONTACT.phoneDisplay} — WhatsApp
          </a>
          <a
            href={CONTACT.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gold"
          >
            {CONTACT.instagram}
          </a>
          <span>{CONTACT.oab}</span>
        </div>
        </div>

        <div style={{ height: '1px', background: 'rgba(201,168,106,0.2)', marginTop: '28px' }} />
        <div className="font-sans text-cream/[0.38]" style={{ fontSize: '11px', marginTop: '16px' }}>
          © {year} Douglas Pimentel Advocacia. Todos os direitos reservados.
        </div>
      </Container>
    </footer>
  )
}
