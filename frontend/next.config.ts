import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Site is Vietnamese-only: fold old /vi and /en URLs into the canonical ones
  async redirects() {
    return [
      { source: "/:locale(en|vi)", destination: "/", permanent: true },
      { source: "/:locale(en|vi)/:path*", destination: "/:path*", permanent: true },
      // Old public URL of The Soleil project page (indexed) → new slug
      { source: "/projects/wyndham-soleil-danang", destination: "/projects/soleil", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dongtayland.vn",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "thelegendcity.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sundanangcity.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sun-ecommerce-cdn.azureedge.net",
        pathname: "/**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_STRAPI_URL: strapiUrl,
  },
};

export default withNextIntl(nextConfig);
