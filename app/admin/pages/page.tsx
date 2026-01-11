import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PagesTable } from "@/components/admin/pages-table"

export default async function AdminPagesPage() {
  const supabase = await createClient()

  const { data: pages } = await supabase.from("page_contents").select("*").order("page_key", { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pages</h1>
          <p className="text-muted-foreground">Manage static page content</p>
        </div>
        <Link href="/admin/pages/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Page
          </Button>
        </Link>
      </div>

      <PagesTable pages={pages || []} />
    </div>
  )
}
