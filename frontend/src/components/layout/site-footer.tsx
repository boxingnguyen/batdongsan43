import Link from "next/link";

const navLinks = [
  { href: "/", label: "Trang Chủ" },
  { href: "/projects", label: "Dự Án" },
  { href: "/introduction", label: "Giới Thiệu" },
  { href: "/news", label: "Tin Tức" },
  { href: "/connection", label: "Liên Hệ" },
];

const projects = [
  { href: "/projects/s-light-tower", label: "S-Light Tower" },
  { href: "/projects/sun-fours-tower", label: "Sun FourS Tower" },
  { href: "/projects/symphony5", label: "Sun Symphony 5" },
  { href: "/projects/the-legend-danang", label: "The Legend Đà Nẵng" },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#2a1f16] text-white">
      <div className="mx-auto max-w-[1440px] px-5 md:px-20">

        {/* Main grid */}
        <div className="grid gap-12 py-16 md:grid-cols-12">

          {/* Brand col */}
          <div className="space-y-6 md:col-span-5">
            <div>
              <p className="font-serif text-3xl font-medium text-white">
                Ethereal Estate
              </p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
                Tư vấn bất động sản cao cấp tại Đà Nẵng — an cư, đầu tư, ngôi nhà thứ hai.
              </p>
            </div>

            {/* Agent */}
            <div className="border-l-2 border-[#C8A96E] pl-4">
              <p className="text-sm font-semibold text-white">
                (GDDA) Nguyễn Thị Nguyệt
              </p>
              <p className="mt-0.5 text-xs text-white/50">
                BĐS Duyên Hải · Đất Xanh Miền Bắc
              </p>
            </div>

            {/* Contact */}
            <div className="space-y-2 text-sm">
              <p>
                <a
                  href="tel:0345747138"
                  className="text-white/70 transition-colors hover:text-[#C8A96E]"
                >
                  0345 747 138
                </a>
                <span className="mx-2 text-white/30">·</span>
                <a
                  href="tel:0826768386"
                  className="text-white/70 transition-colors hover:text-[#C8A96E]"
                >
                  0826 768 386
                </a>
              </p>
              <p className="text-white/50">246 Đỗ Bá, Mỹ An, Đà Nẵng</p>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/nguyet.nguyen2111"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/50 transition-colors hover:border-[#C8A96E] hover:text-[#C8A96E]"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://zalo.me/0345747138"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zalo"
                className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/50 transition-colors hover:border-[#C8A96E] hover:text-[#C8A96E]"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.021c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.26 14.4l-2.95-.924c-.64-.203-.654-.64.136-.954l11.527-4.447c.537-.194 1.006.131.588.173z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav cols */}
          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-2">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A96E]">
                Trang
              </p>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A96E]">
                Dự Án
              </p>
              <ul className="space-y-3">
                {projects.map((p) => (
                  <li key={p.href}>
                    <Link
                      href={p.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-2 border-t border-white/10 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Ethereal Estate. Bảo lưu mọi quyền.
          </p>
          <p className="text-xs text-white/20">
            Bất động sản cao cấp · Đà Nẵng, Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
}
