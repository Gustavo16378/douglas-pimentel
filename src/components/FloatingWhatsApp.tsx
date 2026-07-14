import { useState } from 'react'
import { waLink, WA_MESSAGES } from '../lib/whatsapp'
import { WhatsAppIcon } from './icons'

export default function FloatingWhatsApp() {
  const [hover, setHover] = useState(false)
  return (
    <a
      href={waLink(WA_MESSAGES.floating)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex items-center justify-center transition-colors"
      style={{
        position: 'fixed',
        bottom: 'max(20px, env(safe-area-inset-bottom))',
        right: '20px',
        zIndex: 40,
        width: '54px',
        height: '54px',
        borderRadius: '50%',
        background: hover ? '#241f1a' : '#1a1816',
        border: '1px solid rgba(201,168,106,0.55)',
        color: '#f5f1ea',
        boxShadow: '0 10px 26px rgba(0,0,0,0.4)',
      }}
    >
      <WhatsAppIcon size={22} style={{ strokeWidth: 1.6 }} />
    </a>
  )
}
