import { useEffect, useState } from 'react'

export type ScrollDirection = 'up' | 'down'

interface ScrollState {
  direction: ScrollDirection
  /** true while within ~40px of the very top (navbar stays transparent) */
  atTop: boolean
}

const TOP_THRESHOLD = 40

/**
 * Tracks vertical scroll direction with an rAF-throttled listener.
 * Used by the navbar to hide on scroll-down and reveal on scroll-up.
 */
export function useScrollDirection(threshold = 6): ScrollState {
  const [state, setState] = useState<ScrollState>({ direction: 'up', atTop: true })

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const update = () => {
      const y = Math.max(0, window.scrollY)
      const atTop = y < TOP_THRESHOLD

      if (Math.abs(y - lastY) >= threshold) {
        const direction: ScrollDirection = y > lastY && y > 80 ? 'down' : 'up'
        setState((prev) =>
          prev.direction === direction && prev.atTop === atTop
            ? prev
            : { direction, atTop },
        )
        lastY = y
      } else {
        setState((prev) => (prev.atTop === atTop ? prev : { ...prev, atTop }))
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return state
}
