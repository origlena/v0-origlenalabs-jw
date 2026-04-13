"use client"

import { useState, useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Stars, MeshDistortMaterial } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { X, Sparkles, Atom } from "lucide-react"
import type * as THREE from "three"
import type { JSX } from "react/jsx-runtime"

function AnimatedAtom({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  const electron1Ref = useRef<THREE.Mesh>(null)
  const electron2Ref = useRef<THREE.Mesh>(null)
  const electron3Ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.3
    }
    if (electron1Ref.current) {
      electron1Ref.current.position.x = Math.cos(t * 2) * 1.5
      electron1Ref.current.position.z = Math.sin(t * 2) * 1.5
    }
    if (electron2Ref.current) {
      electron2Ref.current.position.x = Math.cos(t * 2 + 2) * 1.5
      electron2Ref.current.position.y = Math.sin(t * 2 + 2) * 1.5
    }
    if (electron3Ref.current) {
      electron3Ref.current.position.z = Math.cos(t * 2 + 4) * 1.5
      electron3Ref.current.position.y = Math.sin(t * 2 + 4) * 1.5
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Nucleus */}
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <MeshDistortMaterial color="#32b8c6" distort={0.3} speed={2} />
      </mesh>
      {/* Electrons */}
      <mesh ref={electron1Ref}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.5} />
      </mesh>
      <mesh ref={electron2Ref}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
      </mesh>
      <mesh ref={electron3Ref}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.5} />
      </mesh>
      {/* Orbits */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <meshStandardMaterial color="#32b8c6" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <meshStandardMaterial color="#32b8c6" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, Math.PI / 2]}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <meshStandardMaterial color="#32b8c6" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

function FloatingDNA({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.5
    }
  })

  const basePairs = 8
  const elements: JSX.Element[] = []

  for (let i = 0; i < basePairs; i++) {
    const angle = (i / basePairs) * Math.PI * 2
    const y = (i - basePairs / 2) * 0.4
    const radius = 0.8

    elements.push(
      <mesh key={`left-${i}`} position={[Math.cos(angle) * radius, y, Math.sin(angle) * radius]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.3} />
      </mesh>,
    )

    elements.push(
      <mesh key={`right-${i}`} position={[Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.3} />
      </mesh>,
    )

    const colors = ["#ef4444", "#22c55e", "#3b82f6", "#eab308"]
    elements.push(
      <mesh key={`base-${i}`} position={[0, y, 0]} rotation={[0, angle, 0]}>
        <cylinderGeometry args={[0.03, 0.03, radius * 2, 8]} />
        <meshStandardMaterial color={colors[i % 4]} emissive={colors[i % 4]} emissiveIntensity={0.2} />
      </mesh>,
    )
  }

  return (
    <group ref={groupRef} position={position} scale={0.8}>
      {elements}
    </group>
  )
}

function CentralOrb() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2
      meshRef.current.scale.setScalar(1 + Math.sin(clock.getElapsedTime()) * 0.05)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#32b8c6"
          emissive="#32b8c6"
          emissiveIntensity={0.3}
          distort={0.2}
          speed={3}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#32b8c6" emissiveIntensity={1} />
      </mesh>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#32b8c6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
      <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />

      <CentralOrb />
      <AnimatedAtom position={[-3, 0, -2]} />
      <FloatingDNA position={[3, 0, -2]} />

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 5 - 3]}>
            <icosahedronGeometry args={[0.05 + Math.random() * 0.05, 0]} />
            <meshStandardMaterial
              color={["#32b8c6", "#22c55e", "#3b82f6", "#f97316", "#a855f7"][i % 5]}
              emissive={["#32b8c6", "#22c55e", "#3b82f6", "#f97316", "#a855f7"][i % 5]}
              emissiveIntensity={0.5}
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

export function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Check if user has seen the popup before
    const hasSeenWelcome = localStorage.getItem("origlena-welcome-seen")
    if (!hasSeenWelcome) {
      setIsVisible(true)
    }
  }, [])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
      localStorage.setItem("origlena-welcome-seen", "true")
    }, 500)
  }

  if (!isMounted || !isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />

      {/* Popup Content */}
      <div
        className={`relative w-full max-w-4xl mx-4 bg-gradient-to-br from-background via-background to-primary/10 rounded-2xl border border-primary/30 shadow-2xl shadow-primary/20 overflow-hidden transition-all duration-500 ${
          isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/50 hover:bg-background/80 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* 3D Canvas */}
        <div className="h-[300px] md:h-[350px] w-full">
          <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
            <Scene />
          </Canvas>
        </div>

        {/* Text Content */}
        <div className="p-6 md:p-8 text-center space-y-4 bg-gradient-to-t from-background via-background/95 to-transparent -mt-20 relative">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Sparkles className="h-5 w-5 animate-pulse" />
            <span className="text-sm font-medium uppercase tracking-wider">Welcome to</span>
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>

          <div className="flex items-center justify-center gap-3">
            <Atom className="h-10 w-10 md:h-12 md:w-12 text-primary animate-spin" style={{ animationDuration: "8s" }} />
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary via-biology to-physics bg-clip-text text-transparent">
              Origlena Labs
            </h1>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore Science Through Interactive 3D Simulations
          </p>

          <p className="text-sm text-muted-foreground">
            Experience Physics, Chemistry, Biology, and Mathematics like never before
          </p>

          {/* Developer credit */}
          <div className="pt-4 border-t border-border/50 mt-6">
            <p className="text-xs text-muted-foreground">Developed with passion by</p>
            <p className="text-sm font-semibold text-primary mt-1">Jarjish Alam</p>
            <p className="text-xs text-muted-foreground">
              Class 9, PM SHRI Jawahar Navodaya Vidyalaya, Dakshin Dinajpur, West Bengal
            </p>
          </div>

          <Button
            onClick={handleClose}
            size="lg"
            className="mt-4 bg-gradient-to-r from-primary to-biology hover:opacity-90 transition-opacity"
          >
            Start Exploring
          </Button>
        </div>
      </div>
    </div>
  )
}

// Export a function to reset the welcome popup (for testing)
export function resetWelcomePopup() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("origlena-welcome-seen")
  }
}
