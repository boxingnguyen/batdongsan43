"use client";

/**
 * CamelliaClient.tsx – Client Component
 *
 * Chứa toàn bộ interactive UI của trang The Camellia Sơn Trà:
 *  - CamelliaNav        : sticky navigation (useState scroll, mobile menu)
 *  - HeroCarousel       : carousel ảnh hero (useState, useRef, pointer drag)
 *  - LayoutCarousel     : carousel mặt bằng (autoplay, hover stop)
 *  - CanHoSection       : cards loại căn hộ (onClick scroll + highlight)
 *  - FloorPlanGrid      : sơ đồ căn hộ (onClick lightbox)
 *  - GalleryGrid        : lưới ảnh (onClick lightbox)
 *  - LightboxModal      : modal xem ảnh toàn màn hình
 *  - CamelliaPageClient : wrapper root quản lý state lightbox chung toàn trang
 *
 * page.tsx (Server Component) chỉ import <CamelliaPageClient /> 1 lần.
 * Tất cả H1, H2, H3, content SEO vẫn nằm ở page.tsx → Google Bot index được.
 */

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { HideSiteHeader } from "@/components/projects/HideSiteHeader";
import { SITE_NAME } from "@/config/site";
import { ProjectScrollPopup } from "@/components/projects/ProjectScrollPopup";

// ─── Brand Colors ─────────────────────────────────────────────────────────────
// Primary:   #16384C  (Deep Ocean Blue)
// Secondary: #C9A45D  (Champagne Gold)
// Accent:    #5C8269  (Forest Green)
// Bg:        #F8F7F3  (Warm White)
// Surface:   #E8E5DF  (Stone Gray)
// Text:      #2B2B2B  (Charcoal)

// ─── Constants ────────────────────────────────────────────────────────────────

export const CAROUSEL_IMAGES = [
  "/images/camellia_images/camellia-phoi-canh-tang-mai.jpg",
  "/images/camellia_images/camellia-phoi-canh-tang-1.jpg",
  "/images/camellia_images/camellia-phoi-canh-tang-mai-2.jpg",
  "/images/camellia_images/camellia-phoi-canh.jpg",


];

export const LAYOUT_IMAGES = [
  "/images/camellia_images/layout/camellia-layout-mat-bang.jpg",
  "/images/camellia_images/layout/camellia-layout-studio.jpg",
  "/images/camellia_images/layout/camellia-layout-1br.jpg",
  "/images/camellia_images/layout/camellia-layout-2br.jpg",
  "/images/camellia_images/layout/camellia-layout-3br.jpg"
];

export const LAYOUT_IMAGE_LABELS = [
  "Mặt Bằng Điển Hình",
  "Studio",
  "1 Phòng Ngủ",
  "2 Phòng Ngủ",
  "3 Phòng Ngủ",
];

// ✅ SEO: Alt text mô tả cụ thể, chứa từ khóa
export const IMAGE_ALTS = [
  "The Camellia Sơn Trà Đà Nẵng – Phối cảnh tổng thể Luxury Urban Nature Residence",
  "The Camellia Sơn Trà – Kiến trúc lấy cảm hứng từ Núi Đá Biển Sơn Trà",
  "The Camellia Sơn Trà – Indoor Pool tiêu chuẩn Wellness cao cấp",
  "The Camellia Sơn Trà – Gym và Yoga nội khu Luxury",
  "The Camellia Sơn Trà – Business Lounge và Coworking Space",
  "The Camellia Sơn Trà – Kid Club và khu vui chơi trẻ em",
  "The Camellia Sơn Trà – Forest Heart và Walking Path thiên nhiên",
  "The Camellia Sơn Trà – Sky Garden tầng cao view Biển Mỹ Khê",
  "The Camellia Sơn Trà – BBQ Garden và Sky Experience",
  "The Camellia Sơn Trà – Morning Mist Garden và Meditation Garden",
  "The Camellia Sơn Trà – Không gian sống rừng phố biển độc bản",
  "The Camellia Sơn Trà – Nội thất căn hộ Luxury chuẩn bàn giao Grohe Kohler",
];

const navLinks = [
  { href: "#tong-quan", label: "Tổng Quan" },
  { href: "#vi-tri", label: "Vị Trí" },
  { href: "#can-ho", label: "Căn Hộ" },
  { href: "#tien-ich", label: "Tiện Ích" },
  { href: "#hinh-anh", label: "Hình Ảnh" },
  { href: "#tien-do", label: "Tiến Độ" },
];

// ─── CamelliaNav ──────────────────────────────────────────────────────────────

function CamelliaNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[#E8E5DF]/50 bg-[#F8F7F3]/95 backdrop-blur-md transition-shadow${scrolled ? " shadow-sm" : ""
        }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-20">
        <Link
          href="/"
          className="font-serif text-xl tracking-tight text-[#16384C]"
        >
          {SITE_NAME}
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold uppercase tracking-wide text-[#2B2B2B] transition-colors hover:text-[#16384C]"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="p-2 text-[#16384C] lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-[#E8E5DF]/50 bg-[#F8F7F3]/98 px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold uppercase tracking-wide text-[#2B2B2B]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

// ─── HeroCarousel ─────────────────────────────────────────────────────────────

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const total = CAROUSEL_IMAGES.length;
  const dragStart = useRef<number | null>(null);
  const isDragging = useRef(false);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (index: number) => {
      setCurrent(((index % total) + total) % total);
    },
    [total],
  );

  const next = useCallback(() => go(current + 1), [current, go]);
  const prev = useCallback(() => go(current - 1), [current, go]);

  const resetAuto = useCallback(() => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    autoTimer.current = setInterval(
      () => setCurrent((c) => (c + 1) % total),
      5000,
    );
  }, [total]);

  useEffect(() => {
    resetAuto();
    return () => {
      if (autoTimer.current) clearInterval(autoTimer.current);
    };
  }, [resetAuto]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStart.current = e.clientX;
    isDragging.current = false;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    if (Math.abs(e.clientX - dragStart.current) > 5) isDragging.current = true;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    const delta = e.clientX - dragStart.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) next();
      else prev();
      resetAuto();
    }
    dragStart.current = null;
    isDragging.current = false;
  };

  return (
    <section
      className="relative flex min-h-[90vh] select-none items-end overflow-hidden bg-[#16384C] py-0 cursor-grab active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={() => {
        dragStart.current = null;
        isDragging.current = false;
      }}
    >
      {CAROUSEL_IMAGES.map((src, i) => (
        <div
          key={src}
          className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"
            }`}
        >
          <Image
            src={src}
            alt={IMAGE_ALTS[i] ?? `The Camellia Sơn Trà Đà Nẵng – Luxury Urban Nature Residence ${i + 1}`}
            fill
            // ✅ SEO: priority cho hero LCP image
            priority={i === 0}
            draggable={false}
            className="object-cover opacity-90"
            sizes="100vw"
            quality={85}
          />
        </div>
      ))}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Prev / Next */}
      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => { e.stopPropagation(); prev(); resetAuto(); }}
        aria-label="Ảnh trước"
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition hover:bg-black/50 md:left-8 md:p-3"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>
      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => { e.stopPropagation(); next(); resetAuto(); }}
        aria-label="Ảnh tiếp"
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition hover:bg-black/50 md:right-8 md:p-3"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {CAROUSEL_IMAGES.map((_, i) => (
          <button
            key={i}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); go(i); resetAuto(); }}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-[#C9A45D]" : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
          />
        ))}
      </div>

      {/* Counter */}
      <p className="pointer-events-none absolute bottom-6 right-5 z-20 text-xs font-semibold tabular-nums text-white/50 md:right-8">
        {current + 1} / {total}
      </p>

      {/* Hero Text */}
      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-24 md:px-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A45D]">
          MBLand Holding · WeLand · Thành Lâm
        </p>
        {/* H1 – Next.js SSR pre-render được cả Client Component trong Server Component */}
        <h1 className="font-serif text-4xl font-bold text-white md:text-6xl lg:text-7xl">
          The Camellia Sơn Trà – Nơi Rừng × Phố × Biển Gặp Gỡ
        </h1>
        <p className="mt-3 text-lg font-medium text-white/90 md:text-2xl">
          Luxury Urban Nature Residence — Sơn Trà, Đà Nẵng
        </p>
        <p className="mt-2 text-sm text-white/70 md:text-base">
          Rừng nguyên sinh Sơn Trà · Biển Mỹ Khê · Trung tâm Đà Nẵng · Sở hữu lâu dài
        </p>
      </div>
    </section>
  );
}

// ─── LayoutCarousel ───────────────────────────────────────────────────────────

function LayoutCarousel({
  images,
  labels,
  onImageClick,
}: {
  images: string[];
  labels: string[];
  onImageClick: (src: string) => void;
}) {
  const [current, setCurrent] = useState(0);
  const total = images.length;
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetAuto = useCallback(() => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    autoTimer.current = setInterval(
      () => setCurrent((c) => (c + 1) % total),
      2000,
    );
  }, [total]);

  const stopAuto = useCallback(() => {
    if (autoTimer.current) clearInterval(autoTimer.current);
  }, []);

  useEffect(() => {
    resetAuto();
    return () => {
      if (autoTimer.current) clearInterval(autoTimer.current);
    };
  }, [resetAuto]);

  return (
    <div
      className="group relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-white/10 shadow-lg"
      onMouseEnter={stopAuto}
      onMouseLeave={resetAuto}
    >
      {images.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 cursor-pointer transition-opacity duration-700 ${i === current ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          onClick={() => onImageClick(src)}
        >
          <Image
            src={src}
            alt={`Mặt bằng ${labels[i] ?? i + 1} - The Camellia Sơn Trà`}
            fill
            className="transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
            <span className="rounded-sm bg-white/90 px-3 py-1.5 text-sm font-semibold text-[#16384C] shadow-sm backdrop-blur-sm">
              Xem
            </span>
          </div>
        </div>
      ))}
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); resetAuto(); }}
            aria-label={`Mặt bằng ${labels[i] ?? i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-[#C9A45D]" : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── LightboxModal ────────────────────────────────────────────────────────────

function LightboxModal({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 md:right-8 md:top-8"
        onClick={onClose}
        aria-label="Đóng"
      >
        <X className="h-6 w-6 md:h-8 md:w-8" />
      </button>
      <div
        className="relative h-full w-full max-w-6xl p-4 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt="The Camellia Sơn Trà – phối cảnh chi tiết"
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>
    </div>
  );
}

// ─── CanHoSection ─────────────────────────────────────────────────────────────

function CanHoSection({ onImageClick }: { onImageClick: (src: string) => void }) {
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null);

  const apartments = [
    {
      type: "Studio",
      size: "27.8 – 47.3 m²",
      badge: "163 căn",
      desc: "Tối ưu cho cá nhân & đầu tư. Thiết kế thông minh, view biển và rừng Sơn Trà.",
      id: "layout-studio",
    },
    {
      type: "1 Phòng Ngủ",
      size: "Tối ưu công năng",
      badge: "Linh hoạt",
      desc: "Không gian sống hiện đại, tiện nghi cho người độc thân hoặc cặp đôi trẻ.",
      id: "layout-1br",
    },
    {
      type: "2 Phòng Ngủ",
      size: "57.4 – 72.7 m²",
      badge: "206 căn",
      desc: "Phù hợp gia đình nhỏ và second home. Ban công rộng, đón gió biển tự nhiên.",
      id: "layout-2br",
    },
    {
      type: "3 Phòng Ngủ",
      size: "83.9 – 103.6 m²",
      badge: "84 căn",
      desc: "Không gian sống rộng rãi, nâng tầm đẳng cấp. Tầm nhìn toàn cảnh Sơn Trà.",
      id: "layout-3br",
    },
  ];

  const layouts = [
    {
      name: "Mặt Bằng Điển Hình",
      image: LAYOUT_IMAGES[0],
      id: "layout-tong-the",
    },
    {
      name: "Studio\n27.8 – 47.3 m²",
      image: LAYOUT_IMAGES[1],
      id: "layout-studio",
    },
    {
      name: "1 Phòng Ngủ",
      image: LAYOUT_IMAGES[2],
      id: "layout-1br",
    },
    {
      name: "2 Phòng Ngủ\n57.4 – 72.7 m²",
      image: LAYOUT_IMAGES[3],
      id: "layout-2br",
    },
    {
      name: "3 Phòng Ngủ\n83.9 – 103.6 m²",
      image: LAYOUT_IMAGES[4],
      id: "layout-3br",
    },
  ];

  return (
    <section id="can-ho" className="scroll-mt-16 bg-white pb-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5C8269]/70">
          Sản Phẩm & Thiết Kế
        </p>
        <h2 className="mt-3 font-serif text-3xl text-[#16384C] md:text-4xl">
          Bộ Sưu Tập Căn Hộ – The Camellia Collection
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#2B2B2B]/70">
          478 Residences được thiết kế theo cảm hứng Núi – Đá – Biển Sơn Trà với kiến trúc kính
          floor-to-ceiling, ban công rộng đón gió biển và ánh sáng tự nhiên tràn ngập không gian.
        </p>

        {/* Apartment Type Cards */}
        <div className="mt-12">
          <h3 className="font-serif text-2xl font-semibold text-[#16384C]">
            Các Loại Căn Hộ
          </h3>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {apartments.map((apt) => (
              <div
                key={apt.type}
                onClick={() => {
                  setSelectedLayout(apt.id);
                  const el = document.getElementById(apt.id);
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="group cursor-pointer rounded-sm border border-[#E8E5DF] p-6 transition-all hover:shadow-md hover:border-[#C9A45D] hover:bg-[#F8F7F3]"
              >
                <p className="font-serif text-xl font-semibold text-[#16384C] group-hover:text-[#C9A45D]">
                  {apt.type}
                </p>
                <p className="text-sm font-semibold text-[#C9A45D]">{apt.size}</p>
                {apt.badge && (
                  <span className="mt-2 inline-block rounded-sm bg-[#C9A45D]/15 px-2 py-0.5 text-[11px] font-semibold text-[#8a6a2a]">
                    {apt.badge}
                  </span>
                )}
                <p className="mt-3 text-sm leading-relaxed text-[#2B2B2B]/70">
                  {apt.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Floor Plans */}
        <div className="mt-12">
          <h3 className="font-serif text-2xl font-semibold text-[#16384C]">
            Mặt Bằng Căn Hộ Chi Tiết
          </h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {layouts.map((layout) => (
              <div
                key={layout.id}
                id={layout.id}
                className={`group relative cursor-pointer overflow-hidden rounded-sm border-2 transition-all ${selectedLayout === layout.id
                  ? "border-[#C9A45D] shadow-lg"
                  : "border-[#E8E5DF] hover:shadow-lg"
                  }`}
                onClick={() => {
                  setSelectedLayout(layout.id);
                  onImageClick(layout.image);
                }}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#E8E5DF]">
                  <Image
                    src={layout.image}
                    alt={layout.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/80 group-hover:via-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-center text-xl font-bold text-white drop-shadow-lg whitespace-pre-line">
                      {layout.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Handover Standards */}
        <div className="mt-12 rounded-lg border border-[#E8E5DF] bg-[#F8F7F3] p-6 md:p-8">
          <h3 className="font-serif text-xl font-semibold text-[#16384C]">
            Tiêu Chuẩn Bàn Giao – Premium Brands
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Phòng tắm", value: "Grohe · Bravat · Kohler" },
              { label: "Bếp", value: "Hafele · Teka" },
              { label: "Điều hòa", value: "Daikin · LG · Mitsubishi · Panasonic" },
              { label: "Khóa thông minh", value: "Giovani Smart Lock" },
              { label: "Không gian", value: "High Ceiling · Wide Balcony · Luxury Finish" },
              { label: "An ninh", value: "5-Layer Security System" },
            ].map((item) => (
              <div key={item.label} className="rounded-sm border border-[#E8E5DF] bg-white p-4 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#5C8269]/70">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-[#16384C]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── HinhAnhSection ───────────────────────────────────────────────────────────

function HinhAnhSection({ onImageClick }: { onImageClick: (src: string) => void }) {
  return (
    <section id="hinh-anh" className="scroll-mt-16 bg-white pb-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5C8269]/70">
          Hình Ảnh Thực Tế
        </p>
        <h2 className="mt-3 font-serif text-3xl text-[#16384C] md:text-4xl">
          Phối Cảnh Dự Án
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CAROUSEL_IMAGES.map((src, i) => (
            <div
              key={i}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-sm bg-[#E8E5DF]"
              onClick={() => onImageClick(src)}
            >
              <Image
                src={src}
                alt={IMAGE_ALTS[i] ?? `The Camellia Sơn Trà – phối cảnh ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
                <span className="rounded-sm bg-white/90 px-3 py-1.5 text-sm font-semibold text-[#16384C] shadow-sm backdrop-blur-sm">
                  Xem
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CamelliaPageClient ───────────────────────────────────────────────────────
// Root client wrapper – quản lý state lightbox chung + render tất cả interactive sections
// page.tsx (Server Component) chỉ import component này 1 lần.

export function CamelliaPageClient() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      {/* Ẩn site header mặc định khi ở project page */}
      <HideSiteHeader />

      {/* Sticky navigation */}
      <CamelliaNav />

      {/* Hero carousel với H1 overlay */}
      <HeroCarousel />

      {/* Section căn hộ – có ApartmentCards + FloorPlanGrid tương tác */}
      <CanHoSection onImageClick={setSelectedImage} />

      {/* Section hình ảnh – có GalleryGrid tương tác */}
      <HinhAnhSection onImageClick={setSelectedImage} />

      {/* Lightbox Modal – controlled bởi state chung */}
      {selectedImage && (
        <LightboxModal src={selectedImage} onClose={() => setSelectedImage(null)} />
      )}

      {/* Scroll popup CTA */}
      <ProjectScrollPopup projectName="The Camellia Sơn Trà" accent="#C9A45D" />
    </>
  );
}
