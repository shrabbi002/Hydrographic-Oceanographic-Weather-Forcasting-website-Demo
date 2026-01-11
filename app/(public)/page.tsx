import { createClient } from "@/lib/supabase/server"
import { HeroSection } from "@/components/home/hero-section"
import { QuickAccessTiles } from "@/components/home/quick-access-tiles"
import { ChiefMessage } from "@/components/home/chief-message"
import { LatestNews } from "@/components/home/latest-news"
import { RecentNotices } from "@/components/home/recent-notices"
import { SearchSection } from "@/components/home/search-section"
import { StatsSection } from "@/components/home/stats-section"

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch latest news/events
  const { data: news } = await supabase
    .from("news_events")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(3)

  // Fetch recent notices to mariners
  const { data: notices } = await supabase
    .from("notices_to_mariners")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div className="flex flex-col">
      <HeroSection />
      <SearchSection />
      <QuickAccessTiles />
      <StatsSection />
      <ChiefMessage />
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <LatestNews news={news || []} />
          <RecentNotices notices={notices || []} />
        </div>
      </div>
    </div>
  )
}
