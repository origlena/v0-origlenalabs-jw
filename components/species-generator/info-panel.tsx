import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, TrendingUp, TrendingDown, Info } from "lucide-react"
import { SPECIES_DATABASE } from "./species-selector"

interface InfoPanelProps {
  parent1: string | null
  parent2: string | null
}

export function InfoPanel({ parent1, parent2 }: InfoPanelProps) {
  if (!parent1 || !parent2) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Info className="h-4 w-4" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-2 text-muted-foreground">
            <p>
              This simulator analyzes genetic compatibility between two species based on chromosome count, taxonomic
              family, and genetic distance.
            </p>
            <p>Real-world examples include ligers (lion + tiger), mules (horse + donkey), and wolfdogs (wolf + dog).</p>
            <p>Select two species to see if hybridization is possible and learn about the potential offspring.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const species1 = SPECIES_DATABASE.find((s) => s.id === parent1)!
  const species2 = SPECIES_DATABASE.find((s) => s.id === parent2)!

  const sameFamily = species1.family === species2.family
  const chromosomeDiff = Math.abs(species1.chromosomes - species2.chromosomes)
  const feasibilityScore = sameFamily ? (chromosomeDiff === 0 ? 95 : chromosomeDiff <= 6 ? 70 : 30) : 5
  const isPossible = feasibilityScore >= 50

  // Generate hybrid name
  const hybridName = isPossible
    ? species1.name.slice(0, Math.ceil(species1.name.length / 2)) +
      species2.name.slice(Math.floor(species2.name.length / 2))
    : "N/A"

  // Real-world examples
  const realExamples = {
    "lion-tiger": {
      name: "Liger",
      desc: "Male lion + female tiger. Largest living cat species, can weigh up to 900 lbs.",
    },
    "tiger-lion": {
      name: "Tigon",
      desc: "Male tiger + female lion. Smaller than ligers, typically 350-400 lbs.",
    },
    "horse-donkey": { name: "Mule", desc: "Male donkey + female horse. Strong, hardy, usually sterile." },
    "donkey-horse": { name: "Hinny", desc: "Male horse + female donkey. Rare, smaller than mules." },
    "wolf-dog": { name: "Wolfdog", desc: "Wolf + domestic dog. Variable traits, requires experienced owners." },
    "leopard-jaguar": {
      name: "Lepjag",
      desc: "Leopard + jaguar hybrid. Extremely rare, documented in captivity.",
    },
  }

  const exampleKey = `${parent1}-${parent2}` as keyof typeof realExamples
  const realExample = realExamples[exampleKey]

  const advantages = isPossible
    ? [
        "Hybrid vigor (heterosis) - increased fitness",
        "Combination of best traits from both parents",
        "Increased genetic diversity",
        "Potential adaptation to new environments",
        sameFamily && "Compatible immune systems",
      ].filter(Boolean)
    : ["N/A - Hybridization not feasible"]

  const disadvantages = isPossible
    ? [
        chromosomeDiff > 0 && "Potential sterility in offspring",
        "Reduced fertility or complete infertility",
        "Health complications from genetic mismatch",
        "Ethical concerns in captive breeding",
        "May not survive in wild environments",
      ].filter(Boolean)
    : ["Chromosome number mismatch", "Different taxonomic families", "Genetic incompatibility", "Meiosis failure"]

  const traits = isPossible
    ? {
        size: `Intermediate to large (${species1.name} × ${species2.name})`,
        temperament: "Variable, depends on parental traits",
        appearance: `Mix of ${species1.name} and ${species2.name} features`,
        fertility: chromosomeDiff > 0 ? "Usually sterile" : "May be fertile",
        lifespan: "Similar to parent species average",
      }
    : {}

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4">
        {realExample && (
          <Card className="bg-primary/5 border-primary/30">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-primary" />
                Real-World Example
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-2">
              <div className="font-semibold text-primary text-base">{realExample.name}</div>
              <p className="text-muted-foreground">{realExample.desc}</p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Hybrid Information</CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-2">
            <div>
              <span className="text-muted-foreground">Hybrid Name:</span>
              <span className="ml-2 font-medium">{hybridName}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Scientific Basis:</span>
              <span className="ml-2 font-medium">{isPossible ? "Reproductive compatibility" : "Genetic barrier"}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Feasibility:</span>
              <Badge className="ml-2" variant={isPossible ? "default" : "destructive"}>
                {feasibilityScore}%
              </Badge>
            </div>
          </CardContent>
        </Card>

        {isPossible && Object.keys(traits).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Predicted Traits</CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-2">
              {Object.entries(traits).map(([key, value]) => (
                <div key={key}>
                  <span className="text-muted-foreground capitalize">{key}:</span>
                  <span className="ml-2">{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Advantages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-xs space-y-1.5">
              {advantages.map((adv, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  <span>{adv}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-500" />
              Disadvantages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-xs space-y-1.5">
              {disadvantages.map((dis, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>{dis}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Scientific Explanation</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground space-y-2">
            <p>
              {isPossible
                ? `Hybridization between ${species1.name} and ${species2.name} is possible because they belong to the same family (${species1.family}) and have compatible chromosome numbers.`
                : `Hybridization is not feasible because ${!sameFamily ? "they belong to different families" : "the chromosome number difference is too large"}, creating a reproductive barrier.`}
            </p>
            <p>
              {isPossible
                ? "During meiosis, chromosomes from both parents can pair and produce viable offspring, though fertility may be compromised."
                : "The genetic differences prevent proper chromosome pairing during meiosis, making reproduction impossible."}
            </p>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  )
}
