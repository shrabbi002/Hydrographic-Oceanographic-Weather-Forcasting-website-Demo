import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GISLayersTable } from "@/components/admin/gis-layers-table"

export default async function AdminGISLayersPage() {
  const supabase = await createClient()

  const { data: layers } = await supabase.from("gis_layers").select("*").order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">GIS Layers</h1>
          <p className="text-muted-foreground">Manage map layers for GIS Explorer</p>
        </div>
        <Link href="/admin/gis-layers/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Layer
          </Button>
        </Link>
      </div>

      <GISLayersTable layers={layers || []} />
    </div>
  )
}
