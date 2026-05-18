import React from 'react'
import useScrollReveal from '../hooks/useScrollReveal.js'
import Scene3D from './Scene3D.jsx'

export default function VisionSection() {
  const headerRef = useScrollReveal({ y: 50, duration: 1.5 })
  const bodyRef = useScrollReveal({ y: 40, delay: 0.2, duration: 1.2 })
  const natureHeaderRef = useScrollReveal({ y: 50, duration: 1.5, start: 'top 80%' })
  const natureBodyRef = useScrollReveal({ y: 40, delay: 0.2, duration: 1.2, start: 'top 80%' })

  return (
    <section className="relative w-full bg-[#00040A] text-white py-32 px-6 md:px-16 lg:px-32 flex flex-col items-center overflow-hidden">
      
      {/* 3D WebGL Particle Background */}
      <Scene3D />

      {/* Decorative ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00D4CC] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full mb-48 text-center">
        <h2 
          ref={headerRef}
          className="text-[11px] uppercase tracking-[0.3em] text-[#00D4CC] mb-8 font-light"
        >
          Vision
        </h2>
        <p 
          ref={bodyRef}
          className="text-3xl md:text-5xl lg:text-[56px] leading-[1.2] font-light tracking-[-0.02em] text-white/90"
        >
          We empower humanity with the tools, knowledge, and wisdom to face mental health challenges from a position of unprecedented resilience.
        </p>
        <p className="mt-12 text-lg md:text-xl font-light text-white/60 max-w-2xl mx-auto">
          Our minds are a deep reflection of nature, yet our internal world has driven too far from natural order.
        </p>
      </div>

      <div className="max-w-4xl mx-auto w-full text-center relative z-10">
        <h3 
          ref={natureHeaderRef}
          className="text-4xl md:text-6xl font-light tracking-[-0.02em] mb-8"
        >
          Reconnecting with nature
        </h3>
        <p 
          ref={natureBodyRef}
          className="text-xl md:text-2xl font-light text-white/70 leading-[1.6]"
        >
          It is now our duty to restore balance and harmony. Modern mental health care operates in a linear way, isolating insights over long periods of time, with little consideration or ability to map a full view of the mind.
        </p>
      </div>
    </section>
  )
}
