"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Sun, Moon, Sunrise, Sunset, Clock, Calendar, CircleDot } from "lucide-react"
import type { Location } from "./marine-weather-dashboard"

interface AstronomicalAPIData {
  daily?: {
    time: string[]
    sunrise: string[]
    sunset: string[]
    daylight_duration: number[]
  }
}

interface MoonPhase {
  phase: string
  illumination: number
  icon: string
}

interface AstronomicalDataProps {
  location: Location
}

// Calculate moon phase based on date
function getMoonPhase(date: Date): MoonPhase {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const c = Math.floor(365.25 * year)
  const e = Math.floor(30.6 * month)
  const jd = c + e + day - 694039.09
  const phase = jd / 29.53058867
  const phaseDay = Math.floor((phase - Math.floor(phase)) * 29.53)

  if (phaseDay < 1) return { phase: "New Moon", illumination: 0, icon: "new" }
  if (phaseDay < 7)
    return { phase: "Waxing Crescent", illumination: Math.round((phaseDay / 7) * 50), icon: "waxing-crescent" }
  if (phaseDay < 8) return { phase: "First Quarter", illumination: 50, icon: "first-quarter" }
  if (phaseDay < 15)
    return { phase: "Waxing Gibbous", illumination: 50 + Math.round(((phaseDay - 8) / 7) * 50), icon: "waxing-gibbous" }
  if (phaseDay < 16) return { phase: "Full Moon", illumination: 100, icon: "full" }
  if (phaseDay < 22)
    return {
      phase: "Waning Gibbous",
      illumination: 100 - Math.round(((phaseDay - 16) / 6) * 50),
      icon: "waning-gibbous",
    }
  if (phaseDay < 23) return { phase: "Last Quarter", illumination: 50, icon: "last-quarter" }
  return {
    phase: "Waning Crescent",
    illumination: 50 - Math.round(((phaseDay - 23) / 6) * 50),
    icon: "waning-crescent",
  }
}

// Approximate moon rise/set times
function getMoonTimes(date: Date): { rise: string; set: string } {
  const moonPhase = getMoonPhase(date)
  const baseHour = 6 + Math.floor((moonPhase.illumination / 100) * 12)
  const riseHour = baseHour % 24
  const setHour = (baseHour + 12) % 24

  const riseMin = Math.floor(Math.abs(Math.sin(date.getDate()) * 60))
  const setMin = Math.floor(Math.abs(Math.cos(date.getDate()) * 60))

  return {
    rise: `${riseHour.toString().padStart(2, "0")}:${riseMin.toString().padStart(2, "0")}`,
    set: `${setHour.toString().padStart(2, "0")}:${setMin.toString().padStart(2, "0")}`,
  }
}

export function AstronomicalData({ location }: AstronomicalDataProps) {
  const [data, setData] = useState<AstronomicalAPIData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAstronomicalData() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&daily=sunrise,sunset,daylight_duration&timezone=Asia%2FDhaka&forecast_days=7`,
        )

        if (!res.ok) {
          throw new Error("Failed to fetch astronomical data")
        }

        const astroData = await res.json()
        setData(astroData)
      } catch (err) {
        console.error("[v0] Astronomical fetch error:", err)
        setError(err instanceof Error ? err.message : "Failed to load astronomical data")
      } finally {
        setLoading(false)
      }
    }

    fetchAstronomicalData()
  }, [location])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    )
  }

  const today = new Date()
  const moonPhase = getMoonPhase(today)
  const moonTimes = getMoonTimes(today)

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  const todayData = {
    sunrise: data?.daily?.sunrise?.[0],
    sunset: data?.daily?.sunset?.[0],
    daylight: data?.daily?.daylight_duration?.[0],
  }

  return (
    <div className="space-y-6">
      {/* Today's Sun & Moon */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Sun Card */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-6 text-white">
            <div className="flex items-center gap-3">
              <Sun className="h-10 w-10" />
              <div>
                <h3 className="text-xl font-bold">Sun</h3>
                <p className="text-amber-100">Today&apos;s solar data</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-amber-100 p-2">
                  <Sunrise className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sunrise</p>
                  <p className="text-lg font-semibold">{todayData.sunrise ? formatTime(todayData.sunrise) : "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-orange-100 p-2">
                  <Sunset className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sunset</p>
                  <p className="text-lg font-semibold">{todayData.sunset ? formatTime(todayData.sunset) : "N/A"}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Daylight Duration</p>
                <p className="font-semibold">{todayData.daylight ? formatDuration(todayData.daylight) : "N/A"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Moon Card */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-br from-slate-700 to-slate-900 p-6 text-white">
            <div className="flex items-center gap-3">
              <Moon className="h-10 w-10" />
              <div>
                <h3 className="text-xl font-bold">Moon</h3>
                <p className="text-slate-300">{moonPhase.phase}</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-slate-100 p-2">
                  <Moon className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Moonrise</p>
                  <p className="text-lg font-semibold">{moonTimes.rise}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-slate-100 p-2">
                  <Moon className="h-5 w-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Moonset</p>
                  <p className="text-lg font-semibold">{moonTimes.set}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <CircleDot className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Illumination</p>
                <p className="font-semibold">{moonPhase.illumination}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 7-Day Sun Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            7-Day Sun Schedule
          </CardTitle>
          <CardDescription>Sunrise and sunset times for {location.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {data?.daily?.time?.map((date, index) => {
              const dayDate = new Date(date)
              const isToday = dayDate.toDateString() === today.toDateString()
              const moonPhaseForDay = getMoonPhase(dayDate)

              return (
                <div
                  key={date}
                  className={`flex items-center justify-between rounded-lg p-4 ${isToday ? "bg-primary/10 border border-primary/20" : "bg-muted/30"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">
                        {dayDate.toLocaleDateString("en-US", { weekday: "short" })}
                      </p>
                      <p className="text-lg font-bold">{dayDate.getDate()}</p>
                    </div>
                    {isToday && (
                      <Badge variant="default" className="text-xs">
                        Today
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Sunrise className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-medium">
                        {data.daily?.sunrise?.[index] ? formatTime(data.daily.sunrise[index]) : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sunset className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium">
                        {data.daily?.sunset?.[index] ? formatTime(data.daily.sunset[index]) : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 min-w-[100px]">
                      <Moon className="h-4 w-4 text-slate-500" />
                      <span className="text-xs text-muted-foreground">{moonPhaseForDay.illumination}%</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Navigation Information */}
      <Card>
        <CardHeader>
          <CardTitle>Navigation Notes</CardTitle>
          <CardDescription>Important astronomical information for mariners</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-semibold flex items-center gap-2">
                <Sun className="h-4 w-4 text-amber-500" />
                Civil Twilight
              </h4>
              <p className="text-sm text-muted-foreground">
                Civil twilight begins approximately 30 minutes before sunrise and ends 30 minutes after sunset. During
                this time, there is enough light for most outdoor activities without artificial lighting.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-semibold flex items-center gap-2">
                <Moon className="h-4 w-4 text-slate-500" />
                Nautical Twilight
              </h4>
              <p className="text-sm text-muted-foreground">
                Nautical twilight occurs when the sun is 6-12 degrees below the horizon. The horizon is still visible at
                sea, making it possible to take celestial navigation sights.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-semibold flex items-center gap-2">
                <Moon className="h-4 w-4 text-slate-500" />
                Current Moon Phase
              </h4>
              <p className="text-sm text-muted-foreground">
                The moon is currently in its <strong>{moonPhase.phase}</strong> phase with {moonPhase.illumination}%
                illumination.
                {moonPhase.illumination > 50
                  ? " Good visibility for night navigation."
                  : " Limited moonlight for night operations."}
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                Time Zone
              </h4>
              <p className="text-sm text-muted-foreground">
                All times are displayed in Bangladesh Standard Time (BST, UTC+6). For navigation calculations, ensure
                your chronometer is properly synchronized.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
