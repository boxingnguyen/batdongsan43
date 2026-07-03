"use client";

import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";
import { useState } from "react";
import { cn } from "@/lib/utils";

const unitSlides = [
  "/images/symphony5/San-pham-STUDIO.jpg",
  "/images/symphony5/1BR.jpg",
  "/images/symphony5/1BR-2.jpg",
  "/images/symphony5/1BR-3.jpg",
];

export function SymphonyFloorPlan() {
  const [slide, setSlide] = useState(0);

  return (
    <section id="mat-bang" className="scroll-mt-24 bg-[#f9f9f9] pb-16 md:pb-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-20">
        <div className="mb-10 text-center">
          <ImageWithSkeleton
            src={`/images/symphony5/Mat-bang-Layout-can-ho-1.png`}
            alt="Mặt bằng layout căn hộ"
            width={600}
            height={62}
            className="mx-auto h-auto w-full max-w-md"
          />
        </div>

        <div className="mb-10 overflow-hidden rounded-2xl border border-[#d2c4bb]/30 bg-gradient-to-b from-[#e29ab2] to-[#002f73] p-4 md:p-6">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="overflow-hidden rounded-xl bg-white p-2">
              <ImageWithSkeleton
                src={`/images/symphony5/layout-toa.jpg`}
                alt="Layout tòa"
                width={960}
                height={640}
                className="h-auto w-full rounded-lg"
              />
            </div>
            <div className="overflow-hidden rounded-xl">
              <div className="relative aspect-[3/4] w-full">
                <ImageWithSkeleton
                  src={unitSlides[slide]}
                  alt="Mặt bằng căn"
                  fill
                  className="object-cover"
                  sizes="40vw"
                />
              </div>
              <div className="flex justify-center gap-2 bg-white/10 py-3">
                {unitSlides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSlide(i)}
                    className={cn(
                      "h-2.5 w-2.5 rounded-full transition-colors",
                      i === slide ? "bg-[#ce9e51]" : "bg-white/50"
                    )}
                    aria-label={`Ảnh ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}