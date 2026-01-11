import { ChartForm } from "@/components/admin/chart-form"

export default function NewChartPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add New Chart</h1>
        <p className="text-muted-foreground">Create a new nautical chart entry</p>
      </div>

      <ChartForm />
    </div>
  )
}
