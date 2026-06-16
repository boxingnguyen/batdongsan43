import { MaterialIcon } from "@/components/ui/material-icon";

interface Amenity {
  icon: string;
  title: string;
  subtitle: string;
}

interface LegendAmenitiesProps {
  amenities: Amenity[];
}

export function LegendAmenities({ amenities }: LegendAmenitiesProps) {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-20 md:py-24 bg-white">
      <h2 className="mb-12 font-serif text-3xl md:text-4xl text-[#4a3829]">
        Tiện Ích Đẳng Cấp
      </h2>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {amenities.map((amenity) => (
          <div key={amenity.title} className="flex items-start gap-4">
            <div className="shrink-0">
              <MaterialIcon
                name={amenity.icon}
                className="text-3xl text-[#07be8a]"
              />
            </div>
            <div>
              <h3 className="font-serif text-lg text-[#4a3829]">
                {amenity.title}
              </h3>
              <p className="mt-2 text-sm text-[#4e453e]">
                {amenity.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
