import { Activity, User, FileText, Settings, Upload } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ActivityLog } from "@/lib/types"

interface RecentActivityProps {
  logs: ActivityLog[]
}

const actionIcons: Record<string, typeof Activity> = {
  create: Upload,
  update: FileText,
  delete: Activity,
  login: User,
  settings: Settings,
}

export function RecentActivity({ logs }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-4">No recent activity</p>
        ) : (
          <div className="space-y-4">
            {logs.map((log) => {
              const Icon = actionIcons[log.action] || Activity
              return (
                <div key={log.id} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{log.action}</span>
                      {log.entity_type && (
                        <span className="text-muted-foreground">
                          {" "}
                          on <span className="capitalize">{log.entity_type}</span>
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">{new Date(log.created_at).toLocaleString()}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
