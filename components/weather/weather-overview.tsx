"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Thermometer, Wind, Droplets, Waves, Eye, CloudRain, Gauge } from "lucide-react"
import type { Location } from "./marine-weather-dashboard"

interface WeatherData {
  current: {
    temperature_2m: number
    relative_humidity_2m: number
    wind_speed_10m: number
    wind_direction_10m: number
    precipitation: number
    pressure_msl: number
    weather_code: number
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
    wind_speed_10m: number[]
    precipitation_probability: number[]
  }
}

interface MarineData {
  current: {
    wave_height?: number
    wave_direction?: number
    wave_period?: number
    swell_wave_height?: number
    ocean_current_velocity?: number
  }
}

interface WeatherOverviewProps {
  location: Location
}

export function WeatherOverview({ location }: WeatherOverviewProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [marine, setMarine] = useState<MarineData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true)
      setError(null)
      try {
        const [weatherRes, marineRes] = await Promise.all([
          fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,precipitation,pressure_msl,wind_speed_10m,wind_direction_10m,weather_code&hourly=temperature_2m,wind_speed_10m,precipitation_probability&timezone=Asia%2FDhaka&forecast_days=1`,
          ),
          fetch(
            `https://marine-api.open-meteo.com/v1/marine?latitude=${location.lat}&longitude=${location.lon}&current=wave_height,wave_direction,wave_period,swell_wave_height,ocean_current_velocity&timezone=Asia%2FDhaka`,
          ),
        ])

        if (!weatherRes.ok) throw new Error("Failed to fetch weather")

        const weatherData = await weatherRes.json()
        setWeather(weatherData)

        // Marine API may return error for some inland locations
        if (marineRes.ok) {
          const marineData = await marineRes.json()
          if (marineData.current) {
            setMarine(marineData)
          }
        }
      } catch (err) {
        console.error("[v0] Weather fetch error:", err)
        setError("Failed to load weather data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [location])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
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
    )
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <p className="text-destructive text-center">{error}</p>
        </CardContent>
      </Card>
    )
  }

  const getWindDirection = (degrees: number) => {
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

  const getWeatherDescription = (code: number) => {
    const codes: Record<number, string> = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Foggy",
      48: "Depositing rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      71: "Slight snow",
      73: "Moderate snow",
      75: "Heavy snow",
      80: "Slight rain showers",
      81: "Moderate rain showers",
      82: "Violent rain showers",
      95: "Thunderstorm",
      96: "Thunderstorm with slight hail",
      99: "Thunderstorm with heavy hail",
    }
    return codes[code] || "Unknown"
  }

  return (
    <div className="space-y-6">
      {/* Current Conditions */}
      <div className="rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Current Conditions</h3>
            <p className="text-sm text-muted-foreground">{location.name}</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold">{weather?.current?.temperature_2m?.toFixed(1) ?? "--"}°C</p>
            <p className="text-sm text-muted-foreground">
              {weather?.current?.weather_code !== undefined && getWeatherDescription(weather.current.weather_code)}
            </p>
          </div>
        </div>
      </div>

      {/* Weather Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weather?.current?.temperature_2m?.toFixed(1) ?? "--"}°C</div>
            <p className="text-xs text-muted-foreground">Air temperature at 2m</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Wind Speed</CardTitle>
            <Wind className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weather?.current?.wind_speed_10m?.toFixed(1) ?? "--"} km/h</div>
            <p className="text-xs text-muted-foreground">
              {weather?.current?.wind_direction_10m !== undefined
                ? getWindDirection(weather.current.wind_direction_10m)
                : "--"}{" "}
              direction
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Humidity</CardTitle>
            <Droplets className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weather?.current?.relative_humidity_2m ?? "--"}%</div>
            <p className="text-xs text-muted-foreground">Relative humidity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pressure</CardTitle>
            <Gauge className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weather?.current?.pressure_msl?.toFixed(0) ?? "--"} hPa</div>
            <p className="text-xs text-muted-foreground">Mean sea level</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Wave Height</CardTitle>
            <Waves className="h-4 w-4 text-teal-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{marine?.current?.wave_height?.toFixed(1) ?? "N/A"} m</div>
            <p className="text-xs text-muted-foreground">Significant wave height</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Swell Height</CardTitle>
            <Waves className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{marine?.current?.swell_wave_height?.toFixed(1) ?? "N/A"} m</div>
            <p className="text-xs text-muted-foreground">Ocean swell</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ocean Current</CardTitle>
            <Eye className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{marine?.current?.ocean_current_velocity?.toFixed(2) ?? "N/A"} m/s</div>
            <p className="text-xs text-muted-foreground">Current velocity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Precipitation</CardTitle>
            <CloudRain className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weather?.current?.precipitation?.toFixed(1) ?? "--"} mm</div>
            <p className="text-xs text-muted-foreground">Current rainfall</p>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Forecast Preview */}
      <Card>
        <CardHeader>
          <CardTitle>24-Hour Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {weather?.hourly?.time?.slice(0, 24).map((time, index) => {
              const hour = new Date(time).getHours()
              return (
                <div key={time} className="flex min-w-[60px] flex-col items-center gap-1 text-center">
                  <span className="text-xs text-muted-foreground">
                    {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
                  </span>
                  <span className="text-sm font-medium">
                    {weather.hourly.temperature_2m?.[index]?.toFixed(0) ?? "--"}°
                  </span>
                  <Wind className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {weather.hourly.wind_speed_10m?.[index]?.toFixed(0) ?? "--"}
                  </span>
                  <div className="mt-1 h-1 w-full rounded bg-blue-200">
                    <div
                      className="h-1 rounded bg-blue-500"
                      style={{ width: `${weather.hourly.precipitation_probability?.[index] ?? 0}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {weather.hourly.precipitation_probability?.[index] ?? 0}%
                  </span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
