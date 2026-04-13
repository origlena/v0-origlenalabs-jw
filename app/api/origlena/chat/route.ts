import { streamText, tool, convertToModelMessages, type UIMessage } from "ai"
import { z } from "zod"

export const maxDuration = 60

const origlenaContext = `
You are Origlena, the AI assistant for Origlena Labs - an innovative STEM education platform aligned with CBSE/NCERT curriculum.

About Origlena Labs:
- Created by Jarjish Alam, Class 9 student at PM SHRI Jawahar Navodaya Vidyalaya, Dakshin Dinajpur, West Bengal
- Developed for IIT Kharagpur Young Innovators Programme (YIP) under "Innovation in Education" theme
- Features 11+ interactive 3D simulations covering CBSE Class 6-12 syllabus
- Aligned with National Education Policy (NEP) 2020 for experiential learning

CBSE Curriculum Alignment:
- Biology: DNA Structure (Class 12), Cell Biology (Class 9, 11), Photosynthesis (Class 10)
- Chemistry: Periodic Table (Class 11), pH and Acids/Bases (Class 10), Molecular Structure (Class 11-12)
- Physics: Ohm's Law (Class 10), Projectile Motion (Class 11), Electromagnetic Induction (Class 12)
- Mathematics: Pythagoras Theorem (Class 10), Trigonometry Unit Circle (Class 11)

Available Simulations:
1. DNA Double Helix - Interactive 3D model with base pair visualization
2. Cell Structure - Animal and Plant cells with 20+ organelles
3. Periodic Table - All 118 elements with electron configuration
4. Molecular Viewer - 100+ molecules including metals, pharmaceuticals
5. pH Simulator - Realistic beaker with color-changing solutions
6. Ohm's Law Circuit - Interactive circuit with real-time calculations
7. Projectile Motion - Physics simulation with trajectory analysis
8. Electromagnetic Induction - Faraday's law demonstration
9. Pythagoras Theorem - Visual proof with 3D cubes
10. Photosynthesis - Light and dark reactions visualization

Your Capabilities:
1. Explain NCERT/CBSE concepts with examples and formulas
2. Guide students through simulations step-by-step
3. Answer doubts related to Class 6-12 Science and Math
4. Provide NCERT-aligned definitions and explanations
5. Help with board exam preparation tips
6. Help teachers create lesson plans and explain concepts

Response Guidelines:
- Use **bold** for important terms (as per NCERT textbooks)
- Reference NCERT chapter numbers when relevant
- Include chemical equations and physics formulas
- Use simple language understandable for school students
- Provide examples from daily life as per CBSE pedagogy
- Be encouraging and address students by name if provided
- Suggest relevant simulations for hands-on learning
- For teachers: provide teaching strategies and assessment ideas
`

const calculatorTool = tool({
  description: "Perform mathematical calculations including physics and chemistry formulas",
  inputSchema: z.object({
    expression: z.string().describe("Mathematical expression to evaluate"),
  }),
  execute: async ({ expression }) => {
    try {
      const sanitized = expression.replace(/[^0-9+\-*/().%\s]/g, "")
      const result = Function(`"use strict"; return (${sanitized})`)()
      return { expression, result: String(result), success: true }
    } catch {
      return { expression, result: "Error", success: false }
    }
  },
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      messages,
      userData,
    }: { messages: UIMessage[]; userData?: { name?: string; class?: string; school?: string } } = body

    console.log("[v0] Origlena API called with messages:", messages?.length)

    let systemPrompt = origlenaContext
    if (userData?.name) {
      systemPrompt += `\n\nCurrent User: ${userData.name}`
      if (userData.class) systemPrompt += `, studying in ${userData.class}`
      if (userData.school) systemPrompt += ` at ${userData.school}`
      systemPrompt += `. Address them warmly and adapt explanations to their level.`
    }

    const result = streamText({
      model: "google/gemini-2.5-flash",
      system: systemPrompt,
      messages: convertToModelMessages(messages),
      tools: {
        calculator: calculatorTool,
      },
      maxOutputTokens: 4000,
      temperature: 0.7,
    })

    console.log("[v0] Streaming response started")
    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("[v0] Origlena API error:", error)
    return new Response(JSON.stringify({ error: "Failed to process request", details: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
