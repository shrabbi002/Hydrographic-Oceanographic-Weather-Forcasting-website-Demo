"use client"

import { useRouter } from "next/navigation"
import { FileWarning, Download, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { NoticeToMariners } from "@/lib/types"

interface NoticesListingProps {
  notices: NoticeToMariners[]
  years: number[]
  currentYear?: string
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function NoticesListing({ notices, years, currentYear }: NoticesListingProps) {
  const router = useRouter()

  const handleYearChange = (year: string) => {
    if (year === "all") {
      router.push("/products/notices")
    } else {
      router.push(`/products/notices?year=${year}`)
    }
  }

  if (notices.length === 0) {
    return (
      <div className="text-center py-16">
        <FileWarning className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No notices available</h3>
        <p className="text-muted-foreground">Please check back later for updates.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Year Filter */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Filter by Year:</span>
        <Select value={currentYear || "all"} onValueChange={handleYearChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Years" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Notices Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {notices.map((notice) => (
          <Card key={notice.id} className={notice.is_archived ? "opacity-60" : ""}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <FileWarning className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{notice.notice_number}</Badge>
                    {notice.is_archived && <Badge variant="secondary">Archived</Badge>}
                  </div>
                  <h3 className="mt-2 font-medium leading-tight">{notice.title}</h3>
                  <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {monthNames[notice.month - 1]} {notice.year}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                {notice.file_url ? (
                  <Button className="w-full" asChild>
                    <a href={notice.file_url} download>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </a>
                  </Button>
                ) : (
                  <Button className="w-full" disabled>
                    Not Available
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
