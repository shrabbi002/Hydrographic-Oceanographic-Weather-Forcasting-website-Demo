import { GISLayerForm } from "@/components/admin/gis-layer-form"

export default function NewGISLayerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add GIS Layer</h1>
        <p className="text-muted-foreground">Create a new map layer</p>
      </div>

      <GISLayerForm />
    </div>
  )
}
