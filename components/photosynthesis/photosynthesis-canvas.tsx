"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Float, Html } from "@react-three/drei"
import type * as THREE from "three"

// Animated sun rays
function SunRays({ intensity }: { intensity: number }) {
  const raysRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (raysRef.current) {
      raysRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <group ref={raysRef} position={[-6, 4, 0]}>
      {/* Sun core */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={intensity * 2} />
      </mesh>
      {/* Sun rays */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={i} rotation={[0, 0, (i / 12) * Math.PI * 2]}>
          <boxGeometry args={[2, 0.1, 0.05]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#f59e0b"
            emissiveIntensity={intensity}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  )
}

// Animated light photons traveling to leaf
function LightPhotons({ active, speed }: { active: boolean; speed: number }) {
  const photonsRef = useRef<THREE.Group>(null)
  const [positions, setPositions] = useState<number[][]>(() =>
    Array.from({ length: 15 }, () => [-5 + Math.random() * 2, 3 + Math.random() * 2, -1 + Math.random() * 2]),
  )

  useFrame((state, delta) => {
    if (!active) return
    setPositions((prev) =>
      prev.map(([x, y, z]) => {
        const newX = x + delta * speed * 2
        const newY = y - delta * speed * 1.5
        if (newX > 1 || newY < -1) {
          return [-5 + Math.random() * 2, 3 + Math.random() * 2, -1 + Math.random() * 2]
        }
        return [newX, newY, z]
      }),
    )
  })

  if (!active) return null

  return (
    <group ref={photonsRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#fef08a" emissive="#fbbf24" emissiveIntensity={2} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  )
}

// Water molecules (H2O) entering through roots
function WaterMolecules({ active, speed }: { active: boolean; speed: number }) {
  const [molecules, setMolecules] = useState<{ pos: number[]; id: number }[]>(() =>
    Array.from({ length: 8 }, (_, i) => ({
      pos: [-0.5 + Math.random(), -4 + i * 0.5, Math.random() * 0.5],
      id: i,
    })),
  )

  useFrame((state, delta) => {
    if (!active) return
    setMolecules((prev) =>
      prev.map((mol) => {
        const newY = mol.pos[1] + delta * speed * 0.8
        if (newY > 0) {
          return { ...mol, pos: [-0.5 + Math.random(), -4, Math.random() * 0.5] }
        }
        return { ...mol, pos: [mol.pos[0], newY, mol.pos[2]] }
      }),
    )
  })

  if (!active) return null

  return (
    <group>
      {molecules.map((mol) => (
        <group key={mol.id} position={mol.pos as [number, number, number]}>
          {/* Oxygen atom */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#ef4444" />
          </mesh>
          {/* Hydrogen atoms */}
          <mesh position={[-0.1, 0.08, 0]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.1, 0.08, 0]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// CO2 molecules entering through stomata
function CO2Molecules({ active, speed }: { active: boolean; speed: number }) {
  const [molecules, setMolecules] = useState<{ pos: number[]; id: number }[]>(() =>
    Array.from({ length: 6 }, (_, i) => ({
      pos: [3 + Math.random(), 0.5 + i * 0.3, Math.random() * 0.5 - 0.25],
      id: i,
    })),
  )

  useFrame((state, delta) => {
    if (!active) return
    setMolecules((prev) =>
      prev.map((mol) => {
        const newX = mol.pos[0] - delta * speed * 0.6
        if (newX < 0) {
          return { ...mol, pos: [3 + Math.random(), 0.5 + Math.random() * 1.5, Math.random() * 0.5 - 0.25] }
        }
        return { ...mol, pos: [newX, mol.pos[1], mol.pos[2]] }
      }),
    )
  })

  if (!active) return null

  return (
    <group>
      {molecules.map((mol) => (
        <group key={mol.id} position={mol.pos as [number, number, number]}>
          {/* Carbon atom (center) */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#374151" />
          </mesh>
          {/* Oxygen atoms (sides) */}
          <mesh position={[-0.18, 0, 0]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#ef4444" />
          </mesh>
          <mesh position={[0.18, 0, 0]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#ef4444" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// Oxygen molecules (O2) being released
function O2Release({ active, speed }: { active: boolean; speed: number }) {
  const [molecules, setMolecules] = useState<{ pos: number[]; id: number }[]>(() =>
    Array.from({ length: 5 }, (_, i) => ({
      pos: [0.5 + Math.random() * 0.5, 1 + i * 0.4, Math.random() * 0.3],
      id: i,
    })),
  )

  useFrame((state, delta) => {
    if (!active) return
    setMolecules((prev) =>
      prev.map((mol) => {
        const newY = mol.pos[1] + delta * speed * 0.5
        const newX = mol.pos[0] + delta * speed * 0.3
        if (newY > 5) {
          return { ...mol, pos: [0.5 + Math.random() * 0.5, 1, Math.random() * 0.3] }
        }
        return { ...mol, pos: [newX, newY, mol.pos[2]] }
      }),
    )
  })

  if (!active) return null

  return (
    <group>
      {molecules.map((mol) => (
        <group key={mol.id} position={mol.pos as [number, number, number]}>
          {/* O2 molecule - two oxygen atoms */}
          <mesh position={[-0.08, 0, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.3} />
          </mesh>
          <mesh position={[0.08, 0, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// Glucose molecule being produced
function GlucoseProduction({ active, visible }: { active: boolean; visible: boolean }) {
  const glucoseRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (glucoseRef.current && active) {
      glucoseRef.current.rotation.y = state.clock.elapsedTime * 0.5
      const scale = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      glucoseRef.current.scale.setScalar(scale)
    }
  })

  if (!visible) return null

  return (
    <group ref={glucoseRef} position={[0, 0.5, 0]}>
      {/* Simplified glucose ring structure */}
      {/* Carbon atoms in ring */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2
        const x = Math.cos(angle) * 0.4
        const z = Math.sin(angle) * 0.4
        return (
          <mesh key={`c-${i}`} position={[x, 0, z]}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshStandardMaterial color="#374151" />
          </mesh>
        )
      })}
      {/* Oxygen in ring */}
      <mesh position={[0.4, 0, 0]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      {/* Hydrogen atoms */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2
        const x = Math.cos(angle) * 0.55
        const z = Math.sin(angle) * 0.55
        return (
          <mesh key={`h-${i}`} position={[x, 0.1, z]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        )
      })}
      {/* Glow effect */}
      <mesh>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color="#22c55e" transparent opacity={0.2} emissive="#22c55e" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

// Chloroplast structure inside leaf
function Chloroplast({ glowing }: { glowing: boolean }) {
  const chloroplastRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (chloroplastRef.current) {
      chloroplastRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <group ref={chloroplastRef} position={[0, 0.3, 0.3]}>
      {/* Outer membrane */}
      <mesh>
        <capsuleGeometry args={[0.3, 0.8, 8, 16]} />
        <meshStandardMaterial
          color="#22c55e"
          transparent
          opacity={0.4}
          emissive={glowing ? "#22c55e" : "#000000"}
          emissiveIntensity={glowing ? 0.5 : 0}
        />
      </mesh>
      {/* Thylakoid stacks (grana) */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={i} position={[-0.2 + i * 0.15, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.4, 16]} />
          <meshStandardMaterial
            color="#16a34a"
            emissive={glowing ? "#22c55e" : "#000000"}
            emissiveIntensity={glowing ? 0.8 : 0}
          />
        </mesh>
      ))}
    </group>
  )
}

// Main leaf structure
function Leaf({ showCrossSection }: { showCrossSection: boolean }) {
  return (
    <group position={[0, 0.5, 0]}>
      {/* Main leaf body */}
      <mesh rotation={[0.3, 0, 0]}>
        <boxGeometry args={[2.5, 0.15, 1.5]} />
        <meshStandardMaterial color="#22c55e" metalness={0.1} roughness={0.8} />
      </mesh>

      {/* Leaf veins */}
      <mesh position={[0, 0.08, 0]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[2.4, 0.02, 0.08]} />
        <meshStandardMaterial color="#16a34a" />
      </mesh>
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[-0.8 + i * 0.4, 0.08, 0]} rotation={[0.3, 0, Math.PI / 4]}>
          <boxGeometry args={[0.6, 0.015, 0.04]} />
          <meshStandardMaterial color="#16a34a" />
        </mesh>
      ))}

      {/* Stomata (pores) on bottom */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={i} position={[0.5 + i * 0.3, -0.08, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.05, 0.015, 8, 16]} />
          <meshStandardMaterial color="#15803d" />
        </mesh>
      ))}
    </group>
  )
}

// Plant stem and roots
function PlantStructure() {
  return (
    <group>
      {/* Stem */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 3, 16]} />
        <meshStandardMaterial color="#15803d" />
      </mesh>

      {/* Roots */}
      {[-0.4, 0, 0.4].map((x, i) => (
        <mesh key={i} position={[x, -3.5, 0]} rotation={[0, 0, (i - 1) * 0.3]}>
          <cylinderGeometry args={[0.05, 0.08, 1.5, 8]} />
          <meshStandardMaterial color="#92400e" />
        </mesh>
      ))}

      {/* Soil */}
      <mesh position={[0, -4, 0]}>
        <boxGeometry args={[4, 0.5, 2]} />
        <meshStandardMaterial color="#78350f" roughness={1} />
      </mesh>
    </group>
  )
}

// Labels for educational purposes
function ProcessLabels({ step }: { step: number }) {
  const labels = [
    { pos: [-5, 5, 0], text: "1. Sunlight", visible: step >= 0 },
    { pos: [3.5, 1.5, 0], text: "2. CO₂ enters", visible: step >= 1 },
    { pos: [-1.5, -2.5, 0], text: "3. H₂O absorbed", visible: step >= 2 },
    { pos: [0, 2, 0], text: "4. Chloroplast", visible: step >= 3 },
    { pos: [2, 3.5, 0], text: "5. O₂ released", visible: step >= 4 },
    { pos: [0, -0.5, 1], text: "6. Glucose made", visible: step >= 5 },
  ]

  return (
    <>
      {labels.map(
        (label, i) =>
          label.visible && (
            <Html key={i} position={label.pos as [number, number, number]} center>
              <div className="bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium whitespace-nowrap border border-border shadow-lg">
                {label.text}
              </div>
            </Html>
          ),
      )}
    </>
  )
}

interface PhotosynthesisSceneProps {
  lightIntensity: number
  animationSpeed: number
  showLabels: boolean
  currentStep: number
  isPlaying: boolean
}

function PhotosynthesisScene({
  lightIntensity,
  animationSpeed,
  showLabels,
  currentStep,
  isPlaying,
}: PhotosynthesisSceneProps) {
  const isActive = isPlaying && currentStep >= 0

  return (
    <group>
      {/* Sun and light */}
      <SunRays intensity={lightIntensity} />
      <LightPhotons active={isActive && currentStep >= 0} speed={animationSpeed} />

      {/* Plant structure */}
      <PlantStructure />
      <Leaf showCrossSection={currentStep >= 3} />
      <Chloroplast glowing={isActive && currentStep >= 3} />

      {/* Inputs */}
      <WaterMolecules active={isActive && currentStep >= 2} speed={animationSpeed} />
      <CO2Molecules active={isActive && currentStep >= 1} speed={animationSpeed} />

      {/* Outputs */}
      <O2Release active={isActive && currentStep >= 4} speed={animationSpeed} />
      <GlucoseProduction active={isActive} visible={currentStep >= 5} />

      {/* Educational labels */}
      {showLabels && <ProcessLabels step={currentStep} />}
    </group>
  )
}

interface PhotosynthesisCanvasProps {
  lightIntensity: number
  animationSpeed: number
  showLabels: boolean
  currentStep: number
  isPlaying: boolean
}

export function PhotosynthesisCanvas({
  lightIntensity,
  animationSpeed,
  showLabels,
  currentStep,
  isPlaying,
}: PhotosynthesisCanvasProps) {
  return (
    <Canvas camera={{ position: [5, 2, 8], fov: 45 }} gl={{ antialias: true, alpha: true }} className="touch-none">
      <color attach="background" args={["#0a0a0a"]} />

      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={lightIntensity} color="#fef3c7" />
      <pointLight position={[-6, 4, 0]} intensity={lightIntensity * 2} color="#fbbf24" distance={15} />

      <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.1}>
        <PhotosynthesisScene
          lightIntensity={lightIntensity}
          animationSpeed={animationSpeed}
          showLabels={showLabels}
          currentStep={currentStep}
          isPlaying={isPlaying}
        />
      </Float>

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={4}
        maxDistance={20}
        target={[0, 0, 0]}
      />

      <Environment preset="sunset" />
    </Canvas>
  )
}
