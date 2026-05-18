import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * HeroHeadline — Large display headline + CTA button.
 * Positioned left-of-centre, vertically centred.
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
      className="absolute top-1/2 right-[5%] md:right-[10%] lg:right-auto lg:left-[35%] -translate-y-1/2 flex flex-col items-end lg:items-center z-10 w-max"
      style={{
        ...style,
      }}
    >
      <h1
        className="font-light text-white m-0 text-right text-[clamp(32px,7vw,76px)] leading-[1.05] tracking-[-0.02em] drop-shadow-lg"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <span className="block">Empower</span>
        <span className="block">your mental</span>
        <span className="block">health journey</span>
      </h1>

      <button
        className="cta-btn"
        style={{
          marginLeft: '20%',
        }}
        id="cta-start-journey"
      >
        <div className="inline-block w-[5px] h-[5px] rounded-full bg-white mr-10" />
        START YOUR JOURNEY
      </button>
    </div>
  )
}
