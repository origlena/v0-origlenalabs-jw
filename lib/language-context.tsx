"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "en" | "hi" | "bn"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
})

// Translation data
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.simulations": "Simulations",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.search": "Search simulations...",
    "nav.signIn": "Sign In",
    "nav.profile": "Profile",
    "nav.myLearning": "My Learning",
    "nav.settings": "Settings",
    "nav.logout": "Logout",
    "nav.language": "Language",

    // Hero Section
    "hero.cbseAligned": "CBSE/NCERT Aligned",
    "hero.classRange": "Class 6-12",
    "hero.aiPowered": "AI-Powered Learning",
    "hero.title1": "Learn Science Through",
    "hero.title2": "Interactive 3D Simulations",
    "hero.subtitle":
      "India's first NCERT-aligned virtual laboratory platform. Master Physics, Chemistry, Biology, and Mathematics through hands-on 3D experiments designed for CBSE students.",
    "hero.aligned": "Aligned with National Education Policy (NEP) 2020 for experiential learning",
    "hero.startLearning": "Start Learning",
    "hero.tryDNA": "Try DNA Lab Free",
    "hero.developedFor": "Developed for",
    "hero.iitKharagpur": "IIT Kharagpur Young Innovators Programme",

    // Subjects
    "subjects.title": "Choose Your Subject",
    "subjects.subtitle":
      "Dive into interactive simulations across four core STEM disciplines, each designed to make learning engaging and intuitive.",
    "subjects.biology": "Biology",
    "subjects.biology.desc": "Explore DNA structures, cell biology, and life sciences through immersive 3D models.",
    "subjects.physics": "Physics",
    "subjects.physics.desc": "Discover mechanics, waves, and thermodynamics with interactive experiments.",
    "subjects.chemistry": "Chemistry",
    "subjects.chemistry.desc": "Visualize molecules, reactions, and the periodic table in stunning detail.",
    "subjects.mathematics": "Mathematics",
    "subjects.mathematics.desc": "Graph functions, explore geometry, and visualize complex equations.",
    "subjects.agriculture": "Agriculture",
    "subjects.agriculture.desc":
      "Learn crop farming, fertilizers, nutrients, and seasonal effects through 3D simulations.",
    "subjects.simulations": "simulations",
    "subjects.explore": "Explore",

    // Stats
    "stats.simulations": "3D Simulations",
    "stats.subjects": "STEM Subjects",
    "stats.molecules": "Molecules",
    "stats.elements": "Elements",

    // Footer
    "footer.tagline": "Making STEM Education Interactive and Accessible",
    "footer.description": "Developed for IIT Kharagpur Young Innovators Programme",
    "footer.quickLinks": "Quick Links",
    "footer.subjects": "Subjects",
    "footer.contact": "Contact",
    "footer.developers": "Developers",
    "footer.rights": "All rights reserved.",

    // Languages
    "language.english": "English",
    "language.hindi": "हिंदी (Hindi)",
    "language.bengali": "বাংলা (Bengali)",

    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
  },
  hi: {
    // Navigation
    "nav.home": "होम",
    "nav.simulations": "सिमुलेशन",
    "nav.about": "के बारे में",
    "nav.contact": "संपर्क करें",
    "nav.search": "सिमुलेशन खोजें...",
    "nav.signIn": "साइन इन करें",
    "nav.profile": "प्रोफ़ाइल",
    "nav.myLearning": "मेरा सीखना",
    "nav.settings": "सेटिंग्स",
    "nav.logout": "लॉगआउट",
    "nav.language": "भाषा",

    // Hero Section
    "hero.cbseAligned": "CBSE/NCERT संरेखित",
    "hero.classRange": "कक्षा 6-12",
    "hero.aiPowered": "AI-संचालित शिक्षा",
    "hero.title1": "विज्ञान सीखें",
    "hero.title2": "इंटरैक्टिव 3D सिमुलेशन के माध्यम से",
    "hero.subtitle":
      "भारत का पहला NCERT-संरेखित वर्चुअल प्रयोगशाला मंच। CBSE छात्रों के लिए डिज़ाइन किए गए हाथों-हाथ 3D प्रयोगों के माध्यम से भौतिकी, रसायन विज्ञान, जीव विज्ञान और गणित में महारत हासिल करें।",
    "hero.aligned": "अनुभवात्मक शिक्षा के लिए राष्ट्रीय शिक्षा नीति (NEP) 2020 के साथ संरेखित",
    "hero.startLearning": "सीखना शुरू करें",
    "hero.tryDNA": "DNA लैब मुफ्त में आजमाएं",
    "hero.developedFor": "के लिए विकसित",
    "hero.iitKharagpur": "IIT खड़गपुर युवा नवप्रवर्तक कार्यक्रम",

    // Stats
    "stats.simulations": "3D सिमुलेशन",
    "stats.subjects": "STEM विषय",
    "stats.molecules": "अणु",
    "stats.elements": "तत्व",

    // Footer
    "footer.tagline": "STEM शिक्षा को इंटरैक्टिव और सुलभ बनाना",
    "footer.description": "IIT खड़गपुर युवा नवप्रवर्तक कार्यक्रम के लिए विकसित",
    "footer.quickLinks": "त्वरित लिंक",
    "footer.subjects": "विषय",
    "footer.contact": "संपर्क करें",
    "footer.developers": "डेवलपर्स",
    "footer.rights": "सर्वाधिकार सुरक्षित।",

    // Languages
    "language.english": "English",
    "language.hindi": "हिंदी (Hindi)",
    "language.bengali": "বাংলা (Bengali)",

    // Common
    "common.loading": "लोड हो रहा है...",
    "common.error": "त्रुटि",
    "common.success": "सफलता",
  },
  bn: {
    // Navigation
    "nav.home": "হোম",
    "nav.simulations": "সিমুলেশন",
    "nav.about": "সম্পর্কে",
    "nav.contact": "যোগাযোগ",
    "nav.search": "সিমুলেশন খুঁজুন...",
    "nav.signIn": "সাইন ইন করুন",
    "nav.profile": "প্রোফাইল",
    "nav.myLearning": "আমার শেখা",
    "nav.settings": "সেটিংস",
    "nav.logout": "লগআউট",
    "nav.language": "ভাষা",

    // Hero Section
    "hero.cbseAligned": "CBSE/NCERT সংযুক্ত",
    "hero.classRange": "ক্লাস 6-12",
    "hero.aiPowered": "AI-চালিত শিক্ষা",
    "hero.title1": "বিজ্ঞান শিখুন",
    "hero.title2": "ইন্টারঅ্যাক্টিভ 3D সিমুলেশনের মাধ্যমে",
    "hero.subtitle":
      "ভারতের প্রথম NCERT-সংযুক্ত ভার্চুয়াল ল্যাবরেটরি প্ল্যাটফর্ম। CBSE ছাত্রদের জন্য ডিজাইন করা হাতে-কলমে 3D পরীক্ষার মাধ্যমে পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান এবং গণিতে দক্ষতা অর্জন করুন।",
    "hero.aligned": "অভিজ্ঞতামূলক শিক্ষার জন্য জাতীয় শিক্ষা নীতি (NEP) 2020 এর সাথে সংযুক্ত",
    "hero.startLearning": "শেখা শুরু করুন",
    "hero.tryDNA": "DNA ল্যাব বিনামূল্যে চেষ্টা করুন",
    "hero.developedFor": "এর জন্য উন্নত",
    "hero.iitKharagpur": "IIT খড়্গপুর ইয়াং ইনোভেটরস প্রোগ্রাম",

    // Subjects
    "subjects.title": "আপনার বিষয় নির্বাচন করুন",
    "subjects.subtitle":
      "চারটি মূল STEM শাখায় ইন্টারঅ্যাক্টিভ সিমুলেশনে ডুব দিন, প্রতিটি শেখাকে আকর্ষণীয় এবং স্বজ্ঞাত করার জন্য ডিজাইন করা হয়েছে।",
    "subjects.biology": "জীববিজ্ঞান",
    "subjects.biology.desc": "নিমগ্ন 3D মডেলের মাধ্যমে DNA কাঠামো, কোষ জীববিজ্ঞান এবং জীবন বিজ্ঞান অন্বেষণ করুন।",
    "subjects.physics": "পদার্থবিজ্ঞান",
    "subjects.physics.desc": "ইন্টারঅ্যাক্টিভ পরীক্ষার সাথে যান্ত্রিকী, তরঙ্গ এবং তাপগতিবিদ্যা আবিষ্কার করুন।",
    "subjects.chemistry": "রসায়ন",
    "subjects.chemistry.desc": "অণু, প্রতিক্রিয়া এবং পর্যায় সারণীকে অত্যাশ্চর্য বিস্তারিতভাবে দেখুন।",
    "subjects.mathematics": "গণিত",
    "subjects.mathematics.desc": "ফাংশন গ্রাফ করুন, জ্যামিতি অন্বেষণ করুন এবং জটিল সমীকরণ দেখুন।",
    "subjects.agriculture": "কৃষি",
    "subjects.agriculture.desc": "3D সিমুলেশনের মাধ্যমে ফসল চাষ, সার, পুষ্টি এবং মৌসুমী প্রভাব শিখুন।",
    "subjects.simulations": "সিমুলেশন",
    "subjects.explore": "অন্বেষণ করুন",

    // Stats
    "stats.simulations": "3D সিমুলেশন",
    "stats.subjects": "STEM বিষয়",
    "stats.molecules": "অণু",
    "stats.elements": "উপাদান",

    // Footer
    "footer.tagline": "STEM শিক্ষাকে ইন্টারঅ্যাক্টিভ এবং অ্যাক্সেসযোগ্য করা",
    "footer.description": "IIT খড়্গপুর ইয়াং ইনোভেটরস প্রোগ্রামের জন্য উন্নত",
    "footer.quickLinks": "দ্রুত লিঙ্ক",
    "footer.subjects": "বিষয়",
    "footer.contact": "যোগাযোগ",
    "footer.developers": "ডেভেলপার",
    "footer.rights": "সর্বস্বত্ব সংরক্ষিত।",

    // Languages
    "language.english": "English",
    "language.hindi": "हिंदी (Hindi)",
    "language.bengali": "বাংলা (Bengali)",

    // Common
    "common.loading": "লোড হচ্ছে...",
    "common.error": "ত্রুটি",
    "common.success": "সফলতা",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem("origlena-language") as Language
      if (saved && ["en", "hi", "bn"].includes(saved)) {
        setLanguageState(saved)
      }
    } catch (error) {
      console.log("[v0] Language loading from localStorage failed, using default")
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem("origlena-language", lang)
    } catch (error) {
      console.log("[v0] Language saving to localStorage failed")
    }
  }

  const t = (key: string): string => {
    const translation = translations[language]?.[key]
    if (translation) return translation

    const englishTranslation = translations["en"]?.[key]
    if (englishTranslation) return englishTranslation

    return key
  }

  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: "en", setLanguage: () => {}, t: (key) => key }}>
        {children}
      </LanguageContext.Provider>
    )
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
