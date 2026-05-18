import React from 'react'
import useScrollReveal from '../hooks/useScrollReveal.js'

export default function AlephSection() {
  const headerRef = useScrollReveal({ y: 40 })
  const bodyRef = useScrollReveal({ y: 40, delay: 0.15 })
  const ctaRef = useScrollReveal({ y: 40, delay: 0.3 })

  return (
    <section className="relative w-full bg-[#00040A] text-white py-40 px-6 md:px-16 lg:px-32 flex flex-col items-center justify-center overflow-hidden border-t border-white/5">
      
      {/* Intense Glowing Core for CTA */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4B3FC3] opacity-[0.06] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#00D4CC] opacity-[0.04] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full text-center relative z-10">
        <h2 
          ref={headerRef}
          className="text-4xl md:text-5xl lg:text-[64px] leading-[1.1] font-light tracking-[-0.02em] mb-12"
        >
          Aleph is a quantum algorithm in development which simulates mental health treatment approaches against the complex representation of your mental and cognitive predispositions.
        </h2>
        
        <p 
          ref={bodyRef}
          className="text-xl md:text-2xl font-light text-[#00D4CC] mb-16"
        >
          Aleph will cut down the average time to optimal treatment plans from months to seconds.
        </p>

        <div 
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a href="https://amaterasu.ai/aleph" className="cta-btn !px-8 !py-4 !text-xs w-full sm:w-auto justify-center">
            <span style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 8px #fff' }} />
            Discover our solution
          </a>
          
          <a 
            href="mailto:invest@amaterasu.ai" 
            className="flex items-center gap-3 text-xs tracking-[0.15em] uppercase px-8 py-4 border border-white/20 rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            Invest with us
          </a>
        </div>
      </div>
    </section>
  )
}
