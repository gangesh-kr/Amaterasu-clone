import { useEffect, useRef } from 'react'

/**
 * Returns a ref containing a normalised scroll progress value (0 → 1).
 * The progress is 0 at the top of the page and 1 after scrolling `scrollDistance` pixels.
 * Uses a ref (not state) to avoid re-renders on every scroll frame.
 *
 * @param {number} scrollDistance - Total scroll distance in pixels for progress 0→1
 */
export default function useScrollProgress(scrollDistance) {
  const progressRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset
      const raw = scrollY / scrollDistance
      progressRef.current = Math.min(1, Math.max(0, raw))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Set initial value

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrollDistance])

  return progressRef
}
