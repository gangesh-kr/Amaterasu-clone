import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useScrollReveal from '../hooks/useScrollReveal.js'

gsap.registerPlugin(ScrollTrigger)

const QUOTES = [
  {
    name: 'Sarah',
    text: '“I’ve been on a waitlist for months, and every day feels like a battle. The system is so slow to respond, and there’s no help for people in immediate crisis.”',
    subtext: 'Sarah’s experience emphasises the urgency of addressing delays in mental health support.'
  },
  {
    name: 'John',
    text: '“Every therapist I see has a different idea of what’s wrong with me, but none seem to get it right. It’s exhausting to be reassessed constantly without real progress.”',
    subtext: 'John’s frustration underscores the challenges of inconsistent diagnoses.'
  },
  {
    name: 'Emily',
    text: '“I’ve had to switch therapists multiple times, and every time I do, it feels like starting from square one.”',
    subtext: 'Emily’s experiences highlight the instability and lack of continuity in mental health care.'
  },
  {
    name: 'Alex',
    text: '“It’s hard to find a therapist who understands my cultural background. I often feel like they don’t get the unique pressures I face, which makes it harder to open up.”',
    subtext: 'Alex’s struggle reflects the need for culturally competent care.'
  },
  {
    name: 'Kevin',
    text: '“There’s so much stigma around mental health that even when I reach out for help, I feel ashamed. The system doesn’t support openness, which makes it harder.”',
    subtext: 'Kevin’s experience highlights the emotional toll of stigma in seeking mental health support.'
  },
  {
    name: 'Olivia',
    text: '“The mental health system feels like it’s constantly playing catch-up. By the time you get the help you need, it’s already too late for so many people.”',
    subtext: 'Olivia’s frustration speaks to the slow response in providing timely care.'
  }
]

export default function PerspectivesSection() {
  const containerRef = useRef(null)
  const headerRef = useScrollReveal({ y: 30 })
  const subHeaderRef = useScrollReveal({ y: 30, delay: 0.1 })

  // Horizontal scroll effect using GSAP pinning
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const scrollWidth = el.scrollWidth - window.innerWidth
    
    // We only want to apply horizontal scrolling if we are on a desktop
    const mm = gsap.matchMedia()
    
    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        gsap.to(el, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            pin: true,
            scrub: 1,
            end: () => `+=${scrollWidth}`
          }
        })
      })
      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <section className="relative w-full bg-[#00040A] text-white py-32 overflow-hidden border-t border-white/5 lg:h-[100vh] lg:flex lg:flex-col lg:justify-center">
      
      <div className="px-6 md:px-16 lg:px-32 mb-16 lg:mb-24">
        <h2 
          ref={headerRef}
          className="text-[11px] uppercase tracking-[0.3em] text-[#00D4CC] mb-6 font-light"
        >
          Personal Perspectives
        </h2>
        <p 
          ref={subHeaderRef}
          className="text-xl md:text-2xl font-light text-white/60 max-w-2xl leading-[1.6]"
        >
          Collective voices of human beings sharing their experiences with the current mental health care system. This is why we do what we do.
        </p>
      </div>

      {/* Horizontal Scroll Container (Desktop) / Normal Column (Mobile) */}
      <div className="w-full">
        <div 
          ref={containerRef}
          className="flex flex-col lg:flex-row gap-8 lg:gap-16 px-6 md:px-16 lg:px-32 lg:w-max"
        >
          {QUOTES.map((quote, index) => (
            <div 
              key={index}
              className="lg:w-[500px] flex-shrink-0 flex flex-col justify-between"
            >
              <p className="text-2xl md:text-[32px] leading-[1.4] font-light tracking-[-0.01em] text-white/90 mb-8">
                {quote.text}
              </p>
              <div>
                <div className="w-8 h-[1px] bg-white/20 mb-6" />
                <p className="text-sm text-white/40 font-light leading-[1.6]">
                  {quote.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
