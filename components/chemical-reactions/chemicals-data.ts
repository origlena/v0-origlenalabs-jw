export interface Chemical {
  id: string
  name: string
  formula: string
  color: string
  state: "solid" | "liquid" | "gas" | "aqueous"
  dangerLevel: "safe" | "caution" | "danger" | "extreme"
  description: string
  hazards: string[]
  uses: string[]
}

export const chemicals: Chemical[] = [
  {
    id: "water",
    name: "Water",
    formula: "H₂O",
    color: "#87CEEB",
    state: "liquid",
    dangerLevel: "safe",
    description: "Universal solvent, essential for life",
    hazards: [],
    uses: ["Solvent", "Coolant", "Chemical reactions"],
  },
  {
    id: "sodium",
    name: "Sodium Metal",
    formula: "Na",
    color: "#C0C0C0",
    state: "solid",
    dangerLevel: "extreme",
    description: "Highly reactive alkali metal that reacts violently with water",
    hazards: ["Explosive with water", "Burns skin", "Produces hydrogen gas", "Fire hazard"],
    uses: ["Sodium vapor lamps", "Chemical synthesis", "Nuclear reactors"],
  },
  {
    id: "hcl",
    name: "Hydrochloric Acid",
    formula: "HCl",
    color: "#F0E68C",
    state: "aqueous",
    dangerLevel: "danger",
    description: "Strong acid found in stomach, industrial uses",
    hazards: ["Corrosive", "Toxic fumes", "Burns skin"],
    uses: ["pH control", "Metal cleaning", "Food processing"],
  },
  {
    id: "naoh",
    name: "Sodium Hydroxide",
    formula: "NaOH",
    color: "#FFFFFF",
    state: "aqueous",
    dangerLevel: "danger",
    description: "Strong base, also known as lye or caustic soda",
    hazards: ["Corrosive", "Burns skin", "Eye damage"],
    uses: ["Soap making", "Paper production", "pH adjustment"],
  },
  {
    id: "vinegar",
    name: "Acetic Acid (Vinegar)",
    formula: "CH₃COOH",
    color: "#FFFACD",
    state: "aqueous",
    dangerLevel: "caution",
    description: "Weak acid used in cooking and cleaning",
    hazards: ["Mild irritant"],
    uses: ["Food preservative", "Cleaning agent", "pH adjustment"],
  },
  {
    id: "baking-soda",
    name: "Sodium Bicarbonate",
    formula: "NaHCO₃",
    color: "#FFFFFF",
    state: "solid",
    dangerLevel: "safe",
    description: "Mild base used in baking and cleaning",
    hazards: [],
    uses: ["Baking", "Antacid", "Fire extinguisher"],
  },
  {
    id: "hydrogen-peroxide",
    name: "Hydrogen Peroxide",
    formula: "H₂O₂",
    color: "#E0FFFF",
    state: "aqueous",
    dangerLevel: "caution",
    description: "Oxidizing agent and disinfectant",
    hazards: ["Skin irritant", "Eye irritant", "Bleaching agent"],
    uses: ["Disinfectant", "Bleaching", "Rocket fuel"],
  },
  {
    id: "ammonia",
    name: "Ammonia",
    formula: "NH₃",
    color: "#E6F3FF",
    state: "aqueous",
    dangerLevel: "danger",
    description: "Alkaline compound with pungent smell",
    hazards: ["Toxic fumes", "Eye/skin irritant", "Respiratory hazard"],
    uses: ["Fertilizer", "Cleaning agent", "Refrigerant"],
  },
  {
    id: "potassium",
    name: "Potassium Metal",
    formula: "K",
    color: "#D3D3D3",
    state: "solid",
    dangerLevel: "extreme",
    description: "Extremely reactive alkali metal, even more reactive than sodium",
    hazards: ["Violently explosive with water", "Fire hazard", "Toxic fumes"],
    uses: ["Fertilizers", "Chemical synthesis", "Explosives"],
  },
  {
    id: "sulfuric-acid",
    name: "Sulfuric Acid",
    formula: "H₂SO₄",
    color: "#FFE4B5",
    state: "aqueous",
    dangerLevel: "extreme",
    description: "One of the strongest acids, highly corrosive",
    hazards: ["Severe burns", "Dehydrating agent", "Explosive with water", "Toxic fumes"],
    uses: ["Battery acid", "Fertilizer production", "Chemical synthesis"],
  },
  {
    id: "bleach",
    name: "Sodium Hypochlorite (Bleach)",
    formula: "NaClO",
    color: "#F5F5DC",
    state: "aqueous",
    dangerLevel: "danger",
    description: "Strong oxidizing agent and disinfectant",
    hazards: ["Corrosive", "Toxic fumes", "Dangerous with acids"],
    uses: ["Disinfectant", "Bleaching", "Water treatment"],
  },
  {
    id: "magnesium",
    name: "Magnesium Ribbon",
    formula: "Mg",
    color: "#E8E8E8",
    state: "solid",
    dangerLevel: "caution",
    description: "Reactive metal that burns with brilliant white light",
    hazards: ["Fire hazard", "Bright light can damage eyes"],
    uses: ["Fireworks", "Flares", "Photography"],
  },
]

export interface Reaction {
  chemical1Id: string
  chemical2Id: string
  name: string
  equation: string
  type:
    | "neutralization"
    | "combustion"
    | "single-displacement"
    | "double-displacement"
    | "synthesis"
    | "decomposition"
    | "explosive"
  intensity: 1 | 2 | 3 | 4 | 5 // 1 = mild, 5 = explosive
  products: string[]
  observations: string[]
  energyChange: "exothermic" | "endothermic"
  heatProduced?: number // in kJ/mol
  gasProduced?: string
  colorChange?: string
  precipitate?: string
  soundEffect?: "fizz" | "boom" | "hiss" | "pop"
  educationalNote: string
}

export const reactions: Reaction[] = [
  {
    chemical1Id: "sodium",
    chemical2Id: "water",
    name: "Sodium + Water",
    equation: "2Na + 2H₂O → 2NaOH + H₂↑",
    type: "single-displacement",
    intensity: 5,
    products: ["Sodium hydroxide (NaOH)", "Hydrogen gas (H₂)"],
    observations: [
      "Sodium melts into a silvery ball",
      "Violent fizzing and sparking",
      "Yellow flame (sodium emission)",
      "Steam production",
      "Hydrogen gas evolution",
      "May explode with larger pieces",
    ],
    energyChange: "exothermic",
    heatProduced: 368,
    gasProduced: "Hydrogen",
    soundEffect: "boom",
    educationalNote:
      "This is one of the most dangerous reactions. Sodium reacts so violently with water that it produces enough heat to ignite the hydrogen gas produced, causing explosions. The reaction is highly exothermic and should NEVER be attempted outside controlled laboratory conditions.",
  },
  {
    chemical1Id: "potassium",
    chemical2Id: "water",
    name: "Potassium + Water",
    equation: "2K + 2H₂O → 2KOH + H₂↑",
    type: "single-displacement",
    intensity: 5,
    products: ["Potassium hydroxide (KOH)", "Hydrogen gas (H₂)"],
    observations: [
      "Immediate violent reaction",
      "Purple/lilac flame",
      "Loud explosion possible",
      "Intense heat and steam",
      "Hydrogen gas ignites instantly",
    ],
    energyChange: "exothermic",
    heatProduced: 393,
    gasProduced: "Hydrogen",
    soundEffect: "boom",
    educationalNote:
      "Even more reactive than sodium! Potassium reacts with explosive violence when placed in water. The heat generated is sufficient to ignite the hydrogen gas immediately, producing a purple flame from excited potassium atoms. This is an extremely dangerous reaction.",
  },
  {
    chemical1Id: "hcl",
    chemical2Id: "naoh",
    name: "Acid-Base Neutralization",
    equation: "HCl + NaOH → NaCl + H₂O",
    type: "neutralization",
    intensity: 3,
    products: ["Sodium chloride (table salt)", "Water"],
    observations: [
      "Temperature rises significantly",
      "Clear solution remains",
      "pH becomes neutral (7)",
      "No gas produced",
    ],
    energyChange: "exothermic",
    heatProduced: 57,
    educationalNote:
      "This is a classic neutralization reaction where an acid and base react to form salt and water. The reaction releases heat, making the beaker feel warm. This is the basis of antacid tablets neutralizing stomach acid.",
  },
  {
    chemical1Id: "vinegar",
    chemical2Id: "baking-soda",
    name: "Vinegar + Baking Soda",
    equation: "CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂↑",
    type: "double-displacement",
    intensity: 2,
    products: ["Sodium acetate", "Water", "Carbon dioxide gas"],
    observations: [
      "Vigorous fizzing and bubbling",
      "Carbon dioxide gas evolution",
      "Foaming action",
      "Slight cooling effect",
      "Clear solution after reaction",
    ],
    energyChange: "endothermic",
    gasProduced: "Carbon dioxide",
    soundEffect: "fizz",
    educationalNote:
      "This safe and common reaction is often used in science demonstrations and baking. The carbon dioxide gas produced causes the bubbling. This is the same reaction that makes baking goods rise and creates the fizz in bath bombs.",
  },
  {
    chemical1Id: "hydrogen-peroxide",
    chemical2Id: "bleach",
    name: "Peroxide + Bleach",
    equation: "H₂O₂ + NaClO → NaCl + H₂O + O₂↑",
    type: "single-displacement",
    intensity: 3,
    products: ["Sodium chloride", "Water", "Oxygen gas"],
    observations: [
      "Rapid bubbling",
      "Heat generation",
      "Oxygen gas evolution",
      "Foaming action",
      "Solution becomes less colored",
    ],
    energyChange: "exothermic",
    gasProduced: "Oxygen",
    soundEffect: "fizz",
    educationalNote:
      "Mixing hydrogen peroxide with bleach produces oxygen gas and heat. This reaction can be dangerous in confined spaces as it releases oxygen rapidly, which can intensify fires. Never mix cleaning products!",
  },
  {
    chemical1Id: "sulfuric-acid",
    chemical2Id: "water",
    name: "Diluting Sulfuric Acid",
    equation: "H₂SO₄ + H₂O → H₃O⁺ + HSO₄⁻",
    type: "synthesis",
    intensity: 4,
    products: ["Hydrated sulfuric acid"],
    observations: [
      "EXTREME heat generation",
      "Violent boiling",
      "Splattering danger",
      "Crackling sounds",
      "Steam production",
      "Must add acid to water, NEVER water to acid!",
    ],
    energyChange: "exothermic",
    heatProduced: 880,
    soundEffect: "hiss",
    educationalNote:
      'Diluting sulfuric acid is extremely dangerous. The heat produced can cause water to boil explosively. Always remember: "Do as you oughta, add acid to water" - never the reverse! Adding water to concentrated acid can cause violent splattering and severe burns.',
  },
  {
    chemical1Id: "magnesium",
    chemical2Id: "hcl",
    name: "Magnesium + Acid",
    equation: "Mg + 2HCl → MgCl₂ + H₂↑",
    type: "single-displacement",
    intensity: 3,
    products: ["Magnesium chloride", "Hydrogen gas"],
    observations: [
      "Vigorous bubbling",
      "Ribbon dissolves",
      "Hydrogen gas evolution",
      "Solution heats up",
      "Colorless gas produced",
    ],
    energyChange: "exothermic",
    gasProduced: "Hydrogen",
    soundEffect: "fizz",
    educationalNote:
      "This reaction demonstrates a metal reacting with an acid to produce a salt and hydrogen gas. The hydrogen can be collected and tested with a 'pop test' - it makes a squeaky pop when ignited.",
  },
  {
    chemical1Id: "ammonia",
    chemical2Id: "hcl",
    name: "Ammonia + HCl (Smoke Ring)",
    equation: "NH₃ + HCl → NH₄Cl",
    type: "synthesis",
    intensity: 2,
    products: ["Ammonium chloride (white smoke)"],
    observations: [
      "Dense white smoke/fog forms",
      "Smoke rings possible",
      "No heat or flame",
      "Particles settle as powder",
      "Strong smell initially",
    ],
    energyChange: "exothermic",
    precipitate: "White ammonium chloride smoke",
    educationalNote:
      "This creates a beautiful demonstration where white smoke appears to form from 'nothing'. The smoke is actually tiny particles of solid ammonium chloride. This is often used to create dramatic smoke effects in demonstrations.",
  },
]

export function getReaction(chem1Id: string, chem2Id: string): Reaction | null {
  return (
    reactions.find(
      (r) =>
        (r.chemical1Id === chem1Id && r.chemical2Id === chem2Id) ||
        (r.chemical1Id === chem2Id && r.chemical2Id === chem1Id),
    ) || null
  )
}
