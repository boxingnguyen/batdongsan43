"use client";

import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Lock,
  ChevronDown,
} from "lucide-react";
import { projects } from "@/data/projects";

const heroSlides = [
  "/images/home/sym1.png",
  "/images/home/sym2.jpg",
  "/images/home/sym3.jpg",
  "/images/home/banner-1.jpg",
  "/images/home/banner-3.jpg",
  "/images/home/banner-4.jpg",
  "/images/home/banner-5.jpg",
  "/images/home/banner-6.jpg",
  "/images/home/banner-7.jpg",
  "/images/home/banner-8.jpg",
];

export function EtherealHomeClient() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById("latest-projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] antialiased">
      {/* Hero Section Carousel */}
      <section
        className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden py-0!"
        id="hero-carousel"
      >
        {/* Slides */}
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
            >
              <ImageWithSkeleton
                alt={`Bất Động Sản Cao Cấp ${idx + 1}`}
                src={slide}
                fill
                priority={idx === 0}
                className="object-cover"
                style={
                  idx === currentSlide
                    ? {
                      transform: `translateY(${scrollY * 0.15}px) scale(1.05)`,
                      transition: "transform 0.1s ease-out",
                    }
                    : undefined
                }
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-[#1A1A1A]/20 z-20" />
        </div>

        {/* Content */}
        <div className="relative z-30 w-full max-w-4xl px-5 md:px-0 text-center text-white">
          <h1
            className="text-[40px] md:text-[64px] font-light leading-[48px] md:leading-[72px] tracking-[0.05em] md:tracking-[0.08em] mb-4 drop-shadow-xl italic"
            style={{ fontFamily: "EB Garamond, serif" }}
          >
            Căn hộ cao cấp Đà Nẵng
          </h1>
          <p
            className="text-[22px] md:text-[30px] font-light leading-[30px] md:leading-[40px] tracking-[0.05em] mb-8 drop-shadow-xl italic opacity-95"
            style={{ fontFamily: "EB Garamond, serif" }}
          >
            Tinh túy, nâng tầm trải nghiệm.
          </p>
          <p className="font-hanken text-[18px] font-light leading-[28px] opacity-95 max-w-2xl mx-auto drop-shadow-md tracking-wide">
            Thức dậy với <span className="italic">bình minh tráng lệ</span> trên
            biển Mỹ Khê, tối về ngắm{" "}
            <span className="italic">hoàng hôn cùng pháo hoa</span> bên sông Hàn
            rực rỡ. Biến ban công của bạn thành{" "}
            <span className="italic font-semibold">tầm view triệu $</span> độc
            bản giữa lòng Đà Nẵng.
          </p>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-8 z-30">
          <div className="flex gap-4" id="carousel-indicators">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className="w-12 h-[2px] transition-colors"
                style={{
                  backgroundColor:
                    idx === currentSlide
                      ? "rgba(255, 255, 255, 0.8)"
                      : "rgba(255, 255, 255, 0.3)",
                }}
                aria-label={`Đến ảnh ${idx + 1}`}
              />
            ))}
          </div>
          <button
            onClick={scrollToProjects}
            className="flex flex-col items-center animate-bounce text-white/80 hover:text-white transition-colors"
          >
            <span className="font-hanken text-[12px] font-medium leading-[16px] tracking-[0.2em] uppercase mb-2">
              Cuộn Xuống
            </span>
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Latest Projects */}
      <section id="latest-projects" className="py-32 bg-[#f9f9f9]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-20">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <h2 className="font-serif text-[32px] font-medium leading-[40px] text-[#4a3829]">
              Dự Án Mới Nhất
            </h2>
            <div className="flex gap-4">
              <button
                type="button"
                className="w-12 h-12 rounded-full border border-[#E8E2D9] flex items-center justify-center text-[#4a3829] hover:bg-[#E8E2D9] transition-colors"
                aria-label="Trước"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="w-12 h-12 rounded-full border border-[#E8E2D9] flex items-center justify-center text-[#4a3829] hover:bg-[#E8E2D9] transition-colors"
                aria-label="Tiếp theo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group relative flex flex-col overflow-hidden rounded-[4px] bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <ImageWithSkeleton
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute right-3 top-3 rounded-sm bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#634F3F]">
                    {project.status}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h2 className="font-serif text-xl text-[#4a3829] transition-colors group-hover:text-[#634F3F]">
                    {/* Stretched link: whole card stays clickable, anchor text stays short */}
                    <Link
                      href={project.slug === "wyndham-soleil-danang" ? "https://thesoleil.vn" : `/projects/${project.slug}`}
                      target={project.slug === "wyndham-soleil-danang" ? "_blank" : undefined}
                      rel={project.slug === "wyndham-soleil-danang" ? "noopener noreferrer" : undefined}
                      className="after:absolute after:inset-0 after:content-['']"
                    >
                      {project.title}
                    </Link>
                  </h2>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#634F3F]/70">
                    {project.location}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#634F3F]/80 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-block border border-[#4a3829] text-[#4a3829] px-10 py-4 text-[14px] font-semibold leading-[20px] tracking-[0.05em] font-hanken hover:bg-[#4a3829] hover:text-white transition-all duration-300"
            >
              Xem tất cả dự án
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-32 bg-[#e5e2dd]/30">
        <div className="max-w-[1440px] mx-auto px-5 md:px-20 flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 w-full relative">
            <div className="aspect-[4/5] relative overflow-hidden rounded-lg">
              <ImageWithSkeleton
                alt="The Vision"
                src="/images/home/profile.jpg"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="lg:w-1/2 w-full space-y-8">
            <span className="text-[12px] font-medium leading-[16px] tracking-[0.3em] font-hanken text-[#8C7B6E] uppercase block">
              Câu chuyện của tôi:
            </span>
            <h2 className="font-serif text-[32px] font-medium leading-[40px] text-[#4a3829] leading-tight">
              Vượt trên bất động sản: Tôi đồng hành kiến tạo những giá trị
              trường tồn.
            </h2>
            <p className="text-[18px] font-normal leading-[28px] font-hanken text-[#4e453e] leading-relaxed">
              Tôi tin rằng bất động sản không đơn thuần là một giao dịch, mà là
              hành trình đồng hành cùng khách hàng tìm kiếm giá trị bền vững.
              Với nhiều năm kinh nghiệm trong lĩnh vực kinh doanh và đầu tư bất
              động sản, tôi luôn đặt sự minh bạch, uy tín và lợi ích của khách
              hàng làm kim chỉ nam trong mọi quyết định. Mỗi thành công của
              khách hàng chính là động lực để tôi và đội ngũ không ngừng hoàn
              thiện và phát triển.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <Check className="h-6 w-6 text-[#735c00] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-[14px] font-semibold leading-[20px] tracking-[0.05em] font-hanken text-[#4a3829]">
                    Tiếp Cận Đặc Quyền
                  </h3>
                  <p className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e]">
                    Danh sách bất động sản ngoài thị trường độc quyền tại những
                    vị trí đắt giá nhất.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Lock className="h-5 w-5 text-[#735c00] flex-shrink-0 mt-1 mx-0.5" />
                <div>
                  <h3 className="text-[14px] font-semibold leading-[20px] tracking-[0.05em] font-hanken text-[#4a3829]">
                    Tuyệt Đối Bảo Mật
                  </h3>
                  <p className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e]">
                    Xem nhà riêng tư và đàm phán bảo mật là tiêu chuẩn của chúng
                    tôi.
                  </p>
                </div>
              </div>
            </div>
            <Link
              href="/lien-he"
              className="inline-block mt-8 border border-[#4a3829] text-[#4a3829] px-10 py-4 text-[14px] font-semibold leading-[20px] tracking-[0.05em] font-hanken hover:bg-[#4a3829] hover:text-white transition-all duration-300"
            >
              LIÊN HỆ TƯ VẤN
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
