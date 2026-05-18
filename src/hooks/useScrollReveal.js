import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * A reusable hook to apply a fade-up animation to elements as they scroll into view.
 *
 * @param {Object} options - Customization options
 * @param {number} options.y - The vertical distance to slide up from (default: 40)
 * @param {number} options.duration - Animation duration in seconds (default: 1.2)
 * @param {number} options.delay - Delay before animation starts (default: 0)
 * @param {string} options.stagger - If the ref points to a container with multiple children, this staggers their animation (default: 0)
 * @param {string} options.start - ScrollTrigger start position (default: "top 85%")
 * @returns {React.MutableRefObject} A ref to attach to the target element
 */
export default function useScrollReveal({
  y = 40,
  duration = 1.2,
  delay = 0,
  stagger = 0,
  start = 'top 85%',
} = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If stagger is provided, we assume the children of this ref should be animated
    const target = stagger ? el.children : el

    const ctx = gsap.context(() => {
      gsap.fromTo(
        target,
        {
          opacity: 0,
          y: y,
        },
        {
          opacity: 1,
          y: 0,
          duration: duration,
          delay: delay,
          stagger: stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: start,
            toggleActions: 'play none none reverse', // Play on enter, reverse on leave back
          },
        }
      )
    }, el)

    return () => ctx.revert() // Cleanup GSAP animations on unmount
  }, [y, duration, delay, stagger, start])

  return ref
}
