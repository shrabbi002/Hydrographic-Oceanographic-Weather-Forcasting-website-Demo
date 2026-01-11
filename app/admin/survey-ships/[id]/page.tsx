import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { SurveyShipForm } from "@/components/admin/survey-ship-form"

export default async function EditSurveyShipPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: ship } = await supabase.from("survey_ships").select("*").eq("id", id).single()

  if (!ship) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Survey Ship</h1>
        <p className="text-muted-foreground">Update vessel information</p>
      </div>

      <SurveyShipForm ship={ship} />
    </div>
  )
}
