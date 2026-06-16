"use client";

import React, {
  useEffect,
  useState,
} from "react";
import { useTranslations } from "next-intl";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const UTILITIES = [
  {
    title: "title-1",
    description: "description-1",
    logo: "/images/home/icon-gym.png",
    background: "/images/home/cover-gym.jpg",
  },
  {
    title: "title-2",
    description: "description-2",
    logo: "/images/home/icon-resort.png",
    background: "/images/home/cover-pool.png",
  },
  {
    title: "title-3",
    description: "description-3",
    logo: "/images/home/icon-restaurant.png",
    background:
      "/images/home/cover-restaurant.png",
  },
  {
    title: "title-4",
    description: "description-4",
    logo: "/images/home/icon-kid-club.png",
    background: "/images/home/cover-kid-club.jpg",
  },
  {
    title: "title-5",
    description: "description-5",
    logo: "/images/home/icon-benefit.png",
    background: "/images/home/cover-shopping.jpg",
  },
  {
    title: "title-6",
    description: "description-6",
    logo: "/images/home/icon-manage.png",
    background: "/images/home/cover-manage.jpg",
  },
];

const HomeUtilities = () => {
  const t = useTranslations("utilities");
  const [api, setApi] =
    useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] =
    useState(0);

  useEffect(() => {
    if (!api) return;

    const updateIndex = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    api.on("select", updateIndex);
    updateIndex();

    return () => {
      api.off("select", updateIndex);
    };
  }, [api]);

  return (
    <div className="w-full lg:h-full h-[989px]" id="utilities">
      <Carousel
        opts={{ loop: true, align: "start" }}
        className="w-full h-full" // Add 'relative' for button positioning
        setApi={setApi}
      >
        <CarouselContent>
          {UTILITIES.map((utility) => (
            <CarouselItem
              key={utility.title}
              className="w-full h-full relative"
            >
              <div
                className="w-full h-full relative flex items-center justify-center"
                style={{
                  backgroundImage: `url(${utility.background})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/30 z-0" />
                
                {/* === TEXT BLOCK (MODIFIED) === */}
                <div className="text-center text-white z-[5] px-4 max-w-xs md:max-w-md lg:max-w-lg mx-auto">
                  
                  {/* --- 1. ADDED UTILITY TITLE (Visible on Mobile) --- */}
                  <h3 className="text-xl lg:text-2xl font-bold uppercase mb-4">
                    {t(utility.title)}
                  </h3>
                  {/* --- END OF ADDED TITLE --- */}

                  <div
                    // Responsive font size
                    className="text-base leading-relaxed lg:text-[20px] lg:leading-[40px] font-normal"
                    dangerouslySetInnerHTML={{
                      __html: t(
                        utility.description
                      ),
                    }}
                  />
                </div>
                {/* === END OF TEXT BLOCK === */}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Responsive Main Title */}
        <h2 
          className="
            font-black text-white text-center 
            absolute left-1/2 -translate-x-1/2 
            after:content-[''] after:w-[100px] after:h-[2px] after:bg-white 
            after:bottom-0 after:left-1/2 after:absolute after:-translate-x-1/2
            
            pb-4 pt-0
            text-2xl top-16 /* Mobile: 2xl font, 64px from top */
            lg:text-[28px] lg:top-[100px] lg:mt-[30px] /* Desktop: 28px font, 100px from top */
          "
        >
          {t("title")}
        </h2>

        {/* Vertical Dot Navigation (Hidden on Mobile) */}
        <div 
          className="
            hidden lg:block /* <-- This hides it on mobile */
            absolute h-[510px] w-[60px] top-1/2 left-0 z-[1000] 
            [transform:matrix(1,0,0,1,250,-255)] 
            before:content-[''] before:w-[1px] before:h-[calc(100%+120px)] 
            before:left-1/2 before:-top-[60px] before:absolute before:bg-white 
            before:-translate-x-1/2
          "
        >
          {UTILITIES.map((utility, i) => (
            <div
              key={i}
              className="group opacity-100 p-0 w-[60px] h-[60px] bg-white rounded-full absolute m-0 cursor-pointer left-0"
              style={{ top: `${i * 90}px` }}
              onClick={() => api?.scrollTo(i)}
            >
              <span
                className={`block relative w-full h-full bg-white rounded-full ${
                  i === selectedIndex ? 'utility-dot-active' : ''
                }`}
                style={{
                  backgroundImage: `url(${utility.logo})`,
                  backgroundSize: "40px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              ></span>
              <span 
                className={`absolute top-1/2 right-auto bottom-auto ml-2.5 -left-[250px] uppercase w-[200px] text-right bg-transparent p-0 text-sm font-medium translate-x-[10px] translate-y-[-50%] group-hover:translate-x-0 transition-transform duration-300 ${
                  i === selectedIndex 
                    ? 'text-[#CC9A58] font-bold' 
                    : 'text-white'
                }`}
              >
                {t(utility.title)}
              </span>
            </div>
          ))}
        </div>

        {/* Dots (Mobile only) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 lg:hidden">
          {UTILITIES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className={
                i === selectedIndex
                  ? 'h-2 w-6 rounded-full bg-white/90 transition-all'
                  : 'h-2 w-2 rounded-full bg-white/50 transition-all'
              }
            />
          ))}
        </div>

      </Carousel>
    </div>
  );
};

export default HomeUtilities;