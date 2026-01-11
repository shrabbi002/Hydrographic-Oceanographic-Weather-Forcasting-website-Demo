import { Ship, Anchor, Gauge, Ruler } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { SurveyShip } from "@/lib/types"

interface SurveyShipsGalleryProps {
  ships: SurveyShip[]
}

export function SurveyShipsGallery({ ships }: SurveyShipsGalleryProps) {
  if (ships.length === 0) {
    return (
      <div className="text-center py-16">
        <Ship className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No ships information available</h3>
        <p className="text-muted-foreground">Please check back later for updates.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {ships.map((ship) => (
        <Card key={ship.id} className="overflow-hidden">
          {/* Image placeholder */}
          <div className="aspect-[4/3] bg-navy-800 flex items-center justify-center">
            <Ship className="h-20 w-20 text-navy-600" />
          </div>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">{ship.name}</h3>
                <Badge variant="secondary" className="mt-1">
                  {ship.role}
                </Badge>
              </div>
              <Anchor className="h-6 w-6 text-primary" />
            </div>

            {ship.capability && (
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Gauge className="h-4 w-4" />
                <span>{ship.capability}</span>
              </div>
            )}

            {ship.description && <p className="mt-3 text-sm text-muted-foreground">{ship.description}</p>}

            {ship.specifications && Object.keys(ship.specifications).length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                {Object.entries(ship.specifications).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-1">
                    <Ruler className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {key}: {String(value)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
