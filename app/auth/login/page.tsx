"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

const DEMO_CREDENTIALS = {
  email: "admin@demo.com",
  password: "demo1234",
  name: "Demo Admin",
  role: "admin",
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    await new Promise((resolve) => setTimeout(resolve, 800)) // Simulate network delay

    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      // Store demo session in localStorage
      localStorage.setItem(
        "demo_session",
        JSON.stringify({
          user: {
            id: "demo-user-id",
            email: DEMO_CREDENTIALS.email,
          },
          profile: {
            id: "demo-user-id",
            full_name: DEMO_CREDENTIALS.name,
            role: DEMO_CREDENTIALS.role,
            email: DEMO_CREDENTIALS.email,
          },
        }),
      )
      router.push("/admin")
    } else {
      setError("Invalid credentials. Use admin@demo.com / demo1234")
    }
    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-900 p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/images/navy-logo.png"
              alt="Bangladesh Navy Logo"
              width={56}
              height={56}
              className="h-14 w-14 object-contain"
            />
            <div className="text-left">
              <span className="block font-bold text-primary-foreground">Bangladesh Navy</span>
              <span className="text-sm text-gold-400">Hydrographic & Oceanographic Center</span>
            </div>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4 border-blue-200 bg-blue-50 text-blue-800">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Demo Credentials:</strong>
                <br />
                Email: admin@demo.com
                <br />
                Password: demo1234
              </AlertDescription>
            </Alert>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@demo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="demo1234"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>
              {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Back to Website
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
