import React from 'react'
import useScrollReveal from '../hooks/useScrollReveal.js'

const PRINCIPLES = [
  {
    title: 'Synergy with nature',
    description: 'We closely partner with nature and deeply advocate for a relationship that embodies not only complete synergies within our innovation, but also to our approach to minimizing the use of compute resources to only as fundamentally required.'
  },
  {
    title: 'Mental World Models',
    description: 'We relentlessly pursue to model complexities across all levels of mental abstractions, towards a holistic unified view of your personality, even the abstractions and archetypes that might be confrontational.'
  },
  {
    title: 'Interconnected Systems',
    description: 'We believe in empowering you with the ability to completely integrate transformational technologies in personalized ways that are meaningful and unique to you, accessible always, all of the time, and forever.'
  },
  {
    title: 'Dynamic Diversity',
    description: 'We move away from traditional categorical approaches to mental health-care and progress towards a true view of you. You are more than a categorical label, and we embrace the complexity associated with this.'
  },
  {
    title: 'Pioneering Evolution',
    description: 'We are dedicated to advancing the state of the art before it arrives, ensuring our innovations stay ahead of life’s challenges. By anticipating needs and championing continuous growth, we empower individuals with tools that unlock their future potential.'
  },
  {
    title: 'Eternity',
    description: 'We strive to solve mental-health unequivocally, relentlessly, and for all time, and will not deviate from this vision until it is complete.'
  }
]

export default function PrinciplesSection() {
  const headerRef = useScrollReveal({ y: 30 })
  const subHeaderRef = useScrollReveal({ y: 30, delay: 0.1 })
  const gridRef = useScrollReveal({ y: 40, stagger: 0.15, start: 'top 80%' })

  return (
    <section className="relative w-full bg-[#00040A] text-white py-32 px-6 md:px-16 lg:px-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto mb-20 text-center">
        <h2 
          ref={headerRef}
          className="text-[11px] uppercase tracking-[0.3em] text-[#4B3FC3] mb-6 font-light"
        >
          Guiding Principles
        </h2>
        <p 
          ref={subHeaderRef}
          className="text-2xl md:text-3xl font-light text-white/80 max-w-3xl mx-auto leading-[1.6]"
        >
          Through the seamless integration of our 6 guiding principles, we set in motion our relentless culture, focus, and ethics.
        </p>
      </div>

      <div 
        ref={gridRef}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {PRINCIPLES.map((principle, index) => (
          <div 
            key={index}
            className="p-10 border border-white/10 bg-white/[0.01] hover:bg-white/[0.03] transition-colors duration-500 rounded-2xl flex flex-col h-full backdrop-blur-sm"
          >
            <h3 className="text-xl md:text-2xl font-light mb-6 tracking-[-0.01em]">
              {principle.title}
            </h3>
            <p className="text-sm md:text-base text-white/50 leading-[1.8] font-light flex-grow">
              {principle.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
