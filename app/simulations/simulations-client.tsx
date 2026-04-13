"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import Link from "next/link"
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Dna,
  Atom,
  FlaskConical,
  Calculator,
  Star,
  Clock,
  Users,
  ChevronDown,
  X,
  Sprout,
} from "lucide-react"
import { useSimulations } from "@/lib/simulations-store"

// This component is client-only and does not export metadata.

interface Simulation {
  id: string
  title: string
  description: string
  subject: "biology" | "physics" | "chemistry" | "math" | "agriculture"
  difficulty: "beginner" | "intermediate" | "advanced"
  topics: string[]
  duration: string
  rating: number
  users: string
  href: string
  featured?: boolean
  isCustom?: boolean
}

const subjectIcons = {
  biology: Dna,
  physics: Atom,
  chemistry: FlaskConical,
  math: Calculator,
  agriculture: Sprout,
}

const subjectColors = {
  biology: "biology",
  physics: "physics",
  chemistry: "chemistry",
  math: "mathematics",
  agriculture: "green",
}

export default function SimulationsClientPage() {
  const { simulations } = useSimulations()
  const searchParams = useSearchParams()
  const subjectFromUrl = searchParams.get("subject")

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    if (subjectFromUrl && ["biology", "physics", "chemistry", "math", "agriculture"].includes(subjectFromUrl)) {
      setSelectedSubjects([subjectFromUrl])
    }
  }, [subjectFromUrl])

  const allTopics = useMemo(() => {
    const topics = new Set<string>()
    simulations.forEach((sim) => sim.topics.forEach((t) => topics.add(t)))
    return Array.from(topics).sort()
  }, [simulations])

  const filteredSimulations = useMemo(() => {
    return simulations.filter((sim) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          sim.title.toLowerCase().includes(query) ||
          sim.description.toLowerCase().includes(query) ||
          sim.topics.some((t) => t.toLowerCase().includes(query))
        if (!matchesSearch) return false
      }

      if (selectedSubjects.length > 0 && !selectedSubjects.includes(sim.subject)) {
        return false
      }

      if (selectedDifficulties.length > 0 && !selectedDifficulties.includes(sim.difficulty)) {
        return false
      }

      if (selectedTopics.length > 0 && !sim.topics.some((t) => selectedTopics.includes(t))) {
        return false
      }

      return true
    })
  }, [simulations, searchQuery, selectedSubjects, selectedDifficulties, selectedTopics])

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) => (prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]))
  }

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty) ? prev.filter((d) => d !== difficulty) : [...prev, difficulty],
    )
  }

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) => (prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]))
  }

  const clearFilters = () => {
    setSelectedSubjects([])
    setSelectedDifficulties([])
    setSelectedTopics([])
    setSearchQuery("")
  }

  const hasActiveFilters =
    selectedSubjects.length > 0 ||
    selectedDifficulties.length > 0 ||
    selectedTopics.length > 0 ||
    searchQuery.length > 0

  return (
    <div className="h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-grow overflow-auto">
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-6 md:py-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">Simulation Gallery</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Browse {simulations.length} interactive simulations across four STEM disciplines
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
              <Input
                placeholder="Search simulations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 md:pl-11 h-10 md:h-12 text-sm md:text-base touch-manipulation"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2 h-10 md:h-12 px-3 md:px-4 text-sm md:text-base touch-manipulation"
              >
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
                {hasActiveFilters && (
                  <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {selectedSubjects.length + selectedDifficulties.length + selectedTopics.length}
                  </Badge>
                )}
                <ChevronDown className={cn("h-4 w-4 transition-transform", showFilters && "rotate-180")} />
              </Button>

              <div className="flex border border-border rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none h-10 w-10 md:h-12 md:w-12 touch-manipulation"
                >
                  <Grid3X3 className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="rounded-none h-10 w-10 md:h-12 md:w-12 touch-manipulation"
                >
                  <List className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>
            </div>
          </div>

          {showFilters && (
            <Card className="mb-4 md:mb-6">
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <h3 className="font-medium text-sm md:text-base">Filters</h3>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 md:h-9 touch-manipulation">
                      <X className="h-4 w-4 mr-1" />
                      Clear all
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  <div>
                    <Label className="text-sm font-medium mb-2 md:mb-3 block">Subject</Label>
                    <div className="space-y-2 md:space-y-3">
                      {["biology", "physics", "chemistry", "math", "agriculture"].map((subject) => {
                        const Icon = subjectIcons[subject as keyof typeof subjectIcons]
                        return (
                          <div key={subject} className="flex items-center gap-2 md:gap-3">
                            <Checkbox
                              id={`subject-${subject}`}
                              checked={selectedSubjects.includes(subject)}
                              onCheckedChange={() => toggleSubject(subject)}
                              className="h-5 w-5 md:h-6 md:w-6 touch-manipulation"
                            />
                            <Label
                              htmlFor={`subject-${subject}`}
                              className="flex items-center gap-2 text-sm md:text-base cursor-pointer touch-manipulation"
                            >
                              <Icon
                                className={cn(
                                  "h-4 w-4 md:h-5 md:w-5",
                                  `text-${subjectColors[subject as keyof typeof subjectColors]}`,
                                )}
                              />
                              {subject.charAt(0).toUpperCase() + subject.slice(1)}
                            </Label>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 md:mb-3 block">Difficulty</Label>
                    <div className="space-y-2 md:space-y-3">
                      {["beginner", "intermediate", "advanced"].map((difficulty) => (
                        <div key={difficulty} className="flex items-center gap-2 md:gap-3">
                          <Checkbox
                            id={`difficulty-${difficulty}`}
                            checked={selectedDifficulties.includes(difficulty)}
                            onCheckedChange={() => toggleDifficulty(difficulty)}
                            className="h-5 w-5 md:h-6 md:w-6 touch-manipulation"
                          />
                          <Label
                            htmlFor={`difficulty-${difficulty}`}
                            className="text-sm md:text-base cursor-pointer touch-manipulation"
                          >
                            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 md:mb-3 block">Topics</Label>
                    <div className="flex flex-wrap gap-1.5 md:gap-2 max-h-32 overflow-y-auto">
                      {allTopics.slice(0, 12).map((topic) => (
                        <Badge
                          key={topic}
                          variant={selectedTopics.includes(topic) ? "default" : "outline"}
                          className="cursor-pointer text-xs md:text-sm px-2 py-1 md:px-3 md:py-1.5 touch-manipulation"
                          onClick={() => toggleTopic(topic)}
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex items-center justify-between mb-3 md:mb-4">
            <p className="text-xs md:text-sm text-muted-foreground">
              Showing {filteredSimulations.length} of {simulations.length} simulations
            </p>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-4">
              {filteredSimulations.map((sim) => {
                const Icon = subjectIcons[sim.subject]
                return (
                  <Link key={sim.id} href={sim.href} className="group touch-manipulation">
                    <Card className="h-full border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50 active:scale-[0.98]">
                      <CardContent className="p-3 md:p-4">
                        <div className="flex items-start justify-between mb-2 md:mb-3">
                          <div className={cn("p-1.5 md:p-2 rounded-lg", `bg-${subjectColors[sim.subject]}/10`)}>
                            <Icon className={cn("h-4 w-4 md:h-5 md:w-5", `text-${subjectColors[sim.subject]}`)} />
                          </div>
                          <div className="flex gap-1">
                            {sim.isCustom && (
                              <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] md:text-xs">
                                Custom
                              </Badge>
                            )}
                            {sim.featured && (
                              <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 text-[10px] md:text-xs">
                                Featured
                              </Badge>
                            )}
                          </div>
                        </div>

                        <h3 className="font-semibold text-sm md:text-base mb-1 group-hover:text-primary transition-colors">
                          {sim.title}
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3 line-clamp-2">
                          {sim.description}
                        </p>

                        <div className="flex flex-wrap gap-1 mb-2 md:mb-3">
                          {sim.topics.slice(0, 2).map((topic) => (
                            <Badge key={topic} variant="secondary" className="text-[10px] md:text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            {sim.rating || "New"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {sim.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {sim.users}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredSimulations.map((sim) => {
                const Icon = subjectIcons[sim.subject]
                return (
                  <Link key={sim.id} href={sim.href} className="group touch-manipulation">
                    <Card className="transition-all duration-300 hover:shadow-md hover:border-primary/50 active:scale-[0.99]">
                      <CardContent className="p-3 md:p-4 flex items-center gap-3 md:gap-4">
                        <div className={cn("p-2 md:p-3 rounded-lg shrink-0", `bg-${subjectColors[sim.subject]}/10`)}>
                          <Icon className={cn("h-5 w-5 md:h-6 md:w-6", `text-${subjectColors[sim.subject]}`)} />
                        </div>

                        <div className="flex-grow min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-sm md:text-base group-hover:text-primary transition-colors">
                              {sim.title}
                            </h3>
                            {sim.featured && (
                              <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] md:text-xs">
                                Featured
                              </Badge>
                            )}
                            {sim.isCustom && (
                              <Badge variant="outline" className="text-[10px] md:text-xs">
                                Custom
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs md:text-sm text-muted-foreground truncate">{sim.description}</p>
                        </div>

                        <div className="hidden sm:flex items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground shrink-0">
                          <Badge variant="outline" className="capitalize text-xs">
                            {sim.difficulty}
                          </Badge>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 md:h-4 md:w-4" />
                            {sim.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 md:h-4 md:w-4 text-yellow-500 fill-yellow-500" />
                            {sim.rating || "New"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          )}

          {filteredSimulations.length === 0 && (
            <div className="text-center py-8 md:py-12">
              <p className="text-sm md:text-base text-muted-foreground">No simulations found matching your criteria.</p>
              <Button variant="link" onClick={clearFilters} className="touch-manipulation">
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
