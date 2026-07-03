"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import AnimateInView from "@/components/shared/AnimateInView";

// Utility Data
const UTILITIES = [
  {
    title: "title-1", // SPA AND GYM
    description: "description-1",
    image: "/images/home/cover-gym.jpg", // Background image
    icon: "/images/home/icon-gym.png",
  },
  {
    title: "title-2", // MODERN POOL
    description: "description-2",
    image: "/images/home/cover-pool.png",
    icon: "/images/home/icon-resort.png",
  },
  {
    title: "title-3", // RESTAURANTS AND BARS
    description: "description-3",
    image: "/images/home/cover-restaurant.png",
    icon: "/images/home/icon-restaurant.png",
  },
  {
    title: "title-4", // KIDS PLAY AREA
    description: "description-4",
    image: "/images/home/cover-kid-club.jpg",
    icon: "/images/home/icon-kid-club.png",
  },
  {
    title: "title-5", // SHOPPING CENTER
    description: "description-5",
    image: "/images/home/cover-shopping.jpg",
    icon: "/images/home/icon-benefit.png",
  },
  {
    title: "title-6", // CONFERENCE CENTER
    description: "description-6",
    image: "/images/home/cover-manage.jpg",
    icon: "/images/home/icon-manage.png",
  },
];

const FacilityList = () => {
  const t = useTranslations("utilities");

  return (
    <div className="w-full bg-white">
      
      {/* === HERO SECTION === */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image 
            src="/images/home/cover-pool.png" // Hero Image
            alt={t('title')}
            fill
            priority
            className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl text-white uppercase text-center max-w-4xl px-4 font-bold tracking-wider">
            {t('title')}
          </h1>
        </div>
      </div>

      {/* === UTILITY LIST === */}
      <div className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="space-y-24">
          {UTILITIES.map((item, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <AnimateInView key={index} delay={index * 100}>
                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                  
                  {/* IMAGE BLOCK */}
                  <div className="w-full lg:w-1/2 relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl group">
                    <Image
                      src={item.image}
                      alt={t(item.title)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* CONTENT BLOCK */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <div className={`flex items-center gap-4 mb-6 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} justify-center lg:justify-start`}>
                      <div className="w-16 h-16 bg-[#E3C284] rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                        <Image
                          src={item.icon}
                          alt="Icon"
                          width={32}
                          height={32}
                          className="w-8 h-8 object-contain brightness-0 invert" // White icon
                        />
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 uppercase">
                        {t(item.title)}
                      </h2>
                    </div>
                    
                    <div 
                      className={`text-gray-600 text-lg leading-relaxed text-justify ${isEven ? 'lg:text-left' : 'lg:text-right'}`}
                      dangerouslySetInnerHTML={{
                        __html: t(item.description)
                      }}
                    />
                  </div>

                </div>
              </AnimateInView>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default FacilityList;