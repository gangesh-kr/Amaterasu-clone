import React, { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const cursorStyle = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // We do NOT hide the default cursor. The user wants the default pointer 
    // to remain visible, while this custom cursor trails behind it.
    
    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY
      if (cursorRef.current) cursorRef.current.style.opacity = 1
    }
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    let rafId
    const animate = () => {
      // Lerp for the trailing effect (0.15 is smooth)
      cursorStyle.current.x += (mousePos.current.x - cursorStyle.current.x) * 0.15
      cursorStyle.current.y += (mousePos.current.y - cursorStyle.current.y) * 0.15

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorStyle.current.x}px, ${cursorStyle.current.y}px, 0)`
      }
      rafId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        transform: 'translate3d(-100px, -100px, 0)',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        willChange: 'transform'
      }}
    >
      {/* Outer Circle - slightly offset for organic feel, matching the reference */}
      <svg 
        width="44" 
        height="44" 
        viewBox="0 0 44 44" 
        fill="none" 
        style={{ 
          position: 'absolute', 
          left: '-22px', 
          top: '-22px', 
          opacity: 0.25 
        }}
      >
        <circle cx="22" cy="22" r="21" stroke="white" strokeWidth="0.5" />
      </svg>
      {/* Inner Dot */}
      <div 
        style={{ 
          position: 'absolute', 
          left: '-1.5px', 
          top: '-1.5px', 
          width: '3px', 
          height: '3px', 
          background: 'white', 
          borderRadius: '50%' 
        }} 
      />
    </div>
  )
}
