import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { FooterRegisterForm } from "@/components/ethereal/footer-register-form";

export function SiteFooter() {
  return (
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
                Không gian sống tinh tế cho cuộc sống đẳng cấp. Mạng lưới toàn cầu, thấu hiểu địa phương.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[14px] font-semibold leading-[20px] tracking-[0.05em] font-hanken text-[#4a3829] uppercase tracking-widest">
                Liên Hệ
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
                Danh Mục
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e] hover:text-[#4a3829] transition-colors"
                    href="#"
                  >
                    Bộ Sưu Tập Hạng Sang
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e] hover:text-[#4a3829] transition-colors"
                    href="#"
                  >
                    Mạng Lưới Toàn Cầu
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e] hover:text-[#4a3829] transition-colors"
                    href="#"
                  >
                    Dự Án Mới
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e] hover:text-[#4a3829] transition-colors"
                    href="#"
                  >
                    Bộ Sưu Tập Cho Thuê
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[14px] font-semibold leading-[20px] tracking-[0.05em] font-hanken text-[#4a3829] uppercase tracking-widest">
                Tư Vấn
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e] hover:text-[#4a3829] transition-colors"
                    href="#"
                  >
                    Thông Tin Liên Hệ
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e] hover:text-[#4a3829] transition-colors"
                    href="#"
                  >
                    Hệ Thống Văn Phòng
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e] hover:text-[#4a3829] transition-colors"
                    href="#"
                  >
                    Cơ Hội Nghề Nghiệp
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e] hover:text-[#4a3829] transition-colors"
                    href="#"
                  >
                    Cổng Thông Tin Đại Lý
                  </Link>
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
              Tham gia mạng lưới của chúng tôi để nhận những thông tin thị trường độc quyền và các cơ hội đầu tư kín.
            </p>
            <FooterRegisterForm />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#d2c4bb]/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e]">
            © {new Date().getFullYear()} Ethereal Estate. Bảo lưu mọi quyền. Riêng tư &amp; Bảo mật.
          </p>
          <div className="flex gap-6">
            <Link
              className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e] hover:text-[#4a3829]"
              href="#"
            >
              Chính sách bảo mật
            </Link>
            <span className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e] italic">
              Thành viên của Mạng lưới Khách sạn &amp; Khu dân cư hàng đầu thế giới
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
