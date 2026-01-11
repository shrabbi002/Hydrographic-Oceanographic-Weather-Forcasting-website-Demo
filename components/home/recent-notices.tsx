import Link from "next/link"
import { FileWarning, Download, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { NoticeToMariners } from "@/lib/types"

interface RecentNoticesProps {
  notices: NoticeToMariners[]
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function RecentNotices({ notices }: RecentNoticesProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Recent Notices to Mariners</CardTitle>
        <Link href="/products/notices">
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {notices.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No notices available at the moment.</p>
        ) : (
          <div className="space-y-3">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="flex items-center gap-4 rounded-lg border p-3 transition-colors hover:bg-muted"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <FileWarning className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{notice.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {monthNames[notice.month - 1]} {notice.year}
                  </p>
                </div>
                {notice.file_url && (
                  <Button variant="ghost" size="icon" asChild>
                    <a href={notice.file_url} download aria-label={`Download ${notice.title}`}>
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
