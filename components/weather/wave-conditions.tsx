"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Waves, Clock, TrendingUp, Compass, Wind } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import type { Location } from "./marine-weather-dashboard"

interface MarineData {
  hourly?: {
    time: string[]
    wave_height: number[]
    wave_direction: number[]
    wave_period: number[]
    swell_wave_height: number[]
    swell_wave_direction: number[]
    wind_wave_height: number[]
  }
  current?: {
    wave_height?: number
    wave_direction?: number
    wave_period?: number
    swell_wave_height?: number
    swell_wave_direction?: number
    wind_wave_height?: number
  }
}

interface WaveConditionsProps {
  location: Location
}

export function WaveConditions({ location }: WaveConditionsProps) {
  const [data, setData] = useState<MarineData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMarineData() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(
          `https://marine-api.open-meteo.com/v1/marine?latitude=${location.lat}&longitude=${location.lon}&hourly=wave_height,wave_direction,wave_period,swell_wave_height,swell_wave_direction,wind_wave_height&current=wave_height,wave_direction,wave_period,swell_wave_height,swell_wave_direction,wind_wave_height&timezone=Asia%2FDhaka&forecast_days=3`,
        )

        if (!res.ok) {
          throw new Error("Marine data not available for this location")
        }

        const marineData = await res.json()

        if (marineData.error) {
          throw new Error(marineData.reason || "Failed to fetch marine data")
        }

        setData(marineData)
      } catch (err) {
        console.error("[v0] Marine fetch error:", err)
        setError(err instanceof Error ? err.message : "Failed to load marine data")
      } finally {
        setLoading(false)
      }
    }

    fetchMarineData()
  }, [location])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
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
          <div className="text-center py-8">
            <Waves className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">{error}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Marine wave data may not be available for all coastal locations.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getDirectionName = (degrees: number) => {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ]
    return directions[Math.round(degrees / 22.5) % 16]
  }

  const getSeaState = (waveHeight: number) => {
    if (waveHeight < 0.1) return { state: "Calm (glassy)", color: "text-green-600" }
    if (waveHeight < 0.5) return { state: "Calm (rippled)", color: "text-green-500" }
    if (waveHeight < 1.25) return { state: "Smooth", color: "text-blue-500" }
    if (waveHeight < 2.5) return { state: "Slight", color: "text-blue-600" }
    if (waveHeight < 4) return { state: "Moderate", color: "text-yellow-500" }
    if (waveHeight < 6) return { state: "Rough", color: "text-orange-500" }
    if (waveHeight < 9) return { state: "Very Rough", color: "text-red-500" }
    return { state: "High", color: "text-red-700" }
  }

  const chartData =
    data?.hourly?.time?.slice(0, 72).map((time, index) => ({
      time: new Date(time).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric" }),
      waveHeight: data.hourly?.wave_height?.[index] ?? 0,
      swellHeight: data.hourly?.swell_wave_height?.[index] ?? 0,
      windWaveHeight: data.hourly?.wind_wave_height?.[index] ?? 0,
      wavePeriod: data.hourly?.wave_period?.[index] ?? 0,
    })) || []

  const seaState = data?.current?.wave_height !== undefined ? getSeaState(data.current.wave_height) : null

  return (
    <div className="space-y-6">
      {/* Sea State Banner */}
      {seaState && (
        <div className="rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Current Sea State</h3>
              <p className="text-sm text-muted-foreground">{location.name}</p>
            </div>
            <div className="text-right">
              <p className={`text-2xl font-bold ${seaState.color}`}>{seaState.state}</p>
              <p className="text-sm text-muted-foreground">Douglas Sea Scale</p>
            </div>
          </div>
        </div>
      )}

      {/* Current Wave Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Wave Height</CardTitle>
            <Waves className="h-4 w-4 text-teal-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.current?.wave_height?.toFixed(2) ?? "N/A"} m</div>
            <p className="text-xs text-muted-foreground">Significant wave height</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Wave Direction</CardTitle>
            <Compass className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.current?.wave_direction !== undefined
                ? `${getDirectionName(data.current.wave_direction)} (${data.current.wave_direction}°)`
                : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">Coming from direction</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Wave Period</CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.current?.wave_period?.toFixed(1) ?? "N/A"} s</div>
            <p className="text-xs text-muted-foreground">Time between waves</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Swell Height</CardTitle>
            <TrendingUp className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.current?.swell_wave_height?.toFixed(2) ?? "N/A"} m</div>
            <p className="text-xs text-muted-foreground">Long-period ocean swell</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Swell Direction</CardTitle>
            <Compass className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.current?.swell_wave_direction !== undefined
                ? `${getDirectionName(data.current.swell_wave_direction)} (${data.current.swell_wave_direction}°)`
                : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">Swell coming from</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Wind Waves</CardTitle>
            <Wind className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.current?.wind_wave_height?.toFixed(2) ?? "N/A"} m</div>
            <p className="text-xs text-muted-foreground">Locally generated waves</p>
          </CardContent>
        </Card>
      </div>

      {/* Wave Height Forecast Chart */}
      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>72-Hour Wave Forecast</CardTitle>
            <CardDescription>Wave height predictions for the next 3 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="swellGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="time" tick={{ fontSize: 11 }} interval="preserveStartEnd" tickMargin={10} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `${value}m`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="waveHeight"
                    stroke="#0ea5e9"
                    fill="url(#waveGradient)"
                    name="Total Wave"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="swellHeight"
                    stroke="#8b5cf6"
                    fill="url(#swellGradient)"
                    name="Swell"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="windWaveHeight"
                    stroke="#64748b"
                    name="Wind Waves"
                    strokeWidth={1.5}
                    dot={false}
                    strokeDasharray="5 5"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Wave Period Chart */}
      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Wave Period Forecast</CardTitle>
            <CardDescription>Expected time between wave crests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="time" tick={{ fontSize: 11 }} interval="preserveStartEnd" tickMargin={10} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `${value}s`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="wavePeriod"
                    stroke="#10b981"
                    name="Wave Period (s)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
