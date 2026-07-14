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

type MenuLink = { href?: string; label: string; top?: boolean }

// Numbered links for the mobile drawer. "Início" scrolls to top via JS (no hash).
const MENU_LINKS: MenuLink[] = [{ label: 'Início', top: true }, ...NAV_LINKS]

// Right-side drawer width — leaves a strip of the blurred page visible on the left.
const DRAWER_WIDTH = 'min(80vw, 350px)'

function Monogram({ className = 'h-[30px] w-[30px]' }: { className?: string }) {
  return <img src={monogram} alt="" className={`flex-none rounded-full ${className}`} />
}

export default function Navbar() {
  const { direction, atTop } = useScrollDirection(8)
  const [menuOpen, setMenuOpen] = useState(false)

  // iOS-safe scroll lock (position: fixed + top: -scrollY) while the drawer is open.
  useBodyScrollLock(menuOpen)

  // Close on Escape.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const hidden = direction === 'down' && !atTop && !menuOpen

  /**
   * Close the drawer, then navigate. The scroll lock restores the original
   * scroll position on unlock, so we scroll to the target on the NEXT frame —
   * after the unlock has run — otherwise the jump would be overwritten.
   */
  const navigate = (link: MenuLink) => {
    setMenuOpen(false)
    requestAnimationFrame(() => {
      if (link.top) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (link.href) {
        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
        history.replaceState(null, '', link.href)
      }
    })
  }

  const linkNumber = (i: number) => String(i + 1).padStart(2, '0')

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-40 border-b transition-[transform,background-color,backdrop-filter,border-color] duration-300 ease-out"
        style={{
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          backgroundColor: atTop ? 'transparent' : 'rgba(20,18,15,0.82)',
          backdropFilter: atTop ? 'none' : 'blur(14px)',
          WebkitBackdropFilter: atTop ? 'none' : 'blur(14px)',
          borderBottomColor: atTop ? 'transparent' : 'rgba(201,168,106,0.22)',
        }}
      >
        <Container className="flex items-center justify-between py-4 lg:py-5">
          <button
            type="button"
            onClick={() => navigate({ label: 'Início', top: true })}
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

          {/* Mobile trigger (< lg) */}
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

      {/*
        Mobile drawer — ALWAYS rendered (so open AND close animate) and portalled
        to <body>, outside the <nav>/section stacking contexts (sections use CSS
        transforms). Inline styles only, to dodge global class specificity.
        Overlay z 9998 · panel z 9999.
      */}
      {createPortal(
        <>
          {/* Blurred, semi-transparent overlay over the page — click to close. */}
          <div
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9998,
              background: 'rgba(10,9,7,0.5)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              opacity: menuOpen ? 1 : 0,
              pointerEvents: menuOpen ? 'auto' : 'none',
              transition: 'opacity 320ms ease',
            }}
          />

          {/* Solid dark panel sliding in from the right. */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
              width: DRAWER_WIDTH,
              background: '#14120f',
              borderLeft: '1px solid rgba(201,168,106,0.18)',
              boxShadow: '-24px 0 60px rgba(0,0,0,0.5)',
              padding: 'clamp(22px,6vw,30px)',
              paddingBottom: 'max(clamp(22px,6vw,30px), env(safe-area-inset-bottom))',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 380ms cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {/* Brand + close */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '38px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                <Monogram className="h-8 w-8" />
                <span className="font-sans font-semibold text-cream" style={{ fontSize: '13.5px' }}>
                  Douglas Pimentel
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                style={{ background: 'none', border: 'none', color: '#f5f1ea', padding: '6px', margin: '-6px', cursor: 'pointer', display: 'flex' }}
                aria-label="Fechar menu"
              >
                <CloseIcon size={24} />
              </button>
            </div>

            {/* Numbered serif links (staggered entrance while the panel slides in) */}
            <nav style={{ display: 'flex', flexDirection: 'column' }}>
              {MENU_LINKS.map((link, i) => {
                const itemStyle = {
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '14px',
                  padding: '15px 0',
                  width: '100%',
                  textAlign: 'left' as const,
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid rgba(201,168,106,0.10)',
                  cursor: 'pointer',
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'opacity 400ms ease, transform 400ms cubic-bezier(0.22,1,0.36,1)',
                  transitionDelay: menuOpen ? `${90 + i * 45}ms` : '0ms',
                }
                const inner = (
                  <>
                    <span className="font-sans font-semibold text-gold" style={{ fontSize: '12.5px', letterSpacing: '0.04em' }}>
                      {linkNumber(i)}
                    </span>
                    <span className="font-serif font-medium text-cream" style={{ fontSize: 'clamp(26px,7vw,30px)', lineHeight: 1.05 }}>
                      {link.label}
                    </span>
                  </>
                )
                return link.top ? (
                  <button key={link.label} type="button" onClick={() => navigate(link)} style={itemStyle}>
                    {inner}
                  </button>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      navigate(link)
                    }}
                    style={itemStyle}
                  >
                    {inner}
                  </a>
                )
              })}
            </nav>

            {/* WhatsApp CTA + contact line */}
            <div
              style={{
                marginTop: 'auto',
                paddingTop: '30px',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 400ms ease, transform 400ms cubic-bezier(0.22,1,0.36,1)',
                transitionDelay: menuOpen ? `${90 + MENU_LINKS.length * 45}ms` : '0ms',
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
                  padding: '15px',
                  borderRadius: '5px',
                }}
              >
                Falar no WhatsApp
              </a>
              <div className="font-sans text-cream/60" style={{ marginTop: '14px', textAlign: 'center', fontSize: '12.5px' }}>
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
