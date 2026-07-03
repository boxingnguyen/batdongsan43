import Image from "next/image";

export function SymphonyHero() {
  return (
    <section className="relative">
      <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[21/9] md:max-h-[min(90vh,900px)]">
        <Image
          src="/images/symphony5/hero-12-5-mobile.jpg"
          alt="Sun Symphony Residence 5"
          fill
          className="object-cover md:hidden"
          priority
          sizes="100vw"
        />
        <Image
          src="/images/symphony5/hero-12-5.jpg"
          alt="Sun Symphony Residence 5"
          fill
          className="hidden object-cover md:block"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-end justify-center pb-20 md:pb-24">
          <a
            href="#gioi-thieu"
            className="flex flex-col items-center gap-3 text-white"
            aria-label="Cuộn xuống nội dung"
          >
            <span className="block h-2.5 w-2.5 rotate-[-135deg] border-b-2 border-l-2 border-white opacity-90" />
            <span className="block h-2.5 w-2.5 rotate-[-135deg] border-b-2 border-l-2 border-white opacity-70 [margin-bottom:10px]" />
            <span className="block h-2.5 w-2.5 rotate-[-135deg] border-b-2 border-l-2 border-white opacity-50 [margin-bottom:20px]" />
          </a>
        </div>
      </div>
    </section>
  );
}