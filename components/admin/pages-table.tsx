"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Pencil, Trash2, Eye, EyeOff, FileText } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { PageContent } from "@/lib/types"
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

interface PagesTableProps {
  pages: PageContent[]
}

export function PagesTable({ pages: initialPages }: PagesTableProps) {
  const [pages, setPages] = useState(initialPages)
  const [search, setSearch] = useState("")

  const filteredPages = pages.filter(
    (page) =>
      page.page_key.toLowerCase().includes(search.toLowerCase()) ||
      page.title?.toLowerCase().includes(search.toLowerCase()),
  )

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const supabase = createClient()
    await supabase.from("page_contents").update({ is_published: !currentStatus }).eq("id", id)
    setPages(pages.map((p) => (p.id === id ? { ...p, is_published: !currentStatus } : p)))
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this page?")) return
    const supabase = createClient()
    await supabase.from("page_contents").delete().eq("id", id)
    setPages(pages.filter((p) => p.id !== id))
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search pages..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Page Key</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No pages found
                </TableCell>
              </TableRow>
            ) : (
              filteredPages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {page.page_key}
                    </div>
                  </TableCell>
                  <TableCell>{page.title || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={page.is_published ? "default" : "secondary"}>
                      {page.is_published ? "Published" : "Draft"}
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
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/pages/${page.id}`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => togglePublish(page.id, page.is_published)}>
                          {page.is_published ? (
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
                        <DropdownMenuItem onClick={() => handleDelete(page.id)} className="text-destructive">
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
