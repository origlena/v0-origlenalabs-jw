"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Search } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const SPECIES_DATABASE = [
  // Felidae (Big Cats)
  {
    id: "lion",
    name: "Lion",
    scientific: "Panthera leo",
    chromosomes: 38,
    family: "Felidae",
    type: "animal",
    image: "🦁",
  },
  {
    id: "tiger",
    name: "Tiger",
    scientific: "Panthera tigris",
    chromosomes: 38,
    family: "Felidae",
    type: "animal",
    image: "🐯",
  },
  {
    id: "leopard",
    name: "Leopard",
    scientific: "Panthera pardus",
    chromosomes: 38,
    family: "Felidae",
    type: "animal",
    image: "🐆",
  },
  {
    id: "jaguar",
    name: "Jaguar",
    scientific: "Panthera onca",
    chromosomes: 38,
    family: "Felidae",
    type: "animal",
    image: "🐆",
  },
  {
    id: "cat",
    name: "Domestic Cat",
    scientific: "Felis catus",
    chromosomes: 38,
    family: "Felidae",
    type: "animal",
    image: "🐱",
  },
  {
    id: "cheetah",
    name: "Cheetah",
    scientific: "Acinonyx jubatus",
    chromosomes: 38,
    family: "Felidae",
    type: "animal",
    image: "🐆",
  },
  {
    id: "lynx",
    name: "Lynx",
    scientific: "Lynx lynx",
    chromosomes: 38,
    family: "Felidae",
    type: "animal",
    image: "🐈",
  },

  // Canidae (Dogs & Wolves)
  {
    id: "dog",
    name: "Domestic Dog",
    scientific: "Canis familiaris",
    chromosomes: 78,
    family: "Canidae",
    type: "animal",
    image: "🐕",
  },
  {
    id: "wolf",
    name: "Gray Wolf",
    scientific: "Canis lupus",
    chromosomes: 78,
    family: "Canidae",
    type: "animal",
    image: "🐺",
  },
  {
    id: "fox",
    name: "Red Fox",
    scientific: "Vulpes vulpes",
    chromosomes: 34,
    family: "Canidae",
    type: "animal",
    image: "🦊",
  },
  {
    id: "coyote",
    name: "Coyote",
    scientific: "Canis latrans",
    chromosomes: 78,
    family: "Canidae",
    type: "animal",
    image: "🐺",
  },
  {
    id: "jackal",
    name: "Golden Jackal",
    scientific: "Canis aureus",
    chromosomes: 78,
    family: "Canidae",
    type: "animal",
    image: "🦊",
  },

  // Equidae (Horses)
  {
    id: "horse",
    name: "Horse",
    scientific: "Equus caballus",
    chromosomes: 64,
    family: "Equidae",
    type: "animal",
    image: "🐴",
  },
  {
    id: "donkey",
    name: "Donkey",
    scientific: "Equus asinus",
    chromosomes: 62,
    family: "Equidae",
    type: "animal",
    image: "🫏",
  },
  {
    id: "zebra",
    name: "Plains Zebra",
    scientific: "Equus quagga",
    chromosomes: 44,
    family: "Equidae",
    type: "animal",
    image: "🦓",
  },
  {
    id: "mzebra",
    name: "Mountain Zebra",
    scientific: "Equus zebra",
    chromosomes: 32,
    family: "Equidae",
    type: "animal",
    image: "🦓",
  },

  // Bovidae (Cattle, Goats, Sheep)
  {
    id: "cow",
    name: "Cattle",
    scientific: "Bos taurus",
    chromosomes: 60,
    family: "Bovidae",
    type: "animal",
    image: "🐄",
  },
  {
    id: "buffalo",
    name: "Water Buffalo",
    scientific: "Bubalus bubalis",
    chromosomes: 48,
    family: "Bovidae",
    type: "animal",
    image: "🐃",
  },
  {
    id: "bison",
    name: "American Bison",
    scientific: "Bison bison",
    chromosomes: 60,
    family: "Bovidae",
    type: "animal",
    image: "🦬",
  },
  {
    id: "yak",
    name: "Yak",
    scientific: "Bos grunniens",
    chromosomes: 60,
    family: "Bovidae",
    type: "animal",
    image: "🐂",
  },
  {
    id: "goat",
    name: "Goat",
    scientific: "Capra hircus",
    chromosomes: 60,
    family: "Bovidae",
    type: "animal",
    image: "🐐",
  },
  {
    id: "sheep",
    name: "Sheep",
    scientific: "Ovis aries",
    chromosomes: 54,
    family: "Bovidae",
    type: "animal",
    image: "🐑",
  },
  {
    id: "antelope",
    name: "Antelope",
    scientific: "Antilocapra americana",
    chromosomes: 58,
    family: "Bovidae",
    type: "animal",
    image: "🦌",
  },

  // Ursidae (Bears)
  {
    id: "polarbear",
    name: "Polar Bear",
    scientific: "Ursus maritimus",
    chromosomes: 74,
    family: "Ursidae",
    type: "animal",
    image: "🐻‍❄️",
  },
  {
    id: "grizzly",
    name: "Grizzly Bear",
    scientific: "Ursus arctos",
    chromosomes: 74,
    family: "Ursidae",
    type: "animal",
    image: "🐻",
  },
  {
    id: "blackbear",
    name: "Black Bear",
    scientific: "Ursus americanus",
    chromosomes: 74,
    family: "Ursidae",
    type: "animal",
    image: "🐻",
  },
  {
    id: "panda",
    name: "Giant Panda",
    scientific: "Ailuropoda melanoleuca",
    chromosomes: 42,
    family: "Ursidae",
    type: "animal",
    image: "🐼",
  },

  // Primates
  {
    id: "human",
    name: "Human",
    scientific: "Homo sapiens",
    chromosomes: 46,
    family: "Hominidae",
    type: "animal",
    image: "👤",
  },
  {
    id: "chimp",
    name: "Chimpanzee",
    scientific: "Pan troglodytes",
    chromosomes: 48,
    family: "Hominidae",
    type: "animal",
    image: "🐵",
  },
  {
    id: "gorilla",
    name: "Gorilla",
    scientific: "Gorilla gorilla",
    chromosomes: 48,
    family: "Hominidae",
    type: "animal",
    image: "🦍",
  },
  {
    id: "orangutan",
    name: "Orangutan",
    scientific: "Pongo pygmaeus",
    chromosomes: 48,
    family: "Hominidae",
    type: "animal",
    image: "🦧",
  },
  {
    id: "monkey",
    name: "Rhesus Macaque",
    scientific: "Macaca mulatta",
    chromosomes: 42,
    family: "Cercopithecidae",
    type: "animal",
    image: "🐒",
  },

  // Birds
  {
    id: "chicken",
    name: "Chicken",
    scientific: "Gallus gallus",
    chromosomes: 78,
    family: "Phasianidae",
    type: "animal",
    image: "🐔",
  },
  {
    id: "duck",
    name: "Mallard Duck",
    scientific: "Anas platyrhynchos",
    chromosomes: 80,
    family: "Anatidae",
    type: "animal",
    image: "🦆",
  },
  {
    id: "goose",
    name: "Canada Goose",
    scientific: "Branta canadensis",
    chromosomes: 82,
    family: "Anatidae",
    type: "animal",
    image: "🦢",
  },
  {
    id: "turkey",
    name: "Turkey",
    scientific: "Meleagris gallopavo",
    chromosomes: 80,
    family: "Phasianidae",
    type: "animal",
    image: "🦃",
  },
  {
    id: "peacock",
    name: "Peacock",
    scientific: "Pavo cristatus",
    chromosomes: 72,
    family: "Phasianidae",
    type: "animal",
    image: "🦚",
  },
  {
    id: "eagle",
    name: "Bald Eagle",
    scientific: "Haliaeetus leucocephalus",
    chromosomes: 66,
    family: "Accipitridae",
    type: "animal",
    image: "🦅",
  },
  {
    id: "owl",
    name: "Barn Owl",
    scientific: "Tyto alba",
    chromosomes: 68,
    family: "Tytonidae",
    type: "animal",
    image: "🦉",
  },
  {
    id: "parrot",
    name: "African Grey Parrot",
    scientific: "Psittacus erithacus",
    chromosomes: 72,
    family: "Psittacidae",
    type: "animal",
    image: "🦜",
  },
  {
    id: "pigeon",
    name: "Rock Pigeon",
    scientific: "Columba livia",
    chromosomes: 80,
    family: "Columbidae",
    type: "animal",
    image: "🐦",
  },

  // Reptiles
  {
    id: "alligator",
    name: "Alligator",
    scientific: "Alligator mississippiensis",
    chromosomes: 32,
    family: "Alligatoridae",
    type: "animal",
    image: "🐊",
  },
  {
    id: "crocodile",
    name: "Crocodile",
    scientific: "Crocodylus niloticus",
    chromosomes: 32,
    family: "Crocodylidae",
    type: "animal",
    image: "🐊",
  },
  {
    id: "turtle",
    name: "Sea Turtle",
    scientific: "Chelonia mydas",
    chromosomes: 56,
    family: "Cheloniidae",
    type: "animal",
    image: "🐢",
  },
  {
    id: "snake",
    name: "Python",
    scientific: "Python regius",
    chromosomes: 36,
    family: "Pythonidae",
    type: "animal",
    image: "🐍",
  },
  {
    id: "lizard",
    name: "Komodo Dragon",
    scientific: "Varanus komodoensis",
    chromosomes: 40,
    family: "Varanidae",
    type: "animal",
    image: "🦎",
  },

  // Marine Mammals
  {
    id: "dolphin",
    name: "Dolphin",
    scientific: "Tursiops truncatus",
    chromosomes: 44,
    family: "Delphinidae",
    type: "animal",
    image: "🐬",
  },
  {
    id: "whale",
    name: "Blue Whale",
    scientific: "Balaenoptera musculus",
    chromosomes: 44,
    family: "Balaenopteridae",
    type: "animal",
    image: "🐋",
  },
  {
    id: "seal",
    name: "Harbor Seal",
    scientific: "Phoca vitulina",
    chromosomes: 34,
    family: "Phocidae",
    type: "animal",
    image: "🦭",
  },
  {
    id: "walrus",
    name: "Walrus",
    scientific: "Odobenus rosmarus",
    chromosomes: 32,
    family: "Odobenidae",
    type: "animal",
    image: "🦭",
  },

  // Rodents
  {
    id: "mouse",
    name: "House Mouse",
    scientific: "Mus musculus",
    chromosomes: 40,
    family: "Muridae",
    type: "animal",
    image: "🐭",
  },
  {
    id: "rat",
    name: "Brown Rat",
    scientific: "Rattus norvegicus",
    chromosomes: 42,
    family: "Muridae",
    type: "animal",
    image: "🐀",
  },
  {
    id: "hamster",
    name: "Syrian Hamster",
    scientific: "Mesocricetus auratus",
    chromosomes: 44,
    family: "Cricetidae",
    type: "animal",
    image: "🐹",
  },
  {
    id: "rabbit",
    name: "Rabbit",
    scientific: "Oryctolagus cuniculus",
    chromosomes: 44,
    family: "Leporidae",
    type: "animal",
    image: "🐰",
  },
  {
    id: "squirrel",
    name: "Gray Squirrel",
    scientific: "Sciurus carolinensis",
    chromosomes: 40,
    family: "Sciuridae",
    type: "animal",
    image: "🐿️",
  },

  // Other Mammals
  {
    id: "elephant",
    name: "African Elephant",
    scientific: "Loxodonta africana",
    chromosomes: 56,
    family: "Elephantidae",
    type: "animal",
    image: "🐘",
  },
  {
    id: "rhino",
    name: "White Rhino",
    scientific: "Ceratotherium simum",
    chromosomes: 82,
    family: "Rhinocerotidae",
    type: "animal",
    image: "🦏",
  },
  {
    id: "hippo",
    name: "Hippopotamus",
    scientific: "Hippopotamus amphibius",
    chromosomes: 36,
    family: "Hippopotamidae",
    type: "animal",
    image: "🦛",
  },
  {
    id: "giraffe",
    name: "Giraffe",
    scientific: "Giraffa camelopardalis",
    chromosomes: 30,
    family: "Giraffidae",
    type: "animal",
    image: "🦒",
  },
  {
    id: "kangaroo",
    name: "Red Kangaroo",
    scientific: "Macropus rufus",
    chromosomes: 20,
    family: "Macropodidae",
    type: "animal",
    image: "🦘",
  },
  {
    id: "koala",
    name: "Koala",
    scientific: "Phascolarctos cinereus",
    chromosomes: 16,
    family: "Phascolarctidae",
    type: "animal",
    image: "🐨",
  },
  {
    id: "sloth",
    name: "Three-toed Sloth",
    scientific: "Bradypus tridactylus",
    chromosomes: 50,
    family: "Bradypodidae",
    type: "animal",
    image: "🦥",
  },
  {
    id: "armadillo",
    name: "Nine-banded Armadillo",
    scientific: "Dasypus novemcinctus",
    chromosomes: 64,
    family: "Dasypodidae",
    type: "animal",
    image: "🦔",
  },

  // Insects
  {
    id: "bee",
    name: "Honey Bee",
    scientific: "Apis mellifera",
    chromosomes: 32,
    family: "Apidae",
    type: "animal",
    image: "🐝",
  },
  {
    id: "ant",
    name: "Fire Ant",
    scientific: "Solenopsis invicta",
    chromosomes: 32,
    family: "Formicidae",
    type: "animal",
    image: "🐜",
  },
  {
    id: "butterfly",
    name: "Monarch Butterfly",
    scientific: "Danaus plexippus",
    chromosomes: 30,
    family: "Nymphalidae",
    type: "animal",
    image: "🦋",
  },
  {
    id: "mosquito",
    name: "Mosquito",
    scientific: "Aedes aegypti",
    chromosomes: 6,
    family: "Culicidae",
    type: "animal",
    image: "🦟",
  },
  {
    id: "ladybug",
    name: "Ladybug",
    scientific: "Coccinella septempunctata",
    chromosomes: 18,
    family: "Coccinellidae",
    type: "animal",
    image: "🐞",
  },

  // Fish
  {
    id: "salmon",
    name: "Atlantic Salmon",
    scientific: "Salmo salar",
    chromosomes: 60,
    family: "Salmonidae",
    type: "animal",
    image: "🐟",
  },
  {
    id: "tuna",
    name: "Bluefin Tuna",
    scientific: "Thunnus thynnus",
    chromosomes: 48,
    family: "Scombridae",
    type: "animal",
    image: "🐟",
  },
  {
    id: "shark",
    name: "Great White Shark",
    scientific: "Carcharodon carcharias",
    chromosomes: 82,
    family: "Lamnidae",
    type: "animal",
    image: "🦈",
  },
  {
    id: "goldfish",
    name: "Goldfish",
    scientific: "Carassius auratus",
    chromosomes: 100,
    family: "Cyprinidae",
    type: "animal",
    image: "🐠",
  },

  // PLANTS - Flowering Plants (Angiosperms)
  {
    id: "rose",
    name: "Rose",
    scientific: "Rosa rubiginosa",
    chromosomes: 14,
    family: "Rosaceae",
    type: "plant",
    image: "🌹",
  },
  {
    id: "tulip",
    name: "Tulip",
    scientific: "Tulipa gesneriana",
    chromosomes: 24,
    family: "Liliaceae",
    type: "plant",
    image: "🌷",
  },
  {
    id: "sunflower",
    name: "Sunflower",
    scientific: "Helianthus annuus",
    chromosomes: 34,
    family: "Asteraceae",
    type: "plant",
    image: "🌻",
  },
  {
    id: "lily",
    name: "Lily",
    scientific: "Lilium longiflorum",
    chromosomes: 24,
    family: "Liliaceae",
    type: "plant",
    image: "🌺",
  },
  {
    id: "orchid",
    name: "Orchid",
    scientific: "Phalaenopsis amabilis",
    chromosomes: 38,
    family: "Orchidaceae",
    type: "plant",
    image: "🌸",
  },
  {
    id: "hibiscus",
    name: "Hibiscus",
    scientific: "Hibiscus rosa-sinensis",
    chromosomes: 36,
    family: "Malvaceae",
    type: "plant",
    image: "🌺",
  },
  {
    id: "daisy",
    name: "Daisy",
    scientific: "Bellis perennis",
    chromosomes: 18,
    family: "Asteraceae",
    type: "plant",
    image: "🌼",
  },
  {
    id: "lavender",
    name: "Lavender",
    scientific: "Lavandula angustifolia",
    chromosomes: 50,
    family: "Lamiaceae",
    type: "plant",
    image: "🪻",
  },

  // Crop Plants
  {
    id: "wheat",
    name: "Wheat",
    scientific: "Triticum aestivum",
    chromosomes: 42,
    family: "Poaceae",
    type: "plant",
    image: "🌾",
  },
  {
    id: "rice",
    name: "Rice",
    scientific: "Oryza sativa",
    chromosomes: 24,
    family: "Poaceae",
    type: "plant",
    image: "🌾",
  },
  { id: "corn", name: "Corn", scientific: "Zea mays", chromosomes: 20, family: "Poaceae", type: "plant", image: "🌽" },
  {
    id: "barley",
    name: "Barley",
    scientific: "Hordeum vulgare",
    chromosomes: 14,
    family: "Poaceae",
    type: "plant",
    image: "🌾",
  },
  {
    id: "oats",
    name: "Oats",
    scientific: "Avena sativa",
    chromosomes: 42,
    family: "Poaceae",
    type: "plant",
    image: "🌾",
  },
  {
    id: "soybean",
    name: "Soybean",
    scientific: "Glycine max",
    chromosomes: 40,
    family: "Fabaceae",
    type: "plant",
    image: "🫘",
  },
  {
    id: "pea",
    name: "Garden Pea",
    scientific: "Pisum sativum",
    chromosomes: 14,
    family: "Fabaceae",
    type: "plant",
    image: "🫛",
  },
  {
    id: "cotton",
    name: "Cotton",
    scientific: "Gossypium hirsutum",
    chromosomes: 52,
    family: "Malvaceae",
    type: "plant",
    image: "🌱",
  },

  // Vegetables
  {
    id: "tomato",
    name: "Tomato",
    scientific: "Solanum lycopersicum",
    chromosomes: 24,
    family: "Solanaceae",
    type: "plant",
    image: "🍅",
  },
  {
    id: "potato",
    name: "Potato",
    scientific: "Solanum tuberosum",
    chromosomes: 48,
    family: "Solanaceae",
    type: "plant",
    image: "🥔",
  },
  {
    id: "carrot",
    name: "Carrot",
    scientific: "Daucus carota",
    chromosomes: 18,
    family: "Apiaceae",
    type: "plant",
    image: "🥕",
  },
  {
    id: "onion",
    name: "Onion",
    scientific: "Allium cepa",
    chromosomes: 16,
    family: "Amaryllidaceae",
    type: "plant",
    image: "🧅",
  },
  {
    id: "lettuce",
    name: "Lettuce",
    scientific: "Lactuca sativa",
    chromosomes: 18,
    family: "Asteraceae",
    type: "plant",
    image: "🥬",
  },
  {
    id: "cabbage",
    name: "Cabbage",
    scientific: "Brassica oleracea",
    chromosomes: 18,
    family: "Brassicaceae",
    type: "plant",
    image: "🥬",
  },
  {
    id: "broccoli",
    name: "Broccoli",
    scientific: "Brassica oleracea",
    chromosomes: 18,
    family: "Brassicaceae",
    type: "plant",
    image: "🥦",
  },
  {
    id: "pepper",
    name: "Bell Pepper",
    scientific: "Capsicum annuum",
    chromosomes: 24,
    family: "Solanaceae",
    type: "plant",
    image: "🫑",
  },

  // Fruits
  {
    id: "apple",
    name: "Apple",
    scientific: "Malus domestica",
    chromosomes: 34,
    family: "Rosaceae",
    type: "plant",
    image: "🍎",
  },
  {
    id: "banana",
    name: "Banana",
    scientific: "Musa acuminata",
    chromosomes: 22,
    family: "Musaceae",
    type: "plant",
    image: "🍌",
  },
  {
    id: "orange",
    name: "Orange",
    scientific: "Citrus sinensis",
    chromosomes: 18,
    family: "Rutaceae",
    type: "plant",
    image: "🍊",
  },
  {
    id: "grape",
    name: "Grape",
    scientific: "Vitis vinifera",
    chromosomes: 38,
    family: "Vitaceae",
    type: "plant",
    image: "🍇",
  },
  {
    id: "strawberry",
    name: "Strawberry",
    scientific: "Fragaria ananassa",
    chromosomes: 56,
    family: "Rosaceae",
    type: "plant",
    image: "🍓",
  },
  {
    id: "watermelon",
    name: "Watermelon",
    scientific: "Citrullus lanatus",
    chromosomes: 22,
    family: "Cucurbitaceae",
    type: "plant",
    image: "🍉",
  },
  {
    id: "mango",
    name: "Mango",
    scientific: "Mangifera indica",
    chromosomes: 40,
    family: "Anacardiaceae",
    type: "plant",
    image: "🥭",
  },
  {
    id: "pineapple",
    name: "Pineapple",
    scientific: "Ananas comosus",
    chromosomes: 50,
    family: "Bromeliaceae",
    type: "plant",
    image: "🍍",
  },

  // Trees
  {
    id: "oak",
    name: "Oak",
    scientific: "Quercus robur",
    chromosomes: 24,
    family: "Fagaceae",
    type: "plant",
    image: "🌳",
  },
  {
    id: "pine",
    name: "Pine",
    scientific: "Pinus sylvestris",
    chromosomes: 24,
    family: "Pinaceae",
    type: "plant",
    image: "🌲",
  },
  {
    id: "maple",
    name: "Maple",
    scientific: "Acer saccharum",
    chromosomes: 26,
    family: "Sapindaceae",
    type: "plant",
    image: "🌳",
  },
  {
    id: "palm",
    name: "Date Palm",
    scientific: "Phoenix dactylifera",
    chromosomes: 36,
    family: "Arecaceae",
    type: "plant",
    image: "🌴",
  },
  {
    id: "bamboo",
    name: "Bamboo",
    scientific: "Bambusa vulgaris",
    chromosomes: 72,
    family: "Poaceae",
    type: "plant",
    image: "🎋",
  },
  {
    id: "cactus",
    name: "Saguaro Cactus",
    scientific: "Carnegiea gigantea",
    chromosomes: 22,
    family: "Cactaceae",
    type: "plant",
    image: "🌵",
  },
]

interface SpeciesSelectorProps {
  parent1: string | null
  parent2: string | null
  onSelectParent1: (id: string) => void
  onSelectParent2: (id: string) => void
}

export function SpeciesSelector({ parent1, parent2, onSelectParent1, onSelectParent2 }: SpeciesSelectorProps) {
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredSpecies = SPECIES_DATABASE.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) || s.scientific.toLowerCase().includes(search.toLowerCase())
    const matchesTab = activeTab === "all" || s.type === activeTab
    return matchesSearch && matchesTab
  })

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-semibold mb-2">Select Parent Species</h2>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search species..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All ({SPECIES_DATABASE.length})</TabsTrigger>
            <TabsTrigger value="animal">
              Animals ({SPECIES_DATABASE.filter((s) => s.type === "animal").length})
            </TabsTrigger>
            <TabsTrigger value="plant">
              Plants ({SPECIES_DATABASE.filter((s) => s.type === "plant").length})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {parent1 && (
        <Card className="bg-biology/10 border-biology/30">
          <CardContent className="p-2">
            <div className="text-xs text-muted-foreground mb-1">Parent 1</div>
            <div className="flex items-center gap-2">
              <span className="text-xl">{SPECIES_DATABASE.find((s) => s.id === parent1)?.image}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-xs">{SPECIES_DATABASE.find((s) => s.id === parent1)?.name}</div>
                <div className="text-[10px] text-muted-foreground truncate">
                  {SPECIES_DATABASE.find((s) => s.id === parent1)?.scientific}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {parent2 && (
        <Card className="bg-biology/10 border-biology/30">
          <CardContent className="p-2">
            <div className="text-xs text-muted-foreground mb-1">Parent 2</div>
            <div className="flex items-center gap-2">
              <span className="text-xl">{SPECIES_DATABASE.find((s) => s.id === parent2)?.image}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-xs">{SPECIES_DATABASE.find((s) => s.id === parent2)?.name}</div>
                <div className="text-[10px] text-muted-foreground truncate">
                  {SPECIES_DATABASE.find((s) => s.id === parent2)?.scientific}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <ScrollArea className="h-[calc(100vh-26rem)]">
        <div className="grid grid-cols-2 gap-2">
          {filteredSpecies.map((species) => (
            <Card
              key={species.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                parent1 === species.id || parent2 === species.id
                  ? "border-biology bg-biology/5"
                  : "hover:border-primary/50"
              }`}
              onClick={() => {
                if (!parent1) {
                  onSelectParent1(species.id)
                } else if (!parent2 && parent1 !== species.id) {
                  onSelectParent2(species.id)
                } else if (parent1 === species.id) {
                  onSelectParent1("")
                } else if (parent2 === species.id) {
                  onSelectParent2("")
                }
              }}
            >
              <CardContent className="p-2">
                <div className="flex flex-col items-center text-center gap-1">
                  <span className="text-2xl">{species.image}</span>
                  <div className="w-full">
                    <div className="font-medium text-xs truncate">{species.name}</div>
                    <div className="text-[9px] text-muted-foreground italic truncate">{species.scientific}</div>
                    <div className="flex gap-1 mt-1 justify-center flex-wrap">
                      <Badge variant="outline" className="text-[8px] px-1 py-0">
                        {species.chromosomes}n
                      </Badge>
                      <Badge variant="secondary" className="text-[8px] px-1 py-0 truncate max-w-[60px]">
                        {species.family}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <div className="text-[10px] text-muted-foreground text-center">
        Showing {filteredSpecies.length} of {SPECIES_DATABASE.length} species
      </div>
    </div>
  )
}

export { SPECIES_DATABASE }
