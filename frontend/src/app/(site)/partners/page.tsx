"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Playfair_Display } from 'next/font/google';
import AnimateInView from "@/components/shared/AnimateInView";

// Khởi tạo font cho tiêu đề lớn
const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  weight: ['700'],
});

const PARTNERS = [
  {
    logo: "/images/home/aedas-logo.png",
    logoWidth: 167,
    logoHeight: 167,
    coverImage: "/images/home/cover-aedas.png",
    title: "partners-title-1",
    description: "partners-description-1",
  },
  {
    logo: "/images/home/wyndham-logo.png",
    logoWidth: 1024,
    logoHeight: 148,
    coverImage: "/images/home/cover-wyndham.jpg",
    title: "partners-title-2",
    description: "partners-description-2",
  },
  {
    logo: "/images/home/artelia-logo.png",
    logoWidth: 709,
    logoHeight: 298,
    coverImage: "/images/home/cover-artelia.jpg",
    title: "partners-title-3",
    description: "partners-description-3",
  },
];

const PartnersList = () => {
  const t = useTranslations("partners");

  return (
    <div className="w-full bg-white">
      
      {/* === 1. HERO SECTION (ẢNH VÀ CHỮ ĐỐI TÁC) === */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image 
            src="/images/home/banner-4.jpg" // Bạn có thể đổi ảnh này
            alt="Partners Banner"
            fill
            priority
            className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className={`
            text-4xl md:text-6xl text-white uppercase text-center max-w-4xl px-4 
            ${playfair.className} 
            leading-relaxed tracking-wide
          `}>
            {t('hero_title')}
          </h1>
        </div>
      </div>

      {/* === 2. LIST ĐỐI TÁC (FULL WIDTH, ZIG-ZAG) === */}
      <div className="w-full">
        {PARTNERS.map((partner, index) => {
          // Kiểm tra chẵn lẻ để đảo vị trí
          // index % 2 === 0 (0, 2, 4...): Logo Trái - Text Phải
          // index % 2 !== 0 (1, 3, 5...): Logo Phải - Text Trái
          const isEven = index % 2 === 0;

          return (
            <div 
              key={index} 
              className="relative w-full min-h-[600px] lg:h-screen flex items-center"
            >
              {/* A. Ảnh nền full */}
              <Image
                src={partner.coverImage}
                alt="Background"
                fill
                className="object-cover"
                priority={index === 0} // Ưu tiên tải ảnh đầu tiên
              />
              
              {/* Lớp phủ màu tối để chữ dễ đọc */}
              <div className="absolute inset-0 bg-black/60" />

              {/* B. Nội dung (Logo + Thông tin) */}
              <div className="container mx-auto px-4 relative z-10 h-full py-20">
                <AnimateInView className="h-full">
                  <div className={`
                    flex flex-col h-full justify-center gap-12 lg:gap-24
                    ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} /* Đảo chiều trên Desktop */
                  `}>
                    
                    {/* Cột Logo (Chiếm 40%) */}
                    <div className="flex-1 flex items-center justify-center lg:justify-center">
                      <div className="relative w-64 h-64 lg:w-80 lg:h-80 bg-white/10 backdrop-blur-sm rounded-full p-8 flex items-center justify-center shadow-2xl border border-white/20">
                        <Image
                          src={partner.logo}
                          alt={t(partner.title)}
                          width={partner.logoWidth}
                          height={partner.logoHeight}
                          className="object-contain w-full h-full"
                        />
                      </div>
                    </div>

                    {/* Cột Thông tin (Chiếm 60%) */}
                    <div className={`
                      flex-1 flex flex-col justify-center text-white
                      ${isEven ? 'lg:text-left' : 'lg:text-right'} /* Căn lề văn bản theo vị trí */
                      text-center /* Mobile luôn căn giữa */
                    `}>
                      <h2 className="text-3xl lg:text-5xl font-bold mb-6 uppercase tracking-wide text-[#E3C284]">
                        {t(partner.title)}
                      </h2>
                      
                      <div className={`w-24 h-1 bg-white mb-8 mx-auto ${isEven ? 'lg:mx-0' : 'lg:ml-auto'}`} />

                      <p className="text-base lg:text-xl leading-loose text-gray-200 max-w-2xl mx-auto lg:mx-0">
                        {t(partner.description)}
                      </p>
                    </div>

                  </div>
                </AnimateInView>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PartnersList;