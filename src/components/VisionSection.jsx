import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function VisionSection() {
  const textRef = useRef(null)

  useEffect(() => {
    // GSAP Blur Text Reveal
    const textCtx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 60,
          filter: 'blur(20px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, textRef)

    return () => {
      textCtx.revert()
    }
  }, [])

  return (
    <section id="vision-section" className="relative w-full h-[100vh] bg-[#ffffff] pt-[14vh] md:pt-[18vh] pb-0 flex flex-col items-center overflow-hidden z-10" >

      {/* Top Text Content */}
      <div className="max-w-4xl mx-auto w-full text-center mt-4 px-6 md:px-16 relative z-10">

        {/* Label */}
        <div className="flex items-center justify-center gap-3 mb-8" style={{
          marginTop: '12%'
        }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#5AC8D8]" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#1E1B4B] font-bold">
            VISION
          </span>
        </div>

        {/* Blurred Text */}
        <p
          ref={textRef}
          className="text-3xl md:text-5xl lg:text-[46px] leading-[1.3] font-normal tracking-[-0.01em] text-[#1E1B4B]"
          style={{ willChange: 'filter, opacity, transform', marginTop: '12%' }}
        >
          We empower humanity with the tools,
          <br className="hidden md:block" />
          knowledge, and wisdom to face mental
          <br className="hidden md:block" />
          health challenges from a position of
          <br className="hidden md:block" />
          unprecedented resilience.
        </p>
      </div>

    </section>
  )
}
