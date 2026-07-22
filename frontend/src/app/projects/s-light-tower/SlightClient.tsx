"use client";

/**
 * SlightClient.tsx – Client Component
 *
 * Chứa toàn bộ interactive UI của trang S-Light Tower:
 *  - SLightNav        : sticky navigation (useState scroll, mobile menu)
 *  - HeroCarousel     : carousel ảnh hero (useState, useRef, pointer drag)
 *  - LayoutCarousel   : carousel mặt bằng (autoplay, hover stop)
 *  - ApartmentCards   : cards loại căn hộ (onClick scroll + highlight)
 *  - FloorPlanGrid    : sơ đồ căn hộ (onClick lightbox)
 *  - GalleryGrid      : lưới ảnh (onClick lightbox)
 *  - LightboxModal    : modal xem ảnh toàn màn hình
 *  - SLightPageClient : wrapper root quản lý state lightbox chung toàn trang
 *
 * page.tsx (Server Component) chỉ import <SLightPageClient /> 1 lần.
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

// ─── Constants ────────────────────────────────────────────────────────────────

export const CAROUSEL_IMAGES = [
  "/images/slight_images/s-light-tower-toa-nha-doi-phao-hoa-dem.jpg",
  "/images/slight_images/s-light-tower-toa-nha-doi-ban-ngay.jpg",
  "/images/slight_images/s-light-tower-phong-ngu-view-song-han.jpg",
  "/images/slight_images/s-light-tower-ban-cong-phao-hoa-diff.jpg",
  "/images/slight_images/slight6.jpg",
  "/images/slight_images/slight7.jpg",
  "/images/slight_images/slight1.jpg",
  "/images/slight_images/slight3.jpg",
  "/images/slight_images/slight5.jpg",
  "/images/slight_images/slight8.jpg",
  "/images/slight_images/s-light-tower-ban-cong-tang-15.jpg",
  "/images/slight_images/s-light-tower-ban-cong-phao-hoa-tong-the.jpg",
];

export const LAYOUT_IMAGES = [
  "/images/slight_images/layout/s-light-tower-layout-tang-2.jpg",
  "/images/slight_images/layout/s-light-tower-layout-tang-3.jpg",
  "/images/slight_images/layout/s-light-tower-layout-tang-3a.jpg",
  "/images/slight_images/layout/s-light-tower-layout-tang-7.jpg",
];

export const LAYOUT_IMAGE_LABELS = ["Tầng 2", "Tầng 3", "Tầng 3A", "Tầng 7"];

// ✅ SEO: Alt text mô tả cụ thể, chứa từ khóa (thay vì "S-Light Tower 1", "S-Light Tower 2"...)
export const IMAGE_ALTS = [
  "S-Light Tower Đà Nẵng – Tháp Đôi Pháo Hoa Đêm DIFF Sông Hàn",
  "S-Light Tower nhìn từ ban ngày – Sun NeO City Hòa Xuân Đà Nẵng",
  "Phòng ngủ S-Light Tower – View Sông Hàn Đà Nẵng 270 độ",
  "Ban công S-Light Tower – Pháo hoa DIFF Đà Nẵng",
  "S-Light Tower – Tầng cao view Sông Hàn buổi hoàng hôn",
  "S-Light Tower – Nội thất hiện đại căn hộ cao cấp",
  "S-Light Tower – Không gian sống đẳng cấp tại Hòa Xuân",
  "S-Light Tower – Căn hộ mặt sông Hàn Đà Nẵng",
  "S-Light Tower – Tiện ích hồ bơi nội khu Sun NeO City",
  "S-Light Tower – Phối cảnh tổng thể khu đô thị",
  "S-Light Tower – Ban công tầng 15 view sông Hàn",
  "S-Light Tower – Pháo hoa tổng thể nhìn từ ban công",
];

const navLinks = [
  { href: "#chinh-sach", label: "Chính Sách" },
  { href: "#tong-quan", label: "Tổng Quan" },
  { href: "#can-ho", label: "Căn Hộ & Sơ Đồ" },
  { href: "#vi-tri", label: "Vị Trí" },
  { href: "#tien-ich", label: "Tiện Ích" },
  { href: "#hinh-anh", label: "Hình Ảnh" },
  { href: "#tien-do", label: "Tiến Độ" },
];

// ─── SLightNav ────────────────────────────────────────────────────────────────

function SLightNav() {
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
      className={`sticky top-0 z-50 border-b border-[#d2c4bb]/30 bg-[#f9f9f9]/95 backdrop-blur-md transition-shadow${
        scrolled ? " shadow-sm" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-20">
        <Link
          href="/"
          className="font-serif text-xl tracking-tight text-[#4a3829]"
        >
          {SITE_NAME}
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold uppercase tracking-wide text-[#4e453e] transition-colors hover:text-[#4a3829]"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="p-2 text-[#4a3829] lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-[#d2c4bb]/30 bg-[#f9f9f9]/98 px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold uppercase tracking-wide text-[#4e453e]"
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
      delta < 0 ? next() : prev();
      resetAuto();
    }
    dragStart.current = null;
    isDragging.current = false;
  };

  return (
    <section
      className="relative flex min-h-[90vh] select-none items-end overflow-hidden bg-[#0d1520] py-0 cursor-grab active:cursor-grabbing"
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
          className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={IMAGE_ALTS[i] ?? `S-Light Tower Đà Nẵng – Căn Hộ View Sông Hàn ${i + 1}`}
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

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

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
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-[#C8A96E]" : "w-1.5 bg-white/40 hover:bg-white/70"
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
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#C8A96E]">
          Sun Property · Sun NeO City
        </p>
        {/* H1 nằm ở đây vì nó overlay trên carousel (client-side animation)
            Tuy nhiên Next.js vẫn SSR được vì đây là "use client" component
            được render trong Server Component → HTML vẫn xuất hiện trong SSR */}
        <h1 className="font-serif text-4xl font-bold text-white md:text-6xl lg:text-7xl">
          S-Light Tower Đà Nẵng – Căn Hộ View Sông Hàn 270°
        </h1>
        <p className="mt-3 text-lg font-medium text-white/90 md:text-2xl">
          Tháp đôi biểu tượng — Cửa ngõ Nam Đà Nẵng
        </p>
        <p className="mt-2 text-sm text-white/70 md:text-base">
          Tầm nhìn 360° · Sông Hàn · Núi Ngũ Hành · Biển Đông · Pháo hoa DIFF
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
      1500,
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
          className={`absolute inset-0 cursor-pointer transition-opacity duration-700 ${
            i === current ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={() => onImageClick(src)}
        >
          <Image
            src={src}
            alt={`Mặt bằng ${labels[i] ?? i + 1} - S-Light Tower`}
            fill
            className="transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
            <span className="rounded-sm bg-white/90 px-3 py-1.5 text-sm font-semibold text-[#4a3829] shadow-sm backdrop-blur-sm">
              Xem
            </span>
          </div>
        </div>
      ))}
      <div className="object-cover absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); resetAuto(); }}
            aria-label={`Mặt bằng ${labels[i] ?? i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-[#C8A96E]" : "w-1.5 bg-white/40 hover:bg-white/70"
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
          alt="S-Light Tower phối cảnh chi tiết"
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>
    </div>
  );
}

// ─── ChinhSachSection (interactive: LayoutCarousel + lightbox) ────────────────

function ChinhSachSection({ onImageClick }: { onImageClick: (src: string) => void }) {
  return (
    <section
      id="chinh-sach"
      className="scroll-mt-16 bg-gradient-to-b from-[#4a3829] to-[#3a2f28] pb-20 text-white"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C8A96E]/70">
          Chính Sách Mở Bán
        </p>
        <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
          Sun Early Key — Cơ Hội Vàng
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80">
          Chính sách ưu tiên độc quyền dành cho khách hàng đăng ký sớm. Thanh
          toán linh hoạt, hỗ trợ lãi suất và các ưu đãi tối ưu.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-1">
          <LayoutCarousel
            images={LAYOUT_IMAGES.slice(0, 4)}
            labels={LAYOUT_IMAGE_LABELS.slice(0, 4)}
            onImageClick={onImageClick}
          />
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Thanh Toán", value: "70%", desc: "nhận nhà" },
            { label: "Hỗ Trợ Lãi Suất", value: "24", desc: "tháng" },
            { label: "TT Tiến Độ", value: "48", desc: "tháng" },
          ].map((benefit) => (
            <div
              key={benefit.label}
              className="rounded-lg border border-[#C8A96E]/30 bg-white/5 p-6 text-center backdrop-blur-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[#C8A96E]/70">
                {benefit.label}
              </p>
              <p className="mt-3 font-serif text-3xl font-bold text-[#C8A96E]">
                {benefit.value}
              </p>
              <p className="mt-1 text-sm text-white/70">{benefit.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-white/50">
          * Giá dự tính từ 2.4 tỷ. Đã bao gồm VAT + KBBT. Chi tiết tại trang
          thông tin dự án.
        </p>
      </div>
    </section>
  );
}

// ─── CanHoSection (interactive: ApartmentCards + FloorPlanGrid + lightbox) ────

function CanHoSection({ onImageClick }: { onImageClick: (src: string) => void }) {
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null);

  const apartments = [
    { type: "Studio", size: "33,3 m²", badge: "~20% quỹ căn", desc: "1 phòng ngủ · Bếp · Phòng vệ sinh · Ban công", id: "layout-studio" },
    { type: "1BR Plus", size: "49,3 m²", badge: "~50% quỹ căn", desc: "1 phòng ngủ · Phòng khách · Bếp · 1 vệ sinh · Ban công", id: "layout-1br-plus" },
    { type: "2 Phòng Ngủ", size: "76 m²", badge: "", desc: "2 phòng ngủ · Phòng khách · Bếp · 2 vệ sinh", id: "layout-2br" },
    { type: "3 Phòng Ngủ", size: "95,1 m²", badge: "", desc: "3 phòng ngủ · Phòng khách · Bếp · 2 vệ sinh", id: "layout-3br" },
  ];

  const layouts = [
    { name: "Studio\n33.3 m²", image: "/images/slight_images/layout/s-light-tower-layout-studio-33m2.jpg", id: "layout-studio" },
    { name: "1BR Plus\n49.3 m²", image: "/images/slight_images/layout/s-light-tower-layout-1br-plus-49m2.jpg", id: "layout-1br-plus" },
    { name: "2 Phòng Ngủ\n76 m²", image: "/images/slight_images/layout/s-light-tower-layout-2br-76m2.jpg", id: "layout-2br" },
    { name: "3 Phòng Ngủ\n95.1 m²", image: "/images/slight_images/layout/s-light-tower-layout-3br-95m2.jpg", id: "layout-3br" },
  ];

  return (
    <section id="can-ho" className="scroll-mt-16 bg-white pb-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#634F3F]/70">
          Sản Phẩm & Thiết Kế
        </p>
        <h2 className="mt-3 font-serif text-3xl text-[#4a3829] md:text-4xl">
          Các Loại Căn Hộ & Sơ Đồ Chi Tiết
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#4e453e]/80">
          Studio và 1 phòng ngủ chiếm ~70% quỹ căn với thiết kế tối ưu không
          gian, đảm bảo thanh khoản vượt trội và tỷ lệ lấp đầy cao khi khai
          thác cho thuê.
        </p>

        {/* Apartment Type Cards */}
        <div className="mt-12">
          <h3 className="font-serif text-2xl font-semibold text-[#4a3829]">
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
                className="group cursor-pointer rounded-sm border border-[#E8E2D9] p-6 transition-all hover:shadow-md hover:border-[#C8A96E] hover:bg-[#f9f9f9]"
              >
                <p className="font-serif text-xl font-semibold text-[#4a3829] group-hover:text-[#C8A96E]">
                  {apt.type}
                </p>
                <p className="text-sm font-semibold text-[#C8A96E]">{apt.size}</p>
                {apt.badge && (
                  <span className="mt-2 inline-block rounded-sm bg-[#C8A96E]/15 px-2 py-0.5 text-[11px] font-semibold text-[#8a6a3a]">
                    {apt.badge}
                  </span>
                )}
                <p className="mt-3 text-sm leading-relaxed text-[#4e453e]/80">
                  {apt.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Floor Plans */}
        <div className="mt-12">
          <h3 className="font-serif text-2xl font-semibold text-[#4a3829]">
            Sơ Đồ Căn Hộ Chi Tiết
          </h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {layouts.map((layout) => (
              <div
                key={layout.id}
                id={layout.id}
                className={`group relative cursor-pointer overflow-hidden rounded-sm border-2 transition-all ${
                  selectedLayout === layout.id
                    ? "border-[#C8A96E] shadow-lg"
                    : "border-[#E8E2D9] hover:shadow-lg"
                }`}
                onClick={() => {
                  setSelectedLayout(layout.id);
                  onImageClick(layout.image);
                }}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#E8E2D9]">
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
      </div>
    </section>
  );
}

// ─── HinhAnhSection (interactive: GalleryGrid + lightbox) ────────────────────

function HinhAnhSection({ onImageClick }: { onImageClick: (src: string) => void }) {
  return (
    <section id="hinh-anh" className="scroll-mt-16 bg-white pb-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#634F3F]/70">
          Hình Ảnh Thực Tế
        </p>
        <h2 className="mt-3 font-serif text-3xl text-[#4a3829] md:text-4xl">
          Phối Cảnh Dự Án
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CAROUSEL_IMAGES.map((src, i) => (
            <div
              key={i}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-sm bg-[#E8E2D9]"
              onClick={() => onImageClick(src)}
            >
              <Image
                src={src}
                alt={IMAGE_ALTS[i] ?? `S-Light Tower phối cảnh ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
                <span className="rounded-sm bg-white/90 px-3 py-1.5 text-sm font-semibold text-[#4a3829] shadow-sm backdrop-blur-sm">
                  Xem
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-[#634F3F]/50">
          Ảnh: S-Light Tower · Sun Property
        </p>
      </div>
    </section>
  );
}

// ─── SLightPageClient ─────────────────────────────────────────────────────────
// Root client wrapper – quản lý state lightbox chung + render tất cả interactive sections
// page.tsx (Server Component) chỉ import component này 1 lần.

export function SLightPageClient() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      {/* Ẩn site header mặc định khi ở project page */}
      <HideSiteHeader />

      {/* Sticky navigation */}
      <SLightNav />

      {/* Hero carousel với H1 overlay */}
      <HeroCarousel />

      {/* Section chính sách – có LayoutCarousel tương tác */}
      <ChinhSachSection onImageClick={setSelectedImage} />

      {/* Section căn hộ – có ApartmentCards + FloorPlanGrid tương tác */}
      <CanHoSection onImageClick={setSelectedImage} />

      {/* Section hình ảnh – có GalleryGrid tương tác */}
      <HinhAnhSection onImageClick={setSelectedImage} />

      {/* Lightbox Modal – controlled bởi state chung */}
      {selectedImage && (
        <LightboxModal src={selectedImage} onClose={() => setSelectedImage(null)} />
      )}

      {/* Scroll popup CTA */}
      <ProjectScrollPopup projectName="S-Light Tower" accent="#C8A96E" />
    </>
  );
}