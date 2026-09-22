"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu,
  X,
  Umbrella,
  Leaf,
  Plane,
  Building2,
  Castle,
  Hotel,
  Waves,
  Dumbbell,
  ShoppingBag,
  FerrisWheel,
  Trees,
  SquareParking,
  Sunrise,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { HideSiteHeader } from "@/components/projects/HideSiteHeader";
import { SITE_NAME } from "@/config/site";
import { ProjectScrollPopup } from "@/components/projects/ProjectScrollPopup";

const CAROUSEL_IMAGES = [
  "/images/fourS_tower/phoi-canh-1.jpg",
  "/images/fourS_tower/phoi-canh-2.jpg",
  "/images/fourS_tower/phoi-canh-3.jpg",
  "/images/fourS_tower/phoi-canh-4.jpg",
  "/images/fourS_tower/phoi-canh-5.jpg",
  "/images/fourS_tower/phoi-canh-6.jpg",
];

const FLOOR_PLANS = [
  {
    tower: "F1",
    label: "Tầng 3–7",
    image: "/images/fourS_tower/layout/f1-tang-4-7.jpg",
  },
  {
    tower: "F1",
    label: "Tầng 8–19",
    image: "/images/fourS_tower/layout/f1-tang-8-19.jpg",
  },
  {
    tower: "F5",
    label: "Tầng 3–7",
    image: "/images/fourS_tower/layout/f5-tang-3.jpg",
  },
  {
    tower: "F5",
    label: "Tầng 8–15",
    image: "/images/fourS_tower/layout/f5-tang-8-15.jpg",
  },
];

const navLinks = [
  { href: "#tong-quan", label: "Tổng Quan" },
  { href: "#can-ho", label: "Căn Hộ" },
  { href: "#mat-bang", label: "Mặt Bằng" },
  { href: "#vi-tri", label: "Vị Trí" },
  { href: "#tien-ich", label: "Tiện Ích" },
  { href: "#chinh-sach", label: "Chính Sách" },
  { href: "#tien-do", label: "Tiến Độ" },
];

function SunFoursNav() {
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

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const total = CAROUSEL_IMAGES.length;
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragStart = useRef<number | null>(null);
  const isDragging = useRef(false);

  const go = useCallback(
    (i: number) => setCurrent((i + total) % total),
    [total],
  );
  const next = useCallback(() => go(current + 1), [current, go]);
  const prev = useCallback(() => go(current - 1), [current, go]);

  const resetAuto = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setCurrent((c) => (c + 1) % total), 5000);
  }, [total]);

  useEffect(() => {
    resetAuto();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [resetAuto]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStart.current = e.clientX;
    isDragging.current = true;
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
      className="relative flex min-h-[90vh] select-none items-end overflow-hidden bg-[#1a2033] py-0 cursor-grab active:cursor-grabbing"
      onPointerDown={onPointerDown}
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
            alt={`Sun FourS Tower ${i + 1}`}
            fill
            priority={i === 0}
            draggable={false}
            className="object-cover opacity-60"
            sizes="100vw"
          />
        </div>
      ))}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          prev();
          resetAuto();
        }}
        aria-label="Ảnh trước"
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition hover:bg-black/50 md:left-8 md:p-3"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>
      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          next();
          resetAuto();
        }}
        aria-label="Ảnh tiếp"
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition hover:bg-black/50 md:right-8 md:p-3"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {CAROUSEL_IMAGES.map((_, i) => (
          <button
            key={i}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              go(i);
              resetAuto();
            }}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 bg-[#E3C284]"
                : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      <p className="pointer-events-none absolute bottom-6 right-5 z-20 text-xs font-semibold tabular-nums text-white/50 md:right-8">
        {current + 1} / {total}
      </p>

      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-24 md:px-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#E3C284]">
          Sun Group · Sun Riverpolis
        </p>
        <h1 className="font-serif text-4xl font-bold text-white md:text-6xl lg:text-7xl">
          SUN FOURS TOWER
        </h1>
        <p className="mt-3 text-lg font-medium text-white/90 md:text-2xl">
          Tâm điểm an cư — Đầu tư phía Nam Đà Nẵng
        </p>
        <p className="mt-4 text-2xl font-bold text-[#E3C284] md:text-3xl">
          Chỉ từ 1,5 tỷ
        </p>
        <div className="pointer-events-auto mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#tong-quan"
            className="inline-block rounded-sm border border-white/70 px-8 py-3 font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
          >
            Tìm Hiểu Thêm
          </a>
        </div>
      </div>
    </section>
  );
}

function VrTour() {
  const [active, setActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Thoát chế độ tham quan khi người dùng click ra ngoài khung VR hoặc nhấn Esc.
  useEffect(() => {
    if (!active) return;

    const onPointerDown = (e: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setActive(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  return (
    <div
      ref={containerRef}
      className="relative mt-10 overflow-hidden rounded-sm border border-[#E8E2D9] shadow-sm"
    >
      <iframe
        title="Sun FourS Tower VR Tour 360"
        allow="xr-spatial-tracking;gyroscope;accelerometer;autoplay;microphone;camera"
        allowFullScreen
        className="block h-[640px] w-full border-0"
        src="https://kuula.co/share/LpyGP?logo=-1&zoom=1&vr=1&priority=1&enablejs=1&history=1&info=0&fs=1&sd=1&thumbs=1&cusdomwrap=1&fid=0f25"
      />

      {/* Overlay chặn tương tác cho tới khi người dùng chủ động click.
          Nhờ vậy cuộn trang không bị iframe "bắt" khi lướt qua. */}
      {!active && (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label="Bật tương tác VR Tour 360"
          className="group absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/40"
        >
          <span className="flex items-center gap-2 rounded-full bg-white/90 px-5 py-2.5 text-sm font-semibold text-[#4a3829] shadow-md backdrop-blur-sm transition-transform group-hover:scale-105">
            <Sunrise className="h-4 w-4 text-[#b59556]" />
            Nhấn để tham quan 360°
          </span>
        </button>
      )}

      {/* Nút thoát khi đang tham quan */}
      {active && (
        <button
          type="button"
          onClick={() => setActive(false)}
          aria-label="Thoát chế độ tham quan 360°"
          className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-black/80"
        >
          <X className="h-4 w-4" />
          Thoát
        </button>
      )}
    </div>
  );
}

function SunFoursTowerClient() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <HideSiteHeader />
      <SunFoursNav />

      {/* HERO CAROUSEL */}
      <HeroCarousel />
      {/* HÌNH ẢNH */}
      <section id="hinh-anh" className="scroll-mt-16 bg-white pb-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#634F3F]/70">
            Hình Ảnh Thực Tế
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#4a3829] md:text-4xl">
            Phối Cảnh Dự Án
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CAROUSEL_IMAGES.slice(0, 4).map((src, i) => (
              <div
                key={i}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-sm bg-[#E8E2D9]"
                onClick={() => setSelectedImage(src)}
              >
                <Image
                  src={src}
                  alt={`Sun FourS Tower phối cảnh ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* MẶT BẰNG */}
      <section id="mat-bang" className="scroll-mt-16 pb-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#634F3F]/70">
            Mặt Bằng
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#4a3829] md:text-4xl">
            Mặt Bằng Điển Hình
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {FLOOR_PLANS.map((plan) => (
              <button
                key={plan.image}
                type="button"
                onClick={() => setSelectedImage(plan.image)}
                className="group overflow-hidden rounded-sm border border-[#E8E2D9] bg-white text-left shadow-sm cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#f2efe9]">
                  <Image
                    src={plan.image}
                    alt={`Mặt bằng Tháp ${plan.tower} ${plan.label}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <span className="absolute left-3 top-3 rounded-sm bg-[#4a3829] px-2.5 py-1 text-[11px] font-semibold uppercase text-white">
                    Tháp {plan.tower} · {plan.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MẶT BẰNG */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            aria-label="Đóng"
            className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="relative h-[85vh] w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Mặt bằng chi tiết"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}

      <ProjectScrollPopup projectName="Sun FourS Tower" accent="#E3C284" />
    </>
  );
}
export {
  CAROUSEL_IMAGES,
  FLOOR_PLANS,
  navLinks,
  HeroCarousel,
  VrTour,
  SunFoursTowerClient,
};
