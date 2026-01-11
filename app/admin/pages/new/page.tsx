import { PageForm } from "@/components/admin/page-form"

export default function NewPagePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add Page</h1>
        <p className="text-muted-foreground">Create a new static page</p>
      </div>

      <PageForm />
    </div>
  )
}
