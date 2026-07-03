import Image from "next/image";

export function SymphonyPolicy() {
  return (
    <section id="csbh" className="scroll-mt-24 overflow-hidden bg-gradient-to-b from-[#0f437d] to-[#030b3a] pb-16 md:pb-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-20">
        <Image
          src={`/images/symphony5/Chinh-sach-so-huu.png`}
          alt="Chính sách sở hữu"
          width={600}
          height={123}
          className="mx-auto mb-8 h-auto w-full max-w-lg"
        />
        <Image
          src={`/images/symphony5/csbh-new.png`}
          alt="Chính sách bán hàng"
          width={1920}
          height={853}
          className="hidden h-auto w-full rounded-2xl md:block"
          sizes="100vw"
        />
        <Image
          src={`/images/symphony5/csbh-new-mobile-1.png`}
          alt="Chính sách bán hàng"
          width={1331}
          height={1652}
          className="mx-auto h-auto w-full max-w-md rounded-2xl md:hidden"
        />
      </div>
    </section>
  );
}