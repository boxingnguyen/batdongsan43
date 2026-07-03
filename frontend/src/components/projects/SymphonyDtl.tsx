import Image from "next/image";

const benefits = [
  "Tất cả sản phẩm minh bạch, mức giá rõ ràng, pháp lý đầy đủ",
  "Tư vấn chuyên sâu 1:1, tiếp cận giỏ hàng đa dạng nhất thị trường",
  "Hỗ trợ hoàn tất thủ tục nhanh gọn và dịch vụ đồng hành bền vững",
];

export function SymphonyDtl() {
  return (
    <section
      id="dtl"
      className="scroll-mt-24 bg-gradient-to-b from-[#030b3a] to-[#0f437d] py-16 text-white md:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-20">
        <div className="mb-12 text-center">
          <Image
            src={`/images/symphony5/f1_sun_group.jpg`}
            alt="Duyên Hải Holding"
            width={600}
            height={133}
            className="mx-auto h-auto w-full max-w-lg"
          />
        </div>

        <div className="mb-12 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-6 text-white/90">
              Duyên Hải Holding vinh dự nằm trong TOP đại lý F1 hàng đầu của Sun
              Group, mang tới lợi thế khác biệt cho khách hàng và nhà đầu tư:
            </p>
            <ul className="space-y-4">
              {benefits.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 border-b border-white/10 pb-4 text-sm md:text-base"
                >
                  <span className="text-[#fcdd8b]">✦</span>
                  <span className="text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/20">
            <Image
              src={`/images/symphony5/dtl.jpg`}
              alt="Duyên Hải Holding"
              width={960}
              height={590}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
