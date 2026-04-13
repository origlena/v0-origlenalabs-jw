# SIMULATION UPGRADE TEMPLATE
## Quick Guide for Upgrading Future Simulations

Use this template to upgrade any simulation following the Phase 3 pattern.

---

## STEP 1: PREPARE METADATA

Ensure the simulation has proper entries in these files:

### `lib/simulations-store.tsx`
```typescript
{
  id: "your-sim-id",
  title: "Your Simulation Title",
  description: "Short description for cards",
  subject: "physics" | "chemistry" | "biology" | "math",
  difficulty: "beginner" | "intermediate" | "advanced",
  topics: ["Topic 1", "Topic 2"],
  duration: "15 min",
  rating: 4.9,
  users: "12.5k",
  href: "/simulations/subject/your-sim",
  featured: true,
}
```

### `lib/simulation-content.ts`
```typescript
export const simulationContent: Record<string, SimulationContent> = {
  "your-sim-id": {
    id: "your-sim-id",
    title: "Your Simulation: Full Educational Title",
    shortDescription: "One sentence summary",
    longDescription: "2-3 paragraph detailed explanation",
    whatYouLearn: [
      "Learning outcome 1",
      "Learning outcome 2",
      "Learning outcome 3",
    ],
    howToUse: [
      "Step 1: First instruction",
      "Step 2: Second instruction",
      "Step 3: Third instruction",
    ],
    keyConcepts: [
      "Concept A",
      "Concept B",
      "Concept C",
    ],
    classRelevance: [
      "CBSE Class 9-10: Topic Name",
      "CBSE Class 11-12: Related Topic",
    ],
    cbseClass: ["9", "10", "11", "12"],
    cbseTopic: "Relevant CBSE Topic",
    relatedSimulations: ["related-sim-1", "related-sim-2"],
    teacherTip: "Suggestion for classroom use",
    studentChallenge: "Challenge question for students",
    glossaryTerms: {
      "term1": "Definition of term 1",
      "term2": "Definition of term 2",
      "term3": "Definition of term 3",
    },
    keywords: ["keyword1", "keyword2", "keyword3"],
  },
}
```

---

## STEP 2: CREATE CHALLENGES

Define 2-3 guided learning challenges for your simulation:

```typescript
const YOUR_SIM_CHALLENGES: SimulationChallenge[] = [
  {
    id: "challenge-1",
    title: "Challenge Title",
    description: "Brief description of what student will do",
    instructions: [
      "Step 1: Detailed instruction",
      "Step 2: Detailed instruction",
      "Step 3: Detailed instruction",
    ],
    successCriteria: "Clear success criteria - what completion looks like",
    hint: "Optional hint to guide learners",
    completed: false,
  },
  {
    id: "challenge-2",
    title: "Another Challenge",
    description: "Description",
    instructions: [
      "Step 1",
      "Step 2",
      "Step 3",
    ],
    successCriteria: "Success criteria",
    hint: "Hint",
    completed: false,
  },
]
```

**Good challenges:**
- Have clear success criteria
- Require interaction with the simulation
- Test understanding, not just observation
- Include hints for struggling learners
- Progress from basic to more complex

---

## STEP 3: UPGRADE THE PAGE

Start with this template:

```typescript
"use client"

import { useState, useEffect, useMemo } from "react"
import { Navigation } from "@/components/navigation"

// Your existing components
import { YourCanvas } from "@/components/your-sim/canvas"
import { YourControlPanel } from "@/components/your-sim/control-panel"
import { YourInfoPanel } from "@/components/your-sim/info-panel"

// New shared components
import { SimulationHeader } from "@/components/simulation-shared/SimulationPageWrapper"
import { ConceptGlossary, EducationalInfoSection } from "@/components/simulation-shared/ConceptGlossary"
import { GuidedLearningPanel, SimulationChallenge } from "@/components/simulation-shared/GuidedLearningPanel"
import { RelatedSimulationsWidget } from "@/components/simulation-shared/RelatedSimulationsWidget"

// Data
import { useSimulations } from "@/lib/simulations-store"
import { simulationContent } from "@/lib/simulation-content"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"

// Define challenges
const YOUR_SIM_CHALLENGES: SimulationChallenge[] = [
  // ... challenges here
]

export default function YourSimulationPage() {
  // State
  const [activeTab, setActiveTab] = useState("explore")
  const [challenges, setChallenges] = useState<SimulationChallenge[]>(YOUR_SIM_CHALLENGES)
  const [currentChallengeId, setCurrentChallengeId] = useState<string | null>(null)

  // Get related simulations
  const { simulations } = useSimulations()
  const content = simulationContent["your-sim-id"]
  const relatedSims = useMemo(
    () =>
      content.relatedSimulations
        .map((id) => simulations.find((s) => s.id === id))
        .filter(Boolean),
    [simulations, content],
  )

  // Handlers
  const handleChallengeComplete = (id: string) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, completed: true } : c)),
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 flex flex-col">
        {/* Header */}
        <SimulationHeader
          title="Your Simulation Title"
          subtitle="Brief educational subtitle"
          description="Detailed description of what students will learn"
          difficulty="beginner"
        />

        {/* Navigation Tabs */}
        <div className="border-b bg-card/50 px-4 sticky top-[120px] z-30">
          <div className="container mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 gap-0 bg-transparent border-0">
                <TabsTrigger value="explore" className="rounded-none border-b-2">
                  Explore
                </TabsTrigger>
                <TabsTrigger value="guided" className="rounded-none border-b-2">
                  Guided Learning
                </TabsTrigger>
                <TabsTrigger value="concepts" className="rounded-none border-b-2">
                  Concepts
                </TabsTrigger>
                <TabsTrigger value="info" className="rounded-none border-b-2">
                  Resources
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} className="flex-1 flex flex-col overflow-hidden">
          {/* Explore Tab - Your existing simulation */}
          <TabsContent value="explore" className="flex-1 flex overflow-hidden m-0">
            {/* Existing control panel, canvas, info panel layout */}
            {/* Keep your current implementation here */}
          </TabsContent>

          {/* Guided Learning Tab */}
          <TabsContent value="guided" className="flex-1 overflow-y-auto m-0">
            <div className="container mx-auto py-6 px-4">
              <GuidedLearningPanel
                challenges={challenges}
                currentChallengeId={currentChallengeId}
                onChallengeSelect={setCurrentChallengeId}
                onChallengeComplete={handleChallengeComplete}
              />
            </div>
          </TabsContent>

          {/* Concepts Tab */}
          <TabsContent value="concepts" className="flex-1 overflow-y-auto m-0">
            <div className="container mx-auto py-6 px-4 space-y-6">
              <EducationalInfoSection
                whatYouLearn={content.whatYouLearn}
                keyConcepts={content.keyConcepts}
              />
              
              {/* Add subject-specific comparison or explanation here */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Your Subject Specific Content</h3>
                {/* Add comparison tables, visual explanations, etc. */}
              </Card>
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="info" className="flex-1 overflow-y-auto m-0">
            <div className="container mx-auto py-6 px-4 space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">How to Use This Simulation</h3>
                <ol className="space-y-3 text-sm">
                  {content.howToUse.map((instruction, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-primary font-bold flex-shrink-0">{i + 1}.</span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </Card>

              <div className="flex gap-4 flex-wrap">
                <ConceptGlossary terms={content.glossaryTerms} title="Key Terms" />
              </div>

              {relatedSims && relatedSims.length > 0 && (
                <RelatedSimulationsWidget
                  simulations={relatedSims}
                  title="Explore Related Concepts"
                  description="Deepen your understanding with related simulations"
                />
              )}

              {content.teacherTip && (
                <Card className="border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950 p-6">
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                    👨‍🏫 Teacher Tip
                  </h4>
                  <p className="text-sm text-purple-800 dark:text-purple-200">{content.teacherTip}</p>
                </Card>
              )}

              {content.studentChallenge && (
                <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 p-6">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    🎯 Student Challenge
                  </h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200">{content.studentChallenge}</p>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
```

---

## STEP 4: CUSTOMIZE FOR YOUR SIMULATION

Replace these sections with subject-specific content:

### Concepts Tab
Add any special visualizations, comparisons, or explanations specific to your simulation:
- Comparison tables (animal vs plant, before vs after, etc.)
- Formula displays
- Property tables
- Conceptual explanations
- Visual guides

### Challenge Design
Make challenges that:
- Test core concepts, not memorization
- Require interaction with simulation
- Progress from easy to harder
- Have clear success indicators
- Provide hints for learners

### Glossary
Include 5-10 key terms with clear, student-friendly definitions

### Related Simulations
Link to simulations that build on or support this concept

---

## STEP 5: TESTING CHECKLIST

- [ ] Tab navigation works on desktop and mobile
- [ ] All challenges display correctly
- [ ] Glossary search works
- [ ] Related simulations load properly
- [ ] Teacher tips and student challenges display
- [ ] Existing 3D canvas still works (no regression)
- [ ] No TypeScript errors
- [ ] Mobile responsive (test at 375px, 768px, 1024px)
- [ ] All links navigate correctly
- [ ] Educational content is accurate and helpful

---

## COMMON PATTERNS

### Adding Comparisons
```typescript
<div className="grid md:grid-cols-2 gap-4">
  <div>
    <h4 className="font-medium text-blue-600 mb-3">Option A</h4>
    <ul className="space-y-2 text-sm">
      <li className="flex gap-2"><span className="text-primary">•</span> Feature 1</li>
      <li className="flex gap-2"><span className="text-primary">•</span> Feature 2</li>
    </ul>
  </div>
  <div>
    <h4 className="font-medium text-green-600 mb-3">Option B</h4>
    <ul className="space-y-2 text-sm">
      <li className="flex gap-2"><span className="text-primary">•</span> Feature 1</li>
      <li className="flex gap-2"><span className="text-primary">•</span> Feature 2</li>
    </ul>
  </div>
</div>
```

### Adding Info Cards
```typescript
<Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 p-6">
  <h4 className="font-semibold text-blue-900 mb-2">💡 Tip Title</h4>
  <p className="text-sm text-blue-800">Content here</p>
</Card>
```

### Adding Challenges
```typescript
const CHALLENGE_ID: SimulationChallenge = {
  id: "unique-id",
  title: "Clear title",
  description: "What you're doing",
  instructions: [
    "Step 1",
    "Step 2",
    "Step 3",
  ],
  successCriteria: "How you know you succeeded",
  hint: "Helpful hint",
  completed: false,
}
```

---

## ESTIMATED TIME

- Prepare metadata: 30 min
- Create challenges: 1-2 hours
- Upgrade page: 2-3 hours
- Test & refine: 1 hour
- **Total: 4-6 hours per simulation**

---

## QUESTIONS?

Refer to `/PHASE_3_COMPLETION.md` for detailed explanations and examples.

