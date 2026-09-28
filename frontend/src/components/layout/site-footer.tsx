import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { FooterRegisterForm } from "@/components/ethereal/footer-register-form";
import { SITE_INFO } from "@/config/site-seo";
import { ShareButtons } from "@/components/shared/ShareButtons";

const FOOTER_LINK_CLASS =
  "text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e] hover:text-[#4a3829] transition-colors";

const PROJECT_LINKS = [
  { href: "/projects", label: "Tất cả dự án" },
  { href: "/projects/s-light-tower", label: "S-Light Tower" },
  { href: "/projects/sun-fours-tower", label: "Sun FourS Tower" },
  { href: "/projects/camellia", label: "The Camellia Sơn Trà" },
  { href: "/projects/the-legend-danang", label: "The Legend Đà Nẵng" },
  { href: "/projects/symphony5", label: "Symphony Residence 5" },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#eeeeee] py-16">
      <div className="max-w-[1440px] mx-auto px-5 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
          {/* Brand & Contact */}
          <div className="md:col-span-4 space-y-8">
            <div className="space-y-4">
              <h2 className="font-serif text-[24px] font-medium leading-[32px] text-[#4a3829]">
                {SITE_INFO.name}
              </h2>
              <p className="text-[16px] font-normal leading-[24px] font-hanken text-[#4e453e] max-w-xs">
                Không gian sống tinh tế cho cuộc sống đẳng cấp. Mạng lưới toàn
                cầu, thấu hiểu địa phương.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[14px] font-semibold leading-[20px] tracking-[0.05em] font-hanken text-[#4a3829] uppercase tracking-widest">
                Liên Hệ
              </h4>
              <div className="space-y-2">
                <p className="text-[16px] font-semibold leading-[24px] font-hanken text-[#4a3829] font-bold">
                  {SITE_INFO.telephoneDisplay} - {SITE_INFO.contactPerson}
                </p>
                <p className="text-[14px] font-semibold text-[#4a3829] font-bold">
                  BĐS Duyên Hải - Đất Xanh Miền Bắc{" "}
                </p>
                <p className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e]">
                  {SITE_INFO.address.street}, {SITE_INFO.address.district},
                  <br />
                  {SITE_INFO.address.city}, {SITE_INFO.address.country === "VN" ? "Việt Nam" : SITE_INFO.address.country}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              {SITE_INFO.social.facebook && (
                <a
                  aria-label="Facebook"
                  className="w-10 h-10 border border-[#d2c4bb]/30 flex items-center justify-center text-[#4e453e] hover:bg-[#4a3829] hover:text-white transition-all duration-300"
                  href={SITE_INFO.social.facebook}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {SITE_INFO.social.instagram && (
                <a
                  aria-label="Instagram"
                  className="w-10 h-10 border border-[#d2c4bb]/30 flex items-center justify-center text-[#4e453e] hover:bg-[#4a3829] hover:text-white transition-all duration-300"
                  href={SITE_INFO.social.instagram}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {SITE_INFO.social.youtube && (
                <a
                  aria-label="YouTube"
                  className="w-10 h-10 border border-[#d2c4bb]/30 flex items-center justify-center text-[#4e453e] hover:bg-[#4a3829] hover:text-white transition-all duration-300"
                  href={SITE_INFO.social.youtube}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              )}
              {SITE_INFO.social.linkedin && (
                <a
                  aria-label="LinkedIn"
                  className="w-10 h-10 border border-[#d2c4bb]/30 flex items-center justify-center text-[#4e453e] hover:bg-[#4a3829] hover:text-white transition-all duration-300"
                  href={SITE_INFO.social.linkedin}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {SITE_INFO.social.twitter && (
                <a
                  aria-label="X (Twitter)"
                  className="w-10 h-10 border border-[#d2c4bb]/30 flex items-center justify-center text-[#4e453e] hover:bg-[#4a3829] hover:text-white transition-all duration-300"
                  href={SITE_INFO.social.twitter}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.685-5.829 6.685h-3.307l7.73-8.835L2.45 2.25h6.68l4.764 6.312 5.35-6.312zM17.002 18.807h1.844L6.983 4.126H5.025l11.977 14.681z" />
                  </svg>
                </a>
              )}
              {SITE_INFO.social.tiktok && (
                <a
                  aria-label="TikTok"
                  className="w-10 h-10 border border-[#d2c4bb]/30 flex items-center justify-center text-[#4e453e] hover:bg-[#4a3829] hover:text-white transition-all duration-300"
                  href={SITE_INFO.social.tiktok}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-[14px] font-semibold leading-[20px] tracking-[0.05em] font-hanken text-[#4a3829] uppercase tracking-widest">
                Dự Án
              </h4>
              <ul className="space-y-3">
                {PROJECT_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link className={FOOTER_LINK_CLASS} href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[14px] font-semibold leading-[20px] tracking-[0.05em] font-hanken text-[#4a3829] uppercase tracking-widest">
                Tư Vấn
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link className={FOOTER_LINK_CLASS} href="/lien-he">
                    Liên hệ tư vấn
                  </Link>
                </li>
                <li>
                  <a className={FOOTER_LINK_CLASS} href={`tel:${SITE_INFO.telephone}`}>
                    Gọi {SITE_INFO.telephoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    className={FOOTER_LINK_CLASS}
                    href={SITE_INFO.zalo}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    Chat Zalo
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-[14px] font-semibold leading-[20px] tracking-[0.05em] font-hanken text-[#4a3829] uppercase tracking-widest">
              Đăng Ký Nhận Tư Vấn
            </h4>
            <p className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e]">
              Tham gia mạng lưới của chúng tôi để nhận những thông tin thị
              trường độc quyền và các cơ hội đầu tư kín.
            </p>
            <FooterRegisterForm />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#d2c4bb]/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e]">
            © {new Date().getFullYear()} {SITE_INFO.name}. Bảo lưu mọi quyền. Riêng
            tư &amp; Bảo mật.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <ShareButtons />
            <span className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e] italic">
              Thành viên của Mạng lưới Khách sạn &amp; Khu dân cư hàng đầu thế
              giới
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
