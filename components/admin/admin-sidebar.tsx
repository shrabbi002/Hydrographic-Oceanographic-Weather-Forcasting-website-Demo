"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Map,
  Waves,
  FileWarning,
  BookOpen,
  Globe,
  Users,
  FileText,
  Settings,
  GraduationCap,
  ImageIcon,
  Ship,
  Newspaper,
  Inbox,
  Activity,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AdminSidebarProps {
  user: { id: string; email: string }
  profile: { id: string; full_name: string; role: string; email: string } | null
}

const mainNavItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Charts", href: "/admin/charts", icon: Map },
  { title: "Tide Tables", href: "/admin/tide-tables", icon: Waves },
  { title: "Notices to Mariners", href: "/admin/notices", icon: FileWarning },
  { title: "Publications", href: "/admin/publications", icon: BookOpen },
  { title: "GIS Layers", href: "/admin/gis-layers", icon: Globe },
]

const contentNavItems = [
  { title: "News & Events", href: "/admin/news", icon: Newspaper },
  { title: "Courses", href: "/admin/courses", icon: GraduationCap },
  { title: "Survey Ships", href: "/admin/survey-ships", icon: Ship },
  { title: "Media Gallery", href: "/admin/media", icon: ImageIcon },
  { title: "Pages", href: "/admin/pages", icon: FileText },
]

const systemNavItems = [
  { title: "Form Submissions", href: "/admin/submissions", icon: Inbox },
  { title: "Users", href: "/admin/users", icon: Users, adminOnly: true },
  { title: "Activity Logs", href: "/admin/logs", icon: Activity, adminOnly: true },
  { title: "Settings", href: "/admin/settings", icon: Settings, adminOnly: true },
]

export function AdminSidebar({ profile }: AdminSidebarProps) {
  const pathname = usePathname()
  const isAdmin = profile?.role === "admin"

  return (
    <aside className="hidden w-64 border-r bg-card lg:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b px-4">
          <Link href="/admin" className="flex items-center gap-3">
            <Image
              src="/images/navy-logo.png"
              alt="BNHOC Logo"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-tight">BNHOC</span>
              <span className="text-xs text-muted-foreground">Admin Panel</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-6 overflow-y-auto p-4">
          {/* Main Navigation */}
          <div>
            <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Products</h3>
            <ul className="space-y-1">
              {mainNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Content Navigation */}
          <div>
            <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Content</h3>
            <ul className="space-y-1">
              {contentNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* System Navigation */}
          <div>
            <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">System</h3>
            <ul className="space-y-1">
              {systemNavItems.map((item) => {
                if (item.adminOnly && !isAdmin) return null
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        pathname === item.href
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t p-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Globe className="h-4 w-4" />
            View Website
          </Link>
        </div>
      </div>
    </aside>
  )
}
