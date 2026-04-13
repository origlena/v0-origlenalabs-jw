"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookmarkedIcon } from "lucide-react"
import { Simulation } from "@/lib/simulations-store"
import { cn } from "@/lib/utils"

interface RelatedSimulationsWidgetProps {
  simulations: Simulation[]
  title?: string
  description?: string
  maxDisplay?: number
}

/**
 * Display related simulations as a learning pathway
 * Helps students discover connected concepts
 */
export function RelatedSimulationsWidget({
  simulations,
  title = "Related Simulations",
  description = "Explore connected concepts and deepen your understanding",
  maxDisplay = 3,
}: RelatedSimulationsWidgetProps) {
  if (!simulations || simulations.length === 0) {
    return null
  }

  const displayed = simulations.slice(0, maxDisplay)

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <BookmarkedIcon className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayed.map((sim) => (
            <Link key={sim.id} href={sim.href}>
              <Card className="hover:shadow-md transition-all cursor-pointer group">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                        {sim.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {sim.description}
                      </p>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        <Badge variant="outline" className="text-xs capitalize">
                          {sim.subject}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className={cn("text-xs", {
                            "bg-green-500/20": sim.difficulty === "beginner",
                            "bg-yellow-500/20": sim.difficulty === "intermediate",
                            "bg-red-500/20": sim.difficulty === "advanced",
                          })}
                        >
                          {sim.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {simulations.length > maxDisplay && (
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/simulations">
                View All {simulations.length} Related
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Inline related simulation links for within text content
 */
export function RelatedSimulationLink({
  simulation,
  text = simulation.title,
}: {
  simulation: Simulation
  text?: string
}) {
  return (
    <Link
      href={simulation.href}
      className="text-primary hover:underline inline-flex items-center gap-1 font-medium"
    >
      {text}
      <ArrowRight className="h-3 w-3" />
    </Link>
  )
}

