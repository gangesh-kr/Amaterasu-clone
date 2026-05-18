import React from 'react'
import useScrollReveal from '../hooks/useScrollReveal.js'

const PRINCIPLES = [
  {
    title: 'SYNERGY WITH NATURE',
    description: 'We closely partner with nature and deeply advocate for a relationship that embodies not only complete synergies within our innovation, but also to our approach to minimizing the use of compute resources to only as fundamentally required.'
  },
  {
    title: 'MENTAL WORLD MODELS',
    description: 'We relentlessly pursue to model complexities across all levels of mental abstractions, towards a holistic unified view of your personality, even the abstractions and archetypes that might be confrontational.'
  },
  {
    title: 'INTERCONNECTED SYSTEMS',
    description: 'We believe in empowering you with the ability to completely integrate transformational technologies in personalized ways that are meaningful and unique to you, accessible always, all of the time, and forever.'
  },
  {
    title: 'DYNAMIC DIVERSITY',
    description: 'We move away from traditional categorical approaches to mental health-care and progress towards a true view of you. You are more than a categorical label, and we embrace the complexity associated with this.'
  },
  {
    title: 'PIONEERING EVOLUTION',
    description: 'We are dedicated to advancing the state of the art before it arrives, ensuring our innovations stay ahead of life’s challenges. By anticipating needs and championing continuous growth, we empower individuals with tools that unlock their future potential.'
  },
  {
    title: 'ETERNITY',
    description: 'We strive to solve mental-health unequivocally, relentlessly, and for all time, and will not deviate from this vision until it is complete.'
  }
]

export default function PrinciplesSection() {
  const headerRef = useScrollReveal({ y: 30 })
  const subHeaderRef = useScrollReveal({ y: 30, delay: 0.1 })

  return (
    <section className="relative w-full flex flex-col lg:flex-row bg-transparent text-white overflow-visible border-t border-white/5">

      {/* ================= LEFT SIDE: STICKY PANEL (40% Width) ================= */}
      <div className="w-full lg:w-[40%] h-[50vh] lg:h-screen lg:sticky lg:top-0 bg-transparent flex flex-col justify-between p-8 lg:p-24 overflow-hidden z-20 select-none">

        {/* Decorative Circle Top Left */}
        <div className="relative w-11 h-11 rounded-full border border-white/10 flex items-center justify-center opacity-60">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D4CC]" />
        </div>

        {/* Ambient Radial Background Glow behind the giant '6' */}
        <div
          className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full pointer-events-none z-0 opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 204, 0.25) 0%, rgba(91, 78, 232, 0.05) 60%, rgba(0,0,0,0) 100%)',
          }}
        />

        {/* Giant Numeral '6' */}
        <div className="relative z-10 mt-auto flex items-end">
          <h1
            className="text-[180px] sm:text-[220px] lg:text-[28vw] font-light leading-none tracking-tighter select-none font-sans"
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 0%, #C1F0F0 50%, rgba(0, 212, 204, 0) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}
          >
            6
          </h1>
        </div>

        {/* Curved Organic Boundary Divider (SVG mask that sits between left & right columns) */}
        <svg
          viewBox="0 0 100 1000"
          preserveAspectRatio="none"
          className="hidden lg:block absolute top-0 left-full h-full w-[90px] pointer-events-none z-20 overflow-visible"
        >
          {/* Solid fill shape to mask the shader backdrop */}
          <path
            d="M 0 0 L 0 220 C 0 350, 80 370, 80 490 C 80 600, 0 620, 0 750 L 0 1000 L -5 1000 L -5 0 Z"
            fill="transparent"
          />
          {/* Subtle glowing outline path */}
          <path
            d="M 0 220 C 0 350, 80 370, 80 490 C 80 600, 0 620, 0 750"
            fill="none"
            stroke="rgba(255, 255, 255, 0.16)"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      {/* ================= RIGHT SIDE: SCROLL CONTAINER (60% Width) ================= */}
      {/* Uses bg-transparent so the fixed fullscreen WebGL shader shows through */}
      <div
        className="w-full lg:w-[60%] min-h-screen bg-transparent relative px-8 sm:px-16 lg:px-24 flex flex-col justify-start z-10 overflow-visible"
        style={{
          paddingTop: 'clamp(140px, 16vw, 210px)',
          paddingBottom: 'clamp(80px, 10vw, 140px)'
        }}
      >

        {/* Section Header */}
        <div className="max-w-xl mb-16 lg:mb-28">
          <h2
            ref={headerRef}
            className="text-4xl sm:text-5xl lg:text-[72px] font-extralight tracking-tight text-white leading-[1.05] mb-8 font-sans"
          >
            Guiding <br />
            Principles
          </h2>
          <p
            ref={subHeaderRef}
            className="text-lg sm:text-xl font-light text-white/60 leading-relaxed"
          >
            Through the seamless integration of our 6 guiding principles, we set in motion our relentless culture, focus, and ethics.
          </p>
        </div>

        {/* Vertical List of Principles */}
        <div className="flex flex-col gap-16 lg:gap-24 max-w-xl">
          {PRINCIPLES.map((principle, index) => {
            // Assign unique scroll reveal for each item
            const itemRef = useScrollReveal({ y: 35, delay: 0.05 * (index % 3) })

            return (
              <div
                key={index}
                ref={itemRef}
                className="flex flex-col items-start border-t border-white/5 pt-10"
              >
                {/* Category Subheader */}
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D4CC] shadow-[0_0_6px_#00D4CC]" />
                  <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-white/40 uppercase">
                    {principle.title}
                  </span>
                </div>

                {/* Description Body */}
                <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-md">
                  {principle.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Scroll action navigation button (Bottom Right Corner) */}
        <div className="absolute bottom-12 right-8 sm:right-16 lg:right-24 mt-20 lg:mt-0 select-none">
          <button
            onClick={() => {
              // Smooth scroll to the next section (PerspectivesSection)
              const perspectivesSec = document.getElementById('perspectives-section') || document.querySelector('section:nth-of-type(8)')
              if (perspectivesSec) {
                perspectivesSec.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="w-11 h-11 rounded-full border border-white/20 hover:border-white/40 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 backdrop-blur-sm pointer-events-auto cursor-pointer shadow-[0_0_10px_rgba(255,255,255,0.02)]"
          >
            <span className="font-light text-base select-none">—</span>
          </button>
        </div>

      </div>
    </section>
  )
}
