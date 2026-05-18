import React from 'react'
import useScrollReveal from '../hooks/useScrollReveal.js'

export default function MethodologySection() {
  const linearHeaderRef = useScrollReveal({ y: 30 })
  const linearBodyRef = useScrollReveal({ y: 30, delay: 0.15 })
  const frontierHeaderRef = useScrollReveal({ y: 30 })
  const frontierBodyRef = useScrollReveal({ y: 30, delay: 0.15 })

  return (
    <section className="relative w-full bg-[#00040A] text-white py-32 px-6 md:px-16 lg:px-32">
      
      {/* Decorative vertical line connecting sections */}
      <div className="absolute top-0 left-1/2 w-[1px] h-32 bg-gradient-to-b from-[rgba(255,255,255,0.1)] to-transparent" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-16">
        
        {/* Beyond Linear Treatment */}
        <div className="flex flex-col justify-center">
          <h2 
            ref={linearHeaderRef}
            className="text-3xl md:text-4xl font-light tracking-[-0.01em] mb-6"
          >
            Beyond linear treatment
          </h2>
          <p 
            ref={linearBodyRef}
            className="text-lg md:text-xl font-light text-white/60 leading-[1.8]"
          >
            Amaterasu moves beyond the linear, leveraging nonlinear dynamics to capture the fully connected conscious mind, towards holistic, dynamic, and interconnected truths.
          </p>
        </div>

        {/* Abstract glowing visual element */}
        <div className="hidden lg:flex items-center justify-center relative">
           <div className="w-[300px] h-[300px] border border-white/10 rounded-full flex items-center justify-center relative">
              <div className="absolute w-[400px] h-[400px] bg-[#4B3FC3] opacity-[0.05] blur-[80px] rounded-full" />
              <div className="w-[150px] h-[150px] border border-white/20 rounded-full" />
              <div className="absolute w-2 h-2 bg-white rounded-full animate-pulse" />
           </div>
        </div>

        {/* Frontier Technologies Visual Placeholder */}
        <div className="hidden lg:flex items-center justify-center relative mt-16 lg:mt-0">
           <div className="w-full h-full min-h-[300px] border border-white/5 bg-white/[0.02] backdrop-blur-sm rounded-3xl relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D4CC]/5 to-transparent" />
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" opacity="0.3">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="1" />
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="1" />
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="1" />
              </svg>
           </div>
        </div>

        {/* Frontier Technologies Text */}
        <div className="flex flex-col justify-center mt-16 lg:mt-0">
          <h2 
            ref={frontierHeaderRef}
            className="text-3xl md:text-4xl font-light tracking-[-0.01em] mb-6"
          >
            Frontier Technologies
          </h2>
          <p 
            ref={frontierBodyRef}
            className="text-lg md:text-xl font-light text-white/60 leading-[1.8]"
          >
            Amaterasu pioneers research at the intersection of quantum computing, neuroscience, and non-linear dynamics towards a frontier pushing mental health care ecosystem. We leverage nature to deliver a degree of personalized mental health care not yet seen before.
          </p>
        </div>

      </div>
    </section>
  )
}
