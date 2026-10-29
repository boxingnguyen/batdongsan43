// ✅ SERVER COMPONENT – không có "use client"
// → Toàn bộ nội dung, H1/H2 và JSON-LD được render phía server.
// → Trang không cần JS tương tác: gallery dùng grid + hover, không carousel.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  buildMetadata,
  buildJsonLd,
  buildBreadcrumbJsonLd,
  buildProjectBreadcrumbItems,
} from "@/lib/seo";
import { getSEO } from "@/config/projects-seo";
import { projects } from "@/data/projects";
import { ProjectBottomContent } from "@/components/projects/ProjectBottomContent";

// ─── SEO Config ──────────────────────────────────────────────────────────────

const SOLEIL_SEO_CONFIG = getSEO("soleil");

export const metadata: Metadata = buildMetadata(SOLEIL_SEO_CONFIG);

// ─── Dữ liệu tĩnh – lấy nguyên văn từ nội dung dự án (vi.json + component gốc) ──

const project = projects.find((item) => item.slug === "soleil");

const PROJECT_TITLE = project?.title ?? "The Soleil Đà Nẵng";
const PROJECT_STATUS = project?.status ?? "Đang mở bán";
const PROJECT_LOCATION = project?.location ?? "Đà Nẵng, Việt Nam";

const HERO_IMAGE = "/images/home/banner-5.jpg";
const HERO_IMAGE_ALT =
  "Phối cảnh The Soleil Đà Nẵng – tổ hợp bốn tòa tháp ven biển Mỹ Khê";

const OVERVIEW_FACTS = [
  { label: "Tên thương mại", value: "The Soleil Đà Nẵng" },
  { label: "Chủ đầu tư", value: "Công ty Cổ phần PPC An Thịnh Đà Nẵng" },
  {
    label: "Vị trí",
    value:
      "Số 02 Phạm Văn Đồng, phường An Hải, Đà Nẵng (giao lộ Võ Nguyên Giáp – Phạm Văn Đồng)",
  },
  { label: "Tổng diện tích", value: "21.806 m²" },
  { label: "Quy mô", value: "04 tòa cao tầng + 02 tầng hầm" },
];

const TOWERS = [
  { label: "Tòa A1", value: "57", unit: "tầng" },
  { label: "Tòa A2", value: "57", unit: "tầng" },
  { label: "Tòa D", value: "50", unit: "tầng" },
  { label: "Tòa B · Khách sạn", value: "45", unit: "tầng" },
];

const APARTMENT_TYPES = [
  { label: "Studio", value: "27 – 37 m²" },
  { label: "1 PN", value: "54 – 59 m²" },
  { label: "2 PN+", value: "90 – 121 m²" },
  { label: "3 PN+", value: "149 – 165 m²" },
  { label: "Panorama", value: "72 – 90 m²" },
  { label: "Hyper Panorama", value: "106 – 121 m²" },
  { label: "Penthouse Duplex", value: "Theo thiết kế" },
];

const LOCATIONS = [
  {
    title: "Bãi biển Mỹ Khê",
    detail:
      "Một trong 6 bãi biển quyến rũ nhất hành tinh với bờ cát trắng mịn. Chưa đến 1 phút để đắm mình dưới làn nước trong xanh.",
  },
  {
    title: "Bán đảo Sơn Trà",
    detail:
      "“Viên ngọc quý” của Đà Nẵng, với Chùa Linh Ứng và tượng Phật Quán Thế Âm cao 67 m — cao nhất Việt Nam.",
  },
  {
    title: "Sân bay quốc tế Đà Nẵng",
    detail:
      "Một trong ba sân bay lớn nhất Việt Nam, đáp ứng đầy đủ các tiêu chuẩn quốc tế.",
  },
  {
    title: "Phố cổ Hội An",
    detail:
      "Thế giới của vài trăm năm trước, nơi dòng chảy thời gian dường như chẳng thể vùi lấp không khí cổ xưa.",
  },
  {
    title: "Bà Nà Núi Chúa",
    detail:
      "“Chốn bồng lai tiên cảnh” với khí hậu mát mẻ quanh năm và Cầu Vàng lọt top 100 điểm đến tuyệt vời nhất thế giới.",
  },
  {
    title: "Thánh địa Mỹ Sơn",
    detail:
      "Lịch sử ngàn năm của Vương quốc Chăm-pa, được UNESCO công nhận là di sản văn hoá thế giới.",
  },
  {
    title: "Cố đô Huế",
    detail:
      "Vùng danh lam thắng cảnh hữu tình, đầy sức quyến rũ nhưng vẫn nguyên nét uy nghi, cổ kính của di sản văn hoá thế giới.",
  },
  {
    title: "Các sân golf",
    detail:
      "Điểm dừng chân lý tưởng của các golf thủ với Montgomerie Links, Bà Nà Hills Golf Club và BRG Da Nang Golf.",
  },
];

const UTILITIES = [
  {
    title: "Spa và phòng tập gym",
    detail:
      "Hệ thống spa, phòng tập gym và yoga club được trang bị hiện đại với đội ngũ huấn luyện viên chuyên nghiệp và tận tâm, hứa hẹn đem đến sự hỗ trợ tốt nhất và thời gian thư giãn nhất.",
    image: "/images/home/cover-gym.jpg",
    imageAlt: "Khu spa và phòng tập gym tại The Soleil Đà Nẵng",
    icon: "/images/home/icon-gym.png",
  },
  {
    title: "Hồ bơi hiện đại",
    detail:
      "Ngoài các bể bơi tại khối đế, The Soleil Đà Nẵng còn sở hữu 4 bể bơi tràn trên tầng thượng — điểm nhấn tạo sự độc đáo và khác biệt về đẳng cấp cho dự án.",
    image: "/images/home/cover-pool.png",
    imageAlt: "Bể bơi tràn tầng thượng tại The Soleil Đà Nẵng",
    icon: "/images/home/icon-resort.png",
  },
  {
    title: "Nhà hàng và quán bar",
    detail:
      "Hệ thống quán bar, nhà hàng nằm tại khối đế. Đặc biệt, nhà hàng tại cầu nối giữa các tòa nhà và trên tầng thượng đem đến trải nghiệm ẩm thực độc đáo: trà chiều, bữa tối lãng mạn hay cocktail bên vẻ đẹp biển trời Đà Nẵng.",
    image: "/images/home/cover-restaurant.png",
    imageAlt: "Nhà hàng và quán bar tại The Soleil Đà Nẵng",
    icon: "/images/home/icon-restaurant.png",
  },
  {
    title: "Khu vui chơi cho trẻ em",
    detail:
      "Môi trường nghỉ dưỡng lý tưởng cho các gia đình với Game Room, khu giữ trẻ và đặc biệt là English Club, để bố mẹ an tâm nghỉ ngơi trong khi con trẻ có những giờ phút vui thú và bổ ích.",
    image: "/images/home/cover-kid-club.jpg",
    imageAlt: "Khu vui chơi trẻ em tại The Soleil Đà Nẵng",
    icon: "/images/home/icon-kid-club.png",
  },
  {
    title: "Trung tâm mua sắm",
    detail:
      "Khu trung tâm mua sắm rộng lớn và sang trọng nằm tại 3 tầng đầu tiên của tòa nhà, hợp tác với các đối tác nước ngoài để khai thác khu thương mại đẳng cấp, tập trung những nhãn hiệu nổi tiếng.",
    image: "/images/home/cover-shopping.jpg",
    imageAlt: "Trung tâm mua sắm tại The Soleil Đà Nẵng",
    icon: "/images/home/icon-benefit.png",
  },
  {
    title: "Trung tâm hội nghị",
    detail:
      "Nơi lý tưởng để diễn ra các cuộc họp doanh nghiệp với phòng hội nghị, phòng họp nhỏ tích hợp công nghệ hiện đại, tầm nhìn hướng biển hoặc hướng sông.",
    image: "/images/home/cover-manage.jpg",
    imageAlt: "Trung tâm hội nghị tại The Soleil Đà Nẵng",
    icon: "/images/home/icon-manage.png",
  },
];

const PARTNERS = [
  {
    name: "Aedas",
    role: "Đơn vị thiết kế",
    detail:
      "Một trong những công ty thiết kế kiến trúc hàng đầu thế giới. The Soleil Đà Nẵng là dự án đầu tiên ở Việt Nam có hồ bơi vô cực và thiết kế thông minh bởi đội ngũ Aedas.",
    logo: "/images/home/aedas-logo.png",
    logoWidth: 167,
    logoHeight: 167,
  },
  {
    name: "Wyndham Hotel Group",
    role: "Đơn vị vận hành",
    detail:
      "Với hơn 20 thương hiệu, 15.000 nhân viên và gần 9.000 khách sạn tại 80 quốc gia, Wyndham Hotels Group là một trong những tập đoàn kinh doanh khách sạn và khu nghỉ dưỡng dẫn đầu thế giới.",
    logo: "/images/home/wyndham-logo.png",
    logoWidth: 1024,
    logoHeight: 148,
  },
  {
    name: "Artelia",
    role: "Tư vấn, giám sát và quản lý dự án",
    detail:
      "Artelia Group là tập đoàn lớn đến từ Pháp trong lĩnh vực quản lý dự án, quản lý thi công, tư vấn giám sát, với 75 văn phòng tại 36 quốc gia và 3.500 nhân viên trên thế giới.",
    logo: "/images/home/artelia-logo.png",
    logoWidth: 709,
    logoHeight: 298,
  },
];

const GALLERY_IMAGES = [
  { src: "/images/home/gallery/image-1.jpg", alt: "Cảnh quan khối đế The Soleil Đà Nẵng – hồ bơi và sân vườn giữa các tòa tháp" },
  { src: "/images/home/gallery/image-2.png", alt: "Sảnh tiệc và hội nghị bên trong The Soleil Đà Nẵng" },
  { src: "/images/home/gallery/image-3.png", alt: "Bàn tiệc ngoài trời trên tầng cao The Soleil Đà Nẵng về đêm" },
  { src: "/images/home/gallery/image-4.png", alt: "Phòng khách thông tầng với bể bơi phía trước tại The Soleil Đà Nẵng" },
  { src: "/images/home/gallery/image-5.png", alt: "Phòng ăn và phòng khách căn hộ The Soleil Đà Nẵng, cửa kính hướng ban công" },
  { src: "/images/home/gallery/image-6.png", alt: "Phòng ngủ căn hộ The Soleil Đà Nẵng với ban công nhìn ra biển" },
  { src: "/images/home/gallery/image-7.png", alt: "Phòng ngủ và khu tiếp khách căn hộ The Soleil Đà Nẵng, view núi Sơn Trà" },
  { src: "/images/home/gallery/image-8.png", alt: "Phòng tắm căn hộ The Soleil Đà Nẵng nhìn thẳng ra biển Mỹ Khê" },
];

// ─── Page (Server Component) ─────────────────────────────────────────────────

export default function SoleilPage() {
  const apartmentComplexJsonLd = buildJsonLd(SOLEIL_SEO_CONFIG);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    buildProjectBreadcrumbItems(SOLEIL_SEO_CONFIG)
  );

  return (
    <div className="bg-[#F8F7F3] pt-20 text-[#634F3F] selection:bg-[#C9A45D]/30 selection:text-[#3b2d21]">
      {/* JSON-LD: ApartmentComplex */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: apartmentComplexJsonLd }}
      />
      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }}
      />

      {/* BREADCRUMB ─────────────────────────────────────────────────────────── */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-[#E8E2D9] bg-white py-2"
      >
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#634F3F]/70">
            <li>
              <Link
                href="/"
                className="inline-flex min-h-11 items-center rounded-sm px-1 transition-colors hover:text-[#4a3829] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A45D]"
              >
                Trang chủ
              </Link>
            </li>
            <li aria-hidden="true" className="select-none">›</li>
            <li>
              <Link
                href="/projects"
                className="inline-flex min-h-11 items-center rounded-sm px-1 transition-colors hover:text-[#4a3829] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A45D]"
              >
                Dự án bất động sản Đà Nẵng
              </Link>
            </li>
            <li aria-hidden="true" className="select-none">›</li>
            <li aria-current="page" className="font-semibold text-[#4a3829]">
              {PROJECT_TITLE}
            </li>
          </ol>
        </div>
      </nav>

      {/* HERO ────────────────────────────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[560px] items-end overflow-hidden bg-[#2f2318] pt-12! md:min-h-[720px] md:pb-36!">
        <Image
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          fill
          priority
          sizes="100vw"
          className="soleil-hero-image -z-10 object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-[#241a12] via-[#241a12]/45 to-[#241a12]/10"
        />

        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-20">
          <span className="soleil-hero-rise inline-flex items-center rounded-sm bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4a3829]">
            {PROJECT_STATUS}
          </span>

          <h1 className="soleil-hero-rise mt-5 max-w-4xl font-serif text-4xl leading-[1.05] tracking-[-0.01em] text-white md:text-6xl lg:text-7xl">
            {PROJECT_TITLE}
          </h1>

          <p className="soleil-hero-rise mt-4 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
            Tổ hợp khách sạn và căn hộ cao cấp tại giao lộ Phạm Văn Đồng – Võ
            Nguyên Giáp, cách bãi biển Mỹ Khê chưa đầy 1 phút đi bộ. Bốn tòa tháp
            57 – 57 – 50 – 45 tầng trên khu đất 21.806 m², thiết kế bởi Aedas và
            vận hành bởi Wyndham Hotel Group.
          </p>

          <div className="soleil-hero-rise mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E3C284] md:text-xs">
            <span>{PROJECT_LOCATION}</span>
            <span aria-hidden="true" className="h-3 w-px bg-[#E3C284]/50" />
            <span>21.806 m²</span>
            <span aria-hidden="true" className="h-3 w-px bg-[#E3C284]/50" />
            <span>04 tòa tháp</span>
            <span aria-hidden="true" className="h-3 w-px bg-[#E3C284]/50" />
            <span>02 tầng hầm</span>
          </div>

          <div className="soleil-hero-rise mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/lien-he"
              className="inline-flex min-h-12 items-center justify-center rounded-sm bg-[#C9A45D] px-7 text-sm font-semibold uppercase tracking-wide text-[#2f2318] transition-colors hover:bg-[#E3C284] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Nhận thông tin dự án
            </Link>
            <a
              href="#tong-quan"
              className="inline-flex min-h-12 items-center justify-center rounded-sm border border-white/50 px-7 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Xem tổng quan
            </a>
          </div>
        </div>
      </section>

      {/* TỔNG QUAN ───────────────────────────────────────────────────────────── */}
      <section id="tong-quan" className="scroll-mt-20 bg-[#F8F7F3] py-16! md:py-24!">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
            <div>
              <h2 className="max-w-xl font-serif text-3xl leading-tight text-[#4a3829] md:text-4xl">
                Bốn tòa tháp tạo hình một rạn san hô vĩnh cửu bên Biển Đông
              </h2>
              <div className="mt-6 max-w-[68ch] space-y-4 text-[15px] leading-[1.75] text-[#634F3F]">
                <p>
                  The Soleil Đà Nẵng gồm 4 tòa tháp: 1 tòa khách sạn và 3 tòa
                  căn hộ cao từ 50 – 57 tầng, xây dựng theo tiêu chuẩn quốc tế.
                  Ý tưởng thiết kế là sự giao thoa giữa trời và đất, tạo hình
                  thành một rạn san hô mang ý nghĩa Ánh Dương lộng lẫy, mặt trời
                  rực rỡ soi sáng Biển Đông.
                </p>
                <p>
                  Đây là tổ hợp đầu tiên tại Đà Nẵng có bể bơi vô cực và những
                  cây cầu nối trên không, thiết kế bởi Aedas (Anh quốc); quản lý
                  và vận hành bởi Wyndham Hotel Group; tư vấn, giám sát và quản
                  lý dự án bởi Artelia.
                </p>
              </div>
            </div>

            <dl className="divide-y divide-[#E8E2D9] border-y border-[#E8E2D9]">
              {OVERVIEW_FACTS.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                >
                  <dt className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#634F3F]/60">
                    {fact.label}
                  </dt>
                  <dd className="text-[15px] font-medium leading-snug text-[#4a3829] sm:max-w-[62%] sm:text-right">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-20">
            {/* Tầng cao các tòa */}
            <div>
              <h3 className="font-serif text-xl text-[#4a3829] md:text-2xl">
                Quy mô tầng các tòa tháp
              </h3>
              <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-[#E8E2D9] sm:grid-cols-4">
                {TOWERS.map((tower) => (
                  <div key={tower.label} className="bg-white px-4 py-5">
                    <dt className="text-[11px] font-semibold uppercase leading-tight tracking-[0.12em] text-[#634F3F]/60">
                      {tower.label}
                    </dt>
                    <dd className="mt-2 font-serif text-2xl leading-none text-[#4a3829] md:text-3xl">
                      {tower.value}
                      <span className="ml-1 align-baseline text-xs font-medium tracking-normal text-[#634F3F]/70">
                        {tower.unit}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm leading-relaxed text-[#634F3F]/80">
                Tổng diện tích khu đất 21.806 m², bao gồm 04 tòa cao tầng và 02
                tầng hầm.
              </p>
            </div>

            {/* Loại căn hộ */}
            <div>
              <h3 className="font-serif text-xl text-[#4a3829] md:text-2xl">
                Loại căn hộ
              </h3>
              <dl className="mt-6 grid gap-x-10 sm:grid-cols-2">
                {APARTMENT_TYPES.map((type) => (
                  <div
                    key={type.label}
                    className="flex items-baseline justify-between gap-4 border-b border-[#E8E2D9] py-3"
                  >
                    <dt className="text-[15px] font-medium text-[#4a3829]">
                      {type.label}
                    </dt>
                    <dd className="text-sm tabular-nums text-[#634F3F]/80">
                      {type.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* VỊ TRÍ & KẾT NỐI ────────────────────────────────────────────────────── */}
      <section id="vi-tri" className="scroll-mt-20 bg-white py-16! md:py-24!">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <h2 className="max-w-3xl font-serif text-3xl leading-tight text-[#4a3829] md:text-4xl">
            Vị trí và kết nối: trung tâm của thành phố đáng sống nhất Việt Nam
          </h2>
          <p className="mt-5 max-w-[68ch] text-[15px] leading-[1.75] text-[#634F3F]">
            Dự án nằm ngay vị trí giao thông quan trọng, giữa giao lộ Phạm Văn
            Đồng và Võ Nguyên Giáp, cách bãi biển Mỹ Khê chưa đầy 1 phút đi bộ,
            đồng thời đối diện công viên Biển Đông — nơi diễn ra các sự kiện
            quan trọng của thành phố.
          </p>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <figure className="lg:sticky lg:top-28 lg:self-start">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#E8E2D9]">
                <Image
                  src="/images/home/mykhe.jpg"
                  alt="Bãi biển Mỹ Khê, Đà Nẵng – cách The Soleil Đà Nẵng chưa đầy 1 phút đi bộ"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-xs leading-relaxed text-[#634F3F]/70">
                Bãi biển Mỹ Khê — một trong 6 bãi biển quyến rũ nhất hành tinh.
              </figcaption>
            </figure>

            <dl className="divide-y divide-[#E8E2D9] border-t border-[#E8E2D9]">
              {LOCATIONS.map((location) => (
                <div key={location.title} className="py-5">
                  <dt className="font-serif text-lg text-[#4a3829]">
                    {location.title}
                  </dt>
                  <dd className="mt-1.5 max-w-[62ch] text-sm leading-relaxed text-[#634F3F]/85">
                    {location.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* TIỆN ÍCH ───────────────────────────────────────────────────────────── */}
      <section id="tien-ich" className="scroll-mt-20 bg-[#3b2d21] py-16! text-white md:py-24!">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <h2 className="max-w-3xl font-serif text-3xl leading-tight text-white md:text-4xl">
            Hệ tiện ích chuẩn 5 sao trong một khu phức hợp hoàn chỉnh
          </h2>
          <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.75] text-white/75">
            Sáu nhóm tiện ích trải từ khối đế đến tầng thượng: chăm sóc sức
            khỏe, bể bơi tràn, ẩm thực, không gian cho trẻ em, mua sắm và hội
            nghị.
          </p>

          <div className="mt-12 space-y-10 md:mt-16 md:space-y-14">
            {UTILITIES.map((utility, index) => (
              <article
                key={utility.title}
                className={`grid items-center gap-6 md:grid-cols-2 md:gap-12 ${
                  index > 0 ? "border-t border-white/10 pt-10 md:pt-14" : ""
                }`}
              >
                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-sm bg-white/5 ${
                    index % 2 === 1 ? "md:order-2" : ""
                  }`}
                >
                  <Image
                    src={utility.image}
                    alt={utility.imageAlt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                  />
                </div>
                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <Image
                    src={utility.icon}
                    alt=""
                    aria-hidden="true"
                    width={44}
                    height={44}
                    loading="lazy"
                    sizes="44px"
                    className="h-11 w-11 object-contain"
                  />
                  <h3 className="mt-4 font-serif text-xl text-white md:text-2xl">
                    {utility.title}
                  </h3>
                  <p className="mt-2 max-w-[54ch] text-sm leading-relaxed text-white/75 md:text-[15px]">
                    {utility.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* THƯ VIỆN ────────────────────────────────────────────────────────────── */}
      <section id="hinh-anh" className="scroll-mt-20 bg-[#F8F7F3] py-16! md:py-24!">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <h2 className="font-serif text-3xl leading-tight text-[#4a3829] md:text-4xl">
            Thư viện hình ảnh The Soleil Đà Nẵng
          </h2>
          <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.75] text-[#634F3F]">
            Cảnh quan khối đế và không gian sống bên trong căn hộ: phòng khách,
            phòng ăn, phòng ngủ và phòng tắm hướng biển.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-3 md:mt-12 md:grid-cols-4 md:gap-4">
            {GALLERY_IMAGES.map((image, index) => (
              <figure
                key={image.src}
                className={`group relative overflow-hidden rounded-sm bg-[#E8E2D9] ${
                  index === 0
                    ? "col-span-2 aspect-[16/10] md:row-span-2 md:aspect-[4/5]"
                    : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  loading="lazy"
                  sizes={
                    index === 0
                      ? "(max-width: 768px) 100vw, 50vw"
                      : "(max-width: 768px) 50vw, 25vw"
                  }
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ĐỐI TÁC ─────────────────────────────────────────────────────────────── */}
      <section id="doi-tac" className="scroll-mt-20 bg-white py-16! md:py-24!">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <h2 className="max-w-3xl font-serif text-3xl leading-tight text-[#4a3829] md:text-4xl">
            Đối tác thiết kế, vận hành và quản lý dự án
          </h2>

          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-[#E8E2D9]">
            {PARTNERS.map((partner) => (
              <article key={partner.name} className="md:px-8 md:first:pl-0 md:last:pr-0">
                <div className="flex h-14 items-center">
                  <Image
                    src={partner.logo}
                    alt={`Logo ${partner.name}`}
                    width={partner.logoWidth}
                    height={partner.logoHeight}
                    loading="lazy"
                    sizes="(max-width: 768px) 180px, 220px"
                    className="h-10 w-auto max-w-[180px] object-contain md:h-12"
                  />
                </div>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#634F3F]/60">
                  {partner.role}
                </p>
                <h3 className="mt-2 font-serif text-xl text-[#4a3829]">
                  {partner.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#634F3F]/85">
                  {partner.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DỰ ÁN LIÊN QUAN + TEXT SEO */}
      <ProjectBottomContent
        slug="soleil"
        accentColor="#C9A45D"
        bgSeo="bg-[#F8F7F3]"
        bgRelated="bg-white"
        borderColor="border-[#E8E2D9]"
      />

      {/* CTA CUỐI TRANG ───────────────────────────────────────────────────────── */}
      <section className="bg-[#3b2d21] py-16! text-white md:py-24!">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl leading-tight text-white md:text-4xl">
              Nhận thông tin và bảng giá The Soleil Đà Nẵng
            </h2>
            <p className="mt-5 text-[15px] leading-[1.75] text-white/75">
              Để lại yêu cầu tư vấn, đội ngũ Ethereal Estate sẽ liên hệ và gửi
              thông tin dự án: vị trí, loại căn, tiến độ và chính sách bán hàng
              hiện hành.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/lien-he"
                className="inline-flex min-h-12 items-center justify-center rounded-sm bg-[#C9A45D] px-7 text-sm font-semibold uppercase tracking-wide text-[#2f2318] transition-colors hover:bg-[#E3C284] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Liên hệ tư vấn
              </Link>
              <Link
                href="/projects"
                className="inline-flex min-h-12 items-center justify-center rounded-sm border border-white/40 px-7 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Xem các dự án khác
              </Link>
            </div>
            <p className="mt-8 text-xs leading-relaxed text-white/55">
              Thông tin dự án được tổng hợp từ tài liệu của chủ đầu tư và có thể
              thay đổi theo công bố chính thức.
            </p>
          </div>
        </div>
      </section>

      {/* Một chuyển động duy nhất cho hero – tôn trọng prefers-reduced-motion */}
      <style>{`
        .soleil-hero-image {
          animation: soleil-hero-zoom 1600ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .soleil-hero-rise {
          animation: soleil-hero-rise 900ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes soleil-hero-zoom {
          from { transform: scale(1.06); }
          to { transform: scale(1); }
        }
        @keyframes soleil-hero-rise {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .soleil-hero-image,
          .soleil-hero-rise {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
