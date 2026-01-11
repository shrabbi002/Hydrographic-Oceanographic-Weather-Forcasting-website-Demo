import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/ui/page-header"
import { PublicationsListing } from "@/components/products/publications-listing"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Navigational Publications",
  description: "Official navigational publications including sailing directions, list of lights, and more",
}

export default async function PublicationsPage() {
  const supabase = await createClient()

  const { data: publications } = await supabase
    .from("publications")
    .select("*")
    .eq("is_published", true)
    .order("category")
    .order("title")

  // Group by category
  const groupedPublications = publications?.reduce(
    (acc, pub) => {
      if (!acc[pub.category]) {
        acc[pub.category] = []
      }
      acc[pub.category].push(pub)
      return acc
    },
    {} as Record<string, typeof publications>,
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Navigational Publications"
        description="Official nautical publications for safe maritime navigation"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Publications", href: "/products/publications" },
        ]}
      />

      <div className="mt-8">
        <PublicationsListing groupedPublications={groupedPublications || {}} />
      </div>
    </div>
  )
}
