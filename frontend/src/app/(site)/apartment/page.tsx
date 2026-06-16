'use client'; 

import * as React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import AnimateInView from '@/components/shared/AnimateInView';
import { Playfair_Display } from 'next/font/google'; 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

// Khởi tạo font
const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  weight: ['700'],
});

// Định nghĩa dữ liệu
const floorPlans = [
  {
    value: "5-23",
    trigger: "tab_5_23",
    title: "content_5_23_title",
    desc: "content_5_23_desc",
    imageSrc: "/images/home/tang-5-23.jpg", 
  },
  {
    value: "27-45",
    trigger: "tab_27_45",
    title: "content_27_45_title",
    desc: "content_27_45_desc",
    imageSrc: "/images/home/tang-27-45.jpg", 
  },
  {
    value: "47-48",
    trigger: "tab_47_48",
    title: "content_47_48_title",
    desc: "content_47_48_desc",
    imageSrc: "/images/home/tang-47-48.jpg", 
  },
];

const ApartmentPage = () => {
  const t = useTranslations('Apartment');
  const [selectedValue, setSelectedValue] = React.useState("5-23");
  const selectedPlan = floorPlans.find(p => p.value === selectedValue) || floorPlans[0];

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section/Banner */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image 
            src="/images/home/header-can-ho.png" 
            alt={t('hero_title')}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 100vw"
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

      {/* 2. Main Content Sections */}
      <div className="relative isolate py-16 md:py-24"> 
        <Image
            src="/images/home/background.png" 
            alt="Background"
            fill
            className="-z-10 object-cover opacity-20"
            sizes="100vw"
        />
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* CỘT BÊN TRÁI: ẢNH VÀ THÔNG TIN */}
            <div className="md:col-span-2">
          
              <AnimateInView key={selectedPlan.value} delay={100} className="flex flex-col">
                
                <div className="mb-6 text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-primary-600 mb-2">
                    {t(selectedPlan.title)}
                  </h3>
                  <p className="text-lg text-gray-700">
                    {t(selectedPlan.desc)}
                  </p>
                </div>

                {/* Ảnh mặt bằng */}
                <div className="relative w-full aspect-[16/9] shadow-lg rounded-lg overflow-hidden">
                  <Image
                    src={selectedPlan.imageSrc}
                    alt={t(selectedPlan.title)}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 70vw"
                  />
                </div>

              </AnimateInView>
            </div>

            <div className="md:col-span-1">
              <AnimateInView delay={200}>
                <Select 
                  value={selectedValue} 
                  onValueChange={(newValue) => setSelectedValue(newValue)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t(selectedPlan.trigger)} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {floorPlans.map((plan) => (
                        <SelectItem key={plan.value} value={plan.value}>
                          {t(plan.trigger)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </AnimateInView>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentPage;