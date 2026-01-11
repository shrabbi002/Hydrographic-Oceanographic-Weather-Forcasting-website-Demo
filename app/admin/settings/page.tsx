"use client"

import { useState } from "react"
import { Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminSettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage system configuration</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic website configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site_title">Site Title</Label>
                <Input id="site_title" defaultValue="Bangladesh Navy Hydrographic & Oceanographic Center" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site_description">Site Description</Label>
                <Textarea
                  id="site_description"
                  rows={3}
                  defaultValue="Official website of the Bangladesh Navy Hydrographic & Oceanographic Center (BNHOC), providing nautical charts, tide tables, and navigational services."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chief_name">Chief Hydrographer Name</Label>
                <Input id="chief_name" defaultValue="Rear Admiral Mohammad Nazmul Hassan" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chief_title">Chief Hydrographer Title</Label>
                <Input id="chief_title" defaultValue="Chief Hydrographer, Bangladesh Navy" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Public contact details displayed on the website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact_email">Email Address</Label>
                  <Input id="contact_email" type="email" defaultValue="info@bnhoc.navy.mil.bd" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_phone">Phone Number</Label>
                  <Input id="contact_phone" defaultValue="+880-2-8870104" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  rows={2}
                  defaultValue="Bangladesh Navy Hydrographic & Oceanographic Center, Agrabad, Chittagong, Bangladesh"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="office_hours">Office Hours</Label>
                  <Input id="office_hours" defaultValue="Sun-Thu: 09:00 - 17:00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fax">Fax Number</Label>
                  <Input id="fax" defaultValue="+880-2-8870105" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Feature Toggles</CardTitle>
              <CardDescription>Enable or disable website features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Downloads</Label>
                  <p className="text-sm text-muted-foreground">Allow users to download charts and publications</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Weather Widget</Label>
                  <p className="text-sm text-muted-foreground">Display marine weather on the homepage</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Contact Form</Label>
                  <p className="text-sm text-muted-foreground">Allow visitors to submit contact forms</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Show maintenance page to visitors</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center gap-4">
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
        {saved && <span className="text-sm text-green-600">Settings saved successfully!</span>}
      </div>
    </div>
  )
}
