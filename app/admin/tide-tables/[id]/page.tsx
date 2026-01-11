import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { TideTableForm } from "@/components/admin/tide-table-form"

export default async function EditTideTablePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: tideTable } = await supabase.from("tide_tables").select("*").eq("id", id).single()

  if (!tideTable) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Tide Table</h1>
        <p className="text-muted-foreground">Update tide table information</p>
      </div>

      <TideTableForm tideTable={tideTable} />
    </div>
  )
}
