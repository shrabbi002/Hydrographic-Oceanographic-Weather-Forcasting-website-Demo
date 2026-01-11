import { PageHeader } from "@/components/ui/page-header"
import { GISExplorer } from "@/components/products/gis-explorer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "GIS Chart Explorer",
  description: "Interactive map-based exploration of nautical charts for Bangladesh waters",
}

export default function GISExplorerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="GIS Chart Explorer"
        description="Explore nautical charts interactively on the map"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "GIS Explorer", href: "/products/gis-explorer" },
        ]}
      />

      <div className="mt-8">
        <GISExplorer />
      </div>
    </div>
  )
}
