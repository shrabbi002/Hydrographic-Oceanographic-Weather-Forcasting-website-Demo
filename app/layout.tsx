import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: {
    default: "Bangladesh Navy Hydrographic & Oceanographic Center",
    template: "%s | BNHOC",
  },
  description:
    "Official website of Bangladesh Navy Hydrographic and Oceanographic Center - Providing nautical charts, tide tables, and navigational publications for safe maritime navigation.",
  keywords: [
    "Bangladesh Navy",
    "Hydrographic",
    "Oceanographic",
    "Nautical Charts",
    "ENC",
    "Tide Tables",
    "Navigation",
    "Maritime",
  ],
  authors: [{ name: "Bangladesh Navy" }],
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#1e3a5f",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
