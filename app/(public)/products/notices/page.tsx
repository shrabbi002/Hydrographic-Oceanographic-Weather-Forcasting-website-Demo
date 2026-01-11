import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/ui/page-header"
import { NoticesListing } from "@/components/products/notices-listing"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Notices to Mariners",
  description: "Monthly navigational warnings and chart corrections for Bangladesh waters",
}

interface NoticesPageProps {
  searchParams: Promise<{ year?: string }>
}

export default async function NoticesPage({ searchParams }: NoticesPageProps) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from("notices_to_mariners")
    .select("*")
    .eq("is_published", true)
    .order("year", { ascending: false })
    .order("month", { ascending: false })

  if (params.year) {
    query = query.eq("year", Number.parseInt(params.year))
  }

  const { data: notices } = await query

  // Get available years
  const { data: allNotices } = await supabase.from("notices_to_mariners").select("year").eq("is_published", true)
  const years = [...new Set(allNotices?.map((n) => n.year))].sort((a, b) => b - a)

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Notices to Mariners"
        description="Monthly compilation of navigational warnings and chart corrections"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Notices to Mariners", href: "/products/notices" },
        ]}
      />

      <div className="mt-8">
        <NoticesListing notices={notices || []} years={years} currentYear={params.year} />
      </div>
    </div>
  )
}
