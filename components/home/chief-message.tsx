import { Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function ChiefMessage() {
  return (
    <section className="bg-secondary py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-3">
                {/* Image placeholder */}
                <div className="relative bg-navy-800 md:col-span-1">
                  <div className="flex h-full min-h-[300px] items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-navy-700">
                        <span className="text-4xl font-bold text-gold-400">CH</span>
                      </div>
                      <div className="text-primary-foreground">
                        <p className="font-semibold">Rear Admiral</p>
                        <p className="text-sm text-primary-foreground/70">Chief Hydrographer</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="p-8 md:col-span-2">
                  <div className="mb-6 flex items-center gap-2">
                    <Quote className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold">Message from Chief Hydrographer</h2>
                  </div>
                  <blockquote className="space-y-4 text-muted-foreground">
                    <p>
                      Welcome to the Bangladesh Navy Hydrographic and Oceanographic Center. Our mission is to provide
                      mariners with accurate and up-to-date nautical information for safe navigation in Bangladesh
                      waters.
                    </p>
                    <p>
                      As the national hydrographic authority, we are committed to maintaining the highest standards in
                      hydrographic surveying, nautical charting, and oceanographic research. Our dedicated team works
                      tirelessly to ensure that all maritime stakeholders have access to reliable navigational products
                      and services.
                    </p>
                    <p>
                      I invite you to explore our website and discover the range of products and services we offer. Your
                      feedback is valuable to us as we continue to improve and serve the maritime community better.
                    </p>
                  </blockquote>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
