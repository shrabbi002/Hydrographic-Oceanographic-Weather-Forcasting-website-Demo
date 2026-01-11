"use client"

import type React from "react"

import { useState } from "react"
import { FileEdit, Database, CreditCard, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"

type FormType = "chart_correction" | "data_request" | "payment_info"

export function HydrographicForms() {
  const [activeTab, setActiveTab] = useState<FormType>("chart_correction")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, formType: FormType) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data: Record<string, string> = {}
    formData.forEach((value, key) => {
      data[key] = value as string
    })

    try {
      const supabase = createClient()
      const { error: insertError } = await supabase.from("form_submissions").insert({
        form_type: formType,
        data,
        submitted_by_email: data.email,
      })

      if (insertError) throw insertError
      setIsSubmitted(true)
    } catch (err) {
      setError("Failed to submit form. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mt-4 text-xl font-semibold">Form Submitted!</h3>
          <p className="mt-2 text-center text-muted-foreground">
            Your submission has been received. We will process your request and contact you if needed.
          </p>
          <Button
            className="mt-6"
            onClick={() => {
              setIsSubmitted(false)
              setActiveTab("chart_correction")
            }}
          >
            Submit Another Form
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as FormType)} className="mx-auto max-w-3xl">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="chart_correction" className="flex items-center gap-2">
          <FileEdit className="h-4 w-4" />
          <span className="hidden sm:inline">Chart Correction</span>
          <span className="sm:hidden">Correction</span>
        </TabsTrigger>
        <TabsTrigger value="data_request" className="flex items-center gap-2">
          <Database className="h-4 w-4" />
          <span className="hidden sm:inline">Data Request</span>
          <span className="sm:hidden">Request</span>
        </TabsTrigger>
        <TabsTrigger value="payment_info" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          <span className="hidden sm:inline">Payment Info</span>
          <span className="sm:hidden">Payment</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="chart_correction">
        <Card>
          <CardHeader>
            <CardTitle>Chart Correction Request</CardTitle>
            <CardDescription>Report errors or request corrections to existing nautical charts</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => handleSubmit(e, "chart_correction")} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cc-name">Full Name *</Label>
                  <Input id="cc-name" name="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cc-email">Email *</Label>
                  <Input id="cc-email" name="email" type="email" required />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cc-chart">Chart Number *</Label>
                  <Input id="cc-chart" name="chart_number" placeholder="e.g., BN 1001" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cc-position">Position (Lat/Long)</Label>
                  <Input id="cc-position" name="position" placeholder="e.g., 22°20'N 91°50'E" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cc-description">Correction Details *</Label>
                <Textarea
                  id="cc-description"
                  name="description"
                  placeholder="Describe the error or correction needed..."
                  rows={5}
                  required
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Correction"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="data_request">
        <Card>
          <CardHeader>
            <CardTitle>Hydrographic Data Request</CardTitle>
            <CardDescription>Request specific hydrographic data or products</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => handleSubmit(e, "data_request")} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dr-name">Full Name *</Label>
                  <Input id="dr-name" name="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dr-email">Email *</Label>
                  <Input id="dr-email" name="email" type="email" required />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dr-organization">Organization *</Label>
                  <Input id="dr-organization" name="organization" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dr-phone">Phone Number</Label>
                  <Input id="dr-phone" name="phone" type="tel" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dr-area">Area of Interest *</Label>
                <Input id="dr-area" name="area" placeholder="e.g., Chittagong Port Approach" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dr-purpose">Purpose of Request *</Label>
                <Textarea
                  id="dr-purpose"
                  name="purpose"
                  placeholder="Describe the purpose and specific data required..."
                  rows={5}
                  required
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="payment_info">
        <Card>
          <CardHeader>
            <CardTitle>Payment Information Request</CardTitle>
            <CardDescription>Request payment details for products and services</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => handleSubmit(e, "payment_info")} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="pi-name">Full Name *</Label>
                  <Input id="pi-name" name="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pi-email">Email *</Label>
                  <Input id="pi-email" name="email" type="email" required />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="pi-organization">Organization *</Label>
                  <Input id="pi-organization" name="organization" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pi-phone">Phone Number *</Label>
                  <Input id="pi-phone" name="phone" type="tel" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pi-products">Products/Services Required *</Label>
                <Textarea
                  id="pi-products"
                  name="products"
                  placeholder="List the products or services you wish to purchase..."
                  rows={4}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pi-address">Billing Address *</Label>
                <Textarea id="pi-address" name="address" placeholder="Your billing address..." rows={3} required />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Request Payment Info"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
