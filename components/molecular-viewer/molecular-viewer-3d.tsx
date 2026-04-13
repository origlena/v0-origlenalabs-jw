"use client"

import { useState, useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows, Float, Sparkles, Html } from "@react-three/drei"
import * as THREE from "three"
import type { Molecule, Atom } from "./molecules-data"
import { elementProperties } from "./molecules-data"

const labelColors: Record<string, string> = {
  H: "#00ffff",
  C: "#ff6b6b",
  N: "#4dabf7",
  O: "#ff8787",
  S: "#ffd43b",
  P: "#ff922b",
  Cl: "#51cf66",
  F: "#94d82d",
  Br: "#e599f7",
  I: "#da77f2",
  Na: "#b197fc",
  K: "#9775fa",
  Ca: "#69db7c",
  Mg: "#8ce99a",
  Fe: "#ffa94d",
  default: "#ffffff",
}

function AtomSphere({
  atom,
  index,
  viewMode,
  showLabels,
  scale,
  isHighlighted,
}: {
  atom: Atom
  index: number
  viewMode: "ball-stick" | "space-fill" | "wireframe"
  showLabels: boolean
  scale: number
  isHighlighted: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  const radiusMultiplier = viewMode === "space-fill" ? 1.5 : viewMode === "ball-stick" ? 0.4 : 0.2
  const radius = (atom.radius || 0.5) * radiusMultiplier * scale

  const positionArray: [number, number, number] = [atom.position[0] || 0, atom.position[1] || 0, atom.position[2] || 0]

  const labelColor = labelColors[atom.element] || labelColors.default
  const elementName = elementProperties[atom.element]?.name || atom.element

  useFrame(() => {
    if (meshRef.current && hovered) {
      meshRef.current.scale.setScalar(1.1)
    } else if (meshRef.current) {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
    }
  })

  return (
    <group position={positionArray}>
      {atom && (
        <mesh ref={meshRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
          <sphereGeometry args={[radius, 64, 64]} />
          <meshPhysicalMaterial
            color={atom.color || "#888888"}
            metalness={0.1}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={1}
            emissive={atom.color || "#888888"}
            emissiveIntensity={isHighlighted ? 0.3 : hovered ? 0.2 : 0.05}
          />
        </mesh>
      )}

      {(hovered || isHighlighted) && atom && (
        <mesh>
          <sphereGeometry args={[radius * 1.3, 32, 32]} />
          <meshBasicMaterial color={atom.color || "#888888"} transparent opacity={0.15} />
        </mesh>
      )}

      {showLabels && atom && (
        <Html
          position={[0, radius + 0.4, 0]}
          center
          style={{
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${labelColor}22, ${labelColor}44)`,
              border: `2px solid ${labelColor}`,
              borderRadius: "8px",
              padding: "4px 8px",
              color: labelColor,
              fontSize: "12px",
              fontWeight: "bold",
              fontFamily: "monospace",
              textShadow: `0 0 10px ${labelColor}`,
              boxShadow: `0 0 15px ${labelColor}44`,
              whiteSpace: "nowrap",
            }}
          >
            {atom.element}
            {hovered && <span style={{ fontSize: "10px", marginLeft: "4px", opacity: 0.8 }}>({elementName})</span>}
          </div>
        </Html>
      )}
    </group>
  )
}

function BondCylinder({
  atom1,
  atom2,
  order,
  viewMode,
  scale,
}: {
  atom1: Atom
  atom2: Atom
  order: 1 | 2 | 3
  viewMode: "ball-stick" | "space-fill" | "wireframe"
  scale: number
}) {
  const { midPoint, rotation, length } = useMemo(() => {
    const start = new THREE.Vector3(atom1.position[0] || 0, atom1.position[1] || 0, atom1.position[2] || 0)
    const end = new THREE.Vector3(atom2.position[0] || 0, atom2.position[1] || 0, atom2.position[2] || 0)
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)
    const direction = new THREE.Vector3().subVectors(end, start)
    const len = direction.length()

    const quaternion = new THREE.Quaternion()
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize())
    const euler = new THREE.Euler().setFromQuaternion(quaternion)

    return {
      midPoint: [mid.x, mid.y, mid.z] as [number, number, number],
      rotation: [euler.x, euler.y, euler.z] as [number, number, number],
      length: len,
    }
  }, [atom1, atom2])

  const bondRadius = viewMode === "wireframe" ? 0.02 : 0.06
  const spacing = 0.15

  const offsets: [number, number][] =
    order === 1
      ? [[0, 0]]
      : order === 2
        ? [
            [-spacing / 2, 0],
            [spacing / 2, 0],
          ]
        : [
            [-spacing, 0],
            [0, 0],
            [spacing, 0],
          ]

  return (
    <group position={midPoint} rotation={rotation}>
      {offsets.map((offset, i) => (
        <group key={i} position={[offset[0], 0, offset[1]]}>
          <mesh position={[0, length / 4, 0]}>
            <cylinderGeometry args={[bondRadius * scale, bondRadius * scale, length / 2, 16]} />
            <meshPhysicalMaterial color={atom1.color || "#888888"} metalness={0.3} roughness={0.4} />
          </mesh>
          <mesh position={[0, -length / 4, 0]}>
            <cylinderGeometry args={[bondRadius * scale, bondRadius * scale, length / 2, 16]} />
            <meshPhysicalMaterial color={atom2.color || "#888888"} metalness={0.3} roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function ElectronCloud({ molecule, scale }: { molecule: Molecule; scale: number }) {
  const pointsRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    if (!molecule?.atoms?.length) return new Float32Array(0)

    const pos: number[] = []
    molecule.atoms.forEach((atom) => {
      if (!atom?.position) return

      const count = Math.floor((atom.radius || 0.5) * 20)
      for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const r = (atom.radius || 0.5) * 2 * Math.cbrt(Math.random())
        pos.push(
          (atom.position[0] || 0) + r * Math.sin(phi) * Math.cos(theta),
          (atom.position[1] || 0) + r * Math.sin(phi) * Math.sin(theta),
          (atom.position[2] || 0) + r * Math.cos(phi),
        )
      }
    })
    return new Float32Array(pos)
  }, [molecule])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  if (positions.length === 0) return null

  return (
    <points ref={pointsRef} scale={scale}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#4dabf7" size={0.03} transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

function MoleculeScene({
  molecule,
  viewMode,
  showLabels,
  showElectronCloud,
  autoRotate,
  rotationSpeed,
  highlightedAtom,
}: {
  molecule: Molecule | null
  viewMode: "ball-stick" | "space-fill" | "wireframe"
  showLabels: boolean
  showElectronCloud: boolean
  autoRotate: boolean
  rotationSpeed: number
  highlightedAtom: number | null
}) {
  const groupRef = useRef<THREE.Group>(null)
  const { camera } = useThree()

  const scale = useMemo(() => {
    if (!molecule?.atoms?.length) return 1

    const positions = molecule.atoms.filter((a) => a?.position).map((a) => a.position)

    if (positions.length === 0) return 1

    const maxDist = Math.max(...positions.flat().map(Math.abs))
    return maxDist > 3 ? 3 / maxDist : 1
  }, [molecule])

  useFrame(() => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += rotationSpeed * 0.01
    }
  })

  useEffect(() => {
    camera.position.set(0, 0, 8)
  }, [camera, molecule])

  if (!molecule || !molecule.atoms || molecule.atoms.length === 0) {
    return (
      <>
        <ambientLight intensity={0.4} />
        <Environment preset="studio" />
      </>
    )
  }

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#4dabf7" />
      <spotLight position={[5, 5, 5]} intensity={0.8} angle={0.3} penumbra={1} castShadow />

      <Environment preset="studio" />
      <Sparkles count={50} scale={10} size={2} speed={0.3} color="#4dabf7" />

      <Float speed={1} rotationIntensity={autoRotate ? 0 : 0.2} floatIntensity={0.5}>
        <group ref={groupRef} scale={scale}>
          {viewMode !== "space-fill" &&
            molecule.bonds &&
            molecule.atoms &&
            molecule.bonds.map((bond, i) => {
              const a1 = molecule.atoms[bond.atom1]
              const a2 = molecule.atoms[bond.atom2]
              if (!a1 || !a2) return null
              return <BondCylinder key={i} atom1={a1} atom2={a2} order={bond.order} viewMode={viewMode} scale={1} />
            })}

          {molecule.atoms.map((atom, i) => (
            <AtomSphere
              key={i}
              atom={atom}
              index={i}
              viewMode={viewMode}
              showLabels={showLabels}
              scale={1}
              isHighlighted={highlightedAtom === i}
            />
          ))}

          {showElectronCloud && molecule && <ElectronCloud molecule={molecule} scale={1} />}
        </group>
      </Float>

      <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={10} blur={2} far={4} />

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={20}
        autoRotate={false}
      />
    </>
  )
}

export function MolecularViewer3D({
  molecule,
  viewMode,
  showLabels,
  showElectronCloud,
  autoRotate,
  rotationSpeed,
  highlightedAtom,
}: {
  molecule: Molecule | null
  viewMode: "ball-stick" | "space-fill" | "wireframe"
  showLabels: boolean
  showElectronCloud: boolean
  autoRotate: boolean
  rotationSpeed: number
  highlightedAtom: number | null
}) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading Molecular Viewer...</p>
        </div>
      </div>
    )
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      shadows
      style={{ background: "linear-gradient(to bottom, #0f172a, #020617)" }}
    >
      <MoleculeScene
        molecule={molecule}
        viewMode={viewMode}
        showLabels={showLabels}
        showElectronCloud={showElectronCloud}
        autoRotate={autoRotate}
        rotationSpeed={rotationSpeed}
        highlightedAtom={highlightedAtom}
      />
    </Canvas>
  )
}
