import React from 'react'

export default function Footer() {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className="relative w-full min-h-screen flex flex-col justify-between bg-[#020626] text-white overflow-hidden pt-36 pb-12 px-6 md:px-16 lg:px-24 xl:px-28 z-20">

      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#010626] via-[#031054] to-[#041a75]" />

        <div className="absolute top-[10%] -left-[15%] w-[80%] h-[80%] rounded-full bg-[radial-gradient(circle,rgba(11,26,156,0.35)_0%,rgba(5,11,70,0.15)_45%,rgba(0,0,0,0)_70%)] blur-[80px]" />

        <div className="absolute right-0 top-[15%] w-[65%] h-[75%] rounded-full bg-[radial-gradient(circle,rgba(22,156,184,0.36)_0%,rgba(15,106,191,0.20)_40%,rgba(0,0,0,0)_75%)] blur-[95px]" />

        <div className="absolute left-[30%] top-[25%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(11,36,180,0.3)_0%,rgba(0,0,0,0)_70%)] blur-[95px]" />
      </div>

      <div className="absolute top-[18%] left-[12%] pointer-events-none select-none z-10 hidden md:block">
        <div className="flex items-center gap-6">
          {/* Small solid ambient dot */}
          <span className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.5)]" />

          {/* Large hollow circle with continuous slow pulse-float animation */}
          <div
            className="w-7 h-7 rounded-full border border-white/15"
            style={{
              animation: 'ambientFloat 6s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes ambientFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.35; }
          50% { transform: translateY(-8px) rotate(5deg); opacity: 0.6; }
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none select-none z-0 hidden lg:block">
        <svg
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 h-full w-[140px]"
          viewBox="0 0 140 1000"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Core stroke linear gradient, bright white core, fading at ends */}
            <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.0" />
              <stop offset="15%" stopColor="#ffffff" stopOpacity="0.2" />
              <stop offset="45%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#e6ffff" stopOpacity="1.0" />
              <stop offset="55%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="85%" stopColor="#ffffff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Layer 1: Neon Aura Path (Cyan glow overlay with high blur for soft atmosphere) */}
          <path
            d="M 70,0 V 250 C 70,400 20,440 20,530 C 20,620 70,660 70,810 V 1000"
            fill="none"
            stroke="#00D4CC"
            strokeWidth="5.5"
            opacity="0.28"
            style={{ filter: 'blur(3.5px)' }}
          />

          {/* Layer 2: Core Light Path (White optical core with sharp cyan shadow glow) */}
          <path
            d="M 70,0 V 250 C 70,400 20,440 20,530 C 20,620 70,660 70,810 V 1000"
            fill="none"
            stroke="url(#curveGradient)"
            strokeWidth="1.25"
            opacity="0.95"
            style={{ filter: 'drop-shadow(0 0 3px rgba(0, 212, 208, 0.75))' }}
          />
        </svg>
      </div>

      <div className="relative z-10 flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-16 lg:gap-24 items-center">

          <div className="flex flex-col justify-center items-center lg:pr-8">
            <h5 className="text-[32px] sm:text-[38px] md:text-[42px] lg:text-[46px] xl:text-[50px] leading-[1.05] font-light tracking-[-0.025em] text-white select-none antialiased">
              Empower <br />
              your mental <br />
              health journey
            </h5>

            <div className="flex flex-wrap items-center gap-4 mt-8 md:mt-10">
              {/* Button 1: INVEST WITH US (Solid Slate-Blue Capsule matching reference) */}
              <button
                onClick={() => window.location.href = 'mailto:invest@amaterasu.ai'}
                className="cta-btn group flex items-center gap-2.5 px-6 py-3.5 bg-[#3E4AB8] hover:bg-[#4d5ac9] border border-transparent rounded-full text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:scale-105 active:scale-98 cursor-pointer select-none"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D4CC] shadow-[0_0_6px_#00D4CC]" />
                INVEST WITH US
              </button>

              {/* Button 2: START JOURNEY (Transparent outline matching reference) */}
              <button
                onClick={() => window.location.href = 'https://amaterasu.ai/journey'}
                className="cta-btn2 group flex items-center gap-2.5 px-6 py-3.5 bg-transparent hover:bg-white/5 border border-white/20 hover:border-white/45 rounded-full text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:scale-105 active:scale-98 cursor-pointer select-none"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white transition-colors group-hover:bg-[#00D4CC]" />
                START JOURNEY
              </button>
            </div>
          </div>

          {/* 4.2 Right Column: Stacked Vision/Aleph & Links */}
          <div className="flex flex-col justify-center items-center lg:pl-16">
            <div className="mb-8 md:mb-10 select-none">
              <h5 className="text-[32px] sm:text-[38px] md:text-[42px] lg:text-[46px] xl:text-[50px] font-light text-white tracking-[-0.02em] leading-[1.05] mb-1">
                Vision
              </h5>
              <h5 className="text-[32px] sm:text-[38px] md:text-[42px] lg:text-[46px] xl:text-[50px] font-light text-white tracking-[-0.02em] leading-[1.05] mb-1">
                Aleph
              </h5>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'start', marginTop: '20px'}}>
              <p
                className="group flex gap-2.5 text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors duration-300"
              >
                TWITTER
              </p>

              <p
                className="group flex gap-2.5 text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors duration-300"
              >
                LINKEDIN
              </p>

              <p
                className="group flex gap-2.5 text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors duration-300"
              >
                EMAIL
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="relative z-10 w-full mb-40 pt-8 mt-auto flex flex-col md:flex-row justify-between items-center gap-6" style={{ marginBottom: '20px' }}>

        <div className="text-[9px] sm:text-[10px] md:text-[11px] text-white/50 tracking-wider whitespace-nowrap select-none">
          © 2024 - Amaterasu, empowering your mental health journey with quantum precision.
        </div>

        {/* Exo Ape attribution & Scroll to top */}
        <div className="flex items-center gap-8 md:gap-12">
          <a
            href="https://www.exoape.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[0.22em] font-bold text-white/30 hover:text-white/70 transition-colors uppercase select-none"
          >
            Crafted by Exo Ape
          </a>

          {/* Premium Scroll-To-Top Circular Button with Upward Chevron (matching reference) */}
          <button
            onClick={scrollToTop}
            className="flex items-center justify-center w-11 h-11 rounded-full border border-white/15 hover:border-white/55 bg-transparent hover:bg-white/5 text-white transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer shadow-[0_0_12px_rgba(255,255,255,0.03)]"
            aria-label="Scroll to top"
          >
            <svg
              className="w-3.5 h-3.5 transform group-hover:-translate-y-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </button>
        </div>

      </div>

    </footer>
  )
}
