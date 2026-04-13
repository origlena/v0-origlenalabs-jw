"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Beaker, Flame, FlaskConical, Play, RotateCcw, AlertTriangle } from "lucide-react"
import { chemicals, type Chemical, getReaction } from "./chemicals-data"
import { cn } from "@/lib/utils"

interface ChemicalSelectorProps {
  chemical1: Chemical | null
  chemical2: Chemical | null
  onSelectChemical1: (chem: Chemical) => void
  onSelectChemical2: (chem: Chemical) => void
  isReacting: boolean
  onStartReaction: () => void
  onReset: () => void
}

const dangerColors = {
  safe: "bg-green-500/20 text-green-500 border-green-500/50",
  caution: "bg-yellow-500/20 text-yellow-500 border-yellow-500/50",
  danger: "bg-orange-500/20 text-orange-500 border-orange-500/50",
  extreme: "bg-red-500/20 text-red-500 border-red-500/50",
}

export function ChemicalSelector({
  chemical1,
  chemical2,
  onSelectChemical1,
  onSelectChemical2,
  isReacting,
  onStartReaction,
  onReset,
}: ChemicalSelectorProps) {
  const reaction = chemical1 && chemical2 ? getReaction(chemical1.id, chemical2.id) : null

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b space-y-4">
        <div className="flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-primary" />
          <h2 className="font-bold text-lg">Chemical Reaction Lab</h2>
        </div>

        <p className="text-sm text-muted-foreground">
          Select two chemicals to see their reaction. Always follow safety guidelines!
        </p>
      </div>

      {/* Selected Chemicals Display */}
      <div className="p-4 border-b bg-muted/30 space-y-3">
        <div className="flex items-center gap-2">
          <Beaker className="h-4 w-4" />
          <span className="text-sm font-medium">Beaker 1:</span>
          {chemical1 ? (
            <Badge variant="secondary" className="font-mono">
              {chemical1.formula}
            </Badge>
          ) : (
            <span className="text-sm text-muted-foreground">Select chemical</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Beaker className="h-4 w-4" />
          <span className="text-sm font-medium">Beaker 2:</span>
          {chemical2 ? (
            <Badge variant="secondary" className="font-mono">
              {chemical2.formula}
            </Badge>
          ) : (
            <span className="text-sm text-muted-foreground">Select chemical</span>
          )}
        </div>

        {reaction && (
          <div className="pt-2 flex items-center gap-2">
            <Flame className={cn("h-4 w-4", reaction.intensity >= 4 ? "text-red-500" : "text-orange-500")} />
            <span className="text-sm font-medium">Reaction: {reaction.name}</span>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            onClick={onStartReaction}
            disabled={!chemical1 || !chemical2 || isReacting}
            className="flex-1"
            size="sm"
          >
            <Play className="h-4 w-4 mr-2" />
            Mix & React
          </Button>
          <Button onClick={onReset} variant="outline" size="sm" disabled={isReacting}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chemical List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-sm">Available Chemicals</h3>
          {chemicals.map((chem) => (
            <Card
              key={chem.id}
              className={cn(
                "p-3 cursor-pointer transition-all hover:shadow-md",
                (chemical1?.id === chem.id || chemical2?.id === chem.id) && "ring-2 ring-primary",
                isReacting && "opacity-50 pointer-events-none",
              )}
              onClick={() => {
                if (!chemical1) {
                  onSelectChemical1(chem)
                } else if (!chemical2 && chemical1.id !== chem.id) {
                  onSelectChemical2(chem)
                } else if (chemical1?.id === chem.id) {
                  onSelectChemical1(null as any)
                } else if (chemical2?.id === chem.id) {
                  onSelectChemical2(null as any)
                }
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="font-medium">{chem.name}</div>
                  <div className="font-mono text-sm text-primary">{chem.formula}</div>
                  <div className="text-xs text-muted-foreground mt-1 capitalize">{chem.state}</div>
                </div>
                <Badge className={cn("text-xs", dangerColors[chem.dangerLevel])}>
                  {chem.dangerLevel === "extreme" && <AlertTriangle className="h-3 w-3 mr-1" />}
                  {chem.dangerLevel}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
