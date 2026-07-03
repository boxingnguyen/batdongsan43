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

  return (
    <div className="relative mt-10 overflow-hidden rounded-sm border border-[#E8E2D9] shadow-sm">
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
    </div>
  );
}

export default function SunFoursTowerPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="bg-[#f9f9f9]">
      <HideSiteHeader />
      <SunFoursNav />

      {/* HERO CAROUSEL */}
      <HeroCarousel />

      {/* TỔNG QUAN */}
      <section id="tong-quan" className="scroll-mt-16 pb-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#E3C284]">
              Tổng Quan Dự Án
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#4a3829] md:text-4xl">
              Sun FourS Tower Đà Nẵng
            </h2>
            <div className="mx-auto mt-4 h-px w-16 bg-[#E3C284]" />
            <p className="mt-6 text-[15px] leading-relaxed text-[#4e453e]/80">
              Tọa lạc tại giao điểm chiến lược Minh Mạng – Nguyễn Phước Lan,
              FourS Tower do Sun Property phát triển sở hữu vị trí trung tâm của
              khu đô thị mới phía Nam Đà Nẵng – nơi đang được quy hoạch đồng bộ,
              hạ tầng ngày càng hoàn thiện và cộng đồng cư dân hiện đại đang dần
              hình thành.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Kết nối nhanh",
                desc: "Giao thông thuận tiện, dễ dàng di chuyển về trung tâm hành chính, thương mại và các khu vực trọng điểm của thành phố.",
              },
              {
                title: "Bao quanh đại đô thị",
                desc: "Liền kề chuỗi đô thị hiện đại như KĐT Hòa Xuân, Sunneva Island, hình thành hệ sinh thái sống và đầu tư sôi động.",
              },
              {
                title: "Gần biển, cho thuê tốt",
                desc: "Thuận tiện tiếp cận biển và các khu nghỉ dưỡng, phù hợp an cư chất lượng cao hoặc đầu tư khai thác lưu trú.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="rounded-sm border border-[#E8E2D9] bg-white p-6 shadow-sm"
              >
                <span className="font-serif text-3xl font-bold text-[#E3C284]">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-serif text-xl text-[#4a3829]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4e453e]/80">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* VR TOUR 360 */}
          <VrTour />
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[
              { label: "Chủ đầu tư", value: "Sun Property (Sun Group)" },
              { label: "Số tháp", value: "4 tháp (F1–F4)" },
              { label: "Số tầng", value: "20 tầng nổi + 2 hầm" },
              { label: "Khu đô thị", value: "Sun Riverpolis (500ha)" },
              { label: "Vị trí", value: "Minh Mạng – Nguyễn Phước Lan" },
              { label: "Chiều cao trần", value: "3,5m (Penthouse 6m)" },
              { label: "Loại sở hữu", value: "Lâu dài" },
              { label: "Bàn giao", value: "Hoàn thiện trần, tường, sàn" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-sm border border-[#E8E2D9] bg-white p-4 shadow-sm"
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#634F3F]/60">
                  {item.label}
                </p>
                <p className="mt-1 text-base font-semibold text-[#4a3829]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOẠI CĂN HỘ */}
      <section id="can-ho" className="scroll-mt-16 bg-white pb-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#634F3F]/70">
            Sản Phẩm
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#4a3829] md:text-4xl">
            Các Loại Căn Hộ
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {[
              {
                type: "Studio",
                area: "34,7 m²",
                desc: "Tối ưu đầu tư cho thuê, layout thông minh",
              },
              {
                type: "1 Phòng Ngủ",
                area: "43,7 m²",
                desc: "Không gian sống tiện nghi, phù hợp cặp đôi",
              },
              {
                type: "2 Phòng Ngủ",
                area: "58 m²",
                desc: "Lý tưởng cho gia đình nhỏ",
              },
              {
                type: "3 Phòng Ngủ",
                area: "102,8 m²",
                desc: "Không gian rộng rãi cho gia đình",
              },
              {
                type: "Duplex",
                area: "200 m²",
                desc: "Căn hộ thông tầng đẳng cấp, không gian sang trọng",
              },
            ].map((apt) => (
              <div
                key={apt.type}
                className="group rounded-sm border border-[#E8E2D9] p-6 transition-shadow hover:shadow-md"
              >
                <p className="font-serif text-xl font-semibold text-[#4a3829] group-hover:text-[#634F3F]">
                  {apt.type}
                </p>
                <p className="mt-2 text-lg font-bold text-[#E3C284]">
                  {apt.area}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#4e453e]/80">
                  {apt.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
                  <span className="rounded-sm bg-white/90 px-3 py-1.5 text-sm font-semibold text-[#4a3829] shadow-sm backdrop-blur-sm">
                    Xem
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[#634F3F]/50">
            Ảnh: Sun FourS Tower · Sun Group
          </p>
        </div>
      </section>

      {/* MẶT BẰNG ĐIỂN HÌNH */}
      <section id="mat-bang" className="scroll-mt-16 pb-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#634F3F]/70">
            Mặt Bằng
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#4a3829] md:text-4xl">
            Mặt Bằng Điển Hình
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#4e453e]/80">
            Mặt bằng chi tiết theo từng tầng của hai tháp mở bán đợt 1 — Tháp F1
            và Tháp F5. Nhấn vào từng mặt bằng để xem chi tiết.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {FLOOR_PLANS.map((plan) => (
              <button
                key={plan.image}
                type="button"
                onClick={() => setSelectedImage(plan.image)}
                className="group overflow-hidden rounded-sm border border-[#E8E2D9] bg-white text-left shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#f2efe9]">
                  <Image
                    src={plan.image}
                    alt={`Mặt bằng Tháp ${plan.tower} ${plan.label}`}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute left-3 top-3 rounded-sm bg-[#4a3829] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                    Tháp {plan.tower} · {plan.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* VỊ TRÍ */}
      <section id="vi-tri" className="scroll-mt-16 pb-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#634F3F]/70">
            Vị Trí
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#4a3829] md:text-4xl">
            Kết Nối Đa Chiều
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#4e453e]/80">
            Tọa lạc tại giao điểm Minh Mạng – Nguyễn Phước Lan, trung tâm khu
            Nam Đà Nẵng, liền kề Khu đô thị Hòa Xuân và Sunneva Island. Kết nối
            thuận tiện đến biển, sân bay và các điểm đến trọng điểm.
          </p>
          <div className="relative mt-10 aspect-[21/9] overflow-hidden rounded-sm bg-[#E8E2D9] shadow-sm">
            <Image
              src="/images/fourS_tower/phoi-canh-3.jpg"
              alt="Vị trí Sun FourS Tower phía Nam Đà Nẵng"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Umbrella,
                title: "Biển Mỹ Khê",
                detail: "5 phút",
              },
              {
                icon: Castle,
                title: "Núi Ngũ Hành Sơn",
                detail: "5 phút",
              },
              {
                icon: Plane,
                title: "Sân Bay Quốc Tế Đà Nẵng",
                detail: "10 phút",
              },
              {
                icon: FerrisWheel,
                title: "Asia Park",
                detail: "10 phút",
              },
              {
                icon: Hotel,
                title: "InterContinental Sơn Trà",
                detail: "25 phút · Bán đảo Sơn Trà",
              },
              {
                icon: Building2,
                title: "KĐT Hòa Xuân",
                detail: "Liền kề",
              },
              {
                icon: Leaf,
                title: "Sunneva Island",
                detail: "Liền kề",
              },
              {
                icon: Trees,
                title: "Công Viên Hype Park",
                detail: "50ha · 6 công viên chủ đề",
              },
            ].map((loc) => (
              <div
                key={loc.title}
                className="flex items-start gap-4 rounded-sm border border-[#E8E2D9] bg-white p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E3C284]/15 text-[#b59556]">
                  <loc.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#4a3829]">{loc.title}</p>
                  <p className="mt-1 text-sm text-[#4e453e]/70">{loc.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIỆN ÍCH */}
      <section
        id="tien-ich"
        className="scroll-mt-16 bg-[#4a3829] pb-20 text-white"
      >
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#E3C284]/70">
            Tiện Ích Nội Khu
          </p>
          <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
            Mô Hình &quot;All-in-Tower&quot;
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80">
            Toàn bộ tiện ích tập trung ngay trong tòa nhà — không cần ra ngoài
            để tận hưởng cuộc sống đẳng cấp.
          </p>
          <div className="relative mt-10 aspect-[21/9] overflow-hidden rounded-sm shadow-lg">
            <Image
              src="/images/fourS_tower/phoi-canh-4.jpg"
              alt="Tiện ích Sun FourS Tower"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Waves,
                title: "Hồ Bơi",
                desc: "Không gian bơi lội thư giãn ngay trong tổ hợp",
              },
              {
                icon: Dumbbell,
                title: "Gym · Yoga · Spa",
                desc: "Khu thể thao và chăm sóc sức khỏe hiện đại",
              },
              {
                icon: FerrisWheel,
                title: "Khu Vui Chơi Trẻ Em",
                desc: "Không gian an toàn, sáng tạo cho thiếu nhi",
              },
              {
                icon: ShoppingBag,
                title: "Shophouse Thương Mại",
                desc: "Chuỗi tiện ích mua sắm, ẩm thực sôi động",
              },
              {
                icon: Hotel,
                title: "Phòng Khám Mặt Trời",
                desc: "Chăm sóc sức khỏe tiện lợi ngay nội khu",
              },
              {
                icon: Trees,
                title: "Khu Sinh Hoạt Cộng Đồng",
                desc: "Không gian kết nối, gắn kết cư dân",
              },
              {
                icon: Sunrise,
                title: "Công Viên Hype Park",
                desc: "50ha với 6 công viên chủ đề đa dạng",
              },
              {
                icon: SquareParking,
                title: "Hầm Đỗ Xe",
                desc: "2 tầng hầm rộng rãi cho cư dân",
              },
            ].map((amenity) => (
              <div
                key={amenity.title}
                className="rounded-sm border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10 group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E3C284]/20 text-[#E3C284] transition-colors group-hover:bg-[#E3C284] group-hover:text-[#1a2033]">
                  <amenity.icon className="h-6 w-6" />
                </div>
                <p className="mt-4 font-semibold text-white">{amenity.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {amenity.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHÍNH SÁCH */}
      <section id="chinh-sach" className="scroll-mt-16 pb-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#634F3F]/70">
            Chính Sách Bán Hàng
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#4a3829] md:text-4xl">
            Sun Early Key — Ưu Đãi Ra Hàng
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-sm border-2 border-[#E3C284] bg-white p-8 shadow-md">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#634F3F]/60">
                Ưu Đãi Nổi Bật
              </p>
              <p className="mt-3 font-serif text-4xl font-bold text-[#4a3829]">
                26,5%
              </p>
              <p className="mt-1 text-sm text-[#4e453e]/80">
                Chiết khấu thanh toán sớm
              </p>
              <p className="mt-4 text-xs text-[#634F3F]/60">
                Áp dụng đến 25/6/2026
              </p>
            </div>
            <div className="rounded-sm border border-[#E8E2D9] bg-white p-8 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#634F3F]/60">
                Thanh Toán
              </p>
              <p className="mt-3 font-serif text-4xl font-bold text-[#4a3829]">
                95%
              </p>
              <p className="mt-1 text-sm text-[#4e453e]/80">
                Phương thức thanh toán linh hoạt
              </p>
              <p className="mt-4 text-xs text-[#634F3F]/60">
                Hỗ trợ vay ngân hàng lên đến 70%
              </p>
            </div>
            <div className="rounded-sm border border-[#E8E2D9] bg-white p-8 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#634F3F]/60">
                Nhận Bàn Giao
              </p>
              <p className="mt-3 font-serif text-4xl font-bold text-[#4a3829]">
                70%
              </p>
              <p className="mt-1 text-sm text-[#4e453e]/80">
                Nhận nhà khi hoàn thành 70% xây dựng
              </p>
              <p className="mt-4 text-xs text-[#634F3F]/60">
                Bàn giao dự kiến Quý 1/2028
              </p>
            </div>
          </div>
          <div className="mt-8 rounded-sm bg-[#4a3829]/5 p-6">
            <p className="font-semibold text-[#4a3829]">
              Pha 1 Mở Bán: Tháp F1 &amp; F5
            </p>
            <p className="mt-2 text-sm text-[#4e453e]/80">
              Ưu đãi 5% cho khách đặt chỗ sớm. Liên hệ ngay để nhận bảng giá chi
              tiết và tư vấn phương án đầu tư phù hợp.
            </p>
          </div>
        </div>
      </section>

      {/* TIẾN ĐỘ */}
      <section id="tien-do" className="scroll-mt-16 bg-white pb-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#634F3F]/70">
            Tiến Độ Xây Dựng
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#4a3829] md:text-4xl">
            Lộ Trình Dự Án
          </h2>
          <div className="mt-10 flex flex-col gap-0">
            {[
              {
                date: "Tháng 3/2026",
                title: "Khởi Công",
                desc: "Lễ động thổ chính thức, bắt đầu thi công móng",
                done: true,
              },
              {
                date: "Tháng 6/2026",
                title: "Thi Công Móng",
                desc: "Đang triển khai giai đoạn thi công nền móng",
                done: true,
              },
              {
                date: "Tháng 9/2026",
                title: "Ký Hợp Đồng Mua Bán",
                desc: "Dự kiến ký HĐMB chính thức với khách hàng",
                done: false,
              },
              {
                date: "Quý 1/2028",
                title: "Bàn Giao",
                desc: "Bàn giao căn hộ, nhận nhà và vận hành tòa nhà",
                done: false,
              },
            ].map((step, i) => (
              <div key={step.date} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div
                    className={`mt-1 h-4 w-4 flex-shrink-0 rounded-full border-2 ${
                      step.done
                        ? "border-[#4a3829] bg-[#4a3829]"
                        : "border-[#d2c4bb] bg-white"
                    }`}
                  />
                  {i < 3 && <div className="my-1 w-0.5 flex-1 bg-[#d2c4bb]" />}
                </div>
                <div className="pb-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#634F3F]/60">
                    {step.date}
                  </p>
                  <p className="mt-1 font-serif text-xl text-[#4a3829]">
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm text-[#4e453e]/80">{step.desc}</p>
                </div>
              </div>
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
    </main>
  );
}
