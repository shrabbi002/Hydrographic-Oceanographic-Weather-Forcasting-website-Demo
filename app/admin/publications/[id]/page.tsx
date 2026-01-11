import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { PublicationForm } from "@/components/admin/publication-form"

export default async function EditPublicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: publication } = await supabase.from("publications").select("*").eq("id", id).single()

  if (!publication) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Publication</h1>
        <p className="text-muted-foreground">Update publication information</p>
      </div>

      <PublicationForm publication={publication} />
    </div>
  )
}
