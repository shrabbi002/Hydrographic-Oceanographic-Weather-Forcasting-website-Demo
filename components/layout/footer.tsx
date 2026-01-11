import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Facebook, Twitter, Youtube } from "lucide-react"

const quickLinks = [
  { title: "Paper Charts", href: "/products/charts?type=paper" },
  { title: "Electronic Charts", href: "/products/charts?type=enc" },
  { title: "Tide Tables", href: "/products/tide-tables" },
  { title: "Notices to Mariners", href: "/products/notices" },
  { title: "Publications", href: "/products/publications" },
]

const aboutLinks = [
  { title: "History", href: "/about/history" },
  { title: "Vision & Mission", href: "/about/vision-mission" },
  { title: "Organization", href: "/about/organization" },
  { title: "Survey Ships", href: "/about/survey-ships" },
  { title: "Gallery", href: "/about/gallery" },
]

const serviceLinks = [
  { title: "Skill Development", href: "/skill-development" },
  { title: "Hydrographic Forms", href: "/forms" },
  { title: "Marine Weather", href: "/marine-weather" },
  { title: "GIS Explorer", href: "/products/gis-explorer" },
]

export function Footer() {
  return (
    <footer className="bg-navy-900 text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Contact */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/navy-logo.png"
                alt="Bangladesh Navy Logo"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-bold leading-tight">Bangladesh Navy</span>
                <span className="text-sm text-gold-400">Hydrographic & Oceanographic Center</span>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/70">
              Providing accurate nautical charts and navigational information for safe maritime navigation in Bangladesh
              waters.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold-400" />
                <span>BNHOC, Chittagong, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold-400" />
                <span>+880-xxx-xxxx</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold-400" />
                <span>info@bnhoc.mil.bd</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-gold-400">Products & Services</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-gold-400 transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="mb-4 font-semibold text-gold-400">About Us</h3>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-gold-400 transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 font-semibold text-gold-400">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-gold-400 transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="mb-3 text-sm font-medium">Follow Us</h4>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-700 hover:bg-navy-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-700 hover:bg-navy-600 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-700 hover:bg-navy-600 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-navy-700 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-primary-foreground/60">
              &copy; {new Date().getFullYear()} Bangladesh Navy. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-primary-foreground/60">
              <Link href="/privacy" className="hover:text-gold-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-gold-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
