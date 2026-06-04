import { PropertyCard } from "@/components/property/property-card";
import type { Property } from "@/types/strapi";

interface PropertyGridProps {
  properties: Property[];
  emptyMessage?: string;
}

export function PropertyGrid({
  properties,
  emptyMessage = "No properties match your criteria.",
}: PropertyGridProps) {
  if (!properties.length) {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-12 text-center">
        <p className="text-slate-600">{emptyMessage}</p>
        <p className="mt-2 text-sm text-slate-400">
          Try adjusting filters or check back soon for new listings.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
