"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import * as THREE from "three"

interface Props {
  magnetSpeed: number
  coilTurns: number
  magnetStrength: number
  isPlaying: boolean
}

function Magnet({ position, magnetStrength }: { position: [number, number, number]; magnetStrength: number }) {
  return (
    <group position={position}>
      {/* North pole (red) */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.8, 32]} />
        <meshStandardMaterial color="#ef4444" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* South pole (blue) */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.8, 32]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Label N */}
      <mesh position={[0.35, 0.4, 0]}>
        <boxGeometry args={[0.02, 0.2, 0.15]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {/* Magnetic field lines */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.5, 0, Math.sin(angle) * 0.5]} rotation={[0, 0, angle]}>
            <torusGeometry args={[0.6, 0.02, 8, 32, Math.PI]} />
            <meshStandardMaterial
              color="#a855f7"
              transparent
              opacity={0.3 + magnetStrength * 0.3}
              emissive="#a855f7"
              emissiveIntensity={0.2}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function Coil({ turns, emf }: { turns: number; emf: number }) {
  const coilColor = emf > 0 ? "#22c55e" : emf < 0 ? "#ef4444" : "#f59e0b"
  const glowIntensity = Math.abs(emf) / 10

  return (
    <group>
      {Array.from({ length: turns }).map((_, i) => (
        <mesh key={i} position={[0, (i - turns / 2) * 0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1, 0.04, 16, 64]} />
          <meshStandardMaterial
            color={coilColor}
            metalness={0.9}
            roughness={0.1}
            emissive={coilColor}
            emissiveIntensity={glowIntensity}
          />
        </mesh>
      ))}
      {/* Coil stand */}
      <mesh position={[0, (-turns * 0.15) / 2 - 0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 0.5, 32]} />
        <meshStandardMaterial color="#64748b" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, (-turns * 0.15) / 2 - 0.8, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
        <meshStandardMaterial color="#334155" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  )
}

function Electrons({ emf, coilTurns }: { emf: number; coilTurns: number }) {
  const electronsRef = useRef<THREE.Group>(null)
  const electronCount = 20

  useFrame((state) => {
    if (electronsRef.current && Math.abs(emf) > 0.1) {
      electronsRef.current.rotation.y += emf * 0.01
    }
  })

  if (Math.abs(emf) < 0.1) return null

  return (
    <group ref={electronsRef}>
      {Array.from({ length: electronCount }).map((_, i) => {
        const angle = (i / electronCount) * Math.PI * 2
        const y = ((i % coilTurns) - coilTurns / 2) * 0.15
        return (
          <mesh key={i} position={[Math.cos(angle) * 1, y, Math.sin(angle) * 1]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.8} />
          </mesh>
        )
      })}
    </group>
  )
}

function GalvanometerNeedle({ emf }: { emf: number }) {
  const needleRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (needleRef.current) {
      const targetRotation = (emf / 10) * (Math.PI / 3)
      needleRef.current.rotation.z = THREE.MathUtils.lerp(needleRef.current.rotation.z, targetRotation, 0.1)
    }
  })

  return (
    <group position={[3, 0, 0]}>
      {/* Galvanometer body */}
      <mesh>
        <cylinderGeometry args={[0.8, 0.8, 0.3, 32]} />
        <meshStandardMaterial color="#1e293b" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Scale */}
      <mesh position={[0, 0, 0.16]}>
        <circleGeometry args={[0.7, 32]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      {/* Needle */}
      <mesh ref={needleRef} position={[0, 0, 0.2]}>
        <boxGeometry args={[0.6, 0.03, 0.02]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      {/* Center pin */}
      <mesh position={[0, 0, 0.22]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* Labels */}
      <mesh position={[-0.5, 0, 0.17]}>
        <boxGeometry args={[0.08, 0.02, 0.01]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      <mesh position={[0.5, 0, 0.17]}>
        <boxGeometry args={[0.08, 0.02, 0.01]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>
    </group>
  )
}

function Scene({ magnetSpeed, coilTurns, magnetStrength, isPlaying }: Props) {
  const magnetRef = useRef<THREE.Group>(null)
  const [magnetY, setMagnetY] = useState(0)
  const [emf, setEmf] = useState(0)
  const timeRef = useRef(0)
  const prevYRef = useRef(0)

  useFrame((state, delta) => {
    if (!isPlaying) return

    timeRef.current += delta * magnetSpeed
    const newY = Math.sin(timeRef.current) * 2

    // Calculate EMF based on rate of change of position (proxy for flux change)
    const dy = newY - prevYRef.current
    const calculatedEmf = -coilTurns * magnetStrength * dy * 5

    setMagnetY(newY)
    setEmf(calculatedEmf)
    prevYRef.current = newY
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <group ref={magnetRef}>
        <Magnet position={[0, magnetY, 0]} magnetStrength={magnetStrength} />
      </group>

      <Coil turns={coilTurns} emf={emf} />
      <Electrons emf={emf} coilTurns={coilTurns} />
      <GalvanometerNeedle emf={emf} />

      <OrbitControls enablePan={false} minDistance={4} maxDistance={12} />
      <Environment preset="studio" />
    </>
  )
}

export function EMInduction3D(props: Props) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl overflow-hidden">
      <Canvas camera={{ position: [5, 3, 5], fov: 50 }} gl={{ antialias: true }} dpr={[1, 2]}>
        <Scene {...props} />
      </Canvas>
    </div>
  )
}
