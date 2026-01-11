"use client"

import { useState } from "react"
import { Map, Navigation, Download, Eye, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import type { Chart } from "@/lib/types"

interface ChartsListingProps {
  charts: Chart[]
}

export function ChartsListing({ charts }: ChartsListingProps) {
  const [selectedChart, setSelectedChart] = useState<Chart | null>(null)

  if (charts.length === 0) {
    return (
      <div className="text-center py-16">
        <Map className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No charts found</h3>
        <p className="text-muted-foreground">Try adjusting your filters to find more charts.</p>
      </div>
    )
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {charts.length} chart{charts.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {charts.map((chart) => (
          <Card key={chart.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex">
                {/* Preview area */}
                <div className="flex h-full w-24 shrink-0 items-center justify-center bg-muted">
                  {chart.chart_type === "enc" ? (
                    <Navigation className="h-10 w-10 text-muted-foreground" />
                  ) : (
                    <Map className="h-10 w-10 text-muted-foreground" />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant={chart.chart_type === "enc" ? "default" : "secondary"}>
                          {chart.chart_type === "enc" ? "ENC" : "Paper"}
                        </Badge>
                        <span className="text-sm font-mono text-muted-foreground">{chart.chart_number}</span>
                      </div>
                      <h3 className="mt-1 font-medium leading-tight">{chart.title}</h3>
                    </div>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {chart.scale && <span>Scale: {chart.scale}</span>}
                    {chart.area && <span>Area: {chart.area}</span>}
                    {chart.year && <span>Year: {chart.year}</span>}
                  </div>

                  <div className="mt-auto flex gap-2 pt-3">
                    <Button variant="outline" size="sm" onClick={() => setSelectedChart(chart)}>
                      <Info className="mr-1 h-4 w-4" />
                      Details
                    </Button>
                    {chart.preview_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={chart.preview_url} target="_blank" rel="noopener noreferrer">
                          <Eye className="mr-1 h-4 w-4" />
                          Preview
                        </a>
                      </Button>
                    )}
                    {chart.file_url && (
                      <Button size="sm" asChild>
                        <a href={chart.file_url} download>
                          <Download className="mr-1 h-4 w-4" />
                          Download
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Details Dialog */}
      <Dialog open={!!selectedChart} onOpenChange={() => setSelectedChart(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedChart?.chart_type === "enc" ? <Navigation className="h-5 w-5" /> : <Map className="h-5 w-5" />}
              {selectedChart?.title}
            </DialogTitle>
            <DialogDescription>Chart Number: {selectedChart?.chart_number}</DialogDescription>
          </DialogHeader>
          {selectedChart && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Type</label>
                  <p>{selectedChart.chart_type === "enc" ? "Electronic Navigational Chart" : "Paper Chart"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Scale</label>
                  <p>{selectedChart.scale || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Area</label>
                  <p>{selectedChart.area || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Year</label>
                  <p>{selectedChart.year || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Jurisdiction</label>
                  <p>{selectedChart.jurisdiction || "Bangladesh"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Downloads</label>
                  <p>{selectedChart.download_count}</p>
                </div>
              </div>
              {selectedChart.description && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Description</label>
                  <p className="text-sm">{selectedChart.description}</p>
                </div>
              )}
              <div className="flex gap-2 pt-4">
                {selectedChart.preview_url && (
                  <Button variant="outline" asChild>
                    <a href={selectedChart.preview_url} target="_blank" rel="noopener noreferrer">
                      <Eye className="mr-2 h-4 w-4" />
                      View Preview
                    </a>
                  </Button>
                )}
                {selectedChart.file_url && (
                  <Button asChild>
                    <a href={selectedChart.file_url} download>
                      <Download className="mr-2 h-4 w-4" />
                      Download Chart
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
