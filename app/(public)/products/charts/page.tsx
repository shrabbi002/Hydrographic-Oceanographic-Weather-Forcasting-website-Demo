import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { ChartsListing } from "@/components/products/charts-listing"
import { ChartsFilter } from "@/components/products/charts-filter"
import { PageHeader } from "@/components/ui/page-header"
import { DEMO_CHARTS } from "@/lib/demo-data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nautical Charts",
  description:
    "Browse official nautical charts for Bangladesh waters - Paper Charts and Electronic Navigational Charts (ENC)",
}

interface ChartsPageProps {
  searchParams: Promise<{ type?: string; scale?: string; area?: string; year?: string }>
}

export default async function ChartsPage({ searchParams }: ChartsPageProps) {
  const params = await searchParams

  let charts = null
  let allCharts = null

  try {
    const supabase = await createClient()

    let query = supabase.from("charts").select("*").eq("is_published", true).order("chart_number")

    if (params.type) {
      query = query.eq("chart_type", params.type)
    }
    if (params.area) {
      query = query.ilike("area", `%${params.area}%`)
    }
    if (params.year) {
      query = query.eq("year", Number.parseInt(params.year))
    }

    const { data } = await query
    charts = data

    const { data: filterData } = await supabase.from("charts").select("area, year, scale").eq("is_published", true)
    allCharts = filterData
  } catch {
    // Supabase unavailable — use demo data
  }

  // Fallback to demo data if Supabase returned no results
  if (!charts || charts.length === 0) {
    let filteredCharts = DEMO_CHARTS.filter((c) => c.is_published)

    if (params.type) {
      filteredCharts = filteredCharts.filter((c) => c.chart_type === params.type)
    }
    if (params.area) {
      filteredCharts = filteredCharts.filter((c) =>
        c.area?.toLowerCase().includes(params.area!.toLowerCase()),
      )
    }
    if (params.year) {
      filteredCharts = filteredCharts.filter((c) => c.year === Number.parseInt(params.year!))
    }

    charts = filteredCharts
  }

  if (!allCharts || allCharts.length === 0) {
    allCharts = DEMO_CHARTS.filter((c) => c.is_published).map((c) => ({
      area: c.area,
      year: c.year,
      scale: c.scale,
    }))
  }

  const areas = [...new Set(allCharts?.map((c) => c.area).filter(Boolean))]
  const years = [...new Set(allCharts?.map((c) => c.year).filter(Boolean))].sort((a, b) => (b || 0) - (a || 0))

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Nautical Charts"
        description="Browse and download official nautical charts for Bangladesh waters"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Charts", href: "/products/charts" },
        ]}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-6">
          <ChartsFilter
            currentType={params.type}
            currentArea={params.area}
            currentYear={params.year}
            areas={areas as string[]}
            years={years as number[]}
          />
        </aside>

        <main>
          <Suspense fallback={<div className="text-center py-12">Loading charts...</div>}>
            <ChartsListing charts={charts || []} />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
