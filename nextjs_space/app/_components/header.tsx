'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n/context';
import type { Locale } from '@/lib/i18n/translations';
import { X, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { WhatsAppIcon, TelegramIcon } from './floating-buttons';

// Server-rendered homepage variants per language. Switching language on any of
// these routes navigates to the matching route so the HTML is delivered in that
// language (important for SEO) and the URL reflects the active language.
const HOME_PATHS: Record<Locale, string> = { ru: '/', en: '/en', kz: '/kz', zh: '/zh' };
const HOME_PATH_SET = new Set<string>(Object.values(HOME_PATHS));

const NAV_ITEMS: { key: string; href: string; external?: boolean }[] = [
  { key: 'about', href: '#mission' },
  { key: 'services', href: '#services' },
  { key: 'why', href: '#why' },
  { key: 'team', href: '#team' },
  { key: 'faq', href: '#faq' },
  { key: 'publications', href: '/publications', external: true },
  { key: 'contact', href: '#contact' },
];

export default function Header() {
  const { locale, setLocale, t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleLangSwitch = (lang: Locale) => {
    // On a server-rendered homepage variant: switch language via route navigation
    // so SSR delivers the page in the chosen language and the URL updates.
    if (pathname && HOME_PATH_SET.has(pathname)) {
      try { localStorage?.setItem?.('vp-locale', lang); } catch {}
      router.push(HOME_PATHS[lang]);
    } else {
      // Other pages (articles, privacy) switch client-side in place.
      setLocale(lang);
    }
  };

  useEffect(() => {
    const handler = () => setScrolled((window?.scrollY ?? 0) > 10);
    window?.addEventListener?.('scroll', handler, { passive: true });
    return () => window?.removeEventListener?.('scroll', handler);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const isHome = typeof window !== 'undefined' && window.location.pathname === '/';

  const handleNav = (href: string, external?: boolean) => {
    setOpen(false);
    if (external) {
      setTimeout(() => { window.location.href = href; }, 300);
    } else if (!isHome) {
      // On non-home pages, navigate to home with anchor
      setTimeout(() => { window.location.href = '/' + href; }, 300);
    } else {
      setTimeout(() => {
        const el = document?.querySelector?.(href);
        el?.scrollIntoView?.({ behavior: 'smooth' });
      }, 300);
    }
  };

  const handleLogoClick = () => {
    setOpen(false);
    if (!isHome) {
      window.location.href = '/';
    } else {
      window?.scrollTo?.({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'shadow-lg' : ''
        }`}
        style={{
          backgroundColor: scrolled ? 'rgba(13,43,54,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          height: 72,
        }}
      >
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-3 cursor-pointer flex-shrink-0"
            aria-label="Verumpraxis Home"
          >
            <div className="relative w-10 h-10">
              <Image src="/images/logo-white.png" alt="Verumpraxis логотип юридической фирмы" fill className="object-contain" priority />
            </div>
            <span className="text-white font-semibold text-[13px] sm:text-sm tracking-[0.15em] uppercase" style={{ fontFamily: "'Open Sans', sans-serif" }}>VERUMPRAXIS</span>
          </button>

          {/* Center: Tagline */}
          <span className="hidden md:block font-heading italic text-base lg:text-lg" style={{ color: 'var(--vp-accent)' }}>
            Turning Law into Action
          </span>

          {/* Right: Language + Burger */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="flex items-center text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              {(['ru', 'en', 'kz', 'zh'] as const).map((lang, i) => (
                <React.Fragment key={lang}>
                  {i > 0 && <span className="text-white/25 mx-0.5 sm:mx-1">|</span>}
                  <button
                    onClick={() => handleLangSwitch(lang)}
                    className={`px-1 sm:px-2 py-1 transition-colors duration-300 ${
                      locale === lang ? 'text-[var(--vp-accent)]' : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {lang === 'zh' ? '中' : lang.toUpperCase()}
                  </button>
                </React.Fragment>
              ))}
            </div>
            <button
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 group"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <span className="hidden sm:block text-[11px] tracking-[0.1em] uppercase" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                {t('nav.menu') ?? 'МЕНЮ'}
              </span>
              <div className="flex flex-col gap-[5px] w-6">
                <span className="block h-[1.5px] bg-current transition-all duration-300 group-hover:w-full w-full" />
                <span className="block h-[1.5px] bg-current transition-all duration-300 group-hover:w-full w-4/5 ml-auto" />
                <span className="block h-[1.5px] bg-current transition-all duration-300 group-hover:w-full w-3/5 ml-auto" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] flex flex-col"
            style={{
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
              background: 'linear-gradient(160deg, rgba(13,43,54,0.92) 0%, rgba(10,30,38,0.96) 100%)',
            }}
          >
            {/* Top bar in overlay */}
            <div className="flex items-center justify-between px-5 sm:px-8 h-[72px] flex-shrink-0 max-w-[1320px] mx-auto w-full">
              <button
                onClick={handleLogoClick}
                className="flex items-center gap-3 cursor-pointer"
                aria-label="Verumpraxis Home"
              >
                <div className="relative w-10 h-10">
                  <Image src="/images/logo-white.png" alt="Verumpraxis" fill className="object-contain" />
                </div>
                <span className="text-white font-semibold text-[13px] sm:text-sm tracking-[0.15em] uppercase" style={{ fontFamily: "'Open Sans', sans-serif" }}>VERUMPRAXIS</span>
              </button>
              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white transition-colors duration-300 p-2"
                aria-label="Close menu"
              >
                <X size={28} strokeWidth={1.5} />
              </button>
            </div>

            {/* Menu content */}
            <div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-6 sm:px-12 gap-10 lg:gap-20">
              {/* Nav items - center */}
              <nav className="flex flex-col items-center lg:items-start">
                {(NAV_ITEMS ?? [])?.map?.((item: any, i: number) => (
                  <div key={item?.key} className="relative">
                    {i > 0 && (
                      <div className="w-full" style={{ height: '0.5px', backgroundColor: 'rgba(255,255,255,0.10)' }} />
                    )}
                    <motion.button
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 + i * 0.07, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                      onClick={() => handleNav(item?.href ?? '#', item?.external)}
                      className="menu-nav-item text-white/75 hover:text-white text-center lg:text-left transition-colors duration-300 py-3 sm:py-4"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '36px',
                        fontWeight: 600,
                      }}
                    >
                      {t(`nav.${item?.key}`) ?? item?.key}
                    </motion.button>
                  </div>
                )) ?? null}
              </nav>

              {/* Contact info - right side */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="flex flex-col items-center lg:items-start gap-4 text-white/50 text-sm lg:border-l lg:border-white/10 lg:pl-12"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                <a href="mailto:info@verumpraxis.kz" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail size={16} strokeWidth={1.5} />
                  <span>info@verumpraxis.kz</span>
                </a>
                <a href="https://wa.me/77072506680" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>+7 707 250 66 80</span>
                </a>
                <a href="https://t.me/verumpraxis" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                  <TelegramIcon className="w-4 h-4" />
                  <span>@verumpraxis</span>
                </a>
                <div className="flex items-center gap-2">
                  <MapPin size={16} strokeWidth={1.5} />
                  <span>{t('nav.address') ?? 'Алматы, Кожабекова 19'}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
