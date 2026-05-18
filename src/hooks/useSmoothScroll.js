import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'

/**
 * Initialises Lenis smooth scroll and syncs it with GSAP's ticker.
 * Call once at the App root level.
 */
export default function useSmoothScroll() {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis

    // Sync Lenis scroll with GSAP ticker for unified animation frames
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000) // Lenis expects ms, GSAP provides seconds
    })
    gsap.ticker.lagSmoothing(0) // Disable GSAP lag smoothing for consistent frames

    return () => {
      gsap.ticker.remove(lenis.raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}
