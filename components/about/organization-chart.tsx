import { User, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const orgStructure = {
  head: {
    title: "Chief Hydrographer",
    rank: "Rear Admiral",
    description: "Overall leadership and strategic direction",
  },
  divisions: [
    {
      name: "Survey Division",
      head: "Commander",
      description: "Hydrographic surveys and data collection",
      sections: ["Field Survey", "Data Processing", "Quality Control"],
    },
    {
      name: "Cartography Division",
      head: "Commander",
      description: "Chart production and publications",
      sections: ["Paper Charts", "ENC Production", "Publications"],
    },
    {
      name: "Oceanography Division",
      head: "Commander",
      description: "Oceanographic research and tidal predictions",
      sections: ["Tidal Analysis", "Ocean Research", "Marine Weather"],
    },
    {
      name: "Training Division",
      head: "Commander",
      description: "Professional training and skill development",
      sections: ["Category A/B Courses", "Technical Training", "Research"],
    },
  ],
}

export function OrganizationChart() {
  return (
    <div className="space-y-8">
      {/* Head */}
      <div className="flex justify-center">
        <Card className="w-full max-w-md border-primary bg-primary/5">
          <CardContent className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <User className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">{orgStructure.head.title}</h3>
            <p className="text-sm text-primary">{orgStructure.head.rank}</p>
            <p className="mt-2 text-sm text-muted-foreground">{orgStructure.head.description}</p>
          </CardContent>
        </Card>
      </div>

      {/* Connection line */}
      <div className="flex justify-center">
        <div className="h-8 w-0.5 bg-border" />
      </div>

      {/* Divisions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {orgStructure.divisions.map((division) => (
          <Card key={division.name}>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h4 className="font-semibold">{division.name}</h4>
              <p className="text-sm text-primary">{division.head}</p>
              <p className="mt-2 text-sm text-muted-foreground">{division.description}</p>
              <div className="mt-4 space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Sections:</p>
                <ul className="text-sm">
                  {division.sections.map((section) => (
                    <li key={section} className="text-muted-foreground">
                      • {section}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
