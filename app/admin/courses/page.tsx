import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CoursesTable } from "@/components/admin/courses-table"

export default async function AdminCoursesPage() {
  const supabase = await createClient()

  const { data: courses } = await supabase.from("courses").select("*").order("display_order", { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">Manage skill development courses</p>
        </div>
        <Link href="/admin/courses/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Button>
        </Link>
      </div>

      <CoursesTable courses={courses || []} />
    </div>
  )
}
