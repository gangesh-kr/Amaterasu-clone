import React, { useRef, useEffect } from 'react'
import useScrollReveal from '../hooks/useScrollReveal.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AlephSection() {
  const headerRef = useScrollReveal({ y: 40 })
  const paragraphRef = useRef(null)
  const ctaRef = useScrollReveal({ y: 40, delay: 0.3 })

  useEffect(() => {
    const el = paragraphRef.current
    if (!el) return

    let ctx

    const splitAndAnimate = () => {
      // 1. Revert previous GSAP animations to avoid conflicts
      if (ctx) ctx.revert()

      // 2. Retrieve clean text from data-attribute or initial load
      const originalText = el.getAttribute('data-original-text') || el.innerText
      if (!el.getAttribute('data-original-text')) {
        el.setAttribute('data-original-text', originalText)
      }

      // 3. Clear container and temporarily wrap every single word in an inline-block span to measure its y-coordinate
      const words = originalText.split(' ')
      el.innerHTML = words.map(w => `<span style="display: inline-block;">${w}</span>`).join(' ')

      // 4. Group word spans by their vertical offsetTop
      const spans = el.querySelectorAll('span')
      const linesMap = {}
      spans.forEach(span => {
        const top = span.offsetTop
        if (!linesMap[top]) {
          linesMap[top] = []
        }
        linesMap[top].push(span)
      })

      // 5. Build final HTML where each line's words are grouped inside a line container (with overflow: hidden)
      const lineKeys = Object.keys(linesMap).sort((a, b) => Number(a) - Number(b))
      let newHtml = ''
      
      lineKeys.forEach(key => {
        const lineWords = linesMap[key].map(span => span.outerHTML).join(' ')
        newHtml += `
          <div class="split-line-outer" style="overflow: hidden; display: block; margin-bottom: 2px;">
            <div class="split-line-inner" style="display: block; transform: translate3d(0, 100%, 0); opacity: 0; will-change: transform, opacity;">
              ${lineWords}
            </div>
          </div>
        `
      })

      el.innerHTML = newHtml

      // 6. Set up the GSAP ScrollTrigger timeline inside a clean context
      ctx = gsap.context(() => {
        const lineInners = el.querySelectorAll('.split-line-inner')
        gsap.to(lineInners, {
          y: '0%',
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        })
      }, el)
    }

    // Run splitting initial setup
    splitAndAnimate()

    // Add window resize handler to rebuild line wrapping dynamically & responsively
    const handleResize = () => {
      splitAndAnimate()
    }
    window.addEventListener('resize', handleResize)

    // Cleanup resize listener and revert anims
    return () => {
      window.removeEventListener('resize', handleResize)
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#EAF5FC] to-[#BFE3F9] text-[#0A1846] pt-20 pb-20 px-6 md:px-16 lg:px-24 xl:px-32 flex flex-col justify-center items-center gap-12 lg:gap-16 overflow-hidden z-10 border-t border-black/5">
      
      <div 
        className="absolute inset-0 bg-[#FFFFFF] pointer-events-none z-0" 
        style={{
          clipPath: 'polygon(0 0, 36% 0, 48% 82%, 36% 100%, 0 100%)'
        }}
      />


      <div className="relative z-10 w-full flex flex-col items-center py-4">
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
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 items-start">
        <div className="hidden lg:block lg:col-span-6" />
        
        <div className="col-span-12 lg:col-span-6 flex flex-col items-start max-w-lg lg:pl-8">
          {/* MEET ALEPH label */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4CC] shadow-[0_0_6px_#00D4CC]" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#4C5E9C]">
              MEET ALEPH
            </span>
          </div>

          {/* Paragraph with custom responsive GSAP Line Split animation */}
          <p 
            ref={paragraphRef}
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
