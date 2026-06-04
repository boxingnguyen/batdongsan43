import { notFound } from "next/navigation";
import { Bath, BedDouble, MapPin, Maximize2 } from "lucide-react";
import { AgentCard } from "@/components/property/agent-card";
import { ImageGallery } from "@/components/property/image-gallery";
import { PropertyDescription } from "@/components/property/property-description";
import { Badge } from "@/components/ui/badge";
import { getPropertyBySlug } from "@/lib/strapi";
import {
  formatPrice,
  formatPropertyType,
  formatStatus,
} from "@/lib/utils";

interface PropertyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PropertyDetailPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug).catch(() => null);
  if (!property) return { title: "Property not found" };
  return {
    title: property.title,
    description: `${formatPropertyType(property.property_type)} in ${property.city ?? "prime location"}`,
  };
}

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const { slug } = await params;
  let property: Awaited<ReturnType<typeof getPropertyBySlug>> = null;

  try {
    property = await getPropertyBySlug(slug, { revalidate: 30 });
  } catch {
    property = null;
  }

  if (!property) notFound();

  const badgeVariant =
    property.status === "sold"
      ? "sold"
      : property.status === "for-rent"
        ? "highlight"
        : "default";

  return (
    <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8">
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge variant={badgeVariant}>{formatStatus(property.status)}</Badge>
          <Badge variant="secondary">
            {formatPropertyType(property.property_type)}
          </Badge>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {property.title}
        </h1>
        {(property.address || property.city) && (
          <p className="mt-2 flex items-center gap-2 text-slate-500">
            <MapPin className="h-4 w-4 shrink-0" />
            {[property.address, property.city].filter(Boolean).join(", ")}
          </p>
        )}
        <p className="mt-4 text-3xl font-semibold text-emerald-600">
          {formatPrice(Number(property.price), property.status)}
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <ImageGallery
            featured={property.featured_image}
            gallery={property.gallery}
            title={property.title}
          />

          <div className="grid grid-cols-3 gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:grid-cols-3">
            {property.bedrooms != null && (
              <div className="text-center">
                <BedDouble className="mx-auto h-6 w-6 text-emerald-600" />
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {property.bedrooms}
                </p>
                <p className="text-sm text-slate-500">Bedrooms</p>
              </div>
            )}
            {property.bathrooms != null && (
              <div className="text-center">
                <Bath className="mx-auto h-6 w-6 text-emerald-600" />
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {property.bathrooms}
                </p>
                <p className="text-sm text-slate-500">Bathrooms</p>
              </div>
            )}
            {property.area_sqft != null && (
              <div className="text-center">
                <Maximize2 className="mx-auto h-6 w-6 text-emerald-600" />
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {property.area_sqft.toLocaleString()}
                </p>
                <p className="text-sm text-slate-500">Sq ft</p>
              </div>
            )}
          </div>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-slate-900">
              About this property
            </h2>
            <PropertyDescription blocks={property.description} />
          </section>
        </div>

        <aside className="lg:col-span-1">
          {property.agent ? (
            <AgentCard agent={property.agent} />
          ) : (
            <p className="rounded-2xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">
              No agent assigned to this listing.
            </p>
          )}
        </aside>
      </div>
    </article>
  );
}
