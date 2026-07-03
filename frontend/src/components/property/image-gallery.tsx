"use client";

import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, getStrapiMediaUrl } from "@/lib/utils";
import type { StrapiMedia } from "@/types/strapi";

interface ImageGalleryProps {
  featured?: StrapiMedia | null;
  gallery?: StrapiMedia[] | null;
  title: string;
}

const FALLBACK =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80";

export function ImageGallery({ featured, gallery, title }: ImageGalleryProps) {
  const images = [
    getStrapiMediaUrl(featured),
    ...(gallery?.map((g) => getStrapiMediaUrl(g)) ?? []),
  ].filter((url): url is string => Boolean(url));

  const slides = images.length ? images : [FALLBACK];
  const [index, setIndex] = useState(0);

  function prev() {
    setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  }

  function next() {
    setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100">
        <ImageWithSkeleton
          src={slides[index]}
          alt={`${title} — image ${index + 1}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
        {slides.length > 1 && (
          <>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90"
              onClick={prev}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90"
              onClick={next}
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>

      {slides.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {slides.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-offset-2 transition-all",
                i === index ? "ring-emerald-500" : "ring-transparent opacity-70 hover:opacity-100"
              )}
            >
              <ImageWithSkeleton src={src} alt="" fill className="object-cover" sizes="120px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
