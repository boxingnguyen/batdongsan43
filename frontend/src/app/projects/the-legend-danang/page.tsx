import Link from "next/link";
import { theLegendDanang } from "@/data/the-legend-danang";
import { LegendHero } from "@/components/projects/legend-hero";
import { LegendGallery } from "@/components/projects/legend-gallery";
import { LegendAbout } from "@/components/projects/legend-about";
import { LegendAmenities } from "@/components/projects/legend-amenities";
import ContactPopup from "@/components/ContactPopup/ContactPopup";

export const metadata = {
  title: "The Legend Đà Nẵng | Project",
  description: "Biểu tượng thượng lưu - Đỉnh cao sống sang, đầu tư vững",
};

export default function TheLegendDanangPage() {
  return (
    <main className="bg-[#F9F9F9]">
      <LegendHero
        title={theLegendDanang.title}
        tagline={theLegendDanang.tagline}
        subtitle={theLegendDanang.subtitle}
        location={theLegendDanang.location}
        status={theLegendDanang.status}
        heroImage={theLegendDanang.heroImage}
      />

      <LegendGallery gallery={theLegendDanang.gallery} />

      <LegendAbout
        overview={theLegendDanang.overview}
        stats={theLegendDanang.stats}
        highlights={theLegendDanang.highlights}
      />

      <LegendAmenities amenities={theLegendDanang.amenities} />

      {/* CTA Section */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-20 md:py-24">
        <div className="rounded-lg bg-[#07be8a]/10 p-12 text-center md:p-16">
          <h2 className="font-serif text-3xl text-[#4a3829] md:text-4xl">
            Sẵn Sàng Khám Phá The Legend?
          </h2>
          <p className="mt-4 text-[#4e453e]">
            Liên hệ với đội bán hàng chuyên nghiệp của chúng tôi để tìm hiểu thêm
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href={`tel:${theLegendDanang.agent.phone}`}
              className="inline-block rounded-sm bg-[#07be8a] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#07be8a]/90"
            >
              Gọi Ngay
            </a>
            <a
              href={`mailto:${theLegendDanang.agent.email}`}
              className="inline-block rounded-sm border border-[#07be8a] px-8 py-3 font-semibold text-[#07be8a] transition-colors hover:bg-[#07be8a]/5"
            >
              Gửi Email
            </a>
          </div>
        </div>
      </section>

      {/* Back Link */}
      <section className="mx-auto max-w-[1440px] px-5 py-8 md:px-20">
        <Link
          href="/"
          className="text-sm font-semibold tracking-wide text-[#4a3829]/70 transition-colors hover:text-[#4a3829]"
        >
          &larr; Quay lại Trang Chủ
        </Link>
      </section>

      <ContactPopup />
    </main>
  );
}
