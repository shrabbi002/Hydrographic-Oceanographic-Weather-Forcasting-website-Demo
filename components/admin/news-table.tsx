"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { MoreHorizontal, Pencil, Trash2, Eye, EyeOff, Calendar } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { NewsEvent } from "@/lib/types"
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

interface NewsTableProps {
  news: NewsEvent[]
}

export function NewsTable({ news: initialNews }: NewsTableProps) {
  const [news, setNews] = useState(initialNews)
  const [search, setSearch] = useState("")

  const filteredNews = news.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const supabase = createClient()
    await supabase.from("news_events").update({ is_published: !currentStatus }).eq("id", id)
    setNews(news.map((n) => (n.id === id ? { ...n, is_published: !currentStatus } : n)))
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return
    const supabase = createClient()
    await supabase.from("news_events").delete().eq("id", id)
    setNews(news.filter((n) => n.id !== id))
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search news & events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No news or events found
                </TableCell>
              </TableRow>
            ) : (
              filteredNews.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    <Badge variant={item.is_event ? "default" : "secondary"}>
                      {item.is_event ? (
                        <>
                          <Calendar className="mr-1 h-3 w-3" />
                          Event
                        </>
                      ) : (
                        "News"
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {item.event_date
                      ? format(new Date(item.event_date), "MMM d, yyyy")
                      : format(new Date(item.created_at), "MMM d, yyyy")}
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
                        <DropdownMenuItem onClick={() => togglePublish(item.id, item.is_published)}>
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
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(item.id)} className="text-destructive">
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
