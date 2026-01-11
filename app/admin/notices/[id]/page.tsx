import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { NoticeForm } from "@/components/admin/notice-form"

export default async function EditNoticePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: notice } = await supabase.from("notices_to_mariners").select("*").eq("id", id).single()

  if (!notice) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Notice</h1>
        <p className="text-muted-foreground">Update notice information</p>
      </div>

      <NoticeForm notice={notice} />
    </div>
  )
}
