"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Waves, MoreHorizontal, Pencil, Trash2, Eye, EyeOff } from "lucide-react"
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
import { getDemoTideTables, saveDemoTideTables } from "@/lib/demo-data"
import type { TideTable } from "@/lib/types"

export default function AdminTideTablesPage() {
  const [tideTables, setTideTables] = useState<TideTable[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    setTideTables(getDemoTideTables())
    setIsLoading(false)
  }, [])

  const handleDelete = () => {
    if (!deleteId) return
    const updated = tideTables.filter((t) => t.id !== deleteId)
    setTideTables(updated)
    saveDemoTideTables(updated)
    setDeleteId(null)
  }

  const togglePublish = (table: TideTable) => {
    const updated = tideTables.map((t) => (t.id === table.id ? { ...t, is_published: !t.is_published } : t))
    setTideTables(updated)
    saveDemoTideTables(updated)
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
          <h1 className="text-2xl font-bold tracking-tight">Tide Tables</h1>
          <p className="text-muted-foreground">Manage annual tide predictions</p>
        </div>
        <Link href="/admin/tide-tables/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Tide Table
          </Button>
        </Link>
      </div>

      {tideTables.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <Waves className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No tide tables yet</h3>
          <p className="text-muted-foreground">Get started by adding your first tide table.</p>
          <Link href="/admin/tide-tables/new">
            <Button className="mt-4">Add Tide Table</Button>
          </Link>
        </div>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Station</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead className="w-[70px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {tideTables.map((table) => (
                <TableRow key={table.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <Waves className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <span className="font-medium">{table.station}</span>
                    </div>
                  </TableCell>
                  <TableCell>{table.year}</TableCell>
                  <TableCell>
                    <Badge variant={table.is_published ? "default" : "outline"}>
                      {table.is_published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell>{table.download_count}</TableCell>
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
                        <DropdownMenuItem onClick={() => togglePublish(table)}>
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
                        <DropdownMenuItem
                          onClick={() => setDeleteId(table.id)}
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
            <AlertDialogTitle>Delete Tide Table</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this tide table? This action cannot be undone.
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
