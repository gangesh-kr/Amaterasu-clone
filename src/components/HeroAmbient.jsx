import React, { useState, useRef, useEffect } from 'react'

/**
 * HeroAmbient — Decorative elements: scroll label, sound toggle button,
 * vertical decorative line, and ambient dots.
 */
export default function HeroAmbient({ style }) {
  const [soundActive, setSoundActive] = useState(false)
  const waveRef = useRef(null)

  // Animate the sound wave lines
  useEffect(() => {
    if (!waveRef.current) return
    const lines = waveRef.current.querySelectorAll('.sound-line')
    if (!soundActive) {
      lines.forEach(line => {
        line.style.transform = 'scaleY(0.15)'
      })
      return
    }

    // Randomized pulsing animation for each line
    const intervals = []
    lines.forEach((line, i) => {
      const animate = () => {
        const scale = 0.2 + Math.random() * 0.8
        line.style.transform = `scaleY(${scale})`
      }
      animate()
      intervals.push(setInterval(animate, 150 + i * 40))
    })

    return () => intervals.forEach(clearInterval)
  }, [soundActive])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        pointerEvents: 'none',
        ...style,
      }}
    >
      {/* Bottom-left: Scroll to explore label */}
      <div
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '36px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          fontSize: '9px',
          letterSpacing: '0.3em',
          color: '#fff',
          opacity: 0.4,
          userSelect: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span>SCROLL TO EXPLORE</span>
        <span style={{ transform: 'translateY(1px)' }}>↓</span>
      </div>

      {/* Bottom-right: Sound toggle button */}
      <button
        aria-label={soundActive ? 'Mute sound' : 'Enable sound'}
        style={{
          position: 'absolute',
          bottom: '28px',
          right: '36px',
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          background: 'transparent',
          cursor: 'pointer',
          transition: 'border-color 300ms ease, transform 300ms ease',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'}
        onClick={() => setSoundActive(prev => !prev)}
      >
        {/* Sound wave bars */}
        <div
          ref={waveRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.5px',
            height: '18px',
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="sound-line"
              style={{
                display: 'block',
                width: '2px',
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '1px',
                transform: 'scaleY(0.15)',
                transition: 'transform 0.15s ease',
                transformOrigin: 'center center',
              }}
            />
          ))}
        </div>
      </button>

      {/* Decorative vertical line — centered */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '1px',
          background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, rgba(255,255,255,0) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Ambient dots */}
      <span className="ambient-dot" style={{ top: '12%', left: '18%' }} />
      <span className="ambient-dot" style={{ top: '8%', left: '28%', opacity: 0.2 }} />
      <span className="ambient-dot" style={{ top: '22%', left: '11%', opacity: 0.25 }} />
    </div>
  )
}
