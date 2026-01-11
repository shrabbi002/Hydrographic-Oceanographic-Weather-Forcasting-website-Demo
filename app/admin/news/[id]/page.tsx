import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { NewsForm } from "@/components/admin/news-form"

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: newsItem } = await supabase.from("news_events").select("*").eq("id", id).single()

  if (!newsItem) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit News/Event</h1>
        <p className="text-muted-foreground">Update news or event information</p>
      </div>

      <NewsForm newsItem={newsItem} />
    </div>
  )
}
