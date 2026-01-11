import { PublicationForm } from "@/components/admin/publication-form"

export default function NewPublicationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add Publication</h1>
        <p className="text-muted-foreground">Create a new publication entry</p>
      </div>

      <PublicationForm />
    </div>
  )
}
