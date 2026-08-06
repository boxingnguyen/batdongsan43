import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Umbrella, Leaf, Plane, Building2, Castle, Hotel,
  Waves, Dumbbell, ShoppingBag, FerrisWheel, Trees,
  SquareParking, Sunrise
} from "lucide-react";
import { buildMetadata, buildJsonLd, buildBreadcrumbJsonLd, buildProjectBreadcrumbItems } from "@/lib/seo";
import { SunFoursTowerClient, VrTour } from "./SunFoursClient";
import { ProjectBottomContent } from "@/components/projects/ProjectBottomContent";
import { getSEO } from "@/config/projects-seo";

const SUN_FOURS_TOWER_SEO_CONFIG = getSEO("sun-fours-tower")

export const metadata: Metadata = buildMetadata(SUN_FOURS_TOWER_SEO_CONFIG);

export default function SunFoursTowerPage() {
  const sunFoursTowerApartmentComplexJsonLd = buildJsonLd(SUN_FOURS_TOWER_SEO_CONFIG);
  const sunFoursTowerBreadcrumbJsonLd = buildBreadcrumbJsonLd(
    buildProjectBreadcrumbItems(SUN_FOURS_TOWER_SEO_CONFIG)
  );
  const sunFoursTowerFaqItems = SUN_FOURS_TOWER_SEO_CONFIG.faq ?? [];
  return (
    <main className="bg-[#f9f9f9]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sunFoursTowerApartmentComplexJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sunFoursTowerBreadcrumbJsonLd }} />
      <SunFoursTowerClient />

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
              alt="Hệ thống tiện ích nội khu đẳng cấp tại căn hộ Sun FourS Tower Đà Nẵng"
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
                    className={`mt-1 h-4 w-4 flex-shrink-0 rounded-full border-2 ${step.done
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

      <ProjectBottomContent 
        slug="sun-fours-tower" 
        accentColor="#E3C284"
        bgSeo="bg-white"
        bgRelated="bg-[#f9f9f9]"
        borderColor="border-[#E8E2D9]"
      />

    </main>
  );
}
