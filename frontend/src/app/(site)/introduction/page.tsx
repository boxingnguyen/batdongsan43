import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import AnimateInView from '@/components/shared/AnimateInView';
import { Playfair_Display } from 'next/font/google';

// Font configuration
const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  weight: ['700'],
});

const IntroductionPage = async () => {
  const t = await getTranslations('Introduction');

  // Section Data
  const sections = [
    {
      titleKey: 'section1_title',
      contentKey: 'section1_content',
      imageSrc: '/images/home/introduction1.jpg', // Ensure file exists
      delay: 100,
    },
    {
      titleKey: 'section2_title',
      contentKey: 'section2_content',
      imageSrc: '/images/home/introduction2.png', // Updated to .png per request
      reverse: true,
      delay: 300,
    },
    {
      titleKey: 'section3_title',
      contentKey: 'section3_content',
      imageSrc: '/images/home/banner-1.jpg', // Or introduction3.jpg
      delay: 500,
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* --- Hero Section --- */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image 
            src="/images/home/banner-4.jpg" 
            alt={t('hero_title')}
            fill
            priority
            className="object-cover"
            sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className={`
            text-4xl md:text-6xl text-white uppercase text-center max-w-4xl px-4 
            ${playfair.className} leading-relaxed tracking-wide
          `}>
            {t('hero_title')}
          </h1>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="w-full relative bg-cover bg-center bg-fixed" 
           style={{ backgroundImage: "url(/images/home/bg-overview-project.jpg)" }}
      >
        <div className="absolute inset-0 bg-white/90 z-0"></div>

        <div className="container mx-auto px-4 py-16 max-w-7xl relative z-10">
          <AnimateInView delay={0}> 
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-16 text-center border-b-2 border-primary-500 pb-4 inline-block relative left-1/2 -translate-x-1/2">
              {t('main_heading')}
            </h2>
          </AnimateInView>

          {/* Render Sections */}
          {sections.map((section, index) => (
            <AnimateInView key={index} delay={section.delay} className="mb-24 last:mb-0"> 
              <div className={`flex flex-col ${section.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
                
                {/* Image Block */}
                <div className="md:w-1/2 w-full">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-2xl border-4 border-white/50">
                    <Image 
                        src={section.imageSrc} 
                        alt={t(section.titleKey)}
                        fill 
                        className="object-cover transition duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                
                {/* Text Block */}
                <div className="md:w-1/2 w-full">
                  <h3 className="text-2xl font-bold text-primary-700 mb-4 border-l-4 border-primary-500 pl-4 uppercase">
                    {t(section.titleKey)}
                  </h3>
                  <p className="text-gray-800 leading-relaxed whitespace-pre-line text-justify font-medium text-lg">
                    {t(section.contentKey)}
                  </p>
                </div>

              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroductionPage;