import Image from "next/image";

const CDN = "https://dongtayland.vn/wp-content/uploads/2026/05";

const facts = [
  { label: "Tên dự án", value: "Sun Symphony Residence 5", logo: `${CDN}/logo-tong-quan.png` },
  {
    label: "Vị trí",
    value: "Nằm trong tổ hợp Sun Symphony Residence, đường Trần Hưng Đạo, Đà Nẵng",
  },
  { label: "Chủ đầu tư", value: "Sun Group", logo: `${CDN}/Sun-group-logo-1.png` },
  { label: "Quy mô", value: "11.371 m²" },
  { label: "Sản phẩm", value: "1.228 căn hộ — Cao 31 tầng" },
  { label: "Thời gian bàn giao", value: "Tháng 08/2028" },
  { label: "Giá bán", value: "Từ 2,5 tỷ (Đã gồm VAT)" },
];

export function ProjectOverview() {
  return (
    <section id="tong-quan" className="scroll-mt-24 bg-[#f9f9f9] pb-16 md:pb-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-20">
        <div className="mb-10 text-center">
          <Image
            src={`${CDN}/Thong-tin-du-an-fn.png`}
            alt="Thông tin dự án"
            width={600}
            height={72}
            className="mx-auto h-auto w-full max-w-md"
          />
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-0">
            {facts.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[minmax(0,140px)_1fr] items-center gap-4 border-b border-[#d2c4bb]/40 py-4 md:grid-cols-[180px_1fr]"
              >
                <span className="text-sm font-semibold text-[#4a3829]">{row.label}</span>
                <div className="text-[#4e453e]">
                  {row.logo ? (
                    <Image
                      src={row.logo}
                      alt=""
                      width={220}
                      height={80}
                      className="h-8 w-auto object-contain object-left"
                    />
                  ) : (
                    <span className="font-serif text-xl text-[#11437a] md:text-2xl">{row.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-2xl lg:-mt-[40%] lg:min-h-[480px]">
            <Image
              src={`${CDN}/tong-quan-2-fn.png`}
              alt="Tổng quan dự án"
              fill
              className="hidden object-cover md:block"
              sizes="50vw"
            />
            <Image
              src={`${CDN}/tong-quan-mobile.jpg`}
              alt="Tổng quan dự án"
              fill
              className="object-cover md:hidden"
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}