'use client'

import React, { useEffect } from 'react'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'

const LanguageSwitcher: React.FC<{ className?: string }> = ({ className }) => {
  const locale = useLocale()
  const pathname = usePathname()

  const switchTo = (next: 'en' | 'vi') => {
    try {
      document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000`
    } catch {}
    const cleanPath = pathname.startsWith('/en') || pathname.startsWith('/vi')
      ? pathname.replace(/^\/(en|vi)/, '') || '/'
      : pathname || '/'
    const target = next === 'en' ? `/en${cleanPath === '/' ? '' : cleanPath}` : cleanPath
    window.location.assign(target)
  }

  // Sync locale cookie with URL prefix on mount and when pathname changes
  useEffect(() => {
    const shouldBeEn = pathname.startsWith('/en')
    const target = shouldBeEn ? 'en' : 'vi'
    if (locale !== target) {
      try {
        document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000`
      } catch {}
    }
  }, [pathname, locale])

  return (
    <div className={className}>
      <button
        aria-label="Switch to English"
        onClick={() => switchTo('en')}
        className={`px-3 py-1 rounded-full text-sm font-semibold border ${
          locale === 'en'
            ? 'bg-primary text-white border-primary'
            : 'bg-transparent text-inherit hover:bg-primary/10 border-current'
        }`}
      >
        EN
      </button>
      <button
        aria-label="Chuyển sang Tiếng Việt"
        onClick={() => switchTo('vi')}
        className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold border ${
          locale === 'vi'
            ? 'bg-primary text-white border-primary'
            : 'bg-transparent text-inherit hover:bg-primary/10 border-current'
        }`}
      >
        VI
      </button>
    </div>
  )
}

export default LanguageSwitcher


