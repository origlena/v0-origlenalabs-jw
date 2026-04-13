"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, Text } from "@react-three/drei"
import { SPECIES_DATABASE } from "./species-selector"

interface HybridVisualizationProps {
  parent1: string | null
  parent2: string | null
}

function HybridModel({ parent1, parent2 }: { parent1: string; parent2: string }) {
  const species1 = SPECIES_DATABASE.find((s) => s.id === parent1)!
  const species2 = SPECIES_DATABASE.find((s) => s.id === parent2)!

  const sameFamily = species1.family === species2.family
  const chromosomeDiff = Math.abs(species1.chromosomes - species2.chromosomes)
  const feasible = sameFamily && chromosomeDiff <= 6

  return (
    <group>
      {/* Left parent visualization */}
      <Text position={[-3, 2, 0]} fontSize={2} color="#10b981" anchorX="center" anchorY="middle">
        {species1.image}
      </Text>
      <Text position={[-3, 0.5, 0]} fontSize={0.3} color="#888" anchorX="center" anchorY="middle">
        {species1.name}
      </Text>

      {/* Center hybrid visualization */}
      <Text
        position={[0, 2, 0]}
        fontSize={2.5}
        color={feasible ? "#3b82f6" : "#ef4444"}
        anchorX="center"
        anchorY="middle"
      >
        {feasible ? "✨" : "❌"}
      </Text>
      <Text position={[0, 0.5, 0]} fontSize={0.4} color="#fff" anchorX="center" anchorY="middle">
        {feasible ? "Hybrid Possible" : "Not Feasible"}
      </Text>
      <Text position={[0, -0.3, 0]} fontSize={0.25} color="#888" anchorX="center" anchorY="middle">
        {feasible ? `${species1.name} × ${species2.name}` : "Genetic incompatibility"}
      </Text>

      {/* Right parent visualization */}
      <Text position={[3, 2, 0]} fontSize={2} color="#10b981" anchorX="center" anchorY="middle">
        {species2.image}
      </Text>
      <Text position={[3, 0.5, 0]} fontSize={0.3} color="#888" anchorX="center" anchorY="middle">
        {species2.name}
      </Text>

      {/* DNA helix connecting them */}
      {feasible && (
        <>
          <mesh position={[-1.5, 1.5, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 3, 8]} />
            <meshStandardMaterial color="#3b82f6" />
          </mesh>
          <mesh position={[1.5, 1.5, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 3, 8]} />
            <meshStandardMaterial color="#3b82f6" />
          </mesh>
        </>
      )}
    </group>
  )
}

export function HybridVisualization({ parent1, parent2 }: HybridVisualizationProps) {
  if (!parent1 || !parent2) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-b from-background to-muted/20">
        <div className="text-center space-y-3 p-8">
          <div className="text-6xl mb-4">🧬</div>
          <h3 className="text-xl font-semibold">Species Hybridization Lab</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Select two parent species from the left panel to analyze genetic compatibility and visualize the potential
            hybrid offspring.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-gradient-to-b from-background to-muted/20">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <OrbitControls enablePan={false} enableZoom={true} minDistance={5} maxDistance={15} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="sunset" />
        <HybridModel parent1={parent1} parent2={parent2} />
      </Canvas>
    </div>
  )
}
