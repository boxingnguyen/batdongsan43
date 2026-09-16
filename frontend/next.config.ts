import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

import { CHAT_DEFAULT_PROJECT_KEY, getChatProject } from "./src/config/chat-projects";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

// FastAPI chat backend; "/" or "" = same origin, no rewrites.
const chatProxyTarget = process.env.NEXT_PUBLIC_API_PROXY_TARGET ?? "http://localhost:8000";
const chatRewrites =
  chatProxyTarget === "/" || chatProxyTarget === ""
    ? []
    : [
        // Order matters: Next matches rewrites in array order; a catch-all
        // first would swallow /api/query and /api/llms-hello.
        { source: "/api/query", destination: `${chatProxyTarget}/query` },
        { source: "/api/llms-hello", destination: `${chatProxyTarget}/llms-hello` },
        { source: "/api/:path*", destination: `${chatProxyTarget}/api/:path*` },
      ];

// Chat media origins from the project registry.
const chatMediaPatterns = getChatProject(CHAT_DEFAULT_PROJECT_KEY).mediaOrigins.map((origin) => ({
  protocol: "https" as const,
  hostname: origin.replace(/^https:\/\//, ""),
  pathname: "/**" as const,
}));

const nextConfig: NextConfig = {
  rewrites: async () => chatRewrites,
  // Required: Next's default gzip buffers the SSE proxy stream and breaks
  // token streaming (ERR_INCOMPLETE_CHUNKED_ENCODING). FastAPI chunks itself.
  compress: false,
  experimental: {
    proxyTimeout: 300000,
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
      ...chatMediaPatterns,
    ],
  },
  env: {
    NEXT_PUBLIC_STRAPI_URL: strapiUrl,
  },
};

export default withNextIntl(nextConfig);
