export const LOCALES = ["vi", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "vi";
export const LOCALE_COOKIE = "NEXT_LOCALE";
export const LOCALE_HEADER = "x-locale";

const BOT_UA =
  /bot|crawl|spider|slurp|facebookexternalhit|embedly|quora link preview|whatsapp|telegram|lighthouse|headless/i;

export function isSupportedLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

export function isBot(userAgent: string | null): boolean {
  return !!userAgent && BOT_UA.test(userAgent);
}

// Netlify sends `x-nf-geo` as base64-encoded JSON ({ country: { code } });
// other hosts/CDNs send a plain ISO country code header.
export function getCountryFromHeaders(headers: Headers): string | null {
  const nfGeo = headers.get("x-nf-geo");
  if (nfGeo) {
    for (const decode of [(v: string) => atob(v), (v: string) => v]) {
      try {
        const code = JSON.parse(decode(nfGeo))?.country?.code;
        if (typeof code === "string" && code) return code.toUpperCase();
      } catch {
        // try next format
      }
    }
  }

  const code =
    headers.get("x-country") ??
    headers.get("x-vercel-ip-country") ??
    headers.get("cf-ipcountry");
  return code ? code.toUpperCase() : null;
}

// Vietnamese visitors (and unknown origin, e.g. local dev) get Vietnamese;
// everyone else gets English.
export function localeFromCountry(country: string | null): Locale {
  if (!country || country === "VN") return "vi";
  return "en";
}
