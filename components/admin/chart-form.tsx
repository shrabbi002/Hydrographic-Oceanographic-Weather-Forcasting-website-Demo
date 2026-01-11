"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Save, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { getDemoCharts, saveDemoCharts } from "@/lib/demo-data"
import type { Chart } from "@/lib/types"
import Link from "next/link"

interface ChartFormProps {
  chart?: Chart
}

export function ChartForm({ chart }: ChartFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data: Partial<Chart> = {
      chart_number: formData.get("chart_number") as string,
      title: formData.get("title") as string,
      chart_type: formData.get("chart_type") as "paper" | "enc",
      scale: formData.get("scale") as string,
      area: formData.get("area") as string,
      jurisdiction: formData.get("jurisdiction") as string,
      year: formData.get("year") ? Number.parseInt(formData.get("year") as string) : undefined,
      description: formData.get("description") as string,
      preview_url: formData.get("preview_url") as string,
      file_url: formData.get("file_url") as string,
      is_published: formData.get("is_published") === "on",
    }

    try {
      const charts = getDemoCharts()

      if (chart) {
        const updatedCharts = charts.map((c) =>
          c.id === chart.id ? { ...c, ...data, updated_at: new Date().toISOString() } : c,
        )
        saveDemoCharts(updatedCharts)
      } else {
        const newChart: Chart = {
          id: Date.now().toString(),
          ...data,
          download_count: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as Chart
        saveDemoCharts([newChart, ...charts])
      }

      router.push("/admin/charts")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Chart Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="chart_number">Chart Number *</Label>
              <Input
                id="chart_number"
                name="chart_number"
                placeholder="e.g., BN 1001"
                defaultValue={chart?.chart_number}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="chart_type">Chart Type *</Label>
              <Select name="chart_type" defaultValue={chart?.chart_type || "paper"} required>
                <SelectTrigger id="chart_type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paper">Paper Chart</SelectItem>
                  <SelectItem value="enc">Electronic Chart (ENC)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., Chittagong Port Approach"
              defaultValue={chart?.title}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="scale">Scale</Label>
              <Input id="scale" name="scale" placeholder="e.g., 1:50000" defaultValue={chart?.scale || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">Area</Label>
              <Input id="area" name="area" placeholder="e.g., Chittagong" defaultValue={chart?.area || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                name="year"
                type="number"
                placeholder="e.g., 2024"
                defaultValue={chart?.year || ""}
                min="1900"
                max="2100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jurisdiction">Jurisdiction</Label>
            <Input
              id="jurisdiction"
              name="jurisdiction"
              placeholder="Bangladesh"
              defaultValue={chart?.jurisdiction || "Bangladesh"}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Brief description of the chart..."
              rows={3}
              defaultValue={chart?.description || ""}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="preview_url">Preview URL</Label>
              <Input
                id="preview_url"
                name="preview_url"
                type="url"
                placeholder="https://..."
                defaultValue={chart?.preview_url || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="file_url">Download URL</Label>
              <Input
                id="file_url"
                name="file_url"
                type="url"
                placeholder="https://..."
                defaultValue={chart?.file_url || ""}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Switch id="is_published" name="is_published" defaultChecked={chart?.is_published} />
            <Label htmlFor="is_published">Published</Label>
          </div>

          {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

          <div className="flex gap-4 pt-4">
            <Link href="/admin/charts">
              <Button type="button" variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Saving..." : chart ? "Update Chart" : "Create Chart"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
