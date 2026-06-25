"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProjectLeadForm } from "./ProjectLeadForm";

const CDN = "https://dongtayland.vn/wp-content/uploads/2026/05";

const unitSlides = [
  `${CDN}/San-pham-STUDIO.jpg`,
  `${CDN}/1BR.jpg`,
  `${CDN}/1BR-2.jpg`,
  `${CDN}/1BR-3.jpg`,
];

export function SymphonyFloorPlan() {
  const [slide, setSlide] = useState(0);

  return (
    <section id="mat-bang" className="scroll-mt-24 bg-[#f9f9f9] pb-16 md:pb-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-20">
        <div className="mb-10 text-center">
          <Image
            src={`${CDN}/Mat-bang-Layout-can-ho-1.png`}
            alt="Mặt bằng layout căn hộ"
            width={600}
            height={62}
            className="mx-auto h-auto w-full max-w-md"
          />
        </div>

        <div className="mb-10 overflow-hidden rounded-2xl border border-[#d2c4bb]/30 bg-gradient-to-b from-[#e29ab2] to-[#002f73] p-4 md:p-6">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="overflow-hidden rounded-xl bg-white p-2">
              <Image
                src={`${CDN}/layout-toa.jpg`}
                alt="Layout tòa"
                width={960}
                height={640}
                className="h-auto w-full rounded-lg"
              />
            </div>
            <div className="overflow-hidden rounded-xl">
              <div className="relative aspect-[3/4] w-full">
                <Image
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

        <div className="rounded-2xl border border-[#d2c4bb]/40 bg-white p-8 text-center shadow-sm">
          <p className="mb-6 font-serif text-[#4a3829] md:text-lg">
            Anh chị để lại thông tin để nhận giỏ hàng phù hợp với mình nhé!
          </p>
          <ProjectLeadForm variant="light" className="mx-auto max-w-4xl" />
        </div>
      </div>
    </section>
  );
}