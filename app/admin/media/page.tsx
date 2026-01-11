import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MediaTable } from "@/components/admin/media-table"

export default async function AdminMediaPage() {
  const supabase = await createClient()

  const { data: media } = await supabase.from("media_gallery").select("*").order("display_order", { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Media Gallery</h1>
          <p className="text-muted-foreground">Manage photos and videos</p>
        </div>
        <Link href="/admin/media/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Media
          </Button>
        </Link>
      </div>

      <MediaTable media={media || []} />
    </div>
  )
}
