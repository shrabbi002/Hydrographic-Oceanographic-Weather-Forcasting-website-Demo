import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { MediaForm } from "@/components/admin/media-form"

export default async function EditMediaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: mediaItem } = await supabase.from("media_gallery").select("*").eq("id", id).single()

  if (!mediaItem) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Media</h1>
        <p className="text-muted-foreground">Update media information</p>
      </div>

      <MediaForm mediaItem={mediaItem} />
    </div>
  )
}
