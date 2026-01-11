import Link from "next/link"
import { Map, Waves, FileWarning, BookOpen, Navigation, CloudSun } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const tiles = [
  {
    title: "Paper Charts",
    description: "Official nautical charts for Bangladesh waters",
    href: "/products/charts?type=paper",
    icon: Map,
    color: "bg-chart-1",
  },
  {
    title: "Electronic Charts",
    description: "ENC in S-57/S-101 format",
    href: "/products/charts?type=enc",
    icon: Navigation,
    color: "bg-chart-2",
  },
  {
    title: "Tide Tables",
    description: "Annual tide predictions",
    href: "/products/tide-tables",
    icon: Waves,
    color: "bg-chart-3",
  },
  {
    title: "Notices to Mariners",
    description: "Navigation warnings & corrections",
    href: "/products/notices",
    icon: FileWarning,
    color: "bg-chart-4",
  },
  {
    title: "Publications",
    description: "Sailing directions & guides",
    href: "/products/publications",
    icon: BookOpen,
    color: "bg-chart-5",
  },
  {
    title: "Marine Weather",
    description: "Weather & astronomical info",
    href: "/marine-weather",
    icon: CloudSun,
    color: "bg-chart-1",
  },
]

export function QuickAccessTiles() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">Quick Access</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Access our most popular products and services with a single click
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((tile) => (
            <Link key={tile.title} href={tile.href}>
              <Card className="group h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                <CardContent className="flex items-start gap-4 p-6">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${tile.color} text-primary-foreground transition-transform group-hover:scale-110`}
                  >
                    <tile.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground group-hover:text-primary transition-colors">
                      {tile.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{tile.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
