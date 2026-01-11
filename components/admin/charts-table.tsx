"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Pencil, Trash2, Eye, EyeOff, Map, Navigation } from "lucide-react"
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
import type { Chart } from "@/lib/types"

interface ChartsTableProps {
  charts: Chart[]
  onUpdate?: (charts: Chart[]) => void
}

export function ChartsTable({ charts, onUpdate }: ChartsTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!deleteId) return
    setIsDeleting(true)

    const updatedCharts = charts.filter((c) => c.id !== deleteId)
    onUpdate?.(updatedCharts)

    setDeleteId(null)
    setIsDeleting(false)
  }

  const togglePublish = (chart: Chart) => {
    const updatedCharts = charts.map((c) => (c.id === chart.id ? { ...c, is_published: !c.is_published } : c))
    onUpdate?.(updatedCharts)
  }

  if (charts.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center">
        <Map className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No charts yet</h3>
        <p className="text-muted-foreground">Get started by adding your first chart.</p>
        <Link href="/admin/charts/new">
          <Button className="mt-4">Add Chart</Button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Chart</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Downloads</TableHead>
              <TableHead className="w-[70px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {charts.map((chart) => (
              <TableRow key={chart.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      {chart.chart_type === "enc" ? (
                        <Navigation className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Map className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{chart.title}</div>
                      <div className="text-sm text-muted-foreground">{chart.chart_number}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={chart.chart_type === "enc" ? "default" : "secondary"}>
                    {chart.chart_type === "enc" ? "ENC" : "Paper"}
                  </Badge>
                </TableCell>
                <TableCell>{chart.area || "-"}</TableCell>
                <TableCell>{chart.year || "-"}</TableCell>
                <TableCell>
                  <Badge variant={chart.is_published ? "default" : "outline"}>
                    {chart.is_published ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell>{chart.download_count}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/charts/${chart.id}`}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => togglePublish(chart)}>
                        {chart.is_published ? (
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
                        onClick={() => setDeleteId(chart.id)}
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

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Chart</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this chart? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
