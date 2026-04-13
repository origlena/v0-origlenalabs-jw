"use client"

import { useState, useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Text, RoundedBox } from "@react-three/drei"
import * as THREE from "three"
import { elements, tableLayout, categoryColors, type Element } from "./elements-data"

interface FilteredElement extends Element {
  isHighlighted: boolean
}

// Single element tile component
function ElementTile({
  element,
  position,
  isSelected,
  isHighlighted,
  onSelect,
  viewMode,
}: {
  element: Element
  position: [number, number, number]
  isSelected: boolean
  isHighlighted: boolean
  onSelect: (el: Element | null) => void
  viewMode: "category" | "state" | "electronegativity"
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  const color = useMemo(() => {
    if (viewMode === "category") {
      return categoryColors[element.category] || "#868e96"
    } else if (viewMode === "state") {
      const stateColors = { solid: "#4dabf7", liquid: "#ff6b6b", gas: "#69db7c", unknown: "#868e96" }
      return stateColors[element.state]
    } else {
      const en = element.electronegativity || 0
      const t = en / 4
      return new THREE.Color().setHSL(0.6 - t * 0.6, 0.8, 0.5).getStyle()
    }
  }, [element, viewMode])

  const scale = isSelected ? 1.3 : hovered ? 1.15 : 1
  const zOffset = isSelected ? 0.8 : hovered ? 0.5 : 0

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.15)
      const targetZ = position[2] + zOffset
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.15)
    }
  })

  const opacity = isHighlighted ? 1 : 0.15
  const textOpacity = isHighlighted ? 1 : 0.2

  return (
    <group position={position}>
      <RoundedBox
        ref={meshRef}
        args={[0.9, 0.9, 0.15]}
        radius={0.05}
        smoothness={4}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = "default"
        }}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(isSelected ? null : element)
        }}
      >
        <meshStandardMaterial
          color={color}
          transparent
          opacity={opacity}
          metalness={0.3}
          roughness={0.4}
          emissive={color}
          emissiveIntensity={isSelected ? 0.5 : hovered ? 0.3 : 0.05}
        />
      </RoundedBox>

      <Text
        position={[-0.32, 0.32, 0.1]}
        fontSize={0.12}
        color="#ffffff"
        fillOpacity={textOpacity}
        anchorX="left"
        anchorY="top"
      >
        {element.atomicNumber}
      </Text>

      <Text
        position={[0, 0.05, 0.1]}
        fontSize={0.3}
        fontWeight={700}
        color="#ffffff"
        fillOpacity={textOpacity}
        anchorX="center"
        anchorY="middle"
      >
        {element.symbol}
      </Text>

      <Text
        position={[0, -0.25, 0.1]}
        fontSize={0.09}
        color="#ffffff"
        fillOpacity={textOpacity}
        anchorX="center"
        anchorY="middle"
        maxWidth={0.85}
      >
        {element.name}
      </Text>

      <Text
        position={[0, -0.38, 0.1]}
        fontSize={0.08}
        color="#ffffff"
        fillOpacity={textOpacity * 0.7}
        anchorX="center"
        anchorY="middle"
      >
        {element.atomicMass.toFixed(2)}
      </Text>

      {isSelected && (
        <>
          <pointLight position={[0, 0, 0.8]} intensity={2} distance={3} color={color} />
          <mesh position={[0, 0, -0.1]}>
            <planeGeometry args={[1.1, 1.1]} />
            <meshBasicMaterial color={color} transparent opacity={0.3} />
          </mesh>
        </>
      )}

      {hovered && !isSelected && <pointLight position={[0, 0, 0.5]} intensity={1} distance={2} color={color} />}
    </group>
  )
}

// Electron shell visualization
function ElectronShells({ element }: { element: Element }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.5} />
      </mesh>

      {element.shells.map((electrons, shellIndex) => {
        const radius = 0.6 + shellIndex * 0.4
        return (
          <group key={shellIndex}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[radius, 0.02, 8, 64]} />
              <meshStandardMaterial color="#4dabf7" transparent opacity={0.3} />
            </mesh>

            {Array.from({ length: electrons }).map((_, i) => {
              const angle = (i / electrons) * Math.PI * 2
              return (
                <mesh key={i} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}>
                  <sphereGeometry args={[0.08, 16, 16]} />
                  <meshStandardMaterial color="#4dabf7" emissive="#4dabf7" emissiveIntensity={0.8} />
                </mesh>
              )
            })}
          </group>
        )
      })}
    </group>
  )
}

// Main periodic table scene
function PeriodicTableScene({
  selectedElement,
  onSelectElement,
  viewMode,
  searchQuery,
  highlightedCategory,
  show3DAtom,
}: {
  selectedElement: Element | null
  onSelectElement: (el: Element | null) => void
  viewMode: "category" | "state" | "electronegativity"
  searchQuery: string
  highlightedCategory: string | null
  show3DAtom: boolean
}) {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(8, 5, 15)
  }, [camera])

  const filteredElements = useMemo((): FilteredElement[] => {
    return elements.map((el) => {
      const matchesSearch =
        searchQuery === "" ||
        el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.atomicNumber.toString().includes(searchQuery)
      const matchesCategory = highlightedCategory === null || el.category === highlightedCategory
      return { ...el, isHighlighted: matchesSearch && matchesCategory }
    })
  }, [searchQuery, highlightedCategory])

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} />
      <pointLight position={[0, 0, 10]} intensity={0.5} />

      {Array.from({ length: 200 }).map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, -20 - Math.random() * 30]}>
          <sphereGeometry args={[0.05 + Math.random() * 0.05, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}

      <group position={[-8.5, 4, 0]}>
        {filteredElements.map((element) => {
          const layout = tableLayout[element.atomicNumber]
          if (!layout) return null
          const [row, col] = layout
          return (
            <ElementTile
              key={element.atomicNumber}
              element={element}
              position={[col, -row, 0]}
              isSelected={selectedElement?.atomicNumber === element.atomicNumber}
              isHighlighted={element.isHighlighted}
              onSelect={onSelectElement}
              viewMode={viewMode}
            />
          )
        })}

        <Text position={[1, -5.5, 0]} fontSize={0.25} color="#f783ac">
          57-71
        </Text>
        <Text position={[1, -6.5, 0]} fontSize={0.25} color="#e599f7">
          89-103
        </Text>
        <Text position={[-0.5, -8, 0]} fontSize={0.2} color="#f783ac">
          Lanthanides
        </Text>
        <Text position={[-0.5, -9, 0]} fontSize={0.2} color="#e599f7">
          Actinides
        </Text>
      </group>

      {/* Atom visualization moved to sidebar for better visibility */}
      {/* {show3DAtom && selectedElement && (
        <group position={[12, 0, 0]}>
          <ElectronShells element={selectedElement} />
        </group>
      )} */}

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={40}
        target={[0, 0, 0]}
      />
    </>
  )
}

export function PeriodicTable3D({
  selectedElement,
  onSelectElement,
  viewMode,
  searchQuery,
  highlightedCategory,
  show3DAtom,
}: {
  selectedElement: Element | null
  onSelectElement: (el: Element | null) => void
  viewMode: "category" | "state" | "electronegativity"
  searchQuery: string
  highlightedCategory: string | null
  show3DAtom: boolean
}) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading Periodic Table...</p>
        </div>
      </div>
    )
  }

  return (
    <Canvas
      camera={{ position: [8, 5, 15], fov: 60 }}
      style={{ background: "linear-gradient(to bottom, #0f0f23, #1a1a2e)" }}
    >
      <PeriodicTableScene
        selectedElement={selectedElement}
        onSelectElement={onSelectElement}
        viewMode={viewMode}
        searchQuery={searchQuery}
        highlightedCategory={highlightedCategory}
        show3DAtom={show3DAtom}
      />
    </Canvas>
  )
}
