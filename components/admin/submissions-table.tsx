"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MoreHorizontal, Eye, CheckCircle, XCircle, Clock, Inbox } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { createClient } from "@/lib/supabase/client"
import type { FormSubmission } from "@/lib/types"

interface SubmissionsTableProps {
  submissions: FormSubmission[]
}

const formTypeLabels: Record<string, string> = {
  chart_correction: "Chart Correction",
  data_request: "Data Request",
  payment_info: "Payment Info",
  contact: "Contact",
  suggestion: "Suggestion",
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Pending", variant: "outline" },
  in_review: { label: "In Review", variant: "secondary" },
  completed: { label: "Completed", variant: "default" },
  rejected: { label: "Rejected", variant: "destructive" },
}

export function SubmissionsTable({ submissions }: SubmissionsTableProps) {
  const router = useRouter()
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null)

  const updateStatus = async (id: string, status: FormSubmission["status"]) => {
    const supabase = createClient()
    await supabase.from("form_submissions").update({ status }).eq("id", id)
    router.refresh()
  }

  if (submissions.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center">
        <Inbox className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No submissions yet</h3>
        <p className="text-muted-foreground">Form submissions will appear here.</p>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="w-[70px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>
                  <Badge variant="secondary">{formTypeLabels[submission.form_type] || submission.form_type}</Badge>
                </TableCell>
                <TableCell>{submission.submitted_by_email || "Anonymous"}</TableCell>
                <TableCell>
                  <Badge variant={statusConfig[submission.status]?.variant || "outline"}>
                    {statusConfig[submission.status]?.label || submission.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(submission.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedSubmission(submission)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => updateStatus(submission.id, "in_review")}>
                        <Clock className="mr-2 h-4 w-4" />
                        Mark In Review
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateStatus(submission.id, "completed")}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark Completed
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateStatus(submission.id, "rejected")}>
                        <XCircle className="mr-2 h-4 w-4" />
                        Mark Rejected
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
            <DialogDescription>
              {formTypeLabels[selectedSubmission?.form_type || ""] || selectedSubmission?.form_type} from{" "}
              {selectedSubmission?.submitted_by_email || "Anonymous"}
            </DialogDescription>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <p>
                    <Badge variant={statusConfig[selectedSubmission.status]?.variant || "outline"}>
                      {statusConfig[selectedSubmission.status]?.label || selectedSubmission.status}
                    </Badge>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Submitted</label>
                  <p>{new Date(selectedSubmission.created_at).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Submission Data</label>
                <pre className="mt-2 rounded-lg bg-muted p-4 text-sm overflow-auto">
                  {JSON.stringify(selectedSubmission.data, null, 2)}
                </pre>
              </div>

              {selectedSubmission.admin_notes && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Admin Notes</label>
                  <p className="mt-1">{selectedSubmission.admin_notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
