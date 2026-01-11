import { NewsForm } from "@/components/admin/news-form"

export default function NewNewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add News/Event</h1>
        <p className="text-muted-foreground">Create a new news article or event</p>
      </div>

      <NewsForm />
    </div>
  )
}
