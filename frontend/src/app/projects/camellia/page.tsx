// ✅ SERVER COMPONENT – Không có "use client"
// → Next.js render HTML trên server → Google Bot đọc được H1, H2, metadata, JSON-LD
// → SEO tối ưu theo chuẩn Next.js 14+ App Router

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  TreePine,
  Waves,
  Building2,
  MapPin,
  Car,
  Plane,
} from "lucide-react";
import { buildMetadata, buildJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd, buildProjectBreadcrumbItems } from "@/lib/seo";
import { CamelliaPageClient } from "./CamelliaClient";
import { ProjectBottomContent } from "@/components/projects/ProjectBottomContent";
import { getSEO } from "@/config/projects-seo";
import { projects } from "@/data/projects";

// ─── SEO Config – lấy từ projects-seo.ts (bao gồm keywords, faq, og, jsonLd) ──

const CAMELLIA_SEO_CONFIG = getSEO("camellia");

// ─── Dynamic Metadata ─────────────────────────────────────────────────────────
// ✅ Chỉ hoạt động ở Server Component → Next.js inject vào <head>

export const metadata: Metadata = buildMetadata(CAMELLIA_SEO_CONFIG);

// ─── Static data – dữ liệu hiển thị trang Camellia (pure server-side) ─────────

const CAMELLIA_LOCATION_ITEMS = [
  { icon: TreePine, title: "Bán Đảo Sơn Trà", detail: "2 phút · Không gian thiên nhiên" },
  { icon: Waves, title: "Biển Mỹ Khê", detail: "2 phút · Trải nghiệm biển" },
  { icon: MapPin, title: "Chùa Linh Ứng", detail: "3 phút · Tâm linh, du lịch" },
  { icon: Building2, title: "Trung tâm TP Đà Nẵng", detail: "10-12 phút" },
  { icon: Car, title: "Cầu Rồng", detail: "10-12 phút" },
  { icon: Plane, title: "Sân bay Đà Nẵng", detail: "20 phút" },
];

const CAMELLIA_AMENITY_ITEMS = [
  { title: "Indoor Pool", desc: "Hồ bơi trong nhà đẳng cấp, chuẩn Wellness, thiết kế sang trọng", image: "/images/camellia_images/tien_ich/camellia-tien-ich-be-boi.jpg" },
  { title: "Gym Center", desc: "Phòng tập Gym cao cấp, không gian thể thao năng động", image: "/images/camellia_images/tien_ich/camellia-tien-ich-phong-gym.jpg" },
  { title: "Yoga & Meditation", desc: "Không gian tập Yoga view thiên nhiên thư thái", image: "/images/camellia_images/tien_ich/camellia-tien-ich-phong-yoga.jpg" },
  { title: "Community Room", desc: "Phòng sinh hoạt cộng đồng, không gian kết nối cư dân", image: "/images/camellia_images/tien_ich/camellia-tien-ich-phong-sinh-hoat-cong-dong.jpg" },
  { title: "Luxury Lobby", desc: "Sảnh đón và khu vực thang máy hiện đại sang trọng", image: "/images/camellia_images/tien_ich/camellia-tien-ich-thang-may-tang-2.jpg" },
  { title: "Sky Garden", desc: "Vườn trên mây, không gian thư giãn và tầm nhìn bao quát", image: "/images/camellia_images/tien_ich/camellia-tien-ich-tang-mai-1.jpg" },
];

const CAMELLIA_TIMELINE_ITEMS = [
  { date: "Tiến độ hiện tại", title: "Hoàn Thành Móng", desc: "Đã hoàn thành phần móng ngầm, pháp lý chuẩn chỉnh.", done: true },
  { date: "Tiến độ thi công", title: "Đang Xây Tầng 2", desc: "Dự án đang trong quá trình xây dựng phần thân.", done: true },
  { date: "Quý I / 2028", title: "Bàn Giao Dự Kiến", desc: "Bàn giao căn hộ hoàn thiện cao cấp cho cư dân.", done: false },
];

// ─── Page Component (Server Component) ───────────────────────────────────────

export default function CamelliaPage() {
  // FAQ lấy từ CAMELLIA_SEO_CONFIG.faq (khai báo tập trung trong projects-seo.ts)
  const camelliaFaqItems = CAMELLIA_SEO_CONFIG.faq ?? [];

  // Breadcrumb tự động sinh từ SEO config – dùng chung buildProjectBreadcrumbItems()
  const camelliaBreadcrumbJsonLd = buildBreadcrumbJsonLd(
    buildProjectBreadcrumbItems(CAMELLIA_SEO_CONFIG)
  );
  const camelliaApartmentComplexJsonLd = buildJsonLd(CAMELLIA_SEO_CONFIG);
  const camelliaFaqPageJsonLd = buildFaqJsonLd(camelliaFaqItems);

  return (
    <main className="bg-[#F8F7F3]">
      {/*JSON-LD: ApartmentComplex Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: camelliaApartmentComplexJsonLd }}
      />
      {/*JSON-LD: BreadcrumbList Schema – hiển thị đường dẫn trên Google SERP */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: camelliaBreadcrumbJsonLd }}
      />
      {/*JSON-LD: FAQPage Schema – xuất hiện Rich Snippets hỏi đáp trên Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: camelliaFaqPageJsonLd }}
      />
      <CamelliaPageClient />
      {/* BREADCRUMB UI – Google đọc được, tăng CTR trên SERP */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-[#E8E5DF] bg-white py-3"
      >
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#2B2B2B]/60">
            <li>
              <Link href="/" className="hover:text-[#16384C] transition-colors">
                Trang Chủ
              </Link>
            </li>
            <li aria-hidden="true" className="select-none">›</li>
            <li>
              <Link href="/projects" className="hover:text-[#16384C] transition-colors">
                Dự Án Bất Động Sản Đà Nẵng
              </Link>
            </li>
            <li aria-hidden="true" className="select-none">›</li>
            <li className="font-semibold text-[#16384C]" aria-current="page">
              The Camellia Sơn Trà
            </li>
          </ol>
        </div>
      </nav>
      {/* SLOGAN HIGHLIGHT ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-[#16384C] to-[#204a63] py-12 md:py-16">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <div className="mb-6 inline-block rounded-sm bg-[#C9A45D]/20 px-4 py-2">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C9A45D]">
              Luxury Urban Nature Residence
            </p>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            SỞ HỮU CĂN HỘ BIỂN SƠN TRÀ ĐÀ NẴNG LÂU DÀI
          </h2>
          <p className="mt-1 text-base font-semibold text-[#C9A45D] md:text-lg">
            Phiên bản giới hạn 478 căn &mdash; CĐT Thành Lâm &mdash; Phát triển MBLand Holding
          </p>
          <blockquote className="mt-6 border-l-4 border-[#C9A45D] pl-5 text-base italic leading-relaxed text-white/80 md:text-lg">
            &quot;Không phải sống gần thiên nhiên. Mà là sống trong thiên nhiên nhưng vẫn ở trung tâm thành phố.&quot;
          </blockquote>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Forest • City • Sea: Vị trí giao thoa độc bản Rừng – Biển – Trung tâm.",
              "Sở hữu lâu dài (Đủ điều kiện bán nhà ở hình thành trong tương lai).",
              "Chỉ 478 căn hộ giới hạn – Không mở rộng thêm phase tiếp theo.",
              "Kiến trúc lấy cảm hứng từ Núi – Đá – Biển Sơn Trà.",
              "Premium Lifestyle với chuỗi tiện ích Wellness, Sky Garden.",
            ].map((slogan) => (
              <li
                key={slogan}
                className="flex items-start gap-3 rounded-sm border border-[#C9A45D]/20 bg-white/5 px-4 py-3"
              >
                <span className="mt-0.5 flex-shrink-0 text-lg text-[#C9A45D]">✓</span>
                <span className="text-sm font-medium leading-snug text-white/90">
                  {slogan}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TỔNG QUAN ──────────────────────────────────────────────────────────── */}
      <section id="tong-quan" className="scroll-mt-16 pb-20 pt-16">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5C8269]/70">
            Tổng Quan Dự Án
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#16384C] md:text-4xl">
            The Camellia Sơn Trà Đà Nẵng
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#2B2B2B]/80">
            The Camellia không được định vị là một dự án căn hộ thông thường, mà là một Luxury Urban Nature Residence. Tọa lạc tại giao lộ Lê Văn Lương và Lê Đức Thọ, nơi hội tụ giá trị thiên nhiên nguyên bản của rừng nguyên sinh Sơn Trà, vẻ đẹp của biển Mỹ Khê và nhịp sống năng động của trung tâm thành phố Đà Nẵng.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[
              { label: "Chủ đầu tư", value: "Công ty TNHH Địa ốc Thành Lâm" },
              { label: "Phát triển", value: "MBLand Holding & WeLand" },
              { label: "Quy mô", value: "1 Tower (25 tầng nổi, 2 hầm)" },
              { label: "Diện tích đất", value: "4.299,9 m² (Mật độ 48,2%)" },
              { label: "Tổng sản phẩm", value: "478 (469 căn hộ + 9 TM)" },
              { label: "Loại hình", value: "Studio, 2BR, 3BR, Duplex" },
              { label: "Vị trí", value: "Lê Văn Lương × Lê Đức Thọ" },
              { label: "Biển Mỹ Khê", value: "2 phút di chuyển" },
              { label: "Bán Đảo Sơn Trà", value: "Tựa lưng trực tiếp" },
              { label: "Trung tâm TP", value: "10 phút di chuyển" },
              { label: "Bàn giao", value: "Dự kiến Quý I / 2028" },
              { label: "Pháp lý", value: "Sở hữu lâu dài" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-sm border border-[#E8E5DF] bg-white p-4 shadow-sm"
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#5C8269]/70">
                  {item.label}
                </p>
                <p className="mt-1 text-base font-semibold text-[#16384C]">
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
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5C8269]/70">
            Vị Trí
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#16384C] md:text-4xl">
            Vị Trí The Camellia Sơn Trà – Tâm Điểm Kết Nối
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#2B2B2B]/80">
            Nằm tại giao lộ vàng Lê Văn Lương và Lê Đức Thọ, phường Sơn Trà, TP Đà Nẵng. Không quá đông đúc, không quá xa trung tâm – một điểm cân bằng tuyệt hảo mang giá trị tài sản truyền đời.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAMELLIA_LOCATION_ITEMS.map((loc) => (
              <div
                key={loc.title}
                className="flex items-start gap-4 rounded-sm border border-[#E8E5DF] bg-white p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C9A45D]/10 text-[#C9A45D]">
                  <loc.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#16384C]">{loc.title}</p>
                  <p className="mt-1 text-sm text-[#2B2B2B]/70">{loc.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIỆN ÍCH ───────────────────────────────────────────────────────────── */}
      <section
        id="tien-ich"
        className="scroll-mt-16 bg-[#16384C] pb-20 text-white pt-16"
      >
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A45D]/70">
            Tiện Ích Nội Khu
          </p>
          <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
            Đặc Quyền Tiện Ích The Camellia – Wellness & Lifestyle
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80">
            Không chỉ là nơi an cư, The Camellia mang đến trải nghiệm sống chuẩn mực với hệ thống tiện ích chăm sóc sức khỏe, kết nối cộng đồng tinh hoa và thiên nhiên nguyên bản.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CAMELLIA_AMENITY_ITEMS.map((amenity) => (
              <div
                key={amenity.title}
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-all hover:shadow-lg"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={amenity.image}
                    alt={`${amenity.title} tại căn hộ cao cấp The Camellia Sơn Trà Đà Nẵng`}
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
      <section id="tien-do" className="scroll-mt-16 pb-20 pt-16">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5C8269]/70">
            Tiến Độ Dự Án
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#16384C] md:text-4xl">
            Tiến Độ Bàn Giao The Camellia Sơn Trà – Dự Kiến Q1/2028
          </h2>
          <div className="mt-10 flex flex-col gap-0">
            {CAMELLIA_TIMELINE_ITEMS.map((step, i) => (
              <div key={step.date} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div
                    className={`mt-1 h-4 w-4 flex-shrink-0 rounded-full border-2 ${step.done
                      ? "border-[#16384C] bg-[#16384C]"
                      : "border-[#E8E5DF] bg-white"
                      }`}
                  />
                  {i < CAMELLIA_TIMELINE_ITEMS.length - 1 && (
                    <div className="my-1 w-0.5 flex-1 bg-[#E8E5DF]" />
                  )}
                </div>
                <div className="pb-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#5C8269]/70">
                    {step.date}
                  </p>
                  <p className="mt-1 font-serif text-xl text-[#16384C]">
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm text-[#2B2B2B]/80">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProjectBottomContent 
        slug="camellia" 
        accentColor="#C9A45D" 
        bgSeo="bg-white"
        bgRelated="bg-white"
        borderColor="border-[#E8E5DF]"
      />

      {/* FAQ SECTION  */}
      <section id="faq" className="scroll-mt-16 bg-[#F8F7F3] py-16 border-t border-[#E8E5DF]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5C8269]/70">
            Hỏi Đáp
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#16384C] md:text-4xl">
            Câu Hỏi Thường Gặp Về The Camellia Sơn Trà Đà Nẵng
          </h2>
          <p className="mt-3 text-sm text-[#2B2B2B]/70 max-w-2xl">
            Tổng hợp các câu hỏi phổ biến nhất về dự án <strong>căn hộ biển Sơn Trà đà Nẵng sở hữu lâu dài</strong> – The Camellia.
          </p>
          <div className="mt-10 divide-y divide-[#E8E5DF]">
            {camelliaFaqItems.map((faq, index) => (
              <div key={index} className="py-6">
                <h3 className="font-semibold text-[#16384C] text-base leading-snug">
                  <span className="mr-2 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#C9A45D]/15 text-xs font-bold text-[#C9A45D]">
                    {index + 1}
                  </span>
                  {faq.question}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#2B2B2B]/80 pl-8">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EEAT – Uy Tín & Chuyên Gia */}
      <section className="bg-[#16384C] py-12 border-t border-[#16384C]/30">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A45D]/70">
            Tư Vấn Chuyên Nghiệp
          </p>
          <h2 className="mt-3 font-serif text-2xl font-bold text-white md:text-3xl">
            Đơn Vị Tư Vấn & Phân Phối Chính Thức The Camellia Sơn Trà
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Chủ Đầu Tư",
                value: "Công ty TNHH Địa ốc Thành Lâm",
                note: "Chủ đầu tư pháp lý dự án",
              },
              {
                label: "Phát Triển",
                value: "MBLand Holding & WeLand",
                note: "Thương hiệu BDS cao cấp uy tín",
              },
              {
                label: "Căn Hộ Cao Cấp",
                value: "478 Căn – 1 Tháp 25 Tầng",
                note: "Giới hạn – Không mở rộng phase tiếp",
              },
              {
                label: "Pháp Lý",
                value: "Sở Hữu Lâu Dài (Vĩnh Viễn)",
                note: "Sổ hồng riêng từng căn hộ",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-sm border border-[#C9A45D]/20 bg-white/5 p-5"
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#C9A45D]/70">
                  {item.label}
                </p>
                <p className="mt-2 font-semibold text-white">{item.value}</p>
                <p className="mt-1 text-xs text-white/60">{item.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "Pháp lý minh bạch – đủ điều kiện MBHTTL",
              "Móng ngầm hoàn thiện",
              "Sở hữu lâu dài (sổ hồng vĩnh viễn)",
              "Bàn giao hoàn thiện cao cấp",
              "Quản lý vận hành chuyên nghiệp",
            ].map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80"
              >
                {badge}
              </span>
            ))}
          </div>
          <p className="mt-8 text-sm text-white/70 max-w-2xl">
            Cần tư vấn chi tiết về <strong className="text-white">căn hộ biển Sơn Trà Đà Nẵng</strong> hoặc
            nhận bảng giá mới nhất từ <strong className="text-white">The Camellia Sơn Trà</strong>?{" "}
            <Link href="/contact-us" className="font-semibold text-[#C9A45D] underline hover:text-[#d4b06a]">
              Liên hệ ngay →
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
