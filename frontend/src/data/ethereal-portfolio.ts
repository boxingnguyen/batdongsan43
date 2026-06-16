export type PortfolioItem = {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  imageAlt: string;
  layout: "large" | "small" | "tall" | "medium";
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
  },
  {
    id: "azure",
    title: "Azure Bay Residences",
    location: "Amalfi Coast, IT",
    description:
      "Terraced villas overlooking limestone cliffs and cobalt waters — a study in Mediterranean restraint.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    imageAlt: "Coastal cliffs and blue water",
    layout: "small",
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
