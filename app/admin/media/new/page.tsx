import { MediaForm } from "@/components/admin/media-form"

export default function NewMediaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add Media</h1>
        <p className="text-muted-foreground">Upload a new photo or video</p>
      </div>

      <MediaForm />
    </div>
  )
}
