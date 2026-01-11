"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, FileWarning, MoreHorizontal, Pencil, Trash2, Eye, EyeOff, Archive } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { getDemoNotices, saveDemoNotices } from "@/lib/demo-data"
import type { Notice } from "@/lib/types"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    setNotices(getDemoNotices())
    setIsLoading(false)
  }, [])

  const handleDelete = () => {
    if (!deleteId) return
    const updated = notices.filter((n) => n.id !== deleteId)
    setNotices(updated)
    saveDemoNotices(updated)
    setDeleteId(null)
  }

  const togglePublish = (notice: Notice) => {
    const updated = notices.map((n) => (n.id === notice.id ? { ...n, is_published: !n.is_published } : n))
    setNotices(updated)
    saveDemoNotices(updated)
  }

  const toggleArchive = (notice: Notice) => {
    const updated = notices.map((n) => (n.id === notice.id ? { ...n, is_archived: !n.is_archived } : n))
    setNotices(updated)
    saveDemoNotices(updated)
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notices to Mariners</h1>
          <p className="text-muted-foreground">Manage navigational warnings and corrections</p>
        </div>
        <Link href="/admin/notices/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Notice
          </Button>
        </Link>
      </div>

      {notices.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <FileWarning className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No notices yet</h3>
          <p className="text-muted-foreground">Get started by adding your first notice.</p>
          <Link href="/admin/notices/new">
            <Button className="mt-4">Add Notice</Button>
          </Link>
        </div>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Notice</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Affected Charts</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[70px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {notices.map((notice) => (
                <TableRow key={notice.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <FileWarning className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium">{notice.title}</div>
                        <div className="text-sm text-muted-foreground">{notice.notice_number}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {MONTHS[notice.month - 1]} {notice.year}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {notice.affected_charts?.slice(0, 2).map((chart) => (
                        <Badge key={chart} variant="outline" className="text-xs">
                          {chart}
                        </Badge>
                      ))}
                      {(notice.affected_charts?.length || 0) > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{(notice.affected_charts?.length || 0) - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Badge variant={notice.is_published ? "default" : "outline"}>
                        {notice.is_published ? "Published" : "Draft"}
                      </Badge>
                      {notice.is_archived && <Badge variant="secondary">Archived</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/notices/${notice.id}`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => togglePublish(notice)}>
                          {notice.is_published ? (
                            <>
                              <EyeOff className="mr-2 h-4 w-4" />
                              Unpublish
                            </>
                          ) : (
                            <>
                              <Eye className="mr-2 h-4 w-4" />
                              Publish
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleArchive(notice)}>
                          <Archive className="mr-2 h-4 w-4" />
                          {notice.is_archived ? "Unarchive" : "Archive"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setDeleteId(notice.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
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

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Notice</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this notice? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
