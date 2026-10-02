import {getRequestConfig} from 'next-intl/server'
import {cookies, headers} from 'next/headers'
import {DEFAULT_LOCALE, LOCALE_COOKIE, LOCALE_HEADER, isSupportedLocale} from '@/lib/geo-locale'

// Locale is chosen per visitor by src/middleware.ts (IP country → vi/en) and
// passed via request header (first visit) or cookie (later visits).
export default getRequestConfig(async () => {
  const requested =
    (await headers()).get(LOCALE_HEADER) ?? (await cookies()).get(LOCALE_COOKIE)?.value
  const locale = isSupportedLocale(requested) ? requested : DEFAULT_LOCALE
  const messages = (await import(`../../public/locales/${locale}.json`)).default
  return { locale, messages }
})
