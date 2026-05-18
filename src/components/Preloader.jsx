import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState('loading') // 'loading' | 'ready' | 'entering'

  const containerRef = useRef(null)
  const svgRef = useRef(null)
  const textRef = useRef(null)
  const centralCircleRef = useRef(null)
  const loadingArcRef = useRef(null)
  const surroundingCirclesRef = useRef([])

  const R = 110 // Radius of circles
  const circleCount = 8

  // State for the expansion distance of outer circles
  const [distance, setDistance] = useState(R * 0.25)
  const [outerOpacity, setOuterOpacity] = useState(0.08)

  useEffect(() => {
    // Disable scrolling
    const originalOverflow = document.body.style.overflow
    const originalHeight = document.body.style.height
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100vh'

    // 1. Simulate Loading progress
    const duration = 3.5 // 3.5 seconds loading time
    const obj = { value: 0 }
    
    const tl = gsap.timeline({
      onComplete: () => {
        setStage('ready')
      }
    })

    tl.to(obj, {
      value: 100,
      duration: duration,
      ease: 'power1.out',
      onUpdate: () => {
        setProgress(Math.floor(obj.value))
      }
    })

    // Infinite rotation of the loading arc during loading
    if (loadingArcRef.current) {
      gsap.to(loadingArcRef.current, {
        rotation: 360,
        transformOrigin: 'center',
        duration: 2.5,
        repeat: -1,
        ease: 'none'
      })
    }

    return () => {
      tl.kill()
      // Enable scrolling
      document.body.style.overflow = originalOverflow
      document.body.style.height = originalHeight
    }
  }, [])

  // 2. Transition from 'loading' to 'ready'
  useEffect(() => {
    if (stage === 'ready') {
      const tl = gsap.timeline()

      // Fade out loading arc
      if (loadingArcRef.current) {
        tl.to(loadingArcRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out'
        }, 0)
      }

      // Expand surrounding circles to their final positions (distance = R)
      const distObj = { val: R * 0.25, opacity: 0.08 }
      tl.to(distObj, {
        val: R,
        opacity: 0.22,
        duration: 1.8,
        ease: 'power3.out',
        onUpdate: () => {
          setDistance(distObj.val)
          setOuterOpacity(distObj.opacity)
        }
      }, 0.2)

      // Animate central circle to be slightly more defined
      if (centralCircleRef.current) {
        tl.to(centralCircleRef.current, {
          stroke: 'rgba(255, 255, 255, 0.75)',
          strokeWidth: 1.2,
          duration: 1.2
        }, 0.2)
      }

      // Fade in the Enter text
      if (textRef.current) {
        tl.fromTo(textRef.current, 
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' },
          0.8
        )
      }
    }
  }, [stage])

  // Handle click to enter
  const handleEnter = () => {
    if (stage !== 'ready') return
    setStage('entering')

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete()
      }
    })

    // Fade out text immediately
    if (textRef.current) {
      tl.to(textRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: 'power2.in'
      }, 0)
    }

    // Expand outer circles far away and fade them
    const distObj = { val: distance, opacity: outerOpacity }
    tl.to(distObj, {
      val: R * 3.5,
      opacity: 0,
      duration: 1.8,
      ease: 'power3.inOut',
      onUpdate: () => {
        setDistance(distObj.val)
        setOuterOpacity(distObj.opacity)
      }
    }, 0)

    // Scale up central circle and fade
    if (centralCircleRef.current) {
      tl.to(centralCircleRef.current, {
        scale: 3.0,
        transformOrigin: 'center',
        opacity: 0,
        duration: 1.5,
        ease: 'power3.inOut'
      }, 0)
    }

    // Scale and fade the whole SVG container
    if (svgRef.current) {
      tl.to(svgRef.current, {
        scale: 1.4,
        opacity: 0,
        duration: 1.6,
        ease: 'power3.inOut'
      }, 0)
    }

    // Fade out preloader overlay
    if (containerRef.current) {
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: 'power3.inOut'
      }, 0.3)
    }
  }

  // Calculate coordinates for surrounding circles
  const surroundingCircles = Array.from({ length: circleCount }).map((_, i) => {
    const angle = (i * 2 * Math.PI) / circleCount
    const cx = distance * Math.cos(angle)
    const cy = distance * Math.sin(angle)
    return { cx, cy, id: i }
  })

  // SVG loading arc attributes
  const arcRadius = R
  const strokeDash = 2 * Math.PI * arcRadius
  const strokeOffset = strokeDash - (progress / 100) * strokeDash

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none transition-colors duration-1000 ${
        stage === 'ready' || stage === 'entering'
          ? 'bg-gradient-to-tr from-[#0b243b] via-[#103a55] to-[#1a5b7c]'
          : 'bg-gradient-to-tr from-[#030e1d] via-[#05182d] to-[#0e2a4a]'
      }`}
      style={{
        transition: 'background 1.5s ease-in-out'
      }}
    >
      <div className="relative w-full max-w-[700px] aspect-square flex items-center justify-center">
        {/* SVG Geometry */}
        <svg
          ref={svgRef}
          viewBox="-250 -250 500 500"
          className="w-full h-full max-h-[85vh] pointer-events-none"
        >
          {/* Faded background circles */}
          {surroundingCircles.map((c) => (
            <circle
              key={c.id}
              cx={c.cx}
              cy={c.cy}
              r={R}
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="0.6"
              fill="none"
              style={{
                opacity: outerOpacity,
                transition: 'opacity 0.3s ease'
              }}
            />
          ))}

          {/* Central main circle */}
          <circle
            ref={centralCircleRef}
            cx="0"
            cy="0"
            r={R}
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="0.8"
            fill="none"
          />

          {/* Loading arc overlay */}
          {stage === 'loading' && (
            <circle
              ref={loadingArcRef}
              cx="0"
              cy="0"
              r={R}
              stroke="#ffffff"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray={strokeDash}
              strokeDashoffset={strokeOffset}
              strokeLinecap="round"
              className="origin-center"
            />
          )}
        </svg>

        {/* Enter Trigger & Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto">
          {stage === 'loading' && (
            <div className="text-white/40 font-light tracking-[0.2em] text-[10px] uppercase font-sans">
              LOADING {progress}%
            </div>
          )}

          {stage === 'ready' && (
            <button
              ref={textRef}
              onClick={handleEnter}
              className="group relative flex items-center justify-center w-[160px] h-[160px] rounded-full cursor-pointer border border-transparent focus:outline-none"
            >
              {/* Pulse ripple inside the click target */}
              <span className="absolute inset-0 rounded-full bg-white/[0.03] scale-90 group-hover:scale-100 transition-transform duration-700 ease-out" />
              
              <span className="text-white text-[10px] tracking-[0.3em] font-light uppercase group-hover:text-white group-hover:scale-105 transition-all duration-300 font-sans">
                CLICK TO ENTER
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Decorative Brand watermark at the bottom */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 tracking-[0.4em] text-[8px] font-sans pointer-events-none uppercase">
        Amaterasu Lab
      </div>
    </div>
  )
}
