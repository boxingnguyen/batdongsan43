import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { StrapiMedia } from "@/types/strapi";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") ??
  "http://localhost:1337";

/** Resolve absolute media URL from Strapi */
export function getStrapiMediaUrl(media?: StrapiMedia | null): string | null {
  if (!media?.url) return null;
  if (media.url.startsWith("http")) return media.url;
  return `${STRAPI_URL}${media.url}`;
}

export function formatPrice(value: number, status?: string): string {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
  return status === "for-rent" ? `${formatted}/mo` : formatted;
}

export function formatStatus(status: string): string {
  return status.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function formatPropertyType(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

/** Flatten Strapi blocks to plain text for excerpts */
export function blocksToPlainText(
  blocks?: { type: string; children?: { text?: string }[] }[] | null
): string {
  if (!blocks?.length) return "";
  return blocks
    .flatMap((block) =>
      (block.children ?? []).map((child) => child.text ?? "").join("")
    )
    .join("\n")
    .trim();
}
