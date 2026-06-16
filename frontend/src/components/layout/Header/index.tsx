"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

const Header: React.FC = () => {
  const [sticky, setSticky] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('header.menu');
//Adding ID 


  const navLinks = [     
    { href: '#overview', label: t('introduction') },
    { href: '#connection', label: t('connection') },
    { href: '#partners', label: t('partners') },
    { href: '#utilities', label: t('facility') },
    { href: '/news', label: t('news') },          
    { href: '#gallery', label: t('gallery') },
    { href: '#contact', label: t('contactUs') },
  ];

  const leftMenu = navLinks.slice(0, 4);
  const rightMenu = navLinks.slice(4);

  const sideMenuRef = useRef<HTMLDivElement>(null);
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Scrolling 
    if (href.startsWith('#')) {
      e.preventDefault();
      setNavbarOpen(false);
      
      const targetId = href.replace('#', '');
      const isHome = pathname === '/' || pathname === '/vi' || pathname === '/en';

      if (isHome) {
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 96;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
          window.history.pushState(null, '', href);
          window.dispatchEvent(new Event('hashchange'));
        }
      } else {
         router.push('/' + href);
      }
    } else {
      setNavbarOpen(false);

    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (sideMenuRef.current && !sideMenuRef.current.contains(event.target as Node)) {
      setNavbarOpen(false);
    }
  };

  const handleScroll = useCallback(() => {
    setSticky(window.scrollY >= 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleScroll]);

  const isHomepage = pathname === "/";
  const linkClasses = "text-[14px] font-medium text-[#E3C284] rounded-full uppercase hover:text-[#CC9A58] cursor-pointer transition-colors relative group";
  const underline = <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#CC9A58] transition-all group-hover:w-full"></span>;

  return (
    <header
      className={`fixed h-24 py-1 z-50 w-full transition-all duration-300 lg:px-0 px-4 
        ${sticky ? "top-0 bg-black/95 shadow-md" : "top-0 bg-black/40 lg:bg-transparent"}
        ${sticky ? "lg:top-3" : "lg:top-0"} 
      `}
    >
      <nav className={`mx-auto max-w-7xl flex items-center justify-between pt-6 pb-4 duration-300 shadow-none top-0 px-4`}>
        {/* Mobile Header */}
        <div className="lg:hidden flex justify-between items-center gap-2 w-full">
          <div>
            <Link href="/">
              <Image
                src={"/images/header_logo.png"}
                alt="logo"
                width={150}
                height={68}
                unoptimized={true}
                className={`${
                  isHomepage
                    ? sticky ? "hidden dark:block" : "block"
                    : sticky ? "dark:block hidden" : "dark:block hidden"
                }`}
              />
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-6">
            <div>
              <button
                onClick={() => setNavbarOpen(!navbarOpen)}
                className={`flex items-center gap-3 p-2 sm:px-5 sm:py-3 rounded-full font-semibold hover:cursor-pointer border ${
                  isHomepage
                    ? sticky
                      ? "text-white bg-dark dark:bg-white dark:text-dark dark:hover:text-white dark:hover:bg-dark hover:text-dark hover:bg-white border-dark dark:border-white"
                      : "text-white border-white"
                    : "bg-dark text-white hover:bg-transparent hover:text-dark dark:bg-white dark:text-dark dark:hover:bg-transparent dark:hover:text-white duration-300"
                }`}
                aria-label="Toggle mobile menu"
              >
                <span>
                  <Icon icon={"ph:list"} width={24} height={24} />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="lg:flex w-full hidden items-center justify-between">
          
          {/* Left Menu (Dùng mảng leftMenu mới) */}
          <div className="w-2/5 flex items-center justify-between">
            {leftMenu.map((item, index) => (
              item.href.startsWith('#') ? (
                <a 
                  key={index} 
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={linkClasses}
                >
                    {item.label}
                    {underline}
                </a>
              ) : (
                <Link 
                  key={index} 
                  href={item.href}
                  className={linkClasses}
                >
                    {item.label}
                    {underline}
                </Link>
              )
            ))}
          </div>
          
          {/* Logo */}
          <div className="w-1/5 relative h-full">
            <div className="block align-middle">
              <Link href="/">
                <Image
                  src={"/images/header_logo.png"}
                  alt="logo"
                  width={150}
                  height={68}
                  unoptimized={true}  
                  className="absolute top-[-60px] left-[17%]"
                />
              </Link>
            </div>
          </div >
          
          {/* Right Menu (Dùng mảng rightMenu mới) */}
          <div className="w-2/5 flex items-center justify-between">
            {rightMenu.map((item, index) => (
              item.href.startsWith('#') ? (
                <a 
                  key={index} 
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={linkClasses}
                >
                    {item.label}
                    {underline}
                </a>
              ) : (
                <Link 
                  key={index} 
                  href={item.href}
                  className={linkClasses}
                >
                    {item.label}
                    {underline}
                </Link>
              )
            ))}
          </div>
        </div>
      </nav>

      {/* Desktop Icons */}
      <div className="lg:flex hidden absolute right-2 top-2 flex-col items-end gap-2">
        <LanguageSwitcher className="hidden text-white md:flex" />
        <Link
          href="https://vrclickstudio.vn/public/vr/soleil/"
          target="_blank"
          rel="noopener noreferrer"
          title="Xem VR 360"
          className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10"
        >
          <Image
            src="/images/icon-360.png" 
            alt="VR 360"
            width={28}
            height={28}
            className="h-7 w-7"
          />
        </Link>
      </div>

      {navbarOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 lg:hidden" />
      )}

      {/* Mobile Menu */}
      <div
        ref={sideMenuRef}
        className={`fixed top-0 right-0 h-full w-full bg-black shadow-lg transition-transform duration-300 max-w-2xl lg:hidden ${
          navbarOpen ? "translate-x-0" : "translate-x-full"
        } z-50 px-20 overflow-auto no-scrollbar`}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="">
            <div className="flex items-center justify-start py-10">
              <button
                onClick={() => setNavbarOpen(false)}
                aria-label="Close mobile menu"
                className="bg-white p-3 rounded-full hover:cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col items-start gap-4">
              <ul className="w-full list-none">
                <li className="mt-6">
                  <LanguageSwitcher className="text-white" />
                </li>
                <li className="mt-4">
                  <Link
                    href="https://vrclickstudio.vn/public/vr/soleil/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                    onClick={() => setNavbarOpen(false)}
                  >
                    <Image
                      src="/images/icon-360.png"
                      alt="VR 360"
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                    <span className="text-lg font-medium uppercase">VR 360</span>
                  </Link>
                </li>

                {/* Render Mobile Menu */}
                {navLinks.map((item, index) => (
                   <li key={index} className="py-2">
                      {item.href.startsWith('#') ? (
                        <a 
                          href={item.href}
                          onClick={(e) => handleLinkClick(e, item.href)}
                          className="text-[14px] font-medium text-[#E3C284] rounded-full uppercase hover:text-[#CC9A58] block w-full cursor-pointer"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link 
                          href={item.href}
                          className="text-[14px] font-medium text-[#E3C284] rounded-full uppercase hover:text-[#CC9A58] block w-full cursor-pointer"
                          onClick={() => setNavbarOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )}
                   </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;