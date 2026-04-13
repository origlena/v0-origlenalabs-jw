"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { GlossaryTerm } from "@/lib/simulation-experience"

interface ConceptGlossaryProps {
  terms: Record<string, string> | GlossaryTerm[]
  title?: string
}

/**
 * Glossary modal for simulation key terms and concepts
 */
export function ConceptGlossary({ terms, title = "Key Terms" }: ConceptGlossaryProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Convert string record to GlossaryTerm format if needed
  const glossaryTerms: GlossaryTerm[] = Array.isArray(terms)
    ? terms
    : Object.entries(terms).map(([term, definition]) => ({
        term,
        definition: typeof definition === "string" ? definition : "",
      }))

  const filteredTerms = glossaryTerms.filter(
    (item) =>
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <>
      {/* Trigger Button */}
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => setOpen(true)}
      >
        <BookOpen className="h-4 w-4" />
        <span className="hidden sm:inline">{title}</span>
        <Badge variant="secondary" className="text-xs">
          {glossaryTerms.length}
        </Badge>
      </Button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-96 flex flex-col">
            <CardHeader className="pb-4 flex flex-row items-center justify-between border-b">
              <div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{glossaryTerms.length} terms</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setOpen(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col gap-4 pt-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2" />
                <Input
                  placeholder="Search terms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Terms List */}
              <div className="flex-1 overflow-y-auto space-y-3">
                {filteredTerms.length > 0 ? (
                  filteredTerms.map((item, i) => (
                    <div key={i} className="p-3 bg-muted/30 rounded-lg border">
                      <h4 className="font-semibold text-sm mb-1">{item.term}</h4>
                      <p className="text-sm text-muted-foreground">{item.definition}</p>
                      {item.relatedConcepts && item.relatedConcepts.length > 0 && (
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {item.relatedConcepts.map((concept, j) => (
                            <Badge key={j} variant="secondary" className="text-xs">
                              {concept}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No terms found matching your search.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

/**
 * Educational info section with concept summary
 */
export function EducationalInfoSection({
  whatYouLearn,
  keyConcepts,
  children,
}: {
  whatYouLearn?: string[]
  keyConcepts?: string[]
  children?: React.ReactNode
}) {
  return (
    <div className="space-y-4">
      {whatYouLearn && whatYouLearn.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">What You'll Learn</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {whatYouLearn.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-primary font-bold flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {keyConcepts && keyConcepts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Key Concepts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {keyConcepts.map((concept, i) => (
                <Badge key={i} variant="secondary">
                  {concept}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {children}
    </div>
  )
}

