import { Suspense } from "react";
import { PropertyFiltersSidebar } from "@/components/property/property-filters";
import { PropertyGrid } from "@/components/property/property-grid";
import { getProperties } from "@/lib/strapi";
import type { PropertyFilters, PropertyStatus, PropertyType } from "@/types/strapi";

export const metadata = {
  title: "Properties",
};

interface PropertiesPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function parseFilters(
  params: Record<string, string | string[] | undefined>
): PropertyFilters {
  const get = (key: string) => {
    const v = params[key];
    return typeof v === "string" ? v : undefined;
  };

  const maxPrice = get("maxPrice");
  return {
    search: get("search"),
    property_type: (get("property_type") as PropertyType) || "",
    status: (get("status") as PropertyStatus) || "",
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    city: get("city"),
  };
}

async function PropertyListing({ searchParams }: PropertiesPageProps) {
  const params = await searchParams;
  const filters = parseFilters(params);

  let properties: Awaited<ReturnType<typeof getProperties>> = [];
  try {
    properties = await getProperties(filters);
  } catch {
    properties = [];
  }

  return (
    <div className="lg:col-span-3">
      <div className="mb-6 flex items-end justify-between">
        <p className="text-sm text-slate-500">
          <span className="font-semibold text-slate-900">{properties.length}</span>{" "}
          {properties.length === 1 ? "property" : "properties"} found
        </p>
      </div>
      <PropertyGrid properties={properties} />
    </div>
  );
}

export default async function PropertiesPage(props: PropertiesPageProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Property listings
        </h1>
        <p className="mt-2 text-slate-500">
          Filter by type, status, price, and location — live from Strapi.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-4">
        <Suspense
          fallback={
            <aside className="h-96 animate-pulse rounded-2xl bg-slate-100 lg:col-span-1" />
          }
        >
          <div className="lg:col-span-1">
            <PropertyFiltersSidebar />
          </div>
        </Suspense>

        <Suspense
          fallback={
            <div className="lg:col-span-3 h-96 animate-pulse rounded-2xl bg-slate-100" />
          }
        >
          <PropertyListing searchParams={props.searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
