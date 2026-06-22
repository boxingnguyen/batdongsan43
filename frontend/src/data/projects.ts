export type Project = {
  id: string;
  slug: string;
  title: string;
  location: string;
  description: string;
  image: string;
  imageAlt: string;
  status: string;
};

export const projects: Project[] = [
  {
    id: "s-light-tower",
    slug: "s-light-tower",
    title: "S-Light Tower",
    location: "Nam Đà Nẵng, Việt Nam",
    description:
      "Tháp đôi biểu tượng 22 tầng tại ngã tư Nguyễn Đình Thi - 29/3, thuộc đại đô thị Sun NeO City. Gần 800 căn hộ với tầm nhìn 360° sông Hàn - biển - pháo hoa DIFF, pháp lý lâu dài.",
    image:
      "https://sun-ecommerce-cdn.azureedge.net/ecommerce/service-sites/asset/SunGroup/google_docs_media/news/news-11394/AD_4nXdNKTDV0B3tTY9UW2Gx1_6zuS-RHUjYOFnTq3xCu0pM0RZgiIldfjj_Cj-mSuSBMJNgD0nHylc4OtB8ZH4Gwnbn0TbKfP36-I1AThLqkt9cOY13uYnsJWFu4ONIhtFMTxzVxvkq-ZcZcGmkHDkns33lh8ssVbbLw9lq-CgsfNzyFCrR2hhZ6Mc%3Ds2048.jpg",
    imageAlt: "S-Light Tower - Tháp đôi biểu tượng tại mặt sông Hàn Nam Đà Nẵng",
    status: "Đang mở bán",
  },
  {
    id: "symphony5",
    slug: "symphony5",
    title: "Sun Symphony Residence 5",
    location: "Đà Nẵng, Việt Nam",
    description:
      "Cao 31 tầng với 1.228 căn hộ cao cấp nằm trong tổ hợp Sun Symphony Residence, đường Trần Hưng Đạo — biểu tượng mới của kiến trúc ven sông Hàn.",
    image: "https://dongtayland.vn/wp-content/uploads/2026/05/hero-12-5.jpg",
    imageAlt: "Sun Symphony Residence 5",
    status: "Đang mở bán",
  },
  {
    id: "wyndham-soleil-danang",
    slug: "wyndham-soleil-danang",
    title: "Wyndham Soleil Đà Nẵng",
    location: "Đà Nẵng, Việt Nam",
    description:
      "The Soleil Đà Nẵng – biểu tượng sống và đầu tư bên bờ biển Mỹ Khê, sở hữu vị trí kim cương 4 mặt tiền hiếm có. Tổ hợp căn hộ khách sạn hạng sang với hệ tiện ích chuẩn 5 sao và vận hành quốc tế. Kiệt tác dành cho những chủ nhân tìm kiếm giá trị nghỉ dưỡng, dòng tiền và tiềm năng gia tăng tài sản.",
    image: "/images/home/banner-1.jpg",
    imageAlt: "Wyndham Soleil Danang beachfront",
    status: "Đang mở bán",
  },
  {
    id: "sun-fours-tower",
    slug: "sun-fours-tower",
    title: "Sun FourS Tower Đà Nẵng",
    location: "Đà Nẵng, Việt Nam",
    description:
      "4 tháp căn hộ 20 tầng tại trung tâm phía Nam Đà Nẵng, tổ hợp Sun Riverpolis. 1.281 căn hộ với kính cong panorama, hồ bơi 4 mùa, tiện ích all-in-tower. Chỉ từ 1,5 tỷ.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    imageAlt: "Sun FourS Tower Đà Nẵng căn hộ phía Nam",
    status: "Đang mở bán",
  },
  {
    id: "the-legend-danang",
    slug: "the-legend-danang",
    title: "The Legend Da Nang",
    location: "Amalfi Coast, IT",
    description:
      "Terraced villas overlooking limestone cliffs and cobalt waters — a study in Mediterranean restraint.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    imageAlt: "Coastal cliffs and blue water",
    status: "Coming Soon",
  },
  {
    id: "the-zenith-tower",
    slug: "the-zenith-tower",
    title: "The Zenith Tower",
    location: "Singapore",
    description:
      "A vertical landmark of textured bronze and glass, redefining skyline living in the heart of Marina Bay.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    imageAlt: "Skyscraper facade against sunset sky",
    status: "For Sale",
  },
];
