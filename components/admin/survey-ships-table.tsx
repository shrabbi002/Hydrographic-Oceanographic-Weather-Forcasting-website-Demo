"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Pencil, Trash2, Eye, EyeOff, Ship } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { SurveyShip } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface SurveyShipsTableProps {
  ships: SurveyShip[]
}

export function SurveyShipsTable({ ships: initialShips }: SurveyShipsTableProps) {
  const [ships, setShips] = useState(initialShips)
  const [search, setSearch] = useState("")

  const filteredShips = ships.filter((ship) => ship.name.toLowerCase().includes(search.toLowerCase()))

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const supabase = createClient()
    await supabase.from("survey_ships").update({ is_published: !currentStatus }).eq("id", id)
    setShips(ships.map((s) => (s.id === id ? { ...s, is_published: !currentStatus } : s)))
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ship?")) return
    const supabase = createClient()
    await supabase.from("survey_ships").delete().eq("id", id)
    setShips(ships.filter((s) => s.id !== id))
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search ships..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Capability</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredShips.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No ships found
                </TableCell>
              </TableRow>
            ) : (
              filteredShips.map((ship) => (
                <TableRow key={ship.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Ship className="h-4 w-4 text-muted-foreground" />
                      {ship.name}
                    </div>
                  </TableCell>
                  <TableCell>{ship.role || "-"}</TableCell>
                  <TableCell>{ship.capability || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={ship.is_published ? "default" : "secondary"}>
                      {ship.is_published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/survey-ships/${ship.id}`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => togglePublish(ship.id, ship.is_published)}>
                          {ship.is_published ? (
                            <>
                              <EyeOff className="mr-2 h-4 w-4" />
                              Unpublish
                            </>
                          ) : (
                            <>
                              <Eye className="mr-2 h-4 w-4" />
                              Publish
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(ship.id)} className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
