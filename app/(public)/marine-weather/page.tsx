import type { Metadata } from "next"
import { MarineWeatherDashboard } from "@/components/weather/marine-weather-dashboard"
import { PageHeader } from "@/components/ui/page-header"

export const metadata: Metadata = {
  title: "Marine Weather | Bangladesh Navy Hydrographic Center",
  description:
    "Real-time marine weather forecasts, astronomical data, tide information, and sea conditions for Bangladesh waters and the Bay of Bengal.",
}

export default function MarineWeatherPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="Marine Weather & Astronomical Data"
        description="Real-time weather forecasts, tide predictions, and astronomical information for safe navigation"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Marine Weather" }]}
      />
      <MarineWeatherDashboard />
    </main>
  )
}
