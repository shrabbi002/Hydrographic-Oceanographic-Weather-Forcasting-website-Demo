"use client"

import { useEffect, useState } from "react"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { RecentActivity } from "@/components/admin/recent-activity"
import { QuickActions } from "@/components/admin/quick-actions"
import { PendingSubmissions } from "@/components/admin/pending-submissions"

const DEMO_STATS = {
  charts: 156,
  tideTables: 24,
  notices: 89,
  publications: 42,
}

const DEMO_SUBMISSIONS = [
  {
    id: "1",
    form_type: "chart_correction",
    status: "pending",
    submitted_by_email: "captain@ship.com",
    created_at: new Date().toISOString(),
    data: {},
  },
  {
    id: "2",
    form_type: "data_request",
    status: "pending",
    submitted_by_email: "researcher@university.edu",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    data: {},
  },
]

const DEMO_LOGS = [
  {
    id: "1",
    user_id: "demo",
    action: "create",
    entity_type: "chart",
    entity_id: "1",
    details: {},
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    user_id: "demo",
    action: "update",
    entity_type: "notice",
    entity_id: "5",
    details: {},
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "3",
    user_id: "demo",
    action: "login",
    entity_type: "user",
    entity_id: "demo",
    details: {},
    created_at: new Date(Date.now() - 7200000).toISOString(),
  },
]

export default function AdminDashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-48 animate-pulse rounded bg-muted"></div>
          <div className="mt-2 h-4 w-64 animate-pulse rounded bg-muted"></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-lg bg-muted"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the BNHOC Admin Panel</p>
      </div>

      <DashboardStats stats={DEMO_STATS} />

      <div className="grid gap-6 lg:grid-cols-2">
        <QuickActions />
        <PendingSubmissions submissions={DEMO_SUBMISSIONS} />
      </div>

      <RecentActivity logs={DEMO_LOGS} />
    </div>
  )
}
