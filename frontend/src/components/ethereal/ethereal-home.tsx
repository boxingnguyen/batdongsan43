import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";
import Link from "next/link";
import { PortfolioGrid } from "@/components/ethereal/portfolio-grid";
import { Button } from "@/components/ui/button";
import {
  featuredDevelopment,
  portfolioItems,
} from "@/data/ethereal-portfolio";

export function EtherealHome() {
  return (
    <div className="bg-[#F9F9F9] text-[#634F3F]">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-14 md:px-10 md:pb-24 md:pt-20">
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#634F3F]/70">
          The Portfolio
        </p>
        <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.1] text-[#634F3F] md:text-5xl lg:text-[3.25rem]">
          Architecture as{" "}
          <em className="font-serif italic">Fine Art.</em>
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#634F3F]/80 md:text-base">
          A curated anthology of the world&apos;s most exceptional residences —
          where editorial design meets data-driven investment insight for
          discerning collectors and visionary developers.
        </p>
      </section>

      {/* Editorial portfolio grid */}
      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10 md:pb-28">
        <PortfolioGrid items={portfolioItems} />
      </section>

      {/* Featured development */}
      <section className="pb-20 md:pb-28">
        <div className="relative mx-auto aspect-[21/9] max-w-[1400px] overflow-hidden md:aspect-[2.4/1]">
          <ImageWithSkeleton
            src={featuredDevelopment.image}
            alt={featuredDevelopment.imageAlt}
            fill
            className="object-cover"
            sizes="100vw"
            priority={false}
          />
        </div>
        <div className="mx-auto max-w-2xl px-6 pt-12 text-center md:px-10 md:pt-16">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#634F3F]/70">
            {featuredDevelopment.label}
          </p>
          <h2 className="mt-4 font-serif text-3xl text-[#634F3F] md:text-4xl">
            {featuredDevelopment.title}
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-[#634F3F]/80 md:text-base">
            {featuredDevelopment.description}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EFEFEF] px-6 py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl text-[#634F3F] md:text-4xl">
            Partner with Vision.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-[#634F3F]/80 md:text-base">
            We collaborate with the world&apos;s leading architects to bring
            unprecedented living concepts to life.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              className="h-11 min-w-[220px] rounded-[4px] bg-[#634F3F] px-6 text-sm font-medium text-[#F9F9F9] hover:bg-[#534335]"
            >
              <Link href="/properties">Request Portfolio Access</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 min-w-[220px] rounded-[4px] border-[#634F3F] bg-transparent px-6 text-sm font-medium text-[#634F3F] hover:bg-[#634F3F]/5"
            >
              <Link href="/properties">Investment Inquiries</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
