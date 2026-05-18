import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useScrollReveal from '../hooks/useScrollReveal.js'

gsap.registerPlugin(ScrollTrigger)

const QUOTES = [
  {
    name: 'SARAH',
    age: 29,
    occupation: 'MARKETING PROFESSIONAL',
    text: '“I’ve been on a waitlist for months, and every day feels like a battle. The system is so slow to respond, and there’s no help for people in immediate crisis.”',
    subtext: 'Sarah’s experience emphasises the urgency of addressing delays in mental health support.'
  },
  {
    name: 'JOHN',
    age: 35,
    occupation: 'SOFTWARE ENGINEER',
    text: '“Every therapist I see has a different idea of what’s wrong with me, but none seem to get it right. It’s exhausting to be reassessed constantly without real progress.”',
    subtext: 'John’s frustration underscores the challenges of inconsistent diagnoses.'
  },
  {
    name: 'EMILY',
    age: 41,
    occupation: 'EDUCATOR',
    text: '“I’ve had to switch therapists multiple times, and every time I do, it feels like starting from square one.”',
    subtext: 'Emily’s experiences highlight the instability and lack of continuity in mental health care.'
  },
  {
    name: 'ALEX',
    age: 26,
    occupation: 'GRADUATE STUDENT',
    text: '“It’s hard to find a therapist who understands my cultural background. I often feel like they don’t get the unique pressures I face, which makes it harder to open up.”',
    subtext: 'Alex’s struggle reflects the need for culturally competent care.'
  },
  {
    name: 'KEVIN',
    age: 30,
    occupation: 'FINANCE ANALYST',
    text: '“There’s so much stigma around mental health that even when I reach out for help, I feel ashamed. The system doesn’t support openness, which makes it harder.”',
    subtext: 'Kevin’s experience highlights the emotional toll of stigma in seeking mental health support.'
  },
  {
    name: 'OLIVIA',
    age: 24,
    occupation: 'UNIVERSITY STUDENT',
    text: '“The mental health system feels like it’s constantly playing catch-up. By the time you get the help you need, it’s already too late for so many people.”',
    subtext: 'Olivia’s frustration speaks to the slow response in providing timely care.'
  }
]

export default function PerspectivesSection() {
  const triggerRef = useRef(null)
  const introRef = useRef(null)
  const cardRefs = useRef([])

  // Reveal ref for mobile elements
  const mobileHeaderRef = useScrollReveal({ y: 30 })
  const mobileSubHeaderRef = useScrollReveal({ y: 30, delay: 0.1 })

  // Ensure cardRefs array size matches QUOTES
  cardRefs.current = []
  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el)
    }
  }

  useEffect(() => {
    const trigger = triggerRef.current
    if (!trigger) return

    // Position coordinate system offset from viewport center
    const STATES = {
      active: { 
        x: "-12vw", 
        y: "4vh", 
        scale: 1.05, 
        rotate: 0, 
        opacity: 1, 
        zIndex: 10, 
        pointerEvents: "auto" 
      },
      next: { 
        x: "20vw", 
        y: "-8vh", 
        scale: 0.82, 
        rotate: 2, 
        opacity: 0.35, 
        zIndex: 9, 
        pointerEvents: "none" 
      },
      deep: { 
        x: "42vw", 
        y: "-15vh", 
        scale: 0.7, 
        rotate: 5, 
        opacity: 0.15, 
        zIndex: 8, 
        pointerEvents: "none" 
      },
      offscreenRight: { 
        x: "70vw", 
        y: "-22vh", 
        scale: 0.5, 
        rotate: 8, 
        opacity: 0, 
        zIndex: 5, 
        pointerEvents: "none" 
      },
      previous: { 
        x: "-52vw", 
        y: "-8vh", 
        scale: 0.82, 
        rotate: -2, 
        opacity: 0.12, 
        zIndex: 7, 
        pointerEvents: "none" 
      },
      deepPrevious: { 
        x: "-78vw", 
        y: "-15vh", 
        scale: 0.7, 
        rotate: -5, 
        opacity: 0, 
        zIndex: 5, 
        pointerEvents: "none" 
      }
    }

    const cardStatesAtStep = [
      [ STATES.next, STATES.deep, STATES.offscreenRight, STATES.offscreenRight, STATES.offscreenRight, STATES.offscreenRight ],
      [ STATES.active, STATES.next, STATES.deep, STATES.offscreenRight, STATES.offscreenRight, STATES.offscreenRight ],
      [ STATES.previous, STATES.active, STATES.next, STATES.deep, STATES.offscreenRight, STATES.offscreenRight ],
      [ STATES.deepPrevious, STATES.previous, STATES.active, STATES.next, STATES.deep, STATES.offscreenRight ],
      [ STATES.deepPrevious, STATES.deepPrevious, STATES.previous, STATES.active, STATES.next, STATES.deep ],
      [ STATES.deepPrevious, STATES.deepPrevious, STATES.deepPrevious, STATES.previous, STATES.active, STATES.next ],
      [ STATES.deepPrevious, STATES.deepPrevious, STATES.deepPrevious, STATES.deepPrevious, STATES.previous, STATES.active ],
      [ STATES.deepPrevious, STATES.deepPrevious, STATES.deepPrevious, STATES.deepPrevious, STATES.deepPrevious, STATES.previous ],
    ]

    const mm = gsap.matchMedia()

    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        // Initialize cards to Step 0 values instantly
        cardRefs.current.forEach((cardEl, cardIdx) => {
          if (!cardEl) return
          const initialState = cardStatesAtStep[0][cardIdx]
          gsap.set(cardEl, {
            x: initialState.x,
            y: initialState.y,
            scale: initialState.scale,
            rotate: initialState.rotate,
            opacity: initialState.opacity,
            zIndex: initialState.zIndex,
            pointerEvents: initialState.pointerEvents
          })
        })

        // Build ScrollTrigger Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: trigger,
            start: "top top",
            end: "+=500%",
            scrub: 1.2,
            pin: true,
            invalidateOnRefresh: true,
          }
        })

        // Step 1: Intro translates up and fades out
        tl.to(introRef.current, {
          y: -120,
          opacity: 0,
          duration: 1.2,
          ease: "power2.inOut"
        }, 0)

        // Loop through step transitions
        const totalSteps = 7
        for (let step = 1; step <= totalSteps; step++) {
          cardRefs.current.forEach((cardEl, cardIdx) => {
            if (!cardEl) return
            const targetState = cardStatesAtStep[step][cardIdx]
            tl.to(cardEl, {
              x: targetState.x,
              y: targetState.y,
              scale: targetState.scale,
              rotate: targetState.rotate,
              opacity: targetState.opacity,
              zIndex: targetState.zIndex,
              pointerEvents: targetState.pointerEvents,
              duration: 1.2,
              ease: "power2.inOut"
            }, (step - 1) * 1.2)
          })
        }
      }, trigger)

      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <section 
      ref={triggerRef}
      className="relative w-full min-h-screen text-white overflow-hidden flex flex-col justify-center bg-transparent"
    >
      {/* Semi-transparent radial gradient overlay — lets the fixed MeshGradient WebGL shader show through */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 75% 25%, rgba(12,38,92,0.85) 0%, rgba(4,16,45,0.80) 45%, rgba(2,7,24,0.75) 100%)'
        }}
      />
      {/* Dynamic Keyframes for Glossy Live Background */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes drift-blob-1 {
          0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          33% { transform: translate(45px, -65px) scale(1.15) rotate(120deg); }
          66% { transform: translate(-35px, 35px) scale(0.9) rotate(240deg); }
          100% { transform: translate(0px, 0px) scale(1) rotate(360deg); }
        }
        @keyframes drift-blob-2 {
          0% { transform: translate(0px, 0px) scale(1.1) rotate(360deg); }
          50% { transform: translate(-55px, 55px) scale(0.85) rotate(180deg); }
          100% { transform: translate(0px, 0px) scale(1.1) rotate(0deg); }
        }
        @keyframes drift-blob-3 {
          0% { transform: translate(0px, 0px) scale(0.9) rotate(0deg); }
          40% { transform: translate(65px, 45px) scale(1.2) rotate(150deg); }
          80% { transform: translate(-45px, -55px) scale(0.95) rotate(270deg); }
          100% { transform: translate(0px, 0px) scale(0.9) rotate(360deg); }
        }
        .animate-drift-1 {
          animation: drift-blob-1 25s infinite ease-in-out;
        }
        .animate-drift-2 {
          animation: drift-blob-2 30s infinite ease-in-out;
        }
        .animate-drift-3 {
          animation: drift-blob-3 28s infinite ease-in-out;
        }
      `}} />

      {/* Deep Immersive Glossy Live Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Blob 1: Soft Ice Cyan / Teal */}
        <div 
          className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full animate-drift-1" 
          style={{
            background: 'radial-gradient(circle, rgba(182, 236, 242, 0.22) 0%, rgba(0, 212, 204, 0.1) 50%, rgba(0,0,0,0) 70%)',
            willChange: 'transform'
          }}
        />

        {/* Blob 2: Vibrant Indigo/Purple */}
        <div 
          className="absolute bottom-[-10%] left-[-15%] w-[900px] h-[900px] rounded-full animate-drift-2" 
          style={{
            background: 'radial-gradient(circle, rgba(91, 78, 232, 0.25) 0%, rgba(75, 63, 195, 0.1) 50%, rgba(0,0,0,0) 75%)',
            willChange: 'transform'
          }}
        />

        {/* Blob 3: Deep Royal Navy Blue Core */}
        <div 
          className="absolute top-[30%] left-[25%] w-[700px] h-[700px] rounded-full animate-drift-3" 
          style={{
            background: 'radial-gradient(circle, rgba(24, 57, 105, 0.5) 0%, rgba(3, 23, 61, 0.18) 60%, rgba(0,0,0,0) 80%)',
            willChange: 'transform'
          }}
        />

        {/* Glossy Diagonal Sheen Overlay */}
        <div 
          className="absolute inset-0 opacity-25"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 60%, rgba(0, 0, 0, 0.25) 100%)',
          }}
        />
      </div>

      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden lg:block relative w-full h-[100vh] z-10">
        
        {/* Pinned Intro Center Panel */}
        <div 
          ref={introRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-16 pointer-events-none"
        >
          <span className="text-[11px] uppercase tracking-[0.35em] text-[#00D4CC] mb-6 font-medium animate-pulse">
            Personal Perspectives
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-[80px] leading-tight font-extralight tracking-tight text-white mb-8">
            Personal Perspectives
          </h2>
          <p className="text-xl md:text-2xl font-light text-white/50 max-w-2xl mx-auto leading-relaxed">
            Collective voices of human beings sharing their experiences with the current mental health care system. This is why we do what we do.
          </p>

          {/* Subtly fading down chevron */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-light">Scroll to Explore</span>
            <button className="chevron-btn z-20">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* 3D Typographical Deck Wrapper */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {QUOTES.map((quote, index) => (
            <div 
              key={index}
              ref={addToRefs}
              className="absolute w-[540px] flex flex-col justify-between select-none"
              style={{ willChange: 'transform, opacity, filter' }}
            >
              <div>
                <p className="text-[20px] lg:text-[22px] leading-[1.4] font-light tracking-tight text-white mb-10">
                  <span className="text-white">{quote.text}</span>{' '}
                  <span className="text-white/45">{quote.subtext}</span>
                </p>
              </div>

              <div className="flex items-center gap-2.5 text-[11px] font-medium tracking-[0.2em] text-white/40 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D4CC]" />
                <span>{quote.name}, {quote.age} — {quote.occupation}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= MOBILE / TABLET VIEW ================= */}
      <div className="lg:hidden relative w-full py-24 px-6 md:px-16 z-10">
        
        {/* Static Header Panel */}
        <div className="mb-20">
          <span 
            ref={mobileHeaderRef}
            className="text-[10px] uppercase tracking-[0.25em] text-[#00D4CC] mb-4 block font-medium"
          >
            Personal Perspectives
          </span>
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-white mb-6">
            Personal Perspectives
          </h2>
          <p className="text-lg md:text-xl font-light text-white/50 max-w-xl leading-relaxed">
            Collective voices of human beings sharing their experiences with the current mental health care system. This is why we do what we do.
          </p>
        </div>

        {/* Vertical List of Floating Quotes */}
        <div className="flex flex-col gap-20">
          {QUOTES.map((quote, index) => {
            const quoteRef = useScrollReveal({ y: 35, delay: index * 0.05 })

            return (
              <div 
                key={index}
                ref={quoteRef}
                className="flex flex-col justify-between border-t border-white/5 pt-12"
              >
                <p className="text-xl md:text-2xl leading-relaxed font-light tracking-tight text-white mb-8">
                  <span className="text-white">{quote.text}</span>{' '}
                  <span className="text-white/45">{quote.subtext}</span>
                </p>

                <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.15em] text-white/40 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D4CC]" />
                  <span>{quote.name}, {quote.age} — {quote.occupation}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
