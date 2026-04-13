"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei"
import { Suspense, useRef, useMemo } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import type { Chemical } from "./chemicals-data"
import { getReaction } from "./chemicals-data"

interface ChemicalLab3DProps {
  chemical1: Chemical | null
  chemical2: Chemical | null
  isReacting: boolean
}

function Beaker({ position, color, label }: { position: [number, number, number]; color: string; label: string }) {
  return (
    <group position={position}>
      {/* Glass beaker */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.4, 0.35, 1, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.2}
          roughness={0.1}
          metalness={0.1}
          transmission={0.9}
          thickness={0.5}
        />
      </mesh>

      {/* Beaker rim */}
      <mesh position={[0, 1, 0]}>
        <torusGeometry args={[0.4, 0.02, 16, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Liquid inside */}
      {color && (
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.38, 0.33, 0.6, 32]} />
          <meshPhysicalMaterial
            color={color}
            transparent
            opacity={0.7}
            roughness={0.3}
            metalness={0.2}
            transmission={0.3}
          />
        </mesh>
      )}

      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.05, 32]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.3} roughness={0.1} metalness={0.1} />
      </mesh>
    </group>
  )
}

function ReactionParticles({
  position,
  type,
  intensity,
}: {
  position: [number, number, number]
  type: "explosion" | "bubbles" | "smoke" | "fire" | "fizz"
  intensity: number
}) {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = intensity * 500

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      if (type === "explosion") {
        positions[i3] = (Math.random() - 0.5) * 0.2
        positions[i3 + 1] = Math.random() * 0.2
        positions[i3 + 2] = (Math.random() - 0.5) * 0.2
        velocities[i3] = (Math.random() - 0.5) * 0.1
        velocities[i3 + 1] = Math.random() * 0.15 + 0.1
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.1
        colors[i3] = 1
        colors[i3 + 1] = Math.random() * 0.5
        colors[i3 + 2] = 0
      } else if (type === "bubbles") {
        positions[i3] = (Math.random() - 0.5) * 0.3
        positions[i3 + 1] = Math.random() * 0.1
        positions[i3 + 2] = (Math.random() - 0.5) * 0.3
        velocities[i3] = (Math.random() - 0.5) * 0.01
        velocities[i3 + 1] = Math.random() * 0.02 + 0.02
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.01
        colors[i3] = 0.8
        colors[i3 + 1] = 0.9
        colors[i3 + 2] = 1
      } else if (type === "smoke") {
        positions[i3] = (Math.random() - 0.5) * 0.4
        positions[i3 + 1] = Math.random() * 0.3
        positions[i3 + 2] = (Math.random() - 0.5) * 0.4
        velocities[i3] = (Math.random() - 0.5) * 0.02
        velocities[i3 + 1] = Math.random() * 0.03 + 0.03
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.02
        colors[i3] = 0.9
        colors[i3 + 1] = 0.9
        colors[i3 + 2] = 0.9
      } else if (type === "fire") {
        positions[i3] = (Math.random() - 0.5) * 0.3
        positions[i3 + 1] = Math.random() * 0.4
        positions[i3 + 2] = (Math.random() - 0.5) * 0.3
        velocities[i3] = (Math.random() - 0.5) * 0.02
        velocities[i3 + 1] = Math.random() * 0.08 + 0.05
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.02
        colors[i3] = 1
        colors[i3 + 1] = Math.random() * 0.5 + 0.5
        colors[i3 + 2] = 0
      } else {
        // fizz
        positions[i3] = (Math.random() - 0.5) * 0.2
        positions[i3 + 1] = Math.random() * 0.2
        positions[i3 + 2] = (Math.random() - 0.5) * 0.2
        velocities[i3] = (Math.random() - 0.5) * 0.015
        velocities[i3 + 1] = Math.random() * 0.03 + 0.01
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.015
        colors[i3] = 1
        colors[i3 + 1] = 1
        colors[i3 + 2] = 1
      }
    }

    return { positions, velocities, colors }
  }, [particleCount, type])

  useFrame((state, delta) => {
    if (!particlesRef.current) return

    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3] += particles.velocities[i3] * delta * 60
      positions[i3 + 1] += particles.velocities[i3 + 1] * delta * 60
      positions[i3 + 2] += particles.velocities[i3 + 2] * delta * 60

      if (positions[i3 + 1] > 3) {
        positions[i3] = particles.positions[i3]
        positions[i3 + 1] = particles.positions[i3 + 1]
        positions[i3 + 2] = particles.positions[i3 + 2]
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={particlesRef} position={position}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={particles.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={particles.colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={type === "smoke" ? 0.08 : type === "explosion" ? 0.05 : 0.03}
        vertexColors
        transparent
        opacity={type === "smoke" ? 0.6 : 0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function LabScene({ chemical1, chemical2, isReacting }: ChemicalLab3DProps) {
  const reaction = chemical1 && chemical2 ? getReaction(chemical1.id, chemical2.id) : null

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />
      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={8}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
      />

      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <directionalLight position={[-5, 3, -5]} intensity={0.5} />
      <pointLight position={[0, 3, 0]} intensity={isReacting ? 2 : 0.5} color={isReacting ? "#ff6600" : "#ffffff"} />

      {/* Lab table */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[8, 0.2, 4]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Beakers */}
      <Beaker position={[-1.2, 0, 0]} color={chemical1?.color || ""} label="Beaker 1" />
      <Beaker position={[1.2, 0, 0]} color={chemical2?.color || ""} label="Beaker 2" />

      {/* Reaction container (center) */}
      {isReacting && reaction && (
        <group position={[0, 0, 0]}>
          <Beaker
            position={[0, 0, 0]}
            color={
              reaction.type === "explosive"
                ? "#ff6600"
                : reaction.type === "neutralization"
                  ? "#90EE90"
                  : reaction.colorChange || "#ffffff"
            }
            label="Reaction"
          />

          {/* Reaction effects */}
          {reaction.intensity >= 4 && (
            <>
              <ReactionParticles position={[0, 0.8, 0]} type="explosion" intensity={reaction.intensity} />
              <ReactionParticles position={[0, 0.6, 0]} type="fire" intensity={reaction.intensity} />
            </>
          )}

          {reaction.gasProduced && reaction.intensity < 4 && (
            <ReactionParticles
              position={[0, 0.6, 0]}
              type={reaction.soundEffect === "fizz" ? "bubbles" : "smoke"}
              intensity={reaction.intensity}
            />
          )}

          {reaction.precipitate && <ReactionParticles position={[0, 0.4, 0]} type="smoke" intensity={2} />}

          {/* Light effect for intense reactions */}
          {reaction.intensity >= 4 && (
            <pointLight position={[0, 1, 0]} intensity={3} color="#ff4400" distance={5} decay={2} />
          )}
        </group>
      )}

      <Environment preset="warehouse" />
      <fog attach="fog" args={["#1a1a1a", 5, 15]} />
    </>
  )
}

export function ChemicalLab3D({ chemical1, chemical2, isReacting }: ChemicalLab3DProps) {
  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <Suspense fallback={null}>
          <LabScene chemical1={chemical1} chemical2={chemical2} isReacting={isReacting} />
        </Suspense>
      </Canvas>
    </div>
  )
}
