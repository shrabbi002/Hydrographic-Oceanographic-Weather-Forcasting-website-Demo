"use client"

import { MapPin } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Location } from "./marine-weather-dashboard"

interface LocationSelectorProps {
  locations: Location[]
  selectedLocation: Location
  onLocationChange: (location: Location) => void
}

export function LocationSelector({ locations, selectedLocation, onLocationChange }: LocationSelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <MapPin className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Select Location</p>
        <Select
          value={selectedLocation.name}
          onValueChange={(value) => {
            const location = locations.find((l) => l.name === value)
            if (location) onLocationChange(location)
          }}
        >
          <SelectTrigger className="w-[200px] border-0 p-0 h-auto text-base font-semibold shadow-none focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location.name} value={location.name}>
                {location.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
