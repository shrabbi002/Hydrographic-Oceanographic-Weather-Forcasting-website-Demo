import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { GISLayerForm } from "@/components/admin/gis-layer-form"

export default async function EditGISLayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: layer } = await supabase.from("gis_layers").select("*").eq("id", id).single()

  if (!layer) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit GIS Layer</h1>
        <p className="text-muted-foreground">Update layer information</p>
      </div>

      <GISLayerForm layer={layer} />
    </div>
  )
}
