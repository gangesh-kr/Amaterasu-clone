import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/MethodologySection.css'

gsap.registerPlugin(ScrollTrigger)

/* ──────────────────────────────────────────────
   3D Triangle Mesh — driven by a shared progress ref
   ────────────────────────────────────────────── */
function TriangleMesh({ progressRef, visibleRef, inView }) {
  const meshRef = useRef()
  const matRef = useRef()
  const idleTime = useRef(0)

  // Build a flat extruded triangle geometry with vertex colors
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    const s = 2.2
    shape.moveTo(0, s * 1.0)
    shape.lineTo(-s * 0.866, -s * 0.5)
    shape.lineTo(s * 0.866, -s * 0.5)
    shape.closePath()

    const extrudeSettings = { depth: 0.25, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 3 }
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    geo.center()

    // Apply vertex colors for gradient (blue top → cyan bottom)
    const count = geo.attributes.position.count
    const colors = new Float32Array(count * 3)
    const posArr = geo.attributes.position.array
    let minY = Infinity, maxY = -Infinity
    for (let i = 0; i < count; i++) {
      const y = posArr[i * 3 + 1]
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
    const topColor = new THREE.Color('#1a3a8f')
    const bottomColor = new THREE.Color('#38bcd8')
    for (let i = 0; i < count; i++) {
      const y = posArr[i * 3 + 1]
      const t = (y - minY) / (maxY - minY || 1)
      const c = topColor.clone().lerp(bottomColor, 1 - t)
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [])

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.3, -2),     // 0: Behind text (pushed back in Z)
      new THREE.Vector3(-1.5, 0.9, -0.5),// 1: Emerge and swing left
      new THREE.Vector3(0, 0.7, 0)       // 2: Land at Top Triforce position
    ], false, 'centripetal', 0.5)
  }, [])

  useFrame((state, delta) => {
    if (!meshRef.current) return
    if (!inView) return // Do not compute math if not in view
    idleTime.current += delta

    const p = progressRef.current || 0
    const vis = visibleRef.current !== undefined ? visibleRef.current : 1

    // Idle gentle Y rotation
    const idleRotY = idleTime.current * 0.15

    // Track the SVG dot position in 3D space
    if (p < 0.7) {
      // Dramatic rotation based on progress
      const rotProgress = Math.min(p / 0.7, 1)
      const ease = rotProgress * rotProgress * (3 - 2 * rotProgress) // Smoothstep

      // Get position along curve
      const pos = curve.getPoint(ease)
      meshRef.current.position.copy(pos)

      // Rotations
      meshRef.current.rotation.x = rotProgress * Math.PI * 2
      meshRef.current.rotation.y = idleRotY + (rotProgress * Math.PI * 2)
      meshRef.current.rotation.z = -Math.PI / 2 + (rotProgress * Math.PI / 2)
      
      // Scale: starts at 0, grows to 0.35, stays at 0.35
      meshRef.current.scale.setScalar(Math.min(ease * 1.5, 0.35))
    } else {
      // Phase 3: Settle at Top Triforce position then fade out via opacity
      const t3 = (p - 0.7) / 0.3
      meshRef.current.position.x = 0
      meshRef.current.position.y = 0.7
      meshRef.current.rotation.x = 0
      meshRef.current.rotation.y = idleRotY + Math.PI * 2
      meshRef.current.rotation.z = 0
      meshRef.current.scale.setScalar(0.35) // Stay at scale 0.35 while fading
    }

    // Opacity via material
    if (matRef.current) {
      matRef.current.opacity = vis
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        ref={matRef}
        vertexColors
        transparent
        opacity={1}
        roughness={0.35}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

/* ──────────────────────────────────────────────
   Triforce Data
   ────────────────────────────────────────────── */
const TRIFORCE_DATA = [
  {
    id: 'quantum',
    label: 'OUR MIND,',
    label2: 'A QUANTUM WORLD',
    sup: '1',
    detail: {
      number: '01',
      title: 'Our Mind, A Quantum World',
      body: 'The human mind operates in ways that mirror quantum phenomena — superposition of thoughts, entanglement of emotions, and probabilistic decision-making. Amaterasu harnesses quantum computing frameworks to model these non-linear mental processes, enabling a depth of understanding that classical approaches cannot achieve. By treating consciousness as a quantum system, we unlock pathways to personalized interventions that resonate with the fundamental nature of thought itself.'
    }
  },
  {
    id: 'entropy',
    label: 'BEAUTY IN',
    label2: "NATURE'S ENTROPY",
    sup: '2',
    detail: {
      number: '02',
      title: "Beauty in Nature's Entropy",
      body: 'Nature thrives through entropy — the creative disorder that drives evolution and adaptation. Our methodology embraces this principle, recognizing that mental health is not a static destination but a dynamic, ever-evolving process. By modeling the beautiful chaos inherent in natural systems, we create therapeutic approaches that are as fluid and adaptive as life itself, moving beyond rigid categorical frameworks toward organic healing.'
    }
  },
  {
    id: 'clinical',
    label: 'APPLIED CLINICAL',
    label2: 'BEST PRACTICES',
    sup: '3',
    detail: {
      number: '03',
      title: 'Applied Clinical Best Practices',
      body: 'While our technology pushes boundaries, our clinical foundations remain rooted in evidence-based practices. We integrate established therapeutic frameworks — cognitive behavioral therapy, dialectical behavior therapy, and psychodynamic approaches — with our quantum-inspired computational models. This synthesis ensures that every innovation is clinically validated, ethically grounded, and designed to deliver measurable outcomes in real-world mental health care settings.'
    }
  }
]


/* ──────────────────────────────────────────────
   Main Component
   ────────────────────────────────────────────── */
export default function MethodologySection() {
  const containerRef = useRef(null)
  const progressRef = useRef(0)
  const triangleVisRef = useRef(1)

  // Phase 1 refs
  const headingLayerRef = useRef(null)
  const topLabelRef = useRef(null)
  const mainHeadingRef = useRef(null)
  const frontierBlockRef = useRef(null)

  // Phase 3 refs
  const triforceLayerRef = useRef(null)
  const triforceTrianglesRef = useRef([])

  // Nav refs
  const progressFillRef = useRef(null)
  const dotIndicatorRef = useRef(null)
  const chevronIconRef = useRef(null)

  // Detail panel
  const [inView, setInView] = useState(false)
  const [activeDetail, setActiveDetail] = useState(null)

  const openDetail = useCallback((data) => {
    setActiveDetail(data)
  }, [])

  const closeDetail = useCallback(() => {
    setActiveDetail(null)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Setup Intersection Observer to toggle WebGL frameloop
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { root: null, rootMargin: '100px', threshold: 0 }
    )
    observer.observe(el)

    const ctx = gsap.context(() => {

      // Master pinned timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=300%',
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            progressRef.current = self.progress

            // Update progress bar
            if (progressFillRef.current) {
              progressFillRef.current.style.width = `${self.progress * 100}%`
            }

            // Update chevron direction
            if (chevronIconRef.current) {
              if (self.progress > 0.8) {
                chevronIconRef.current.style.transform = 'rotate(180deg)'
              } else {
                chevronIconRef.current.style.transform = 'rotate(0deg)'
              }
            }

            // Update dot indicator position
            if (dotIndicatorRef.current) {
              const yPos = 35 + self.progress * 40
              dotIndicatorRef.current.style.top = `${yPos}%`
            }
          }
        }
      })

      // ── Phase 1 Hold (0 → 0.3) ──
      // Heading layer visible, text fade in
      tl.fromTo(topLabelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0
      )
      tl.fromTo(mainHeadingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        0.1
      )
      tl.fromTo(frontierBlockRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        0.3
      )

      // Hold phase 1
      tl.to({}, { duration: 1 }, 0.8)

      // ── Phase 2 Transition (0.3 → 0.7) ──
      // Fade out heading content with parallax up
      tl.to(headingLayerRef.current, {
        opacity: 0,
        y: -80,
        duration: 1.2,
        ease: 'power2.in'
      }, 1.8)

      tl.to(frontierBlockRef.current, {
        opacity: 0,
        y: -60,
        duration: 1,
        ease: 'power2.in'
      }, 1.8)

      // 3D triangle visibility stays 1 through phase 2 (controlled by useFrame)

      // ── Phase 3: Triforce Reveal (0.7 → 1.0) ──
      // Fade out 3D triangle
      tl.to(triangleVisRef, {
        current: 0,
        duration: 0.8,
        ease: 'power2.in'
      }, 4.5)

      // Fade in triforce layer
      tl.to(triforceLayerRef.current, {
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out'
      }, 5)

      // Stagger in each triangle
      triforceTrianglesRef.current.forEach((triRef, i) => {
        if (!triRef) return
        tl.fromTo(triRef,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power2.out'
          },
          5.2 + i * 0.3
        )
      })

      // Hold triforce visible
      tl.to({}, { duration: 1.5 }, 6.5)

    }, containerRef)

    return () => {
      observer.disconnect()
      ctx.revert()
    }
  }, [])

  return (
    <section id="methodology-section" ref={containerRef} className="methodology-section">

      {/* Chevron button */}
      <button
        className="methodology-chevron-btn"
        onClick={() => {
          const nextSection = containerRef.current?.nextElementSibling
          if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        <svg
          ref={chevronIconRef}
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="1.5"
          style={{ transition: 'transform 0.3s ease' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* ── 3D Canvas Layer ── */}
      <div className="methodology-canvas-wrapper">
        {/* Only run frameloop when the section is in viewport */}
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
          frameloop={inView ? "always" : "demand"}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
          <directionalLight position={[-3, -2, 4]} intensity={0.3} color="#87ceeb" />
          <TriangleMesh progressRef={progressRef} visibleRef={triangleVisRef} inView={inView} />
        </Canvas>
      </div>

      {/* ── Phase 1: Heading + Frontier Tech ── */}
      <div ref={headingLayerRef} className="methodology-heading-layer">
        <h2 ref={mainHeadingRef} className="methodology-main-heading">
          Innovating<br />the future of<br />mental health
        </h2>
      </div>

      <div ref={frontierBlockRef} className="methodology-frontier-block" style={{ opacity: 0 }}>
        <div className="methodology-frontier-label">
          <div className="dot" />
          <span>FRONTIER TECHNOLOGIES</span>
        </div>
        <p className="methodology-frontier-text">
          Amaterasu pioneers research at the intersection of quantum computing, neuroscience, and non-linear dynamics towards a frontier pushing mental health care ecosystem. We leverage nature to deliver a degree of personalized mental health care not yet seen before.
        </p>
      </div>

      {/* ── Phase 3: Triforce Layout ── */}
      <div ref={triforceLayerRef} className="methodology-triforce-layer">
        <div className="methodology-triforce-container">

          {/* ── SVG Defs for Hover Gradients ── */}
          <svg width="0" height="0" className="absolute">
            <defs>
              <linearGradient id="triHoverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1a3a8f" />
                <stop offset="100%" stopColor="#38bcd8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Top Triangle */}
          <div
            ref={el => { triforceTrianglesRef.current[0] = el }}
            className="triforce-triangle triforce-top"
            onClick={() => openDetail(TRIFORCE_DATA[0].detail)}
            style={{ opacity: 0 }}
          >
            <svg width="100%" height="100%" viewBox="0 0 300 260" preserveAspectRatio="xMidYMid meet">
              {/* Fill layer (visible on hover) */}
              <polygon className="triforce-fill" points="150,15 285,245 15,245" fill="url(#triHoverGradient)" />
              {/* Hollow Outline layer */}
              <polygon className="triforce-outline" points="150,15 285,245 15,245" strokeLinejoin="round" />
              {/* Hover Center Icon */}
              <g className="triforce-hover-icon">
                <circle cx="150" cy="155" r="30" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                <circle cx="150" cy="155" r="2.5" fill="#1a1a5e" />
              </g>
            </svg>
            <div className="triforce-label">
              <div>
                <div className="triforce-label-text">
                  {TRIFORCE_DATA[0].label}<br />{TRIFORCE_DATA[0].label2}<sup>{TRIFORCE_DATA[0].sup}</sup>
                </div>
              </div>
              <div className="triforce-expand-btn">+</div>
            </div>
          </div>

          {/* Bottom Left Triangle */}
          <div
            ref={el => { triforceTrianglesRef.current[1] = el }}
            className="triforce-triangle triforce-bottom-left"
            onClick={() => openDetail(TRIFORCE_DATA[1].detail)}
            style={{ opacity: 0 }}
          >
            <svg width="100%" height="100%" viewBox="0 0 300 260" preserveAspectRatio="xMidYMid meet">
              <polygon className="triforce-fill" points="150,15 285,245 15,245" fill="url(#triHoverGradient)" />
              <polygon className="triforce-outline" points="150,15 285,245 15,245" strokeLinejoin="round" />
              <g className="triforce-hover-icon">
                <circle cx="150" cy="155" r="30" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                <circle cx="150" cy="155" r="2.5" fill="#1a1a5e" />
              </g>
            </svg>
            <div className="triforce-label">
              <div>
                <div className="triforce-label-text">
                  {TRIFORCE_DATA[1].label}<br />{TRIFORCE_DATA[1].label2}<sup>{TRIFORCE_DATA[1].sup}</sup>
                </div>
              </div>
              <div className="triforce-expand-btn">+</div>
            </div>
          </div>

          {/* Bottom Right Triangle */}
          <div
            ref={el => { triforceTrianglesRef.current[2] = el }}
            className="triforce-triangle triforce-bottom-right"
            onClick={() => openDetail(TRIFORCE_DATA[2].detail)}
            style={{ opacity: 0 }}
          >
            <svg width="100%" height="100%" viewBox="0 0 300 260" preserveAspectRatio="xMidYMid meet">
              <polygon className="triforce-fill" points="150,15 285,245 15,245" fill="url(#triHoverGradient)" />
              <polygon className="triforce-outline" points="150,15 285,245 15,245" strokeLinejoin="round" />
              <g className="triforce-hover-icon">
                <circle cx="150" cy="155" r="30" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                <circle cx="150" cy="155" r="2.5" fill="#1a1a5e" />
              </g>
            </svg>
            <div className="triforce-label">
              <div>
                <div className="triforce-label-text">
                  {TRIFORCE_DATA[2].label}<br />{TRIFORCE_DATA[2].label2}<sup>{TRIFORCE_DATA[2].sup}</sup>
                </div>
              </div>
              <div className="triforce-expand-btn">+</div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Detail Panel Overlay ── */}
      <div className={`methodology-detail-overlay ${activeDetail ? 'active' : ''}`}>
        <div className="methodology-detail-backdrop" onClick={closeDetail} />
        <div className="methodology-detail-panel">
          <button className="methodology-detail-close" onClick={closeDetail}>✕</button>
          {activeDetail && (
            <>
              <span className="methodology-detail-number">{activeDetail.number}</span>
              <h3 className="methodology-detail-title">{activeDetail.title}</h3>
              <p className="methodology-detail-body">{activeDetail.body}</p>
            </>
          )}
        </div>
      </div>

    </section>
  )
}
