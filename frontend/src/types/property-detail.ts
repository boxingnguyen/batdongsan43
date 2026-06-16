export type PropertyDetailImage = {
  src: string;
  alt: string;
  layout: "main" | "secondary";
};

export type PropertyDetailAmenity = {
  icon: string;
  title: string;
  subtitle: string;
};

export type PropertyDetailContent = {
  slug: string;
  title: string;
  price: number;
  monthlyEstimate: string;
  beds: string;
  baths: string;
  sqft: string;
  location: string;
  badge?: string;
  description: string[];
  amenities: PropertyDetailAmenity[];
  images: PropertyDetailImage[];
  galleryCount?: number;
  marketYoY: string;
  agent: {
    name: string;
    title: string;
    image: string;
  };
};
