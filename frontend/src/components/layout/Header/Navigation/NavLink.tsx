import { NavLinks } from '@/types/navlink'
import clsx from 'clsx'
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLinkProps {
  item: NavLinks;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ item, onClick }) => {
  const path = usePathname()
  const locale = useLocale()
  const t = useTranslations()

  const itemLabelToPath = item.key

  const linkclasses = clsx(
    'text-[14px] font-medium text-[#E3C284] rounded-full uppercase hover:text-[#CC9A58]'
  )

  const underlineClasses = clsx(
    'h-0.5 bg-[#CC9A58] w-0 transition-all duration-300',
    {
      'w-full': item.href === path || path.startsWith(itemLabelToPath),
      'group-hover:w-full': true,
    }
  )

  const href = locale === 'en' ? `/en${item.href === '/' ? '' : item.href}` : item.href

  return (
    <div className='group w-fit'>
      <Link href={href} className={linkclasses} onClick={onClick}>
        {t(`header.menu.${item.key}`)}
      </Link>
      <div className={underlineClasses} />
    </div>
  )
}

export default NavLink
