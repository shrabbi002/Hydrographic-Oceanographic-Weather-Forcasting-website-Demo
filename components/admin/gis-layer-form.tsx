"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { GISLayer } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

interface GISLayerFormProps {
  layer?: GISLayer
}

export function GISLayerForm({ layer }: GISLayerFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: layer?.name || "",
    layer_type: layer?.layer_type || "",
    scale: layer?.scale || "",
    location: layer?.location || "",
    jurisdiction: layer?.jurisdiction || "",
    file_url: layer?.file_url || "",
    is_enabled: layer?.is_enabled || false,
  })
  const [geojsonText, setGeojsonText] = useState(layer?.geojson_data ? JSON.stringify(layer.geojson_data, null, 2) : "")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const supabase = createClient()

    try {
      const data = {
        ...formData,
        geojson_data: geojsonText ? JSON.parse(geojsonText) : null,
      }

      if (layer) {
        await supabase.from("gis_layers").update(data).eq("id", layer.id)
      } else {
        await supabase.from("gis_layers").insert(data)
      }
      router.push("/admin/gis-layers")
      router.refresh()
    } catch (error) {
      console.error("Error saving layer:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Layer Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Layer Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="layer_type">Layer Type</Label>
              <Input
                id="layer_type"
                value={formData.layer_type}
                onChange={(e) => setFormData({ ...formData, layer_type: e.target.value })}
                placeholder="e.g., Chart, Boundary, Navigation Aid"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="scale">Scale</Label>
              <Input
                id="scale"
                value={formData.scale}
                onChange={(e) => setFormData({ ...formData, scale: e.target.value })}
                placeholder="e.g., 1:50000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Chittagong Port"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jurisdiction">Jurisdiction</Label>
              <Input
                id="jurisdiction"
                value={formData.jurisdiction}
                onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
                placeholder="e.g., Bangladesh EEZ"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file_url">File URL (GeoJSON/KML)</Label>
            <Input
              id="file_url"
              value={formData.file_url}
              onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="geojson">GeoJSON Data (optional)</Label>
            <Textarea
              id="geojson"
              value={geojsonText}
              onChange={(e) => setGeojsonText(e.target.value)}
              rows={8}
              placeholder='{"type": "FeatureCollection", "features": [...]}'
              className="font-mono text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="is_enabled"
              checked={formData.is_enabled}
              onCheckedChange={(checked) => setFormData({ ...formData, is_enabled: checked })}
            />
            <Label htmlFor="is_enabled">Enabled</Label>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : layer ? "Update" : "Create"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
