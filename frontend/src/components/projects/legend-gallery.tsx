import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";

interface GalleryImage {
  src: string;
  alt: string;
  layout: "main" | "secondary";
}

interface LegendGalleryProps {
  gallery: GalleryImage[];
}

export function LegendGallery({ gallery }: LegendGalleryProps) {
  const mainImage = gallery.find(i => i.layout === "main");
  const secondaryImages = gallery.filter(i => i.layout === "secondary");

  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-12 md:px-20">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
        {mainImage && (
          <div className="group relative h-[400px] overflow-hidden rounded-lg md:col-span-8 md:h-[600px]">
            <ImageWithSkeleton
              src={mainImage.src}
              alt={mainImage.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 66vw"
              priority
            />
          </div>
        )}
        
        <div className="grid h-[400px] grid-rows-2 gap-2 md:col-span-4 md:h-[600px]">
          {secondaryImages.map((image) => (
            <div
              key={image.src}
              className="group relative overflow-hidden rounded-lg"
            >
              <ImageWithSkeleton
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
