import Image from "next/image";

const CDN = "https://dongtayland.vn/wp-content/uploads/2026/05";

export function SymphonyPolicy() {
  return (
    <section id="csbh" className="scroll-mt-24 overflow-hidden bg-gradient-to-b from-[#0f437d] to-[#030b3a] pb-16 md:pb-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-20">
        <Image
          src={`${CDN}/Chinh-sach-so-huu.png`}
          alt="Chính sách sở hữu"
          width={600}
          height={123}
          className="mx-auto mb-8 h-auto w-full max-w-lg"
        />
        <Image
          src={`${CDN}/csbh-new.png`}
          alt="Chính sách bán hàng"
          width={1920}
          height={853}
          className="hidden h-auto w-full rounded-2xl md:block"
          sizes="100vw"
        />
        <Image
          src={`${CDN}/csbh-new-mobile-1.png`}
          alt="Chính sách bán hàng"
          width={1331}
          height={1652}
          className="mx-auto h-auto w-full max-w-md rounded-2xl md:hidden"
        />
      </div>
    </section>
  );
}