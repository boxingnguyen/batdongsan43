"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const mapSlides = [
  "/images/symphony5/map-tien-ich-new.jpg",
  "/images/symphony5/map-tien-ich-2.jpg",
  "/images/symphony5/map-tien-ich-3-1.jpg",
  "/images/symphony5/map-tien-ich-4.jpg",
];

const perks = [
  "Công viên thể thao 10.000m² với đầy đủ các bộ môn rèn luyện sức khỏe",
  "Central Park 5.000m² & Công viên ven sông 4.000m² không gian xanh mát",
  "Bể bơi vô cực, Gym – Yoga – Spa, Club House, Kid Club, bến du thuyền sang trọng...",
];

export function SymphonyAmenities() {
  const [slide, setSlide] = useState(0);

  return (
    <section id="tien-ich" className="scroll-mt-24 bg-[#f9f9f9] pb-16 md:pb-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-20">
        <div className="mb-10 text-center">
          <Image
            src="/images/symphony5/Tron-ven-he-tien-ich-cua-To-hop-dang-cap-tu-Sun-Group-1.png"
            alt="Tiện ích"
            width={600}
            height={126}
            className="mx-auto h-auto w-full max-w-lg"
          />
        </div>

        <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="relative aspect-[21/9] w-full">
            <Image
              src={mapSlides[slide]}
              alt="Sơ đồ tiện ích"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
          <div className="flex justify-center gap-2 p-4">
            {mapSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSlide(i)}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-colors",
                  i === slide ? "bg-[#ce9e51]" : "bg-[#d2c4bb]"
                )}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <p className="mb-6 text-[#4e453e]">
          Cư dân &amp; khách lưu trú tại Symphony 5 được tận hưởng hệ sinh thái tiện ích đẳng cấp quy
          mô lớn:
        </p>
        <ul className="grid gap-4 md:grid-cols-3">
          {perks.map((text) => (
            <li key={text} className="flex gap-2 text-sm text-[#4e453e] md:text-base">
              <span className="text-[#fcdd8b]">✦</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}