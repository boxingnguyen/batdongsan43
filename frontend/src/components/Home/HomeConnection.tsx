"use client"

import React, { useEffect, useRef, useState } from 'react' 
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl' 
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"

const IMAGES = [
  "/images/home/connection-1.jpg",
  "/images/home/connection-2.jpg",
  "/images/home/connection-3.jpg",
  "/images/home/connection-4.jpg",
  "/images/home/connection-5.jpg",
  "/images/home/connection-6.jpg",
]

const HomeConnection = () => {
  const t = useTranslations("gallery"); 
  
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap())
    }

    onSelect()
    api.on('select', onSelect)
    api.on('reInit', onSelect)

    return () => {
      api.off('select', onSelect)
      api.off('reInit', onSelect)
    }
  }, [api])

  useEffect(() => {
    if (!api) return

    const start = () => {
      if (autoplayTimer.current) return
      autoplayTimer.current = setInterval(() => {
        api.scrollNext()
      }, 4000) 
    }
    const stop = () => {
      if (!autoplayTimer.current) return
      clearInterval(autoplayTimer.current)
      autoplayTimer.current = null
    }

    start()
    return stop
  }, [api])

  return (
    <div className="w-full lg:h-screen h-[600px] relative" id="connection">
      {/* Background for mobile */}
      <div
        className="lg:hidden absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/images/home/cover-footer.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      <Carousel opts={{ loop: true, align: 'start' }} className="w-full h-full relative z-10" setApi={setApi}>
        <CarouselContent>
          {IMAGES.map((src, idx) => (
            <CarouselItem key={src} className="w-full h-full relative">
              <Image
                src={src}
                alt={`Connection slide ${idx + 1}`}
                fill 
                priority={idx === 0}
                sizes="100vw"
                className="lg:object-cover object-contain" 
                placeholder="empty" 
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute lg:bottom-6 bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {IMAGES.map((_, i) => (
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
      <Link
        href="/apartment" 
        className="
          absolute z-10 
          bottom-4 left-4 px-6 py-2 
          md:bottom-6 md:left-6 md:px-8 
          rounded border border-white text-white 
          text-sm md:text-base
          uppercase font-medium transition-all duration-300 
          bg-[#12243E]/80 hover:bg-white hover:text-black hover:border-white
        "
      >
        {t("viewDetails")} 
      </Link>
    </div>
  )
}

export default HomeConnection