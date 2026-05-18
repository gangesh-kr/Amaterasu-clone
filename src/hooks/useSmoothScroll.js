import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
      autoRaf: false, // We will manually sync it with GSAP ticker
    })

    lenisRef.current = lenis

    // Sync Lenis scroll with GSAP's ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Sync Lenis scroll with GSAP ticker for unified animation frames
    const update = (time) => {
      lenis.raf(time * 1000)
    }
    
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', ScrollTrigger.update)
      gsap.ticker.remove(update)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}
