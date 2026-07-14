import { useEffect } from 'react'

/**
 * Locks body scroll while `locked` is true — iOS-safe.
 *
 * Uses `position: fixed` + `top: -scrollY` (NEVER `overflow: hidden`, which
 * iOS Safari ignores) and restores the exact scroll position on unlock.
 */
export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return

    const scrollY = window.scrollY
    const body = document.body
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    }

    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'

    return () => {
      body.style.position = prev.position
      body.style.top = prev.top
      body.style.left = prev.left
      body.style.right = prev.right
      body.style.width = prev.width

      // Restore the scroll position INSTANTLY. The page sets
      // `html { scroll-behavior: smooth }`, which would otherwise animate this
      // jump from the top (0) back to `scrollY` — the user sees the page fly up
      // to the hero and glide back down. Force instant for this one call.
      const root = document.documentElement
      const prevBehavior = root.style.scrollBehavior
      root.style.scrollBehavior = 'auto'
      window.scrollTo(0, scrollY)
      root.style.scrollBehavior = prevBehavior
    }
  }, [locked])
}
