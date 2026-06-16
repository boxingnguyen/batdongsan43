import {cookies} from 'next/headers'
import {getRequestConfig} from 'next-intl/server'

const SUPPORTED_LOCALES = ['en', 'vi'] as const
type SupportedLocale = typeof SUPPORTED_LOCALES[number]

export default getRequestConfig(async ({locale}) => {
  // Prefer the locale resolved by middleware/URL. Fallback to cookie, then default to 'vi'.
  const store = await cookies()
  const cookieLocale = store.get('NEXT_LOCALE')?.value
  const resolved = (locale || cookieLocale || 'vi') as string
  const currentLocale: SupportedLocale = SUPPORTED_LOCALES.includes(resolved as SupportedLocale)
    ? (resolved as SupportedLocale)
    : 'vi'

  const messages = (await import(`../../public/locales/${currentLocale}.json`)).default
  return { locale: currentLocale, messages }
})


