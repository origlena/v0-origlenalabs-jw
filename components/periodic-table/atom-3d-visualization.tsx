"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useRef, useEffect, useState } from "react"
import type * as THREE from "three"
import type { Element } from "./elements-data"

function AtomScene({ element, categoryColor }: { element: Element; categoryColor: string }) {
  const groupRef = useRef<THREE.Group>(null)
  const { camera } = useThree()
  const [mouseDown, setMouseDown] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  useEffect(() => {
    camera.position.set(0, 0, 3)
  }, [camera])

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      setMouseDown(true)
      setMouse({ x: e.clientX, y: e.clientY })
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseDown) {
        const deltaX = e.clientX - mouse.x
        const deltaY = e.clientY - mouse.y
        setRotation((prev) => ({
          x: prev.x + deltaY * 0.005,
          y: prev.y + deltaX * 0.005,
        }))
        setMouse({ x: e.clientX, y: e.clientY })
      }
    }

    const handleMouseUp = () => {
      setMouseDown(false)
    }

    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [mouseDown, mouse])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = rotation.x
      groupRef.current.rotation.y = rotation.y
    }
  })

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <group ref={groupRef}>
        {/* Nucleus */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color={categoryColor} emissive={categoryColor} emissiveIntensity={0.8} />
        </mesh>

        {/* Electron shells */}
        {element.shells.map((electrons, shellIndex) => {
          const radius = 0.6 + shellIndex * 0.5
          return (
            <group key={shellIndex}>
              {/* Orbit path */}
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[radius, 0.015, 8, 64]} />
                <meshStandardMaterial color="#4dabf7" transparent opacity={0.4} />
              </mesh>

              {/* Electrons */}
              {Array.from({ length: Math.min(electrons, 8) }).map((_, i) => {
                const angle = (i / Math.min(electrons, 8)) * Math.PI * 2
                return (
                  <mesh key={i} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshStandardMaterial color="#4dabf7" emissive="#4dabf7" emissiveIntensity={1} />
                  </mesh>
                )
              })}
            </group>
          )
        })}
      </group>
    </>
  )
}

export function Atom3DVisualization({ element, categoryColor }: { element: Element; categoryColor: string }) {
  return (
    <div className="w-full h-48 rounded-lg overflow-hidden bg-gradient-to-b from-background to-muted/30 cursor-grab active:cursor-grabbing">
      <div className="absolute top-2 left-2 text-xs text-muted-foreground bg-background/70 px-2 py-1 rounded pointer-events-none">
        Drag to rotate
      </div>
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }} style={{ background: "transparent" }}>
        <AtomScene element={element} categoryColor={categoryColor} />
      </Canvas>
    </div>
  )
}
