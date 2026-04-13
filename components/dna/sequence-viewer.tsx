"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SequenceViewerProps {
  sequence: string
  highlightIndex?: number
  colorScheme: {
    adenine: string
    thymine: string
    guanine: string
    cytosine: string
  }
}

const getComplementary = (base: string): string => {
  const map: Record<string, string> = { A: "T", T: "A", G: "C", C: "G" }
  return map[base] || ""
}

export function SequenceViewer({ sequence, highlightIndex, colorScheme }: SequenceViewerProps) {
  const getBaseColor = (base: string) => {
    switch (base) {
      case "A":
        return colorScheme.adenine
      case "T":
        return colorScheme.thymine
      case "G":
        return colorScheme.guanine
      case "C":
        return colorScheme.cytosine
      default:
        return "#888"
    }
  }

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">DNA Sequence Timeline</span>
          <span className="text-xs text-muted-foreground font-mono">{sequence.length} bases</span>
        </div>

        {/* Sequence Display */}
        <div className="overflow-x-auto pb-2">
          <div className="flex flex-col gap-1 min-w-max">
            {/* 5' to 3' strand */}
            <div className="flex items-center gap-0.5">
              <span className="text-[10px] text-muted-foreground w-8">5&apos;</span>
              {sequence.split("").map((base, i) => (
                <div
                  key={`top-${i}`}
                  className={cn(
                    "w-6 h-6 flex items-center justify-center text-xs font-mono font-bold rounded transition-all",
                    highlightIndex === i && "ring-2 ring-white scale-110",
                  )}
                  style={{
                    backgroundColor: getBaseColor(base),
                    color: ["A", "G"].includes(base) ? "#fff" : "#fff",
                  }}
                >
                  {base}
                </div>
              ))}
              <span className="text-[10px] text-muted-foreground w-8 text-right">3&apos;</span>
            </div>

            {/* Bonds indicator */}
            <div className="flex items-center gap-0.5">
              <span className="w-8" />
              {sequence.split("").map((base, i) => (
                <div
                  key={`bond-${i}`}
                  className="w-6 h-3 flex items-center justify-center text-[8px] text-muted-foreground"
                >
                  {["A", "T"].includes(base) ? "||" : "|||"}
                </div>
              ))}
              <span className="w-8" />
            </div>

            {/* 3' to 5' complementary strand */}
            <div className="flex items-center gap-0.5">
              <span className="text-[10px] text-muted-foreground w-8">3&apos;</span>
              {sequence.split("").map((base, i) => {
                const comp = getComplementary(base)
                return (
                  <div
                    key={`bottom-${i}`}
                    className={cn(
                      "w-6 h-6 flex items-center justify-center text-xs font-mono font-bold rounded transition-all",
                      highlightIndex === i && "ring-2 ring-white scale-110",
                    )}
                    style={{
                      backgroundColor: getBaseColor(comp),
                      color: "#fff",
                    }}
                  >
                    {comp}
                  </div>
                )
              })}
              <span className="text-[10px] text-muted-foreground w-8 text-right">5&apos;</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-border/50">
          <div className="flex items-center gap-1 text-xs">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: colorScheme.adenine }} />
            <span>A-T (2 bonds)</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: colorScheme.guanine }} />
            <span>G-C (3 bonds)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
