"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface ChartsFilterProps {
  currentType?: string
  currentArea?: string
  currentYear?: string
  areas: string[]
  years: number[]
}

export function ChartsFilter({ currentType, currentArea, currentYear, areas, years }: ChartsFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/products/charts?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push("/products/charts")
  }

  const hasFilters = currentType || currentArea || currentYear

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg">Filters</CardTitle>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="mr-1 h-4 w-4" />
            Clear
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Chart Type */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Chart Type</Label>
          <RadioGroup value={currentType || ""} onValueChange={(value) => updateFilter("type", value || null)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="all" />
              <Label htmlFor="all" className="font-normal">
                All Charts
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paper" id="paper" />
              <Label htmlFor="paper" className="font-normal">
                Paper Charts
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="enc" id="enc" />
              <Label htmlFor="enc" className="font-normal">
                Electronic Charts (ENC)
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Area */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Area</Label>
          <Select value={currentArea || "all"} onValueChange={(value) => updateFilter("area", value || null)}>
            <SelectTrigger>
              <SelectValue placeholder="All Areas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Areas</SelectItem>
              {areas.map((area) => (
                <SelectItem key={area} value={area}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Year */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Year</Label>
          <Select value={currentYear || "all"} onValueChange={(value) => updateFilter("year", value || null)}>
            <SelectTrigger>
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
