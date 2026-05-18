import { useRef, useEffect } from 'react'

/**
 * Tracks mouse position and returns a ref with normalised x/y values (-1 to 1).
 * Uses lerp for smooth interpolation — no re-renders.
 */
export default function useMouseParallax(smoothing = 0.04) {
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalise to -1…1 range
      targetRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      }
    }

    const animate = () => {
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * smoothing
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * smoothing
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [smoothing])

  return mouseRef
}
