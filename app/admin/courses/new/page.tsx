import { CourseForm } from "@/components/admin/course-form"

export default function NewCoursePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add Course</h1>
        <p className="text-muted-foreground">Create a new skill development course</p>
      </div>

      <CourseForm />
    </div>
  )
}
