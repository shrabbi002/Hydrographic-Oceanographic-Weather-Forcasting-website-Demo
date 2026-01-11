"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WeatherOverview } from "./weather-overview"
import { TideChart } from "./tide-chart"
import { AstronomicalData } from "./astronomical-data"
import { WaveConditions } from "./wave-conditions"
import { LocationSelector } from "./location-selector"
import { WeatherAlerts } from "./weather-alerts"

export type Location = {
  name: string
  lat: number
  lon: number
  port: string
}

const locations: Location[] = [
  { name: "Chittagong Port", lat: 22.3314, lon: 91.8363, port: "Chittagong" },
  { name: "Mongla Port", lat: 22.4667, lon: 89.6, port: "Mongla" },
  { name: "Payra Port", lat: 21.8, lon: 90.3167, port: "Payra" },
  { name: "Cox's Bazar", lat: 21.4272, lon: 92.0058, port: "Cox's Bazar" },
  { name: "Saint Martin Island", lat: 20.6273, lon: 92.3226, port: "Saint Martin" },
  { name: "Sandwip Island", lat: 22.4833, lon: 91.4667, port: "Sandwip" },
  { name: "Teknaf", lat: 20.8631, lon: 92.3017, port: "Teknaf" },
  { name: "Kutubdia Island", lat: 21.8167, lon: 91.85, port: "Kutubdia" },
]

export function MarineWeatherDashboard() {
  const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <LocationSelector
          locations={locations}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
        />
        <WeatherAlerts location={selectedLocation} />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto gap-2 bg-transparent p-0">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted"
          >
            Weather Overview
          </TabsTrigger>
          <TabsTrigger
            value="waves"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted"
          >
            Wave Conditions
          </TabsTrigger>
          <TabsTrigger
            value="tides"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted"
          >
            Tide Predictions
          </TabsTrigger>
          <TabsTrigger
            value="astronomical"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted"
          >
            Astronomical Data
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <WeatherOverview location={selectedLocation} />
        </TabsContent>

        <TabsContent value="waves">
          <WaveConditions location={selectedLocation} />
        </TabsContent>

        <TabsContent value="tides">
          <TideChart location={selectedLocation} />
        </TabsContent>

        <TabsContent value="astronomical">
          <AstronomicalData location={selectedLocation} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
