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

  // Refs for dynamic background circles
  const bgGridRef = useRef(null)
  const slide1GridRef = useRef(null)
  const slide2GridRef = useRef(null)
  const slide3GridRef = useRef(null)
  const badge1Ref = useRef(null)
  const badge2Ref = useRef(null)
  const badge3Ref = useRef(null)

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
            start: 'top 50%', // Start exactly when top of NatureSection enters bottom of viewport
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

      // Expand Globe to cover screen (keeping its top curved dome boundary fully circular)
      tl.to(globeRef.current,
        {
          top: '0vh',
          width: '100vw',
          height: '100vh',
          scale: 1.05,
          marginTop: '0%',
          duration: 2.2,
          ease: 'power2.inOut'
        }
      )

      // Start the flattening animation toward the end of the swipe up, so it is fully covered before losing the curve!
      tl.to(globeRef.current,
        {
          borderRadius: '0%',
          duration: 0.9,
          ease: 'power2.out'
        },
        '<1.3' // Triggers 1.3s into the 2.2s swipe, executing in parallel to finish exactly at 2.2s!
      )

      tl.to(overlayBgRef.current,
        {
          opacity: 1,
          duration: 2.2,
          ease: 'power2.inOut'
        },
        '<' // Sync with the globe expansion
      )

      // Slowly rotate Slide 1 grid on initial expand
      tl.to(slide1GridRef.current,
        {
          rotation: 20,
          scale: 1.05,
          duration: 2.2,
          ease: 'power2.inOut'
        },
        '<'
      )

      // 3. Slide 1 Reveal (starts right as screen is covered)
      tl.fromTo([slide1Ref.current, graphics1Ref.current],
        { opacity: 0, y: 40, filter: 'blur(16px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power2.out' },
        '-=0.5'
      )
      // Fade in Badge 01
      tl.fromTo(badge1Ref.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 0.7, scale: 1, y: 0, duration: 1.2, ease: 'power2.out' },
        '<'
      )

      // Hold Slide 1
      tl.to({}, { duration: 2 })

      // Fade out Slide 1 & Slide 1 Grid, and rotate curves
      tl.to([slide1Ref.current, graphics1Ref.current],
        { opacity: 0, y: -40, filter: 'blur(16px)', duration: 1.2, ease: 'power2.in' }
      )
      tl.to(slide1GridRef.current,
        { opacity: 0, scale: 1.1, rotation: 40, duration: 1.2, ease: 'power2.in' },
        '<'
      )

      // 4. Slide 2 Reveal & Slide 2 Grid Fade in (the nested Concentric Vortex!)
      tl.fromTo([slide2Ref.current, graphics2Ref.current],
        { opacity: 0, y: 40, filter: 'blur(16px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power2.out' }
      )
      tl.fromTo(slide2GridRef.current,
        { opacity: 0, scale: 0.95, rotation: -10 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1.5, ease: 'power2.out' },
        '<'
      )
      // Fade in Badge 02
      tl.fromTo(badge2Ref.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 0.7, scale: 1, y: 0, duration: 1.2, ease: 'power2.out' },
        '<'
      )

      // Hold Slide 2
      tl.to({}, { duration: 2 })

      // Fade out Slide 2 & Slide 2 Grid, and rotate curves further
      tl.to([slide2Ref.current, graphics2Ref.current],
        { opacity: 0, y: -40, filter: 'blur(16px)', duration: 1.2, ease: 'power2.in' }
      )
      tl.to(slide2GridRef.current,
        { opacity: 0, scale: 1.08, rotation: 25, duration: 1.2, ease: 'power2.in' },
        '<'
      )

      // 5. Slide 3 Reveal & Slide 3 Grid Fade in!
      tl.fromTo([slide3Ref.current, graphics3Ref.current],
        { opacity: 0, y: 40, filter: 'blur(16px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power2.out' }
      )
      tl.fromTo(slide3GridRef.current,
        { opacity: 0, scale: 0.95, rotation: -5 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1.5, ease: 'power2.out' },
        '<'
      )
      // Fade in Badge 03
      tl.fromTo(badge3Ref.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 0.7, scale: 1, y: 0, duration: 1.2, ease: 'power2.out' },
        '<'
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
        {/* Layered concentric dome borders (Ripples/Texture) that flatten perfectly on expansion */}
        <div className="absolute top-[2px] inset-x-[2px] bottom-[2px] rounded-t-[50%] border-t border-white/25 pointer-events-none mix-blend-screen will-change-[border-radius]" />
        <div className="absolute top-[12px] inset-x-[12px] bottom-[12px] rounded-t-[50%] border-t border-white/15 pointer-events-none mix-blend-screen will-change-[border-radius]" />
        <div className="absolute top-[24px] inset-x-[24px] bottom-[24px] rounded-t-[50%] border-t border-white/10 pointer-events-none mix-blend-screen will-change-[border-radius]" />
        <div className="absolute top-[40px] inset-x-[40px] bottom-[40px] rounded-t-[50%] border-t border-white/5 pointer-events-none mix-blend-screen will-change-[border-radius]" />

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

        {/* Dynamic Widescreen Vector Grid Lines & Scrolling Circles (Texture + Scroll Tracking) */}
        <svg
          ref={bgGridRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20 mix-blend-screen"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          style={{ willChange: 'transform, opacity' }}
        >
          {/* --- SLIDE 1 BACKGROUND (Sweeping Editorial Curves & Badge 01) --- */}
          <g ref={slide1GridRef} style={{ willChange: 'opacity, transform' }}>
            {/* Concentric planetary orbit lines */}
            <circle cx="960" cy="540" r="600" fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.7" />
            <circle cx="960" cy="540" r="450" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="3 3" strokeOpacity="0.5" />
            <circle cx="960" cy="540" r="300" fill="none" stroke="white" strokeWidth="0.4" strokeOpacity="0.4" />
            <circle cx="960" cy="540" r="750" fill="none" stroke="white" strokeWidth="0.3" strokeOpacity="0.3" />

            {/* Intersecting curves matching high-end editorial vectors */}
            <circle cx="1350" cy="420" r="380" fill="none" stroke="white" strokeWidth="0.6" strokeOpacity="0.6" />
            <circle cx="580" cy="620" r="420" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.5" />
            <circle cx="1600" cy="800" r="500" fill="none" stroke="white" strokeWidth="0.4" strokeDasharray="4 4" strokeOpacity="0.4" />

            {/* Sweeping parabolic arcs across the horizon */}
            <path d="M -100,540 Q 960,-200 2020,540" fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.6" />
            <path d="M -100,540 Q 960,1280 2020,540" fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.6" />
            <path d="M 960,-100 Q 300,540 960,1180" fill="none" stroke="white" strokeWidth="0.6" strokeOpacity="0.5" />
            <path d="M 960,-100 Q 1620,540 960,1180" fill="none" stroke="white" strokeWidth="0.6" strokeOpacity="0.5" />

            {/* Badge 01 - Linked to Slide 1 (Right Side) */}
            <g ref={badge1Ref} style={{ transformOrigin: '1500px 520px' }}>
              <circle cx="1500" cy="520" r="32" fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.8" />
              <circle cx="1500" cy="520" r="42" fill="none" stroke="white" strokeWidth="0.4" strokeDasharray="3 3" strokeOpacity="0.5" />
              <circle cx="1500" cy="520" r="58" fill="none" stroke="white" strokeWidth="0.3" strokeOpacity="0.3" />
              <text 
                x="1500" 
                y="524" 
                textAnchor="middle" 
                fill="white" 
                style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: '800', letterSpacing: '0.05em', opacity: 0.8 }}
              >
                01
              </text>
            </g>
          </g>

          {/* --- SLIDE 2 BACKGROUND (Concentric Tunnel Vortex / Depth Spiral) --- */}
          <g ref={slide2GridRef} style={{ opacity: 0, willChange: 'opacity, transform' }}>
            {/* Concentric planetary rings scaling down dynamically, offset right to represent depth */}
            <circle cx="1200" cy="540" r="1000" fill="none" stroke="white" strokeWidth="0.4" strokeOpacity="0.3" />
            <circle cx="1200" cy="540" r="820" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.4" />
            <circle cx="1200" cy="540" r="660" fill="none" stroke="white" strokeWidth="0.6" strokeOpacity="0.5" strokeDasharray="4 4" />
            <circle cx="1200" cy="540" r="520" fill="none" stroke="white" strokeWidth="0.7" strokeOpacity="0.6" />
            <circle cx="1200" cy="540" r="400" fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.7" />
            <circle cx="1200" cy="540" r="300" fill="none" stroke="white" strokeWidth="0.9" strokeOpacity="0.8" />
            <circle cx="1200" cy="540" r="210" fill="none" stroke="white" strokeWidth="1.1" strokeOpacity="0.9" strokeDasharray="3 3" />
            <circle cx="1200" cy="540" r="135" fill="none" stroke="white" strokeWidth="1.3" strokeOpacity="1" />
            <circle cx="1200" cy="540" r="75" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="1" />
            <circle cx="1200" cy="540" r="30" fill="none" stroke="white" strokeWidth="1.8" strokeOpacity="1" />

            {/* Sweeping orbits intersecting the tunnel */}
            <circle cx="600" cy="540" r="800" fill="none" stroke="white" strokeWidth="0.4" strokeOpacity="0.3" />
            <path d="M 1200,-200 Q 800,540 1200,1280" fill="none" stroke="white" strokeWidth="0.6" strokeOpacity="0.5" />

            {/* Badge 02 - Linked to Slide 2 (Top Left Side) */}
            <g ref={badge2Ref} style={{ transformOrigin: '420px 380px' }}>
              <circle cx="420" cy="380" r="32" fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.8" />
              <circle cx="420" cy="380" r="42" fill="none" stroke="white" strokeWidth="0.4" strokeDasharray="3 3" strokeOpacity="0.5" />
              <circle cx="420" cy="380" r="58" fill="none" stroke="white" strokeWidth="0.3" strokeOpacity="0.3" />
              <text 
                x="420" 
                y="384" 
                textAnchor="middle" 
                fill="white" 
                style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: '800', letterSpacing: '0.05em', opacity: 0.8 }}
              >
                02
              </text>
            </g>
          </g>

          {/* --- SLIDE 3 BACKGROUND (Interlocking Geometries & Radar Rings) --- */}
          <g ref={slide3GridRef} style={{ opacity: 0, willChange: 'opacity, transform' }}>
            <circle cx="960" cy="540" r="550" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.4" />
            <circle cx="1450" cy="540" r="450" fill="none" stroke="white" strokeWidth="0.6" strokeOpacity="0.5" />
            <circle cx="470" cy="540" r="450" fill="none" stroke="white" strokeWidth="0.6" strokeOpacity="0.5" />
            <path d="M 100,540 L 1820,540" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" strokeOpacity="0.3" />

            {/* Badge 03 - Linked to Slide 3 (Bottom Center-Right) */}
            <g ref={badge3Ref} style={{ transformOrigin: '1400px 720px' }}>
              <circle cx="1400" cy="720" r="32" fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.8" />
              <circle cx="1400" cy="720" r="42" fill="none" stroke="white" strokeWidth="0.4" strokeDasharray="3 3" strokeOpacity="0.5" />
              <circle cx="1400" cy="720" r="58" fill="none" stroke="white" strokeWidth="0.3" strokeOpacity="0.3" />
              <text 
                x="1400" 
                y="724" 
                textAnchor="middle" 
                fill="white" 
                style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: '800', letterSpacing: '0.05em', opacity: 0.8 }}
              >
                03
              </text>
            </g>
          </g>
        </svg>
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
