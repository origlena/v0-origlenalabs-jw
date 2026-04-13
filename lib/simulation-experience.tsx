"use client"

import { ReactNode } from "react"
import { SimulationContent } from "./simulation-content"
import { Simulation } from "./simulations-store"

/**
 * Simulation Experience Framework
 * Provides reusable components and patterns for premium simulation pages.
 * Simulations opt-in to features, not forced into identical structures.
 */

export interface SimulationExperienceConfig {
  simulation: Simulation
  content: SimulationContent
  children: ReactNode
  hasChallengeMode?: boolean
  hasGuidedLearning?: boolean
  hasGlossary?: boolean
  relatedSimulations?: Simulation[]
}

/**
 * Simulation page wrapper providing consistent UX across all simulations.
 * Handles header, layout, related sims, and educational panels.
 */
export function createSimulationExperienceConfig(
  simulation: Simulation,
  content: SimulationContent,
): SimulationExperienceConfig {
  return {
    simulation,
    content,
    children: null,
    hasChallengeMode: false,
    hasGuidedLearning: false,
    hasGlossary: !!content.glossaryTerms && Object.keys(content.glossaryTerms).length > 0,
  }
}

/**
 * Helper to get related simulations from config
 */
export function getRelatedSimulations(
  contentId: string,
  allSimulations: Simulation[],
  contentMap: Record<string, SimulationContent>,
): Simulation[] {
  const content = contentMap[contentId]
  if (!content || !content.relatedSimulations) return []

  return content.relatedSimulations
    .map((relatedId) => allSimulations.find((sim) => sim.id === relatedId))
    .filter((sim): sim is Simulation => !!sim)
}

/**
 * Simulation experience hooks & utilities
 */

export const SimulationExperienceDefaults = {
  // Standard timing for animations
  TRANSITION_DURATION: 300,
  ANIMATION_DURATION: 500,

  // Mobile breakpoints
  MOBILE_BREAKPOINT: 1024,
  TABLET_BREAKPOINT: 1280,

  // Panel widths
  CONTROL_PANEL_WIDTH: "300px",
  INFO_PANEL_WIDTH: "280px",

  // Z-index layers
  ZINDEX: {
    CANVAS: 10,
    PANEL: 20,
    MODAL: 30,
    FULLSCREEN: 40,
  },
}

/**
 * Simulation learning outcome types
 */
export type LearningOutcomeType =
  | "concept"
  | "skill"
  | "visualization"
  | "understanding"
  | "exploration"

export interface LearningOutcome {
  type: LearningOutcomeType
  title: string
  description: string
}

/**
 * Challenge/task structure for guided learning
 */
export interface SimulationChallenge {
  id: string
  title: string
  description: string
  instructions: string[]
  successCriteria: string
  hint?: string
  completed?: boolean
}

/**
 * Glossary term with definition
 */
export interface GlossaryTerm {
  term: string
  definition: string
  relatedConcepts?: string[]
}

/**
 * Simulation performance profile
 */
export interface SimulationMetrics {
  avgSessionDuration: number
  engagementRate: number
  completionRate: number
  userRating: number
}

