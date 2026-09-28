import {getRequestConfig} from 'next-intl/server'

// Site is Vietnamese-only. Not reading cookies/headers here keeps every page
// statically renderable (fast, CDN-cached) instead of rendered per request.
export default getRequestConfig(async () => {
  const messages = (await import('../../public/locales/vi.json')).default
  return { locale: 'vi', messages }
})
