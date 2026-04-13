"use client"
import { redirect } from "next/navigation"

const DEFAULT_COLOR_SCHEME = {
  adenine: "#ef4444", // Red
  thymine: "#22c55e", // Green
  guanine: "#3b82f6", // Blue
  cytosine: "#eab308", // Yellow
  backbone: "#8b5cf6", // Purple
}

export default function DNARedirectPage() {
  redirect("/simulations/biology/dna")
}

// export default function DNASimulationPage() {
//   const [basePairs, setBasePairs] = useState(20)
//   const [rotationSpeed, setRotationSpeed] = useState(0.5)
//   const [showBasePairs, setShowBasePairs] = useState(true)
//   const [rotationAngle, setRotationAngle] = useState(0)
//   const [isFullscreen, setIsFullscreen] = useState(false)
//   const [colorScheme] = useState(DEFAULT_COLOR_SCHEME)
//
//   // Generate sequence based on base pairs
//   const sequence = useMemo(() => {
//     const bases = ["A", "T", "G", "C"]
//     let seq = ""
//     for (let i = 0; i < basePairs; i++) {
//       seq += bases[Math.floor(Math.random() * 4)]
//     }
//     return seq
//   }, [basePairs])
//
//   const handleReset = useCallback(() => {
//     setBasePairs(20)
//     setRotationSpeed(0.5)
//     setShowBasePairs(true)
//     setRotationAngle(0)
//   }, [])
//
//   const handleESP32Data = useCallback((data: { rotation: number; speed: number }) => {
//     setRotationAngle(data.rotation)
//     setRotationSpeed(data.speed)
//   }, [])
//
//   return (
//     <div className="min-h-screen flex flex-col bg-background">
//       <Navigation />
//
//       <main className="flex-grow flex flex-col lg:flex-row relative">
//         {/* Back button & Fullscreen toggle */}
//         <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
//           <Button asChild variant="secondary" size="sm" className="backdrop-blur-sm">
//             <Link href="/simulations">
//               <ArrowLeft className="h-4 w-4 mr-1" />
//               Back
//             </Link>
//           </Button>
//           <Button
//             variant="secondary"
//             size="sm"
//             className="backdrop-blur-sm"
//             onClick={() => setIsFullscreen(!isFullscreen)}
//           >
//             {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
//           </Button>
//         </div>
//
//         {/* Left Sidebar - Controls */}
//         {!isFullscreen && (
//           <aside className="w-full lg:w-80 p-4 border-r border-border/50 overflow-y-auto max-h-[calc(100vh-4rem)] order-2 lg:order-1">
//             <div className="space-y-4">
//               <ControlPanel
//                 basePairs={basePairs}
//                 setBasePairs={setBasePairs}
//                 rotationSpeed={rotationSpeed}
//                 setRotationSpeed={setRotationSpeed}
//                 showBasePairs={showBasePairs}
//                 setShowBasePairs={setShowBasePairs}
//                 onReset={handleReset}
//               />
//               <ESP32Panel onDataReceived={handleESP32Data} />
//             </div>
//           </aside>
//         )}
//
//         {/* Main Canvas Area */}
//         <div className="flex-grow flex flex-col order-1 lg:order-2">
//           {/* 3D Canvas */}
//           <div className="flex-grow relative min-h-[400px] lg:min-h-0">
//             <div className="absolute inset-0">
//               <DNACanvas
//                 basePairs={basePairs}
//                 rotationSpeed={rotationSpeed}
//                 showBasePairs={showBasePairs}
//                 colorScheme={colorScheme}
//                 onRotationChange={setRotationAngle}
//               />
//             </div>
//
//             {/* Title overlay */}
//             <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center pointer-events-none">
//               <h1 className="text-2xl font-bold text-foreground/90">DNA Double Helix</h1>
//               <p className="text-sm text-muted-foreground">Interactive 3D Visualization</p>
//             </div>
//           </div>
//
//           {/* Bottom Sequence Viewer */}
//           {!isFullscreen && (
//             <div className="p-4 border-t border-border/50">
//               <SequenceViewer sequence={sequence} colorScheme={colorScheme} />
//             </div>
//           )}
//         </div>
//
//         {/* Right Sidebar - Info */}
//         {!isFullscreen && (
//           <aside className="w-full lg:w-72 p-4 border-l border-border/50 overflow-y-auto max-h-[calc(100vh-4rem)] order-3">
//             <InfoPanel
//               basePairs={basePairs}
//               rotationAngle={rotationAngle}
//               sequence={sequence}
//               colorScheme={colorScheme}
//             />
//           </aside>
//         )}
//       </main>
//     </div>
//   )
// }
