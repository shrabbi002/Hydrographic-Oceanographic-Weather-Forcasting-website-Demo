import { SurveyShipForm } from "@/components/admin/survey-ship-form"

export default function NewSurveyShipPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add Survey Ship</h1>
        <p className="text-muted-foreground">Create a new survey vessel entry</p>
      </div>

      <SurveyShipForm />
    </div>
  )
}
