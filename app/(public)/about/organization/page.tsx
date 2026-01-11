import { PageHeader } from "@/components/ui/page-header"
import { OrganizationChart } from "@/components/about/organization-chart"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Organization",
  description: "Organizational structure of Bangladesh Navy Hydrographic and Oceanographic Center",
}

export default function OrganizationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Organizational Structure"
        description="The structure and divisions of BNHOC"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Organization", href: "/about/organization" },
        ]}
      />

      <div className="mt-8">
        <OrganizationChart />
      </div>
    </div>
  )
}
