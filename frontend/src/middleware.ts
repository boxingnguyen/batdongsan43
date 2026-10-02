import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_HEADER,
  getCountryFromHeaders,
  isBot,
  isSupportedLocale,
  localeFromCountry,
} from "@/lib/geo-locale";

const ONE_YEAR = 60 * 60 * 24 * 365;

export function middleware(request: NextRequest) {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const bot = isBot(request.headers.get("user-agent"));

  // Crawlers always see Vietnamese so indexed content matches the canonical URLs.
  const country = getCountryFromHeaders(request.headers);
  const locale = isSupportedLocale(cookieLocale)
    ? cookieLocale
    : bot
      ? DEFAULT_LOCALE
      : localeFromCountry(country);

  // A cookie set on this response isn't visible to this render, so pass the
  // locale along as a request header too (overwriting any client-sent value).
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, locale);
  const response = NextResponse.next({ request: { headers: requestHeaders } });

  // Only remember a locale we actually derived from a known country.
  if (!bot && country && cookieLocale !== locale) {
    response.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      maxAge: ONE_YEAR,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
