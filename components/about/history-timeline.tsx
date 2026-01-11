import { Anchor, Ship, Map, Monitor, Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const timelineEvents = [
  {
    year: "1971",
    title: "Independence of Bangladesh",
    description:
      "Following the liberation war, Bangladesh emerged as an independent nation with significant maritime territory to survey and chart.",
    icon: Anchor,
  },
  {
    year: "1978",
    title: "Establishment of Hydrographic Department",
    description:
      "The Bangladesh Navy established its Hydrographic Department to systematically survey and chart national waters.",
    icon: Ship,
  },
  {
    year: "1990",
    title: "First Digital Chart Published",
    description:
      "Transition to digital cartography began with the publication of the first digitally produced nautical chart.",
    icon: Map,
  },
  {
    year: "2010",
    title: "ENC Production Commenced",
    description:
      "Started production of Electronic Navigational Charts (ENC) in accordance with IHO standards for ECDIS systems.",
    icon: Monitor,
  },
  {
    year: "2020",
    title: "GIS Integration Implemented",
    description:
      "Full integration of Geographic Information Systems for advanced spatial data management and visualization.",
    icon: Globe,
  },
]

export function HistoryTimeline() {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-0.5" />

      <div className="space-y-8">
        {timelineEvents.map((event, index) => (
          <div
            key={event.year}
            className={`relative flex items-start gap-6 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
          >
            {/* Timeline dot */}
            <div className="absolute left-8 z-10 -translate-x-1/2 md:left-1/2">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-background" />
            </div>

            {/* Content card */}
            <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 1 ? "md:mr-auto" : "md:ml-auto"}`}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <event.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-primary">{event.year}</div>
                      <h3 className="mt-1 text-lg font-semibold">{event.title}</h3>
                      <p className="mt-2 text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
