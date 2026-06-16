"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl"; 

const ProjectOverview = () => {
  const t = useTranslations("Overview"); 
  const tGallery = useTranslations("gallery"); 
  const newStaticImage =
    "/images/home/updatevideo.jpg"; 
  
  const valueGradientClass = "font-bold bg-gradient-to-r from-yellow-400 via-gray-200 to-yellow-500 bg-clip-text text-transparent";

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        backgroundImage:
          "url(/images/home/bg-overview-project.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "opacity .5s ease",
      }}
      id="overview"
    >
      {/* Container với padding (pt-32) và gap-4 (cho nút bấm sát hơn) */}
      <div className="container mx-auto max-w-7xl h-full px-4 lg:px-8 pt-32 pb-16 flex flex-col justify-center items-center gap-4">

        {/* --- 1. TITLE (Đã thu nhỏ) --- */}
        <h2 className={`text-2xl lg:text-3xl font-bold uppercase mb-4 text-center lg:text-left w-full ${valueGradientClass}`}>
          {t('title')}
        </h2>

        {/* --- 2. MAIN CONTENT BLOCK (ĐÃ ĐẢO NGƯỢC THỨ TỰ) --- */}
        {/* SỬA LỖI Ở ĐÂY:
          - Dùng 'flex-col-reverse' (Mobile: Thông tin ở dưới, Ảnh ở trên)
          - Dùng 'lg:flex-row' (Desktop: Ảnh bên trái, Thông tin bên phải)
        */}
        <div className="w-full flex flex-col-reverse lg:flex-row justify-center items-start gap-12 lg:gap-16">
          
          {/* === 2a. KHỐI THÔNG TIN (BÊN PHẢI Desktop / BÊN DƯỚI Mobile) === */}
          <div className="lg:w-3/5 w-full text-white">
            
            {/* Info text (smaller text) */}
            <div className="space-y-3 text-sm md:text-base">
              <p><strong className="font-semibold text-white mr-2">{t('tradeName_label')}</strong> <span className="text-white">{t('tradeName_value')}</span></p>
              <p><strong className="font-semibold text-white mr-2">{t('investor_label')}</strong> <span className="text-white">{t('investor_value')}</span></p>
              <p><strong className="font-semibold text-white mr-2">{t('location_label')}</strong> <span className="text-white">{t('location_value')}</span></p>
              <p><strong className="font-semibold text-white mr-2">{t('area_label')}</strong> <span className={valueGradientClass}>{t('area_value')}</span></p>
              <p><strong className="font-semibold text-white mr-2">{t('scale_label')}</strong> <span className={valueGradientClass}>{t('scale_value')}</span></p>
            </div>

            {/* Gold horizontal line */}
            <hr className="my-6 border-[#E3C284]/50" />

            {/* Tower Section (smaller text) */}
            <div className="flex w-full justify-between text-center px-2">
              <div>
                <p className="text-white font-semibold text-xs md:text-sm">{t('tower_a1_label')}</p>
                <p className={`text-base md:text-lg ${valueGradientClass}`}>{t('tower_a1_value')}</p>
              </div>
              <div>
                <p className="text-white font-semibold text-xs md:text-sm">{t('tower_a2_label')}</p>
                <p className={`text-base md:text-lg ${valueGradientClass}`}>{t('tower_a2_value')}</p>
              </div>
              <div>
                <p className="text-white font-semibold text-xs md:text-sm">{t('tower_d_label')}</p>
                <p className={`text-base md:text-lg ${valueGradientClass}`}>{t('tower_d_value')}</p>
              </div>
              <div>
                <p className="text-white font-semibold text-xs md:text-sm">{t('tower_b_label')}</p>
                <p className={`text-base md:text-lg ${valueGradientClass}`}>{t('tower_b_value')}</p>
              </div>
            </div>

            {/* Gold horizontal line */}
            <hr className="my-6 border-[#E3C284]/50" />

            {/* Apartment Types (smaller text) */}
            <h3 className="text-lg md:text-xl font-bold uppercase mt-6 text-white">{t('apartmentTypes_title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-4 text-sm md:text-base">
              <p>• <span className="text-white">{t('apt_studio')}:</span> <span className={valueGradientClass}>{t('apt_studio_size')}</span></p>
              <p>• <span className="text-white">{t('apt_1br')}:</span> <span className={valueGradientClass}>{t('apt_1br_size')}</span></p>
              <p>• <span className="text-white">{t('apt_2br')}:</span> <span className={valueGradientClass}>{t('apt_2br_size')}</span></p>
              <p>• <span className="text-white">{t('apt_3br')}:</span> <span className={valueGradientClass}>{t('apt_3br_size')}</span></p>
              <p>• <span className="text-white">{t('apt_pano')}:</span> <span className={valueGradientClass}>{t('apt_pano_size')}</span></p>
              <p>• <span className="text-white">{t('apt_hyper')}:</span> <span className={valueGradientClass}>{t('apt_hyper_size')}</span></p>
              <p>• <span className="text-white">{t('apt_penth')}</span></p>
            </div>
          </div>

          {/* === 2b. KHỐI ẢNH (BÊN TRÁI Desktop / BÊN TRÊN Mobile) === */}
          {/* SỬA LỖI Ở ĐÂY: Xóa 'hidden' */}
          <div className="lg:w-2/5 w-full flex relative flex-col justify-center items-center">
            <div className="relative w-full rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={newStaticImage}
                alt="Update video"
                width={800} // Original aspect ratio width
                height={454} // Original aspect ratio height
                className="w-full h-auto object-contain" // Keeps aspect ratio
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
          
        </div>

        {/* === 3. BUTTON BLOCK (Centered) === */}
        <div className="w-full flex justify-center">
          <Link
            href="/connection" // <-- Link is now correct
            className="w-fit px-8 py-2 rounded border border-white text-white uppercase font-medium transition-all duration-300 hover:bg-white hover:text-black hover:border-white flex-shrink-0"
          >
            {tGallery("viewDetails")} {/* Uses 'gallery' namespace */}
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ProjectOverview;