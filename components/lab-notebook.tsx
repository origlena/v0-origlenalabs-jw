"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BookOpen,
  X,
  Plus,
  Save,
  Download,
  Trash2,
  Clock,
  FlaskConical,
  ChevronDown,
  ChevronUp,
  FileText,
} from "lucide-react"

interface LabEntry {
  id: string
  title: string
  simulation: string
  hypothesis: string
  observations: string
  conclusion: string
  timestamp: Date
}

export function LabNotebook() {
  const [isOpen, setIsOpen] = useState(false)
  const [entries, setEntries] = useState<LabEntry[]>([])
  const [currentEntry, setCurrentEntry] = useState<Partial<LabEntry>>({
    title: "",
    simulation: "",
    hypothesis: "",
    observations: "",
    conclusion: "",
  })
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(new Set())
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("origlena-lab-notebook")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setEntries(parsed.map((e: LabEntry) => ({ ...e, timestamp: new Date(e.timestamp) })))
      } catch (e) {
        console.error("Failed to parse lab notebook", e)
      }
    }
  }, [])

  const saveEntries = (newEntries: LabEntry[]) => {
    localStorage.setItem("origlena-lab-notebook", JSON.stringify(newEntries))
    setEntries(newEntries)
  }

  const handleSave = () => {
    if (!currentEntry.title || !currentEntry.simulation) return

    const newEntry: LabEntry = {
      id: `entry-${Date.now()}`,
      title: currentEntry.title || "",
      simulation: currentEntry.simulation || "",
      hypothesis: currentEntry.hypothesis || "",
      observations: currentEntry.observations || "",
      conclusion: currentEntry.conclusion || "",
      timestamp: new Date(),
    }

    saveEntries([newEntry, ...entries])
    setCurrentEntry({
      title: "",
      simulation: "",
      hypothesis: "",
      observations: "",
      conclusion: "",
    })
    setIsCreating(false)
  }

  const handleDelete = (id: string) => {
    saveEntries(entries.filter((e) => e.id !== id))
  }

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedEntries)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedEntries(newExpanded)
  }

  const exportNotebook = () => {
    const content = entries
      .map(
        (entry) => `
# ${entry.title}
Simulation: ${entry.simulation}
Date: ${entry.timestamp.toLocaleDateString()}

## Hypothesis
${entry.hypothesis}

## Observations
${entry.observations}

## Conclusion
${entry.conclusion}

---
`,
      )
      .join("\n")

    const blob = new Blob([content], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "origlena-lab-notebook.md"
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 h-14 w-14 md:h-16 md:w-16 rounded-full shadow-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-500/90 hover:to-emerald-500/90 touch-manipulation"
      >
        <BookOpen className="h-6 w-6 md:h-7 md:w-7" />
        <span className="sr-only">Open Lab Notebook</span>
        {entries.length > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 md:h-6 md:w-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            {entries.length}
          </span>
        )}
      </Button>
    )
  }

  return (
    <Card className="fixed z-50 bottom-6 left-6 w-[95vw] sm:w-96 md:w-[450px] h-[70vh] max-h-[600px] shadow-2xl border-2 border-green-500/20 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 md:p-4 border-b bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-t-lg">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
            <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm md:text-base">Lab Notebook</h3>
            <p className="text-xs text-muted-foreground">{entries.length} entries</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {entries.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={exportNotebook}
              className="h-8 w-8 touch-manipulation"
              title="Export Notebook"
            >
              <Download className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 touch-manipulation">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-3 md:p-4">
        {/* New Entry Form */}
        {isCreating ? (
          <Card className="p-3 md:p-4 mb-4 border-green-500/30 bg-green-500/5">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <FlaskConical className="h-4 w-4 text-green-500" />
              New Experiment Entry
            </h4>
            <div className="space-y-3">
              <Input
                placeholder="Experiment Title"
                value={currentEntry.title}
                onChange={(e) => setCurrentEntry({ ...currentEntry, title: e.target.value })}
                className="h-10 touch-manipulation"
              />
              <Input
                placeholder="Simulation Used (e.g., DNA Helix, pH Simulator)"
                value={currentEntry.simulation}
                onChange={(e) => setCurrentEntry({ ...currentEntry, simulation: e.target.value })}
                className="h-10 touch-manipulation"
              />
              <Textarea
                placeholder="Your Hypothesis - What do you expect to happen?"
                value={currentEntry.hypothesis}
                onChange={(e) => setCurrentEntry({ ...currentEntry, hypothesis: e.target.value })}
                className="min-h-[60px] touch-manipulation"
              />
              <Textarea
                placeholder="Observations - What did you observe?"
                value={currentEntry.observations}
                onChange={(e) => setCurrentEntry({ ...currentEntry, observations: e.target.value })}
                className="min-h-[60px] touch-manipulation"
              />
              <Textarea
                placeholder="Conclusion - What did you learn?"
                value={currentEntry.conclusion}
                onChange={(e) => setCurrentEntry({ ...currentEntry, conclusion: e.target.value })}
                className="min-h-[60px] touch-manipulation"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  disabled={!currentEntry.title || !currentEntry.simulation}
                  className="flex-1 h-10 touch-manipulation bg-green-500 hover:bg-green-600"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Entry
                </Button>
                <Button variant="outline" onClick={() => setIsCreating(false)} className="h-10 touch-manipulation">
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Button
            onClick={() => setIsCreating(true)}
            className="w-full mb-4 h-11 touch-manipulation bg-gradient-to-r from-green-500 to-emerald-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Experiment Entry
          </Button>
        )}

        {/* Entries List */}
        <div className="space-y-3">
          {entries.length === 0 && !isCreating ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No entries yet</p>
              <p className="text-sm">Start recording your experiments!</p>
            </div>
          ) : (
            entries.map((entry) => (
              <Card key={entry.id} className="overflow-hidden">
                <button
                  onClick={() => toggleExpanded(entry.id)}
                  className="w-full p-3 flex items-center justify-between hover:bg-muted/50 transition-colors touch-manipulation"
                >
                  <div className="text-left">
                    <h5 className="font-medium text-sm">{entry.title}</h5>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <FlaskConical className="h-3 w-3" />
                      {entry.simulation}
                      <span className="mx-1">•</span>
                      <Clock className="h-3 w-3" />
                      {entry.timestamp.toLocaleDateString()}
                    </div>
                  </div>
                  {expandedEntries.has(entry.id) ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>

                {expandedEntries.has(entry.id) && (
                  <div className="px-3 pb-3 space-y-2 border-t">
                    {entry.hypothesis && (
                      <div className="pt-2">
                        <p className="text-xs font-semibold text-green-600 dark:text-green-400">Hypothesis:</p>
                        <p className="text-sm">{entry.hypothesis}</p>
                      </div>
                    )}
                    {entry.observations && (
                      <div>
                        <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">Observations:</p>
                        <p className="text-sm">{entry.observations}</p>
                      </div>
                    )}
                    {entry.conclusion && (
                      <div>
                        <p className="text-xs font-semibold text-purple-600 dark:text-purple-400">Conclusion:</p>
                        <p className="text-sm">{entry.conclusion}</p>
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(entry.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-500/10 h-8 touch-manipulation"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  )
}
