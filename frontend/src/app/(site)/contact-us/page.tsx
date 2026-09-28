import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "contact" });
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.danangluxuryhomes.vn";
  const localeUrl =
    locale === "vi"
      ? `${baseUrl}/contact-us`
      : `${baseUrl}/${locale}/contact-us`;

  return {
    title: t("title"),
    description: `Contact Căn hộ cao cấp Đà Nẵng. Hotline: ${t("info.hotline1_value")}, ${t("info.hotline2_value")}. Email: ${t("info.email_value")}. Address: ${t("info.address_value")}`,
    alternates: {
      canonical: localeUrl,
    },
    openGraph: {
      title: t("title"),
      description: `Contact Căn hộ cao cấp Đà Nẵng for inquiries about luxury apartments`,
      url: localeUrl,
      images: [
        {
          url: `${baseUrl}/images/home/cover-image.jpg`,
          width: 800,
          height: 454,
          alt: t("title"),
        },
      ],
    },
  };
}

import { SITE_INFO } from "@/config/site-seo";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F8F7F3] pt-24 pb-16">
      <div className="container mx-auto max-w-[1440px] px-5 md:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A45D] mb-4">
            Liên Hệ Với Chúng Tôi
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#16384C] mb-6">
            Ethereal Estate
          </h1>
          <p className="text-base text-[#4e453e] max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng hỗ trợ quý khách hàng với những thông tin
            bất động sản hạng sang, tư vấn dự án cao cấp và cung cấp giải pháp
            đầu tư chuyên nghiệp nhất tại Đà Nẵng.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 md:p-12 shadow-sm border border-[#E8E5DF]">
          {/* Thông tin liên hệ */}
          <div className="space-y-10">
            <div>
              <h2 className="font-serif text-2xl text-[#16384C] mb-8">
                Thông Tin Liên Hệ
              </h2>
              <div className="space-y-6">
                {/* Địa chỉ */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#F8F7F3] flex items-center justify-center rounded-full text-[#C9A45D]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold tracking-wider uppercase text-[#16384C] mb-2">
                      Văn Phòng Trực Tiếp
                    </h3>
                    <p className="text-[#4e453e] leading-relaxed">
                      246 Đỗ Bá, Phường Mỹ An,
                      <br />
                      Quận Ngũ Hành Sơn, Đà Nẵng, Việt Nam
                    </p>
                  </div>
                </div>

                {/* SĐT */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#F8F7F3] flex items-center justify-center rounded-full text-[#C9A45D]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold tracking-wider uppercase text-[#16384C] mb-2">
                      Đường Dây Nóng
                    </h3>
                    <p className="text-[#4e453e] font-medium text-lg">
                      {SITE_INFO.telephoneDisplay}
                    </p>
                    <p className="text-[#4e453e] text-sm">
                      {SITE_INFO.contactPerson}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#F8F7F3] flex items-center justify-center rounded-full text-[#C9A45D]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold tracking-wider uppercase text-[#16384C] mb-2">
                      Email Hỗ Trợ
                    </h3>
                    <a
                      href={`mailto:${SITE_INFO.email}`}
                      className="text-[#4e453e] hover:text-[#C9A45D] transition-colors"
                    >
                      {SITE_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Giờ làm việc */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#F8F7F3] flex items-center justify-center rounded-full text-[#C9A45D]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold tracking-wider uppercase text-[#16384C] mb-2">
                      Giờ Mở Cửa
                    </h3>
                    <p className="text-[#4e453e]">
                      Thứ 2 - Chủ Nhật: {SITE_INFO.openingHours.opens} -{" "}
                      {SITE_INFO.openingHours.closes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bản đồ Google Maps */}
          <div className="w-full h-[400px] lg:h-full min-h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.3013375831492!2d108.23640487459969!3d16.04984523995764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314217a0e394a7a9%3A0x61bc201287c716b!2zxJDhuqV0IFhhbmggRHV5w6puIEjhuqNp!5e0!3m2!1sen!2s!4v1785985337629!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[30%] contrast-[1.1] rounded-sm"
              title="Bản đồ Ethereal Estate - Căn hộ cao cấp Đà Nẵng"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}
