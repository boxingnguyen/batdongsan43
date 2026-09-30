import type { Metadata } from "next";
import Link from "next/link";
import { MAIN_PAGES, PROJECT_PAGES } from "@/config/site-pages";
import { SITE_NAME } from "@/config/site";

export const metadata: Metadata = {
  title: `Sơ Đồ Trang | ${SITE_NAME}`,
  description:
    "Sơ đồ trang website căn hộ cao cấp Đà Nẵng: danh sách dự án S-Light Tower, Sun FourS Tower, The Camellia, The Legend, Symphony Residence và trang liên hệ tư vấn.",
  alternates: { canonical: "/so-do-trang" },
};

const LINK_CLASS =
  "text-lg text-[#4e453e] hover:text-[#4a3829] underline-offset-4 hover:underline dark:text-[#d2c4bb] dark:hover:text-[#faddc8]";

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black pt-24 pb-20">
      <div className="mx-auto max-w-2xl px-5 md:px-20">
        <h1 className="text-4xl md:text-5xl font-serif font-medium italic text-[#4a3829] dark:text-[#faddc8] mb-12">
          Sơ đồ trang
        </h1>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-[#4a3829] dark:text-[#faddc8] mb-4">
            Trang chính
          </h2>
          <ul className="space-y-3">
            {MAIN_PAGES.map((page) => (
              <li key={page.path}>
                <Link className={LINK_CLASS} href={page.path}>
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#4a3829] dark:text-[#faddc8] mb-4">
            Dự án căn hộ Đà Nẵng
          </h2>
          <ul className="space-y-3">
            {PROJECT_PAGES.map((page) => (
              <li key={page.path}>
                <Link className={LINK_CLASS} href={page.path}>
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
