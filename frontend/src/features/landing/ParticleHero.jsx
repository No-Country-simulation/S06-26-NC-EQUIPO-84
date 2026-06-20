import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function ParticleField() {
  const pointsRef = useRef()
  const mouse = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  const count = 900

  const [positions, basePositions, speeds] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const basePositions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 16
      const y = (Math.random() - 0.5) * 9
      const z = (Math.random() - 0.5) * 6
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      basePositions[i * 3] = x
      basePositions[i * 3 + 1] = y
      basePositions[i * 3 + 2] = z
      speeds[i] = 0.2 + Math.random() * 0.6
    }
    return [positions, basePositions, speeds]
  }, [count])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const posAttr = pointsRef.current.geometry.attributes.position
    const arr = posAttr.array

    for (let i = 0; i < count; i++) {
      const ix = i * 3
      const iy = i * 3 + 1
      const iz = i * 3 + 2

      const bx = basePositions[ix]
      const by = basePositions[iy]
      const bz = basePositions[iz]

      const drift = Math.sin(t * speeds[i] + i) * 0.25

      const dx = bx - mouse.current.x * 5
      const dy = by - mouse.current.y * 3
      const dist = Math.sqrt(dx * dx + dy * dy)
      const repel = Math.max(0, 1 - dist / 3) * 0.8

      arr[ix] = bx + drift * 0.3 + dx * repel * 0.15
      arr[iy] = by + drift + dy * repel * 0.15
      arr[iz] = bz + Math.cos(t * speeds[i]) * 0.2
    }

    posAttr.needsUpdate = true
    pointsRef.current.rotation.y = t * 0.02
  })

  useFrame((state) => {
    const { pointer } = state
    mouse.current.x = pointer.x * (viewport.width / 2)
    mouse.current.y = pointer.y * (viewport.height / 2)
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#9B82FF"
        transparent
        opacity={0.75}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export function ParticleHero() {
  return (
    <div className="absolute inset-0 -z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ParticleField />
      </Canvas>
    </div>
  )
}
