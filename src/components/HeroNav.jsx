import React from 'react'

/**
 * HeroNav — Top navigation bar with centered logo and right-aligned links/menu.
 */
export default function HeroNav({ style }) {
  return (
    <nav
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        padding: '36px 36px',
        zIndex: 20,
        pointerEvents: 'none',
        ...style,
      }}
    >
      {/* Centre — AMATERASU */}
      <div style={{ pointerEvents: 'auto' }}>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: '11px',
            letterSpacing: '0.3em',
            color: '#fff',
          }}
        >
          AMATERASU
        </span>
      </div>

      {/* Right — VISION + Dot grid */}
      <div
        style={{
          position: 'absolute',
          right: '36px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          pointerEvents: 'auto',
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: '9px',
            letterSpacing: '0.25em',
            color: '#fff',
          }}
        >
          VISION
        </span>

        {/* Separator Line */}
        <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.4)' }} />

        {/* 3×3 Dot Grid Icon */}
        <button
          aria-label="Menu"
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 3px)',
            gridTemplateRows: 'repeat(3, 3px)',
            gap: '3px',
          }}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '3px',
                height: '3px',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '50%',
              }}
            />
          ))}
        </button>
      </div>
    </nav>
  )
}
