"use client"

import { useState } from "react"
import { Map, Layers, ZoomIn, ZoomOut, Navigation, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function GISExplorer() {
  const [showPaperCharts, setShowPaperCharts] = useState(true)
  const [showENCCharts, setShowENCCharts] = useState(true)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  const regions = [
    { id: "chittagong", name: "Chittagong", charts: 12 },
    { id: "mongla", name: "Mongla", charts: 8 },
    { id: "coxsbazar", name: "Cox's Bazar", charts: 6 },
    { id: "payra", name: "Payra", charts: 4 },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      {/* Sidebar Controls */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Layers className="h-5 w-5" />
              Layer Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="paper-charts" className="flex items-center gap-2">
                <Map className="h-4 w-4" />
                Paper Charts
              </Label>
              <Switch id="paper-charts" checked={showPaperCharts} onCheckedChange={setShowPaperCharts} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="enc-charts" className="flex items-center gap-2">
                <Navigation className="h-4 w-4" />
                ENC Charts
              </Label>
              <Switch id="enc-charts" checked={showENCCharts} onCheckedChange={setShowENCCharts} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Regions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id)}
                className={`w-full rounded-lg border p-3 text-left transition-colors ${
                  selectedRegion === region.id ? "border-primary bg-primary/5" : "hover:bg-muted"
                }`}
              >
                <div className="font-medium">{region.name}</div>
                <div className="text-sm text-muted-foreground">{region.charts} charts available</div>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Map Area */}
      <Card className="overflow-hidden">
        <div className="relative aspect-[4/3] bg-muted">
          {/* Placeholder map */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200">
            <div className="text-center">
              <Map className="mx-auto h-16 w-16 text-blue-400" />
              <p className="mt-4 text-lg font-medium text-blue-600">Interactive Map View</p>
              <p className="text-sm text-blue-500">Bangladesh Waters</p>
            </div>

            {/* Sample markers */}
            <div className="absolute top-1/4 left-1/3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              1
            </div>
            <div className="absolute top-1/3 left-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              2
            </div>
            <div className="absolute bottom-1/3 left-2/3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              3
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute right-4 top-4 flex flex-col gap-2">
            <Button size="icon" variant="secondary">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary">
              <ZoomOut className="h-4 w-4" />
            </Button>
          </div>

          {/* Info Panel */}
          {selectedRegion && (
            <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-background/95 p-4 shadow-lg backdrop-blur">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-primary" />
                <div>
                  <h4 className="font-medium">{regions.find((r) => r.id === selectedRegion)?.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {regions.find((r) => r.id === selectedRegion)?.charts} charts available for this region
                  </p>
                  <Button size="sm" className="mt-2" asChild>
                    <a href={`/products/charts?area=${selectedRegion}`}>View Charts</a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
