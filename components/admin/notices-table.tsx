"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Pencil, Trash2, Eye, EyeOff, Download, Archive } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { NoticeToMariners } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

interface NoticesTableProps {
  notices: NoticeToMariners[]
}

export function NoticesTable({ notices: initialNotices }: NoticesTableProps) {
  const [notices, setNotices] = useState(initialNotices)
  const [search, setSearch] = useState("")

  const filteredNotices = notices.filter(
    (notice) =>
      notice.title.toLowerCase().includes(search.toLowerCase()) ||
      notice.notice_number.toLowerCase().includes(search.toLowerCase()),
  )

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const supabase = createClient()
    await supabase.from("notices_to_mariners").update({ is_published: !currentStatus }).eq("id", id)
    setNotices(notices.map((n) => (n.id === id ? { ...n, is_published: !currentStatus } : n)))
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this notice?")) return
    const supabase = createClient()
    await supabase.from("notices_to_mariners").delete().eq("id", id)
    setNotices(notices.filter((n) => n.id !== id))
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search notices..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Notice #</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Downloads</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNotices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No notices found
                </TableCell>
              </TableRow>
            ) : (
              filteredNotices.map((notice) => (
                <TableRow key={notice.id}>
                  <TableCell className="font-medium">{notice.notice_number}</TableCell>
                  <TableCell>{notice.title}</TableCell>
                  <TableCell>
                    {months[notice.month - 1]} {notice.year}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {notice.download_count}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Badge variant={notice.is_published ? "default" : "secondary"}>
                        {notice.is_published ? "Published" : "Draft"}
                      </Badge>
                      {notice.is_archived && (
                        <Badge variant="outline">
                          <Archive className="mr-1 h-3 w-3" />
                          Archived
                        </Badge>
                      )}
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
                        <DropdownMenuItem onClick={() => togglePublish(notice.id, notice.is_published)}>
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
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(notice.id)} className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
