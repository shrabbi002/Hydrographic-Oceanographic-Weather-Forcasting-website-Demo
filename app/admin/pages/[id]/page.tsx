import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { PageForm } from "@/components/admin/page-form"

export default async function EditPagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: pageContent } = await supabase.from("page_contents").select("*").eq("id", id).single()

  if (!pageContent) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Page</h1>
        <p className="text-muted-foreground">Update page content</p>
      </div>

      <PageForm pageContent={pageContent} />
    </div>
  )
}
