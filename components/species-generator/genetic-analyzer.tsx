import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { SPECIES_DATABASE } from "./species-selector"

interface GeneticAnalyzerProps {
  parent1: string | null
  parent2: string | null
}

export function GeneticAnalyzer({ parent1, parent2 }: GeneticAnalyzerProps) {
  if (!parent1 || !parent2) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">Select two parent species to analyze genetic compatibility</p>
      </div>
    )
  }

  const species1 = SPECIES_DATABASE.find((s) => s.id === parent1)!
  const species2 = SPECIES_DATABASE.find((s) => s.id === parent2)!

  const sameType = species1.type === species2.type
  const sameFamily = species1.family === species2.family
  const chromosomeDiff = Math.abs(species1.chromosomes - species2.chromosomes)

  // Calculate feasibility based on multiple factors
  let feasibilityScore = 0
  let feasibilityReason = ""

  if (!sameType) {
    feasibilityScore = 0
    feasibilityReason = "Cannot cross kingdoms (animal/plant)"
  } else if (sameFamily) {
    if (chromosomeDiff === 0) {
      feasibilityScore = 85
      feasibilityReason = "Same family, identical chromosome count"
    } else if (chromosomeDiff <= 2) {
      feasibilityScore = 70
      feasibilityReason = "Same family, very similar chromosomes"
    } else if (chromosomeDiff <= 6) {
      feasibilityScore = 45
      feasibilityReason = "Same family, but chromosome mismatch reduces fertility"
    } else {
      feasibilityScore = 15
      feasibilityReason = "Same family, but too much chromosome difference"
    }
  } else {
    // Different families
    const avgChromosomes = (species1.chromosomes + species2.chromosomes) / 2
    if (chromosomeDiff / avgChromosomes < 0.1) {
      feasibilityScore = 10
      feasibilityReason = "Different families, very unlikely even with similar chromosomes"
    } else {
      feasibilityScore = 2
      feasibilityReason = "Different families, biologically incompatible"
    }
  }

  const isPossible = feasibilityScore >= 40
  const isPartiallyPossible = feasibilityScore >= 10 && feasibilityScore < 40

  return (
    <div className="p-4 space-y-4">
      <Card
        className={
          isPossible
            ? "border-green-500 bg-green-500/5"
            : isPartiallyPossible
              ? "border-yellow-500 bg-yellow-500/5"
              : "border-red-500 bg-red-500/5"
        }
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            {isPossible ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : isPartiallyPossible ? (
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
            ) : (
              <XCircle className="h-6 w-6 text-red-500" />
            )}
            <div className="flex-1">
              <div className="font-semibold text-sm">
                {isPossible
                  ? "Hybridization Possible"
                  : isPartiallyPossible
                    ? "Extremely Rare/Theoretical"
                    : "Hybridization Impossible"}
              </div>
              <div className="text-xs text-muted-foreground">{feasibilityReason}</div>
            </div>
            <Badge
              className="ml-auto"
              variant={isPossible ? "default" : isPartiallyPossible ? "outline" : "destructive"}
            >
              {feasibilityScore}%
            </Badge>
          </div>

          <Progress value={feasibilityScore} className="h-2" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-2">
        <Card>
          <CardContent className="p-2">
            <div className="text-[10px] text-muted-foreground mb-1">Type Match</div>
            <div className="text-sm font-semibold">{sameType ? "✓" : "✗"}</div>
            <div className="text-[9px] text-muted-foreground">
              {species1.type} vs {species2.type}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-2">
            <div className="text-[10px] text-muted-foreground mb-1">Chromosomes</div>
            <div className="text-sm font-semibold">{chromosomeDiff === 0 ? "Perfect" : `±${chromosomeDiff}`}</div>
            <div className="text-[9px] text-muted-foreground">
              {species1.chromosomes}n vs {species2.chromosomes}n
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-2">
            <div className="text-[10px] text-muted-foreground mb-1">Family</div>
            <div className="text-sm font-semibold">{sameFamily ? "Same" : "Different"}</div>
            <div className="text-[9px] text-muted-foreground truncate">{sameFamily ? species1.family : "Mixed"}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
