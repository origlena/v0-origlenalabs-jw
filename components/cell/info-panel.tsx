"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { getOrganellesForCell, getLabelColor, type Organelle } from "./cell-organelles-data"
import { Info, Lightbulb, Ruler, Sparkles, CheckCircle2 } from "lucide-react"

interface InfoPanelProps {
  cellType: "animal" | "plant"
  selectedOrganelle: string | null
  onSelectOrganelle: (id: string | null) => void
}

export function InfoPanel({ cellType, selectedOrganelle, onSelectOrganelle }: InfoPanelProps) {
  const organelles = getOrganellesForCell(cellType)
  const selected = organelles.find((o) => o.id === selectedOrganelle)

  // Get unique organelles (no duplicates for display)
  const uniqueOrganelles = organelles.reduce((acc, curr) => {
    const baseName = curr.name
    if (!acc.find((o) => o.name === baseName)) {
      acc.push(curr)
    }
    return acc
  }, [] as Organelle[])

  return (
    <Card className="bg-card/95 backdrop-blur border-2 h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
            <Info className="h-4 w-4 text-white" />
          </div>
          {selected ? selected.name : `${cellType === "animal" ? "Animal" : "Plant"} Cell Info`}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        {selected ? (
          <ScrollArea className="h-full pr-4">
            <div className="space-y-4">
              {/* Description */}
              <div>
                <p className="text-sm text-muted-foreground">{selected.description}</p>
              </div>

              {/* Function */}
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <h4 className="text-sm font-semibold mb-1 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Main Function
                </h4>
                <p className="text-sm">{selected.function}</p>
              </div>

              {/* Size */}
              <div className="flex items-center gap-2">
                <Ruler className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>Size:</strong> {selected.size}
                </span>
              </div>

              {/* Found in */}
              <div className="flex items-center gap-2">
                <Badge variant={selected.foundIn === "both" ? "default" : "secondary"} className="text-xs">
                  {selected.foundIn === "both" ? "Found in both cells" : `Only in ${selected.foundIn} cells`}
                </Badge>
              </div>

              <Separator />

              {/* Details */}
              <div>
                <h4 className="text-sm font-semibold mb-2">Key Details</h4>
                <ul className="space-y-2">
                  {selected.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              {/* Fun Fact */}
              <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <h4 className="text-sm font-semibold mb-1 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  Fun Fact
                </h4>
                <p className="text-sm">{selected.funFact}</p>
              </div>
            </div>
          </ScrollArea>
        ) : (
          <ScrollArea className="h-full pr-4">
            <div className="space-y-4">
              {/* Cell Overview */}
              <div className="p-3 rounded-lg bg-muted">
                <h4 className="text-sm font-semibold mb-2">
                  {cellType === "animal" ? "Animal Cell" : "Plant Cell"} Overview
                </h4>
                <p className="text-sm text-muted-foreground">
                  {cellType === "animal"
                    ? "Animal cells are eukaryotic cells with a nucleus and membrane-bound organelles. They lack cell walls and chloroplasts but have centrioles for cell division."
                    : "Plant cells are eukaryotic cells with a rigid cell wall, large central vacuole, and chloroplasts for photosynthesis. They are typically larger than animal cells."}
                </p>
              </div>

              <Separator />

              {/* Organelle List */}
              <div>
                <h4 className="text-sm font-semibold mb-3">Organelles ({uniqueOrganelles.length})</h4>
                <div className="grid grid-cols-2 gap-2">
                  {uniqueOrganelles
                    .filter((o) => o.id !== "cytoplasm" && !o.id.includes("ribosome") && !o.id.includes("microtubule"))
                    .map((organelle) => {
                      const colors = getLabelColor(organelle.id)
                      return (
                        <button
                          key={organelle.id}
                          onClick={() => onSelectOrganelle(organelle.id)}
                          className="flex items-center gap-2 p-2 rounded-lg text-left hover:bg-muted transition-colors text-sm"
                        >
                          <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: organelle.color }} />
                          <span className="truncate">{organelle.name}</span>
                        </button>
                      )
                    })}
                </div>
              </div>

              {/* Comparison */}
              <Separator />
              <div>
                <h4 className="text-sm font-semibold mb-2">Key Differences</h4>
                <div className="space-y-2 text-sm">
                  {cellType === "animal" ? (
                    <>
                      <p className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        No cell wall (flexible shape)
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        Small vacuoles
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-500" />
                        Has centrioles
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        No chloroplasts
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-600" />
                        Rigid cell wall
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-400" />
                        Large central vacuole
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gray-500" />
                        No centrioles
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        Has chloroplasts
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
