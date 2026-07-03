import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";

interface LegendHeroProps {
  title: string;
  tagline: string;
  subtitle: string;
  location: string;
  status: string;
  heroImage: string;
}

export function LegendHero({
  title,
  tagline,
  subtitle,
  location,
  status,
  heroImage
}: LegendHeroProps) {
  return (
    <section className="relative aspect-[21/9] max-h-[70vh] w-full overflow-hidden">
      <ImageWithSkeleton
        src={heroImage}
        alt={title}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-20">
        <span className="inline-block rounded-sm bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#634F3F]">
          {status}
        </span>
        
        <h1 className="mt-4 font-serif text-3xl text-white md:text-5xl md:leading-tight">
          {title}
        </h1>
        
        <p className="mt-3 font-serif text-lg italic text-white/90 md:text-2xl">
          {tagline}
        </p>
        
        <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-white/80">
          {subtitle}
        </p>
        
        <p className="mt-3 text-sm text-white/70">
          📍 {location}
        </p>
      </div>
    </section>
  );
}
