import { NavLinks } from "@/types/navlink";

export const navLinks1: NavLinks[] = [
  { key: "introduction", href: "/introduction" },
  { key: "connection", href: "/connection" },
  { key: "partners", href: "/partners" },
  { key: "facility", href: "/facility" },
];

export const navLinks2: NavLinks[] = [
  { key: "apartment", href: "/apartment" },
  {
    key: "news",
    href: "/news",
    children: [{ key: "media", href: "/media" }],
  },
  { key: "gallery", href: "/gallery" },
  { key: "contactUs", href: "/contact-us" },
];
