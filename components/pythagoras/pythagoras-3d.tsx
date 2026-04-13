"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Html } from "@react-three/drei"
import * as THREE from "three"
import { Float } from "@react-three/drei" // Import Float from @react-three/drei

interface UnitCubeProps {
  position: [number, number, number]
  color: string
  delay: number
  animate: boolean
  pulse?: boolean
}

function UnitCube({ position, color, delay, animate, pulse }: UnitCubeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [scale, setScale] = useState(animate ? 0 : 1)
  const [yOffset, setYOffset] = useState(animate ? 5 : 0)

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setScale(1)
        setYOffset(0)
      }, delay * 50)
      return () => clearTimeout(timer)
    } else {
      setScale(1)
      setYOffset(0)
    }
  }, [animate, delay])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1)
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, position[1] + yOffset, 0.1)

      if (pulse) {
        const pulseScale = 1 + Math.sin(state.clock.elapsedTime * 3 + delay * 0.5) * 0.05
        meshRef.current.scale.setScalar(pulseScale)
      }
    }
  })

  return (
    <mesh ref={meshRef} position={[position[0], position[1] + yOffset, position[2]]} castShadow receiveShadow>
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} emissive={color} emissiveIntensity={0.1} />
    </mesh>
  )
}

interface SquareOfCubesProps {
  size: number
  color: string
  position: [number, number, number]
  rotation?: number
  animate: boolean
  pulse?: boolean
  label?: string
  showLabel?: boolean
}

function SquareOfCubes({ size, color, position, rotation = 0, animate, pulse, label, showLabel }: SquareOfCubesProps) {
  const groupRef = useRef<THREE.Group>(null)
  const cubes = useMemo(() => {
    const arr = []
    let index = 0
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        arr.push({
          key: `${i}-${j}`,
          position: [i - size / 2 + 0.5, 0.5, j - size / 2 + 0.5] as [number, number, number],
          delay: index,
        })
        index++
      }
    }
    return arr
  }, [size])

  return (
    <group ref={groupRef} position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[size, 0.1, size]} />
        <meshStandardMaterial color={color} transparent opacity={0.3} />
      </mesh>

      {cubes.map((cube) => (
        <UnitCube
          key={cube.key}
          position={cube.position}
          color={color}
          delay={cube.delay}
          animate={animate}
          pulse={pulse}
        />
      ))}

      {showLabel && label && (
        <Html position={[0, size + 1.5, 0]}>
          <div style={{ color: color, fontSize: "1.2em", textAlign: "center" }}>{label}</div>
        </Html>
      )}
    </group>
  )
}

interface RightTriangleProps {
  sideA: number
  sideB: number
  showLabels: boolean
}

function RightTriangle({ sideA, sideB, showLabels }: RightTriangleProps) {
  const sideC = Math.sqrt(sideA * sideA + sideB * sideB)

  const triangleShape = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, 0)
    shape.lineTo(sideB, 0)
    shape.lineTo(0, sideA)
    shape.lineTo(0, 0)
    return shape
  }, [sideA, sideB])

  const rightAngleSize = Math.min(sideA, sideB) * 0.15

  return (
    <group position={[-sideB / 2, 0.1, sideA / 2]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh castShadow>
        <extrudeGeometry args={[triangleShape, { depth: 0.3, bevelEnabled: false }]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.4} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[rightAngleSize / 2, rightAngleSize / 2, 0.35]}>
        <boxGeometry args={[rightAngleSize, rightAngleSize, 0.05]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>

      {showLabels && (
        <>
          <Html position={[-1.2, sideA / 2, 0.2]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
            <div style={{ color: "#22c55e", fontSize: "0.8em", textAlign: "center" }}>{`a = ${sideA}`}</div>
          </Html>

          <Html position={[sideB / 2, -1, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
            <div style={{ color: "#ef4444", fontSize: "0.8em", textAlign: "center" }}>{`b = ${sideB}`}</div>
          </Html>

          <Html
            position={[sideB / 2 + 0.8, sideA / 2 + 0.5, 0.2]}
            rotation={[Math.PI / 2, 0, -Math.atan2(sideA, sideB)]}
          >
            <div style={{ color: "#a855f7", fontSize: "0.8em", textAlign: "center" }}>{`c = ${sideC.toFixed(2)}`}</div>
          </Html>
        </>
      )}
    </group>
  )
}

interface SceneProps {
  sideA: number
  sideB: number
  showSquares: boolean
  showLabels: boolean
  currentStep: number
}

function Scene({ sideA, sideB, showSquares, showLabels, currentStep }: SceneProps) {
  const sideC = Math.sqrt(sideA * sideA + sideB * sideB)
  const roundedC = Math.round(sideC)

  const squareAPos: [number, number, number] = [-sideB / 2 - sideA / 2 - 0.5, 0, sideA / 2]
  const squareBPos: [number, number, number] = [0, 0, sideA / 2 + sideB / 2 + 0.5]

  const angle = Math.atan2(sideA, sideB)
  const squareCPos: [number, number, number] = [
    sideB / 2 + (roundedC / 2) * Math.cos(angle + Math.PI / 2) + 1,
    0,
    -sideA / 2 + (roundedC / 2) * Math.sin(angle + Math.PI / 2) - 1,
  ]

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[20, 30, 20]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, 15, 10]} intensity={0.5} color="#32b8c6" />
      <pointLight position={[10, 15, -10]} intensity={0.3} color="#a855f7" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      <gridHelper args={[50, 50, "#3b82f6", "#334155"]} position={[0, 0.01, 0]} />

      <Float speed={1} rotationIntensity={0} floatIntensity={0.2}>
        <RightTriangle sideA={sideA} sideB={sideB} showLabels={showLabels} />
      </Float>

      {showSquares && currentStep >= 1 && (
        <SquareOfCubes
          size={sideA}
          color="#22c55e"
          position={squareAPos}
          animate={currentStep === 1}
          pulse={currentStep >= 4}
          label={`a² = ${sideA * sideA}`}
          showLabel={showLabels}
        />
      )}

      {showSquares && currentStep >= 2 && (
        <SquareOfCubes
          size={sideB}
          color="#ef4444"
          position={squareBPos}
          animate={currentStep === 2}
          pulse={currentStep >= 4}
          label={`b² = ${sideB * sideB}`}
          showLabel={showLabels}
        />
      )}

      {showSquares && currentStep >= 3 && (
        <SquareOfCubes
          size={roundedC}
          color="#a855f7"
          position={squareCPos}
          rotation={-angle}
          animate={currentStep === 3}
          pulse={currentStep >= 4}
          label={`c² = ${roundedC}² = ${roundedC * roundedC} ≈ ${(sideC * sideC).toFixed(1)}`}
          showLabel={showLabels}
        />
      )}

      {currentStep >= 4 && (
        <Html position={[0, 8, 0]}>
          <div style={{ color: "#ffffff", fontSize: "1.5em", textAlign: "center" }}>
            {`${sideA}² + ${sideB}² = ${sideA * sideA} + ${sideB * sideB} = ${sideA * sideA + sideB * sideB}`}
          </div>
        </Html>
      )}

      {currentStep >= 4 && (
        <Html position={[0, 6, 0]}>
          <div style={{ color: "#22c55e", fontSize: "1.2em", textAlign: "center" }}>
            {`c² = ${roundedC}² = ${roundedC * roundedC} ≈ ${(sideC * sideC).toFixed(1)}`}
          </div>
        </Html>
      )}

      {currentStep >= 5 && (
        <Html position={[0, 4, 0]}>
          <div style={{ color: "#f59e0b", fontSize: "1.8em", textAlign: "center" }}>a² + b² = c² ✓ PROVED!</div>
        </Html>
      )}

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={10}
        maxDistance={60}
        maxPolarAngle={Math.PI / 2.1}
      />

      <Environment preset="city" />
    </>
  )
}

interface Pythagoras3DProps {
  sideA: number
  sideB: number
  showSquares: boolean
  showLabels: boolean
  currentStep: number
  isAnimating: boolean
  animationProgress: number
}

export function Pythagoras3D({ sideA, sideB, showSquares, showLabels, currentStep }: Pythagoras3DProps) {
  return (
    <div className="w-full h-full min-h-[500px]">
      <Canvas camera={{ position: [15, 20, 25], fov: 50 }} shadows gl={{ antialias: true }} className="touch-none">
        <Scene
          sideA={sideA}
          sideB={sideB}
          showSquares={showSquares}
          showLabels={showLabels}
          currentStep={currentStep}
        />
      </Canvas>
    </div>
  )
}
