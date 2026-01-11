import { PageHeader } from "@/components/ui/page-header"
import { HydrographicForms } from "@/components/forms/hydrographic-forms"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hydrographic Forms",
  description: "Submit hydrographic data requests and chart corrections",
}

export default function FormsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Online Hydrographic Forms"
        description="Submit requests and corrections through our online forms"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Forms", href: "/forms" },
        ]}
      />

      <div className="mt-8">
        <HydrographicForms />
      </div>
    </div>
  )
}
