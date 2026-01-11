import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/ui/page-header"
import { CoursesListing } from "@/components/skill-development/courses-listing"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Skill Development",
  description: "Hydrographic surveying courses and training programs offered by BNHOC",
}

export default async function SkillDevelopmentPage() {
  const supabase = await createClient()

  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("display_order")
    .order("title")

  // Group by category
  const groupedCourses = courses?.reduce(
    (acc, course) => {
      if (!acc[course.category]) {
        acc[course.category] = []
      }
      acc[course.category].push(course)
      return acc
    },
    {} as Record<string, typeof courses>,
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Skill Development"
        description="Professional hydrographic surveying courses and training programs"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Skill Development", href: "/skill-development" },
        ]}
      />

      <div className="mt-8">
        <CoursesListing groupedCourses={groupedCourses || {}} />
      </div>
    </div>
  )
}
