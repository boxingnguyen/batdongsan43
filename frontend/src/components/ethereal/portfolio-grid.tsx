import Image from "next/image";
import Link from "next/link";
import type { PortfolioItem } from "@/data/ethereal-portfolio";
import { cn } from "@/lib/utils";

const layoutClass: Record<PortfolioItem["layout"], string> = {
  large: "md:col-span-2 md:row-span-2 md:col-start-1 md:row-start-1",
  small: "md:col-start-3 md:row-start-1",
  tall: "md:col-start-3 md:row-span-2 md:row-start-2",
  medium: "md:col-span-2 md:col-start-1 md:row-start-3",
};

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const isLarge = item.layout === "large" || item.layout === "medium";
  const isTall = item.layout === "tall" || item.layout === "large";

  return (
    <article
      className={cn(
        "group flex flex-col gap-4",
        layoutClass[item.layout]
      )}
    >
      <Link
        href={`/${item.routePrefix || 'properties'}/${item.propertySlug}`}
        className={cn(
          "relative block overflow-hidden rounded-[4px] bg-[#e8e4df]",
          isLarge ? "aspect-[16/10]" : isTall ? "aspect-[3/5] md:aspect-auto md:min-h-[420px] md:h-full" : "aspect-[4/5]"
        )}
      >
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          sizes={
            item.layout === "large"
              ? "(max-width: 768px) 100vw, 66vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
        />
        {item.status && (
          <div className="absolute right-4 top-4 md:right-6 md:top-6">
            <span className="inline-block rounded-sm bg-white/95 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#634F3F] backdrop-blur-sm">
              {item.status}
            </span>
          </div>
        )}
      </Link>
      <div className={cn("space-y-2", isLarge && "md:max-w-xl")}>
        <h3 className="font-serif text-xl text-[#634F3F] md:text-2xl">
          {item.title}
        </h3>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#634F3F]/70">
          {item.location}
        </p>
        <p className="text-sm leading-relaxed text-[#634F3F]/80">
          {item.description}
        </p>
      </div>
    </article>
  );
}

export function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:grid-rows-[auto_auto_auto] md:gap-x-10 md:gap-y-14">
      {items.map((item) => (
        <PortfolioCard key={item.id} item={item} />
      ))}
    </div>
  );
}
