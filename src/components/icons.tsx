import type { CSSProperties } from 'react'

interface IconProps {
  size?: number
  className?: string
  style?: CSSProperties
}

/** WhatsApp glyph — same simplified mark used across the original design. */
export function WhatsAppIcon({ size = 19, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M12 4C7 4 3 7.4 3 11.6c0 2.1 1 4 2.6 5.4L5 21l4.1-1.4c.9.3 1.9.4 2.9.4 5 0 9-3.4 9-7.6S17 4 12 4z" />
    </svg>
  )
}

export function MenuIcon({ size = 20, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M4 7H20M4 12H20M4 17H20" />
    </svg>
  )
}

export function CloseIcon({ size = 20, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M5 5L19 19M19 5L5 19" />
    </svg>
  )
}

export function PinIcon({ size = 22, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

export function ClockIcon({ size = 22, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  )
}

/** The six "Atuação" line icons (viewBox 0 0 26 26). Keyed for the data map. */
export const ATUACAO_ICONS: Record<string, JSX.Element> = {
  demissao: (
    <>
      <rect x="6" y="4" width="11" height="18" rx="0.5" />
      <circle cx="14" cy="13" r="0.8" fill="currentColor" stroke="none" />
      <path d="M17 13H22M20 11L22.2 13L20 15" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  horas: (
    <>
      <circle cx="13" cy="13" r="9" />
      <path d="M13 7.5V13L17 15.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  registro: (
    <>
      <rect x="7" y="3.5" width="12" height="19" rx="0.5" />
      <path d="M10 9H16M10 13H16M10 17H14" strokeLinecap="round" />
    </>
  ),
  acidente: (
    <>
      <path d="M13 4L23 21H3L13 4Z" strokeLinejoin="round" />
      <path d="M13 10.5V15" strokeLinecap="round" />
      <circle cx="13" cy="18" r="0.75" fill="currentColor" stroke="none" />
    </>
  ),
  verbas: (
    <>
      <circle cx="10.5" cy="13" r="7" />
      <circle cx="16.5" cy="13" r="7" opacity="0.55" />
    </>
  ),
  assedio: (
    <>
      <circle cx="13" cy="13" r="9" />
      <path d="M9 13.2L12 16.2L17.5 9.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
}

export function AtuacaoIcon({ name }: { name: keyof typeof ATUACAO_ICONS | string }) {
  return (
    <svg
      viewBox="0 0 26 26"
      width="100%"
      height="100%"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      aria-hidden="true"
    >
      {ATUACAO_ICONS[name]}
    </svg>
  )
}
