"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Html, Environment, MeshTransmissionMaterial, Sparkles } from "@react-three/drei"
import { useRef, useState, useMemo, Suspense } from "react"
import * as THREE from "three"
import { getOrganellesForCell, getLabelColor } from "./cell-organelles-data"

interface CellProps {
  cellType: "animal" | "plant"
  selectedOrganelle: string | null
  onSelectOrganelle: (id: string | null) => void
  showLabels: boolean
  showMembranes: boolean
  crossSection: boolean
  rotationSpeed: number
}

function CellularParticles({ color, count = 50 }: { color: string; count?: number }) {
  const points = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const radius = 3 + Math.random() * 0.5
      temp.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      )
    }
    return new Float32Array(temp)
  }, [count])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color={color} transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function DetailedNucleus({ organelle, isSelected, onClick, showLabels, hovered, setHovered }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const labelColors = getLabelColor(organelle.id)

  useFrame((state) => {
    if (meshRef.current && isSelected) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05)
    }
  })

  return (
    <group position={organelle.position}>
      {/* Nuclear envelope with realistic texture */}
      <mesh
        ref={meshRef}
        scale={organelle.scale}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = "auto"
        }}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          color={organelle.color}
          roughness={0.2}
          metalness={0.1}
          transmission={0.1}
          thickness={0.5}
          clearcoat={0.3}
          clearcoatRoughness={0.2}
          emissive={organelle.color}
          emissiveIntensity={isSelected ? 0.4 : hovered ? 0.2 : 0.1}
        />
      </mesh>

      {/* Nuclear pores visualization */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const position: [number, number, number] = [
          Math.cos(angle) * organelle.scale[0] * 0.95,
          Math.sin(angle) * organelle.scale[1] * 0.95,
          0,
        ]
        return (
          <mesh key={i} position={position} scale={0.08}>
            <cylinderGeometry args={[1, 1, 0.2, 8]} />
            <meshStandardMaterial color="#6366F1" emissive="#6366F1" emissiveIntensity={0.5} />
          </mesh>
        )
      })}

      {/* Chromatin network inside */}
      <Sparkles count={30} scale={organelle.scale[0] * 0.8} size={0.5} speed={0.1} color="#A78BFA" />

      {showLabels && (hovered || isSelected) && (
        <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
          <div
            className="px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transform -translate-y-8 animate-in fade-in zoom-in duration-200"
            style={{
              backgroundColor: labelColors.bg,
              border: `2px solid ${labelColors.border}`,
              color: labelColors.text,
              boxShadow: `0 0 20px ${labelColors.border}`,
            }}
          >
            {organelle.name}
          </div>
        </Html>
      )}

      {isSelected && (
        <mesh scale={[organelle.scale[0] * 1.3, organelle.scale[1] * 1.3, organelle.scale[2] * 1.3]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color={organelle.color} transparent opacity={0.15} wireframe />
        </mesh>
      )}
    </group>
  )
}

function DetailedMitochondria({ organelle, isSelected, onClick, showLabels, hovered, setHovered }: any) {
  const meshRef = useRef<THREE.Group>(null)
  const labelColors = getLabelColor(organelle.id)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
      if (isSelected) {
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.03)
      }
    }
  })

  return (
    <group ref={meshRef} position={organelle.position}>
      {/* Outer membrane */}
      <mesh
        scale={organelle.scale}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = "auto"
        }}
      >
        <capsuleGeometry args={[0.5, 1, 16, 32]} />
        <meshPhysicalMaterial
          color={organelle.color}
          roughness={0.3}
          metalness={0.2}
          transmission={0.2}
          thickness={0.3}
          clearcoat={0.5}
          emissive={organelle.color}
          emissiveIntensity={isSelected ? 0.5 : hovered ? 0.3 : 0.15}
        />
      </mesh>

      {/* Inner cristae folds */}
      {[...Array(5)].map((_, i) => (
        <mesh
          key={i}
          position={[0, (i - 2) * 0.15, 0]}
          scale={[organelle.scale[0] * 0.7, organelle.scale[1] * 0.05, organelle.scale[2] * 0.7]}
        >
          <torusGeometry args={[0.5, 0.1, 8, 16]} />
          <meshStandardMaterial
            color="#DC2626"
            roughness={0.4}
            metalness={0.3}
            emissive="#EF4444"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}

      {/* ATP synthase particles */}
      <Sparkles count={15} scale={organelle.scale[0] * 0.6} size={0.3} speed={0.3} color="#FDE047" />

      {showLabels && (hovered || isSelected) && (
        <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
          <div
            className="px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transform -translate-y-8 animate-in fade-in zoom-in duration-200"
            style={{
              backgroundColor: labelColors.bg,
              border: `2px solid ${labelColors.border}`,
              color: labelColors.text,
              boxShadow: `0 0 20px ${labelColors.border}`,
            }}
          >
            {organelle.name}
          </div>
        </Html>
      )}

      {isSelected && (
        <mesh scale={[organelle.scale[0] * 1.4, organelle.scale[1] * 1.4, organelle.scale[2] * 1.4]}>
          <capsuleGeometry args={[0.5, 1, 16, 32]} />
          <meshBasicMaterial color={organelle.color} transparent opacity={0.15} wireframe />
        </mesh>
      )}
    </group>
  )
}

function DetailedGolgi({ organelle, isSelected, onClick, showLabels, hovered, setHovered }: any) {
  const groupRef = useRef<THREE.Group>(null)
  const labelColors = getLabelColor(organelle.id)

  return (
    <group ref={groupRef} position={organelle.position}>
      {/* Stacked cisternae */}
      {[...Array(6)].map((_, i) => (
        <mesh
          key={i}
          position={[0, (i - 2.5) * 0.15, 0]}
          scale={[organelle.scale[0] * (1 - i * 0.05), organelle.scale[1] * 0.08, organelle.scale[2]]}
          onClick={onClick}
          onPointerOver={(e) => {
            e.stopPropagation()
            setHovered(true)
            document.body.style.cursor = "pointer"
          }}
          onPointerOut={() => {
            setHovered(false)
            document.body.style.cursor = "auto"
          }}
        >
          <cylinderGeometry args={[1, 1, 1, 32]} />
          <meshPhysicalMaterial
            color={i < 2 ? "#F59E0B" : i < 4 ? "#FBBF24" : "#FDE047"}
            roughness={0.3}
            metalness={0.15}
            clearcoat={0.4}
            emissive={organelle.color}
            emissiveIntensity={isSelected ? 0.4 : hovered ? 0.25 : 0.1}
          />
        </mesh>
      ))}

      {/* Vesicles budding off */}
      {[...Array(4)].map((_, i) => {
        const angle = (i / 4) * Math.PI * 2
        const radius = organelle.scale[0] * 1.2
        return (
          <mesh key={`vesicle-${i}`} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]} scale={0.15}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#FCD34D" emissive="#F59E0B" emissiveIntensity={0.3} />
          </mesh>
        )
      })}

      {showLabels && (hovered || isSelected) && (
        <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
          <div
            className="px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transform -translate-y-8 animate-in fade-in zoom-in duration-200"
            style={{
              backgroundColor: labelColors.bg,
              border: `2px solid ${labelColors.border}`,
              color: labelColors.text,
              boxShadow: `0 0 20px ${labelColors.border}`,
            }}
          >
            {organelle.name}
          </div>
        </Html>
      )}

      {isSelected && (
        <mesh scale={[organelle.scale[0] * 1.5, organelle.scale[1] * 1.5, organelle.scale[2] * 1.5]}>
          <boxGeometry args={[2, 1, 1]} />
          <meshBasicMaterial color={organelle.color} transparent opacity={0.15} wireframe />
        </mesh>
      )}
    </group>
  )
}

function DetailedChloroplast({ organelle, isSelected, onClick, showLabels, hovered, setHovered }: any) {
  const meshRef = useRef<THREE.Group>(null)
  const labelColors = getLabelColor(organelle.id)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.002
    }
  })

  return (
    <group ref={meshRef} position={organelle.position}>
      {/* Outer envelope */}
      <mesh
        scale={organelle.scale}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = "auto"
        }}
      >
        <capsuleGeometry args={[0.5, 1, 16, 32]} />
        <meshPhysicalMaterial
          color={organelle.color}
          roughness={0.25}
          metalness={0.1}
          transmission={0.15}
          thickness={0.4}
          clearcoat={0.4}
          emissive={organelle.color}
          emissiveIntensity={isSelected ? 0.5 : hovered ? 0.3 : 0.2}
        />
      </mesh>

      {/* Grana stacks (thylakoids) */}
      {[...Array(8)].map((_, i) => {
        const x = ((i % 2) - 0.5) * 0.4
        const z = (Math.floor(i / 2) - 1.5) * 0.3
        return (
          <group key={i} position={[x * organelle.scale[0], 0, z * organelle.scale[2]]}>
            {[...Array(4)].map((_, j) => (
              <mesh key={j} position={[0, (j - 1.5) * 0.08, 0]} scale={0.12}>
                <cylinderGeometry args={[1, 1, 0.2, 16]} />
                <meshStandardMaterial
                  color="#16A34A"
                  roughness={0.3}
                  metalness={0.2}
                  emissive="#22C55E"
                  emissiveIntensity={0.4}
                />
              </mesh>
            ))}
          </group>
        )
      })}

      {/* Stroma (with glucose production sparkles) */}
      <Sparkles count={20} scale={organelle.scale[0] * 0.7} size={0.2} speed={0.2} color="#86EFAC" />

      {showLabels && (hovered || isSelected) && (
        <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
          <div
            className="px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transform -translate-y-8 animate-in fade-in zoom-in duration-200"
            style={{
              backgroundColor: labelColors.bg,
              border: `2px solid ${labelColors.border}`,
              color: labelColors.text,
              boxShadow: `0 0 20px ${labelColors.border}`,
            }}
          >
            {organelle.name}
          </div>
        </Html>
      )}

      {isSelected && (
        <mesh scale={[organelle.scale[0] * 1.4, organelle.scale[1] * 1.4, organelle.scale[2] * 1.4]}>
          <capsuleGeometry args={[0.5, 1, 16, 32]} />
          <meshBasicMaterial color={organelle.color} transparent opacity={0.15} wireframe />
        </mesh>
      )}
    </group>
  )
}

function DetailedER({ organelle, isSelected, onClick, showLabels, hovered, setHovered }: any) {
  const isRough = organelle.id === "rough-er"
  const labelColors = getLabelColor(organelle.id)

  return (
    <group position={organelle.position}>
      {/* ER membrane network */}
      <mesh
        scale={organelle.scale}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = "auto"
        }}
      >
        <torusGeometry args={[1, 0.25, 16, 32]} />
        <meshPhysicalMaterial
          color={organelle.color}
          roughness={0.3}
          metalness={0.15}
          transmission={0.2}
          thickness={0.3}
          emissive={organelle.color}
          emissiveIntensity={isSelected ? 0.4 : hovered ? 0.25 : 0.1}
        />
      </mesh>

      {/* Ribosomes attached to rough ER */}
      {isRough &&
        [...Array(20)].map((_, i) => {
          const angle = (i / 20) * Math.PI * 2
          const radius = organelle.scale[0] * 1.2
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * radius, Math.sin(angle) * radius * 0.3, Math.sin(angle) * radius]}
              scale={0.08}
            >
              <sphereGeometry args={[1, 8, 8]} />
              <meshStandardMaterial color="#EC4899" emissive="#F472B6" emissiveIntensity={0.3} />
            </mesh>
          )
        })}

      {showLabels && (hovered || isSelected) && (
        <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
          <div
            className="px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transform -translate-y-8 animate-in fade-in zoom-in duration-200"
            style={{
              backgroundColor: labelColors.bg,
              border: `2px solid ${labelColors.border}`,
              color: labelColors.text,
              boxShadow: `0 0 20px ${labelColors.border}`,
            }}
          >
            {organelle.name}
          </div>
        </Html>
      )}

      {isSelected && (
        <mesh scale={[organelle.scale[0] * 1.5, organelle.scale[1] * 1.5, organelle.scale[2] * 1.5]}>
          <torusGeometry args={[1, 0.25, 16, 32]} />
          <meshBasicMaterial color={organelle.color} transparent opacity={0.15} wireframe />
        </mesh>
      )}
    </group>
  )
}

function EnhancedOrganelle({
  organelle,
  isSelected,
  onClick,
  showLabels,
  hovered,
  setHovered,
  cellType,
  crossSection,
}: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const labelColors = getLabelColor(organelle.id)

  const adjustedPosition = useMemo(() => {
    const pos: [number, number, number] = [organelle.position[0], organelle.position[1], organelle.position[2]]
    if (cellType === "plant") {
      if (organelle.id === "central-vacuole") {
        pos[1] = 0
        pos[2] = -2
      } else if (organelle.id === "nucleus") {
        pos[0] = 0
        pos[1] = 0
        pos[2] = 1.5
      }
    }
    return pos
  }, [organelle, cellType])

  const renderShape = () => {
    const color = new THREE.Color(organelle.color)
    const emissiveIntensity = isSelected ? 0.5 : hovered ? 0.3 : 0.15

    if (organelle.id === "central-vacuole" && cellType === "plant") {
      return (
        <mesh ref={meshRef} scale={organelle.scale}>
          <sphereGeometry args={[1, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <MeshTransmissionMaterial
            color={color}
            transmission={0.9}
            thickness={0.5}
            roughness={0.1}
            chromaticAberration={0.1}
            anisotropicBlur={0.2}
            distortion={0.1}
            distortionScale={0.2}
            temporalDistortion={0.1}
          />
        </mesh>
      )
    }

    switch (organelle.shape) {
      case "sphere":
        return (
          <mesh ref={meshRef} scale={organelle.scale}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshPhysicalMaterial
              color={color}
              emissive={color}
              emissiveIntensity={emissiveIntensity}
              transparent={organelle.id === "cytoplasm"}
              opacity={organelle.id === "cytoplasm" ? 0.08 : 1}
              roughness={0.25}
              metalness={0.15}
              clearcoat={organelle.id !== "cytoplasm" ? 0.3 : 0}
              clearcoatRoughness={0.2}
            />
          </mesh>
        )

      case "ellipsoid":
        return (
          <mesh ref={meshRef} scale={organelle.scale}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshPhysicalMaterial
              color={color}
              emissive={color}
              emissiveIntensity={emissiveIntensity}
              roughness={0.3}
              metalness={0.2}
              clearcoat={0.4}
            />
          </mesh>
        )

      case "cylinder":
        return (
          <mesh ref={meshRef} scale={organelle.scale} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[1, 1, 1, 32]} />
            <meshPhysicalMaterial
              color={color}
              emissive={color}
              emissiveIntensity={emissiveIntensity}
              roughness={0.25}
              metalness={0.3}
              clearcoat={0.5}
            />
          </mesh>
        )

      case "membrane":
        if (crossSection) return null
        return (
          <mesh ref={meshRef} scale={organelle.scale}>
            {cellType === "plant" && organelle.id === "cell-wall" ? (
              <boxGeometry args={[2, 2, 2, 1, 1, 1]} />
            ) : (
              <sphereGeometry args={[1, 128, 128]} />
            )}
            <meshPhysicalMaterial
              color={color}
              emissive={color}
              emissiveIntensity={emissiveIntensity * 0.5}
              transparent
              opacity={organelle.id === "cell-wall" ? 0.15 : 0.12}
              roughness={0.1}
              metalness={0.05}
              side={THREE.DoubleSide}
              depthWrite={false}
              transmission={0.3}
              thickness={0.2}
            />
          </mesh>
        )

      default:
        return (
          <mesh ref={meshRef} scale={organelle.scale}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhysicalMaterial
              color={color}
              emissive={color}
              emissiveIntensity={emissiveIntensity}
              roughness={0.3}
              metalness={0.15}
              clearcoat={0.3}
            />
          </mesh>
        )
    }
  }

  const shouldShowLabel =
    showLabels &&
    organelle.id !== "cytoplasm" &&
    organelle.id !== "cell-membrane" &&
    organelle.id !== "cell-wall" &&
    !organelle.id.includes("microtubule") &&
    !organelle.id.includes("ribosome")

  return (
    <group position={adjustedPosition}>
      <group
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = "auto"
        }}
      >
        {renderShape()}
      </group>

      {shouldShowLabel && (hovered || isSelected) && (
        <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
          <div
            className="px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transform -translate-y-8 animate-in fade-in zoom-in duration-200"
            style={{
              backgroundColor: labelColors.bg,
              border: `2px solid ${labelColors.border}`,
              color: labelColors.text,
              boxShadow: `0 0 20px ${labelColors.border}`,
            }}
          >
            {organelle.name}
          </div>
        </Html>
      )}

      {isSelected && (
        <mesh scale={[organelle.scale[0] * 1.3, organelle.scale[1] * 1.3, organelle.scale[2] * 1.3]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color={organelle.color} transparent opacity={0.2} wireframe />
        </mesh>
      )}
    </group>
  )
}

function CellScene({
  cellType,
  selectedOrganelle,
  onSelectOrganelle,
  showLabels,
  showMembranes,
  crossSection,
  rotationSpeed,
}: CellProps) {
  const groupRef = useRef<THREE.Group>(null)
  const organelles = useMemo(() => getOrganellesForCell(cellType), [cellType])
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useFrame((_, delta) => {
    if (groupRef.current && rotationSpeed > 0) {
      groupRef.current.rotation.y += delta * rotationSpeed * 0.3
    }
  })

  const visibleOrganelles = organelles.filter((o) => {
    if (!showMembranes) {
      return o.id !== "cell-membrane" && o.id !== "cell-wall" && o.id !== "cytoplasm"
    }
    return true
  })

  const sortedOrganelles = useMemo(() => {
    return [...visibleOrganelles].sort((a, b) => {
      if (a.shape === "membrane" || a.id === "cytoplasm") return -1
      if (b.shape === "membrane" || b.id === "cytoplasm") return 1
      if (a.id === "central-vacuole") return -1
      if (b.id === "central-vacuole") return 1
      const aSize = a.scale[0] * a.scale[1] * a.scale[2]
      const bSize = b.scale[0] * b.scale[1] * b.scale[2]
      return bSize - aSize
    })
  }, [visibleOrganelles])

  return (
    <group ref={groupRef}>
      <CellularParticles color={cellType === "plant" ? "#86EFAC" : "#93C5FD"} count={60} />

      {sortedOrganelles.map((organelle) => {
        const isSelected = selectedOrganelle === organelle.id
        const isHovered = hoveredId === organelle.id
        const handleClick = () => onSelectOrganelle(isSelected ? null : organelle.id)

        if (organelle.id === "nucleus") {
          return (
            <DetailedNucleus
              key={organelle.id}
              organelle={organelle}
              isSelected={isSelected}
              onClick={handleClick}
              showLabels={showLabels}
              hovered={isHovered}
              setHovered={(h: boolean) => setHoveredId(h ? organelle.id : null)}
            />
          )
        }

        if (organelle.id.includes("mitochondria")) {
          return (
            <DetailedMitochondria
              key={organelle.id}
              organelle={organelle}
              isSelected={isSelected}
              onClick={handleClick}
              showLabels={showLabels}
              hovered={isHovered}
              setHovered={(h: boolean) => setHoveredId(h ? organelle.id : null)}
            />
          )
        }

        if (organelle.id === "golgi") {
          return (
            <DetailedGolgi
              key={organelle.id}
              organelle={organelle}
              isSelected={isSelected}
              onClick={handleClick}
              showLabels={showLabels}
              hovered={isHovered}
              setHovered={(h: boolean) => setHoveredId(h ? organelle.id : null)}
            />
          )
        }

        if (organelle.id.includes("chloroplast")) {
          return (
            <DetailedChloroplast
              key={organelle.id}
              organelle={organelle}
              isSelected={isSelected}
              onClick={handleClick}
              showLabels={showLabels}
              hovered={isHovered}
              setHovered={(h: boolean) => setHoveredId(h ? organelle.id : null)}
            />
          )
        }

        if (organelle.id === "rough-er" || organelle.id === "smooth-er") {
          return (
            <DetailedER
              key={organelle.id}
              organelle={organelle}
              isSelected={isSelected}
              onClick={handleClick}
              showLabels={showLabels}
              hovered={isHovered}
              setHovered={(h: boolean) => setHoveredId(h ? organelle.id : null)}
            />
          )
        }

        return (
          <EnhancedOrganelle
            key={organelle.id}
            organelle={organelle}
            isSelected={isSelected}
            onClick={handleClick}
            showLabels={showLabels}
            hovered={isHovered}
            setHovered={(h: boolean) => setHoveredId(h ? organelle.id : null)}
            cellType={cellType}
            crossSection={crossSection}
          />
        )
      })}

      {crossSection && (
        <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[12, 12]} />
          <meshBasicMaterial color="#0f172a" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  )
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial color="#32b8c6" wireframe />
    </mesh>
  )
}

export function Cell3D({
  cellType,
  selectedOrganelle,
  onSelectOrganelle,
  showLabels,
  showMembranes,
  crossSection,
  rotationSpeed,
}: CellProps) {
  return (
    <Canvas camera={{ position: [0, 0, 12], fov: 50 }} dpr={[1, 2]} shadows gl={{ antialias: true, alpha: false }}>
      <color attach="background" args={["#050505"]} />

      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.2}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-10, -10, -5]} intensity={0.6} color="#38BDF8" />
      <pointLight position={[0, 0, 0]} intensity={0.4} color="#A78BFA" distance={15} decay={2} />
      <spotLight position={[5, 5, 5]} intensity={0.5} angle={0.3} penumbra={1} color="#F59E0B" />

      <Suspense fallback={<LoadingFallback />}>
        <CellScene
          cellType={cellType}
          selectedOrganelle={selectedOrganelle}
          onSelectOrganelle={onSelectOrganelle}
          showLabels={showLabels}
          showMembranes={showMembranes}
          crossSection={crossSection}
          rotationSpeed={rotationSpeed}
        />

        <Environment preset="studio" environmentIntensity={0.5} />
      </Suspense>

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={6}
        maxDistance={25}
        autoRotate={false}
        enableDamping
        dampingFactor={0.05}
      />
    </Canvas>
  )
}
