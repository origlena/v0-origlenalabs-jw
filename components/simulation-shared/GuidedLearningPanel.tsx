"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Lightbulb, Target, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SimulationChallenge } from "@/lib/simulation-experience"

interface GuidedLearningPanelProps {
  challenges: SimulationChallenge[]
  currentChallengeId?: string
  onChallengeSelect?: (id: string) => void
  onChallengeComplete?: (id: string) => void
}

/**
 * Guided learning panel with challenges/tasks
 * Students can work through guided exploration steps
 */
export function GuidedLearningPanel({
  challenges,
  currentChallengeId,
  onChallengeSelect,
  onChallengeComplete,
}: GuidedLearningPanelProps) {
  const [expandedId, setExpandedId] = useState<string | null>(currentChallengeId)
  const currentChallenge = challenges.find((c) => c.id === currentChallengeId)

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Target className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Guided Learning</h3>
      </div>

      {challenges.map((challenge, index) => (
        <Card
          key={challenge.id}
          className={cn(
            "cursor-pointer transition-all hover:shadow-md",
            currentChallengeId === challenge.id && "ring-2 ring-primary",
            challenge.completed && "opacity-75",
          )}
          onClick={() => {
            onChallengeSelect?.(challenge.id)
            setExpandedId(expandedId === challenge.id ? null : challenge.id)
          }}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start gap-3">
              {challenge.completed ? (
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <CardTitle className="text-base truncate">
                    {index + 1}. {challenge.title}
                  </CardTitle>
                  {challenge.completed && <Badge variant="outline" className="text-xs">
                    Complete
                  </Badge>}
                </div>
                <CardDescription className="text-sm">{challenge.description}</CardDescription>
              </div>
            </div>
          </CardHeader>

          {expandedId === challenge.id && (
            <CardContent className="pt-0 border-t mt-3">
              <div className="space-y-4">
                {/* Instructions */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Instructions:</h4>
                  <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside">
                    {challenge.instructions.map((instruction, i) => (
                      <li key={i}>{instruction}</li>
                    ))}
                  </ol>
                </div>

                {/* Hint */}
                {challenge.hint && (
                  <div className="flex gap-2 p-2 bg-amber-500/10 border border-amber-500/20 rounded">
                    <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-900 dark:text-amber-200">{challenge.hint}</p>
                  </div>
                )}

                {/* Success Criteria */}
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Success Criteria
                  </h4>
                  <p className="text-sm text-muted-foreground">{challenge.successCriteria}</p>
                </div>

                {/* Mark as Complete Button */}
                {!challenge.completed && (
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => onChallengeComplete?.(challenge.id)}
                  >
                    Mark as Complete
                  </Button>
                )}
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}

/**
 * Concept checkpoint - quick knowledge check
 */
export function ConceptCheckpoint({
  title,
  question,
  options,
  onAnswer,
}: {
  title: string
  question: string
  options: { id: string; text: string; correct: boolean }[]
  onAnswer: (optionId: string, correct: boolean) => void
}) {
  const [answered, setAnswered] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (optionId: string) => {
    const correct = options.find((o) => o.id === optionId)?.correct ?? false
    setAnswered(optionId)
    setShowResult(true)
    onAnswer(optionId, correct)
  }

  return (
    <Card className="bg-blue-500/5 border-blue-500/20">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-blue-500" />
          {title}
        </CardTitle>
        <CardDescription>{question}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {options.map((option) => (
          <Button
            key={option.id}
            variant={answered === option.id ? "default" : "outline"}
            className="w-full justify-start text-left h-auto py-2"
            onClick={() => !showResult && handleAnswer(option.id)}
            disabled={showResult}
          >
            {option.text}
          </Button>
        ))}
        {showResult && (
          <p className={cn("text-sm mt-2 p-2 rounded", answered && options.find((o) => o.id === answered)?.correct ? "bg-green-500/10 text-green-700 dark:text-green-400" : "bg-red-500/10 text-red-700 dark:text-red-400")}>
            {answered && options.find((o) => o.id === answered)?.correct
              ? "✓ Correct! Well done."
              : "✗ Not quite. Try again or review the concept."}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

