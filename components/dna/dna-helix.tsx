"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Float } from "@react-three/drei"
import * as THREE from "three"

interface BasePairProps {
  position: [number, number, number]
  rotation: number
  type: "AT" | "GC"
  index: number
  showBasePairs: boolean
  colorScheme: {
    adenine: string
    thymine: string
    guanine: string
    cytosine: string
    backbone: string
  }
}

function BasePair({ position, rotation, type, index, showBasePairs, colorScheme }: BasePairProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Base pair colors based on type
  const colors = useMemo(() => {
    if (type === "AT") {
      return {
        left: colorScheme.adenine, // Adenine - Red
        right: colorScheme.thymine, // Thymine - Green
      }
    } else {
      return {
        left: colorScheme.guanine, // Guanine - Blue
        right: colorScheme.cytosine, // Cytosine - Yellow
      }
    }
  }, [type, colorScheme])

  const backboneRadius = 0.15
  const baseRadius = 0.2
  const helixRadius = 1.2

  return (
    <group ref={groupRef} position={position} rotation={[0, rotation, 0]}>
      {/* Left backbone (sugar-phosphate) */}
      <mesh position={[-helixRadius, 0, 0]}>
        <sphereGeometry args={[backboneRadius, 16, 16]} />
        <meshStandardMaterial color={colorScheme.backbone} metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Right backbone (sugar-phosphate) */}
      <mesh position={[helixRadius, 0, 0]}>
        <sphereGeometry args={[backboneRadius, 16, 16]} />
        <meshStandardMaterial color={colorScheme.backbone} metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Base pair connection */}
      {showBasePairs && (
        <>
          {/* Left base */}
          <mesh position={[-helixRadius + 0.4, 0, 0]}>
            <boxGeometry args={[0.5, 0.12, 0.25]} />
            <meshStandardMaterial
              color={colors.left}
              metalness={0.2}
              roughness={0.5}
              emissive={colors.left}
              emissiveIntensity={0.1}
            />
          </mesh>

          {/* Right base */}
          <mesh position={[helixRadius - 0.4, 0, 0]}>
            <boxGeometry args={[0.5, 0.12, 0.25]} />
            <meshStandardMaterial
              color={colors.right}
              metalness={0.2}
              roughness={0.5}
              emissive={colors.right}
              emissiveIntensity={0.1}
            />
          </mesh>

          {/* Hydrogen bonds (connecting line) */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, helixRadius * 1.2, 8]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.4} />
          </mesh>
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.03, 0.03, helixRadius * 1.2, 8]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.4} />
          </mesh>
        </>
      )}
    </group>
  )
}

interface BackboneStrandProps {
  basePairs: number
  side: "left" | "right"
  color: string
}

function BackboneStrand({ basePairs, side, color }: BackboneStrandProps) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = []
    const helixRadius = 1.2
    const verticalSpacing = 0.4

    for (let i = 0; i <= basePairs; i++) {
      const angle = (i / basePairs) * Math.PI * 4
      const y = (i - basePairs / 2) * verticalSpacing
      const x = side === "left" ? -helixRadius * Math.cos(angle) : helixRadius * Math.cos(angle)
      const z = side === "left" ? -helixRadius * Math.sin(angle) : helixRadius * Math.sin(angle)
      pts.push(new THREE.Vector3(x, y, z))
    }
    return pts
  }, [basePairs, side])

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points])

  return (
    <mesh>
      <tubeGeometry args={[curve, 64, 0.08, 8, false]} />
      <meshStandardMaterial color={color} metalness={0.4} roughness={0.3} />
    </mesh>
  )
}

interface DNAHelixSceneProps {
  basePairs: number
  rotationSpeed: number
  showBasePairs: boolean
  colorScheme: {
    adenine: string
    thymine: string
    guanine: string
    cytosine: string
    backbone: string
  }
  onRotationChange?: (angle: number) => void
}

function DNAHelixScene({ basePairs, rotationSpeed, showBasePairs, colorScheme, onRotationChange }: DNAHelixSceneProps) {
  const helixRef = useRef<THREE.Group>(null)

  // Generate random base pair sequence
  const sequence = useMemo(() => {
    const types: ("AT" | "GC")[] = []
    for (let i = 0; i < basePairs; i++) {
      types.push(Math.random() > 0.5 ? "AT" : "GC")
    }
    return types
  }, [basePairs])

  useFrame((state, delta) => {
    if (helixRef.current) {
      helixRef.current.rotation.y += delta * rotationSpeed
      onRotationChange?.(THREE.MathUtils.radToDeg(helixRef.current.rotation.y) % 360)
    }
  })

  const verticalSpacing = 0.4

  return (
    <group ref={helixRef}>
      {/* Base pairs */}
      {sequence.map((type, i) => {
        const angle = (i / basePairs) * Math.PI * 4
        const y = (i - basePairs / 2) * verticalSpacing
        return (
          <BasePair
            key={i}
            position={[0, y, 0]}
            rotation={angle}
            type={type}
            index={i}
            showBasePairs={showBasePairs}
            colorScheme={colorScheme}
          />
        )
      })}

      {/* Backbone strands */}
      <BackboneStrand basePairs={basePairs} side="left" color={colorScheme.backbone} />
      <BackboneStrand basePairs={basePairs} side="right" color={colorScheme.backbone} />
    </group>
  )
}

interface DNACanvasProps {
  basePairs: number
  rotationSpeed: number
  showBasePairs: boolean
  colorScheme: {
    adenine: string
    thymine: string
    guanine: string
    cytosine: string
    backbone: string
  }
  onRotationChange?: (angle: number) => void
}

export function DNACanvas({ basePairs, rotationSpeed, showBasePairs, colorScheme, onRotationChange }: DNACanvasProps) {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }} gl={{ antialias: true, alpha: true }} className="touch-none">
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#32b8c6" />

      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
        <DNAHelixScene
          basePairs={basePairs}
          rotationSpeed={rotationSpeed}
          showBasePairs={showBasePairs}
          colorScheme={colorScheme}
          onRotationChange={onRotationChange}
        />
      </Float>

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={20}
        autoRotate={false}
      />

      <Environment preset="city" />
    </Canvas>
  )
}
