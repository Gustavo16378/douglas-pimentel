import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useScrollDirection } from '../hooks/useScrollDirection'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import { waLink, WA_MESSAGES } from '../lib/whatsapp'
import { CONTACT } from '../lib/site'
import { Container } from './ui'
import { MenuIcon, CloseIcon } from './icons'
import monogram from '../assets/monogram-white.png'

const NAV_LINKS = [
  { href: '#atuacao', label: 'Atuação' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#depoimentos', label: 'Depoimentos' },
  { href: '#contato', label: 'Contato' },
]

// Numbered links for the mobile panel. "Início" scrolls to top via JS (no hash).
const MENU_LINKS: { href?: string; label: string; top?: boolean }[] = [
  { label: 'Início', top: true },
  ...NAV_LINKS,
]

function Monogram({ className = 'h-[30px] w-[30px]' }: { className?: string }) {
  return <img src={monogram} alt="" className={`flex-none rounded-full ${className}`} />
}

function goTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function Navbar() {
  const { direction, atTop } = useScrollDirection(8)
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuShown, setMenuShown] = useState(false)

  useBodyScrollLock(menuOpen)

  useEffect(() => {
    if (!menuOpen) {
      setMenuShown(false)
      return
    }
    const id = requestAnimationFrame(() => setMenuShown(true))
    return () => cancelAnimationFrame(id)
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const hidden = direction === 'down' && !atTop && !menuOpen

  const linkNumber = (i: number) => String(i + 1).padStart(2, '0')

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-40 border-b transition-[transform,background-color,backdrop-filter,border-color] duration-300 ease-out"
        style={{
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          backgroundColor: atTop ? 'transparent' : '#14120f',
          borderBottomColor: atTop ? 'transparent' : 'rgba(201,168,106,0.22)',
        }}
      >
        <Container className="flex items-center justify-between py-4 lg:py-5">
          <button
            type="button"
            onClick={goTop}
            className="flex cursor-pointer items-center gap-2.5 border-0 bg-transparent p-0"
            aria-label="Douglas Pimentel — voltar ao topo"
          >
            <Monogram className="h-[30px] w-[30px] lg:h-[34px] lg:w-[34px]" />
            <span className="font-sans font-semibold text-cream" style={{ fontSize: '13px' }}>
              Douglas Pimentel
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap font-sans font-semibold text-cream/80 transition-colors hover:text-gold"
                style={{ fontSize: '14px' }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={waLink(WA_MESSAGES.navbar)}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap rounded-[5px] bg-gold font-sans font-bold text-ink transition-colors hover:bg-gold-light"
              style={{ fontSize: '13.5px', padding: '11px 20px' }}
            >
              Falar no WhatsApp
            </a>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex cursor-pointer p-1.5 text-cream lg:hidden"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
          >
            <MenuIcon size={22} />
          </button>
        </Container>
      </header>

      {/* Mobile menu — portal to <body>, inline styles, z-index 9998 / 9999 */}
      {menuOpen &&
        createPortal(
          <>
            <div
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9998,
                background: 'rgba(10,9,7,0.6)',
                opacity: menuShown ? 1 : 0,
                transition: 'opacity 300ms ease',
              }}
              aria-hidden="true"
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: '#14120f',
                padding: 'clamp(24px,7vw,36px)',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                transform: menuShown ? 'translateX(0)' : 'translateX(24px)',
                opacity: menuShown ? 1 : 0,
                transition: 'transform 360ms cubic-bezier(0.22,1,0.36,1), opacity 260ms ease',
              }}
            >
              {/* Header: monogram + MENU label · close */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '44px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Monogram className="h-8 w-8" />
                  <span
                    className="font-sans font-semibold uppercase text-cream/45"
                    style={{ fontSize: '11px', letterSpacing: '0.28em' }}
                  >
                    Menu
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  style={{ background: 'none', border: 'none', color: '#f5f1ea', padding: '6px', cursor: 'pointer', display: 'flex' }}
                  aria-label="Fechar menu"
                >
                  <CloseIcon size={24} />
                </button>
              </div>

              {/* Numbered serif links with staggered entrance */}
              <nav style={{ display: 'flex', flexDirection: 'column' }}>
                {MENU_LINKS.map((link, i) => {
                  const itemStyle = {
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '16px',
                    padding: '18px 0',
                    borderBottom: '1px solid rgba(201,168,106,0.10)',
                    opacity: menuShown ? 1 : 0,
                    transform: menuShown ? 'translateY(0)' : 'translateY(14px)',
                    transition: 'opacity 420ms ease, transform 420ms cubic-bezier(0.22,1,0.36,1)',
                    transitionDelay: menuShown ? `${120 + i * 55}ms` : '0ms',
                  } as const
                  const inner = (
                    <>
                      <span className="font-sans font-semibold text-gold" style={{ fontSize: '13px', letterSpacing: '0.04em' }}>
                        {linkNumber(i)}
                      </span>
                      <span className="font-serif font-medium text-cream" style={{ fontSize: 'clamp(30px,8.5vw,36px)', lineHeight: 1.05 }}>
                        {link.label}
                      </span>
                    </>
                  )
                  return link.top ? (
                    <button
                      key={link.label}
                      type="button"
                      onClick={() => {
                        goTop()
                        setMenuOpen(false)
                      }}
                      style={{ ...itemStyle, width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}
                    >
                      {inner}
                    </button>
                  ) : (
                    <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} style={itemStyle}>
                      {inner}
                    </a>
                  )
                })}
              </nav>

              {/* Footer: WhatsApp CTA + contact line */}
              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: '32px',
                  opacity: menuShown ? 1 : 0,
                  transform: menuShown ? 'translateY(0)' : 'translateY(14px)',
                  transition: 'opacity 420ms ease, transform 420ms cubic-bezier(0.22,1,0.36,1)',
                  transitionDelay: menuShown ? `${120 + MENU_LINKS.length * 55}ms` : '0ms',
                }}
              >
                <a
                  href={waLink(WA_MESSAGES.navbar)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    background: '#c9a86a',
                    color: '#14120f',
                    fontFamily: "'Public Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: '15px',
                    padding: '16px',
                    borderRadius: '5px',
                  }}
                >
                  Falar no WhatsApp
                </a>
                <div
                  className="font-sans text-cream/60"
                  style={{
                    marginTop: '14px',
                    marginBottom: 'max(4px, env(safe-area-inset-bottom))',
                    textAlign: 'center',
                    fontSize: '12.5px',
                  }}
                >
                  {CONTACT.phoneDisplay} · Palmas, TO
                </div>
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  )
}
