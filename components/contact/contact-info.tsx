import { MapPin, Phone, Mail, Clock, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Address</h4>
              <p className="text-sm text-muted-foreground">
                Bangladesh Navy Hydrographic and Oceanographic Center
                <br />
                Chittagong, Bangladesh
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Phone</h4>
              <p className="text-sm text-muted-foreground">+880-xxx-xxxx</p>
              <p className="text-sm text-muted-foreground">+880-xxx-xxxx (Fax)</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Email</h4>
              <p className="text-sm text-muted-foreground">info@bnhoc.mil.bd</p>
              <p className="text-sm text-muted-foreground">support@bnhoc.mil.bd</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Office Hours</h4>
              <p className="text-sm text-muted-foreground">Sunday - Thursday: 09:00 AM - 05:00 PM</p>
              <p className="text-sm text-muted-foreground">Friday - Saturday: Closed</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Website</h4>
              <p className="text-sm text-muted-foreground">www.bnhoc.mil.bd</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map placeholder */}
      <Card>
        <CardContent className="p-0">
          <div className="aspect-[4/3] bg-muted flex items-center justify-center rounded-lg">
            <div className="text-center">
              <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">Map Location</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
