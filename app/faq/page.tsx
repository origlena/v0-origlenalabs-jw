import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | Origlena Labs Virtual Lab",
  description:
    "Common questions about Origlena Labs virtual laboratory platform. Learn about our 3D simulations, CBSE alignment, and how to use our e-lab for online science learning.",
  keywords: "virtual lab FAQ, e-lab questions, online lab help, Origlena Labs FAQ, virtual science lab guide",
}

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is Origlena Labs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Origlena Labs is India's first NCERT-aligned virtual laboratory platform featuring interactive 3D simulations for Physics, Chemistry, Biology, and Mathematics. We provide free online science experiments for CBSE Class 6-12 students.",
                },
              },
              {
                "@type": "Question",
                name: "Is Origlena Labs free to use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes! Origlena Labs is completely free for students, teachers, and educational institutions. We believe quality science education should be accessible to everyone.",
                },
              },
              {
                "@type": "Question",
                name: "What subjects are covered in Origlena Labs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We offer simulations across 4 major STEM subjects: Physics (projectile motion, electromagnetic induction, Ohm's law), Chemistry (molecular viewer, pH simulator, periodic table, chemical reactions), Biology (DNA structure, cell anatomy, photosynthesis, species generator), and Mathematics (Pythagoras theorem, unit circle, geometry).",
                },
              },
              {
                "@type": "Question",
                name: "How is Origlena Labs aligned with CBSE/NCERT curriculum?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "All our simulations are designed to complement CBSE/NCERT textbooks for Class 6-12. Each experiment directly relates to topics taught in schools following the National Education Policy (NEP) 2020 and experiential learning guidelines.",
                },
              },
              {
                "@type": "Question",
                name: "Can I use Origlena Labs on my mobile phone?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Absolutely! Origlena Labs is a Progressive Web App (PWA) that works seamlessly on mobile devices, tablets, and computers. You can even install it on your phone for offline access.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need internet to use the virtual lab?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "After your first visit, Origlena Labs works offline thanks to our PWA technology. Your progress is saved locally, and you can access most simulations without internet connectivity.",
                },
              },
              {
                "@type": "Question",
                name: "How are 3D simulations better than traditional labs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "3D virtual simulations allow students to: perform dangerous experiments safely, visualize microscopic and atomic-level processes, pause and replay experiments, conduct experiments without expensive equipment, and learn at their own pace from anywhere.",
                },
              },
              {
                "@type": "Question",
                name: "Who developed Origlena Labs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Origlena Labs was developed by Jarjish Alam, a student from PM SHRI Jawahar Navodaya Vidyalaya, as part of the IIT Kharagpur Young Innovators Programme (YIP) 2024-25.",
                },
              },
            ],
          }),
        }}
      />
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Everything you need to know about Origlena Labs virtual laboratory platform
          </p>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left text-lg font-semibold">
                What is Origlena Labs?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Origlena Labs is India's first NCERT-aligned virtual laboratory platform featuring interactive 3D
                simulations for Physics, Chemistry, Biology, and Mathematics. We provide free online science experiments
                for CBSE Class 6-12 students, helping them understand complex concepts through hands-on virtual
                experiments.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Is Origlena Labs free to use?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Yes! Origlena Labs is completely free for students, teachers, and educational institutions. We believe
                quality science education should be accessible to everyone, regardless of their economic background.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left text-lg font-semibold">
                What subjects are covered?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                We offer 11+ simulations across 4 major STEM subjects:
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>Physics: Projectile motion, electromagnetic induction, Ohm's law</li>
                  <li>Chemistry: Molecular viewer, pH simulator, periodic table, chemical reactions</li>
                  <li>Biology: DNA structure, cell anatomy, photosynthesis, species generator</li>
                  <li>Mathematics: Pythagoras theorem, unit circle, geometric visualizations</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left text-lg font-semibold">
                How is it aligned with CBSE/NCERT curriculum?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                All our simulations are designed to complement CBSE/NCERT textbooks for Class 6-12. Each experiment
                directly relates to topics taught in schools, following the National Education Policy (NEP) 2020
                guidelines for experiential learning. We cover concepts from NCERT textbooks with interactive 3D
                visualizations.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Can I use it on my mobile phone?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Absolutely! Origlena Labs is a Progressive Web App (PWA) that works seamlessly on mobile devices,
                tablets, and computers. The interface automatically adapts to your screen size. You can even install it
                on your phone's home screen for quick access, just like a native app.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Do I need internet to use the virtual lab?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                After your first visit, Origlena Labs works offline thanks to our PWA technology. The app caches all
                necessary resources on your device, so you can access simulations without internet connectivity. Your
                progress and notes are saved locally.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left text-lg font-semibold">
                How are 3D simulations better than traditional labs?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                3D virtual simulations offer several advantages:
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>Perform dangerous chemical reactions safely</li>
                  <li>Visualize microscopic and atomic-level processes</li>
                  <li>Pause, replay, and slow down experiments</li>
                  <li>Conduct experiments without expensive equipment</li>
                  <li>Learn at your own pace from anywhere</li>
                  <li>Experiment with scenarios impossible in physical labs</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Who developed Origlena Labs?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Origlena Labs was developed by Jarjish Alam, a Class 10 student from PM SHRI Jawahar Navodaya
                Vidyalaya, Dakshin Dinajpur, West Bengal. This project is part of the IIT Kharagpur Young Innovators
                Programme (YIP) 2024-25, which nurtures talented students in STEM innovation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Can teachers use this for their classes?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Yes! Teachers can use Origlena Labs to demonstrate concepts during online or offline classes. The
                simulations can be projected in classrooms, shared as assignments, or used for flipped classroom
                approaches. We encourage teachers to integrate our platform into their teaching methodology.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left text-lg font-semibold">
                How do I get started?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Simply visit our simulations page, choose a subject that interests you, and click on any experiment to
                begin. No registration is required to explore simulations. For saving progress and accessing additional
                features, you can create a free account.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-16 p-8 bg-primary/5 rounded-xl border">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Feel free to reach out to our team.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
