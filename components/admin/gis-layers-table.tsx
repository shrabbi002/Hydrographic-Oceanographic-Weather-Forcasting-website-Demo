"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Pencil, Trash2, Eye, EyeOff, Layers } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { GISLayer } from "@/lib/types"
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

interface GISLayersTableProps {
  layers: GISLayer[]
}

export function GISLayersTable({ layers: initialLayers }: GISLayersTableProps) {
  const [layers, setLayers] = useState(initialLayers)
  const [search, setSearch] = useState("")

  const filteredLayers = layers.filter((layer) => layer.name.toLowerCase().includes(search.toLowerCase()))

  const toggleEnabled = async (id: string, currentStatus: boolean) => {
    const supabase = createClient()
    await supabase.from("gis_layers").update({ is_enabled: !currentStatus }).eq("id", id)
    setLayers(layers.map((l) => (l.id === id ? { ...l, is_enabled: !currentStatus } : l)))
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this layer?")) return
    const supabase = createClient()
    await supabase.from("gis_layers").delete().eq("id", id)
    setLayers(layers.filter((l) => l.id !== id))
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search layers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Scale</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLayers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No layers found
                </TableCell>
              </TableRow>
            ) : (
              filteredLayers.map((layer) => (
                <TableRow key={layer.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-muted-foreground" />
                      {layer.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{layer.layer_type}</Badge>
                  </TableCell>
                  <TableCell>{layer.scale || "-"}</TableCell>
                  <TableCell>{layer.location || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={layer.is_enabled ? "default" : "secondary"}>
                      {layer.is_enabled ? "Enabled" : "Disabled"}
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
                          <Link href={`/admin/gis-layers/${layer.id}`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleEnabled(layer.id, layer.is_enabled)}>
                          {layer.is_enabled ? (
                            <>
                              <EyeOff className="mr-2 h-4 w-4" />
                              Disable
                            </>
                          ) : (
                            <>
                              <Eye className="mr-2 h-4 w-4" />
                              Enable
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(layer.id)} className="text-destructive">
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
