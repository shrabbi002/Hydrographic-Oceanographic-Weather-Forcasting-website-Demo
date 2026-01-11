import { Map, Waves, FileWarning, BookOpen, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardStatsProps {
  stats: {
    charts: number
    tideTables: number
    notices: number
    publications: number
  }
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      title: "Total Charts",
      value: stats.charts,
      icon: Map,
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Tide Tables",
      value: stats.tideTables,
      icon: Waves,
      trend: "+5%",
      trendUp: true,
    },
    {
      title: "Notices to Mariners",
      value: stats.notices,
      icon: FileWarning,
      trend: "+8%",
      trendUp: true,
    },
    {
      title: "Publications",
      value: stats.publications,
      icon: BookOpen,
      trend: "-2%",
      trendUp: false,
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="mt-1 flex items-center text-xs">
              {stat.trendUp ? (
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span className={stat.trendUp ? "text-green-500" : "text-red-500"}>{stat.trend}</span>
              <span className="ml-1 text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
