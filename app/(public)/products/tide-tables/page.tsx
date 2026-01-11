import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/ui/page-header"
import { TideTablesListing } from "@/components/products/tide-tables-listing"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tide Tables",
  description: "Annual tide predictions for all major ports in Bangladesh",
}

export default async function TideTablesPage() {
  const supabase = await createClient()

  const { data: tideTables } = await supabase
    .from("tide_tables")
    .select("*")
    .eq("is_published", true)
    .order("year", { ascending: false })
    .order("station")

  // Group by year
  const groupedByYear = tideTables?.reduce(
    (acc, table) => {
      const year = table.year
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(table)
      return acc
    },
    {} as Record<number, typeof tideTables>,
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Tide Tables"
        description="Annual tide predictions for all major ports and stations in Bangladesh waters"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Tide Tables", href: "/products/tide-tables" },
        ]}
      />

      <div className="mt-8">
        <TideTablesListing groupedTables={groupedByYear || {}} />
      </div>
    </div>
  )
}
