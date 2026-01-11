import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/ui/page-header"
import { MediaGalleryGrid } from "@/components/about/media-gallery-grid"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos and videos from Bangladesh Navy Hydrographic and Oceanographic Center",
}

export default async function GalleryPage() {
  const supabase = await createClient()

  const { data: media } = await supabase
    .from("media_gallery")
    .select("*")
    .eq("is_published", true)
    .order("display_order")

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Photo & Video Gallery"
        description="Explore our collection of photos and videos"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Gallery", href: "/about/gallery" },
        ]}
      />

      <div className="mt-8">
        <MediaGalleryGrid media={media || []} />
      </div>
    </div>
  )
}
