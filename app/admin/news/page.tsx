"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Newspaper, Calendar, MoreHorizontal, Pencil, Trash2, Eye, EyeOff, Star } from "lucide-react"
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
import { getDemoNews, saveDemoNews } from "@/lib/demo-data"
import type { NewsEvent } from "@/lib/types"

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    setNews(getDemoNews())
    setIsLoading(false)
  }, [])

  const handleDelete = () => {
    if (!deleteId) return
    const updated = news.filter((n) => n.id !== deleteId)
    setNews(updated)
    saveDemoNews(updated)
    setDeleteId(null)
  }

  const togglePublish = (item: NewsEvent) => {
    const updated = news.map((n) => (n.id === item.id ? { ...n, is_published: !n.is_published } : n))
    setNews(updated)
    saveDemoNews(updated)
  }

  const toggleFeatured = (item: NewsEvent) => {
    const updated = news.map((n) => (n.id === item.id ? { ...n, is_featured: !n.is_featured } : n))
    setNews(updated)
    saveDemoNews(updated)
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
          <h1 className="text-2xl font-bold tracking-tight">News & Events</h1>
          <p className="text-muted-foreground">Manage news articles and upcoming events</p>
        </div>
        <Link href="/admin/news/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add News/Event
          </Button>
        </Link>
      </div>

      {news.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <Newspaper className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No news or events yet</h3>
          <p className="text-muted-foreground">Get started by adding your first news article or event.</p>
          <Link href="/admin/news/new">
            <Button className="mt-4">Add News/Event</Button>
          </Link>
        </div>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[70px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {news.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        {item.type === "event" ? (
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <Newspaper className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.title}</span>
                          {item.is_featured && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                        </div>
                        <div className="text-sm text-muted-foreground line-clamp-1">{item.excerpt}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.type === "event" ? "default" : "secondary"} className="capitalize">
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {item.type === "event" && item.event_date
                      ? new Date(item.event_date).toLocaleDateString()
                      : new Date(item.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.is_published ? "default" : "outline"}>
                      {item.is_published ? "Published" : "Draft"}
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
                          <Link href={`/admin/news/${item.id}`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => togglePublish(item)}>
                          {item.is_published ? (
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
                        <DropdownMenuItem onClick={() => toggleFeatured(item)}>
                          <Star className="mr-2 h-4 w-4" />
                          {item.is_featured ? "Remove Featured" : "Mark Featured"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setDeleteId(item.id)}
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
            <AlertDialogTitle>Delete News/Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this item? This action cannot be undone.
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
