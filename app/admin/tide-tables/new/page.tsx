import { TideTableForm } from "@/components/admin/tide-table-form"

export default function NewTideTablePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add Tide Table</h1>
        <p className="text-muted-foreground">Create a new tide table entry</p>
      </div>

      <TideTableForm />
    </div>
  )
}
