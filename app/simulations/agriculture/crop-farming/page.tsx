"use client"

import { useState, useCallback, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Farm3D } from "@/components/agriculture/farm-3d"
import { ControlPanel } from "@/components/agriculture/control-panel"
import { InfoPanel } from "@/components/agriculture/info-panel"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export type CropType = "wheat" | "rice" | "corn" | "tomato" | "potato" | "cotton"
export type Season = "spring" | "summer" | "monsoon" | "autumn" | "winter"
export type FertilizerType = "nitrogen" | "phosphorus" | "potassium" | "organic"

export interface Nutrients {
  nitrogen: number // 0-100
  phosphorus: number // 0-100
  potassium: number // 0-100
  organic: number // 0-100
  ph: number // 4-9
  moisture: number // 0-100
}

export interface CropHealth {
  growth: number // 0-100
  health: number // 0-100
  diseases: string[]
  pests: string[]
  yield: number // 0-100
}

export interface PlantedCrop {
  id: string
  type: CropType
  position: [number, number, number]
  plantedAt: number
  health: CropHealth
}

export default function CropFarmingPage() {
  const [season, setSeason] = useState<Season>("spring")
  const [selectedCrop, setSelectedCrop] = useState<CropType>("wheat")
  const [plantedCrops, setPlantedCrops] = useState<PlantedCrop[]>([])
  const [nutrients, setNutrients] = useState<Nutrients>({
    nitrogen: 50,
    phosphorus: 50,
    potassium: 50,
    organic: 50,
    ph: 6.5,
    moisture: 60,
  })
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null)
  const [showLabels, setShowLabels] = useState(true)
  const [showGrid, setShowGrid] = useState(true)
  const [rotationSpeed, setRotationSpeed] = useState(0.3)
  const [leftPanelOpen, setLeftPanelOpen] = useState(true)
  const [rightPanelOpen, setRightPanelOpen] = useState(true)
  const [daysPassed, setDaysPassed] = useState(0)

  // Simulate time passage
  useEffect(() => {
    const interval = setInterval(() => {
      setDaysPassed((prev) => prev + 1)
    }, 2000) // 1 day every 2 seconds

    return () => clearInterval(interval)
  }, [])

  // Update crop health based on nutrients and season
  useEffect(() => {
    setPlantedCrops((prev) =>
      prev.map((crop) => {
        const age = daysPassed - crop.plantedAt
        const health = calculateCropHealth(crop.type, nutrients, season, age)
        return { ...crop, health }
      }),
    )
  }, [nutrients, season, daysPassed])

  const handlePlantCrop = useCallback(
    (position: [number, number, number]) => {
      const newCrop: PlantedCrop = {
        id: `crop-${Date.now()}-${Math.random()}`,
        type: selectedCrop,
        position,
        plantedAt: daysPassed,
        health: {
          growth: 0,
          health: 100,
          diseases: [],
          pests: [],
          yield: 0,
        },
      }
      setPlantedCrops((prev) => [...prev, newCrop])
    },
    [selectedCrop, daysPassed],
  )

  const handleRemoveCrop = useCallback((id: string) => {
    setPlantedCrops((prev) => prev.filter((c) => c.id !== id))
    setSelectedPlant(null)
  }, [])

  const handleApplyFertilizer = useCallback((type: FertilizerType, amount: number) => {
    setNutrients((prev) => {
      const newNutrients = { ...prev }
      switch (type) {
        case "nitrogen":
          newNutrients.nitrogen = Math.min(100, prev.nitrogen + amount)
          newNutrients.ph = Math.max(4, prev.ph - amount * 0.01)
          break
        case "phosphorus":
          newNutrients.phosphorus = Math.min(100, prev.phosphorus + amount)
          break
        case "potassium":
          newNutrients.potassium = Math.min(100, prev.potassium + amount)
          break
        case "organic":
          newNutrients.organic = Math.min(100, prev.organic + amount)
          newNutrients.nitrogen = Math.min(100, prev.nitrogen + amount * 0.3)
          newNutrients.phosphorus = Math.min(100, prev.phosphorus + amount * 0.2)
          newNutrients.ph = Math.min(9, prev.ph + amount * 0.005)
          break
      }
      return newNutrients
    })
  }, [])

  const handleReset = useCallback(() => {
    setPlantedCrops([])
    setNutrients({
      nitrogen: 50,
      phosphorus: 50,
      potassium: 50,
      organic: 50,
      ph: 6.5,
      moisture: 60,
    })
    setSelectedPlant(null)
    setDaysPassed(0)
  }, [])

  const selectedCropData = plantedCrops.find((c) => c.id === selectedPlant)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b bg-card/50 backdrop-blur px-4 py-3">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/simulations">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold">Agricultural Field Simulation</h1>
                <p className="text-sm text-muted-foreground">
                  Learn crop management, fertilizers, and seasonal farming
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg">
                <span className="text-xs text-muted-foreground">Day:</span>
                <span className="text-sm font-bold">{daysPassed}</span>
              </div>
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg">
                <span className="text-xs text-muted-foreground">Season:</span>
                <span className="text-sm font-bold capitalize">{season}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex relative overflow-hidden">
          {/* Left Panel - Controls */}
          <div
            className={`absolute left-0 top-0 bottom-0 z-20 transition-transform duration-300 ${
              leftPanelOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="h-full w-80 p-4 overflow-auto">
              <ControlPanel
                selectedCrop={selectedCrop}
                onCropChange={setSelectedCrop}
                season={season}
                onSeasonChange={setSeason}
                nutrients={nutrients}
                onApplyFertilizer={handleApplyFertilizer}
                showLabels={showLabels}
                onShowLabelsChange={setShowLabels}
                showGrid={showGrid}
                onShowGridChange={setShowGrid}
                rotationSpeed={rotationSpeed}
                onRotationSpeedChange={setRotationSpeed}
                onReset={handleReset}
                cropCount={plantedCrops.length}
              />
            </div>
            <Button
              variant="secondary"
              size="icon"
              className="absolute -right-10 top-1/2 -translate-y-1/2 rounded-l-none"
              onClick={() => setLeftPanelOpen(!leftPanelOpen)}
            >
              {leftPanelOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>

          {/* 3D Canvas */}
          <div className="flex-1 relative">
            <Farm3D
              season={season}
              plantedCrops={plantedCrops}
              selectedPlant={selectedPlant}
              onSelectPlant={setSelectedPlant}
              onPlantCrop={handlePlantCrop}
              showLabels={showLabels}
              showGrid={showGrid}
              rotationSpeed={rotationSpeed}
              daysPassed={daysPassed}
            />

            {/* Instructions */}
            {plantedCrops.length === 0 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <div className="px-4 py-2 rounded-full text-sm font-medium backdrop-blur bg-primary/20 text-primary border border-primary/30">
                  Click on the field to plant {selectedCrop}
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Info */}
          <div
            className={`absolute right-0 top-0 bottom-0 z-20 transition-transform duration-300 ${
              rightPanelOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="h-full w-80 p-4 overflow-auto">
              <InfoPanel
                nutrients={nutrients}
                selectedCrop={selectedCropData}
                onRemoveCrop={handleRemoveCrop}
                season={season}
                daysPassed={daysPassed}
              />
            </div>
            <Button
              variant="secondary"
              size="icon"
              className="absolute -left-10 top-1/2 -translate-y-1/2 rounded-r-none"
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
            >
              {rightPanelOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

// Helper function to calculate crop health
function calculateCropHealth(cropType: CropType, nutrients: Nutrients, season: Season, age: number): CropHealth {
  const cropRequirements: Record<
    CropType,
    { n: number; p: number; k: number; optimalSeason: Season[]; maturityDays: number }
  > = {
    wheat: { n: 60, p: 40, k: 40, optimalSeason: ["winter", "spring"], maturityDays: 30 },
    rice: { n: 70, p: 50, k: 50, optimalSeason: ["monsoon", "summer"], maturityDays: 35 },
    corn: { n: 80, p: 60, k: 50, optimalSeason: ["summer", "spring"], maturityDays: 25 },
    tomato: { n: 50, p: 70, k: 60, optimalSeason: ["spring", "autumn"], maturityDays: 20 },
    potato: { n: 40, p: 60, k: 80, optimalSeason: ["autumn", "winter"], maturityDays: 28 },
    cotton: { n: 70, p: 50, k: 40, optimalSeason: ["summer", "monsoon"], maturityDays: 40 },
  }

  const req = cropRequirements[cropType]
  const diseases: string[] = []
  const pests: string[] = []

  // Calculate health based on nutrients
  const nScore = 100 - Math.abs(nutrients.nitrogen - req.n)
  const pScore = 100 - Math.abs(nutrients.phosphorus - req.p)
  const kScore = 100 - Math.abs(nutrients.potassium - req.k)
  const nutrientScore = (nScore + pScore + kScore) / 3

  // Season impact
  const seasonScore = req.optimalSeason.includes(season) ? 100 : 60

  // pH impact
  const phScore = nutrients.ph >= 6 && nutrients.ph <= 7.5 ? 100 : 70

  // Overall health
  let health = nutrientScore * 0.5 + seasonScore * 0.3 + phScore * 0.2

  // Add diseases based on conditions
  if (nutrients.nitrogen > 80) {
    diseases.push("Nitrogen Burn")
    health -= 10
  }
  if (nutrients.nitrogen < 30) {
    diseases.push("Nitrogen Deficiency")
    health -= 15
  }
  if (nutrients.phosphorus < 30) {
    diseases.push("Stunted Growth")
    health -= 10
  }
  if (nutrients.moisture > 80) {
    diseases.push("Root Rot")
    health -= 20
  }
  if (nutrients.moisture < 30) {
    diseases.push("Drought Stress")
    health -= 15
  }
  if (!req.optimalSeason.includes(season)) {
    diseases.push("Seasonal Stress")
  }
  if (nutrients.ph < 5.5 || nutrients.ph > 8) {
    diseases.push("pH Imbalance")
    health -= 10
  }

  // Add pests in certain seasons
  if (season === "monsoon") {
    pests.push("Aphids")
  }
  if (season === "summer" && nutrients.moisture < 40) {
    pests.push("Spider Mites")
  }

  // Growth calculation
  const growth = Math.min(100, (age / req.maturityDays) * 100)

  // Yield calculation
  const yield_ = growth * (health / 100)

  return {
    growth: Math.max(0, growth),
    health: Math.max(0, Math.min(100, health)),
    diseases,
    pests,
    yield: Math.max(0, Math.min(100, yield_)),
  }
}
