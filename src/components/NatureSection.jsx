import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function NatureSection() {
  const containerRef = useRef(null)
  const globeRef = useRef(null)
  const overlayBgRef = useRef(null)
  const contentRef = useRef(null)

  // Refs for slide contents
  const slide1Ref = useRef(null)
  const slide2Ref = useRef(null)
  const slide3Ref = useRef(null)

  // Refs for graphics layers
  const graphics1Ref = useRef(null)
  const graphics2Ref = useRef(null)
  const graphics3Ref = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const ctx = gsap.context(() => {

      // 1. Initial Globe Swipe (Triggers as NatureSection enters bottom of viewport)
      // Sweeps the globe up while the VisionSection text is still on screen
      gsap.fromTo(globeRef.current,
        {
          y: '30vh',
          opacity: 0,
          scale: 0.95,
        },
        {
          y: '0vh',
          opacity: 1,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom', // Start exactly when top of NatureSection enters bottom of viewport
            end: 'top top',     // Complete exactly when top of NatureSection reaches top of viewport
            scrub: 1,
          }
        }
      )

      // 2. Master timeline linked to scroll pinning (starts once NatureSection hits top top)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=450%', // Pinned scroll space for sequence slides
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        }
      })

      // Expand Globe to cover screen & fade in deep blue gradient overlay
      tl.to(globeRef.current,
        {
          top: '0vh',
          width: '100vw',
          height: '100vh',
          borderRadius: '0%',
          marginTop: '0%',
          scale: 1.05,
          duration: 2.2,
          ease: 'power2.inOut'
        }
      )

      tl.to(overlayBgRef.current,
        {
          opacity: 1,
          duration: 2.2,
          ease: 'power2.inOut'
        },
        '<' // Sync with the globe expansion
      )

      // 3. Slide 1 Reveal (starts right as screen is covered)
      tl.fromTo([slide1Ref.current, graphics1Ref.current],
        { opacity: 0, y: 40, filter: 'blur(16px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power2.out' },
        '-=0.5'
      )
      // Hold Slide 1
      tl.to({}, { duration: 2 })
      // Fade out Slide 1
      tl.to([slide1Ref.current, graphics1Ref.current],
        { opacity: 0, y: -40, filter: 'blur(16px)', duration: 1.2, ease: 'power2.in' }
      )

      // 4. Slide 2 Reveal
      tl.fromTo([slide2Ref.current, graphics2Ref.current],
        { opacity: 0, y: 40, filter: 'blur(16px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power2.out' }
      )
      // Hold Slide 2
      tl.to({}, { duration: 2 })
      // Fade out Slide 2
      tl.to([slide2Ref.current, graphics2Ref.current],
        { opacity: 0, y: -40, filter: 'blur(16px)', duration: 1.2, ease: 'power2.in' }
      )

      // 5. Slide 3 Reveal
      tl.fromTo([slide3Ref.current, graphics3Ref.current],
        { opacity: 0, y: 40, filter: 'blur(16px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power2.out' }
      )
      // Hold Slide 3
      tl.to({}, { duration: 2.5 })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div id="nature-section" ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#ffffff] z-20">

      {/* GSAP Curve Swipe (Globe) - EXACT USER MARKUP & STYLING */}
      <div
        ref={globeRef}
        className="absolute top-[30vh] left-1/2 -translate-x-1/2 w-[200vw] md:w-[140vw] lg:w-[110vw] h-[200vw] md:h-[140vw] lg:h-[110vw] rounded-t-[50%] flex items-start justify-center overflow-hidden"
        style={{
          transformOrigin: 'top center',
          background: 'linear-gradient(180deg, #2D88A6 0%, #65C9D9 100%)',
          willChange: 'transform, opacity, border-radius, width, height, top',
          marginTop: '10%',
          zIndex: 0
        }}
      >
        {/* Globe Grid Lines (SVG) - EXACT USER SVG */}
        <svg
          className="absolute top-0 left-0 w-full h-[50%] opacity-30 mix-blend-screen pointer-events-none"
          viewBox="0 0 1000 500"
          preserveAspectRatio="xMidYMin slice"
        >
          {/* Central-right vertical curve */}
          <path d="M 550,0 Q 560,250 580,500" fill="none" stroke="white" strokeWidth="1.2" />
          {/* Circle attached to central-right curve */}
          <circle cx="555" cy="150" r="40" fill="none" stroke="white" strokeWidth="1.2" />

          {/* Left curves */}
          <path d="M 400,0 Q 200,200 0,400" fill="none" stroke="white" strokeWidth="1.2" />
          <path d="M 450,0 Q 300,250 150,500" fill="none" stroke="white" strokeWidth="1.2" />

          {/* Right curves */}
          <path d="M 650,0 Q 800,200 1000,350" fill="none" stroke="white" strokeWidth="1.2" />
          <path d="M 750,0 Q 900,150 1000,200" fill="none" stroke="white" strokeWidth="1.2" />
        </svg>

        {/* Dynamic deep-blue gradient overlay that fades in as the globe expands */}
        <div
          id="nature-overlay-bg"
          ref={overlayBgRef}
          className="absolute inset-0 opacity-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, #09112A 0%, #0F2A4A 45%, #1B5872 100%)',
            willChange: 'opacity'
          }}
        />
      </div>

      {/* Viewport Content Wrapper (sits above the sweeping globe background) */}
      <div
        ref={contentRef}
        className="absolute top-0 left-0 w-full h-full flex items-center justify-between px-6 md:px-16 lg:px-32 z-10 pointer-events-none"
      >

        {/* ---------------- SLIDE 1 ---------------- */}
        <div
          ref={slide1Ref}
          className="absolute bottom-24 left-6 md:left-16 lg:left-32 max-w-2xl text-left flex flex-col items-start gap-8"
          style={{ willChange: 'opacity, transform, filter' }}
        >
          <p className="text-xl md:text-3xl lg:text-[42px] leading-[1.3] font-light text-white tracking-[-0.01em]">
            Our minds are a deep reflection of nature, yet our internal world has driven too far from natural order.
          </p>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5AC8D8] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/60 font-bold">
              RECONNECTING WITH NATURE
            </span>
          </div>
        </div>

        {/* Slide 1 Graphics overlay */}
        <div ref={graphics1Ref} className="absolute right-6 lg:right-24 top-1/2 -translate-y-1/2 w-1/2 h-[70%] flex items-center justify-end" style={{ willChange: 'opacity, transform, filter' }}>
          <svg className="w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] opacity-25 mix-blend-screen" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <circle cx="500" cy="500" r="400" fill="none" stroke="white" strokeWidth="0.8" strokeDasharray="4 4" />
            <circle cx="500" cy="500" r="300" fill="none" stroke="white" strokeWidth="0.6" />
            <circle cx="500" cy="500" r="180" fill="none" stroke="white" strokeWidth="0.5" />
            <path d="M 100,500 Q 500,200 900,500" fill="none" stroke="white" strokeWidth="0.8" />
            <path d="M 100,500 Q 500,800 900,500" fill="none" stroke="white" strokeWidth="0.8" />
            <path d="M 500,100 Q 200,500 500,900" fill="none" stroke="white" strokeWidth="0.8" />
            <path d="M 500,100 Q 800,500 500,900" fill="none" stroke="white" strokeWidth="0.8" />
            <circle cx="500" cy="200" r="8" fill="#5AC8D8" />
          </svg>
        </div>


        {/* ---------------- SLIDE 2 ---------------- */}
        <div
          ref={slide2Ref}
          className="absolute bottom-24 left-6 md:left-16 lg:left-32 max-w-2xl text-left flex flex-col items-start gap-8"
          style={{ willChange: 'opacity, transform, filter' }}
        >
          <div className="flex items-center gap-10">
            {/* Slide 2 Concentric Badge next to text */}
            <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
              <div className="absolute w-full h-full border border-white/20 rounded-full" />
              <div className="absolute w-[70%] h-[70%] border border-white/10 rounded-full border-dashed" />
              <span className="text-[11px] text-white/80 font-bold tracking-wider">02</span>
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-[46px] font-light leading-[1.25] tracking-[-0.015em] text-white">
              It is now our duty to restore balance and harmony.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5AC8D8] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/60 font-bold">
              RECONNECTING WITH NATURE
            </span>
          </div>
        </div>

        {/* Slide 2 Graphics overlay */}
        <div ref={graphics2Ref} className="absolute right-6 lg:right-24 top-1/2 -translate-y-1/2 w-1/2 flex items-center justify-end" style={{ willChange: 'opacity, transform, filter' }}>
          <div className="relative w-[280px] h-[280px] lg:w-[400px] lg:h-[400px] flex items-center justify-center">
            <div className="absolute w-full h-full border border-white/10 rounded-full animate-spin" style={{ animationDuration: '60s' }} />
            <div className="absolute w-[80%] h-[80%] border border-white/15 rounded-full border-dashed" />
            <div className="absolute w-[60%] h-[60%] border border-white/10 rounded-full" />
            <div className="absolute w-[40%] h-[40%] border border-white/25 rounded-full flex items-center justify-center" />
            <div className="absolute w-2.5 h-2.5 bg-[#5AC8D8] rounded-full" style={{ right: '22%', top: '28%' }} />
          </div>
        </div>


        {/* ---------------- SLIDE 3 ---------------- */}
        <div
          ref={slide3Ref}
          className="absolute bottom-24 left-6 md:left-16 lg:left-32 max-w-2xl text-left flex flex-col items-start gap-8"
          style={{ willChange: 'opacity, transform, filter' }}
        >
          <p className="text-xl md:text-3xl lg:text-[38px] leading-[1.35] font-light text-white tracking-[-0.01em]">
            Modern mental health care operates in a linear way, isolating insights over long periods of time, with little consideration or ability to map a full view of the mind.
          </p>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5AC8D8] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/60 font-bold">
              BEYOND LINEAR TREATMENT
            </span>
          </div>
        </div>

        {/* Slide 3 Graphics overlay (Interlocking Assessment Circles) */}
        <div ref={graphics3Ref} className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 w-1/2 flex items-center justify-end" style={{ willChange: 'opacity, transform, filter' }}>
          <div className="flex flex-row items-center gap-2 lg:gap-3 overflow-x-auto max-w-full">
            {[
              'RE-DO INITIAL ASSESSMENT',
              'UNDERSTAND THE PATIENT',
              'INITIAL ASSESSMENT',
              'EVALUATION'
            ].map((text, idx) => (
              <React.Fragment key={idx}>
                <div className="w-[100px] h-[100px] lg:w-[130px] lg:h-[130px] rounded-full border border-white/20 bg-white/[0.02] backdrop-blur-sm flex items-center justify-center p-3 text-center transition-all">
                  <span className="text-[7px] lg:text-[8px] tracking-wider font-light text-white/80 leading-normal">
                    {text}
                  </span>
                </div>
                {idx < 3 && (
                  <span className="text-white/30 text-xs font-light px-0.5">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Scrolling bottom-right chevron helper */}
        <div className="absolute bottom-8 right-6 md:right-16 lg:right-32 flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors pointer-events-auto cursor-pointer">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>

      </div>

    </div>
  )
}
