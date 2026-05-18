import React from 'react'

/**
 * HeroAmbient — Decorative elements: scroll label, chevron button,
 * and ambient dots. (Circle cursor removed, as it's now an actual tracking cursor).
 */
export default function HeroAmbient({ style }) {
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

      {/* Bottom-right: Chevron down button */}
      <button
        className="chevron-btn"
        aria-label="Scroll down"
        style={{
          position: 'absolute',
          bottom: '28px',
          right: '36px',
          pointerEvents: 'auto',
        }}
        onClick={() => {
          window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M4 6L8 10L12 6"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Decorative vertical line */}
      <div
        style={{
          position: 'absolute',
          left: '56%',
          top: 0,
          bottom: 0,
          width: '2px',
          background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, rgba(255,255,255,0) 100%)',
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
