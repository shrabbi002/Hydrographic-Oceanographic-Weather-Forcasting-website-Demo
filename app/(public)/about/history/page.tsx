import { PageHeader } from "@/components/ui/page-header"
import { HistoryTimeline } from "@/components/about/history-timeline"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our History",
  description: "The history and evolution of Bangladesh Navy Hydrographic and Oceanographic Center",
}

export default function HistoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Our History"
        description="The journey of Bangladesh Navy Hydrographic and Oceanographic Center"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "History", href: "/about/history" },
        ]}
      />

      <div className="mt-8">
        <HistoryTimeline />
      </div>
    </div>
  )
}
