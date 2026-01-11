import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { NewsEvent } from "@/lib/types"

interface LatestNewsProps {
  news: NewsEvent[]
}

export function LatestNews({ news }: LatestNewsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Latest News & Events</CardTitle>
        <Link href="/news">
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {news.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No news available at the moment.</p>
        ) : (
          <div className="space-y-4">
            {news.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="block rounded-lg border p-4 transition-colors hover:bg-muted"
              >
                <div className="flex items-start gap-3">
                  {item.is_event && (
                    <span className="rounded bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                      Event
                    </span>
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium leading-tight">{item.title}</h3>
                    {item.excerpt && <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>}
                    <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {item.published_at ? new Date(item.published_at).toLocaleDateString() : "Recent"}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
