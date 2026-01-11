import Link from "next/link"
import { Plus, Map, Waves, FileWarning, BookOpen, Upload } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const actions = [
  { label: "Add Chart", href: "/admin/charts/new", icon: Map },
  { label: "Add Tide Table", href: "/admin/tide-tables/new", icon: Waves },
  { label: "Add Notice", href: "/admin/notices/new", icon: FileWarning },
  { label: "Add Publication", href: "/admin/publications/new", icon: BookOpen },
  { label: "Upload Media", href: "/admin/media/new", icon: Upload },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 sm:grid-cols-2">
          {actions.map((action) => (
            <Link key={action.href} href={action.href}>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <action.icon className="mr-2 h-4 w-4" />
                {action.label}
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
