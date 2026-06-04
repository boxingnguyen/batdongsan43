import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { HeroSearch } from "@/components/property/hero-search";
import { PropertyGrid } from "@/components/property/property-grid";
import { Button } from "@/components/ui/button";
import { getFeaturedProperties } from "@/lib/strapi";

export default async function HomePage() {
  let featured: Awaited<ReturnType<typeof getFeaturedProperties>> = [];

  try {
    featured = await getFeaturedProperties(6);
  } catch {
    featured = [];
  }

  return (
    <>
      <section className="dark-section relative overflow-hidden bg-slate-950 px-4 pb-24 pt-20 sm:px-6 lg:px-8">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-sm text-emerald-300">
            <Sparkles className="h-4 w-4 text-amber-400" />
            Analytics-driven luxury listings
          </p>
          <h1 className="mx-auto max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find your next{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-amber-300 bg-clip-text text-transparent">
              exceptional
            </span>{" "}
            address
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Ultra-modern search across premium homes, condos, and land — backed
            by rich market data and expert agents.
          </p>
          <HeroSearch />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
              Featured properties
            </h2>
            <p className="mt-2 text-slate-500">
              Hand-picked listings with exceptional value and design.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/properties">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <PropertyGrid
          properties={featured}
          emptyMessage="Connect Strapi and add properties to see featured listings here."
        />
      </section>

      <section className="border-t border-slate-200 bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold text-slate-900">
            White-glove service, data-first decisions
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Inspired by modern real-estate analytics dashboards — deep slates,
            emerald accents, and clarity at every step of your search.
          </p>
        </div>
      </section>
    </>
  );
}
