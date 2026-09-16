"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Car,
  TreePine,
  Waves,
  MapPin,
  Building2,
  Plane,
} from "lucide-react";
import { HideSiteHeader } from "@/components/projects/HideSiteHeader";
import { SITE_NAME } from "@/config/site";
import { ProjectScrollPopup } from "@/components/projects/ProjectScrollPopup";
import { ChatSection } from "@/components/chat/ChatSection";

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
  { href: "#mat-bang-tang", label: "Mặt Bằng Tầng" },
  { href: "#tien-ich", label: "Tiện Ích" },
  { href: "#hinh-anh", label: "Hình Ảnh" },
  { href: "#tien-do", label: "Tiến Độ" },
  { href: "#tra-loi", label: "Hỏi Đáp" },
];

// ─── Dữ liệu 22 căn hộ – enhanced với svgId, loại căn, hướng, view, trạng thái ────────
// Loại căn dựa theo màu fill thực tế trong SVG:
// #B5D2E2 → Studio | #E7E7DD → 2PN,2VS | #E7856C → 3PN | #D7BBB0 → 1.5PN | #CEA27D → 2PN,1VS

const APARTMENT_UNITS = [
  { id: "ch-01", svgId: "t4-ch-01", name: "CH-01", type: "2PN, 2VS", thong_thuy: "68.3", tim_tuong: "73.8", huong: "Đông Nam", view: "Biển + Thành phố", status: "Còn hàng", imageUrls: ["https://thecamellia.vn/wp-content/uploads/2026/08/CH1.png", "https://thecamellia.vn/wp-content/uploads/2026/08/MB-CH-01.png"] },
  { id: "ch-02", svgId: "t4-ch-02", name: "CH-02", type: "2PN, 2VS", thong_thuy: "69.9", tim_tuong: "76.5", huong: "Đông", view: "Biển Mỹ Khê", status: "Còn hàng", imageUrls: ["https://thecamellia.vn/wp-content/uploads/2026/08/CH1.png"] },
  { id: "ch-03", svgId: "t4-ch-03", name: "CH-03", type: "3PN", thong_thuy: "89.3", tim_tuong: "100.0", huong: "Tây Nam", view: "Thành phố", status: "Còn hàng", imageUrls: ["https://thecamellia.vn/wp-content/uploads/2026/08/CH3.png", "https://thecamellia.vn/wp-content/uploads/2026/08/MB-CH-03.png"] },
  { id: "ch-03a", svgId: "t4-ch-03a", name: "CH-03A", type: "2PN, 2VS", thong_thuy: "65.1", tim_tuong: "71.1", huong: "Tây", view: "Thành phố", status: "Còn hàng", imageUrls: ["https://thecamellia.vn/wp-content/uploads/2026/08/CH3A.png", "https://thecamellia.vn/wp-content/uploads/2026/08/MB-CH-03A.png"] },
  { id: "ch-05", svgId: "t4-ch-05", name: "CH-05", type: "2PN, 2VS", thong_thuy: "69.9", tim_tuong: "76.0", huong: "Tây Bắc", view: "Nội khu", status: "Còn hàng", imageUrls: ["https://thecamellia.vn/wp-content/uploads/2026/08/CH1.png", "https://thecamellia.vn/wp-content/uploads/2026/08/MB-CH-01.png"] },
  { id: "ch-06", svgId: "t4-ch-06", name: "CH-06", type: "1.5PN", thong_thuy: "47.0", tim_tuong: "51.5", huong: "Tây", view: "Thành phố", status: "Còn hàng", imageUrls: ["https://thecamellia.vn/wp-content/uploads/2026/08/CH-6.png", "https://thecamellia.vn/wp-content/uploads/2026/08/MB-CH6.png"] },
  { id: "ch-07", svgId: "t4-ch-07", name: "CH-07", type: "2PN, 2VS", thong_thuy: "70.1", tim_tuong: "77.3", huong: "Đông", view: "Biển + Sơn Trà", status: "Còn hàng", imageUrls: ["https://thecamellia.vn/wp-content/uploads/2026/08/CH-7.png", "https://thecamellia.vn/wp-content/uploads/2026/08/MB-CH7.png"] },
  { id: "ch-08", svgId: "t4-ch-08", name: "CH-08", type: "2PN, 2VS", thong_thuy: "70.1", tim_tuong: "76.5", huong: "Đông Bắc", view: "Rừng Sơn Trà", status: "Còn hàng", imageUrls: ["https://thecamellia.vn/wp-content/uploads/2026/08/CH8.png", "https://thecamellia.vn/wp-content/uploads/2026/08/MB-CH-08.png"] },
  { id: "ch-09", svgId: "t4-ch-09", name: "CH-09", type: "Studio", thong_thuy: "28.4", tim_tuong: "32.0", huong: "Bắc", view: "Nội khu", status: "Còn hàng", imageUrls: ["https://thecamellia.vn/wp-content/uploads/2026/08/CH9.png", "https://thecamellia.vn/wp-content/uploads/2026/08/MB-CH-09.png"] },
  { id: "ch-10", svgId: "t4-ch-10", name: "CH-10", type: "2PN, 2VS", thong_thuy: "61.7", tim_tuong: "66.9", huong: "Đông", view: "Biển Mỹ Khê", status: "Còn hàng", imageUrls: ["https://thecamellia.vn/wp-content/uploads/2026/08/CH10.png", "https://thecamellia.vn/wp-content/uploads/2026/08/MB-CH10.png"] },
  { id: "ch-11", svgId: "t4-ch-11", name: "CH-11", type: "3PN", thong_thuy: "88.7", tim_tuong: "97.9", huong: "Đông Bắc", view: "Biển + Sơn Trà", status: "Còn hàng", imageUrls: ["https://thecamellia.vn/wp-content/uploads/2026/08/CH11.png", "https://thecamellia.vn/wp-content/uploads/2026/08/MB-CH11.png"] },
  { id: "ch-12", svgId: "t4-ch-12", name: "CH-12", type: "1.5PN", thong_thuy: "47.2", tim_tuong: "51.4", huong: "Đông", view: "Biển", status: "Còn hàng", imageUrls: ["https://thecamellia.vn/wp-content/uploads/2026/08/CH-6.png", "https://thecamellia.vn/wp-content/uploads/2026/08/MB-CH6.png"] },
  { id: "ch-12a", svgId: "t4-ch-12a", name: "CH-12A", type: "Studio", thong_thuy: "27.8", tim_tuong: "30.9", huong: "Đông", view: "Biển", status: "Còn hàng", imageUrls: ["https://thecamellia.vn/wp-content/uploads/2026/08/CH12A.png", "https://thecamellia.vn/wp-content/uploads/2026/08/MB-CH-12A.png"] },
  { id: "ch-12b", svgId: "t4-ch-12b", name: "CH-12B", type: "2PN, 2VS", thong_thuy: "72.7", tim_tuong: "80.4", huong: "Đông", view: "Biển + Sơn Trà", status: "Còn hàng", imageUrls: ["https://thecamellia.vn/wp-content/uploads/2026/08/CH-7.png", "https://thecamellia.vn/wp-content/uploads/2026/08/MB-CH7.png"] },
  { id: "ch-15", svgId: "t4-ch-15", name: "CH-15", type: "2PN, 1VS", thong_thuy: "57.4", tim_tuong: "63.8", huong: "Tây", view: "Thành phố", status: "Còn hàng", imageUrls: ["https://thecamellia.vn/wp-content/uploads/2026/08/CH-15.png", "https://thecamellia.vn/wp-content/uploads/2026/08/MB-CH15.png"] },
  { id: "ch-16", svgId: "t4-ch-16", name: "CH-16", type: "Studio", thong_thuy: "31.4", tim_tuong: "35.4", huong: "Tây", view: "Thành phố", status: "Còn hàng", imageUrls: ["https://thecamellia.vn/wp-content/uploads/2026/08/CH12A.png", "https://thecamellia.vn/wp-content/uploads/2026/08/MB-CH-12A.png"] },
  { id: "ch-17", svgId: "t4-ch-17", name: "CH-17", type: "1.5PN", thong_thuy: "47.3", tim_tuong: "51.4", huong: "Tây", view: "Thành phố", status: "Còn hàng", imageUrls: ["https://thecamellia.vn/wp-content/uploads/2026/08/CH-6.png", "https://thecamellia.vn/wp-content/uploads/2026/08/MB-CH6.png"] },
  { id: "ch-18", svgId: "t4-ch-18", name: "CH-18", type: "2PN, 2VS", thong_thuy: "72.1", tim_tuong: "81.0", huong: "Nam", view: "Biển + Thành phố", status: "Còn hàng", imageUrls: ["https://thecamellia.vn/wp-content/uploads/2026/08/CH18.png"] },
  { id: "ch-19", svgId: "t4-ch-19", name: "CH-19", type: "3PN", thong_thuy: "103.6", tim_tuong: "114.8", huong: "Nam", view: "Biển", status: "Còn hàng", imageUrls: ["https://thecamellia.vn/wp-content/uploads/2026/08/CH-19.png", "https://thecamellia.vn/wp-content/uploads/2026/08/MB-CH19.png"] },
  { id: "ch-20", svgId: "t4-ch-20", name: "CH-20", type: "3PN", thong_thuy: "84.2", tim_tuong: "93.7", huong: "Đông Nam", view: "Biển", status: "Còn hàng", imageUrls: ["https://thecamellia.vn/wp-content/uploads/2026/08/CH-20.png", "https://thecamellia.vn/wp-content/uploads/2026/08/MB-CH20.png"] },
  { id: "ch-21", svgId: "t4-ch-21", name: "CH-21", type: "1.5PN", thong_thuy: "47.1", tim_tuong: "52.8", huong: "Nam", view: "Biển", status: "Còn hàng", imageUrls: ["https://thecamellia.vn/wp-content/uploads/2026/08/CH-6.png", "https://thecamellia.vn/wp-content/uploads/2026/08/MB-CH6.png"] },
  { id: "ch-22", svgId: "t4-ch-22", name: "CH-22", type: "Studio", thong_thuy: "30.0", tim_tuong: "33.0", huong: "Nam", view: "Biển", status: "Còn hàng", imageUrls: ["https://thecamellia.vn/wp-content/uploads/2026/08/CH12A.png", "https://thecamellia.vn/wp-content/uploads/2026/08/MB-CH-12A.png"] },
];

type ApartmentUnit = typeof APARTMENT_UNITS[number];

// ─── Static data – Tổng Quan & Vị Trí ────────────────────────────────────────

const OVERVIEW_ITEMS = [
  { label: "Chủ đầu tư", value: "Công ty TNHH Địa ốc Thành Lâm" },
  { label: "Phát triển", value: "MBLand Holding & WeLand" },
  { label: "Quy mô đất", value: "4.299,9 m²" },
  { label: "Diện tích sàn XD", value: "2.074 m²" },
  { label: "Tổng căn hộ", value: "469 căn hộ" },
  { label: "Chiều cao", value: "25 tầng nổi, 2 tầng hầm" },
  { label: "Loại hình", value: "Studio, 1.5PN, 2PN, 3PN" },
  { label: "Vị trí", value: "Lê Văn Lương × Lê Đức Thọ" },
  { label: "Bàn giao", value: "Dự kiến Quý I / 2028" },
  { label: "Pháp lý", value: "Sở hữu lâu dài" },
];

const LOCATION_GROUPS = [
  {
    time: "2–5 phút",
    items: [
      { icon: TreePine, title: "Bán Đảo Sơn Trà", detail: "Thiên nhiên nguyên sinh" },
      { icon: Waves, title: "Biển Mỹ Khê", detail: "Bãi biển đẹp nhất Đà Nẵng" },
      { icon: MapPin, title: "Chùa Linh Ứng", detail: "Tâm linh, du lịch" },
      { icon: Building2, title: "Vịnh Sơn Trà", detail: "Cảnh quan thiên nhiên" },
      { icon: MapPin, title: "Co.opmart Sơn Trà", detail: "Mua sắm tiện lợi" },
      { icon: Building2, title: "Bảo tàng 3D Art In Paradise", detail: "Du lịch, giải trí" },
    ],
  },
  {
    time: "10–12 phút",
    items: [
      { icon: Building2, title: "DIFF – Lễ hội Pháo hoa", detail: "Địa điểm sự kiện lớn" },
      { icon: Building2, title: "Trung tâm Hành chính TP", detail: "Cơ quan nhà nước" },
      { icon: Car, title: "Cầu Rồng & Cầu Sông Hàn", detail: "Biểu tượng Đà Nẵng" },
      { icon: Building2, title: "Bệnh viện Đà Nẵng", detail: "Y tế trung tâm" },
      { icon: Building2, title: "Đại học Đà Nẵng", detail: "Giáo dục" },
      { icon: Building2, title: "Chợ Hàn", detail: "Mua sắm truyền thống" },
    ],
  },
  {
    time: "20 phút",
    items: [
      { icon: Plane, title: "Sân bay Quốc tế Đà Nẵng", detail: "Kết nối quốc tế" },
      { icon: Building2, title: "Bệnh viện Vinmec", detail: "Y tế cao cấp" },
      { icon: Building2, title: "Bệnh viện Gia đình Đà Nẵng", detail: "Y tế chuyên khoa" },
    ],
  },
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

// ─── UnitDetailModal – full-screen premium modal khi click căn trên SVG ───────

function UnitDetailModal({
  unit,
  onClose,
}: {
  unit: ApartmentUnit;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const total = unit.imageUrls.length;

  const prev = () => setCurrent((c) => ((c - 1) + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  useEffect(() => { setCurrent(0); }, [unit.id]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setZoomImage((currentZoom) => {
          if (currentZoom) return null;
          onClose();
          return null;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const statusCls = unit.status === "Còn hàng"
    ? "bg-emerald-500/15 text-emerald-500"
    : unit.status === "Đang giữ"
      ? "bg-[#C9A45D]/15 text-[#C9A45D]"
      : "bg-red-500/15 text-red-500";

  const infoRows = [
    { label: "Loại căn", value: unit.type },
    { label: "Thông thủy", value: `${unit.thong_thuy} m²` },
    { label: "Tim tường", value: `${unit.tim_tuong} m²` },
    { label: "Trạng thái", value: unit.status },
  ];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(0,0,0,0.78)" }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Đóng"
        className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>

      <div
        className="relative flex w-full max-w-[1440px] h-[90vh] overflow-hidden rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT – Info */}
        <div className="flex w-72 shrink-0 flex-col bg-[#16384C] md:w-80">
          {/* Header */}
          <div className="border-b border-white/10 px-6 py-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#C9A45D]/70">
              The Camellia Sơn Trà
            </p>
            <h2 className="mt-2 font-serif text-4xl font-bold text-white">
              {unit.name}
            </h2>
            <span className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-bold ${statusCls}`}>
              {unit.status}
            </span>
          </div>

          {/* Stats */}
          <div className="flex-1 space-y-px overflow-y-auto">
            {infoRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between border-b border-white/5 px-6 py-3.5 transition hover:bg-white/5"
              >
                <span className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                  {row.label}
                </span>
                <span className="text-sm font-bold text-white">{row.value}</span>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="border-t border-white/10 px-6 py-4">
            <p className="text-[10px] italic leading-relaxed text-white/30">
              * Thông số tham khảo, chính thức theo hợp đồng mua bán.
            </p>
          </div>
        </div>

        {/* RIGHT – Image carousel */}
        <div className="relative flex-1 overflow-hidden bg-[#F8F7F3]">
          {/* Slides */}
          <div className="relative h-full" style={{ minHeight: 400 }}>
            {unit.imageUrls.map((src, i) => (
              <div
                key={src}
                className={`absolute inset-0 transition-opacity duration-500 ${i === current ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
              >
                <img
                  src={src}
                  alt={`${unit.name} – mặt bằng ${i + 1}`}
                  className="h-full w-full object-contain p-6 cursor-zoom-in transition-transform duration-300 hover:scale-[1.02]"
                  onClick={() => setZoomImage(src)}
                />
              </div>
            ))}
          </div>

          {/* Prev / Next arrows */}
          {total > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Ảnh trước"
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[#16384C]/10 p-3 text-[#16384C] shadow-md transition hover:bg-[#16384C]/20"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                aria-label="Ảnh tiếp"
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[#16384C]/10 p-3 text-[#16384C] shadow-md transition hover:bg-[#16384C]/20"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Dot navigation */}
          {total > 1 && (
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {unit.imageUrls.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === current
                    ? "w-8 bg-[#16384C]"
                    : "w-1.5 bg-[#16384C]/25 hover:bg-[#16384C]/50"
                    }`}
                />
              ))}
            </div>
          )}

          {/* Image counter */}
          {total > 1 && (
            <p className="absolute right-4 top-4 rounded-full bg-[#16384C]/10 px-2.5 py-1 text-[11px] font-bold text-[#16384C]/60">
              {current + 1} / {total}
            </p>
          )}
        </div>
      </div>

      {zoomImage && (
        <LightboxModal src={zoomImage} onClose={() => setZoomImage(null)} />
      )}
    </div>
  );
}

// ─── InteractiveSVGFloorPlan – full width, hover highlight, click → full-screen modal ─

function InteractiveSVGFloorPlan() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [svgHtml, setSvgHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<ApartmentUnit | null>(null);

  // Fetch SVG once
  useEffect(() => {
    fetch("/api/camellia-svg")
      .then((r) => { if (!r.ok) throw new Error(); return r.text(); })
      .then((html) => { setSvgHtml(html); setLoading(false); })
      .catch(() => { setLoadError(true); setLoading(false); });
  }, []);

  // Stable ref to avoid re-adding listeners on re-render
  const selectUnitRef = useRef<(u: ApartmentUnit) => void>(() => { });
  selectUnitRef.current = setSelectedUnit;

  // Setup event delegation on the root container for hover and click
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !svgHtml) return;

    const getUnitFromEvent = (e: MouseEvent): ApartmentUnit | undefined => {
      const target = e.target as HTMLElement;
      const unitEl = target.closest("[data-svg]") as HTMLElement | null;
      if (!unitEl) return;
      const svgId = unitEl.getAttribute("data-svg");
      return APARTMENT_UNITS.find((u) => u.svgId === svgId);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const unitEl = target.closest("[data-svg]") as HTMLElement | null;
      if (!unitEl) return;

      const related = e.relatedTarget as HTMLElement | null;
      if (related && unitEl.contains(related)) return;

      const svgId = unitEl.getAttribute("data-svg");
      const unit = APARTMENT_UNITS.find((u) => u.svgId === svgId);
      if (!unit) return;

      const hoveredEl = root.querySelector(`[data-svg="${unit.svgId}"]`) as HTMLElement | null;
      if (hoveredEl) {
        hoveredEl.style.filter = "drop-shadow(0 0 10px rgba(201,164,93,0.85))";
        hoveredEl.style.opacity = "0.85";
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const unitEl = target.closest("[data-svg]") as HTMLElement | null;
      if (!unitEl) return;

      const related = e.relatedTarget as HTMLElement | null;
      if (related && unitEl.contains(related)) return;

      const svgId = unitEl.getAttribute("data-svg");
      const unit = APARTMENT_UNITS.find((u) => u.svgId === svgId);
      if (!unit) return;

      const hoveredEl = root.querySelector(`[data-svg="${unit.svgId}"]`) as HTMLElement | null;
      if (hoveredEl) {
        hoveredEl.style.filter = "";
        hoveredEl.style.opacity = "";
      }
    };

    const handleClick = (e: MouseEvent) => {
      const unit = getUnitFromEvent(e);
      if (unit) {
        // Reset styles before opening modal to avoid stuck hover state
        APARTMENT_UNITS.forEach((u) => {
          const el = root.querySelector(`[data-svg="${u.svgId}"]`) as HTMLElement | null;
          if (el) {
            el.style.opacity = "";
            el.style.filter = "";
          }
        });
        selectUnitRef.current(unit);
      }
    };

    root.addEventListener("mouseover", handleMouseOver);
    root.addEventListener("mouseout", handleMouseOut);
    root.addEventListener("click", handleClick);

    return () => {
      root.removeEventListener("mouseover", handleMouseOver);
      root.removeEventListener("mouseout", handleMouseOut);
      root.removeEventListener("click", handleClick);
    };
  }, [svgHtml]);

  return (
    <>
      {/* SVG container – full width without borders/shadows */}
      <div className="relative w-full overflow-hidden">
        {/* Loading */}
        {loading && (
          <div className="flex min-h-[420px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#A04A30] border-t-transparent" />
            <span className="ml-3 text-sm text-[#2B2B2B]/50">Đang tải mặt bằng...</span>
          </div>
        )}

        {/* Fallback static image */}
        {loadError && (
          <img
            src="https://thecamellia.vn/wp-content/themes/main/assets/images/matbang/t4.svg"
            alt="Mặt bằng tầng điển hình The Camellia"
            className="w-full object-contain"
          />
        )}

        {/* Interactive SVG */}
        {svgHtml && (
          <div
            ref={rootRef}
            className="w-full [&>svg]:w-full [&>svg]:h-auto [&_[data-svg]]:cursor-pointer [&_[data-svg]]:opacity-0 [&_[data-svg]]:transition-all [&_[data-svg]]:duration-200"
            dangerouslySetInnerHTML={{ __html: svgHtml }}
          />
        )}
      </div>

      {/* Full-screen modal when unit clicked */}
      {selectedUnit && (
        <UnitDetailModal unit={selectedUnit} onClose={() => setSelectedUnit(null)} />
      )}
    </>
  );
}

// ─── LightboxModal ────────────────────────────────────────────────────────────

function LightboxModal({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <button
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 md:right-8 md:top-8"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Đóng"
      >
        <X className="h-6 w-6 md:h-8 md:w-8" />
      </button>
      <div
        className="relative h-full w-full max-w-6xl p-4 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt="The Camellia Sơn Trà – phối cảnh chi tiết"
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}

// ─── CanHoSection ─────────────────────────────────────────────────────────────

function CanHoSection() {
  const apartments = [
    {
      type: "Studio",
      badge: "Linh hoạt",
      desc: "Tối ưu cho cá nhân & đầu tư. Thiết kế thông minh, phù hợp nhu cầu ở thực và khai thác cho thuê.",
    },
    {
      type: "2 Phòng Ngủ",
      badge: "2BR",
      desc: "Phù hợp gia đình trẻ và second home. Ban công rộng, đón gió biển tự nhiên.",
    },
    {
      type: "3 Phòng Ngủ",
      badge: "3BR",
      desc: "Không gian sống rộng rãi cho gia đình nhiều thành viên hoặc gia đình đa thế hệ.",
    },
  ];

  return (
    <>
      <section id="can-ho" className="scroll-mt-16 bg-white pb-20 pt-16">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5C8269]/70">
            Sản Phẩm & Thiết Kế
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#16384C] md:text-4xl">
            Các Loại Hình Căn Hộ The Camellia Sơn Trà
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#2B2B2B]/70">
            The Camellia Sơn Trà phát triển bốn loại hình căn hộ chính, hướng đến nhiều nhu cầu sở hữu khác nhau – từ đầu tư, ở thực, nghỉ dưỡng đến khai thác cho thuê.
          </p>

          {/* Apartment Type Cards */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {apartments.map((apt) => (
              <div
                key={apt.type}
                className="group cursor-default rounded-sm border border-[#E8E5DF] p-6 transition-all hover:shadow-md hover:border-[#C9A45D] hover:bg-[#F8F7F3]"
              >
                <p className="font-serif text-xl font-semibold text-[#16384C] group-hover:text-[#C9A45D]">
                  {apt.type}
                </p>
                {apt.badge && (
                  <span className="mt-2 inline-block rounded-sm bg-[#C9A45D]/15 px-2 py-0.5 text-[11px] font-semibold text-[#8a6a2a]">
                    {apt.badge}
                  </span>
                )}
                <p className="mt-3 text-sm leading-relaxed text-[#2B2B2B]/70">{apt.desc}</p>
              </div>
            ))}
          </div>

          {/* Handover Standards */}
          <div className="mt-12 rounded-lg border border-[#E8E5DF] bg-[#F8F7F3] p-6 md:p-8">
            <h3 className="font-serif text-xl font-semibold text-[#16384C]">
              Tiêu Chuẩn Bàn Giao
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {[
                { label: "Phòng tắm", value: "Grohe · Bravat · Kohler" },
                { label: "Bếp", value: "Hafele · Teka" },
                { label: "Điều hòa", value: "Daikin · LG · Mitsubishi · Panasonic" },
                { label: "Khóa thông minh", value: "Giovani Smart Lock" },
              ].map((item) => (
                <div key={item.label} className="rounded-sm border border-[#E8E5DF] bg-white p-4 shadow-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#5C8269]/70">{item.label}</p>
                  <p className="mt-1 text-sm font-semibold text-[#16384C]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MẶT BẰNG TẦNG ĐIỂN HÌNH ───────────────────────────────────────── */}
      <section id="mat-bang-tang" className="scroll-mt-16 bg-white pb-20 pt-16">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="font-serif text-3xl uppercase text-[#16384C] md:text-4xl lg:text-[40px]">
              Mặt Bằng Tầng Điển Hình
            </h2>
            <div className="rounded bg-[#16384C] px-6 py-2.5 text-sm font-semibold text-white">
              TẦNG 4-23
            </div>
          </div>

          {/* Floor Plan – Interactive SVG */}
          <InteractiveSVGFloorPlan />

          {/* Chú thích màu sắc – đúng với SVG thực tế */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { color: "bg-[#B5D2E2]", label: "Studio" },
              { color: "bg-[#E7E7DD]", label: "Căn hộ 2PN, 2VS" },
              { color: "bg-[#E7856C]", label: "Căn hộ 3PN" },
              { color: "bg-[#D7BBB0]", label: "Căn hộ 1.5PN" },
              { color: "bg-[#CEA27D]", label: "Căn hộ 2PN, 1VS" },
            ].map((legend) => (
              <div key={legend.label} className="flex items-center gap-3 rounded-sm border border-[#E8E5DF] bg-white p-3">
                <div className={`h-5 w-5 flex-shrink-0 rounded-sm ${legend.color}`} />
                <p className="text-xs font-semibold text-[#16384C]">{legend.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── TamViewSection ─────────────────────────────────────────────────────────

const TAM_VIEW_TABS = [
  {
    id: "tab1",
    label: "Tầng 5",
    href: "https://thecamellia.vn/tam-view-tang-5/",
    img: "https://thecamellia.vn/wp-content/uploads/2026/07/da_tien_ich_3.jpg",
  },
  {
    id: "tab2",
    label: "Tầng 10",
    href: "https://thecamellia.vn/tam-view-tang-10/",
    img: "https://thecamellia.vn/wp-content/uploads/2026/07/TT02-1-1.jpg",
  },
  {
    id: "tab3",
    label: "Tầng 15",
    href: "https://thecamellia.vn/tam-view-tang-15/",
    img: "https://thecamellia.vn/wp-content/uploads/2026/08/Rectangle-34624523.jpg",
  },
  {
    id: "tab4",
    label: "Tầng 25",
    href: "https://thecamellia.vn/tam-view-tang-25/",
    img: "https://thecamellia.vn/wp-content/uploads/2026/07/da_tien_ich_2.jpg",
  },
];

function TamViewSection() {
  const [activeTab, setActiveTab] = useState("tab1");
  const active = TAM_VIEW_TABS.find((t) => t.id === activeTab) ?? TAM_VIEW_TABS[0];

  return (
    <section id="tam-view" className="scroll-mt-16 bg-[#F8F7F3] pb-20 pt-16">
      <div className="mx-auto max-w-[1440px] px-5 md:px-20">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5C8269]/70">
              Trải Nghiệm 360°
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#16384C] md:text-4xl">
              Tầm View
            </h2>
          </div>

          {/* Tab selector */}
          <div className="flex gap-2">
            {TAM_VIEW_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-sm px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${activeTab === tab.id
                    ? "bg-[#16384C] text-white shadow-md"
                    : "border border-[#E8E5DF] bg-white text-[#2B2B2B] hover:border-[#C9A45D] hover:text-[#16384C]"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Image with 360 overlay */}
        <a
          href={active.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block w-full overflow-hidden rounded-xl shadow-xl"
        >
          {/* Transition wrapper – fade between tabs */}
          <div className="relative aspect-[16/7] w-full overflow-hidden rounded-xl bg-[#16384C]">
            {TAM_VIEW_TABS.map((tab) => (
              <img
                key={tab.id}
                src={tab.img}
                alt={`Tầm view ${tab.label} The Camellia Sơn Trà – 360°`}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${activeTab === tab.id ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
              />
            ))}

            {/* Dark gradient overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* 360° badge */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 rounded-xl border border-white/30 bg-black/40 px-8 py-5 text-white shadow-2xl backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-black/60">
                <p className="font-serif text-5xl font-bold leading-none tracking-tight">
                  360<sup className="text-2xl">°</sup>
                </p>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A45D]">
                  Khám phá ngay
                </p>
              </div>
            </div>

            {/* Floor label bottom-left */}
            <p className="absolute bottom-5 left-6 text-xs font-bold uppercase tracking-widest text-white/70">
              The Camellia Sơn Trà · {active.label}
            </p>
          </div>
        </a>
      </div>
    </section>
  );
}

// ─── TienIchSection ───────────────────────────────────────────────────────────

const TIEN_ICH_ITEMS = [
  {
    title: "Indoor Pool",
    desc: "Hồ bơi trong nhà đẳng cấp, chuẩn Wellness, thiết kế sang trọng",
    img: "/images/camellia_images/tien_ich/camellia-tien-ich-be-boi.jpg"
  },
  {
    title: "Gym Center",
    desc: "Phòng tập Gym cao cấp, không gian thể thao năng động",
    img: "/images/camellia_images/tien_ich/camellia-tien-ich-phong-gym.jpg"
  },
  {
    title: "Yoga & Meditation",
    desc: "Không gian tập Yoga view thiên nhiên thư thái",
    img: "/images/camellia_images/tien_ich/camellia-tien-ich-phong-yoga.jpg"
  },
  {
    title: "Sảnh Đón Thang Máy Tầng 2",
    desc: "Không gian sảnh chờ sang trọng, hiện đại mang đậm dấu ấn đặc quyền",
    img: "/images/camellia_images/tien_ich/camellia-tien-ich-thang-may-tang-2.jpg"
  },
  {
    title: "Sinh Hoạt Cộng Đồng",
    desc: "Khu vực giao lưu, kết nối cộng đồng tinh hoa văn minh và đẳng cấp",
    img: "/images/camellia_images/tien_ich/camellia-tien-ich-phong-sinh-hoat-cong-dong.jpg"
  },
  {
    title: "Sky Garden Tầng Mái",
    desc: "Tận hưởng tầm nhìn Panorama trọn vẹn vịnh biển và núi Sơn Trà hùng vĩ",
    img: "/images/camellia_images/tien_ich/camellia-tien-ich-tang-mai-1.jpg"
  }
];

function TienIchSection() {
  return (
    <section id="tien-ich" className="scroll-mt-16 bg-[#16384C] pb-20 pt-16">
      <div className="mx-auto max-w-[1440px] px-5 md:px-20">
        <div className="mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A45D]">
            Tiện Ích Nội Khu
          </p>
          <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
            Đặc Quyền Tiện Ích The Camellia – Wellness & Lifestyle
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80">
            Không chỉ là nơi an cư, The Camellia mang đến trải nghiệm sống chuẩn mực với hệ thống tiện ích chăm sóc sức khỏe, kết nối cộng đồng tinh hoa và thiên nhiên nguyên bản.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TIEN_ICH_ITEMS.map((item, i) => (
            <div key={i} className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-colors hover:bg-white/10">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
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

      {/* TỔNG QUAN – hiển thị ngay sau hero */}
      <section id="tong-quan" className="scroll-mt-16 bg-white pb-16 pt-16">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5C8269]/70">
            Tổng Quan Dự Án
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#16384C] md:text-4xl">
            The Camellia Sơn Trà Đà Nẵng
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#2B2B2B]/80">
            The Camellia Sơn Trà là dự án căn hộ tại khu vực Sơn Trà, được định hướng phát triển thành một không gian sống hiện đại gắn kết với thiên nhiên đặc trưng của bán đảo Sơn Trà và biển Đà Nẵng. Phía sau là núi rừng Sơn Trà. Phía trước là biển xanh. Xung quanh là hệ thống tiện ích và nhịp sống năng động của Đà Nẵng.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {OVERVIEW_ITEMS.map((item) => (
              <div
                key={item.label}
                className="rounded-sm border border-[#E8E5DF] bg-[#F8F7F3] p-4 shadow-sm"
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#5C8269]/70">
                  {item.label}
                </p>
                <p className="mt-1 text-base font-semibold text-[#16384C]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VỊ TRÍ – hiển thị ngay sau Tổng Quan */}
      <section id="vi-tri" className="scroll-mt-16 bg-[#F8F7F3] pb-16 pt-12">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5C8269]/70">
            Vị Trí
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#16384C] md:text-4xl">
            Vị Trí The Camellia Sơn Trà – Tâm Điểm Kết Nối
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#2B2B2B]/80">
            The Camellia Sơn Trà tọa lạc tại <strong>giao lộ Lê Văn Lương và Lê Đức Thọ, phường Sơn Trà, TP. Đà Nẵng</strong> – nơi hội tụ những giá trị đặc trưng của một đô thị biển: núi, rừng, biển và nhịp sống thành phố.
          </p>
          <div className="mt-10 space-y-8">
            {LOCATION_GROUPS.map((group) => (
              <div key={group.time}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#16384C] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#C9A45D]">
                    <Car className="h-3.5 w-3.5" />
                    {group.time}
                  </span>
                  <div className="h-px flex-1 bg-[#E8E5DF]" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((loc) => (
                    <div
                      key={loc.title}
                      className="flex items-start gap-3 rounded-sm border border-[#E8E5DF] bg-white p-4 shadow-sm"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C9A45D]/10 text-[#C9A45D]">
                        <loc.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#16384C]">{loc.title}</p>
                        <p className="mt-0.5 text-xs text-[#2B2B2B]/60">{loc.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section căn hộ – ApartmentCards + Mặt bằng tầng */}
      <CanHoSection />

      {/* Tầm view 360° – sau mặt bằng điển hình */}
      <TamViewSection />

      {/* Tiện ích nội khu */}
      <TienIchSection />

      {/* Section hình ảnh – có GalleryGrid tương tác */}
      <HinhAnhSection onImageClick={setSelectedImage} />

      <ChatSection />

      {/* Lightbox Modal – controlled bởi state chung */}
      {selectedImage && (
        <LightboxModal src={selectedImage} onClose={() => setSelectedImage(null)} />
      )}

      {/* Scroll popup CTA */}
      <ProjectScrollPopup projectName="The Camellia Sơn Trà" accent="#C9A45D" />
    </>
  );
}
