import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * HeroHeadline — Large display headline + CTA button.
 * Positioned centre-left, vertically centred.
 */
export default function HeroHeadline({ style }) {
  const containerRef = useRef(null)

  useEffect(() => {
    // Set absolute centering via GSAP to avoid transform overwrites
    gsap.set(containerRef.current, { xPercent: -50, yPercent: -50 })

    // Premium initial load animation: slow fade up
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 2, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 w-max"
      style={{
        marginLeft: '-10%',
        ...style,
      }}
    >
      <h1
        className="font-light text-white m-0 text-center text-[clamp(32px,7vw,76px)] leading-[1.05] tracking-[-0.02em] drop-shadow-lg"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <span className="block">Empower</span>
        <span className="block">your mental</span>
        <span className="block">health journey</span>
      </h1>

      <button
        className="cta-btn"
        id="cta-start-journey"
      >
        <div className="inline-block w-[5px] h-[5px] rounded-full bg-white mr-2" />
        START YOUR JOURNEY
      </button>
    </div>
  )
}
