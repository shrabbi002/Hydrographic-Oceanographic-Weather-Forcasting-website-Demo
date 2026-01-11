"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

interface DemoUser {
  id: string
  email: string
}

interface DemoProfile {
  id: string
  full_name: string
  role: string
  email: string
}

interface DemoSession {
  user: DemoUser
  profile: DemoProfile
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [session, setSession] = useState<DemoSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedSession = localStorage.getItem("demo_session")
    if (storedSession) {
      try {
        const parsed = JSON.parse(storedSession)
        setSession(parsed)
      } catch {
        router.push("/auth/login")
      }
    } else {
      router.push("/auth/login")
    }
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar user={session.user} profile={session.profile} />
      <div className="flex flex-1 flex-col">
        <AdminHeader user={session.user} profile={session.profile} />
        <main className="flex-1 overflow-auto bg-muted/30 p-6">{children}</main>
      </div>
    </div>
  )
}
