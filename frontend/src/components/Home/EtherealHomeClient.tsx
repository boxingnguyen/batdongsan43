"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Lock,
  Instagram,
  ChevronDown,
  Facebook,
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
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setName("");
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
              className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
                idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                alt={`Luxury Estate ${idx + 1}`}
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
          <h1 className="font-serif text-[40px] md:text-[64px] font-normal leading-[48px] md:leading-[72px] tracking-[-0.01em] md:tracking-[-0.02em] mb-8 drop-shadow-lg">
            Find Your Sanctuary
          </h1>
          <p className="font-hanken text-[18px] font-normal leading-[28px] opacity-90 max-w-2xl mx-auto drop-shadow-md">
            Curating the world&apos;s most exceptional architectural
            masterpieces.
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
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <button
            onClick={scrollToProjects}
            className="flex flex-col items-center animate-bounce text-white/80 hover:text-white transition-colors"
          >
            <span className="font-hanken text-[12px] font-medium leading-[16px] tracking-[0.2em] uppercase mb-2">
              Scroll
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
              Latest Projects
            </h2>
            <div className="flex gap-4">
              <button
                type="button"
                className="w-12 h-12 rounded-full border border-[#E8E2D9] flex items-center justify-center text-[#4a3829] hover:bg-[#E8E2D9] transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="w-12 h-12 rounded-full border border-[#E8E2D9] flex items-center justify-center text-[#4a3829] hover:bg-[#E8E2D9] transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              const isSoleil = project.slug === "wyndham-soleil-danang";
              return (
                <Link
                  key={project.id}
                  href={
                    isSoleil
                      ? "https://thesoleil.vn/"
                      : `/projects/${project.slug}`
                  }
                  target={isSoleil ? "_blank" : undefined}
                  rel={isSoleil ? "noopener noreferrer" : undefined}
                  className="group flex flex-col overflow-hidden rounded-[4px] bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
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
                      {project.title}
                    </h2>
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#634F3F]/70">
                      {project.location}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[#634F3F]/80 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-32 bg-[#e5e2dd]/30">
        <div className="max-w-[1440px] mx-auto px-5 md:px-20 flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 w-full relative">
            <div className="aspect-[4/5] relative overflow-hidden rounded-lg">
              <Image
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
                  <h4 className="text-[14px] font-semibold leading-[20px] tracking-[0.05em] font-hanken text-[#4a3829]">
                    Unrivaled Access
                  </h4>
                  <p className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e]">
                    Exclusive off-market listings in the world&apos;s most
                    coveted zip codes.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Lock className="h-5 w-5 text-[#735c00] flex-shrink-0 mt-1 mx-0.5" />
                <div>
                  <h4 className="text-[14px] font-semibold leading-[20px] tracking-[0.05em] font-hanken text-[#4a3829]">
                    Absolute Discretion
                  </h4>
                  <p className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e]">
                    Private viewings and confidential negotiations are our
                    standard.
                  </p>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="mt-8 border border-[#4a3829] text-[#4a3829] px-10 py-4 text-[14px] font-semibold leading-[20px] tracking-[0.05em] font-hanken hover:bg-[#4a3829] hover:text-white transition-all duration-300"
            >
              OUR HERITAGE
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#eeeeee] py-16">
        <div className="max-w-[1440px] mx-auto px-5 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
            {/* Brand & Contact */}
            <div className="md:col-span-4 space-y-8">
              <div className="space-y-4">
                <h2 className="font-serif text-[24px] font-medium leading-[32px] text-[#4a3829]">
                  Ethereal Estate
                </h2>
                <p className="text-[16px] font-normal leading-[24px] font-hanken text-[#4e453e] max-w-xs">
                  Exceptional properties for an exceptional life. Worldwide
                  reach, local expertise.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-[14px] font-semibold leading-[20px] tracking-[0.05em] font-hanken text-[#4a3829] uppercase tracking-widest">
                  Contact Us
                </h4>
                <div className="space-y-2">
                  <p className="text-[16px] font-semibold leading-[24px] font-hanken text-[#4a3829] font-bold">
                    0345 747 138 - (GDDA) Nguyễn Thị Nguyệt
                  </p>
                  <p className="text-[14px] font-semibold text-[#4a3829] font-bold">
                    BĐS Duyên Hải - Đất Xanh Miền Bắc{" "}
                  </p>
                  <p className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e]">
                    246 Đỗ Bá, Phường Mỹ An,
                    <br />
                    Đà Nẵng, Việt Nam
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <a
                  aria-label="Facebook"
                  className="w-10 h-10 border border-[#d2c4bb]/30 flex items-center justify-center text-[#4e453e] hover:bg-[#4a3829] hover:text-white transition-all duration-300"
                  href="https://www.facebook.com/nguyet.nguyen2111"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  aria-label="Instagram"
                  className="w-10 h-10 border border-[#d2c4bb]/30 flex items-center justify-center text-[#4e453e] hover:bg-[#4a3829] hover:text-white transition-all duration-300"
                  href="#"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  aria-label="Tiktok"
                  className="w-10 h-10 border border-[#d2c4bb]/30 flex items-center justify-center text-[#4e453e] hover:bg-[#4a3829] hover:text-white transition-all duration-300"
                  href="#"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Links Grid */}
            <div className="md:col-span-4 grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="text-[14px] font-semibold leading-[20px] tracking-[0.05em] font-hanken text-[#4a3829] uppercase tracking-widest">
                  Portfolio
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e] hover:text-[#4a3829] transition-colors"
                      href="#"
                    >
                      Luxury Portfolio
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e] hover:text-[#4a3829] transition-colors"
                      href="#"
                    >
                      Global Networks
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e] hover:text-[#4a3829] transition-colors"
                      href="#"
                    >
                      New Developments
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e] hover:text-[#4a3829] transition-colors"
                      href="#"
                    >
                      Rental Collection
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="text-[14px] font-semibold leading-[20px] tracking-[0.05em] font-hanken text-[#4a3829] uppercase tracking-widest">
                  Inquiries
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e] hover:text-[#4a3829] transition-colors"
                      href="#"
                    >
                      Contact Info
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e] hover:text-[#4a3829] transition-colors"
                      href="#"
                    >
                      Office Locations
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e] hover:text-[#4a3829] transition-colors"
                      href="#"
                    >
                      Career Opportunities
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e] hover:text-[#4a3829] transition-colors"
                      href="#"
                    >
                      Agent Portal
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Newsletter Form */}
            <div className="md:col-span-4 space-y-6">
              <h4 className="text-[14px] font-semibold leading-[20px] tracking-[0.05em] font-hanken text-[#4a3829] uppercase tracking-widest">
                Register for Expert Advice
              </h4>
              <p className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e]">
                Join our inner circle for exclusive market insights and
                off-market opportunities.
              </p>
              {subscribed ? (
                <div className="bg-white p-4 border border-[#d2c4bb]/30 text-sm font-semibold tracking-wider font-hanken text-[#4a3829]">
                  Thank you for subscribing!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="space-y-2">
                    <input
                      className="w-full bg-[#f9f9f9] border border-[#d2c4bb]/30 px-4 py-3 text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken focus:ring-1 focus:ring-[#4a3829] focus:border-[#4a3829] outline-none transition-all"
                      placeholder="Full Name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      className="w-full bg-[#f9f9f9] border border-[#d2c4bb]/30 px-4 py-3 text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken focus:ring-1 focus:ring-[#4a3829] focus:border-[#4a3829] outline-none transition-all"
                      placeholder="Email Address"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button
                    className="w-full bg-[#4a3829] hover:opacity-90 transition-opacity text-white py-3 text-[14px] font-semibold leading-[20px] tracking-[0.05em] font-hanken"
                    type="submit"
                  >
                    SUBSCRIBE
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-[#d2c4bb]/20 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e]">
              © 2024 Ethereal Estate. All Rights Reserved. Private &amp;
              Confidential.
            </p>
            <div className="flex gap-6">
              <a
                className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e] hover:text-[#4a3829]"
                href="#"
              >
                Privacy Policy
              </a>
              <span className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e] italic">
                Member of Leading Hotels &amp; Residences of the World
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
