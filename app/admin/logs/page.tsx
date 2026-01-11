"use client"

import { useState, useEffect } from "react"
import { Activity, FileText, Upload, Settings, User, LogIn, Filter } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DEMO_LOGS } from "@/lib/demo-data"
import type { ActivityLog } from "@/lib/types"

const actionIcons: Record<string, typeof Activity> = {
  create: Upload,
  update: FileText,
  delete: Activity,
  login: LogIn,
  settings: Settings,
}

const actionColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  create: "default",
  update: "secondary",
  delete: "destructive",
  login: "outline",
}

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    setLogs(DEMO_LOGS)
    setIsLoading(false)
  }, [])

  const filteredLogs = filter === "all" ? logs : logs.filter((log) => log.action === filter)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-muted"></div>
        <div className="h-64 animate-pulse rounded-lg bg-muted"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Activity Logs</h1>
          <p className="text-muted-foreground">View recent system activity</p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="create">Create</SelectItem>
            <SelectItem value="update">Update</SelectItem>
            <SelectItem value="delete">Delete</SelectItem>
            <SelectItem value="login">Login</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredLogs.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <Activity className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No activity logs</h3>
          <p className="text-muted-foreground">Activity logs will appear here as actions are performed.</p>
        </div>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => {
                const Icon = actionIcons[log.action] || Activity
                return (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Badge variant={actionColors[log.action] || "outline"} className="capitalize">
                          {log.action}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      {log.entity_type && (
                        <div>
                          <span className="capitalize">{log.entity_type}</span>
                          {log.entity_id && <span className="text-muted-foreground"> #{log.entity_id}</span>}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{log.user_id === "demo" ? "Demo Admin" : `User ${log.user_id}`}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{new Date(log.created_at).toLocaleDateString()}</div>
                        <div className="text-muted-foreground">{new Date(log.created_at).toLocaleTimeString()}</div>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
