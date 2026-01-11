import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SurveyShipsTable } from "@/components/admin/survey-ships-table"

export default async function AdminSurveyShipsPage() {
  const supabase = await createClient()

  const { data: ships } = await supabase.from("survey_ships").select("*").order("display_order", { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Survey Ships</h1>
          <p className="text-muted-foreground">Manage survey vessel information</p>
        </div>
        <Link href="/admin/survey-ships/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Ship
          </Button>
        </Link>
      </div>

      <SurveyShipsTable ships={ships || []} />
    </div>
  )
}
