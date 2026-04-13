"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Html, Environment, Sky, Sparkles } from "@react-three/drei"
import { useRef, useState, Suspense, useMemo } from "react"
import * as THREE from "three"
import type { PlantedCrop, Season } from "@/app/simulations/agriculture/crop-farming/page"

interface FarmProps {
  season: Season
  plantedCrops: PlantedCrop[]
  selectedPlant: string | null
  onSelectPlant: (id: string | null) => void
  onPlantCrop: (position: [number, number, number]) => void
  showLabels: boolean
  showGrid: boolean
  rotationSpeed: number
  daysPassed: number
}

function WheatPlant({ crop, scale, healthColor }: { crop: PlantedCrop; scale: number; healthColor: THREE.Color }) {
  const stemRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (stemRef.current) {
      // Realistic wind sway
      stemRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2 + crop.position[0]) * 0.08
      stemRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 1.5 + crop.position[2]) * 0.06
    }
  })

  return (
    <group ref={stemRef}>
      {/* Main stem with segments */}
      {[0, 1, 2, 3, 4].map((segment) => (
        <mesh key={segment} position={[0, segment * scale * 0.15, 0]}>
          <cylinderGeometry args={[0.02, 0.025, scale * 0.15, 8]} />
          <meshStandardMaterial color={healthColor} roughness={0.8} metalness={0.1} />
        </mesh>
      ))}

      {/* Wheat grains cluster */}
      <group position={[0, scale * 0.8, 0]}>
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2
          const radius = 0.08
          return (
            <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(i * 0.5) * 0.1, Math.sin(angle) * radius]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial color="#F4A460" roughness={0.6} />
            </mesh>
          )
        })}
      </group>

      {/* Leaves */}
      {[0, 1, 2].map((leaf) => (
        <group key={leaf} position={[0, leaf * scale * 0.2 + 0.1, 0]}>
          <mesh rotation={[0, (leaf * Math.PI) / 3, Math.PI / 6]}>
            <planeGeometry args={[0.15, scale * 0.3]} />
            <meshStandardMaterial color={healthColor} side={THREE.DoubleSide} roughness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function TomatoPlant({ crop, scale, healthColor }: { crop: PlantedCrop; scale: number; healthColor: THREE.Color }) {
  const plantRef = useRef<THREE.Group>(null)
  const fruitCount = Math.floor((crop.health.growth / 100) * 5)

  useFrame((state) => {
    if (plantRef.current) {
      plantRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <group ref={plantRef}>
      {/* Main stem - thicker for tomato */}
      <mesh position={[0, scale * 0.4, 0]}>
        <cylinderGeometry args={[0.04, 0.06, scale * 0.8, 8]} />
        <meshStandardMaterial color={healthColor} roughness={0.8} />
      </mesh>

      {/* Branches */}
      {[0, 1, 2].map((branch) => (
        <group
          key={branch}
          position={[0, scale * 0.3 + branch * 0.2, 0]}
          rotation={[0, (branch * Math.PI) / 3, Math.PI / 6]}
        >
          <mesh>
            <cylinderGeometry args={[0.02, 0.03, scale * 0.4, 6]} />
            <meshStandardMaterial color={healthColor} roughness={0.8} />
          </mesh>

          {/* Leaves on branches */}
          {[0, 1, 2].map((leafIdx) => (
            <mesh key={leafIdx} position={[0, leafIdx * 0.1, 0]} rotation={[0, (leafIdx * Math.PI) / 4, Math.PI / 3]}>
              <planeGeometry args={[0.2, 0.15]} />
              <meshStandardMaterial color="#228B22" side={THREE.DoubleSide} roughness={0.6} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Tomato fruits */}
      {Array.from({ length: fruitCount }).map((_, i) => {
        const angle = (i / fruitCount) * Math.PI * 2
        const height = scale * 0.4 + Math.random() * scale * 0.3
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.15, height, Math.sin(angle) * 0.15]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#FF6347" roughness={0.3} metalness={0.2} />
          </mesh>
        )
      })}
    </group>
  )
}

function CornPlant({ crop, scale, healthColor }: { crop: PlantedCrop; scale: number; healthColor: THREE.Color }) {
  const plantRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (plantRef.current) {
      plantRef.current.rotation.z = Math.sin(state.clock.elapsedTime + crop.position[0]) * 0.04
    }
  })

  return (
    <group ref={plantRef}>
      {/* Thick central stalk */}
      <mesh position={[0, scale * 0.5, 0]}>
        <cylinderGeometry args={[0.05, 0.08, scale * 1.0, 12]} />
        <meshStandardMaterial color={healthColor} roughness={0.7} />
      </mesh>

      {/* Long arching leaves */}
      {Array.from({ length: 8 }).map((_, i) => {
        const height = scale * 0.2 + i * scale * 0.1
        const rotation = (i * Math.PI * 2) / 8
        return (
          <group key={i} position={[0, height, 0]} rotation={[0, rotation, Math.PI / 3]}>
            <mesh>
              <planeGeometry args={[0.12, scale * 0.6]} />
              <meshStandardMaterial color="#90EE90" side={THREE.DoubleSide} roughness={0.5} />
            </mesh>
          </group>
        )
      })}

      {/* Corn cob at top */}
      {crop.health.growth > 50 && (
        <mesh position={[0, scale * 0.9, 0]}>
          <cylinderGeometry args={[0.08, 0.08, scale * 0.3, 16]} />
          <meshStandardMaterial color="#FFD700" roughness={0.4} />
        </mesh>
      )}
    </group>
  )
}

function CropPlant({
  crop,
  isSelected,
  onClick,
  showLabels,
}: {
  crop: PlantedCrop
  isSelected: boolean
  onClick: () => void
  showLabels: boolean
}) {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  const scale = 0.5 + (crop.health.growth / 100) * 1.5
  const healthColor = useMemo(() => {
    return new THREE.Color().lerpColors(
      new THREE.Color("#8B4513"),
      new THREE.Color("#00FF00"),
      crop.health.health / 100,
    )
  }, [crop.health.health])

  // Disease visualization
  const hasDiseases = crop.health.diseases.length > 0
  const hasPests = crop.health.pests.length > 0

  return (
    <group ref={meshRef} position={crop.position}>
      {/* Render specific crop type */}
      {crop.type === "wheat" && <WheatPlant crop={crop} scale={scale} healthColor={healthColor} />}
      {crop.type === "tomato" && <TomatoPlant crop={crop} scale={scale} healthColor={healthColor} />}
      {crop.type === "corn" && <CornPlant crop={crop} scale={scale} healthColor={healthColor} />}

      {/* Default crops for other types */}
      {!["wheat", "tomato", "corn"].includes(crop.type) && (
        <>
          <mesh position={[0, scale * 0.3, 0]} scale={[0.05, scale * 0.6, 0.05]}>
            <cylinderGeometry args={[1, 1.5, 1, 8]} />
            <meshStandardMaterial color={healthColor} roughness={0.8} />
          </mesh>
          <mesh position={[0, scale * 0.7, 0]} scale={[scale * 0.3, scale * 0.3, scale * 0.3]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color={crop.type === "rice" ? "#90EE90" : crop.type === "potato" ? "#D2B48C" : "#FFFFFF"}
              roughness={0.6}
            />
          </mesh>
        </>
      )}

      {/* Disease particles - red/orange swirling particles */}
      {hasDiseases && (
        <Sparkles count={15} scale={[0.5, scale * 1.2, 0.5]} size={2} speed={0.3} color="#FF0000" opacity={0.6} />
      )}

      {/* Pest particles - small flying bugs */}
      {hasPests && (
        <Sparkles count={20} scale={[0.8, scale * 1.5, 0.8]} size={1.5} speed={0.8} color="#8B4513" opacity={0.8} />
      )}

      {/* Interactive hitbox */}
      <mesh
        position={[0, scale * 0.5, 0]}
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
        <boxGeometry args={[0.5, scale * 1.2, 0.5]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Enhanced label with health indicators */}
      {showLabels && (hovered || isSelected) && (
        <Html center distanceFactor={10} style={{ pointerEvents: "none" }}>
          <div className="px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap backdrop-blur-xl bg-black/80 text-white border-2 border-cyan-400/50 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-cyan-300">{crop.type.charAt(0).toUpperCase() + crop.type.slice(1)}</span>
              <span className="text-green-400">•</span>
              <span>{Math.round(crop.health.growth)}%</span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-[10px]">
              <span
                className={
                  crop.health.health > 70
                    ? "text-green-400"
                    : crop.health.health > 40
                      ? "text-yellow-400"
                      : "text-red-400"
                }
              >
                ❤ {Math.round(crop.health.health)}%
              </span>
              {hasDiseases && <span className="text-red-400">🦠 {crop.health.diseases.length}</span>}
              {hasPests && <span className="text-orange-400">🐛 {crop.health.pests.length}</span>}
            </div>
          </div>
        </Html>
      )}

      {/* Enhanced selection ring with glow */}
      {isSelected && (
        <>
          <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.5, 0.6, 32]} />
            <meshBasicMaterial color="#00FFFF" transparent opacity={0.8} />
          </mesh>
          <mesh position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.45, 0.65, 32]} />
            <meshBasicMaterial color="#00FFFF" transparent opacity={0.3} />
          </mesh>
        </>
      )}
    </group>
  )
}

function FarmField({
  onPlantCrop,
  plantedCrops,
  selectedPlant,
  onSelectPlant,
  showLabels,
  showGrid,
  season,
  daysPassed,
}: FarmProps) {
  const groupRef = useRef<THREE.Group>(null)

  const handleFieldClick = (e: any) => {
    if (e.object.name === "field") {
      const point = e.point
      onPlantCrop([point.x, 0, point.z])
    }
  }

  // Season configurations with enhanced visuals
  const seasonColors: Record<Season, { ground: string; sky: string; fog: string }> = {
    spring: { ground: "#7CFC00", sky: "#87CEEB", fog: "#E0F7FA" },
    summer: { ground: "#DAA520", sky: "#FFD700", fog: "#FFF8DC" },
    monsoon: { ground: "#556B2F", sky: "#708090", fog: "#B0C4DE" },
    autumn: { ground: "#D2691E", sky: "#FF8C00", fog: "#FFE4B5" },
    winter: { ground: "#F0F8FF", sky: "#B0C4DE", fog: "#F0FFFF" },
  }

  const config = seasonColors[season]

  return (
    <group ref={groupRef}>
      {/* Detailed ground with subtle texture */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} onClick={handleFieldClick} name="field" receiveShadow>
        <planeGeometry args={[20, 20, showGrid ? 40 : 1, showGrid ? 40 : 1]} />
        <meshStandardMaterial
          color={config.ground}
          side={THREE.DoubleSide}
          wireframe={showGrid}
          opacity={showGrid ? 0.3 : 1}
          transparent
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Solid textured ground */}
      {!showGrid && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[20, 20, 50, 50]} />
          <meshStandardMaterial
            color={config.ground}
            side={THREE.DoubleSide}
            roughness={0.95}
            displacementScale={0.1}
          />
        </mesh>
      )}

      {/* Planted crops with ultra detail */}
      {plantedCrops.map((crop) => (
        <CropPlant
          key={crop.id}
          crop={crop}
          isSelected={selectedPlant === crop.id}
          onClick={() => onSelectPlant(selectedPlant === crop.id ? null : crop.id)}
          showLabels={showLabels}
        />
      ))}
    </group>
  )
}

// Loading fallback
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#90EE90" />
    </mesh>
  )
}

export function Farm3D(props: FarmProps) {
  const seasonSkySun: Record<Season, { sunPosition: [number, number, number]; turbidity: number }> = {
    spring: { sunPosition: [100, 20, 100], turbidity: 3 },
    summer: { sunPosition: [0, 60, 0], turbidity: 1 },
    monsoon: { sunPosition: [100, 10, 100], turbidity: 12 },
    autumn: { sunPosition: [100, 15, 100], turbidity: 5 },
    winter: { sunPosition: [100, 5, 100], turbidity: 8 },
  }

  const skyConfig = seasonSkySun[props.season]
  const fogColor = {
    spring: "#E0F7FA",
    summer: "#FFF8DC",
    monsoon: "#B0C4DE",
    autumn: "#FFE4B5",
    winter: "#F0FFFF",
  }[props.season]

  return (
    <Canvas camera={{ position: [10, 10, 10], fov: 50 }} shadows dpr={[1, 2]} gl={{ antialias: true }}>
      <color attach="background" args={[fogColor]} />
      <fog attach="fog" args={[fogColor, 10, 50]} />

      {/* Enhanced lighting for realistic shadows */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 15, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 10, 0]} intensity={0.3} />
      <hemisphereLight args={["#87CEEB", "#8B4513", 0.5]} />

      <Suspense fallback={<LoadingFallback />}>
        <FarmField {...props} />

        <Sky distance={450000} sunPosition={skyConfig.sunPosition} turbidity={skyConfig.turbidity} rayleigh={2} />

        <Environment preset="sunset" />
      </Suspense>

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={35}
        maxPolarAngle={Math.PI / 2.1}
        target={[0, 0, 0]}
      />
    </Canvas>
  )
}
