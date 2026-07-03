import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";

export function SymphonyHero() {
  return (
    <section className="relative !py-0">
      <div className="relative w-full overflow-hidden h-screen">
        <ImageWithSkeleton
          src="/images/symphony5/hero-12-5.jpg"
          alt="Sun Symphony Residence 5"
          fill
          className="object-cover md:hidden"
          priority
          sizes="100vw"
        />
        <ImageWithSkeleton
          src="/images/symphony5/hero-12-5.jpg"
          alt="Sun Symphony Residence 5"
          fill
          className="hidden object-cover md:block"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
    </section>
  );
}
