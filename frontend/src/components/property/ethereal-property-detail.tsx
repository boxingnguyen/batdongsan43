import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";
import { MaterialIcon } from "@/components/ui/material-icon";
import { ContactAmbassadorForm } from "@/components/property/contact-ambassador-form";
import { FinancialOverview } from "@/components/property/financial-overview";
import { MarketAnalysisChart } from "@/components/property/market-analysis-chart";
import type { PropertyDetailContent } from "@/types/property-detail";

function formatListingPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function EtherealPropertyDetail({
  property,
}: {
  property: PropertyDetailContent;
}) {
  const mainImage = property.images.find((i) => i.layout === "main");
  const secondaryImages = property.images.filter((i) => i.layout === "secondary");

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-20">
      {/* Gallery */}
      <section className="mb-16">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
          {mainImage && (
            <div className="group relative h-[400px] overflow-hidden md:col-span-8 md:h-[600px]">
              <ImageWithSkeleton
                src={mainImage.src}
                alt={mainImage.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 66vw"
                priority
              />
              {property.badge && (
                <div className="absolute bottom-6 left-6">
                  <span className="bg-[#f9f9f9]/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#4a3829] backdrop-blur-md">
                    {property.badge}
                  </span>
                </div>
              )}
            </div>
          )}
          <div className="grid h-[400px] grid-rows-2 gap-2 md:col-span-4 md:h-[600px]">
            {secondaryImages.map((image, index) => (
              <div
                key={image.src}
                className="group relative overflow-hidden"
              >
                <ImageWithSkeleton
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="33vw"
                />
                {index === secondaryImages.length - 1 &&
                  property.galleryCount && (
                    <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-[#1A1A1A]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="border border-white px-6 py-2 text-sm font-semibold text-white">
                        View {property.galleryCount} Photos
                      </span>
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="space-y-16 lg:col-span-8">
          <div className="border-b border-[#8C7B6E]/20 pb-8">
            <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <h1 className="font-serif text-4xl tracking-tight text-[#4a3829] md:text-6xl md:leading-[1.1]">
                {property.title}
              </h1>
              <div className="shrink-0 text-right">
                <p className="font-serif text-3xl text-[#4a3829]">
                  {formatListingPrice(property.price)}
                </p>
                <p className="mt-1 text-xs text-[#4e453e]">
                  Est. Payment: {property.monthlyEstimate}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 text-xs font-semibold uppercase tracking-wide text-[#4e453e]">
              <span className="flex items-center gap-2">
                <MaterialIcon name="bed" className="text-[#8C7B6E]" />
                {property.beds}
              </span>
              <span className="flex items-center gap-2">
                <MaterialIcon name="bathtub" className="text-[#8C7B6E]" />
                {property.baths}
              </span>
              <span className="flex items-center gap-2">
                <MaterialIcon name="square_foot" className="text-[#8C7B6E]" />
                {property.sqft}
              </span>
              <span className="flex items-center gap-2">
                <MaterialIcon name="location_on" className="text-[#8C7B6E]" />
                {property.location}
              </span>
            </div>
          </div>

          <section>
            <h3 className="mb-6 font-serif text-2xl text-[#4a3829]">
              About This Residence
            </h3>
            {property.description.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="mt-6 max-w-prose text-lg leading-relaxed text-[#4e453e] first:mt-0"
              >
                {paragraph}
              </p>
            ))}
          </section>

          <section>
            <h3 className="mb-8 font-serif text-2xl text-[#4a3829]">
              Exclusive Amenities
            </h3>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              {property.amenities.map((amenity) => (
                <div key={amenity.title} className="flex items-start gap-4">
                  <MaterialIcon
                    name={amenity.icon}
                    className="text-2xl text-[#4a3829]"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#4a3829]">
                      {amenity.title}
                    </p>
                    <p className="mt-1 text-xs text-[#4e453e]">
                      {amenity.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <MarketAnalysisChart marketYoY={property.marketYoY} />
        </div>

        <aside className="space-y-6 lg:col-span-4">
          <div
            id="contact"
            className="sticky top-24 border border-[#8C7B6E]/10 bg-[#f9f9f9] p-8"
          >
            <h4 className="mb-6 font-serif text-2xl text-[#4a3829]">
              Contact Ambassador
            </h4>
            <div className="mb-8 flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                <ImageWithSkeleton
                  src={property.agent.image}
                  alt={property.agent.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#4a3829]">
                  {property.agent.name}
                </p>
                <p className="text-xs text-[#4e453e]">{property.agent.title}</p>
              </div>
            </div>
            <ContactAmbassadorForm />
          </div>
          <FinancialOverview price={property.price} />
        </aside>
      </div>
    </div>
  );
}
