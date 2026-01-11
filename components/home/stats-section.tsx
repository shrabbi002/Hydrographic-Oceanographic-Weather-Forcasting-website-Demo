import { Map, Ship, FileText, Users } from "lucide-react"

const stats = [
  { label: "Nautical Charts", value: "150+", icon: Map },
  { label: "Survey Ships", value: "3", icon: Ship },
  { label: "Publications", value: "50+", icon: FileText },
  { label: "Trained Personnel", value: "500+", icon: Users },
]

export function StatsSection() {
  return (
    <section className="bg-navy-900 py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-navy-700">
                <stat.icon className="h-8 w-8 text-gold-400" />
              </div>
              <div className="text-4xl font-bold text-primary-foreground">{stat.value}</div>
              <div className="mt-1 text-primary-foreground/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
