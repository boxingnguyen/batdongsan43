import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";

const highlights = [
  { time: "2 phút", text: "Đường dạo bộ sông Hàn, bến du thuyền và trung tâm tài chính quốc tế" },
  { time: "5–10 phút", text: "DIFF, biển Mỹ Khê, cầu Rồng, trung tâm hành chính" },
  { time: "15 phút", text: "Sân bay Đà Nẵng, Đà Nẵng Downtown" },
  { time: "20–45 phút", text: "Ngũ Hành Sơn, Sơn Trà, Bà Nà Hills, phố cổ Hội An" },
];

const future = [
  "Đề án “Dòng sông ánh sáng”: biến sông Hàn thành “Vịnh ánh sáng”",
  "Cảng du lịch Thọ Quang: chuyển đổi từ cảng cá sang du lịch thương mại ven biển",
  "Hầm vượt sông Hàn: tăng cường kết nối hai bờ sông",
];

export function SymphonyLocation() {
  return (
    <section id="vi-tri" className="scroll-mt-24 bg-[#f9f9f9] pb-16 md:pb-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-20">
        <div className="mb-10 text-center">
          <ImageWithSkeleton
            src={`/images/symphony5/Bieu-tuong-dat-gia-ben-bo-song-Han-new-2.png`}
            alt="Vị trí bên sông Hàn"
            width={600}
            height={132}
            className="mx-auto h-auto w-full max-w-lg"
          />
        </div>

        <div className="mb-12 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-6 text-[#4e453e]">
              Tọa lạc tại vị trí &ldquo;vàng&rdquo; trên quỹ đất ven sông Hàn gần như cuối cùng ở trung
              tâm thành phố, Sun Symphony 5 sở hữu khả năng kết nối thuận tiện đến các biểu tượng du
              lịch của Đà Nẵng:
            </p>
            <ul className="space-y-4">
              {highlights.map((item) => (
                <li key={item.time} className="flex gap-2 text-[#4e453e]">
                  <span className="shrink-0 text-[#fcdd8b]">✦</span>
                  <span>
                    <span className="font-serif text-[#11437a]">{item.time}:</span> {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-[#f5ecb0] to-[#ce9e51] p-6 md:p-8">
            <h3 className="mb-4 font-serif text-lg text-[#11437a]">
              Nhận nhà 2028, đón đầu sự hoàn thiện của các công trình biểu tượng
            </h3>
            <ul className="space-y-3 text-sm text-[#333] md:text-base">
              {future.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-[#11437a]">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-12 overflow-hidden rounded-2xl">
          <ImageWithSkeleton
            src={`/images/symphony5/MAP-moi_.jpg`}
            alt="Bản đồ vị trí"
            width={1600}
            height={800}
            className="hidden h-auto w-full md:block"
            sizes="100vw"
          />
          <ImageWithSkeleton
            src={`/images/symphony5/MAP-moi-mobile.jpg`}
            alt="Bản đồ vị trí"
            width={1209}
            height={1615}
            className="mx-auto h-auto w-full max-w-md md:hidden"
          />
        </div>

      </div>
    </section>
  );
}