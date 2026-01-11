import { GraduationCap, Clock, Download, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Course } from "@/lib/types"

interface CoursesListingProps {
  groupedCourses: Record<string, Course[]>
}

const categoryDescriptions: Record<string, string> = {
  "Category A": "Advanced hydrographic surveying course recognized by FIG/IHO/ICA International Board",
  "Category B": "Basic hydrographic surveying course for naval and civilian personnel",
  "Survey Recorder": "Training courses for survey recorder positions at various levels",
  Surveyor: "Comprehensive surveyor training programs",
  Customized: "Tailored courses for specific organizational needs",
}

export function CoursesListing({ groupedCourses }: CoursesListingProps) {
  const categories = Object.keys(groupedCourses)

  if (categories.length === 0) {
    return (
      <div className="text-center py-16">
        <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No courses available</h3>
        <p className="text-muted-foreground">Please check back later for updates.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Training & Capacity Building</h2>
              <p className="mt-2 text-muted-foreground">
                Bangladesh Navy Hydrographic and Oceanographic Center offers internationally recognized hydrographic
                surveying courses. Our training programs are designed to develop skilled professionals for maritime
                surveying and charting operations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Categories */}
      {categories.map((category) => {
        const courses = groupedCourses[category]
        return (
          <div key={category}>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">{category}</h3>
              {categoryDescriptions[category] && (
                <p className="text-sm text-muted-foreground">{categoryDescriptions[category]}</p>
              )}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      {/* Image placeholder */}
                      <div className="flex h-full w-24 shrink-0 items-center justify-center bg-primary/10">
                        <GraduationCap className="h-10 w-10 text-primary" />
                      </div>
                      <div className="flex-1 p-4">
                        <Badge variant="outline" className="mb-2">
                          {category}
                        </Badge>
                        <h4 className="font-medium">{course.title}</h4>
                        {course.duration && (
                          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {course.duration}
                          </div>
                        )}
                        {course.description && (
                          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                        )}
                        <div className="mt-3 flex gap-2">
                          <Button variant="outline" size="sm">
                            <ChevronRight className="mr-1 h-4 w-4" />
                            Details
                          </Button>
                          {course.brochure_url && (
                            <Button size="sm" asChild>
                              <a href={course.brochure_url} download>
                                <Download className="mr-1 h-4 w-4" />
                                Brochure
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
