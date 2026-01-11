import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/ui/page-header"
import { SurveyShipsGallery } from "@/components/about/survey-ships-gallery"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Survey Ships",
  description: "Our fleet of hydrographic survey vessels",
}

export default async function SurveyShipsPage() {
  const supabase = await createClient()

  const { data: ships } = await supabase
    .from("survey_ships")
    .select("*")
    .eq("is_published", true)
    .order("display_order")

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Survey Ships"
        description="Our fleet of hydrographic survey vessels"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Survey Ships", href: "/about/survey-ships" },
        ]}
      />

      <div className="mt-8">
        <SurveyShipsGallery ships={ships || []} />
      </div>
    </div>
  )
}
