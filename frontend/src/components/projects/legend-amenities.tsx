import {
  Waves,
  Dumbbell,
  Sparkles,
  Briefcase,
  TreePine,
  Baby,
  ShoppingBag,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  pool: Waves,
  fitness_center: Dumbbell,
  spa: Sparkles,
  business_center: Briefcase,
  park: TreePine,
  school: Baby,
  shopping_cart: ShoppingBag,
  security: ShieldCheck,
};

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
    <section className="bg-white px-5 py-16 md:px-20 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="mb-12 font-serif text-3xl text-[#4a3829] md:text-4xl">
          Tiện Ích Đẳng Cấp
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {amenities.map((amenity) => {
            const Icon = ICON_MAP[amenity.icon] ?? ShieldCheck;
            return (
              <div key={amenity.title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#07be8a]/10">
                  <Icon className="h-5 w-5 text-[#07be8a]" />
                </div>
                <div>
                  <h3 className="font-serif text-base text-[#4a3829]">
                    {amenity.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#4e453e]/70">
                    {amenity.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
