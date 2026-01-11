"use client"

import { useState, useEffect } from "react"
import { Inbox, MoreHorizontal, Check, X, Eye } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DEMO_SUBMISSIONS } from "@/lib/demo-data"
import type { FormSubmission } from "@/lib/types"

const formTypeLabels: Record<string, string> = {
  chart_correction: "Chart Correction",
  data_request: "Data Request",
  payment_info: "Payment Info",
  contact: "Contact",
  suggestion: "Suggestion",
}

const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  pending: "outline",
  reviewed: "secondary",
  resolved: "default",
  rejected: "destructive",
}

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null)

  useEffect(() => {
    setSubmissions(DEMO_SUBMISSIONS)
    setIsLoading(false)
  }, [])

  const updateStatus = (id: string, status: string) => {
    setSubmissions(submissions.map((s) => (s.id === id ? { ...s, status } : s)))
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-muted"></div>
        <div className="h-64 animate-pulse rounded-lg bg-muted"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Form Submissions</h1>
        <p className="text-muted-foreground">Review and manage form submissions</p>
      </div>

      {submissions.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <Inbox className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No submissions yet</h3>
          <p className="text-muted-foreground">Form submissions will appear here when users submit forms.</p>
        </div>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
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
                  <TableCell>{new Date(submission.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={statusColors[submission.status]} className="capitalize">
                      {submission.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedSubmission(submission)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateStatus(submission.id, "resolved")}>
                          <Check className="mr-2 h-4 w-4" />
                          Mark Resolved
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateStatus(submission.id, "rejected")}>
                          <X className="mr-2 h-4 w-4" />
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
            <DialogDescription>
              {formTypeLabels[selectedSubmission?.form_type || ""] || selectedSubmission?.form_type}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">From</p>
              <p>{selectedSubmission?.submitted_by_email || "Anonymous"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Submitted</p>
              <p>{selectedSubmission && new Date(selectedSubmission.created_at).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Data</p>
              <pre className="mt-1 rounded-lg bg-muted p-3 text-sm overflow-auto">
                {JSON.stringify(selectedSubmission?.data, null, 2)}
              </pre>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
