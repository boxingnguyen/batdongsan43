// ✅ SERVER COMPONENT – Không có "use client"
// → Next.js render HTML trên server → Google Bot đọc được H1, H2, metadata, JSON-LD
// → SEO tối ưu theo chuẩn Next.js 14+ App Router

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Umbrella,
  Plane,
  Building2,
  Castle,
  Waves,
  Train,
  TramFront,
  Mountain,
} from "lucide-react";
import { buildMetadata, buildJsonLd } from "@/lib/seo";
import { SLightPageClient } from "./SlightClient";
import { getSEO } from "@/config/projects-seo";

// ─── SEO Config ──────────────────────────────────────────────────────────────

const SEO_CONFIG = getSEO("s-light-tower")

// ─── Dynamic Metadata ─────────────────────────────────────────────────────────
// ✅ Chỉ hoạt động ở Server Component → Next.js inject vào <head>

export const metadata: Metadata = buildMetadata(SEO_CONFIG);

// ─── Static data (pure server-side rendering) ────────────────────────────────

const LOCATION_ITEMS = [
  { icon: Umbrella, title: "Biển Mỹ Khê", detail: "2,5 km · Qua cầu Bùi Tá Hán" },
  { icon: Plane, title: "Sân Bay Đà Nẵng", detail: "5 km · ~10 phút" },
  { icon: Building2, title: "Trung Tâm Đà Nẵng", detail: "5,5 km · ~12 phút" },
  { icon: Castle, title: "Phố Cổ Hội An", detail: "18,6 km · ~25 phút" },
  { icon: Waves, title: "Ngã Ba Sông", detail: "Sông Cẩm Lệ · Hàn · Đô Tỏa" },
  { icon: Train, title: "Đường Sắt Cao Tốc", detail: "Bắc - Nam (quy hoạch)" },
  { icon: TramFront, title: "Hệ Thống LRT", detail: "226.000 tỷ · Đà Nẵng - Hội An" },
  { icon: Mountain, title: "Ngũ Hành Sơn", detail: "Tầm nhìn từ ban công" },
];

const AMENITY_ITEMS = [
  { title: "Hồ Bơi", desc: "Không gian bơi lội thư giãn tại tầng 2, view mở thoáng đãng", image: "/images/home/cover-pool.png" },
  { title: "Gym · Spa", desc: "Khu thể thao và chăm sóc sức khỏe tiêu chuẩn cao cấp", image: "/images/home/cover-gym.jpg" },
  { title: "Shophouse", desc: "Tầng trệt sôi động, đáp ứng toàn bộ nhu cầu mua sắm thường nhật", image: "/images/home/cover-shopping.jpg" },
  { title: "Kids Club", desc: "Khu vui chơi trẻ em an toàn, sáng tạo và hiện đại", image: "/images/home/cover-kid-club.jpg" },
  { title: "Nhà Hàng", desc: "Không gian ẩm thực đa dạng với đẳng cấp quốc tế", image: "/images/home/cover-restaurant.png" },
  { title: "Quản Lý & An Ninh", desc: "Hệ thống bảo mật hiện đại, quản lý chuyên nghiệp 24/7", image: "/images/home/cover-manage.jpg" },
];

const TIMELINE_ITEMS = [
  { date: "Tháng 6/2026", title: "Ra Mắt Chính Thức", desc: "Sun Property giới thiệu S-Light Tower tại Nam Đà Nẵng", done: true },
  { date: "Quý 3/2026", title: "Mở Bán & Ký HĐMB", desc: "Mở bán chính thức, ký hợp đồng mua bán với khách hàng", done: false },
  { date: "2027", title: "Thi Công Thân Tháp", desc: "Triển khai xây dựng 2 tháp 22 tầng", done: false },
  { date: "2028", title: "Bàn Giao", desc: "Bàn giao căn hộ, vận hành tòa nhà và các tiện ích", done: false },
];

// ─── Page Component (Server Component) ───────────────────────────────────────

export default function SLightTowerPage() {
  const jsonLd = buildJsonLd(SEO_CONFIG);

  return (
    <main className="bg-[#f9f9f9]">
      {/* ✅ JSON-LD Structured Data – ApartmentComplex schema cho Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/*
       * ✅ SLightPageClient – Client Component duy nhất
       *
       * Chứa: HideSiteHeader + SLightNav + HeroCarousel (H1 overlay)
       *       + ChinhSachSection (LayoutCarousel)
       *       + CanHoSection (ApartmentCards + FloorPlanGrid)
       *       + HinhAnhSection (GalleryGrid)
       *       + LightboxModal + ProjectScrollPopup
       *
       * Tất cả state & event handler chỉ sống ở đây.
       * Next.js vẫn SSR ra HTML đầy đủ vì Client Component được pre-render phía server.
       */}
      <SLightPageClient />

      {/* ─────────────────────────────────────────────────────────────────────────
       * Các section bên dưới là PURE SERVER RENDER:
       * → Không có onClick, useState, useEffect
       * → Google Bot nhận HTML đầy đủ ngay lần đầu crawl
       * → H2 được cải thiện để chứa từ khóa SEO
       * ─────────────────────────────────────────────────────────────────────── */}

      {/* SLOGAN HIGHLIGHT ─────────────────────────────────────────────────── */}
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
                <span className="mt-0.5 flex-shrink-0 text-lg text-[#C8A96E]">✓</span>
                <span className="text-sm font-medium leading-snug text-white/90">
                  {slogan}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TỔNG QUAN ──────────────────────────────────────────────────────────── */}
      <section id="tong-quan" className="scroll-mt-16 pb-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#634F3F]/70">
            Tổng Quan Dự Án
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#4a3829] md:text-4xl">
            S-Light Tower Đà Nẵng
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#4e453e]/80">
            Tọa lạc ngay ngã tư Nguyễn Đình Thi - 29/3, S-Light Tower là tháp đôi
            cao tầng biểu tượng thuộc đại đô thị Sun NeO City tại Hòa Xuân. Với
            cảm hứng kiến trúc &quot;Hạc Vân Thiên&quot; — hình tượng chim Hạc
            vươn cánh lên trời mây — công trình mang đậm hơi thở văn hóa phương
            Đông hiện đại, đặt trên thế đất &quot;minh đường tụ thủy&quot; hiếm
            có tại ngã ba sông Cẩm Lệ, sông Hàn và sông Đô Tỏa.
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

      {/* VỊ TRÍ ─────────────────────────────────────────────────────────────── */}
      <section id="vi-tri" className="scroll-mt-16 pb-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#634F3F]/70">
            Vị Trí
          </p>
          {/* ✅ SEO: H2 cải thiện – chứa từ khóa "vị trí S-Light Tower" */}
          <h2 className="mt-3 font-serif text-3xl text-[#4a3829] md:text-4xl">
            Vị Trí S-Light Tower – Tâm Mạch Giao Thông Nam Đà Nẵng
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#4e453e]/80">
            Hưởng lợi từ mạng lưới giao thông tỷ đô đang hoàn thiện: cầu Bùi Tá
            Hán kết nối trực tiếp với biển Mỹ Khê, tuyến đường sắt cao tốc Bắc -
            Nam và hệ thống LRT kết nối sân bay Đà Nẵng - Hội An - Chu Lai.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LOCATION_ITEMS.map((loc) => (
              <div
                key={loc.title}
                className="flex items-start gap-4 rounded-sm border border-[#E8E2D9] bg-white p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C8A96E]/10 text-[#C8A96E]">
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

      {/* TIỆN ÍCH ───────────────────────────────────────────────────────────── */}
      <section
        id="tien-ich"
        className="scroll-mt-16 bg-[#4a3829] pb-20 text-white"
      >
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C8A96E]/70">
            Tiện Ích Nội Khu
          </p>
          {/* ✅ SEO: H2 cải thiện – chứa từ khóa "tiện ích căn hộ S-Light Tower" */}
          <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
            Tiện Ích Nội Khu S-Light Tower – Trải Nghiệm Sống Đẳng Cấp
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80">
            Từ shophouse sầm uất tầng trệt đến không gian giải trí và chăm sóc
            sức khỏe toàn diện tầng 2, S-Light Tower kiến tạo hệ sinh thái sống
            khép kín cho cư dân tinh hoa.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {AMENITY_ITEMS.map((amenity) => (
              <div
                key={amenity.title}
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-all hover:shadow-lg"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={amenity.image}
                    alt={amenity.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="relative p-5">
                  <p className="font-semibold text-white">{amenity.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {amenity.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIẾN ĐỘ ────────────────────────────────────────────────────────────── */}
      <section id="tien-do" className="scroll-mt-16 pb-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#634F3F]/70">
            Tiến Độ
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#4a3829] md:text-4xl">
            Lộ Trình Dự Án
          </h2>
          <div className="mt-10 flex flex-col gap-0">
            {TIMELINE_ITEMS.map((step, i) => (
              <div key={step.date} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div
                    className={`mt-1 h-4 w-4 flex-shrink-0 rounded-full border-2 ${step.done
                        ? "border-[#4a3829] bg-[#4a3829]"
                        : "border-[#d2c4bb] bg-white"
                      }`}
                  />
                  {i < TIMELINE_ITEMS.length - 1 && (
                    <div className="my-1 w-0.5 flex-1 bg-[#d2c4bb]" />
                  )}
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

      {/* DỰ ÁN LIÊN QUAN (Internal Link) ─────────────────────────────────────
       * ✅ SEO: Internal linking giúp Google Bot crawl các project page khác
       * H2 + H3 đều được index hoàn toàn phía server
       */}
      <section className="bg-[#f9f9f9] py-16 border-t border-[#E8E2D9]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <h2 className="font-serif text-2xl font-bold text-[#4a3829] mb-8">
            Các Dự Án Bất Động Sản Cao Cấp Khác Tại Đà Nẵng
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/projects/sun-fours-tower"
              className="group rounded-sm border border-[#E8E2D9] bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-[#C8A96E]"
            >
              <h3 className="font-serif text-lg font-semibold text-[#4a3829] group-hover:text-[#C8A96E]">
                Sun FourS Tower – Căn Hộ Trung Tâm Đà Nẵng
              </h3>
              <p className="mt-2 text-sm text-[#4e453e]/70">Xem chi tiết →</p>
            </Link>
            <Link
              href="/projects/the-legend-danang"
              className="group rounded-sm border border-[#E8E2D9] bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-[#C8A96E]"
            >
              <h3 className="font-serif text-lg font-semibold text-[#4a3829] group-hover:text-[#C8A96E]">
                The Legend – Biệt Thự Nghỉ Dưỡng Đà Nẵng
              </h3>
              <p className="mt-2 text-sm text-[#4e453e]/70">Xem chi tiết →</p>
            </Link>
            <Link
              href="/projects/symphony5"
              className="group rounded-sm border border-[#E8E2D9] bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-[#C8A96E]"
            >
              <h3 className="font-serif text-lg font-semibold text-[#4a3829] group-hover:text-[#C8A96E]">
                Symphony Residence – Căn Hộ Cao Cấp Đà Nẵng
              </h3>
              <p className="mt-2 text-sm text-[#4e453e]/70">Xem chi tiết →</p>
            </Link>
          </div>
        </div>
      </section>

      {/* TEXT SEO CUỐI TRANG ─────────────────────────────────────────────────
       * ✅ Google đọc text này để hiểu context, chứa từ khóa chính
       * ✅ Internal links tăng PageRank cho các trang con
       */}
      <section className="bg-white py-12 border-t border-[#E8E2D9]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <h2 className="text-xl font-bold text-[#4a3829] mb-4">
            Về Dự Án S-Light Tower Đà Nẵng
          </h2>
          <p className="text-sm leading-relaxed text-[#4e453e]/80">
            <strong>S-Light Tower Đà Nẵng</strong> là dự án{" "}
            <strong>căn hộ cao cấp mặt sông Hàn</strong> thuộc đại đô thị Sun NeO
            City, do chủ đầu tư Sun Property (Sun Group) phát triển. Tọa lạc tại
            ngã tư Nguyễn Đình Thi - 29/3, Hòa Xuân, dự án gồm 2 tháp đôi 22
            tầng với khoảng 800 căn hộ từ Studio đến 3 Phòng Ngủ, sở hữu lâu dài,
            pháp lý rõ ràng. Đây là{" "}
            <strong>căn hộ view sông Hàn 270°</strong> duy nhất tại Nam Đà Nẵng
            với tầm nhìn bao quát Ngũ Hành Sơn, Biển Đông và điểm bắn pháo hoa
            DIFF hàng năm.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#4e453e]/80">
            Nếu bạn đang tìm kiếm{" "}
            <Link href="/apartment" className="text-[#C8A96E] underline">
              căn hộ cao cấp Đà Nẵng
            </Link>{" "}
            với vị trí đắc địa, hãy khám phá thêm{" "}
            <Link href="/projects" className="text-[#C8A96E] underline">
              các dự án bất động sản Đà Nẵng
            </Link>{" "}
            khác hoặc{" "}
            <Link href="/contact-us" className="text-[#C8A96E] underline">
              liên hệ tư vấn miễn phí
            </Link>{" "}
            ngay hôm nay.
          </p>
        </div>
      </section>
    </main>
  );
}
