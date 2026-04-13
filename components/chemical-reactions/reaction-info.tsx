import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { TestTube, Flame, AlertTriangle, Lightbulb, FlaskConical } from "lucide-react"
import type { Chemical } from "./chemicals-data"
import { getReaction } from "./chemicals-data"
import { cn } from "@/lib/utils"

interface ReactionInfoProps {
  chemical1: Chemical | null
  chemical2: Chemical | null
  isReacting: boolean
}

const intensityColors = {
  1: "bg-green-500/20 text-green-500",
  2: "bg-yellow-500/20 text-yellow-500",
  3: "bg-orange-500/20 text-orange-500",
  4: "bg-red-500/20 text-red-500",
  5: "bg-red-600/20 text-red-600",
}

export function ReactionInfo({ chemical1, chemical2, isReacting }: ReactionInfoProps) {
  const reaction = chemical1 && chemical2 ? getReaction(chemical1.id, chemical2.id) : null

  if (!chemical1 && !chemical2) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center text-muted-foreground">
          <TestTube className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Select chemicals to see reaction information</p>
        </div>
      </div>
    )
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6">
        {/* Selected Chemicals Info */}
        {chemical1 && (
          <Card className="p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <FlaskConical className="h-4 w-4" />
              {chemical1.name}
            </h3>
            <p className="text-sm font-mono text-primary mb-2">{chemical1.formula}</p>
            <p className="text-sm text-muted-foreground mb-3">{chemical1.description}</p>
            {chemical1.hazards.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs font-medium text-orange-500">
                  <AlertTriangle className="h-3 w-3" />
                  Hazards:
                </div>
                <ul className="text-xs space-y-1 pl-4">
                  {chemical1.hazards.map((hazard, i) => (
                    <li key={i} className="text-muted-foreground">
                      • {hazard}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        )}

        {chemical2 && (
          <Card className="p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <FlaskConical className="h-4 w-4" />
              {chemical2.name}
            </h3>
            <p className="text-sm font-mono text-primary mb-2">{chemical2.formula}</p>
            <p className="text-sm text-muted-foreground mb-3">{chemical2.description}</p>
            {chemical2.hazards.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs font-medium text-orange-500">
                  <AlertTriangle className="h-3 w-3" />
                  Hazards:
                </div>
                <ul className="text-xs space-y-1 pl-4">
                  {chemical2.hazards.map((hazard, i) => (
                    <li key={i} className="text-muted-foreground">
                      • {hazard}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        )}

        {/* Reaction Information */}
        {reaction ? (
          <Card className="p-4 border-2 border-primary">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" />
                {reaction.name}
              </h3>
              <Badge className={cn("text-xs", intensityColors[reaction.intensity])}>
                Intensity: {reaction.intensity}/5
              </Badge>
            </div>

            <div className="space-y-4">
              {/* Chemical Equation */}
              <div>
                <div className="text-xs font-medium mb-1">Chemical Equation:</div>
                <div className="font-mono text-sm bg-muted p-2 rounded">{reaction.equation}</div>
              </div>

              {/* Reaction Type */}
              <div>
                <div className="text-xs font-medium mb-1">Type:</div>
                <Badge variant="outline" className="capitalize">
                  {reaction.type.replace("-", " ")}
                </Badge>
              </div>

              {/* Products */}
              <div>
                <div className="text-xs font-medium mb-1">Products:</div>
                <ul className="text-sm space-y-1">
                  {reaction.products.map((product, i) => (
                    <li key={i} className="text-muted-foreground">
                      • {product}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Observations */}
              <div>
                <div className="text-xs font-medium mb-1">What You'll See:</div>
                <ul className="text-sm space-y-1">
                  {reaction.observations.map((obs, i) => (
                    <li key={i} className="text-muted-foreground">
                      • {obs}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Energy Change */}
              <div>
                <div className="text-xs font-medium mb-1">Energy:</div>
                <Badge variant={reaction.energyChange === "exothermic" ? "destructive" : "default"}>
                  {reaction.energyChange === "exothermic" ? "🔥 Exothermic" : "❄️ Endothermic"}
                  {reaction.heatProduced && ` (${reaction.heatProduced} kJ/mol)`}
                </Badge>
              </div>

              {/* Educational Note */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-blue-500 mb-1">Educational Note:</div>
                    <p className="text-sm text-muted-foreground">{reaction.educationalNote}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          chemical1 &&
          chemical2 && (
            <Card className="p-4 bg-muted/50">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">No Reaction Data</h4>
                  <p className="text-sm text-muted-foreground">
                    This combination doesn't have a recorded reaction in our database, or they may not react under
                    normal conditions.
                  </p>
                </div>
              </div>
            </Card>
          )
        )}
      </div>
    </ScrollArea>
  )
}
