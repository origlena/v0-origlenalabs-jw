"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { categoryColors, categoryNames, type Element } from "./elements-data"
import { Atom, Thermometer, Zap, Scale, Calendar, User, Info } from "lucide-react"
import { Atom3DVisualization } from "./atom-3d-visualization"

export function ElementDetailPanel({ element, showAtomModel }: { element: Element | null; showAtomModel: boolean }) {
  if (!element) {
    return (
      <Card className="h-full flex items-center justify-center bg-card/50 backdrop-blur">
        <CardContent className="text-center py-12">
          <Atom className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-lg font-medium text-muted-foreground">Select an element</p>
          <p className="text-sm text-muted-foreground/70">Click on any element to view details</p>
        </CardContent>
      </Card>
    )
  }

  const categoryColor = categoryColors[element.category] || "#868e96"

  return (
    <div className="space-y-4 h-full flex flex-col">
      {showAtomModel && (
        <Card className="bg-card/50 backdrop-blur border-2 p-4" style={{ borderColor: categoryColor + "40" }}>
          <p className="text-xs text-muted-foreground mb-3 font-semibold">Electron Configuration</p>
          <Atom3DVisualization element={element} categoryColor={categoryColor} />
        </Card>
      )}

      <Card
        className="flex-1 bg-card/50 backdrop-blur border-2 overflow-y-auto"
        style={{ borderColor: categoryColor + "40" }}
      >
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl font-bold text-white shadow-lg"
                  style={{ backgroundColor: categoryColor }}
                >
                  {element.symbol}
                </div>
                <div>
                  <CardTitle className="text-2xl">{element.name}</CardTitle>
                  <p className="text-muted-foreground">Atomic Number: {element.atomicNumber}</p>
                </div>
              </div>
            </div>
            <Badge style={{ backgroundColor: categoryColor }} className="text-white">
              {categoryNames[element.category]}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[calc(100%-8rem)]">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="properties">Properties</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{element.description}</p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Scale className="w-3 h-3" />
                      Atomic Mass
                    </div>
                    <p className="text-lg font-semibold">{element.atomicMass.toFixed(4)} u</p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Zap className="w-3 h-3" />
                      Electronegativity
                    </div>
                    <p className="text-lg font-semibold">{element.electronegativity ?? "N/A"}</p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Info className="w-3 h-3" />
                      State (at 25°C)
                    </div>
                    <p className="text-lg font-semibold capitalize">{element.state}</p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Atom className="w-3 h-3" />
                      Electron Config
                    </div>
                    <p className="text-sm font-mono font-semibold">{element.electronConfig}</p>
                  </div>
                </div>

                {/* Electron shells visualization */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-3">Electron Shells</p>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {element.shells.map((electrons, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div
                          className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold"
                          style={{ borderColor: categoryColor, color: categoryColor }}
                        >
                          {electrons}
                        </div>
                        <span className="text-xs text-muted-foreground mt-1">
                          {["K", "L", "M", "N", "O", "P", "Q"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="properties" className="space-y-3 mt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Thermometer className="w-4 h-4" /> Melting Point
                    </span>
                    <span className="font-medium">
                      {element.meltingPoint !== null ? `${element.meltingPoint}°C` : "Unknown"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Thermometer className="w-4 h-4" /> Boiling Point
                    </span>
                    <span className="font-medium">
                      {element.boilingPoint !== null ? `${element.boilingPoint}°C` : "Unknown"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Scale className="w-4 h-4" /> Density
                    </span>
                    <span className="font-medium">
                      {element.density !== null ? `${element.density} g/cm³` : "Unknown"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Category</span>
                    <Badge style={{ backgroundColor: categoryColor }} className="text-white text-xs">
                      {categoryNames[element.category]}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">Atomic Number</span>
                    <span className="font-medium">{element.atomicNumber}</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-4 mt-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <User className="w-3 h-3" />
                    Discovered By
                  </div>
                  <p className="font-medium">{element.discoveredBy}</p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Calendar className="w-3 h-3" />
                    Year Discovered
                  </div>
                  <p className="font-medium">{element.yearDiscovered}</p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="text-xs text-muted-foreground mb-2">About</div>
                  <p className="text-sm leading-relaxed">{element.description}</p>
                </div>
              </TabsContent>
            </Tabs>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
