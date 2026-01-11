import { Waves, Download, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { TideTable } from "@/lib/types"

interface TideTablesListingProps {
  groupedTables: Record<number, TideTable[]>
}

export function TideTablesListing({ groupedTables }: TideTablesListingProps) {
  const years = Object.keys(groupedTables)
    .map(Number)
    .sort((a, b) => b - a)

  if (years.length === 0) {
    return (
      <div className="text-center py-16">
        <Waves className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No tide tables available</h3>
        <p className="text-muted-foreground">Please check back later for updates.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {years.map((year) => (
        <Card key={year}>
          <CardHeader className="bg-muted/50">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              {year} Tide Tables
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {groupedTables[year].map((table) => (
                <div key={table.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Waves className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{table.title}</h3>
                      <p className="text-sm text-muted-foreground">Station: {table.station}</p>
                    </div>
                  </div>
                  {table.file_url ? (
                    <Button asChild>
                      <a href={table.file_url} download>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </a>
                    </Button>
                  ) : (
                    <Button disabled>Not Available</Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
