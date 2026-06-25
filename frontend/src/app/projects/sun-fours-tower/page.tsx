"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Umbrella, ShoppingCart, Leaf, Plane, Building2, Castle, Hotel, Hospital, Waves, Dumbbell, ShoppingBag, FerrisWheel, Trees, Lock, SquareParking, Sunrise } from "lucide-react";
import { HideSiteHeader } from "@/components/projects/HideSiteHeader";
import { SITE_NAME } from "@/config/site";
import { ProjectScrollPopup } from "@/components/projects/ProjectScrollPopup";



const navLinks = [
  { href: "#tong-quan", label: "Tổng Quan" },
  { href: "#can-ho", label: "Căn Hộ" },
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

export default function SunFoursTowerPage() {
  return (
    <main className="bg-[#f9f9f9]">
      <HideSiteHeader />
      <SunFoursNav />

      {/* HERO */}
      <section className="relative flex min-h-[90vh] items-end bg-[#1a2033] py-0">
        <Image
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80"
          alt="Sun FourS Tower Đà Nẵng"
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-20 md:px-20">
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
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <a
              href="#tong-quan"
              className="inline-block rounded-sm border border-white/70 px-8 py-3 font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
            >
              Tìm Hiểu Thêm
            </a>
          </div>
        </div>
      </section>

      {/* TỔNG QUAN */}
      <section id="tong-quan" className="scroll-mt-16 pb-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#634F3F]/70">
            Tổng Quan Dự Án
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#4a3829] md:text-4xl">
            Sun FourS Tower Đà Nẵng
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#4e453e]/80">
            Lần đầu tiên tại Đà Nẵng — căn hộ kính cong với tầm view panorama
            toàn cảnh. Nằm trong khu đô thị sinh thái Sun Riverpolis, Sun FourS
            Tower là tổ hợp 4 tháp căn hộ cao tầng đầu tiên tại phía Nam thành
            phố.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[
              { label: "Chủ đầu tư", value: "Sun Group (Sun Property)" },
              { label: "Diện tích đất", value: "8.165 m²" },
              { label: "Số tháp", value: "4 tháp" },
              { label: "Số tầng", value: "20 tầng + 2 hầm" },
              { label: "Tổng căn hộ", value: "1.281 căn" },
              { label: "Khoảng cách tháp", value: "33m" },
              { label: "Mặt tiền", value: "Nguyễn Phước Lan (33m, 6 làn)" },
              { label: "Bãi biển", value: "5 phút (~1,5km)" },
              { label: "Loại sở hữu", value: "Lâu dài" },
              { label: "Khởi công", value: "Tháng 3/2026" },
              { label: "Bàn giao", value: "Quý 1/2028" },
              { label: "Giá từ", value: "1,5 tỷ đồng" },
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
                area: "33–35 m²",
                desc: "Tối ưu đầu tư cho thuê, layout thông minh",
              },
              {
                type: "1 Phòng Ngủ",
                area: "45–54 m²",
                desc: "Không gian sống tiện nghi, phù hợp cặp đôi",
              },
              {
                type: "2 Phòng Ngủ",
                area: "60–73 m²",
                desc: "Lý tưởng cho gia đình nhỏ",
              },
              {
                type: "3 Phòng Ngủ",
                area: "84–104 m²",
                desc: "Không gian rộng rãi cho gia đình",
              },
              {
                type: "Căn Hộ Sân Vườn",
                area: "Đặc biệt",
                desc: "Tầng thấp, sân vườn riêng, view xanh mát",
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
            Tọa lạc tại đường Nguyễn Phước Lan — đại lộ 33m 6 làn xe — trung tâm
            khu Nam Đà Nẵng. Bao quanh bởi các sông Cẩm Lệ, Cổ Cò và Sông Hàn,
            kết nối thuận tiện đến các điểm đến quan trọng.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Umbrella,
                title: "Bãi Biển",
                detail: "5 phút · ~1,5km đến Mỹ Khê",
              },
              { icon: ShoppingCart, title: "AEON MALL", detail: "10 phút · ~3km" },
              {
                icon: Leaf,
                title: "Công Viên Sinh Thái",
                detail: "3 phút · ~700m · 50ha",
              },
              {
                icon: Plane,
                title: "Sân Bay Quốc Tế",
                detail: "15 phút · Đà Nẵng",
              },
              {
                icon: Building2,
                title: "Trung Tâm Đà Nẵng",
                detail: "10 phút lái xe",
              },
              {
                icon: Castle,
                title: "Phố Cổ Hội An",
                detail: "25 phút · theo QL1A",
              },
              {
                icon: Hotel,
                title: "Resort 5 Sao",
                detail: "Crowne Plaza, Hyatt Regency gần kề",
              },
              {
                icon: Hospital,
                title: "Tiện Ích Xã Hội",
                detail: "Trường học, bệnh viện lân cận",
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
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Waves,
                title: "Hồ Bơi 4 Mùa",
                desc: "Bơi lội quanh năm, view mở thoáng đãng tại tầng 2",
              },
              {
                icon: Dumbbell,
                title: "Gym · Spa · Yoga",
                desc: "Khu thể thao và chăm sóc sức khỏe tiêu chuẩn 5 sao",
              },
              {
                icon: ShoppingBag,
                title: "Shophouse Thương Mại",
                desc: "Tầng trệt sôi động với chuỗi tiện ích mua sắm, ẩm thực",
              },
              {
                icon: FerrisWheel,
                title: "Khu Vui Chơi Trẻ Em",
                desc: "Không gian an toàn, sáng tạo cho thiếu nhi",
              },
              {
                icon: Trees,
                title: "Sân Vườn Nội Khu",
                desc: "Cảnh quan xanh mát, không gian thư giãn cộng đồng",
              },
              {
                icon: Lock,
                title: "An Ninh 24/7",
                desc: "Hệ thống camera và bảo vệ chuyên nghiệp",
              },
              {
                icon: SquareParking,
                title: "Hầm Đỗ Xe",
                desc: "2 tầng hầm rộng rãi cho cư dân",
              },
              {
                icon: Sunrise,
                title: "Kính Cong Panorama",
                desc: "Lần đầu tiên tại Đà Nẵng — tầm view 360° vượt trội",
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


      <ProjectScrollPopup projectName="Sun FourS Tower" accent="#E3C284" />
    </main>
  );
}
