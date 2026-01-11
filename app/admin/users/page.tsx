"use client"

import { useState, useEffect } from "react"
import { Users, MoreHorizontal, Shield, User, Trash2 } from "lucide-react"
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

interface DemoProfile {
  id: string
  email: string
  full_name: string
  role: string
  created_at: string
}

const DEMO_USERS: DemoProfile[] = [
  {
    id: "demo-user-id",
    email: "admin@demo.com",
    full_name: "Demo Admin",
    role: "admin",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    email: "editor@bnhoc.navy.mil.bd",
    full_name: "Content Editor",
    role: "editor",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    email: "viewer@bnhoc.navy.mil.bd",
    full_name: "Staff Viewer",
    role: "viewer",
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export default function AdminUsersPage() {
  const [users, setUsers] = useState<DemoProfile[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setUsers(DEMO_USERS)
    setIsLoading(false)
  }, [])

  const changeRole = (id: string, role: string) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, role } : u)))
  }

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
      <div>
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">Manage user accounts and roles</p>
      </div>

      {users.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <Users className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No users yet</h3>
          <p className="text-muted-foreground">Users will appear here after they sign up.</p>
        </div>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-[70px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => {
                const initials = user.full_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()

                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.full_name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={user.role === "admin" ? "default" : user.role === "editor" ? "secondary" : "outline"}
                        className="capitalize"
                      >
                        {user.role === "admin" && <Shield className="mr-1 h-3 w-3" />}
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => changeRole(user.id, "admin")}>
                            <Shield className="mr-2 h-4 w-4" />
                            Make Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => changeRole(user.id, "editor")}>
                            <User className="mr-2 h-4 w-4" />
                            Make Editor
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => changeRole(user.id, "viewer")}>
                            <User className="mr-2 h-4 w-4" />
                            Make Viewer
                          </DropdownMenuItem>
                          {user.id !== "demo-user-id" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive focus:text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete User
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
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
