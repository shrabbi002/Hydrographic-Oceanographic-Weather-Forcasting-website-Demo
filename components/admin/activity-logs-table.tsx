"use client"

import { useState } from "react"
import { format } from "date-fns"
import type { ActivityLog } from "@/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface ActivityLogsTableProps {
  logs: ActivityLog[]
}

export function ActivityLogsTable({ logs }: ActivityLogsTableProps) {
  const [search, setSearch] = useState("")

  const filteredLogs = logs.filter(
    (log) =>
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.entity_type?.toLowerCase().includes(search.toLowerCase()),
  )

  const getActionColor = (action: string) => {
    if (action.includes("create")) return "default"
    if (action.includes("update")) return "secondary"
    if (action.includes("delete")) return "destructive"
    return "outline"
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search logs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Entity</TableHead>
              <TableHead>User</TableHead>
              <TableHead>IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No logs found
                </TableCell>
              </TableRow>
            ) : (
              filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(log.created_at), "MMM d, yyyy HH:mm")}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getActionColor(log.action)}>{log.action}</Badge>
                  </TableCell>
                  <TableCell>
                    {log.entity_type && (
                      <span className="text-sm">
                        {log.entity_type}
                        {log.entity_id && <span className="text-muted-foreground"> #{log.entity_id.slice(0, 8)}</span>}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm">{log.user_id?.slice(0, 8) || "-"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{log.ip_address || "-"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
