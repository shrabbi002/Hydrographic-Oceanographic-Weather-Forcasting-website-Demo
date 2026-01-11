"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MoreHorizontal, Pencil, Trash2, Eye, EyeOff, ImageIcon, Video } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { MediaGallery } from "@/lib/types"
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

interface MediaTableProps {
  media: MediaGallery[]
}

export function MediaTable({ media: initialMedia }: MediaTableProps) {
  const [media, setMedia] = useState(initialMedia)
  const [search, setSearch] = useState("")

  const filteredMedia = media.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const supabase = createClient()
    await supabase.from("media_gallery").update({ is_published: !currentStatus }).eq("id", id)
    setMedia(media.map((m) => (m.id === id ? { ...m, is_published: !currentStatus } : m)))
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media?")) return
    const supabase = createClient()
    await supabase.from("media_gallery").delete().eq("id", id)
    setMedia(media.filter((m) => m.id !== id))
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search media..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Preview</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMedia.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No media found
                </TableCell>
              </TableRow>
            ) : (
              filteredMedia.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.thumbnail_url || item.url ? (
                      <Image
                        src={item.thumbnail_url || item.url}
                        alt={item.title}
                        width={60}
                        height={40}
                        className="rounded object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-15 items-center justify-center rounded bg-muted">
                        {item.media_type === "video" ? (
                          <Video className="h-4 w-4" />
                        ) : (
                          <ImageIcon className="h-4 w-4" />
                        )}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {item.media_type === "video" ? (
                        <>
                          <Video className="mr-1 h-3 w-3" />
                          Video
                        </>
                      ) : (
                        <>
                          <ImageIcon className="mr-1 h-3 w-3" />
                          Image
                        </>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.category || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={item.is_published ? "default" : "secondary"}>
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
                          <Link href={`/admin/media/${item.id}`}>
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
