import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import useScrollProgress from '../hooks/useScrollProgress.js'
import useMouseParallax from '../hooks/useMouseParallax.js'
import HeroCanvas from './HeroCanvas.jsx'
import HeroNav from './HeroNav.jsx'
import HeroHeadline from './HeroHeadline.jsx'
import HeroCopy from './HeroCopy.jsx'
import HeroAmbient from './HeroAmbient.jsx'

/**
 * Linear interpolation clamped to 0–1
 */
function clamp01(v) {
  return Math.min(1, Math.max(0, v))
}

/**
 * Map a value from [inMin, inMax] to [outMin, outMax], clamped
 */
function mapRange(value, inMin, inMax, outMin, outMax) {
  const t = clamp01((value - inMin) / (inMax - inMin))
  return outMin + t * (outMax - outMin)
}

/**
 * HeroSection — Top-level hero wrapper.
 * Contains the sticky hero with canvas spotlight, navigation,
 * headline, copy, and ambient elements. Uses a 300vh scroll container
 * to give the sticky hero room for scroll-driven animations.
 */
export default function HeroSection() {
  // The scroll distance for 0→1 progress: 1× viewport height so it dims nicely as VisionSection slides over
  const scrollDistance = typeof window !== 'undefined' ? window.innerHeight : 1000
  const scrollProgressRef = useScrollProgress(scrollDistance)
  const mouseRef = useMouseParallax(0.08)

  // Refs for DOM elements that animate with scroll (no re-renders)
  const headlineRef = useRef(null)
  const copyRef = useRef(null)
  const navRef = useRef(null)
  const ambientRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    // Initial GSAP reveal
    gsap.fromTo(headlineRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.2 }
    )

    const animate = () => {
      const p = scrollProgressRef.current

      // Headline: move up and fade out on scroll
      if (headlineRef.current) {
        const headlineY = mapRange(p, 0, 0.8, 0, -150)
        const headlineOpacity = mapRange(p, 0, 0.6, 1, 0)
        headlineRef.current.style.opacity = headlineOpacity
        headlineRef.current.style.transform = `translate3d(0px, ${headlineY}px, 0)`
      }

      // Copy text: stays visible initially, fades out later if needed
      if (copyRef.current) {
        const copyOpacity = mapRange(p, 0.2, 0.8, 1, 0)
        copyRef.current.style.opacity = copyOpacity
        copyRef.current.style.transform = `translate3d(0px, 0px, 0)`
      }

      // Nav: stays visible, slightly reduces opacity at high scroll
      if (navRef.current) {
        const navOpacity = mapRange(p, 0.5, 1.0, 1, 0.4)
        navRef.current.style.opacity = navOpacity
      }

      // Ambient: fade out gently
      if (ambientRef.current) {
        const ambientOpacity = mapRange(p, 0.1, 0.6, 1, 0)
        ambientRef.current.style.opacity = ambientOpacity
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [scrollProgressRef])

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        zIndex: 0, // Keep it behind the other sections
      }}
    >
      {/* z-index 0: Canvas */}
      <HeroCanvas scrollProgressRef={scrollProgressRef} mouseRef={mouseRef} />

      {/* z-index 10: Nav */}
      <div ref={navRef} style={{ willChange: 'opacity' }}>
        <HeroNav />
      </div>

      {/* z-index 10: Headline */}
      <div ref={headlineRef} style={{ 
        position: 'absolute', 
        inset: 0, 
        pointerEvents: 'none',
        willChange: 'transform, opacity' 
      }}>
        <HeroHeadline style={{ pointerEvents: 'auto' }} />
      </div>

      {/* z-index 10: Copy text — visible by default */}
      <div ref={copyRef} style={{ willChange: 'opacity' }}>
        <HeroCopy />
      </div>

      {/* z-index 10: Ambient */}
      <div ref={ambientRef} style={{ willChange: 'opacity' }}>
        <HeroAmbient />
      </div>
    </div>
  )
}
