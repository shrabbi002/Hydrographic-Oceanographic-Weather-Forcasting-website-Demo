"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChartsTable } from "@/components/admin/charts-table"
import { getDemoCharts, saveDemoCharts } from "@/lib/demo-data"
import type { Chart } from "@/lib/types"

export default function AdminChartsPage() {
  const [charts, setCharts] = useState<Chart[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setCharts(getDemoCharts())
    setIsLoading(false)
  }, [])

  const handleUpdate = (updatedCharts: Chart[]) => {
    setCharts(updatedCharts)
    saveDemoCharts(updatedCharts)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-muted"></div>
        <div className="h-64 animate-pulse rounded-lg bg-muted"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Charts</h1>
          <p className="text-muted-foreground">Manage nautical charts (Paper & ENC)</p>
        </div>
        <Link href="/admin/charts/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Chart
          </Button>
        </Link>
      </div>

      <ChartsTable charts={charts} onUpdate={handleUpdate} />
    </div>
  )
}
