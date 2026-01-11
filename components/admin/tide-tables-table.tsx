"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MoreHorizontal, Pencil, Trash2, Eye, EyeOff, Download } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { TideTable } from "@/lib/types"
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

interface TideTablesTableProps {
  tideTables: TideTable[]
}

export function TideTablesTable({ tideTables: initialTideTables }: TideTablesTableProps) {
  const [tideTables, setTideTables] = useState(initialTideTables)
  const [search, setSearch] = useState("")
  const router = useRouter()

  const filteredTideTables = tideTables.filter(
    (table) =>
      table.title.toLowerCase().includes(search.toLowerCase()) ||
      table.station.toLowerCase().includes(search.toLowerCase()),
  )

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const supabase = createClient()
    await supabase.from("tide_tables").update({ is_published: !currentStatus }).eq("id", id)
    setTideTables(tideTables.map((t) => (t.id === id ? { ...t, is_published: !currentStatus } : t)))
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tide table?")) return
    const supabase = createClient()
    await supabase.from("tide_tables").delete().eq("id", id)
    setTideTables(tideTables.filter((t) => t.id !== id))
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search tide tables..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Station</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Downloads</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTideTables.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No tide tables found
                </TableCell>
              </TableRow>
            ) : (
              filteredTideTables.map((table) => (
                <TableRow key={table.id}>
                  <TableCell className="font-medium">{table.title}</TableCell>
                  <TableCell>{table.station}</TableCell>
                  <TableCell>{table.year}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {table.download_count}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={table.is_published ? "default" : "secondary"}>
                      {table.is_published ? "Published" : "Draft"}
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
                          <Link href={`/admin/tide-tables/${table.id}`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => togglePublish(table.id, table.is_published)}>
                          {table.is_published ? (
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
                        <DropdownMenuItem onClick={() => handleDelete(table.id)} className="text-destructive">
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
