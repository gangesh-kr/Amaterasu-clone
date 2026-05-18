import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ParticleField({ color, count, speed, radiusRange, rotateDir = 1 }) {
  const pointsRef = useRef()

  // Generate particle positions distributed in a premium wave/spherical structure
  const [positions, initialY] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const initY = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2.0 * Math.PI
      const phi = Math.acos(2.0 * Math.random() - 1.0)
      
      // Radius distribution with variance
      const r = radiusRange[0] + Math.random() * (radiusRange[1] - radiusRange[0])
      
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)
      
      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
      initY[i] = y
    }
    return [pos, initY]
  }, [count, radiusRange])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const scrollY = window.scrollY

    // Rotate points slowly, reacting to scroll speed
    pointsRef.current.rotation.y = rotateDir * (time * speed * 0.5 + scrollY * 0.0003)
    pointsRef.current.rotation.x = rotateDir * (time * speed * 0.2)

    // Breathe effect: wave modulation on position attributes
    const positionsArray = pointsRef.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      const x = positionsArray[i * 3]
      const z = positionsArray[i * 3 + 2]
      
      // Calculate complex wave height
      positionsArray[i * 3 + 1] = 
        initialY[i] + 
        Math.sin(time * speed + x * 0.4) * 0.4 + 
        Math.cos(time * speed + z * 0.3) * 0.4
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 opacity-40">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        
        {/* Colorful background glows */}
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00D4CC" />
        <pointLight position={[-10, -10, -10]} intensity={1.0} color="#7b2cbf" />
        
        {/* Blue/Cyan core particles */}
        <ParticleField 
          color="#00D4CC" 
          count={1000} 
          speed={0.12} 
          radiusRange={[3, 7]} 
          rotateDir={1} 
        />
        
        {/* Purple/Violet outer dust particles */}
        <ParticleField 
          color="#aa55ff" 
          count={800} 
          speed={0.08} 
          radiusRange={[5, 10]} 
          rotateDir={-1} 
        />
      </Canvas>
    </div>
  )
}
