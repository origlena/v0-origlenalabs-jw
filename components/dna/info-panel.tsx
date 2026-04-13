"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Info, Dna, Rotate3D } from "lucide-react"

interface InfoPanelProps {
  basePairs: number
  rotationAngle: number
  sequence: string
  colorScheme: {
    adenine: string
    thymine: string
    guanine: string
    cytosine: string
    backbone: string
  }
}

const baseInfo = {
  A: { name: "Adenine", pairs: "Thymine (T)", type: "Purine" },
  T: { name: "Thymine", pairs: "Adenine (A)", type: "Pyrimidine" },
  G: { name: "Guanine", pairs: "Cytosine (C)", type: "Purine" },
  C: { name: "Cytosine", pairs: "Guanine (G)", type: "Pyrimidine" },
}

export function InfoPanel({ basePairs, rotationAngle, sequence, colorScheme }: InfoPanelProps) {
  const atCount = sequence.split("").filter((b) => b === "A" || b === "T").length / 2
  const gcCount = sequence.split("").filter((b) => b === "G" || b === "C").length / 2

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          DNA Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Real-time Data */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Rotate3D className="h-3 w-3" />
              Rotation
            </div>
            <div className="text-lg font-mono font-semibold">{Math.abs(rotationAngle).toFixed(1)}°</div>
          </div>
          <div className="p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Dna className="h-3 w-3" />
              Base Pairs
            </div>
            <div className="text-lg font-mono font-semibold">{basePairs}</div>
          </div>
        </div>

        {/* Color Legend */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Nucleotide Colors</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colorScheme.adenine }} />
              <span>Adenine (A)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colorScheme.thymine }} />
              <span>Thymine (T)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colorScheme.guanine }} />
              <span>Guanine (G)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colorScheme.cytosine }} />
              <span>Cytosine (C)</span>
            </div>
          </div>
        </div>

        {/* Composition Stats */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Composition</h4>
          <div className="flex gap-2">
            <Badge variant="secondary" className="font-mono">
              A-T: {atCount}
            </Badge>
            <Badge variant="secondary" className="font-mono">
              G-C: {gcCount}
            </Badge>
          </div>
        </div>

        {/* Sequence Preview */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Sequence Preview</h4>
          <div className="p-2 rounded bg-muted/50 overflow-x-auto">
            <code className="text-xs font-mono text-muted-foreground break-all">{sequence.slice(0, 30)}...</code>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
