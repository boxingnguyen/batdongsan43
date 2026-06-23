import Link from "next/link";

const navLinks = [
  { href: "/", label: "Trang Chủ" },
  { href: "/projects", label: "Dự Án" },
  { href: "/introduction", label: "Giới Thiệu" },
  { href: "/news", label: "Tin Tức" },
  { href: "/connection", label: "Liên Hệ" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#d2c4bb]/40 bg-[#f9f9f9]">
      <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">

          {/* Brand + contact */}
          <div className="space-y-4">
            <p className="font-serif text-xl text-[#4a3829]">Ethereal Estate</p>
            <p className="max-w-xs text-sm leading-relaxed text-[#4e453e]/70">
              Tư vấn bất động sản cao cấp tại Đà Nẵng — an cư, đầu tư, ngôi nhà thứ hai.
            </p>
            <div className="space-y-1 text-sm text-[#4e453e]/80">
              <p>
                <a href="tel:0345747138" className="transition-colors hover:text-[#4a3829]">
                  0345 747 138
                </a>
                {" · "}
                <a href="tel:0826768386" className="transition-colors hover:text-[#4a3829]">
                  0826 768 386
                </a>
              </p>
              <p>246 Đỗ Bá, Mỹ An, Đà Nẵng</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#4e453e]/70 transition-colors hover:text-[#4a3829]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-[#d2c4bb]/40 pt-6">
          <p className="text-xs text-[#4e453e]/50">
            © {new Date().getFullYear()} Ethereal Estate. Bảo lưu mọi quyền.
          </p>
        </div>
      </div>
    </footer>
  );
}
