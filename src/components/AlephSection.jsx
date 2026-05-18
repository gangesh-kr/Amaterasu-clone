import React from 'react'
import useScrollReveal from '../hooks/useScrollReveal.js'

export default function AlephSection() {
  const headerRef = useScrollReveal({ y: 40 })
  const bodyRef = useScrollReveal({ y: 40, delay: 0.15 })
  const ctaRef = useScrollReveal({ y: 40, delay: 0.3 })

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#EAF5FC] to-[#BFE3F9] text-[#0A1846] pt-20 pb-36 sm:pb-44 md:pb-52 px-6 md:px-16 lg:px-24 xl:px-32 flex flex-col justify-between overflow-hidden z-10 border-t border-black/5">
      
      <div 
        className="absolute inset-0 bg-[#FFFFFF] pointer-events-none z-0" 
        style={{
          clipPath: 'polygon(0 0, 36% 0, 48% 82%, 36% 100%, 0 100%)'
        }}
      />

      <style>{`
        @keyframes alephAmbientFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-6px) rotate(3deg); opacity: 0.9; }
        }
      `}</style>

      {/* 1. Top Header Bar (Matching Reference) */}
      <div className="relative w-full z-10 flex justify-between items-center select-none pt-4">
        {/* Ambient Dot & Ring (Top Left) */}
        <div className="flex items-center gap-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0A1846] shadow-[0_0_6px_rgba(10,24,70,0.15)]" />
          <div 
            className="w-7 h-7 rounded-full border border-[#0A1846]/10" 
            style={{ animation: 'alephAmbientFloat 6s ease-in-out infinite' }}
          />
        </div>

        {/* Right Side Info (Top Right) */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <div className="w-20 h-[1.5px] bg-[#0A1846]/20 mb-2" />
            <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-[#0A1846]/70">
              VISION
            </span>
          </div>
          {/* 3x3 Grid of Dots */}
          <div className="grid grid-cols-3 gap-[3px]">
            {[...Array(9)].map((_, i) => (
              <span key={i} className="w-[3px] h-[3px] rounded-full bg-[#0A1846]/50" />
            ))}
          </div>
        </div>
      </div>

      {/* 2. Main Large Heading (Centered, Matching Reference) */}
      <div className="relative z-10 w-full my-auto flex flex-col items-center py-12 ">
        <h2 
          ref={headerRef}
          className="text-[44px] sm:text-[54px] md:text-[72px] font-light text-[#0A1846] tracking-[-0.03em] leading-[1.05] text-center select-none max-w-5xl antialiased"
        >
          The future <br />
          of cognitive <br />
          treatment
        </h2>
      </div>

      {/* 3. Description Block (Asymmetric, Placed on Center-Right, Matching Reference) */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="hidden lg:block lg:col-span-6" />
        
        <div className="col-span-12 lg:col-span-6 flex flex-col items-start max-w-lg lg:pl-8">
          {/* MEET ALEPH label */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4CC] shadow-[0_0_6px_#00D4CC]" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#4C5E9C]">
              MEET ALEPH
            </span>
          </div>

          {/* Paragraph */}
          <p 
            ref={bodyRef}
            className="text-[15px] sm:text-[16px] md:text-[17px] leading-[1.6] font-normal text-[#2E3D7A] mb-8 select-none antialiased"
          >
            Aleph is a quantum algorithm in development which simulates mental health treatment approaches against the complex representation of your mental and cognitive predispositions. Aleph will cut down the average time to optimal treatment plans from months to seconds.
          </p>

          {/* Discover our solution button */}
          <button 
            ref={ctaRef}
            onClick={() => window.location.href = 'https://amaterasu.ai/aleph'}
            className="cta-btn group flex items-center gap-2.5 px-7 py-4 bg-[#2E44A9] hover:bg-[#354cc2] border border-transparent rounded-full text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:scale-105 active:scale-98 cursor-pointer select-none shadow-[0_4px_15px_rgba(46,68,169,0.15)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4CC] shadow-[0_0_6px_#00D4CC]" />
            DISCOVER OUR SOLUTION
          </button>
        </div>
      </div>
    </section>
  )
}
