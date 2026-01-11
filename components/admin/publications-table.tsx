"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Pencil, Trash2, Eye, EyeOff, Download } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { Publication } from "@/lib/types"
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

const categoryLabels: Record<string, string> = {
  list_of_lights: "List of Lights",
  sailing_directions: "Sailing Directions",
  radio_signals: "Radio Signals",
  pilot_books: "Pilot Books",
  annual_summaries: "Annual Summaries",
  other: "Other",
}

interface PublicationsTableProps {
  publications: Publication[]
}

export function PublicationsTable({ publications: initialPublications }: PublicationsTableProps) {
  const [publications, setPublications] = useState(initialPublications)
  const [search, setSearch] = useState("")

  const filteredPublications = publications.filter((pub) => pub.title.toLowerCase().includes(search.toLowerCase()))

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const supabase = createClient()
    await supabase.from("publications").update({ is_published: !currentStatus }).eq("id", id)
    setPublications(publications.map((p) => (p.id === id ? { ...p, is_published: !currentStatus } : p)))
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this publication?")) return
    const supabase = createClient()
    await supabase.from("publications").delete().eq("id", id)
    setPublications(publications.filter((p) => p.id !== id))
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search publications..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Downloads</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPublications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No publications found
                </TableCell>
              </TableRow>
            ) : (
              filteredPublications.map((pub) => (
                <TableRow key={pub.id}>
                  <TableCell className="font-medium">{pub.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{categoryLabels[pub.category]}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {pub.download_count}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={pub.is_published ? "default" : "secondary"}>
                      {pub.is_published ? "Published" : "Draft"}
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
                          <Link href={`/admin/publications/${pub.id}`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => togglePublish(pub.id, pub.is_published)}>
                          {pub.is_published ? (
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
                        <DropdownMenuItem onClick={() => handleDelete(pub.id)} className="text-destructive">
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
