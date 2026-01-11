import { NoticeForm } from "@/components/admin/notice-form"

export default function NewNoticePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add Notice to Mariners</h1>
        <p className="text-muted-foreground">Create a new navigational notice</p>
      </div>

      <NoticeForm />
    </div>
  )
}
