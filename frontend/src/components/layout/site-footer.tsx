import Link from "next/link";
import { MaterialIcon } from "@/components/ui/material-icon";
import { FooterRegisterForm } from "@/components/ethereal/footer-register-form";

const portfolioLinks = [
  { href: "/properties", label: "Luxury Portfolio" },
  { href: "/properties", label: "Global Networks" },
  { href: "/properties", label: "Market Trends" },
];

const companyLinks = [
  { href: "#", label: "Office Locations" },
  { href: "#", label: "Contact Info" },
  { href: "#", label: "Privacy Policy" },
];

const socialLinks = [
  { href: "#", icon: "photo_camera", label: "Instagram" },
  { href: "#", icon: "work", label: "LinkedIn" },
  { href: "#", icon: "close", label: "X" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-[#eeeeee]">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="space-y-8 md:col-span-5">
            <div>
              <p className="font-serif text-2xl text-[#4a3829]">
                Ethereal Estate
              </p>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-[#4e453e]">
                Curating the world&apos;s most exceptional living spaces for
                those who demand architectural integrity and absolute
                discretion.
              </p>
            </div>
            <div className="space-y-4">
              <h5 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4a3829]">
                Register for Expert Advice
              </h5>
              <FooterRegisterForm />
            </div>
          </div>

          <div className="md:col-span-2">
            <h5 className="mb-6 text-sm font-semibold text-[#4a3829]">
              Portfolio
            </h5>
            <ul className="space-y-4">
              {portfolioLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-[#4e453e] underline decoration-[#4e453e]/30 underline-offset-4 transition-colors hover:text-[#4a3829]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h5 className="mb-6 text-sm font-semibold text-[#4a3829]">
              Company
            </h5>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-[#4e453e] underline decoration-[#4e453e]/30 underline-offset-4 transition-colors hover:text-[#4a3829]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8 md:col-span-3">
            <div>
              <h5 className="mb-6 text-sm font-semibold text-[#4a3829]">
                Contact Us
              </h5>
              <div className="space-y-2 text-xs text-[#4e453e]">
                <p className="flex items-center gap-2">
                  <MaterialIcon
                    name="call"
                    className="text-lg text-[#8C7B6E]"
                  />
                  <span>
                    +84 345 747 138
                    <br />
                    +84 939 963 769
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <MaterialIcon
                    name="location_on"
                    className="text-lg text-[#8C7B6E]"
                  />
                  <span>
                    246 Đỗ Bá,
                    <br />
                    phường Mỹ An, Đà Nẵng 50510
                  </span>
                </p>
              </div>
            </div>
            <div>
              <h5 className="mb-4 text-sm font-semibold text-[#4a3829]">
                Follow Us
              </h5>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="text-[#8C7B6E] transition-colors hover:text-[#4a3829]"
                  >
                    <MaterialIcon name={social.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-[#8C7B6E]/20 pt-8">
          <p className="text-center text-xs text-[#4e453e]">
            © {new Date().getFullYear()} Ethereal Estate. All Rights Reserved.
            Private &amp; Confidential.
          </p>
        </div>
      </div>
    </footer>
  );
}
