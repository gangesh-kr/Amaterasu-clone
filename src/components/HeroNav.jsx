import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * HeroNav — Global fixed top navigation bar with scroll tracker and menu toggle.
 * Adapts its color (white/indigo-blue) dynamically based on active background theme.
 */
export default function HeroNav({ style }) {
  const [isHovered, setIsHovered] = useState(false)
  const [theme, setTheme] = useState('dark') // 'light' (indigo-blue) or 'dark' (white)
  const progressBarRef = useRef(null)

  // 1. Bulletproof real-time scroll progress tracker that works perfectly with dynamic pins & heights
  useEffect(() => {
    const el = progressBarRef.current
    if (!el) return

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      
      // Directly manipulate the style transform to avoid state-triggering re-renders ( compositor fast-path )
      el.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    
    // Run initially and set a staggered delay to capture Lenis and layout pinning offsets
    updateProgress()
    const t1 = setTimeout(updateProgress, 100)
    const t2 = setTimeout(updateProgress, 1000)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  // 2. Navigation theme color switching based on scroll position
  useEffect(() => {
    const handleTheme = () => {
      try {
        const checkY = 50
        let isLight = false

        const visionSec = document.getElementById('vision-section')
        if (visionSec) {
          const rect = visionSec.getBoundingClientRect()
          if (rect.top <= checkY && rect.bottom >= checkY) {
            isLight = true
          }
        }

        const natureSec = document.getElementById('nature-section')
        if (natureSec) {
          const rect = natureSec.getBoundingClientRect()
          if (rect.top <= checkY && rect.bottom >= checkY) {
            const overlay = document.getElementById('nature-overlay-bg')
            if (overlay) {
              const opacity = parseFloat(window.getComputedStyle(overlay).opacity || '0')
              if (opacity < 0.5) {
                isLight = true
              }
            } else {
              isLight = true
            }
          }
        }

        setTheme(isLight ? 'light' : 'dark')
      } catch (err) {
        console.error("Error in theme observer:", err)
      }
    }

    window.addEventListener('scroll', handleTheme, { passive: true })
    window.addEventListener('resize', handleTheme)
    handleTheme() // Initial run

    return () => {
      window.removeEventListener('scroll', handleTheme)
      window.removeEventListener('resize', handleTheme)
    }
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '36px 36px',
        zIndex: 50,
        pointerEvents: 'none',
        ...style,
      }}
    >
      {/* Centre — AMATERASU */}
      <div 
        style={{ 
          position: 'absolute', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          pointerEvents: 'auto',
          marginTop: '6px'
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: '16px',
            letterSpacing: '0.3em',
            color: theme === 'light' ? '#4B3FC3' : '#fff',
            transition: 'color 0.3s ease',
          }}
        >
          AMATERASU
        </span>
      </div>

      {/* Right — VISION/MENU + Scroll Tracker + Dot Grid */}
      <div
        style={{
          position: 'absolute',
          right: '36px',
          width: '280px',
          display: 'flex',
          flexDirection: 'column',
          pointerEvents: 'auto',
          gap: '16px',
          cursor: 'pointer',
          marginTop: '6px'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Scroll Tracker Line */}
        <div 
          style={{ 
            width: '100%', 
            height: '1px', 
            background: theme === 'light' ? 'rgba(75, 63, 195, 0.2)' : 'rgba(255,255,255,0.2)', 
            position: 'relative',
            transition: 'background 0.3s ease'
          }}
        >
          <div 
            ref={progressBarRef}
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              bottom: 0, 
              width: '100%', 
              transform: 'scaleX(0)',
              transformOrigin: 'left center',
              background: theme === 'light' ? '#4B3FC3' : '#fff',
              transition: 'background 0.3s ease'
            }} 
          />
        </div>

        {/* Vision and Grid at both ends */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '10px',
              letterSpacing: '0.25em',
              color: theme === 'light' ? '#4B3FC3' : '#fff',
              transition: 'color 0.3s ease, opacity 0.3s ease',
            }}
          >
            {isHovered ? 'MENU' : 'VISION'}
          </span>

          {/* 3×3 Dot Grid Icon */}
          <div
            aria-label="Menu"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 3px)',
              gridTemplateRows: 'repeat(3, 3px)',
              gap: '4px',
            }}
          >
            {Array.from({ length: 9 }).map((_, i) => {
              // Indices for 3x3 grid:
              // 0 1 2
              // 3 4 5
              // 6 7 8
              // Dots to fade out for '5-dice' shape: 1, 3, 5, 7
              const isFadeDot = i === 1 || i === 3 || i === 5 || i === 7;
              return (
                <span
                  key={i}
                  style={{
                    display: 'block',
                    width: '3px',
                    height: '3px',
                    backgroundColor: theme === 'light' ? 'rgba(75, 63, 195, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '50%',
                    opacity: isHovered && isFadeDot ? 0 : 1,
                    transition: 'opacity 0.3s ease, background-color 0.3s ease',
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
