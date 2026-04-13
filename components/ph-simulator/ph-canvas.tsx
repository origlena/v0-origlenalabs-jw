"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text, RoundedBox } from "@react-three/drei"
import * as THREE from "three"

interface PHCanvasProps {
  pH: number
  solution: string
  isDropping: boolean
  onDropComplete: () => void
}

// Animated liquid in beaker
function Liquid({ pH, isDropping }: { pH: number; isDropping: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [targetColor, setTargetColor] = useState(new THREE.Color())

  useEffect(() => {
    const getColorForPH = (ph: number) => {
      if (ph < 1) return new THREE.Color("#ff0000")
      if (ph < 2) return new THREE.Color("#ff3300")
      if (ph < 3) return new THREE.Color("#ff6600")
      if (ph < 4) return new THREE.Color("#ff9900")
      if (ph < 5) return new THREE.Color("#ffcc00")
      if (ph < 6) return new THREE.Color("#ccff00")
      if (ph < 7) return new THREE.Color("#66ff00")
      if (ph === 7) return new THREE.Color("#00ff66")
      if (ph < 8) return new THREE.Color("#00ffcc")
      if (ph < 9) return new THREE.Color("#00ccff")
      if (ph < 10) return new THREE.Color("#0099ff")
      if (ph < 11) return new THREE.Color("#0066ff")
      if (ph < 12) return new THREE.Color("#3333ff")
      if (ph < 13) return new THREE.Color("#6600ff")
      return new THREE.Color("#9900ff")
    }
    setTargetColor(getColorForPH(pH))
  }, [pH])

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial
      material.color.lerp(targetColor, 0.05)
      const time = state.clock.elapsedTime
      meshRef.current.position.y = -0.1 + Math.sin(time * 2) * 0.02
      if (isDropping) {
        meshRef.current.scale.y = 1 + Math.sin(time * 10) * 0.02
      }
    }
  })

  return (
    <mesh ref={meshRef} position={[0, -0.1, 0]}>
      <cylinderGeometry args={[1.4, 1.4, 2.5, 32]} />
      <meshStandardMaterial transparent opacity={0.85} roughness={0.1} metalness={0.1} />
    </mesh>
  )
}

// Glass beaker
function Beaker() {
  return (
    <group position={[0, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[1.5, 1.5, 3, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.2}
          roughness={0}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5, 32]} />
        <meshPhysicalMaterial color="#ffffff" transparent opacity={0.3} roughness={0} metalness={0.1} />
      </mesh>

      {[0.5, 0, -0.5, -1].map((y, i) => (
        <mesh key={i} position={[1.52, y, 0]}>
          <boxGeometry args={[0.15, 0.02, 0.3]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
        </mesh>
      ))}

      <mesh position={[0, 1.5, 0]}>
        <torusGeometry args={[1.5, 0.08, 16, 32]} />
        <meshStandardMaterial color="#aaaaaa" metalness={0.3} roughness={0.5} />
      </mesh>
    </group>
  )
}

// Dropper/pipette
function Dropper({ isDropping, solution }: { isDropping: boolean; solution: string }) {
  const groupRef = useRef<THREE.Group>(null)
  const dropRef = useRef<THREE.Mesh>(null)
  const [dropY, setDropY] = useState(4)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = 3.5 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1
    }

    if (isDropping && dropRef.current) {
      setDropY((prev) => {
        const newY = prev - 0.15
        if (newY < 1) {
          return 4
        }
        return newY
      })
      dropRef.current.position.y = dropY - 3.5
      dropRef.current.scale.setScalar(1 - (4 - dropY) * 0.1)
    }
  })

  const dropperColor = solution.includes("Acid") ? "#ff4444" : solution.includes("Base") ? "#4444ff" : "#44ff44"

  return (
    <group ref={groupRef} position={[0, 3.5, 0]}>
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 1.5, 16]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#222222" roughness={0.3} />
      </mesh>

      <mesh position={[0, -0.1, 0]}>
        <coneGeometry args={[0.1, 0.4, 16]} />
        <meshStandardMaterial color="#444444" />
      </mesh>

      {isDropping && (
        <mesh ref={dropRef} position={[0, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color={dropperColor}
            transparent
            opacity={0.9}
            emissive={dropperColor}
            emissiveIntensity={0.3}
          />
        </mesh>
      )}
    </group>
  )
}

function PHMeter({ pH }: { pH: number }) {
  return (
    <group position={[3.5, 0, 0]}>
      <RoundedBox args={[1.5, 2.5, 0.5]} radius={0.1} position={[0, 1, 0]}>
        <meshStandardMaterial color="#2a2a2a" />
      </RoundedBox>

      <mesh position={[0, 1.3, 0.26]}>
        <planeGeometry args={[1.2, 0.8]} />
        <meshBasicMaterial color="#001100" />
      </mesh>

      <Text position={[0, 1.35, 0.28]} fontSize={0.4} color="#00ff00" anchorX="center" anchorY="middle">
        {pH.toFixed(2)}
      </Text>

      <Text position={[0, 1.05, 0.28]} fontSize={0.12} color="#00aa00" anchorX="center">
        pH Level
      </Text>

      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.08, 0.06, 2, 16]} />
        <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
      </mesh>

      <mesh position={[0, -2, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}

// Bubbles when reaction occurs
function Bubbles({ isDropping }: { isDropping: boolean }) {
  const bubblesRef = useRef<THREE.Group>(null)
  const [bubbles, setBubbles] = useState<{ x: number; z: number; speed: number; size: number }[]>([])

  useEffect(() => {
    if (isDropping) {
      const newBubbles = Array.from({ length: 15 }, () => ({
        x: (Math.random() - 0.5) * 2,
        z: (Math.random() - 0.5) * 2,
        speed: 0.02 + Math.random() * 0.03,
        size: 0.03 + Math.random() * 0.05,
      }))
      setBubbles(newBubbles)
    }
  }, [isDropping])

  useFrame(() => {
    if (bubblesRef.current && isDropping) {
      bubblesRef.current.children.forEach((bubble, i) => {
        bubble.position.y += bubbles[i]?.speed || 0.02
        if (bubble.position.y > 1) {
          bubble.position.y = -1
        }
      })
    }
  })

  if (!isDropping) return null

  return (
    <group ref={bubblesRef}>
      {bubbles.map((b, i) => (
        <mesh key={i} position={[b.x, -1 + Math.random() * 2, b.z]}>
          <sphereGeometry args={[b.size, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

// Scale/ruler on the side
function PHScale({ pH }: { pH: number }) {
  const colors = [
    "#ff0000",
    "#ff3300",
    "#ff6600",
    "#ff9900",
    "#ffcc00",
    "#ccff00",
    "#66ff00",
    "#00ff66",
    "#00ffcc",
    "#00ccff",
    "#0099ff",
    "#0066ff",
    "#3333ff",
    "#6600ff",
  ]

  return (
    <group position={[-3.5, 0, 0]}>
      <mesh position={[0, 0, -0.1]}>
        <boxGeometry args={[0.8, 4, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {colors.map((color, i) => (
        <mesh key={i} position={[0, 1.75 - i * 0.25, 0]}>
          <boxGeometry args={[0.5, 0.23, 0.05]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}

      {[0, 2, 4, 6, 7, 8, 10, 12, 14].map((val) => (
        <Text key={val} position={[0.55, 1.75 - val * 0.25, 0]} fontSize={0.15} color="#ffffff" anchorX="left">
          {val.toString()}
        </Text>
      ))}

      <group position={[-0.5, 1.75 - pH * 0.25, 0.1]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <coneGeometry args={[0.1, 0.2, 3]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      <Text position={[0, 2.3, 0]} fontSize={0.15} color="#888888" anchorX="center">
        pH Scale
      </Text>
    </group>
  )
}

// Scene component
function PHScene({ pH, solution, isDropping, onDropComplete }: PHCanvasProps) {
  useEffect(() => {
    if (isDropping) {
      const timer = setTimeout(onDropComplete, 1500)
      return () => clearTimeout(timer)
    }
  }, [isDropping, onDropComplete])

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.3} />
      <pointLight position={[0, 3, 3]} intensity={0.5} color="#ffffff" />

      <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>

      <mesh position={[0, -1.55, 0]}>
        <boxGeometry args={[10, 0.1, 6]} />
        <meshStandardMaterial color="#2d2d3a" metalness={0.1} roughness={0.8} />
      </mesh>

      <Beaker />
      <Liquid pH={pH} isDropping={isDropping} />
      <Bubbles isDropping={isDropping} />
      <Dropper isDropping={isDropping} solution={solution} />
      <PHMeter pH={pH} />
      <PHScale pH={pH} />

      <OrbitControls enablePan={true} enableZoom={true} minDistance={5} maxDistance={15} target={[0, 0, 0]} />
    </>
  )
}

export function PHCanvas({ pH, solution, isDropping, onDropComplete }: PHCanvasProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-chemistry border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading pH Simulator...</p>
        </div>
      </div>
    )
  }

  return (
    <Canvas
      camera={{ position: [0, 2, 8], fov: 50 }}
      shadows
      style={{ background: "linear-gradient(to bottom, #0f0f1a, #1a1a2e)" }}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
    >
      <PHScene pH={pH} solution={solution} isDropping={isDropping} onDropComplete={onDropComplete} />
    </Canvas>
  )
}
