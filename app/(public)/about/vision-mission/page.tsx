import { PageHeader } from "@/components/ui/page-header"
import { Target, Eye, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Vision & Mission",
  description: "The vision, mission, and core values of Bangladesh Navy Hydrographic and Oceanographic Center",
}

export default function VisionMissionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Vision & Mission"
        description="Our guiding principles and objectives"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Vision & Mission", href: "/about/vision-mission" },
        ]}
      />

      <div className="mt-8 space-y-8">
        {/* Vision */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed">
              To be the premier hydrographic authority in the region, providing world-class nautical charting services
              and maritime spatial data solutions that ensure safe navigation and support sustainable development of
              Bangladesh's blue economy.
            </p>
          </CardContent>
        </Card>

        {/* Mission */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <Target className="h-6 w-6 text-accent" />
              </div>
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed">
              To survey, chart, and provide accurate navigational information for safe maritime operations in Bangladesh
              waters, contribute to national maritime security, and support the sustainable development of marine
              resources through scientific research and international collaboration.
            </p>
          </CardContent>
        </Card>

        {/* Core Values */}
        <Card>
          <CardHeader>
            <CardTitle>Core Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Accuracy", description: "Maintaining the highest standards in data collection and charting" },
                {
                  title: "Reliability",
                  description: "Providing dependable navigational products and services",
                },
                {
                  title: "Innovation",
                  description: "Embracing new technologies and methodologies",
                },
                {
                  title: "Professionalism",
                  description: "Upholding excellence in all our operations",
                },
                {
                  title: "Safety",
                  description: "Prioritizing maritime safety in all our endeavors",
                },
                {
                  title: "Collaboration",
                  description: "Working with national and international partners",
                },
              ].map((value) => (
                <div key={value.title} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
