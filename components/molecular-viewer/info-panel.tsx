"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Info, Thermometer, Droplets, Scale, Beaker, Zap, BookOpen, Atom } from "lucide-react"
import { type Molecule, categoryInfo, elementProperties } from "./molecules-data"

interface InfoPanelProps {
  molecule: Molecule
}

export function InfoPanel({ molecule }: InfoPanelProps) {
  // Count atoms by element
  const atomCounts = molecule.atoms.reduce(
    (acc, atom) => {
      acc[atom.element] = (acc[atom.element] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <Card className="h-full border-2 bg-card/95 backdrop-blur">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Info className="h-5 w-5 text-primary" />
          Molecule Information
        </CardTitle>
      </CardHeader>
      <ScrollArea className="h-[calc(100%-4rem)]">
        <CardContent className="space-y-5">
          {/* Molecule Identity */}
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-chemistry/10 border">
            <h2 className="text-2xl font-bold mb-1">{molecule.name}</h2>
            <p className="text-3xl font-mono text-primary mb-2">{molecule.formula}</p>
            <Badge
              style={{
                backgroundColor: `${categoryInfo[molecule.category].color}20`,
                color: categoryInfo[molecule.category].color,
                borderColor: categoryInfo[molecule.category].color,
              }}
              variant="outline"
            >
              {categoryInfo[molecule.category].name}
            </Badge>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2 text-sm">
              <BookOpen className="h-4 w-4" />
              Description
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{molecule.description}</p>
          </div>

          <Separator />

          {/* Molecular Weight & Composition */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-muted/50 text-center">
              <Scale className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Molecular Weight</p>
              <p className="text-lg font-bold">{molecule.molecularWeight.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">g/mol</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 text-center">
              <Atom className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Total Atoms</p>
              <p className="text-lg font-bold">{molecule.atoms.length}</p>
              <p className="text-xs text-muted-foreground">atoms</p>
            </div>
          </div>

          {/* Atom Composition */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Atomic Composition</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(atomCounts).map(([element, count]) => (
                <div
                  key={element}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
                  style={{
                    backgroundColor: `${elementProperties[element]?.color || "#888"}15`,
                    borderColor: `${elementProperties[element]?.color || "#888"}40`,
                  }}
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: elementProperties[element]?.color || "#888" }}
                  />
                  <span className="text-sm font-medium">
                    {elementProperties[element]?.name || element}: {count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Physical Properties */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Physical Properties</h3>

            <div className="grid gap-2">
              {molecule.properties.meltingPoint && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-blue-500/10">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Melting Point</span>
                  </div>
                  <span className="text-sm font-medium">{molecule.properties.meltingPoint}</span>
                </div>
              )}

              {molecule.properties.boilingPoint && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-red-500/10">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-red-500" />
                    <span className="text-sm">Boiling Point</span>
                  </div>
                  <span className="text-sm font-medium">{molecule.properties.boilingPoint}</span>
                </div>
              )}

              {molecule.properties.density && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-purple-500/10">
                  <div className="flex items-center gap-2">
                    <Scale className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Density</span>
                  </div>
                  <span className="text-sm font-medium">{molecule.properties.density}</span>
                </div>
              )}

              {molecule.properties.solubility && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-cyan-500/10">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Solubility</span>
                  </div>
                  <span className="text-sm font-medium text-right max-w-[150px] truncate">
                    {molecule.properties.solubility}
                  </span>
                </div>
              )}

              {molecule.properties.polarity && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-yellow-500/10">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Polarity</span>
                  </div>
                  <Badge variant="secondary" className="capitalize">
                    {molecule.properties.polarity}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Bond Angles */}
          {molecule.properties.bondAngles && molecule.properties.bondAngles.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Bond Angles</h3>
                <div className="flex flex-wrap gap-2">
                  {molecule.properties.bondAngles.map((angle, i) => (
                    <Badge key={i} variant="outline" className="font-mono">
                      {angle}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Uses */}
          {molecule.properties.uses && molecule.properties.uses.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2 text-sm">
                  <Beaker className="h-4 w-4" />
                  Common Uses
                </h3>
                <div className="flex flex-wrap gap-2">
                  {molecule.properties.uses.map((use, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {use}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Bond Information */}
          <Separator />
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Bond Summary</h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-muted/50">
                <p className="text-lg font-bold">{molecule.bonds.filter((b) => b.order === 1).length}</p>
                <p className="text-xs text-muted-foreground">Single</p>
              </div>
              <div className="p-2 rounded-lg bg-muted/50">
                <p className="text-lg font-bold">{molecule.bonds.filter((b) => b.order === 2).length}</p>
                <p className="text-xs text-muted-foreground">Double</p>
              </div>
              <div className="p-2 rounded-lg bg-muted/50">
                <p className="text-lg font-bold">{molecule.bonds.filter((b) => b.order === 3).length}</p>
                <p className="text-xs text-muted-foreground">Triple</p>
              </div>
            </div>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  )
}
