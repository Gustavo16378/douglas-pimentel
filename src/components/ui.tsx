import type { CSSProperties, ReactNode } from 'react'
import { WhatsAppIcon } from './icons'

/** Max content width — editorial column. */
export const CONTENT_MAX = '1320px'

/** Fluid type scale (desktop reads large; never drops to 16px body). */
export const TYPE = {
  hero: 'clamp(3rem, 5.5vw, 5.5rem)', // 48 → 88px
  title: 'clamp(2.5rem, 4vw, 4rem)', // 40 → 64px
  body: 'clamp(1rem, 1.15vw, 1.25rem)', // 16 → 20px
  label: 'clamp(0.75rem, 0.9vw, 0.95rem)', // 12 → 15px
  cardTitle: 'clamp(1.25rem, 1.6vw, 1.5rem)', // 20 → 24px
  cardBody: 'clamp(1rem, 1.1vw, 1.125rem)', // 16 → 18px
} as const

/**
 * Centers content to CONTENT_MAX with responsive horizontal padding, so each
 * section's background can bleed edge-to-edge while its content stays aligned.
 */
export function Container({
  children,
  className = '',
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <div
      className={`mx-auto w-full px-5 sm:px-8 lg:px-12 ${className}`}
      style={{ maxWidth: CONTENT_MAX, ...style }}
    >
      {children}
    </div>
  )
}

/**
 * Fuses a studio portrait into the #14120f palette so no straight rectangle
 * edge is visible — the subject "emerges from the dark". Overlay-only: it paints
 * the palette dark over the AMBIENT at each border and leaves the subject
 * untouched. It NEVER filters, tints, or masks the image itself, so the face,
 * suit and hands keep the photo's original brightness and contrast.
 *
 * How it works: one absolute div stacks a few `linear-gradient`s, each starting
 * opaque #14120f at a border and fading to transparent by a given depth (% of
 * that axis). Only the outer band of each edge is covered; the centre — where
 * the person is — has zero overlay. No radial/elliptical masks (they ring), no
 * mix-blend, no vignette over the subject.
 *
 * Tuning per edge:
 *  - left/right/bottom: depth (%) the fade travels inward from that border.
 *  - top + topHold: the top fully holds #14120f for `topHold`% (killing the
 *    studio grey in the headroom above the hair), then fades to transparent by
 *    `top`% — set so the fade dies BEFORE it reaches the forehead.
 *  - corners: small diagonal washes in the two TOP corners only (where studio
 *    grey meets the dark most sharply); fades out well before the subject.
 *
 * Place INSIDE a `relative overflow-hidden isolate` container, right after the
 * <img>. Transparent end-stops use rgba(20,18,15,0) (transparent #14120f) so the
 * ramp never bleeds toward pure black.
 */
const INK = '#14120f'
const CLEAR = 'rgba(20,18,15,0)' // transparent #14120f — premultiplied, no black bleed

type FadeSpec = {
  left?: number
  right?: number
  top?: number
  topHold?: number
  bottom?: number
  corners?: number
}

function fadeBackground({ left, right, top, topHold = 6, bottom, corners }: FadeSpec) {
  const layers: string[] = []
  // Corners first so the straight edges paint over them at the very border.
  if (corners) {
    layers.push(`linear-gradient(to bottom right, ${INK}, ${CLEAR} ${corners}%)`)
    layers.push(`linear-gradient(to bottom left, ${INK}, ${CLEAR} ${corners}%)`)
  }
  if (left) layers.push(`linear-gradient(to right, ${INK}, ${CLEAR} ${left}%)`)
  if (right) layers.push(`linear-gradient(to left, ${INK}, ${CLEAR} ${right}%)`)
  if (bottom) layers.push(`linear-gradient(to top, ${INK}, ${CLEAR} ${bottom}%)`)
  if (top)
    layers.push(`linear-gradient(to bottom, ${INK}, ${INK} ${topHold}%, ${CLEAR} ${top}%)`)
  return layers.join(',')
}

/**
 * Named presets, one per photo × layout. Depths are calibrated so every fade
 * only ever crosses ambient / hair / dark-suit — never skin or the white shirt.
 * Studio grey sits mostly at the top and outer thirds; the subject is centred.
 */
const FADE_PRESETS = {
  // Hero desktop: portrait fills the right pane, its LEFT edge meets the text
  // column — deeper left so it dissolves into the copy; long dark legs at base.
  heroDesktop: { left: 26, right: 18, top: 17, topHold: 6, bottom: 16, corners: 35 },
  // Hero mobile: full-width band above the text. Base runs DEEP so the portrait
  // melts into the heading below; the face (upper third) stays clear.
  heroMobile: { left: 14, right: 12, top: 16, topHold: 6, bottom: 30, corners: 22 },
  // (Sobre uses no fade — it's a clean framed rectangle, see Sobre.tsx.)
  // CTA final: warm-brown backdrop. Desktop portrait anchored right, left edge
  // meets text; head is cropped near the top so the top fade stays shallow.
  ctaDesktop: { left: 28, right: 12, top: 15, topHold: 5, bottom: 11, corners: 30 },
  // CTA mobile: band on top, text below — deeper base to fuse into the copy.
  ctaMobile: { left: 14, right: 12, top: 14, topHold: 5, bottom: 30, corners: 20 },
} as const satisfies Record<string, FadeSpec>

export function PortraitFade({ preset }: { preset: keyof typeof FADE_PRESETS }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ background: fadeBackground(FADE_PRESETS[preset]) }}
    />
  )
}

interface SectionProps {
  id?: string
  /** 'ink' (#14120f) or 'cream' (#f5f1ea), or a raw CSS color. */
  bg: 'ink' | 'cream' | string
  children: ReactNode
  className?: string
  style?: CSSProperties
  containerClassName?: string
  containerStyle?: CSSProperties
}

/**
 * Full-bleed section: background spans the viewport; content in a centered
 * Container. Moderate vertical rhythm — balance comes from larger content,
 * not from giant empty gaps.
 */
export function Section({
  id,
  bg,
  children,
  className = '',
  style,
  containerClassName = '',
  containerStyle,
}: SectionProps) {
  const background = bg === 'ink' ? '#14120f' : bg === 'cream' ? '#f5f1ea' : bg
  return (
    <section id={id} className={`py-24 lg:py-28 ${className}`} style={{ background, ...style }}>
      <Container className={containerClassName} style={containerStyle}>
        {children}
      </Container>
    </section>
  )
}

interface WaButtonProps {
  href: string
  children: ReactNode
  variant?: 'cream' | 'gold'
  icon?: boolean
  className?: string
  style?: CSSProperties
}

/** The primary WhatsApp call-to-action, in the two brand fills. */
export function WaButton({
  href,
  children,
  variant = 'cream',
  icon = false,
  className = '',
  style,
}: WaButtonProps) {
  const fill =
    variant === 'cream' ? 'bg-cream hover:bg-white' : 'bg-gold hover:bg-gold-light'
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 rounded-[5px] font-sans font-bold text-ink transition-colors ${fill} ${className}`}
      style={style}
    >
      {icon && <WhatsAppIcon />}
      {children}
    </a>
  )
}

interface EyebrowProps {
  children: ReactNode
  /** 'gold' for dark sections, 'goldDark' for cream sections. */
  tone?: 'gold' | 'goldDark'
  className?: string
  style?: CSSProperties
}

/** Uppercase letter-spaced section label. */
export function Eyebrow({ children, tone = 'gold', className = '', style }: EyebrowProps) {
  return (
    <div
      className={`font-sans font-bold uppercase ${tone === 'gold' ? 'text-gold' : 'text-gold-dark'} ${className}`}
      style={{ fontSize: TYPE.label, letterSpacing: '0.16em', ...style }}
    >
      {children}
    </div>
  )
}
