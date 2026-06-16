import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import AnimateInView from '@/components/shared/AnimateInView';
import { Playfair_Display } from 'next/font/google';
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'Connection' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thesoleil.vn'
  const localeUrl = locale === 'vi' ? `${baseUrl}/connection` : `${baseUrl}/${locale}/connection`
  
  return {
    title: t('hero_title'),
    description: `${t('main_heading')}. ${t('location_mykhe_desc')}`,
    alternates: {
      canonical: localeUrl,
      languages: {
        'vi': `${baseUrl}/connection`,
        'en': `${baseUrl}/en/connection`,
        [locale]: localeUrl, // Self-referential alternate link
        'x-default': `${baseUrl}/connection`,
      },
    },
    openGraph: {
      title: t('hero_title'),
      description: `${t('main_heading')}. ${t('location_mykhe_desc')}`,
      url: localeUrl,
      images: [
        {
          url: `${baseUrl}/images/home/ketnoi.jpg`,
          width: 1200,
          height: 630,
          alt: t('hero_title'),
        },
      ],
    },
  };
}

// Khởi tạo font cho banner
const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  weight: ['700'],
});

// Cấu trúc data (không đổi)
interface LocationItem {
  key: string;
  imageSrc: string;
}

const locations: LocationItem[] = [
  { key: 'mykhe', imageSrc: '/images/home/mykhe.jpg' },
  { key: 'sontra', imageSrc: '/images/home/son tra.jpeg' },
  { key: 'bana', imageSrc: '/images/home/bana.jpg' },
  { key: 'airport', imageSrc: '/images/home/sanbay.jpg' },
  { key: 'hue', imageSrc: '/images/home/codo.jpg' },
  { key: 'hoian', imageSrc: '/images/home/phoco.jpg' },
  { key: 'golf', imageSrc: '/images/home/golf.jpg' },
  { key: 'myson', imageSrc: '/images/home/thanhdia.jpg' }
];


const ConnectionPage = async () => {
  const t = await getTranslations('Connection');

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section/Banner */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image 
            src="/images/home/ketnoi.jpg" 
            alt={t('hero_title') as string}
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

      
      {/* 2. Main Content Sections (Với ảnh nền) */}
      <div className="relative isolate py-16 md:py-24"> 
        <Image
            src="/images/home/background.png" 
            alt="Background"
            fill
            className="-z-10 object-cover opacity-20"
            sizes="100vw"
        />

        {/* Container cho nội dung */}
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Lưới 2 cột */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {locations.map((loc, index) => {
              const title = t(`location_${loc.key}_title`);
              const time = t(`location_${loc.key}_time`);
              const desc = t(`location_${loc.key}_desc`);
              
              return (
                <AnimateInView 
                  key={loc.key} 
                  delay={index * 100} 
                  className="group relative h-64 md:h-80 w-full rounded-lg overflow-hidden shadow-xl"
                >
                  {/* Ảnh nền thẻ */}
                  <Image
                    src={loc.imageSrc}
                    alt={title as string}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  
                  {/* Lớp phủ tối */}
                  <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/60" />

                  {/* Vùng chứa nội dung */}
                  <div className="absolute inset-0 p-6 flex flex-col items-start justify-center text-left text-white">
                    <div className="relative w-full"> 

                      {/* NỘI DUNG MẶC ĐỊNH (Tiêu đề) */}
                      <div className="transition-all duration-300 ease-in-out opacity-100 translate-y-0 group-hover:opacity-0 group-hover:-translate-y-4">
                        <h3 className="text-2xl font-bold uppercase tracking-wider">
                          {title}
                        </h3>
                      </div>

                      {/* NỘI DUNG KHI HOVER (Mô tả) */}
                      <div className="absolute top-0 left-0 transition-all duration-300 ease-in-out opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 mt-4">
                        <p className="text-lg font-semibold text-primary-400 uppercase mb-2">
                          {time}
                        </p>
                        <p className="text-sm leading-relaxed">
                          {desc}
                        </p>
                      </div>

                    </div>
                  </div>
                </AnimateInView>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionPage;