import Image from "next/image";

const types = [
  { name: "Studio", area: "30 – 33m²" },
  { name: "Căn 1PN+", area: "45 – 53m²" },
  { name: "Căn 2PN", area: "67 – 70m²" },
  { name: "Penthouse", area: "31 – 100m²" },
];

export function SymphonyProducts() {
  return (
    <section id="san-pham" className="scroll-mt-24 bg-[#f9f9f9] pb-16 md:pb-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-20">
        <div className="mb-10 grid gap-10 lg:grid-cols-2">
          <div>
            <Image
              src={`/images/symphony5/San-pham-da-dang-1.png`}
              alt="Sản phẩm đa dạng"
              width={600}
              height={90}
              className="mb-8 h-auto w-full max-w-sm"
            />
            <ul className="space-y-4">
              {types.map((t) => (
                <li
                  key={t.name}
                  className="flex flex-wrap items-baseline gap-2 border-b border-[#d2c4bb]/40 pb-4"
                >
                  <span className="text-[#fcdd8b]">✦</span>
                  <span className="font-serif text-lg text-[#11437a]">{t.name}:</span>
                  <span className="text-[#4e453e]">Diện tích {t.area}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#f5ecb0] to-[#ce9e51] p-2">
            <Image
              src={`/images/symphony5/san-pham-1.jpg`}
              alt="Căn hộ mẫu"
              width={960}
              height={640}
              className="h-auto w-full rounded-xl object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}