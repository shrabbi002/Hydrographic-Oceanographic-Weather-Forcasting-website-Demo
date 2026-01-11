"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { PageContent } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

interface PageFormProps {
  pageContent?: PageContent
}

export function PageForm({ pageContent }: PageFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    page_key: pageContent?.page_key || "",
    title: pageContent?.title || "",
    meta_description: pageContent?.meta_description || "",
    is_published: pageContent?.is_published || false,
  })
  const [contentJson, setContentJson] = useState(
    pageContent?.content ? JSON.stringify(pageContent.content, null, 2) : "{}",
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const supabase = createClient()

    try {
      const data = {
        ...formData,
        content: JSON.parse(contentJson),
      }

      if (pageContent) {
        await supabase.from("page_contents").update(data).eq("id", pageContent.id)
      } else {
        await supabase.from("page_contents").insert(data)
      }
      router.push("/admin/pages")
      router.refresh()
    } catch (error) {
      console.error("Error saving page:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Page Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="page_key">Page Key</Label>
              <Input
                id="page_key"
                value={formData.page_key}
                onChange={(e) => setFormData({ ...formData, page_key: e.target.value })}
                placeholder="e.g., about-history"
                required
                disabled={!!pageContent}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="meta_description">Meta Description</Label>
            <Textarea
              id="meta_description"
              value={formData.meta_description}
              onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content (JSON)</Label>
            <Textarea
              id="content"
              value={contentJson}
              onChange={(e) => setContentJson(e.target.value)}
              rows={10}
              className="font-mono text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="is_published"
              checked={formData.is_published}
              onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
            />
            <Label htmlFor="is_published">Published</Label>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : pageContent ? "Update" : "Create"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
