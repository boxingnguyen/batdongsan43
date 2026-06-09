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
    image:
      "https://dongtayland.vn/wp-content/uploads/2026/05/hero-12-5.jpg",
    imageAlt: "Sun Symphony Residence 5",
    status: "Đang mở bán",
  },
  {
    id: "wyndham-soleil-danang",
    slug: "wyndham-soleil-danang",
    title: "Wyndham Soleil Đà Nẵng",
    location: "Đà Nẵng, Việt Nam",
    description:
      "A premier beachfront resort with world-class amenities, stunning ocean views, and Vietnamese hospitality excellence.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    imageAlt: "Wyndham Soleil Danang beachfront",
    status: "Đang mở bán",
  },
  {
    id: "azure-bay-residences",
    slug: "azure-bay-residences",
    title: "Azure Bay Residences",
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
  {
    id: "luminary-estate",
    slug: "luminary-estate",
    title: "Luminary Estate",
    location: "Malibu, USA",
    description:
      "Minimal white volumes on a coastal bluff — indoor-outdoor living framed by Pacific horizons.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6162a9a998?w=1000&q=80",
    imageAlt: "Minimal white house on a green hill",
    status: "Sold",
  },
];