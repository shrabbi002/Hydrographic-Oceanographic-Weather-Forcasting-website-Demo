import Link from "next/link"
import { Inbox, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { FormSubmission } from "@/lib/types"

interface PendingSubmissionsProps {
  submissions: FormSubmission[]
}

const formTypeLabels: Record<string, string> = {
  chart_correction: "Chart Correction",
  data_request: "Data Request",
  payment_info: "Payment Info",
  contact: "Contact",
  suggestion: "Suggestion",
}

export function PendingSubmissions({ submissions }: PendingSubmissionsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Inbox className="h-5 w-5" />
          Pending Submissions
        </CardTitle>
        <Link href="/admin/submissions">
          <Button variant="ghost" size="sm">
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {submissions.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-4">No pending submissions</p>
        ) : (
          <div className="space-y-3">
            {submissions.map((submission) => (
              <div key={submission.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{formTypeLabels[submission.form_type] || submission.form_type}</Badge>
                    <Badge variant="outline" className="capitalize">
                      {submission.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {submission.submitted_by_email || "Anonymous"} •{" "}
                    {new Date(submission.created_at).toLocaleDateString()}
                  </p>
                </div>
                <Link href={`/admin/submissions/${submission.id}`}>
                  <Button variant="ghost" size="sm">
                    Review
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
