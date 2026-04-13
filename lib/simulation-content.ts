/**
 * Simulation Content Configuration
 * This file defines the rich landing page content for each simulation.
 * It's a content layer on top of the simulations-store that enables SEO and educational value.
 */

export interface SimulationContent {
  id: string
  title: string
  shortDescription: string
  longDescription: string
  whatYouLearn: string[]
  howToUse: string[]
  keyConcepts: string[]
  classRelevance: string[]
  cbseClass: string[]
  cbseTopic: string
  relatedSimulations: string[] // IDs of related simulations
  teacherTip?: string
  studentChallenge?: string
  glossaryTerms?: Record<string, string>
  keywords: string[]
}

export const simulationContent: Record<string, SimulationContent> = {
  // BIOLOGY SIMULATIONS
  "cell-structure": {
    id: "cell-structure",
    title: "Cell Structure: Animal & Plant Cells in 3D",
    shortDescription:
      "Explore the ultra-realistic 3D structure of animal and plant cells with interactive organelles, detailed labels, and comprehensive information about cell components.",
    longDescription: `Cell structure is fundamental to understanding all life. This interactive 3D simulator lets you explore both animal and plant cells at the cellular level, examining organelles like the nucleus, mitochondria, chloroplasts, endoplasmic reticulum, and Golgi apparatus. 
    
    Unlike textbook diagrams, you can rotate, zoom, and interact with each component in real time. The simulator shows how each organelle contributes to the cell's overall function, helping you understand the relationship between structure and function—a key principle in biology.
    
    Perfect for CBSE Class 9 and Class 11 students studying cell biology, this simulation brings the microscopic world to life in stunning visual detail.`,
    whatYouLearn: [
      "Structure and function of cell organelles",
      "Differences between animal and plant cells",
      "The role of the nucleus, mitochondria, and chloroplasts",
      "How cell structure relates to cellular function",
      "The importance of cell membranes and cell walls",
    ],
    howToUse: [
      "Click on any organelle to see detailed information",
      "Use the rotation controls to view the cell from different angles",
      "Toggle between animal and plant cell views to compare structures",
      "Zoom in to examine organelles in detail",
      "Read the info panel to learn about each component's function",
    ],
    keyConcepts: [
      "Prokaryotic vs. Eukaryotic Cells",
      "Nucleus and Nuclear Organization",
      "Mitochondria: The Powerhouse of the Cell",
      "Chloroplasts and Photosynthesis",
      "Endoplasmic Reticulum and Protein Synthesis",
      "Golgi Apparatus and Protein Processing",
      "Cell Membrane: Structure and Function",
    ],
    classRelevance: [
      "CBSE Class 9: Fundamental Units of Life",
      "CBSE Class 11: Cell: The Unit of Life",
      "ICSE Class 9: Plant and Animal Cells",
    ],
    cbseClass: ["9", "11"],
    cbseTopic: "Cell Structure and Organization",
    relatedSimulations: ["dna", "photosynthesis", "species-generator"],
    teacherTip:
      "Use this simulation in class to show students that cells are three-dimensional structures. Have them observe how organelles are positioned relative to each other.",
    studentChallenge: "Can you identify all 15 organelles in both animal and plant cells? Which ones are unique to plant cells?",
    glossaryTerms: {
      nucleus: "The membrane-bound organelle containing genetic material (DNA)",
      mitochondria: "The organelle responsible for energy production (ATP synthesis)",
      chloroplast: "The organelle in plant cells that conducts photosynthesis",
      ribosome: "The site of protein synthesis in the cell",
      endoplasmicReticulum:
        "A network of membranes involved in protein and lipid synthesis and transport",
      golgiApparatus: "The organelle that processes and packages proteins for transport",
    },
    keywords: [
      "cell structure",
      "animal cell",
      "plant cell",
      "organelles",
      "3D cell model",
      "cell biology",
      "CBSE biology",
      "interactive cell simulation",
    ],
  },

  dna: {
    id: "dna",
    title: "DNA Double Helix: Structure & Genetics",
    shortDescription:
      "Interactive 3D visualization of DNA's double helix structure with base pair manipulation, genetic code exploration, and real-time molecular dynamics.",
    longDescription: `DNA—deoxyribonucleic acid—is the molecule of life. This advanced 3D simulator lets you explore the complete structure of DNA: the double helix, base pairs (adenine-thymine and guanine-cytosine), the sugar-phosphate backbone, and the intricate hydrogen bonding that holds the structure together.
    
    By rotating the helix, manipulating base pairs, and examining different structural models, you'll develop a deep understanding of why DNA is the perfect molecule for storing genetic information. See how changes in the sequence affect genetic expression.
    
    This simulation is essential for Class 11 and 12 students studying molecular biology and genetics, as well as anyone interested in understanding heredity and evolution.`,
    whatYouLearn: [
      "The structure of the DNA double helix",
      "Base pairing rules and complementary strands",
      "The sugar-phosphate backbone",
      "How genetic information is encoded in the sequence",
      "The relationship between DNA structure and replication",
      "Why DNA is the ideal molecule for information storage",
    ],
    howToUse: [
      "Rotate the helix to see it from all angles",
      "Click on base pairs to highlight their complementary relationships",
      "Use the visualization modes to see different structural aspects",
      "Examine hydrogen bonds between base pairs",
      "Read the annotations to understand the function of each component",
    ],
    keyConcepts: [
      "Watson-Crick Model of DNA",
      "Base Pairing Rules",
      "Complementary DNA Strands",
      "Sugar-Phosphate Backbone",
      "Hydrogen Bonding in DNA",
      "DNA Replication and Semiconservative Replication",
      "Central Dogma: DNA → RNA → Protein",
    ],
    classRelevance: [
      "CBSE Class 11: Molecular Basis of Inheritance",
      "CBSE Class 12: Molecular Basis of Inheritance (Advanced)",
      "ICSE Class 11: Genetics and Evolution",
    ],
    cbseClass: ["11", "12"],
    cbseTopic: "Molecular Basis of Inheritance",
    relatedSimulations: ["cell-structure", "species-generator"],
    teacherTip:
      "Show students how the base pairing rules ensure exact replication of genetic information. Discuss why this is critical for life.",
    studentChallenge: "If one strand of DNA has the sequence ATGCTA, can you write the sequence of the complementary strand?",
    glossaryTerms: {
      adenine: "A purine base that pairs with thymine",
      guanine: "A purine base that pairs with cytosine",
      thymine: "A pyrimidine base that pairs with adenine",
      cytosine: "A pyrimidine base that pairs with guanine",
      helix: "A three-dimensional spiral structure",
      replication: "The process by which DNA makes copies of itself",
    },
    keywords: [
      "DNA structure",
      "double helix",
      "genetics",
      "base pairing",
      "molecular biology",
      "3D DNA model",
      "CBSE genetics",
      "genetic code",
    ],
  },

  photosynthesis: {
    id: "photosynthesis",
    title: "Photosynthesis: From Sunlight to Energy",
    shortDescription:
      "Watch plants convert sunlight into chemical energy through an animated step-by-step visualization of the light-dependent and light-independent reactions.",
    longDescription: `Photosynthesis is the process that powers almost all life on Earth. This interactive simulator breaks down the complex biochemistry into two main stages: the light-dependent reactions in the thylakoids and the light-independent reactions (Calvin Cycle) in the stroma.
    
    By visualizing the movement of electrons, the splitting of water molecules, the generation of ATP and NADPH, and the fixation of carbon dioxide, you'll understand how plants literally turn sunlight into sugar—and why this is one of the most important chemical reactions on our planet.
    
    Perfect for Class 11 students studying plant physiology and energy conversion.`,
    whatYouLearn: [
      "The two stages of photosynthesis: light reactions and dark reactions",
      "The structure of the chloroplast and its role",
      "How light energy is captured by chlorophyll",
      "The electron transport chain and energy carriers",
      "The Calvin Cycle and carbon fixation",
      "The overall equation: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂",
    ],
    howToUse: [
      "Play the animation to see the entire process",
      "Pause at key steps to examine individual reactions",
      "Click on molecules to see their transformations",
      "Toggle between light reactions and dark reactions",
      "Observe the movement of electrons and energy carriers",
    ],
    keyConcepts: [
      "Light Reactions: Photolysis of Water",
      "Electron Transport Chain",
      "ATP and NADPH Synthesis",
      "The Calvin Cycle (Dark Reactions)",
      "Carbon Fixation by RuBisCO",
      "Factors Affecting Photosynthesis: Light, Temperature, CO₂",
      "C3 vs. C4 Plants",
    ],
    classRelevance: [
      "CBSE Class 11: Photosynthesis in Higher Plants",
      "CBSE Class 12: Advanced Photosynthesis",
      "ICSE Class 10: Life Processes",
    ],
    cbseClass: ["11", "12"],
    cbseTopic: "Photosynthesis in Higher Plants",
    relatedSimulations: ["cell-structure"],
    teacherTip:
      "Emphasize that photosynthesis is the basis of all food chains. Everything we eat, directly or indirectly, comes from photosynthesis.",
    studentChallenge:
      "Why do plants appear green if green light is not used in photosynthesis? (Hint: What colors of light are absorbed?)",
    glossaryTerms: {
      chlorophyll: "The green pigment that absorbs light energy",
      thylakoid: "The membranous structure in chloroplasts where light reactions occur",
      stroma: "The fluid matrix of the chloroplast where dark reactions occur",
      ATP: "Adenosine triphosphate, an energy carrier molecule",
      NADPH: "An electron carrier molecule",
      RuBisCO: "The enzyme that catalyzes carbon fixation",
    },
    keywords: [
      "photosynthesis",
      "light reactions",
      "dark reactions",
      "Calvin Cycle",
      "chloroplasts",
      "energy conversion",
      "plant biology",
      "CBSE Class 11",
    ],
  },

  "species-generator": {
    id: "species-generator",
    title: "Species Generator: Genetic Hybridization & Evolution",
    shortDescription:
      "Combine genetics from two species to predict if cross-breeding is biologically possible, analyze hybrid traits, and visualize the resulting offspring.",
    longDescription: `What would happen if you crossed a lion with a tiger? A horse with a donkey? A sheep with a goat? This advanced genetic simulator lets you explore the concept of reproductive barriers, genetic compatibility, and hybrid offspring.
    
    By combining the genetics of over 100 organisms, you'll discover that hybridization is actually quite rare in nature due to chromosomal incompatibilities. But when it does happen—producing ligers, mules, and wolfdogs—the results are fascinating. Learn how chromosome number, genetic distance, and reproductive isolation influence whether species can produce fertile offspring.
    
    This simulator is a powerful tool for understanding evolution, speciation, and the biological basis of life's diversity.`,
    whatYouLearn: [
      "What makes two organisms separate species",
      "Reproductive barriers and genetic isolation",
      "Chromosome compatibility and hybrid fertility",
      "Hybrid vigor (heterosis) and inbreeding depression",
      "How evolution leads to speciation",
      "Real-world examples: ligers, mules, zebrass",
    ],
    howToUse: [
      "Select two species from the database",
      "View their genetic profiles and chromosome numbers",
      "Click 'Generate Hybrid' to see if crossing is possible",
      "Review the feasibility score and explanation",
      "Examine predicted traits and advantages/disadvantages",
      "View the 3D visualization of the potential hybrid",
    ],
    keyConcepts: [
      "Reproductive Isolation",
      "Chromosome Number and Incompatibility",
      "Hybrid Vigor and Hybrid Breakdown",
      "Meiosis and Gamete Formation",
      "Polyploidy and Speciation",
      "Prezygotic vs. Postzygotic Barriers",
      "Evolutionary Distance and Genetic Compatibility",
    ],
    classRelevance: [
      "CBSE Class 12: Evolution and Speciation",
      "CBSE Class 12: Reproductive Biology",
      "ICSE Class 11: Inheritance and Variation",
    ],
    cbseClass: ["12"],
    cbseTopic: "Evolution and Reproductive Biology",
    relatedSimulations: ["dna", "cell-structure"],
    teacherTip:
      "Use real examples like ligers and mules to show students that species are not absolute categories but exist on a spectrum of reproductive compatibility.",
    studentChallenge:
      "Research the genetic makeup of a liger and explain why they're typically sterile despite being able to reproduce.",
    glossaryTerms: {
      speciation: "The evolutionary process by which new species arise",
      hybridization: "The breeding of two different species",
      polyploidy: "The condition of having more than two sets of chromosomes",
      homologous: "Chromosomes that are similar in structure and genetic content",
      fertility: "The ability to produce viable, healthy offspring",
    },
    keywords: [
      "species generator",
      "genetics",
      "hybridization",
      "evolution",
      "speciation",
      "reproductive barriers",
      "hybrid organisms",
      "genetic compatibility",
    ],
  },

  // PHYSICS SIMULATIONS
  "ohms-law": {
    id: "ohms-law",
    title: "Ohm's Law Circuit: Voltage, Current & Resistance",
    shortDescription:
      "Interactive circuit with adjustable voltage, current, and resistance showing real-time calculations and effects on 4 light bulbs.",
    longDescription: `Ohm's Law (V = IR) is one of the most fundamental principles in electrical engineering. This interactive circuit simulator lets you adjust voltage, current, and resistance in real time, and immediately see the effects on the brightness of light bulbs.
    
    By exploring how voltage and resistance affect current, you'll develop an intuitive understanding of electricity that goes beyond memorizing an equation. See how increased resistance dims the lights (reduced current), how higher voltage brightens them, and how power consumption varies.
    
    Essential for Class 10 physics students learning about electrical circuits and power.`,
    whatYouLearn: [
      "Ohm's Law: V = IR",
      "The relationship between voltage, current, and resistance",
      "How resistance affects the flow of electric current",
      "Power calculation: P = VI",
      "Series vs. parallel circuits",
      "Why resistance produces heat (Joule heating)",
    ],
    howToUse: [
      "Adjust the voltage slider and observe the effect on the bulbs",
      "Increase resistance and see the current decrease",
      "Note the power consumption displayed in real time",
      "Compare the brightness of bulbs in series vs. parallel configurations",
      "Use the data table to verify Ohm's Law calculations",
    ],
    keyConcepts: [
      "Electric Potential (Voltage)",
      "Electric Current (Amperes)",
      "Electrical Resistance (Ohms)",
      "Ohm's Law",
      "Power and Energy in Circuits",
      "Joule Heating",
      "Series and Parallel Circuits",
    ],
    classRelevance: [
      "CBSE Class 10: Electricity and Circuits",
      "CBSE Class 12: Electrostatics and Current Electricity",
      "ICSE Class 10: Electricity",
    ],
    cbseClass: ["10", "12"],
    cbseTopic: "Electricity and Circuits",
    relatedSimulations: ["electromagnetic-induction"],
    teacherTip:
      "Ask students: 'Why do lights dim when you turn on a heater in the same room?' This relates to how total resistance increases with parallel appliances.",
    studentChallenge: "If you have a 12V battery and want a current of 0.5A, what resistance do you need? (V = IR)",
    glossaryTerms: {
      voltage: "The potential difference that drives electric current",
      current: "The flow of electric charge",
      resistance: "Opposition to the flow of electric current",
      ohm: "The unit of electrical resistance",
      ampere: "The unit of electric current",
      watt: "The unit of electrical power",
    },
    keywords: [
      "Ohm's Law",
      "electric circuit",
      "voltage current resistance",
      "electricity simulation",
      "circuit analysis",
      "power consumption",
      "CBSE physics",
    ],
  },

  "projectile-motion": {
    id: "projectile-motion",
    title: "Projectile Motion: Angles, Velocity & Trajectories",
    shortDescription:
      "Launch projectiles and explore how initial velocity, launch angle, and gravity affect the trajectory and range of motion.",
    longDescription: `From throwing a ball to launching a rocket, projectile motion governs movement under gravity. This simulator lets you adjust the launch angle, initial velocity, and gravitational field to see how each factor affects the trajectory.
    
    By experimenting with different conditions, you'll discover why 45° is the optimal launch angle for maximum range, why air resistance matters, and how projectile motion is two independent motions combined: constant velocity horizontally and uniformly accelerated motion vertically.
    
    Perfect for Class 11 students studying kinematics and motion under forces.`,
    whatYouLearn: [
      "Components of projectile motion: horizontal and vertical",
      "How launch angle affects range and height",
      "The optimal angle (45°) for maximum range",
      "The role of initial velocity in determining trajectory",
      "How air resistance affects real-world projectiles",
      "Applications: sports, military ballistics, space missions",
    ],
    howToUse: [
      "Adjust the launch angle using the slider",
      "Set the initial velocity magnitude",
      "Toggle air resistance on/off to see the difference",
      "Launch the projectile and observe its path",
      "Note the range, maximum height, and time of flight",
      "Experiment with different gravitational fields (Earth, Moon, Jupiter)",
    ],
    keyConcepts: [
      "Vector Resolution and Components",
      "Horizontal Motion (Constant Velocity)",
      "Vertical Motion (Uniformly Accelerated)",
      "Trajectory Equation",
      "Range Formula: R = (v₀² × sin(2θ)) / g",
      "Maximum Height and Time of Flight",
      "Air Resistance and Drag",
    ],
    classRelevance: [
      "CBSE Class 11: Kinematics and Motion",
      "CBSE Class 11: Laws of Motion",
      "ICSE Class 11: Motion in Two Dimensions",
    ],
    cbseClass: ["11"],
    cbseTopic: "Kinematics and Motion",
    relatedSimulations: ["electromagnetic-induction"],
    teacherTip:
      "Have students calculate the range for specific angles before running the simulation, then compare their predictions with the results.",
    studentChallenge:
      "At what two launch angles will a projectile have the same range? (Hint: Think about complementary angles)",
    glossaryTerms: {
      trajectory: "The path followed by a projectile",
      range: "The horizontal distance traveled by a projectile",
      apogee: "The highest point reached by a projectile",
      angle: "The angle of launch relative to the horizontal",
      velocity: "The speed and direction of an object's motion",
    },
    keywords: [
      "projectile motion",
      "kinematics",
      "trajectory",
      "launch angle",
      "velocity",
      "physics simulation",
      "motion under gravity",
      "CBSE Class 11",
    ],
  },

  "electromagnetic-induction": {
    id: "electromagnetic-induction",
    title: "Electromagnetic Induction: Faraday's Law & EMF",
    shortDescription:
      "Explore Faraday's Law with interactive 3D visualization showing how changing magnetic flux generates electrical current.",
    longDescription: `Electromagnetic induction—the generation of electrical current by changing magnetic fields—is the principle behind electric generators, transformers, and wireless charging. This advanced 3D simulator lets you manipulate a magnet, control a coil, and observe the induced EMF in real time.
    
    By varying the speed of the magnet, the number of coil turns, and the strength of the magnetic field, you'll see Faraday's Law in action: EMF = −dΦ/dt. Understand why power plants use generators, why transformers work, and how electricity is transmitted over long distances.
    
    Ideal for Class 12 students studying electromagnetic induction and applications in AC circuits.`,
    whatYouLearn: [
      "Faraday's Law of Electromagnetic Induction",
      "Magnetic Flux and Flux Change",
      "Induced EMF (Electromotive Force)",
      "Lenz's Law and the direction of induced current",
      "How electric generators work",
      "Transformers and power transmission",
    ],
    howToUse: [
      "Move the magnet towards and away from the coil",
      "Observe the induced EMF on the meter",
      "Increase the coil turns and see the effect",
      "Rotate the magnet faster and observe greater EMF",
      "Toggle between different magnetic field strengths",
      "See the direction of induced current using Lenz's Law",
    ],
    keyConcepts: [
      "Magnetic Field and Magnetic Flux",
      "Faraday's Law of Induction",
      "Lenz's Law",
      "Induced EMF and Current",
      "Self-Inductance",
      "Mutual Inductance",
      "AC Generators and Motors",
    ],
    classRelevance: [
      "CBSE Class 12: Electromagnetic Induction",
      "CBSE Class 12: Alternating Current",
      "ICSE Class 12: Electromagnetic Induction",
    ],
    cbseClass: ["12"],
    cbseTopic: "Electromagnetic Induction",
    relatedSimulations: ["ohms-law"],
    teacherTip:
      "Connect this to real-world applications: generators in power plants, transformers in your home, wireless chargers in phones.",
    studentChallenge:
      "Why does the induced EMF increase when you move the magnet faster? What does Faraday's Law tell us?",
    glossaryTerms: {
      magneticFlux: "The total magnetic field passing through a surface",
      induction: "The process of generating electrical current by changing magnetic fields",
      EMF: "Electromotive force, the voltage generated by a source",
      coil: "A series of loops of wire",
      generator: "A device that converts mechanical energy into electrical energy",
    },
    keywords: [
      "electromagnetic induction",
      "Faraday's Law",
      "magnetic field",
      "EMF",
      "generators",
      "transformers",
      "AC circuits",
      "CBSE Class 12",
    ],
  },

  // CHEMISTRY SIMULATIONS
  "periodic-table": {
    id: "periodic-table",
    title: "Interactive Periodic Table: Elements & Atomic Structure",
    shortDescription:
      "Explore all 118 elements with 3D atomic structure visualization, electron shells, and detailed chemical properties.",
    longDescription: `The periodic table is one of the most important tools in chemistry, organizing all known elements by atomic number and chemical properties. This interactive periodic table lets you click on any element and see its 3D electron shell configuration, orbital structure, and comprehensive chemical data.
    
    Discover patterns in the periodic table: how reactive alkali metals are, why noble gases are inert, how atomic radius changes across a period, and how elements in the same group share chemical properties. Understand why the periodic table is organized the way it is, and how electron configuration explains chemical behavior.
    
    Perfect for Class 10 and 11 chemistry students studying the periodic table and atomic structure.`,
    whatYouLearn: [
      "The organization of the periodic table",
      "Atomic number and atomic mass",
      "Electron configurations and orbital models",
      "Periodic trends: atomic radius, ionization energy, electronegativity",
      "Chemical reactivity and group behavior",
      "Why certain elements form specific compounds",
    ],
    howToUse: [
      "Click on any element to view its details",
      "Rotate the 3D electron shell model",
      "View the electron configuration",
      "Compare elements in the same group or period",
      "Use the filters to highlight elements by category (metals, nonmetals, etc.)",
      "See element uses and real-world applications",
    ],
    keyConcepts: [
      "Atomic Structure: Protons, Neutrons, Electrons",
      "Electron Configuration",
      "Quantum Numbers and Orbitals",
      "Periodic Trends",
      "Valence Electrons and Chemical Bonding",
      "Groups and Periods",
      "s, p, d, f Blocks",
    ],
    classRelevance: [
      "CBSE Class 10: Periodic Classification of Elements",
      "CBSE Class 11: Classification of Elements and Periodicity",
      "ICSE Class 10: The Periodic Table",
    ],
    cbseClass: ["10", "11"],
    cbseTopic: "Periodic Table and Atomic Structure",
    relatedSimulations: ["molecular-viewer", "ph-simulator"],
    teacherTip:
      "Have students predict the properties of elements based on their position in the periodic table, then verify with the simulator.",
    studentChallenge:
      "Why does fluorine have a higher electronegativity than chlorine, even though they're in the same group?",
    glossaryTerms: {
      electron: "Negatively charged subatomic particle",
      proton: "Positively charged subatomic particle",
      neutron: "Neutral subatomic particle",
      orbital: "A region in space where an electron is likely to be found",
      electronegativity: "The tendency of an atom to attract electrons",
    },
    keywords: [
      "periodic table",
      "elements",
      "atomic structure",
      "electron configuration",
      "chemical properties",
      "atomic radius",
      "ionization energy",
      "CBSE chemistry",
    ],
  },

  "molecular-viewer": {
    id: "molecular-viewer",
    title: "3D Molecular Viewer: Molecules & Atomic Bonds",
    shortDescription:
      "Ultra-realistic 3D visualization of 100+ molecules with multiple view modes, bond angles, and interactive exploration.",
    longDescription: `Understanding molecular structure is crucial for understanding chemistry. This advanced 3D molecular viewer lets you explore over 100 molecules—from simple water (H₂O) to complex organic molecules like glucose and proteins.
    
    Rotate molecules in 3D, view them in multiple representations (ball-and-stick, space-filling, wireframe), examine bond angles, and understand how the three-dimensional structure of a molecule determines its chemical properties and biological function.
    
    Whether you're studying simple covalent molecules in Class 10 or complex biomolecules in Class 12, this simulator brings molecular structure to life.`,
    whatYouLearn: [
      "Molecular structure and 3D geometry",
      "Covalent bonding and bond types",
      "VSEPR theory and bond angles",
      "Molecular polarity and electronegativity",
      "How structure determines chemical properties",
      "Introduction to organic and biochemistry",
    ],
    howToUse: [
      "Select a molecule from the database",
      "Rotate and zoom to examine the structure",
      "Toggle between different visualization modes",
      "Highlight specific atoms or bonds",
      "View molecular properties (mass, polarity, etc.)",
      "Compare similar molecules to see structural differences",
    ],
    keyConcepts: [
      "Covalent Bonds: Single, Double, Triple",
      "VSEPR Theory (Valence Shell Electron Pair Repulsion)",
      "Molecular Geometry",
      "Polarity and Dipole Moments",
      "Hybridization",
      "Resonance Structures",
      "Intermolecular Forces",
    ],
    classRelevance: [
      "CBSE Class 10: Chemical Bonding",
      "CBSE Class 11: Chemical Bonding and Molecular Geometry",
      "CBSE Class 12: Organic Chemistry Structures",
    ],
    cbseClass: ["10", "11", "12"],
    cbseTopic: "Molecular Structure and Bonding",
    relatedSimulations: ["periodic-table", "chemical-reactions"],
    teacherTip:
      "Show students how the 3D structure of a molecule determines its function. For example, the bent shape of water molecules explains why water has such unique properties.",
    studentChallenge:
      "Why is CO₂ nonpolar even though it has polar C=O bonds? (Hint: Think about geometry)",
    glossaryTerms: {
      covalent: "A type of bond formed by sharing electrons",
      polar: "A molecule with an uneven distribution of charge",
      dipole: "A pair of opposite electric charges separated in space",
      hybridization: "The mixing of atomic orbitals to form new orbitals",
      resonance: "Multiple representations of the same structure",
    },
    keywords: [
      "molecular structure",
      "molecules",
      "chemical bonding",
      "3D visualization",
      "VSEPR theory",
      "molecular geometry",
      "organic molecules",
      "chemistry simulation",
    ],
  },

  "ph-simulator": {
    id: "ph-simulator",
    title: "pH Scale Simulator: Acids, Bases & Ion Concentration",
    shortDescription:
      "Interactive pH simulator with realistic beaker, adjustable acid/base strength, and real-time ion concentration calculations.",
    longDescription: `The pH scale measures how acidic or basic a solution is, from 0 (extremely acidic) to 14 (extremely basic), with 7 being neutral. This interactive simulator lets you mix acids and bases, adjust concentrations, and see in real time how pH changes and how ions form in solution.
    
    By experimenting with strong acids, weak acids, strong bases, and weak bases, you'll develop an intuitive understanding of acid-base chemistry that goes beyond memorizing pH values. See why pH is logarithmic, understand the concept of ionic equilibrium, and explore the practical applications of pH in everyday life.
    
    Essential for Class 11 and 12 chemistry students studying acid-base equilibrium and analytical chemistry.`,
    whatYouLearn: [
      "pH scale: 0-14",
      "Acids and bases: properties and definitions",
      "Strong vs. weak acids and bases",
      "Ion concentration and H+ / OH- ions",
      "pH calculation: pH = -log[H+]",
      "Indicators and pH measurement",
      "Buffer solutions",
    ],
    howToUse: [
      "Drag acids or bases into the beaker",
      "Adjust the concentration of each substance",
      "Watch the pH meter in real time",
      "See the color change of universal indicator",
      "View the ion concentrations in the solution",
      "Experiment with mixing different acids and bases",
    ],
    keyConcepts: [
      "Arrhenius Theory of Acids and Bases",
      "Brønsted-Lowry Theory",
      "pH and pOH",
      "Ionic Product of Water: Kw = [H+][OH-] = 10^-14",
      "Strong Electrolytes vs. Weak Electrolytes",
      "Acid-Base Indicators",
      "Titration and Neutralization",
    ],
    classRelevance: [
      "CBSE Class 10: Acids, Bases & Salts",
      "CBSE Class 11: Equilibrium and Acid-Base Chemistry",
      "CBSE Class 12: Advanced Acid-Base Chemistry",
    ],
    cbseClass: ["10", "11", "12"],
    cbseTopic: "Acids, Bases & pH",
    relatedSimulations: ["periodic-table", "chemical-reactions"],
    teacherTip:
      "Connect pH to everyday examples: lemon juice (pH ~2), pure water (pH 7), baking soda solution (pH ~8.3), drain cleaner (pH ~13).",
    studentChallenge:
      "If the [H+] concentration of a solution is 10^-3 M, what is its pH? Is it acidic or basic?",
    glossaryTerms: {
      pH: "A measure of hydrogen ion concentration; -log[H+]",
      acidic: "A solution with pH < 7",
      basic: "A solution with pH > 7",
      neutral: "A solution with pH = 7",
      buffer: "A solution that resists changes in pH when acid or base is added",
    },
    keywords: [
      "pH scale",
      "acids and bases",
      "pH simulator",
      "ion concentration",
      "acid-base equilibrium",
      "chemistry simulation",
      "CBSE chemistry",
      "indicator color change",
    ],
  },

  "chemical-reactions": {
    id: "chemical-reactions",
    title: "Chemical Reactions Lab: Safe Experimental Chemistry",
    shortDescription:
      "Mix dangerous chemicals in a virtual 3D lab and observe explosive reactions, color changes, and real-time chemistry with safety notes.",
    longDescription: `Some of the most interesting chemical reactions are also the most dangerous: sodium metal explosively reacting with water, concentrated sulfuric acid boiling and smoking, potassium permanganate creating beautiful color changes. This virtual chemistry lab lets you perform these dangerous experiments safely, observing the reactions in stunning cinematic detail.
    
    Learn about exothermic and endothermic reactions, oxidation-reduction chemistry, chemical equations, and the principles that make chemistry one of the most dynamic sciences. Each reaction includes safety information explaining why these reactions are dangerous and why certain precautions must be taken.
    
    Ideal for Class 10, 11, and 12 chemistry students who want to see real reactions in action.`,
    whatYouLearn: [
      "Types of chemical reactions: combination, decomposition, displacement, redox",
      "Exothermic and endothermic reactions",
      "Reaction rates and catalysts",
      "Chemical equations and balancing",
      "Oxidation-reduction chemistry",
      "Safety in chemical labs",
    ],
    howToUse: [
      "Select two chemicals from the available options",
      "Adjust quantities if applicable",
      "Click 'Mix' to observe the reaction",
      "Watch the 3D visualization and particle effects",
      "Read the reaction equation and information",
      "Review the safety hazards and why the reaction is dangerous",
    ],
    keyConcepts: [
      "Chemical Reactions and Chemical Equations",
      "Types of Reactions",
      "Exothermic and Endothermic Processes",
      "Combustion Reactions",
      "Redox Reactions",
      "Reaction Rates",
      "Catalysts and Inhibitors",
    ],
    classRelevance: [
      "CBSE Class 10: Chemical Reactions and Equations",
      "CBSE Class 11: Redox Reactions and Electrochemistry",
      "CBSE Class 12: Advanced Chemical Reactions",
    ],
    cbseClass: ["10", "11", "12"],
    cbseTopic: "Chemical Reactions and Safety",
    relatedSimulations: ["periodic-table", "ph-simulator", "molecular-viewer"],
    teacherTip:
      "Use this simulator to spark interest in chemistry by showing dramatic reactions that would be too dangerous in a school lab.",
    studentChallenge:
      "Can you balance the equation for combustion of methane? CH₄ + O₂ → CO₂ + H₂O",
    glossaryTerms: {
      exothermic: "A reaction that releases energy as heat",
      endothermic: "A reaction that absorbs energy as heat",
      oxidation: "The loss of electrons by an atom",
      reduction: "The gain of electrons by an atom",
      catalyst: "A substance that speeds up a reaction without being consumed",
    },
    keywords: [
      "chemical reactions",
      "chemistry lab",
      "reactions simulation",
      "redox chemistry",
      "chemical equations",
      "dangerous reactions",
      "safe chemistry",
      "CBSE chemistry",
    ],
  },

  // MATH SIMULATIONS
  "unit-circle": {
    id: "unit-circle",
    title: "Unit Circle & Trigonometry: Sin, Cos, Tan",
    shortDescription:
      "Interactive unit circle with all trigonometric functions, visual right triangles, and real-time graph plotting.",
    longDescription: `The unit circle is the foundation of trigonometry. This interactive simulator shows the unit circle (a circle with radius 1 centered at the origin) and lets you explore how sines, cosines, tangents, and other trigonometric functions emerge from it.
    
    By rotating a point around the circle, you'll see in real time how the x-coordinate corresponds to cosine, the y-coordinate to sine, and their ratio to tangent. You'll also see graphs of these functions being drawn simultaneously, helping you understand the deep connection between the circle and the periodic functions.
    
    Perfect for Class 11 and 12 students studying trigonometry and precalculus.`,
    whatYouLearn: [
      "The unit circle definition of sine, cosine, and tangent",
      "Radian and degree measure",
      "Trigonometric ratios in all four quadrants",
      "The periodic nature of trigonometric functions",
      "Relationships between trigonometric functions",
      "The connection between the circle and sinusoidal graphs",
    ],
    howToUse: [
      "Drag the point around the unit circle",
      "Observe the values of sin, cos, and tan change in real time",
      "Watch the graphs of the functions being drawn",
      "Click on special angles (0°, 30°, 45°, 60°, 90°, etc.)",
      "View the exact trigonometric values for each angle",
      "Explore the symmetries and patterns in the functions",
    ],
    keyConcepts: [
      "Unit Circle",
      "Radian Measure",
      "Sine, Cosine, Tangent Definitions",
      "Trigonometric Functions in All Quadrants",
      "Periodic Functions",
      "Amplitude, Period, Phase Shift",
      "Inverse Trigonometric Functions",
    ],
    classRelevance: [
      "CBSE Class 11: Trigonometric Functions",
      "CBSE Class 12: Inverse Trigonometric Functions",
      "ICSE Class 11: Trigonometry",
    ],
    cbseClass: ["11", "12"],
    cbseTopic: "Trigonometric Functions",
    relatedSimulations: ["pythagoras"],
    teacherTip:
      "Show students that sine and cosine are NOT just ratios in right triangles—they're functions that describe circular motion and waves.",
    studentChallenge:
      "What is sin(π/6)? cos(π/3)? Why do sin(θ) and cos(π/2 - θ) have the same value?",
    glossaryTerms: {
      radian: "A unit of angle measure where 2π radians = 360°",
      sine: "The y-coordinate of a point on the unit circle",
      cosine: "The x-coordinate of a point on the unit circle",
      tangent: "The ratio of sine to cosine",
      periodic: "Repeating at regular intervals",
    },
    keywords: [
      "unit circle",
      "trigonometry",
      "sine cosine tangent",
      "trigonometric functions",
      "radian measure",
      "trig graphs",
      "CBSE Class 11",
      "mathematics simulation",
    ],
  },

  pythagoras: {
    id: "pythagoras",
    title: "Pythagoras Theorem: Visual Proofs & Right Triangles",
    shortDescription:
      "Interactive visual proofs of a² + b² = c² with multiple proof methods including animated 3D demonstrations.",
    longDescription: `The Pythagorean theorem (a² + b² = c²) is one of the most important theorems in mathematics, yet many students memorize it without truly understanding why it's true. This simulator shows multiple visual proofs of the theorem, helping you understand the deep mathematical truth behind this ancient formula.
    
    By dragging the sides of a right triangle, you'll see the squares on each side grow and shrink in real time. Explore geometric proofs (like dissection proofs), algebraic proofs, and even 3D visualizations. You'll develop an intuitive understanding of why the theorem works and gain insight into geometric reasoning.
    
    Excellent for Class 9 and 10 students learning geometry and algebraic thinking.`,
    whatYouLearn: [
      "The Pythagorean theorem: a² + b² = c²",
      "Pythagorean triples (3-4-5, 5-12-13, etc.)",
      "Multiple proofs of the theorem",
      "Right triangle properties",
      "Distance formula derivation",
      "Applications in geometry and physics",
    ],
    howToUse: [
      "Drag the vertices of the right triangle to change its shape",
      "Observe how the areas of the squares update in real time",
      "View the algebraic verification of a² + b² = c²",
      "Explore different proof methods",
      "View the 3D visualization of the theorem",
      "Test different Pythagorean triples",
    ],
    keyConcepts: [
      "Right Triangles and the Pythagorean Theorem",
      "Pythagorean Triples",
      "Proof Methods: Geometric, Algebraic, 3D",
      "The Distance Formula",
      "Converse of the Pythagorean Theorem",
      "Applications in Trigonometry",
      "Generalizations of the Theorem",
    ],
    classRelevance: [
      "CBSE Class 9: Triangles and Geometry",
      "CBSE Class 10: Introduction to Trigonometry",
      "ICSE Class 9: Pythagoras Theorem",
    ],
    cbseClass: ["9", "10"],
    cbseTopic: "Pythagoras Theorem and Triangles",
    relatedSimulations: ["unit-circle"],
    teacherTip:
      "Show students that the Pythagorean theorem is not just a formula to plug numbers into—it's a fundamental geometric truth with beautiful visual and algebraic proofs.",
    studentChallenge:
      "If a = 3 and b = 4, what is c? Can you find other triangles with integer sides?",
    glossaryTerms: {
      hypotenuse: "The longest side of a right triangle, opposite the right angle",
      leg: "One of the two shorter sides of a right triangle",
      rightAngle: "An angle that measures 90 degrees",
      triples: "Sets of three integers that satisfy the Pythagorean theorem",
    },
    keywords: [
      "Pythagoras theorem",
      "right triangle",
      "geometric proofs",
      "a² + b² = c²",
      "Pythagorean triples",
      "mathematics simulation",
      "geometry learning",
      "CBSE Class 9",
    ],
  },

  // AGRICULTURE SIMULATIONS
  "crop-farming": {
    id: "crop-farming",
    title: "3D Crop Farming Simulator: Fertilizers, Nutrients & Diseases",
    shortDescription:
      "Manage a virtual 3D farm: plant crops, apply fertilizers, control nutrients, and observe seasonal diseases and pest effects.",
    longDescription: `Agriculture is the foundation of human civilization, yet many students have never understood how crops are grown, why fertilizers are essential, or how seasonal changes affect farming. This advanced 3D farm simulator lets you plant crops, manage soil nutrients (NPK—nitrogen, phosphorus, potassium), apply fertilizers, and see in real time how these inputs affect crop health and yield.
    
    Discover what happens when crops lack nutrients, how diseases appear under specific conditions, why certain seasons are best for certain crops, and the complex decisions farmers make daily. Understand the chemistry of soil, the biology of plant diseases, and the agricultural science behind feeding the world.
    
    Perfect for students learning agriculture, environmental science, and sustainable food production.`,
    whatYouLearn: [
      "Crop growth and development stages",
      "Soil nutrients: Nitrogen (N), Phosphorus (P), Potassium (K)",
      "Effects of nutrient deficiencies and excess",
      "Fertilizer types and applications",
      "Seasonal effects on crop growth",
      "Plant diseases and pest management",
      "Sustainable farming practices",
    ],
    howToUse: [
      "Select a crop to plant",
      "Adjust initial soil nutrient levels",
      "Apply different fertilizers during the growing season",
      "Monitor nutrient levels and crop health",
      "Select a season and observe effects",
      "Watch for diseases and pests that appear under certain conditions",
    ],
    keyConcepts: [
      "Plant Nutrition and Essential Nutrients",
      "Nitrogen Cycle in Agriculture",
      "Soil Composition and Soil Health",
      "Fertilizer Types: Organic, Synthetic, Slow-Release",
      "Nutrient Deficiency Symptoms",
      "Crop Diseases and Pest Management",
      "Sustainable and Organic Farming",
    ],
    classRelevance: [
      "CBSE Class 10: Agriculture and Food Production",
      "CBSE Class 11/12: Agriculture and Environmental Science",
      "Project Work: Agricultural Studies",
    ],
    cbseClass: ["10", "11", "12"],
    cbseTopic: "Agriculture, Crops & Nutrition",
    relatedSimulations: ["photosynthesis", "cell-structure"],
    teacherTip:
      "Connect this simulation to real-world farming challenges. Discuss how global population growth requires more food, and how farmers use science to increase yields sustainably.",
    studentChallenge:
      "A crop shows yellowing leaves (nitrogen deficiency) but normal growth otherwise. What fertilizer would you apply, and when?",
    glossaryTerms: {
      nitrogen: "Essential for leaf and stem growth",
      phosphorus: "Essential for root development and flowering",
      potassium: "Essential for overall plant health and disease resistance",
      fertilizer: "A substance added to soil to increase nutrient content",
      deficiency: "Lack of an essential nutrient",
    },
    keywords: [
      "crop farming",
      "agriculture simulation",
      "fertilizers",
      "NPK nutrients",
      "plant diseases",
      "seasonal farming",
      "sustainable agriculture",
      "agricultural science",
    ],
  },
}

export function getSimulationContent(simulationId: string): SimulationContent | undefined {
  return simulationContent[simulationId]
}

export function getRelatedSimulations(simulationId: string, allSimulations: any[]): any[] {
  const content = simulationContent[simulationId]
  if (!content || !content.relatedSimulations) return []
  return allSimulations.filter((sim) => content.relatedSimulations.includes(sim.id))
}
