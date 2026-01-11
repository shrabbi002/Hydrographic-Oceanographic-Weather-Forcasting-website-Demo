"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MoreHorizontal, Shield, ShieldCheck, User, UserX, Users } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import type { Profile } from "@/lib/types"

interface UsersTableProps {
  profiles: Profile[]
  currentUserId: string
}

const roleConfig: Record<string, { label: string; icon: typeof User }> = {
  admin: { label: "Admin", icon: ShieldCheck },
  editor: { label: "Editor", icon: Shield },
  viewer: { label: "Viewer", icon: User },
}

export function UsersTable({ profiles, currentUserId }: UsersTableProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  const updateRole = async (id: string, role: Profile["role"]) => {
    setIsUpdating(true)
    const supabase = createClient()
    await supabase.from("profiles").update({ role }).eq("id", id)
    router.refresh()
    setIsUpdating(false)
  }

  const toggleActive = async (profile: Profile) => {
    setIsUpdating(true)
    const supabase = createClient()
    await supabase.from("profiles").update({ is_active: !profile.is_active }).eq("id", profile.id)
    router.refresh()
    setIsUpdating(false)
  }

  if (profiles.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center">
        <Users className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No users yet</h3>
        <p className="text-muted-foreground">Users will appear here after registration.</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="w-[70px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles.map((profile) => {
            const RoleIcon = roleConfig[profile.role]?.icon || User
            const initials = profile.full_name
              ? profile.full_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              : profile.email?.charAt(0).toUpperCase() || "U"

            return (
              <TableRow key={profile.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{profile.full_name || "No name"}</div>
                      <div className="text-sm text-muted-foreground">{profile.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="flex w-fit items-center gap-1">
                    <RoleIcon className="h-3 w-3" />
                    {roleConfig[profile.role]?.label || profile.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={profile.is_active ? "default" : "outline"}>
                    {profile.is_active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(profile.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" disabled={profile.id === currentUserId || isUpdating}>
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => updateRole(profile.id, "admin")}>
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Make Admin
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateRole(profile.id, "editor")}>
                        <Shield className="mr-2 h-4 w-4" />
                        Make Editor
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateRole(profile.id, "viewer")}>
                        <User className="mr-2 h-4 w-4" />
                        Make Viewer
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => toggleActive(profile)}>
                        <UserX className="mr-2 h-4 w-4" />
                        {profile.is_active ? "Deactivate" : "Activate"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
