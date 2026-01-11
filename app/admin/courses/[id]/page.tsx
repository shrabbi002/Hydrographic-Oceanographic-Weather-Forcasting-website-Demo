import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { CourseForm } from "@/components/admin/course-form"

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: course } = await supabase.from("courses").select("*").eq("id", id).single()

  if (!course) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Course</h1>
        <p className="text-muted-foreground">Update course information</p>
      </div>

      <CourseForm course={course} />
    </div>
  )
}
