export type PortfolioItem = {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  imageAlt: string;
  layout: "large" | "small" | "tall" | "medium";
  propertySlug: string;
  routePrefix?: "projects" | "properties";
  status?: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "obsidian",
    title: "The Obsidian Pavilion",
    location: "Reykjavik, IS",
    description:
      "A sculptural black-glass residence set against volcanic basalt, where Nordic light meets uncompromising modern form.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    imageAlt: "Angular modern pavilion at dusk",
    layout: "large",
    propertySlug: "wyndham-soleil-danang",
  },
  {
    id: "azure",
    title: "The Legend Đà Nẵng",
    location: "Đà Nẵng, Vietnam",
    description:
      "Biểu tượng thượng lưu với vị trí đắc địa tại sông Hàn, thiết kế hiện đại, và tiện ích đẳng cấp 5 sao.",
    image:
      "https://thelegendcity.com/wp-content/uploads/2026/01/vi-tri-the-legend-da-nang-4-2048x1118-1-1.png",
    imageAlt: "The Legend Đà Nẵng - Strategic location on Han River",
    layout: "small",
    propertySlug: "the-legend-danang",
    routePrefix: "projects",
    status: "Đang Mở Bán",
  },
  {
    id: "zenith",
    title: "The Zenith Tower",
    location: "Singapore",
    description:
      "A vertical landmark of textured bronze and glass, redefining skyline living in the heart of Marina Bay.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    imageAlt: "Skyscraper facade against sunset sky",
    layout: "tall",
    propertySlug: "s-light-tower",
    routePrefix: "projects",
  },
];

export const featuredDevelopment = {
  label: "Featured Development",
  title: "The Ethereal Atrium",
  description:
    "Our flagship mixed-use development in London pairs a soaring glass atrium with private residences, Michelin-star dining, and a members-only wellness pavilion — architecture conceived as living sculpture.",
  image:
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80",
  imageAlt: "Grand interior with flowing white ceiling",
};
