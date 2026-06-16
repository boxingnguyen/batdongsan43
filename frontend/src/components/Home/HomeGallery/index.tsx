"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";

const GALLERY_IMAGES = [
  "/images/home/gallery/image-1.jpg",
  "/images/home/gallery/image-2.png",
  "/images/home/gallery/image-3.png",
  "/images/home/gallery/image-4.png",
  "/images/home/gallery/image-5.png",
  "/images/home/gallery/image-6.png",
  "/images/home/gallery/image-7.png",
  "/images/home/gallery/image-8.png",
];

const HomeGallery = () => {
  const t = useTranslations("gallery");
  return (
    <div
      className="w-full min-h-screen py-24 relative"
      style={{
        backgroundImage:
          "url(/images/home/cover-footer.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      id="gallery"
    >
      <div className="container mx-auto max-w-7xl px-4">
        {/* Tabs and Content */}
        <div className="bg-[#1a4d4d] rounded-lg p-8">
          <h2 className="text-[28px] font-black leading-[50px] text-white text-center relative pb-4 after:content-[''] after:w-[100px] after:h-[2px] after:bg-white after:bottom-0 after:left-1/2 after:absolute after:-translate-x-1/2 mb-8">
            {t("title")}
          </h2>
          <Tabs
            defaultValue="images"
            className="w-full"
          >
            <div className="flex justify-center mb-6">
              <TabsList className="bg-transparent border-none p-0 gap-2">
                <TabsTrigger
                  value="images"
                  className="data-[state=active]:bg-[#2a6d6d] data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-white text-white bg-transparent border-b-2 border-transparent rounded-none px-6 py-2"
                >
                  {t("tabImages")}
                </TabsTrigger>
                <TabsTrigger
                  value="video"
                  className="data-[state=active]:bg-[#2a6d6d] data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-white text-white bg-transparent border-b-2 border-transparent rounded-none px-6 py-2"
                >
                  {t("tabVideo")}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent
              value="images"
              className="mt-0"
            >
              {/* Image Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {GALLERY_IMAGES.map(
                  (image, index) => (
                    <div
                      key={index}
                      className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
                    >
                      <Image
                        src={image}
                        alt={`Gallery image ${
                          index + 1
                        }`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )
                )}
              </div>
            </TabsContent>

            <TabsContent
              value="video"
              className="mt-0"
            >
              <div className="text-white text-center py-12">
                <p>{t("videoComingSoon")}</p>
              </div>
            </TabsContent>
          </Tabs>

          {/* View Details Button */}
          <div className="flex justify-center mt-8">
            <Link
              href="/gallery"
              className="w-fit px-8 py-2 rounded border border-white text-white uppercase font-medium transition-all duration-300 hover:bg-white hover:text-black hover:border-white flex-shrink-0 mx-auto"
            >
              {t("viewDetails")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeGallery;
