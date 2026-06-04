import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, Maximize2, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  formatPrice,
  formatPropertyType,
  formatStatus,
  getStrapiMediaUrl,
} from "@/lib/utils";
import type { Property } from "@/types/strapi";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const imageUrl =
    getStrapiMediaUrl(property.featured_image) ??
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80";

  const badgeVariant =
    property.status === "sold"
      ? "sold"
      : property.status === "for-rent"
        ? "highlight"
        : "default";

  return (
    <Link href={`/properties/${property.slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden border-slate-200/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <Image
            src={imageUrl}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute left-3 top-3 flex gap-2">
            <Badge variant={badgeVariant}>{formatStatus(property.status)}</Badge>
            <Badge variant="secondary">
              {formatPropertyType(property.property_type)}
            </Badge>
          </div>
        </div>
        <CardContent className="space-y-3 p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 text-lg font-semibold text-slate-900 group-hover:text-emerald-700">
              {property.title}
            </h3>
            <p className="shrink-0 text-lg font-semibold text-emerald-600">
              {formatPrice(Number(property.price), property.status)}
            </p>
          </div>
          {(property.city || property.address) && (
            <p className="flex items-center gap-1 text-sm text-slate-500">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="line-clamp-1">
                {[property.address, property.city].filter(Boolean).join(", ")}
              </span>
            </p>
          )}
          <div className="flex flex-wrap gap-4 border-t border-slate-100 pt-3 text-sm text-slate-600">
            {property.bedrooms != null && (
              <span className="flex items-center gap-1">
                <BedDouble className="h-4 w-4" />
                {property.bedrooms} beds
              </span>
            )}
            {property.bathrooms != null && (
              <span className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                {property.bathrooms} baths
              </span>
            )}
            {property.area_sqft != null && (
              <span className="flex items-center gap-1">
                <Maximize2 className="h-4 w-4" />
                {property.area_sqft.toLocaleString()} sqft
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
