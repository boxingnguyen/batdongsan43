/** Strapi v5 REST envelope */
export interface StrapiResponse<T> {
  data: T;
  meta?: StrapiPaginationMeta;
}

export interface StrapiListResponse<T> {
  data: T[];
  meta?: StrapiPaginationMeta;
}

export interface StrapiPaginationMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiMediaFormat {
  url: string;
  width?: number;
  height?: number;
}

export interface StrapiMedia {
  id: number;
  documentId?: string;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
}

export type PropertyStatus = "for-sale" | "for-rent" | "sold";
export type PropertyType = "house" | "apartment" | "condo" | "land";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Agent {
  id: number;
  documentId?: string;
  name: string;
  role?: string | null;
  email: string;
  phone?: string | null;
  avatar?: StrapiMedia | null;
  properties?: Property[];
}

export interface Property {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  description?: StrapiBlock[] | null;
  price: number;
  status: PropertyStatus;
  property_type: PropertyType;
  bedrooms?: number | null;
  bathrooms?: number | null;
  area_sqft?: number | null;
  featured_image?: StrapiMedia | null;
  gallery?: StrapiMedia[] | null;
  address?: string | null;
  city?: string | null;
  coordinates?: Coordinates | null;
  agent?: Agent | null;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string | null;
}

/** Strapi Blocks (simplified) */
export interface StrapiBlock {
  type: string;
  children?: { type: string; text?: string }[];
  [key: string]: unknown;
}

export interface PropertyFilters {
  search?: string;
  property_type?: PropertyType | "";
  status?: PropertyStatus | "";
  maxPrice?: number;
  city?: string;
}
