import Image from "next/image";
import { ProjectLeadForm } from "./ProjectLeadForm";

const cards = [
  {
    icon: "/images/symphony5/view-2.png",
    title: "Tòa căn hộ có tầm view đẹp nhất",
    text: 'Vị trí "khán đài thượng hạng" thưởng thức màn pháo hoa DIFF rực rỡ',
    image: "/images/symphony5/dau-tu-1-fn.png",
  },
  {
    icon: "/images/symphony5/nguoi-toi-song.png",
    title: "Hơn 60% sản phẩm là căn Studio",
    text: "Phù hợp khai thác lưu trú khi lượng khách du lịch và người đến Đà Nẵng sinh sống gia tăng",
    image: "/images/symphony5/dau-tu-2-fn.png",
  },
  {
    icon: "/images/symphony5/gia.png",
    title: "Thị trường cho thuê sôi động",
    text: "Tỷ lệ lấp đầy gần như tuyệt đối — Giá cho thuê khu vực 20–45 triệu đồng/tháng",
    image: "/images/symphony5/dau-tu-3.png",
  },
];

export function SymphonyInvestment() {
  return (
    <section id="dau-tu" className="scroll-mt-24 overflow-hidden bg-gradient-to-b from-[#28589d] via-[#0f437d] to-[#030b3a] py-16 text-white md:py-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-20">
        <div className="mb-10 text-center">
          <Image
            src={`/images/symphony5/San-pham-dau-tu-dong-tien-hap-dan-new-1.png`}
            alt="Sản phẩm đầu tư dòng tiền"
            width={600}
            height={132}
            className="mx-auto h-auto w-full max-w-lg"
          />
          <p className="mt-4 font-serif text-[#fcdd8b] md:text-lg">
            Doanh thu 20–45 triệu đồng/tháng
          </p>
        </div>

        <div className="mb-12 grid gap-8 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-2xl border border-white/30 bg-gradient-to-b from-white/20 to-white/5"
            >
              <div className="p-6 text-center">
                <Image
                  src={card.icon}
                  alt=""
                  width={50}
                  height={50}
                  className="mx-auto mb-4 h-12 w-12 object-contain"
                />
                <p className="text-sm leading-relaxed text-white/95">{card.text}</p>
              </div>
              <div className="relative aspect-square">
                <Image src={card.image} alt={card.title} fill className="object-cover" sizes="33vw" />
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <p className="mb-6 font-serif text-[#fcdd8b] md:text-lg">
            Nhận chi tiết tài liệu phân tích đầu tư hấp dẫn của Sun Symphony Residence 5
          </p>
          <ProjectLeadForm variant="dark" className="mx-auto max-w-4xl" />
        </div>
      </div>
    </section>
  );
}