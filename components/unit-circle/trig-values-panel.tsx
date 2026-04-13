"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calculator, AlertTriangle } from "lucide-react"

interface TrigValuesPanelProps {
  angle: number
  useDegrees: boolean
}

export function TrigValuesPanel({ angle, useDegrees }: TrigValuesPanelProps) {
  const sin = Math.sin(angle)
  const cos = Math.cos(angle)
  const tan = Math.abs(cos) < 0.0001 ? null : sin / cos
  const csc = Math.abs(sin) < 0.0001 ? null : 1 / sin
  const sec = Math.abs(cos) < 0.0001 ? null : 1 / cos
  const cot = Math.abs(sin) < 0.0001 ? null : cos / sin

  const degrees = (angle * 180) / Math.PI
  const quadrant = degrees <= 90 ? 1 : degrees <= 180 ? 2 : degrees <= 270 ? 3 : 4

  const formatValue = (val: number | null) => {
    if (val === null) return "undefined"
    if (Math.abs(val) > 1000) return val > 0 ? "+∞" : "-∞"
    return val.toFixed(4)
  }

  const getExactValue = (deg: number, fn: string): string => {
    const normalized = deg % 360
    const exactValues: Record<number, Record<string, string>> = {
      0: { sin: "0", cos: "1", tan: "0" },
      30: { sin: "1/2", cos: "√3/2", tan: "√3/3" },
      45: { sin: "√2/2", cos: "√2/2", tan: "1" },
      60: { sin: "√3/2", cos: "1/2", tan: "√3" },
      90: { sin: "1", cos: "0", tan: "undef" },
      120: { sin: "√3/2", cos: "-1/2", tan: "-√3" },
      135: { sin: "√2/2", cos: "-√2/2", tan: "-1" },
      150: { sin: "1/2", cos: "-√3/2", tan: "-√3/3" },
      180: { sin: "0", cos: "-1", tan: "0" },
      210: { sin: "-1/2", cos: "-√3/2", tan: "√3/3" },
      225: { sin: "-√2/2", cos: "-√2/2", tan: "1" },
      240: { sin: "-√3/2", cos: "-1/2", tan: "√3" },
      270: { sin: "-1", cos: "0", tan: "undef" },
      300: { sin: "-√3/2", cos: "1/2", tan: "-√3" },
      315: { sin: "-√2/2", cos: "√2/2", tan: "-1" },
      330: { sin: "-1/2", cos: "√3/2", tan: "-√3/3" },
      360: { sin: "0", cos: "1", tan: "0" },
    }

    const closest = Object.keys(exactValues)
      .map(Number)
      .reduce((prev, curr) => (Math.abs(curr - normalized) < Math.abs(prev - normalized) ? curr : prev))

    if (Math.abs(closest - normalized) < 2) {
      return exactValues[closest]?.[fn] || ""
    }
    return ""
  }

  const sinExact = getExactValue(degrees, "sin")
  const cosExact = getExactValue(degrees, "cos")
  const tanExact = getExactValue(degrees, "tan")

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Calculator className="h-5 w-5 text-purple-500" />
          </div>
          Trigonometric Values
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Angle */}
        <div className="p-4 rounded-lg bg-muted/50 text-center">
          <div className="text-sm text-muted-foreground mb-1">Current Angle</div>
          <div className="text-3xl font-bold text-primary">
            {useDegrees ? `${Math.round(degrees)}°` : `${(angle / Math.PI).toFixed(3)}π`}
          </div>
          <Badge variant="outline" className="mt-2">
            Quadrant {quadrant}
          </Badge>
        </div>

        {/* Primary Functions */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground">Primary Functions</h4>

          <div className="grid gap-2">
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="font-medium">sin(θ)</span>
                {sinExact && (
                  <Badge variant="secondary" className="text-xs">
                    {sinExact}
                  </Badge>
                )}
              </div>
              <span className="font-mono text-lg">{formatValue(sin)}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="font-medium">cos(θ)</span>
                {cosExact && (
                  <Badge variant="secondary" className="text-xs">
                    {cosExact}
                  </Badge>
                )}
              </div>
              <span className="font-mono text-lg">{formatValue(cos)}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="font-medium">tan(θ)</span>
                {tanExact && (
                  <Badge variant="secondary" className="text-xs">
                    {tanExact}
                  </Badge>
                )}
              </div>
              <span className="font-mono text-lg flex items-center gap-2">
                {formatValue(tan)}
                {tan === null && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Reciprocal Functions */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground">Reciprocal Functions</h4>

          <div className="grid gap-2">
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
              <span className="text-sm">csc(θ) = 1/sin</span>
              <span className="font-mono">{formatValue(csc)}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
              <span className="text-sm">sec(θ) = 1/cos</span>
              <span className="font-mono">{formatValue(sec)}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
              <span className="text-sm">cot(θ) = 1/tan</span>
              <span className="font-mono">{formatValue(cot)}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Coordinates */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground">Point on Circle</h4>
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-center">
            <div className="text-lg font-mono">
              ({cos.toFixed(4)}, {sin.toFixed(4)})
            </div>
            <div className="text-xs text-muted-foreground mt-1">(cos θ, sin θ)</div>
          </div>
        </div>

        {/* Mnemonic */}
        <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20">
          <h4 className="text-sm font-semibold mb-2">Memory Aid: ASTC</h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              <strong className="text-green-500">A</strong>ll - Quadrant I (all positive)
            </p>
            <p>
              <strong className="text-purple-500">S</strong>tudents - Quadrant II (sin positive)
            </p>
            <p>
              <strong className="text-orange-500">T</strong>ake - Quadrant III (tan positive)
            </p>
            <p>
              <strong className="text-blue-500">C</strong>alculus - Quadrant IV (cos positive)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
