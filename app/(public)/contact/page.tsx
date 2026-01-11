import { PageHeader } from "@/components/ui/page-header"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Bangladesh Navy Hydrographic and Oceanographic Center",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Contact Us"
        description="Get in touch with us for inquiries and support"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  )
}
