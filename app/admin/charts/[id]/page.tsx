"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import { ChartForm } from "@/components/admin/chart-form"
import { getDemoCharts } from "@/lib/demo-data"
import type { Chart } from "@/lib/types"

interface EditChartPageProps {
  params: Promise<{ id: string }>
}

export default function EditChartPage({ params }: EditChartPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [chart, setChart] = useState<Chart | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const charts = getDemoCharts()
    const found = charts.find((c) => c.id === id)
    if (found) {
      setChart(found)
    } else {
      router.push("/admin/charts")
    }
    setIsLoading(false)
  }, [id, router])

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-muted"></div>
        <div className="h-96 animate-pulse rounded-lg bg-muted"></div>
      </div>
    )
  }

  if (!chart) return null

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Chart</h1>
        <p className="text-muted-foreground">Update chart details</p>
      </div>

      <ChartForm chart={chart} />
    </div>
  )
}
