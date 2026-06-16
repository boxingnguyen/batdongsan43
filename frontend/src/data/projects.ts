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
