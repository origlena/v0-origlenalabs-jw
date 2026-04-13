"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, TrendingUp, Bug, Droplets, Leaf, Activity, Trash2 } from "lucide-react"
import type { Nutrients, PlantedCrop, Season } from "@/app/simulations/agriculture/crop-farming/page"

interface InfoPanelProps {
  nutrients: Nutrients
  selectedCrop: PlantedCrop | undefined
  onRemoveCrop: (id: string) => void
  season: Season
  daysPassed: number
}

export function InfoPanel({ nutrients, selectedCrop, onRemoveCrop, season, daysPassed }: InfoPanelProps) {
  const getNutrientStatus = (value: number) => {
    if (value < 30) return { label: "Low", color: "red" }
    if (value < 60) return { label: "Medium", color: "yellow" }
    return { label: "Good", color: "green" }
  }

  const getHealthColor = (health: number) => {
    if (health < 40) return "bg-red-500"
    if (health < 70) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Activity className="h-4 w-4" />
            Farm Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Day</span>
            <Badge variant="secondary">{daysPassed}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Season</span>
            <Badge className="capitalize">{season}</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Leaf className="h-4 w-4" />
            Soil Nutrients
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(["nitrogen", "phosphorus", "potassium", "organic"] as const).map((nutrient) => {
            const value = nutrients[nutrient]
            const status = getNutrientStatus(value)
            return (
              <div key={nutrient} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs capitalize">{nutrient}</Label>
                  <Badge variant="outline" className="text-xs">
                    {Math.round(value)}% • {status.label}
                  </Badge>
                </div>
                <Progress value={value} className="h-2" />
              </div>
            )
          })}

          <Separator />

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">pH Level</span>
              <div className="flex items-center gap-1">
                <Droplets className="h-3 w-3 text-blue-500" />
                <span className="text-sm font-bold">{nutrients.ph.toFixed(1)}</span>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Moisture</span>
              <div className="flex items-center gap-1">
                <Droplets className="h-3 w-3 text-cyan-500" />
                <span className="text-sm font-bold">{Math.round(nutrients.moisture)}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedCrop ? (
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base">
              <span className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Selected Crop
              </span>
              <Button size="sm" variant="destructive" onClick={() => onRemoveCrop(selectedCrop.id)}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium capitalize">{selectedCrop.type}</span>
              <Badge variant="secondary">Day {daysPassed - selectedCrop.plantedAt}</Badge>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Growth</span>
                  <span className="text-xs font-bold">{Math.round(selectedCrop.health.growth)}%</span>
                </div>
                <Progress value={selectedCrop.health.growth} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Health</span>
                  <span className="text-xs font-bold">{Math.round(selectedCrop.health.health)}%</span>
                </div>
                <Progress
                  value={selectedCrop.health.health}
                  className={`h-2 ${getHealthColor(selectedCrop.health.health)}`}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Expected Yield</span>
                  <span className="text-xs font-bold">{Math.round(selectedCrop.health.yield)}%</span>
                </div>
                <Progress value={selectedCrop.health.yield} className="h-2 bg-yellow-500" />
              </div>
            </div>

            {selectedCrop.health.diseases.length > 0 && (
              <>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-red-500">
                    <AlertTriangle className="h-4 w-4" />
                    Diseases Detected
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCrop.health.diseases.map((disease) => (
                      <Badge key={disease} variant="destructive" className="text-xs">
                        {disease}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}

            {selectedCrop.health.pests.length > 0 && (
              <>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-orange-500">
                    <Bug className="h-4 w-4" />
                    Pests Detected
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCrop.health.pests.map((pest) => (
                      <Badge key={pest} variant="outline" className="text-xs border-orange-500 text-orange-500">
                        {pest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-sm text-muted-foreground">Click on a crop to view detailed information</p>
          </CardContent>
        </Card>
      )}

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-sm">Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-xs text-muted-foreground space-y-2">
            <li>• Balance NPK nutrients for optimal growth</li>
            <li>• Plant crops in their optimal season</li>
            <li>• Maintain pH between 6.0-7.5</li>
            <li>• Watch for disease symptoms</li>
            <li>• Organic manure improves overall soil quality</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

function Label({ className, children }: { className?: string; children: React.ReactNode }) {
  return <span className={className}>{children}</span>
}
