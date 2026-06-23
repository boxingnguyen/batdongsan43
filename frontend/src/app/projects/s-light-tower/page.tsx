"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { HideSiteHeader } from "@/components/projects/HideSiteHeader";
import { SITE_NAME } from "@/config/site";
import { ProjectScrollPopup } from "@/components/projects/ProjectScrollPopup";

const CAROUSEL_IMAGES = [
  "/images/slight_images/slight4.jpg",
  "/images/slight_images/slight6.jpg",
  "/images/slight_images/slight7.jpg",
  "/images/slight_images/slight1.jpg",
  "/images/slight_images/slight2.jpg",
  "/images/slight_images/slight3.jpg",
  "/images/slight_images/slight5.jpg",
  "/images/slight_images/slight8.jpg",
];

const navLinks = [
  { href: "#tong-quan", label: "Tổng Quan" },
  { href: "#can-ho", label: "Căn Hộ" },
  { href: "#vi-tri", label: "Vị Trí" },
  { href: "#tien-ich", label: "Tiện Ích" },
  { href: "#hinh-anh", label: "Hình Ảnh" },
  { href: "#tien-do", label: "Tiến Độ" },
  { href: "#lien-he", label: "Liên Hệ" },
];

function SLightContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          message: interest || undefined,
          project: "S-Light Tower",
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed");
      }
      setSubmitted(true);
      setName("");
      setPhone("");
      setInterest("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full rounded-sm border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:border-[#C8A96E] focus:outline-none";

  if (submitted) {
    return (
      <div className="flex h-full flex-col items-center justify-center py-12 text-center">
        <p className="font-serif text-2xl text-white">Cảm ơn bạn!</p>
        <p className="mt-2 text-sm text-white/70">
          Chúng tôi sẽ liên hệ lại qua số {phone} sớm nhất.
        </p>
      </div>
    );
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
      {error && (
        <p className="rounded-sm bg-red-900/40 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}
      <input
        type="text"
        name="name"
        required
        placeholder="Họ và tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputCls}
      />
      <input
        type="tel"
        name="phone"
        required
        placeholder="Số điện thoại"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className={inputCls}
      />
      <select
        name="interest"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
        className="w-full rounded-sm border border-white/20 bg-[#4a3829] px-4 py-3 text-white focus:border-[#C8A96E] focus:outline-none"
      >
        <option value="">Quan tâm đến loại căn hộ</option>
        <option value="Studio">Studio</option>
        <option value="1 Phòng Ngủ">1 Phòng Ngủ</option>
        <option value="2 Phòng Ngủ">2 Phòng Ngủ</option>
        <option value="3 Phòng Ngủ">3 Phòng Ngủ</option>
        <option value="Penthouse">Penthouse</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-sm bg-[#C8A96E] py-3 font-semibold uppercase tracking-wide text-[#0d1520] transition-colors hover:bg-[#b8966a] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Đang gửi..." : "Gửi Yêu Cầu Tư Vấn"}
      </button>
    </form>
  );
}

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
        <a
          href="#lien-he"
          className="hidden lg:inline-flex items-center rounded-sm bg-[#4a3829] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#6f5a4a]"
        >
          Đăng Ký
        </a>
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
            alt={`S-Light Tower ${i + 1}`}
            fill
            priority={i === 0}
            draggable={false}
            className="object-cover opacity-60"
            sizes="100vw"
          />
        </div>
      ))}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Prev / Next */}
      <button
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

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {CAROUSEL_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              go(i);
              resetAuto();
            }}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 bg-[#C8A96E]"
                : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Counter */}
      <p className="pointer-events-none absolute bottom-6 right-5 z-20 text-xs font-semibold tabular-nums text-white/50 md:right-8">
        {current + 1} / {total}
      </p>

      {/* Text */}
      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-24 md:px-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#C8A96E]">
          Sun Property · Sun NeO City
        </p>
        <h1 className="font-serif text-4xl font-bold text-white md:text-6xl lg:text-7xl">
          S-LIGHT TOWER
        </h1>
        <p className="mt-3 text-lg font-medium text-white/90 md:text-2xl">
          Tháp đôi biểu tượng — Cửa ngõ Nam Đà Nẵng
        </p>
        <p className="mt-2 text-sm text-white/70 md:text-base">
          Tầm nhìn 360° · Sông Hàn · Núi Ngũ Hành · Biển Đông · Pháo hoa DIFF
        </p>
        <div className="pointer-events-auto mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#lien-he"
            className="inline-block rounded-sm bg-[#C8A96E] px-8 py-3 font-semibold uppercase tracking-wide text-[#0d1520] transition-colors hover:bg-[#b8966a]"
          >
            Đăng Ký Nhận Thông Tin
          </a>
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

export default function SLightTowerPage() {
  return (
    <main className="bg-[#f9f9f9]">
      <HideSiteHeader />
      <SLightNav />

      {/* HERO CAROUSEL */}
      <HeroCarousel />

      {/* SLOGAN HIGHLIGHT */}
      <section className="bg-gradient-to-r from-[#0d1520] to-[#1a2535] py-12 md:py-16">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <div className="mb-6 inline-block rounded-sm bg-[#C8A96E]/20 px-4 py-2">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C8A96E]">
              Mở Bán Đợt 1 · Cơ Hội Có Hạn
            </p>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            MỞ BÁN ĐỢT 1 CĂN HỘ MẶT SÔNG HÀN
          </h2>
          <p className="mt-1 text-base font-semibold text-[#C8A96E] md:text-lg">
            Sổ đỏ Lâu Dài &mdash; 50 tr/booking &mdash; Từ CĐT Sun Group
          </p>
          <blockquote className="mt-6 border-l-4 border-[#C8A96E] pl-5 text-base italic leading-relaxed text-white/80 md:text-lg">
            Tưởng tượng mỗi sáng thức dậy, bạn nhìn ra dòng sông Hàn thơ mộng
            uốn lượn ngay trước mắt. Đó không phải giấc mơ &mdash; đó là cuộc
            sống tại S-Light Tower.
          </blockquote>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Vị trí độc tôn – tiện ích cao cấp (Gym, bể bơi, kids club..)",
              "Kiến trúc đẳng cấp, 3 mặt view sông độc đáo DUY NHẤT Đà Nẵng.",
              "Chỉ 396 căn/tòa – cơ hội có hạn!",
              "PHÁP LÝ: SỞ HỮU LÂU DÀI.",
              "Chính sách mở bán đợt 1 cực tốt – ưu tiên KH đăng ký sớm.",
            ].map((slogan) => (
              <li
                key={slogan}
                className="flex items-start gap-3 rounded-sm border border-[#C8A96E]/20 bg-white/5 px-4 py-3"
              >
                <span className="mt-0.5 flex-shrink-0 text-lg text-[#C8A96E]">
                  ✓
                </span>
                <span className="text-sm font-medium leading-snug text-white/90">
                  {slogan}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TỔNG QUAN */}
      <section id="tong-quan" className="scroll-mt-16 pb-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#634F3F]/70">
            Tổng Quan Dự Án
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#4a3829] md:text-4xl">
            S-Light Tower Đà Nẵng
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#4e453e]/80">
            Tọa lạc ngay ngã tư Nguyễn Đình Thi - 29/3, S-Light Tower là tháp
            đôi cao tầng biểu tượng thuộc đại đô thị Sun NeO City tại Hòa Xuân.
            Với cảm hứng kiến trúc &quot;Hạc Vân Thiên&quot; — hình tượng chim
            Hạc vươn cánh lên trời mây — công trình mang đậm hơi thở văn hóa
            phương Đông hiện đại, đặt trên thế đất &quot;minh đường tụ
            thủy&quot; hiếm có tại ngã ba sông Cẩm Lệ, sông Hàn và sông Đô Tỏa.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[
              { label: "Chủ đầu tư", value: "Sun Property (Sun Group)" },
              { label: "Thuộc khu đô thị", value: "Sun NeO City, Hòa Xuân" },
              { label: "Số tháp", value: "2 tháp đôi" },
              { label: "Số tầng", value: "22 tầng + 3 hầm" },
              { label: "Tổng căn hộ", value: "~800 căn" },
              { label: "Loại căn", value: "Studio → Penthouse" },
              { label: "Vị trí", value: "Nguyễn Đình Thi - 29/3" },
              { label: "Biển Mỹ Khê", value: "2,5 km" },
              { label: "Sân bay Đà Nẵng", value: "5 km" },
              { label: "Trung tâm TP", value: "5,5 km" },
              { label: "Phố cổ Hội An", value: "18,6 km" },
              { label: "Pháp lý", value: "Sở hữu lâu dài" },
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
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#4e453e]/80">
            Studio và 1 phòng ngủ chiếm ~80% quỹ căn — đảm bảo thanh khoản vượt
            trội và tỷ lệ lấp đầy cao khi khai thác cho thuê.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {[
              {
                type: "Studio",
                badge: "~80% quỹ căn",
                desc: "Tối ưu đầu tư cho thuê, thanh khoản cao",
              },
              {
                type: "1 Phòng Ngủ",
                badge: "~80% quỹ căn",
                desc: "Lý tưởng cho cặp đôi và chuyên gia",
              },
              {
                type: "2 Phòng Ngủ",
                badge: "",
                desc: "Không gian rộng rãi cho gia đình nhỏ",
              },
              {
                type: "3 Phòng Ngủ",
                badge: "",
                desc: "Căn hộ gia đình với diện tích thoải mái",
              },
              {
                type: "Penthouse",
                badge: "Đỉnh cao",
                desc: "Tầng cao nhất, tầm nhìn toàn cảnh sông - biển - pháo hoa",
              },
            ].map((apt) => (
              <div
                key={apt.type}
                className="group rounded-sm border border-[#E8E2D9] p-6 transition-shadow hover:shadow-md"
              >
                <p className="font-serif text-xl font-semibold text-[#4a3829] group-hover:text-[#634F3F]">
                  {apt.type}
                </p>
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
      </section>

      {/* VỊ TRÍ */}
      <section id="vi-tri" className="scroll-mt-16 pb-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#634F3F]/70">
            Vị Trí
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#4a3829] md:text-4xl">
            Tâm Mạch Nam Đà Nẵng
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#4e453e]/80">
            Hưởng lợi từ mạng lưới giao thông tỷ đô đang hoàn thiện: cầu Bùi Tá
            Hán kết nối trực tiếp với biển Mỹ Khê, tuyến đường sắt cao tốc Bắc -
            Nam và hệ thống LRT kết nối sân bay Đà Nẵng - Hội An - Chu Lai.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "🏖️",
                title: "Biển Mỹ Khê",
                detail: "2,5 km · Qua cầu Bùi Tá Hán",
              },
              {
                icon: "✈️",
                title: "Sân Bay Đà Nẵng",
                detail: "5 km · ~10 phút",
              },
              {
                icon: "🏙️",
                title: "Trung Tâm Đà Nẵng",
                detail: "5,5 km · ~12 phút",
              },
              {
                icon: "🏯",
                title: "Phố Cổ Hội An",
                detail: "18,6 km · ~25 phút",
              },
              {
                icon: "🌊",
                title: "Ngã Ba Sông",
                detail: "Sông Cẩm Lệ · Hàn · Đô Tỏa",
              },
              {
                icon: "🚄",
                title: "Đường Sắt Cao Tốc",
                detail: "Bắc - Nam (quy hoạch)",
              },
              {
                icon: "🚋",
                title: "Hệ Thống LRT",
                detail: "226.000 tỷ · Đà Nẵng - Hội An",
              },
              {
                icon: "⛰️",
                title: "Ngũ Hành Sơn",
                detail: "Tầm nhìn từ ban công",
              },
            ].map((loc) => (
              <div
                key={loc.title}
                className="flex items-start gap-4 rounded-sm border border-[#E8E2D9] bg-white p-5 shadow-sm"
              >
                <span className="text-2xl">{loc.icon}</span>
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
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C8A96E]/70">
            Tiện Ích Nội Khu
          </p>
          <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
            Trải Nghiệm Đa Chiều
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80">
            Từ shophouse sầm uất tầng trệt đến không gian giải trí và chăm sóc
            sức khỏe toàn diện tầng 2, S-Light Tower kiến tạo hệ sinh thái sống
            khép kín cho cư dân tinh hoa.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "🏊",
                title: "Hồ Bơi",
                desc: "Không gian bơi lội thư giãn tại tầng 2, view mở thoáng đãng",
              },
              {
                icon: "💪",
                title: "Gym · Spa",
                desc: "Khu thể thao và chăm sóc sức khỏe tiêu chuẩn cao cấp",
              },
              {
                icon: "🛍️",
                title: "Shophouse",
                desc: "Tầng trệt sôi động, đáp ứng toàn bộ nhu cầu mua sắm thường nhật",
              },
              {
                icon: "🎠",
                title: "Kids Club",
                desc: "Khu vui chơi trẻ em an toàn, sáng tạo và hiện đại",
              },
              {
                icon: "🎮",
                title: "Family Game Lounge",
                desc: "Không gian giải trí gia đình đa thế hệ",
              },
              {
                icon: "📚",
                title: "Thư Viện",
                desc: "Môi trường workcation lý tưởng cho tầng lớp trí thức",
              },
              {
                icon: "🔒",
                title: "An Ninh 24/7",
                desc: "Hệ thống bảo mật hiện đại, quản lý chuyên nghiệp",
              },
              {
                icon: "🅿️",
                title: "3 Tầng Hầm",
                desc: "Bãi đỗ xe rộng rãi, đáp ứng toàn bộ cư dân",
              },
            ].map((amenity) => (
              <div
                key={amenity.title}
                className="rounded-sm border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
              >
                <span className="text-2xl">{amenity.icon}</span>
                <p className="mt-3 font-semibold text-white">{amenity.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {amenity.desc}
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
            {CAROUSEL_IMAGES.map((src, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#E8E2D9]"
              >
                <Image
                  src={src}
                  alt={`S-Light Tower phối cảnh ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[#634F3F]/50">
            Ảnh: S-Light Tower · Sun Property
          </p>
        </div>
      </section>

      {/* TIẾN ĐỘ */}
      <section id="tien-do" className="scroll-mt-16 pb-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#634F3F]/70">
            Tiến Độ
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#4a3829] md:text-4xl">
            Lộ Trình Dự Án
          </h2>
          <div className="mt-10 flex flex-col gap-0">
            {[
              {
                date: "Tháng 6/2026",
                title: "Ra Mắt Chính Thức",
                desc: "Sun Property giới thiệu S-Light Tower tại Nam Đà Nẵng",
                done: true,
              },
              {
                date: "Quý 3/2026",
                title: "Mở Bán & Ký HĐMB",
                desc: "Mở bán chính thức, ký hợp đồng mua bán với khách hàng",
                done: false,
              },
              {
                date: "2027",
                title: "Thi Công Thân Tháp",
                desc: "Triển khai xây dựng 2 tháp 22 tầng",
                done: false,
              },
              {
                date: "2028",
                title: "Bàn Giao",
                desc: "Bàn giao căn hộ, vận hành tòa nhà và các tiện ích",
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

      {/* LIÊN HỆ */}
      <section
        id="lien-he"
        className="scroll-mt-16 bg-[#4a3829] pb-20 text-white"
      >
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C8A96E]/70">
                Liên Hệ Tư Vấn
              </p>
              <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
                Nhận Thông Tin &amp; Báo Giá
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/80">
                Liên hệ ngay để được tư vấn trực tiếp về S-Light Tower — lựa
                chọn an cư và đầu tư sinh lời bền vững tại tâm mạch Nam Đà Nẵng.
              </p>
              <div className="mt-8 space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#C8A96E]/70">
                    Chủ Đầu Tư
                  </p>
                  <p className="mt-1 font-semibold text-white">
                    Sun Property — Tập đoàn Sun Group
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#C8A96E]/70">
                    Tư Vấn Viên
                  </p>
                  <p className="mt-1 text-white/90">(GDDA) Nguyễn Thị Nguyệt</p>
                  <p className="mt-0.5 text-white/70 text-sm">
                    BĐS Duyên Hải - Đất Xanh Miền Bắc
                  </p>
                </div>
                <a
                  href="tel:0345747138"
                  className="mt-2 inline-flex items-center gap-2 rounded-sm bg-[#C8A96E] px-6 py-3 font-semibold text-[#0d1520] transition-colors hover:bg-[#b8966a]"
                >
                  📞 0345 747 138
                </a>
              </div>
            </div>
            <div className="rounded-sm bg-white/5 p-8">
              <p className="font-serif text-xl text-white">
                Đăng Ký Nhận Thông Tin
              </p>
              <SLightContactForm />
            </div>
          </div>
        </div>
      </section>
      <ProjectScrollPopup projectName="S-Light Tower" accent="#C8A96E" />
    </main>
  );
}
