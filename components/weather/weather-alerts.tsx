"use client"

import { AlertTriangle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { Location } from "./marine-weather-dashboard"

interface WeatherAlertsProps {
  location: Location
}

export function WeatherAlerts({ location }: WeatherAlertsProps) {
  // In production, this would fetch real alerts from BMD or similar
  const hasAlert = location.name === "Cox's Bazar" || location.name === "Saint Martin Island"

  if (!hasAlert) {
    return (
      <Alert className="max-w-md border-green-500/50 bg-green-500/10">
        <Info className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-700">Normal Conditions</AlertTitle>
        <AlertDescription className="text-green-600">No weather warnings for {location.name}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert variant="destructive" className="max-w-md">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Marine Weather Advisory</AlertTitle>
      <AlertDescription>Strong winds expected. Small craft advisory in effect.</AlertDescription>
    </Alert>
  )
}
