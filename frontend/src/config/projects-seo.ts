import type { ProjectSEO } from "@/lib/seo";
import { SITE_NAME } from "@/config/site";

export const projectsSEO: ProjectSEO[] = [
  {
    slug: "s-light-tower",
    title: "S-Light Tower Đà Nẵng | Căn Hộ View Sông Hàn 270° – Sun NeO City",
    description:
      "S-Light Tower – tháp đôi Sun NeO City, Nam Đà Nẵng. 396 căn, view sông Hàn 3 mặt, sở hữu lâu dài. Mở bán đợt 1.",
    keywords: [
      // ── Từ khóa chính (thương hiệu) ──
      "S-Light Tower",
      "S Light Tower Đà Nẵng",
      "S-Light Tower Sun Group",
      "S-Light Tower Sun NeO City",

      // ── Từ khóa địa phương ──
      "căn hộ Nam Đà Nẵng",
      "căn hộ Sun Group Đà Nẵng",
      "căn hộ Hòa Xuân Đà Nẵng",
      "căn hộ view sông Hàn Đà Nẵng",
      "căn hộ mặt sông Hàn Đà Nẵng",

      // ── Từ khóa dài – Ý định mua ──
      "căn hộ sở hữu lâu dài Đà Nẵng",
      "căn hộ mặt sông Hàn mở bán đợt 1",
      "mua căn hộ view sông Hàn Đà Nẵng",
      "đầu tư căn hộ Sun Group Đà Nẵng",

      // ── Từ khóa câu hỏi – 5W1H ──
      "S-Light Tower giá bao nhiêu",
      "S-Light Tower mở bán",
      "S-Light Tower bàn giao năm nào",
      "S-Light Tower có đáng mua không",
      "S-Light Tower pháp lý như thế nào",
      "căn hộ Sun NeO City giá bao nhiêu",

      // ── Từ khóa tính từ ──
      "căn hộ view sông Hàn đẹp nhất Đà Nẵng",
      "căn hộ cao cấp Nam Đà Nẵng tốt nhất",

      // ── Từ khóa thương hiệu CĐT ──
      "Sun Property Đà Nẵng",
      "Sun Group căn hộ Đà Nẵng",

      // ── Từ khóa năm ──
      "căn hộ Đà Nẵng 2026 2027 2028 2029",
    ],
    og: {
      title: "S-Light Tower – Căn Hộ Mặt Sông Hàn Hiếm Nhất Đà Nẵng",
      description:
        "Mở bán đợt 1 · 396 căn · Sở hữu lâu dài · Từ CĐT Sun Group. Tầm nhìn 270° sông Hàn – booking chỉ 50 triệu.",
      image: "/images/slight_images/slight4.jpg",
      imageAlt: "S-Light Tower – tháp đôi biểu tượng mặt sông Hàn Nam Đà Nẵng",
    },
    jsonLd: {
      name: "S-Light Tower",
      description:
        "Tháp đôi biểu tượng tại Sun NeO City, Nam Đà Nẵng. 396 căn/tòa, view sông Hàn 3 mặt, pháp lý sở hữu lâu dài.",
      streetAddress: "Nguyễn Đình Thi - 29/3",
      locality: "Hòa Xuân",
      numberOfUnits: 396,
      geo: { lat: 15.9896, lng: 108.2208 },
      amenities: ["Hồ bơi", "Gym & Spa", "Kids Club", "Shophouse", "An ninh 24/7"],
      seller: "Sun Property – Sun Group",
      priceDescription: "Booking đợt 1 từ 50 triệu đồng",
    },
    faq: [
      {
        question: "S-Light Tower giá bao nhiêu?",
        answer:
          "S-Light Tower có mức booking đợt 1 chỉ từ 50 triệu đồng. Đây là tháp đôi thuộc khu đô thị Sun NeO City, Nam Đà Nẵng với 396 căn/tòa. Liên hệ để nhận bảng giá chi tiết và chính sách thanh toán ưu đãi từ CĐT Sun Group.",
      },
      {
        question: "S-Light Tower bàn giao năm nào?",
        answer:
          "S-Light Tower đang trong giai đoạn mở bán đợt 1. Tiến độ bàn giao theo kế hoạch của Sun Group tại dự án Sun NeO City, Nam Đà Nẵng. Liên hệ tư vấn để nhận thông tin tiến độ mới nhất.",
      },
      {
        question: "Vị trí S-Light Tower ở đâu?",
        answer:
          "S-Light Tower tọa lạc tại đường Nguyễn Đình Thi, khu đô thị Sun NeO City, quận Hòa Xuân, Nam Đà Nẵng. Dự án sở hữu tầm nhìn 270° sông Hàn hiếm có – một trong những vị trí đắc địa nhất phía Nam thành phố.",
      },
      {
        question: "S-Light Tower có sở hữu lâu dài không?",
        answer:
          "S-Light Tower có pháp lý sở hữu lâu dài (sổ hồng vĩnh viễn). Đây là điểm khác biệt lớn so với nhiều dự án condotel chỉ sở hữu 50 năm tại Đà Nẵng.",
      },
      {
        question: "Chủ đầu tư S-Light Tower là ai?",
        answer:
          "S-Light Tower do Sun Group phát triển thông qua đơn vị Sun Property. Sun Group là tập đoàn BĐS hàng đầu Việt Nam với hàng chục dự án biểu tượng tại Đà Nẵng, Phú Quốc và Hạ Long.",
      },
      {
        question: "S-Light Tower có đáng mua để đầu tư không?",
        answer:
          "S-Light Tower là cơ hội đầu tư tiềm năng vì: (1) Vị trí mặt sông Hàn hiếm có – tầm nhìn 270°; (2) Thương hiệu Sun Group uy tín; (3) Sở hữu lâu dài – giá trị tài sản tăng theo thời gian; (4) Booking đợt 1 giá tốt nhất trước khi tăng giá.",
      },
    ],
  },
  {
    slug: "sun-fours-tower",
    title: "Sun FourS Tower Đà Nẵng | Căn Hộ Kính Cong Panorama – Sun Riverpolis",
    description:
      "Sun FourS Tower – 4 tháp căn hộ cao cấp tại Sun Riverpolis, phía Nam Đà Nẵng. 1.281 căn hộ, kính cong panorama, hồ bơi 4 mùa. Pháp lý sở hữu lâu dài. Đăng ký nhận bảng giá.",
    keywords: [
      // ── Từ khóa chính (thương hiệu) ──
      "Sun FourS Tower",
      "Sun Fours Tower Đà Nẵng",
      "Sun Riverpolis căn hộ",
      "Sun FourS Tower Sun Group",

      // ── Từ khóa địa phương ──
      "căn hộ phía Nam Đà Nẵng",
      "căn hộ Sun Group phía Nam",
      "căn hộ Ngũ Hành Sơn Đà Nẵng",
      "căn hộ kính cong panorama Đà Nẵng",

      // ── Từ khóa dài – Ý định mua ──
      "căn hộ hồ bơi 4 mùa Đà Nẵng",
      "căn hộ sở hữu lâu dài Đà Nẵng",
      "mua căn hộ Nam Đà Nẵng giá tốt",
      "đầu tư căn hộ Sun Riverpolis",

      // ── Từ khóa câu hỏi – 5W1H ──
      "Sun FourS Tower giá bao nhiêu",
      "Sun FourS Tower bàn giao năm nào",
      "Sun FourS Tower có đáng mua không",
      "Sun FourS Tower pháp lý như thế nào",
      "Sun Riverpolis căn hộ giá bao nhiêu",

      // ── Từ khóa tính từ ──
      "căn hộ cao cấp nhất phía Nam Đà Nẵng",
      "căn hộ kính cong đẹp nhất Đà Nẵng",

      // ── Từ khóa thương hiệu CĐT ──
      "Sun Property Đà Nẵng",

      // ── Từ khóa năm ──
      "căn hộ Đà Nẵng 2027 2028",
    ],
    og: {
      title: "Sun FourS Tower – Kính Cong Panorama Tại Nam Đà Nẵng",
      description:
        "4 tháp · 1.281 căn · Hồ bơi 4 mùa · Sở hữu lâu dài. Từ CĐT Sun Group tại Sun Riverpolis.",
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
      imageAlt: "Sun FourS Tower – căn hộ kính cong panorama phía Nam Đà Nẵng",
    },
    jsonLd: {
      name: "Sun FourS Tower",
      description:
        "4 tháp căn hộ cao cấp tại Sun Riverpolis, phía Nam Đà Nẵng. 1.281 căn hộ, kính cong panorama, hồ bơi 4 mùa.",
      streetAddress: "Sun Riverpolis, Ngũ Hành Sơn",
      locality: "Ngũ Hành Sơn",
      numberOfUnits: 1281,
      geo: { lat: 15.9653, lng: 108.2372 },
      amenities: ["Hồ bơi 4 mùa", "Gym & Spa & Yoga", "Shophouse thương mại", "Khu vui chơi trẻ em", "An ninh 24/7"],
      seller: "Sun Property – Sun Group",
    },
    faq: [
      {
        question: "Sun FourS Tower giá bao nhiêu?",
        answer:
          "Sun FourS Tower có mức giá cạnh tranh cho phân khúc căn hộ cao cấp phía Nam Đà Nẵng tại khu đô thị Sun Riverpolis. Dự án gồm 1.281 căn hộ với thiết kế kính cong panorama độc đáo. Liên hệ để nhận bảng giá mới nhất từ CĐT Sun Group.",
      },
      {
        question: "Vị trí Sun FourS Tower ở đâu?",
        answer:
          "Sun FourS Tower nằm trong khu đô thị Sun Riverpolis, quận Ngũ Hành Sơn, phía Nam TP Đà Nẵng. Đây là khu vực đang phát triển mạnh với hạ tầng đồng bộ và tiện ích đầy đủ.",
      },
      {
        question: "Sun FourS Tower có sở hữu lâu dài không?",
        answer:
          "Sun FourS Tower có pháp lý sở hữu lâu dài (sổ hồng vĩnh viễn) do CĐT Sun Group phát triển. Đây là điểm lợi thế lớn, phù hợp để ở lâu dài và gia tăng giá trị tài sản.",
      },
      {
        question: "Sun FourS Tower có những tiện ích gì?",
        answer:
          "Sun FourS Tower sở hữu hệ tiện ích cao cấp gồm: Hồ bơi 4 mùa trong nhà, Gym & Spa & Yoga, Shophouse thương mại, Khu vui chơi trẻ em và hệ thống an ninh 24/7. Thiết kế kính cong panorama tạo tầm nhìn rộng mở.",
      },
      {
        question: "Sun FourS Tower có đáng mua để đầu tư không?",
        answer:
          "Sun FourS Tower là lựa chọn đầu tư tiềm năng vì: (1) Quy mô lớn – 4 tháp, 1.281 căn trong cộng đồng Sun Riverpolis sầm uất; (2) Thiết kế kính cong panorama độc đáo; (3) Hồ bơi 4 mùa hiếm có; (4) Thương hiệu Sun Group uy tín và sở hữu lâu dài.",
      },
    ],
  },
  {
    slug: "symphony5",
    title: "Sun Symphony Residence 5 Đà Nẵng | View Sông Hàn – Pháo Hoa – Biển",
    description:
      "Sun Symphony Residence 5 – căn hộ hiếm sở hữu bộ tứ tầm view: Sông Hàn, pháo hoa DIFF, biển và núi. Đầu tư dòng tiền và second home tại Đà Nẵng. Đăng ký nhận thông tin.",
    keywords: [
      // ── Từ khóa chính (thương hiệu) ──
      "Sun Symphony Residence 5",
      "Symphony 5 Đà Nẵng",
      "Sun Symphony Đà Nẵng",

      // ── Từ khóa địa phương ──
      "căn hộ view sông Hàn pháo hoa Đà Nẵng",
      "căn hộ view 4 hướng Đà Nẵng",
      "căn hộ trung tâm Đà Nẵng view pháo hoa",

      // ── Từ khóa dài – Ý định mua ──
      "second home Đà Nẵng",
      "căn hộ đầu tư dòng tiền Đà Nẵng",
      "mua căn hộ view sông Hàn pháo hoa DIFF",
      "đầu tư second home Đà Nẵng sinh lời",

      // ── Từ khóa câu hỏi – 5W1H ──
      "Symphony Residence 5 giá bao nhiêu",
      "Symphony 5 bàn giao năm nào",
      "Symphony 5 có đáng mua không",
      "căn hộ view pháo hoa DIFF Đà Nẵng giá bao nhiêu",
      "nên mua second home Đà Nẵng ở đâu",

      // ── Từ khóa tính từ ──
      "căn hộ view đẹp nhất Đà Nẵng",
      "second home tốt nhất Đà Nẵng",
      "căn hộ đầu tư sinh lời cao Đà Nẵng",

      // ── Từ khóa mùa vụ / sự kiện ──
      "căn hộ view pháo hoa DIFF 2027",
      "căn hộ Đà Nẵng mùa pháo hoa",
    ],
    og: {
      title: "Sun Symphony Residence 5 – Bộ Tứ View Độc Nhất Đà Nẵng",
      description:
        "View Sông Hàn · Pháo hoa DIFF · Biển · Núi. Second home và đầu tư dòng tiền bậc nhất Đà Nẵng.",
      image: "https://dongtayland.vn/wp-content/uploads/2026/05/hero-12-5.jpg",
      imageAlt: "Sun Symphony Residence 5 – view sông Hàn và pháo hoa Đà Nẵng",
    },
    jsonLd: {
      name: "Sun Symphony Residence 5",
      description:
        "Căn hộ hiếm sở hữu bộ tứ tầm view Sông Hàn, pháo hoa, biển và núi tại Đà Nẵng.",
      streetAddress: "Đà Nẵng",
      locality: "Đà Nẵng",
      geo: { lat: 16.0544, lng: 108.2022 },
      amenities: ["Hồ bơi", "Gym", "View sông Hàn", "View pháo hoa DIFF"],
      seller: "Duyên Hải Holding",
    },
    faq: [
      {
        question: "Sun Symphony Residence 5 giá bao nhiêu?",
        answer:
          "Sun Symphony Residence 5 có mức giá thuộc phân khúc căn hộ cao cấp tại trung tâm Đà Nẵng với tầm nhìn bộ tứ hiếm có. Liên hệ đội ngũ tư vấn để nhận bảng giá chi tiết và chính sách ưu đãi mới nhất từ Duyên Hải Holding.",
      },
      {
        question: "Vị trí Sun Symphony Residence 5 ở đâu?",
        answer:
          "Sun Symphony Residence 5 tọa lạc tại trung tâm TP Đà Nẵng, sở hữu tầm nhìn bộ tứ độc quyền: Sông Hàn, pháo hoa DIFF, biển Đà Nẵng và núi Sơn Trà – một vị trí cực kỳ hiếm gặp tại Đà Nẵng.",
      },
      {
        question: "Symphony 5 có view gì đặc biệt?",
        answer:
          "Sun Symphony Residence 5 sở hữu bộ tứ tầm view độc nhất Đà Nẵng: (1) View Sông Hàn thơ mộng; (2) View pháo hoa DIFF hàng năm trực tiếp từ căn hộ; (3) View biển Đà Nẵng xanh mát; (4) View núi Sơn Trà hùng vĩ – không dự án nào tại Đà Nẵng có cùng lúc 4 view này.",
      },
      {
        question: "Symphony 5 có phù hợp để làm second home không?",
        answer:
          "Sun Symphony Residence 5 là lựa chọn lý tưởng cho second home tại Đà Nẵng vì: Vị trí trung tâm, tầm nhìn 4 hướng đặc biệt, cho thuê nghỉ dưỡng sinh lời cao, và không khí biển – sông – núi thư giãn. Đây cũng là kênh đầu tư dòng tiền ổn định.",
      },
      {
        question: "Chủ đầu tư Symphony Residence 5 là ai?",
        answer:
          "Sun Symphony Residence 5 do Duyên Hải Holding phát triển và phân phối. Đơn vị này có uy tín trong lĩnh vực bất động sản cao cấp tại Đà Nẵng với nhiều dự án thành công.",
      },
    ],
  },
  {
    slug: "the-legend-danang",
    title: "The Legend Đà Nẵng | ROX Signature – Hyde Hotels · Cầu Rồng",
    description:
      "The Legend Đà Nẵng ROX Signature – tổ hợp khách sạn Hyde Hotels 5 sao (Accor) và căn hộ cao cấp tại A20 Võ Văn Kiệt, sát Cầu Rồng. CĐT Vipico · CBRE · Bàn giao Q1/2028. Đăng ký nhận tư vấn.",
    keywords: [
      // ── Từ khóa chính (thương hiệu) ──
      "The Legend Đà Nẵng",
      "The Legend ROX Signature",
      "Hyde Hotels Đà Nẵng",
      "ROX Signature Đà Nẵng",

      // ── Từ khóa địa phương ──
      "căn hộ Cầu Rồng Đà Nẵng",
      "căn hộ cao cấp An Hải Đà Nẵng",
      "căn hộ Võ Văn Kiệt Đà Nẵng",
      "Vipico Đà Nẵng",

      // ── Từ khóa dài – Ý định mua ──
      "căn hộ khách sạn Đà Nẵng 2028",
      "bất động sản hạng sang Đà Nẵng",
      "đầu tư căn hộ Đà Nẵng",
      "mua căn hộ sát Cầu Rồng Đà Nẵng",
      "căn hộ Hyde Hotels Đà Nẵng mua ở đâu",

      // ── Từ khóa câu hỏi – 5W1H ──
      "The Legend Đà Nẵng giá bao nhiêu",
      "The Legend ROX Signature bàn giao năm nào",
      "The Legend Đà Nẵng có đáng mua không",
      "Hyde Hotels Đà Nẵng giá như thế nào",
      "Vipico Đà Nẵng dự án nào",

      // ── Từ khóa tính từ ──
      "căn hộ hạng sang nhất Đà Nẵng",
      "dự án bất động sản cao cấp nhất Đà Nẵng 2027",
      "căn hộ khách sạn 5 sao Đà Nẵng tốt nhất",

      // ── Từ khóa năm ──
      "căn hộ Đà Nẵng bàn giao Q1 2028",
    ],
    og: {
      title: "The Legend Đà Nẵng – Biểu Tượng Tương Lai, Xứng Tầm Huyền Thoại",
      description:
        "Hyde Hotels 5 sao · CBRE tư vấn · Sát Cầu Rồng · Bàn giao Q1/2028. CĐT Vipico.",
      image: "/images/legend_images/Cover-website-1.jpg",
      imageAlt: "The Legend Đà Nẵng ROX Signature – tổ hợp Hyde Hotels và căn hộ cao cấp sát Cầu Rồng",
    },
    jsonLd: {
      name: "The Legend Đà Nẵng · ROX Signature",
      description:
        "Tổ hợp khách sạn Hyde Hotels 5 sao (Accor) và căn hộ cao cấp tại lõi đô thị Đà Nẵng, sát Cầu Rồng. CĐT Vipico, tư vấn vận hành CBRE.",
      streetAddress: "A20 Võ Văn Kiệt",
      locality: "An Hải",
      geo: { lat: 16.0614, lng: 108.2275 },
      amenities: ["Season Pool", "Gym & Wellness", "Spa & Ozone", "Business Lounge", "Kidzone", "An ninh 24/7"],
      seller: "Vipico",
    },
    faq: [
      {
        question: "The Legend Đà Nẵng giá bao nhiêu?",
        answer:
          "The Legend Đà Nẵng ROX Signature thuộc phân khúc bất động sản hạng sang tại Đà Nẵng, tích hợp khách sạn Hyde Hotels 5 sao (Accor). Liên hệ đội ngũ CBRE – đơn vị tư vấn chính thức – để nhận bảng giá và chính sách đầu tư mới nhất từ CĐT Vipico.",
      },
      {
        question: "The Legend Đà Nẵng bàn giao năm nào?",
        answer:
          "The Legend Đà Nẵng ROX Signature dự kiến bàn giao Quý I/2028. Dự án đang được xây dựng theo tiêu chuẩn khách sạn 5 sao Accor với sự tư vấn vận hành của CBRE.",
      },
      {
        question: "Vị trí The Legend Đà Nẵng ở đâu?",
        answer:
          "The Legend Đà Nẵng tọa lạc tại A20 Võ Văn Kiệt, phường An Hải Bắc, quận Sơn Trà – sát cạnh Cầu Rồng biểu tượng của Đà Nẵng. Đây là một trong những vị trí trung tâm và đắc địa nhất TP Đà Nẵng.",
      },
      {
        question: "Chủ đầu tư The Legend Đà Nẵng là ai?",
        answer:
          "The Legend Đà Nẵng do Vipico làm chủ đầu tư. Đơn vị vận hành là Hyde Hotels (thuộc tập đoàn Accor – một trong những tập đoàn khách sạn lớn nhất thế giới). CBRE đảm nhận tư vấn vận hành và quản lý dự án.",
      },
      {
        question: "The Legend Đà Nẵng có đáng mua để đầu tư không?",
        answer:
          "The Legend Đà Nẵng ROX Signature là cơ hội đầu tư bất động sản hạng sang hiếm có vì: (1) Vị trí kim cương – sát Cầu Rồng, trung tâm TP; (2) Thương hiệu khách sạn Hyde Hotels 5 sao (Accor) uy tín quốc tế; (3) Tư vấn vận hành bởi CBRE – chuyên nghiệp; (4) Dòng tiền cho thuê nghỉ dưỡng cao từ khách quốc tế.",
      },
      {
        question: "The Legend Đà Nẵng có những tiện ích gì?",
        answer:
          "The Legend Đà Nẵng tích hợp hệ tiện ích khách sạn 5 sao: Season Pool (hồ bơi 4 mùa), Gym & Wellness center, Spa & Ozone trị liệu, Business Lounge cao cấp, Kidzone vui chơi trẻ em và hệ thống an ninh 24/7 theo chuẩn Accor.",
      },
    ],
  },
  {
    slug: "camellia",
    title: "The Camellia Sơn Trà Đà Nẵng | Căn Hộ Biển Sở Hữu Lâu Dài – Luxury Urban Nature Residence",
    description:
      "The Camellia Sơn Trà – Luxury Urban Nature Residence tại Đà Nẵng. 469 căn hộ biển sở hữu lâu dài, nơi Rừng Phố Biển gặp gỡ. CĐT Thành Lâm · MBLand Holding. Bàn giao Q1/2028.",
    keywords: [
      // ── Từ khóa chính (thương hiệu) ──
      "The Camellia Sơn Trà",
      "The Camellia Sơn Trà Đà Nẵng",
      "The Camellia Da Nang",
      "Camellia Đà Nẵng",

      // ── Từ khóa địa phương (dễ leo top) ──
      "căn hộ Sơn Trà Đà Nẵng",
      "căn hộ biển Sơn Trà",
      "căn hộ phường Sơn Trà Đà Nẵng",
      "căn hộ Lê Văn Lương Đà Nẵng",

      // ── Từ khóa dài – Ý định mua (conversion cao nhất) ──
      "căn hộ biển Đà Nẵng sở hữu lâu dài",
      "mua căn hộ Sơn Trà Đà Nẵng",
      "căn hộ sở hữu lâu dài gần biển Đà Nẵng",
      "second home Đà Nẵng biển Sơn Trà",
      "đầu tư căn hộ biển Sơn Trà Đà Nẵng",

      // ── Từ khóa câu hỏi – 5W1H (Rich Snippets / FAQ) ──
      "The Camellia Sơn Trà giá bao nhiêu",
      "The Camellia Đà Nẵng có đáng mua không",
      "mua căn hộ Sơn Trà nên chọn dự án nào",
      "căn hộ biển Đà Nẵng bao nhiêu tiền",
      "The Camellia bàn giao năm nào",
      "The Camellia pháp lý như thế nào",

      // ── Từ khóa tính từ (tốt nhất, cao cấp nhất) ──
      "căn hộ cao cấp Sơn Trà Đà Nẵng",
      "căn hộ đẹp nhất Sơn Trà Đà Nẵng",
      "dự án bất động sản tốt nhất Đà Nẵng 2027",
      "Luxury Urban Nature Residence Đà Nẵng",

      // ── Từ khóa thương hiệu CĐT ──
      "MBLand Holding Đà Nẵng",
      "Thành Lâm Đà Nẵng căn hộ",
      "WeLand Đà Nẵng",

      // ── Từ khóa mùa vụ / năm ──
      "căn hộ Đà Nẵng bàn giao 2028",
      "căn hộ cao cấp Đà Nẵng 2027 2028",

      // ── Từ khóa loại căn ──
      "studio Sơn Trà Đà Nẵng",
      "căn hộ 2 phòng ngủ Sơn Trà Đà Nẵng",
      "duplex biển Đà Nẵng",
    ],
    og: {
      title: "The Camellia Sơn Trà – Nơi Rừng × Phố × Biển Gặp Gỡ",
      description:
        "469 Residences · Sở hữu lâu dài · Luxury Urban Nature · MBLand Holding. Giao lộ Lê Văn Lương × Lê Đức Thọ, Sơn Trà, Đà Nẵng.",
      image: "/images/camellia/TheCamelliaSTDN_Đào tạo thông tin dự án_page-0016.jpg",
      imageAlt: "The Camellia Sơn Trà Đà Nẵng – Luxury Urban Nature Residence nơi Rừng Phố Biển gặp gỡ",
    },
    jsonLd: {
      name: "The Camellia Sơn Trà",
      description:
        "Luxury Urban Nature Residence tại Sơn Trà, Đà Nẵng. 469 căn hộ biển sở hữu lâu dài. Nơi hội tụ Rừng nguyên sinh Sơn Trà – Biển Mỹ Khê – Trung tâm Đà Nẵng.",
      streetAddress: "Giao lộ Lê Văn Lương × Lê Đức Thọ",
      locality: "Sơn Trà",
      numberOfUnits: 469,
      geo: { lat: 16.0808, lng: 108.2376 },
      amenities: [
        "Indoor Pool",
        "Gym & Yoga & Meditation",
        "Business Lounge & Coworking",
        "Kid Club & Kindergarten",
        "Forest Heart & Sky Garden",
        "An ninh 5 lớp 24/7",
      ],
      seller: "Thành Lâm – MBLand Holding · WeLand",
      priceDescription: "Liên hệ nhận thông tin bảng giá",
    },
    faq: [
      {
        question: "The Camellia Sơn Trà giá bao nhiêu?",
        answer:
          "The Camellia Sơn Trà có mức giá cạnh tranh cho phân khúc căn hộ cao cấp biển Đà Nẵng. Dự án gồm 469 căn hộ với các loại hình Studio, 2BR, 3BR và Duplex. Liên hệ đội ngũ tư vấn để nhận bảng giá chi tiết và chính sách ưu đãi mới nhất từ CĐT Thành Lâm – MBLand Holding.",
      },
      {
        question: "The Camellia Sơn Trà bàn giao năm nào?",
        answer:
          "The Camellia Sơn Trà dự kiến bàn giao Quý I/2028. Dự án đang trong giai đoạn thi công phần thân (tầng 2), đã hoàn thành toàn bộ phần móng ngầm và pháp lý đầy đủ, đủ điều kiện bán nhà ở hình thành trong tương lai.",
      },
      {
        question: "Pháp lý The Camellia Sơn Trà như thế nào? Có sở hữu lâu dài không?",
        answer:
          "The Camellia Sơn Trà có pháp lý sở hữu lâu dài (sổ hồng vĩnh viễn), không phải sở hữu có thời hạn. Dự án đã được cấp phép xây dựng đầy đủ và đủ điều kiện ký hợp đồng mua bán theo quy định pháp luật Việt Nam. Đây là điểm lợi thế lớn so với các dự án resort condotel.",
      },
      {
        question: "Vị trí The Camellia Sơn Trà ở đâu?",
        answer:
          "The Camellia Sơn Trà tọa lạc tại giao lộ Lê Văn Lương và Lê Đức Thọ, phường Sơn Trà, TP Đà Nẵng. Cách biển Mỹ Khê 2 phút, tựa lưng vào bán đảo Sơn Trà, cách trung tâm thành phố 10-12 phút và sân bay Đà Nẵng 20 phút.",
      },
      {
        question: "Chủ đầu tư The Camellia Sơn Trà là ai?",
        answer:
          "Chủ đầu tư The Camellia Sơn Trà là Công ty TNHH Địa ốc Thành Lâm. Đơn vị phát triển và phân phối là MBLand Holding và WeLand – những thương hiệu uy tín trong lĩnh vực bất động sản cao cấp tại Việt Nam.",
      },
      {
        question: "The Camellia Sơn Trà có đáng mua để đầu tư không?",
        answer:
          "The Camellia Sơn Trà là lựa chọn tiềm năng cho đầu tư vì: (1) Vị trí hiếm – tiếp giáp Sơn Trà, biển Mỹ Khê và trung tâm; (2) Sở hữu lâu dài – giá trị tài sản bền vững; (3) Quy mô giới hạn 469 căn – khan hiếm nguồn cung; (4) Thiết kế Wellness cao cấp – phù hợp second home và cho thuê nghỉ dưỡng.",
      },
      {
        question: "The Camellia có những loại căn hộ nào?",
        answer:
          "The Camellia Sơn Trà cung cấp 4 loại hình: Studio (phù hợp đầu tư cho thuê), căn hộ 2 phòng ngủ (2BR), căn hộ 3 phòng ngủ (3BR) và Duplex (căn đặc biệt 2 tầng view biển). Tổng 469 căn hộ và 9 căn thương mại trong 1 tháp 25 tầng.",
      },
    ],
  },
];
export function getSEO(slug: string): ProjectSEO {
  const config = projectsSEO.find((item) => item.slug == slug)
  if (!config) {
    throw new Error(`Không tìm thấy dự án với slug ${slug}`)
  }
  return config
}