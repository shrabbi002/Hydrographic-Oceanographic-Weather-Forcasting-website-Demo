"use client"

import { useState } from "react"
import { ImageIcon, Video, X, Play } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import type { MediaGallery } from "@/lib/types"

interface MediaGalleryGridProps {
  media: MediaGallery[]
}

export function MediaGalleryGrid({ media }: MediaGalleryGridProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaGallery | null>(null)

  if (media.length === 0) {
    return (
      <div className="text-center py-16">
        <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No media available</h3>
        <p className="text-muted-foreground">Please check back later for updates.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {media.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedMedia(item)}
            className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
          >
            {/* Thumbnail */}
            <div className="absolute inset-0 flex items-center justify-center bg-navy-800">
              {item.media_type === "video" ? (
                <div className="relative">
                  <Video className="h-12 w-12 text-navy-600" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
              ) : (
                <ImageIcon className="h-12 w-12 text-navy-600" />
              )}
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
              <div className="p-3 text-left">
                <p className="text-sm font-medium text-primary-foreground">{item.title}</p>
                {item.category && <p className="text-xs text-primary-foreground/70">{item.category}</p>}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-4xl p-0">
          <button
            onClick={() => setSelectedMedia(null)}
            className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-primary-foreground hover:bg-black/70"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
          {selectedMedia && (
            <div className="aspect-video bg-black flex items-center justify-center">
              {selectedMedia.media_type === "video" ? (
                <Video className="h-20 w-20 text-muted-foreground" />
              ) : (
                <ImageIcon className="h-20 w-20 text-muted-foreground" />
              )}
            </div>
          )}
          {selectedMedia && (
            <div className="p-4">
              <h3 className="font-semibold">{selectedMedia.title}</h3>
              {selectedMedia.description && (
                <p className="mt-1 text-sm text-muted-foreground">{selectedMedia.description}</p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
