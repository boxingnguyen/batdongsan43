import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";

export function SymphonyIntro() {
  return (
    <section id="gioi-thieu" className="relative scroll-mt-24">
      <div className="relative overflow-hidden bg-gradient-to-b from-[#1e2433] via-[#0f437d] to-[#f9f9f9] pb-16 ">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <div className="mb-8 rounded-[20px] border border-white/20 bg-gradient-to-b from-[#030b3a] to-[#002f73] p-6 md:p-10">
            <p className="mb-8 text-base leading-relaxed text-white/95 md:text-lg">
              Căn hộ hiếm hoi sở hữu &ldquo;bộ tứ&rdquo; tầm view cực phẩm: Sông Hàn &amp; City View — Pháo
              hoa — Biển — Núi. Symphony Residence 5 mở ra cơ hội sở hữu bất động sản đầu tư dòng
              tiền ổn định &amp; linh hoạt sử dụng làm second home, nghỉ dưỡng tại thiên đường biển
              Đà Nẵng.
            </p>

            <div className="mb-10 grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="mb-4 font-serif text-[#fcdd8b]">
                  Đà Nẵng &amp; những con số &ldquo;Biết nói&rdquo;
                </h3>
                <ul className="space-y-3 text-sm text-white/90 md:text-base">
                  <li>
                    <span className="text-[#fcdd8b]">✦</span> Năm 2025 đạt doanh thu du lịch hơn{" "}
                    <strong>70.000 tỷ đồng</strong> — Top 5 cả nước
                  </li>
                  <li>
                    <span className="text-[#fcdd8b]">✦</span> Dịp lễ 30/4–1/5/2026: kỷ lục hơn{" "}
                    <strong>5.700 tỷ đồng</strong>, dẫn đầu lượt khách quốc tế (~621.000 lượt)
                  </li>
                  <li>
                    <span className="text-[#fcdd8b]">✦</span> Quý I/2026: <strong>4,2 triệu</strong> lượt
                    khách lưu trú — 55% khách quốc tế
                  </li>
                </ul>
              </div>
              <div className="overflow-hidden rounded-xl">
                <ImageWithSkeleton
                  src={`/images/symphony5/gioi-thieu-1-new.jpg`}
                  alt="Đà Nẵng"
                  width={960}
                  height={589}
                  className="h-auto w-full rounded-xl object-cover"
                />
              </div>
            </div>

            <div className="mb-10 grid gap-10 md:grid-cols-2">
              <div>
                <h3 className="mb-4 font-serif text-lg text-[#fcdd8b]">
                  3 nền tảng đảm bảo giá trị đầu tư vững chắc
                </h3>
                <ul className="space-y-3 text-sm text-white/90 md:text-base">
                  <li>
                    <span className="text-[#fcdd8b]">✦</span> Không mùa vụ mà khai thác quanh năm
                  </li>
                  <li>
                    <span className="text-[#fcdd8b]">✦</span> Không &ldquo;ngắm cảnh&rdquo; mà trải
                    nghiệm dài ngày
                  </li>
                  <li>
                    <span className="text-[#fcdd8b]">✦</span> Cân bằng khách nội địa &amp; quốc tế
                  </li>
                </ul>
              </div>
              <div className="relative min-h-[240px] overflow-hidden rounded-[20px]">
                <ImageWithSkeleton
                  src={`/images/symphony5/gioi-thieu-2.jpg`}
                  alt="Symphony Residence"
                  width={960}
                  height={589}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

          </div>

          <div className="mt-10 overflow-hidden rounded-lg">
            <ImageWithSkeleton
              src={`/images/symphony5/stransit-1-fn-new.png`}
              alt="Kết nối giao thông"
              width={1920}
              height={790}
              className="hidden h-auto w-full md:block"
              sizes="100vw"
            />
            <ImageWithSkeleton
              src={`/images/symphony5/stransit-1-fn-mobile-new.png`}
              alt="Kết nối giao thông"
              width={790}
              height={790}
              className="mx-auto h-auto w-full max-w-md md:hidden"
            />
          </div>
        </div>
      </div>
    </section>
  );
}