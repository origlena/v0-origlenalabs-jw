"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Wheat, Leaf, FlaskConical, RotateCcw, Sun, Cloud, CloudRain, Snowflake, Sprout } from "lucide-react"
import type { CropType, Season, FertilizerType, Nutrients } from "@/app/simulations/agriculture/crop-farming/page"

interface ControlPanelProps {
  selectedCrop: CropType
  onCropChange: (crop: CropType) => void
  season: Season
  onSeasonChange: (season: Season) => void
  nutrients: Nutrients
  onApplyFertilizer: (type: FertilizerType, amount: number) => void
  showLabels: boolean
  onShowLabelsChange: (show: boolean) => void
  showGrid: boolean
  onShowGridChange: (show: boolean) => void
  rotationSpeed: number
  onRotationSpeedChange: (speed: number) => void
  onReset: () => void
  cropCount: number
}

const crops: { value: CropType; label: string; icon: string }[] = [
  { value: "wheat", label: "Wheat", icon: "🌾" },
  { value: "rice", label: "Rice", icon: "🌾" },
  { value: "corn", label: "Corn", icon: "🌽" },
  { value: "tomato", label: "Tomato", icon: "🍅" },
  { value: "potato", label: "Potato", icon: "🥔" },
  { value: "cotton", label: "Cotton", icon: "🌼" },
]

const seasons: { value: Season; label: string; icon: any }[] = [
  { value: "spring", label: "Spring", icon: Sprout },
  { value: "summer", label: "Summer", icon: Sun },
  { value: "monsoon", label: "Monsoon", icon: CloudRain },
  { value: "autumn", label: "Autumn", icon: Leaf },
  { value: "winter", label: "Winter", icon: Snowflake },
]

const fertilizers: { type: FertilizerType; label: string; color: string }[] = [
  { type: "nitrogen", label: "Nitrogen (N)", color: "blue" },
  { type: "phosphorus", label: "Phosphorus (P)", color: "purple" },
  { type: "potassium", label: "Potassium (K)", color: "orange" },
  { type: "organic", label: "Organic Manure", color: "green" },
]

export function ControlPanel({
  selectedCrop,
  onCropChange,
  season,
  onSeasonChange,
  nutrients,
  onApplyFertilizer,
  showLabels,
  onShowLabelsChange,
  showGrid,
  onShowGridChange,
  rotationSpeed,
  onRotationSpeedChange,
  onReset,
  cropCount,
}: ControlPanelProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Wheat className="h-4 w-4" />
            Select Crop
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {crops.map((crop) => (
              <Button
                key={crop.value}
                variant={selectedCrop === crop.value ? "default" : "outline"}
                className="h-auto py-3"
                onClick={() => onCropChange(crop.value)}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-2xl">{crop.icon}</span>
                  <span className="text-xs">{crop.label}</span>
                </div>
              </Button>
            ))}
          </div>
          <Badge variant="secondary" className="w-full justify-center">
            {cropCount} crops planted
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Cloud className="h-4 w-4" />
            Season
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {seasons.map((s) => {
            const Icon = s.icon
            return (
              <Button
                key={s.value}
                variant={season === s.value ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => onSeasonChange(s.value)}
              >
                <Icon className="h-4 w-4 mr-2" />
                {s.label}
              </Button>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FlaskConical className="h-4 w-4" />
            Apply Fertilizers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {fertilizers.map((fert) => (
            <div key={fert.type} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">{fert.label}</Label>
                <Badge variant="outline" className="text-xs">
                  {Math.round(nutrients[fert.type as keyof Nutrients] as number)}%
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => onApplyFertilizer(fert.type, 5)}>
                  +5
                </Button>
                <Button size="sm" variant="outline" onClick={() => onApplyFertilizer(fert.type, 10)}>
                  +10
                </Button>
                <Button size="sm" variant="outline" onClick={() => onApplyFertilizer(fert.type, 20)}>
                  +20
                </Button>
              </div>
            </div>
          ))}

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Soil pH</Label>
              <Badge variant="secondary">{nutrients.ph.toFixed(1)}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-xs">Moisture</Label>
              <Badge variant="secondary">{Math.round(nutrients.moisture)}%</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">View Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="labels" className="text-sm">
              Show Labels
            </Label>
            <Switch id="labels" checked={showLabels} onCheckedChange={onShowLabelsChange} />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="grid" className="text-sm">
              Show Grid
            </Label>
            <Switch id="grid" checked={showGrid} onCheckedChange={onShowGridChange} />
          </div>

          <Button variant="outline" size="sm" onClick={onReset} className="w-full bg-transparent">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset All
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
