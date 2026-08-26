'use client';

import { useI18n } from '@/lib/i18n/context';
import { Mail } from 'lucide-react';
import { WhatsAppIcon, TelegramIcon, YouTubeIcon, InstagramIcon, TikTokIcon } from './floating-buttons';

export default function FooterSection() {
  const { t } = useI18n();

  const isHome = typeof window !== 'undefined' && window.location.pathname === '/';

  const navigateTo = (href: string, external?: boolean) => {
    if (external) {
      window.location.href = href;
    } else if (!isHome) {
      window.location.href = '/' + href;
    } else {
      document?.querySelector?.(href)?.scrollIntoView?.({ behavior: 'smooth' });
    }
  };

  const tabs = t('services.tabs') ?? [];
  const serviceLinks = (Array.isArray(tabs) ? tabs : []).map((tab: any) => ({
    label: tab?.name ?? '', href: '#services',
  }));

  const infoLinks: { label: string; href: string; external?: boolean }[] = [
    { label: t('nav.about') ?? '', href: '#mission' },
    { label: t('nav.services') ?? '', href: '#services' },
    { label: t('nav.why') ?? '', href: '#why' },
    { label: t('nav.team') ?? '', href: '#team' },
    { label: t('nav.faq') ?? '', href: '#faq' },
    { label: t('nav.publications') ?? '', href: '/publications', external: true },
    { label: t('nav.contact') ?? '', href: '#contact' },
  ];

  return (
    <footer style={{ backgroundColor: 'var(--vp-footer)' }} className="py-14 sm:py-20">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-14 sm:mb-16">
          {/* Col 1: Logo + desc */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-8 h-8 flex-shrink-0">
                <img src="/images/logo-white.png" alt="Verumpraxis" className="w-full h-full object-contain" />
              </div>
              <span className="text-white font-semibold text-sm tracking-[0.12em] uppercase" style={{ fontFamily: "'Open Sans', sans-serif" }}>VERUMPRAXIS</span>
            </div>
            <p className="font-heading italic text-xs mb-4" style={{ color: 'var(--vp-accent)' }}>Turning Law into Action</p>
            <p className="text-sm leading-relaxed text-white/45">{t('footer.desc') ?? ''}</p>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "'Open Sans', sans-serif" }}>{t('footer.servicesTitle') ?? ''}</h4>
            <ul className="space-y-2.5">
              {serviceLinks?.map?.((link: any, i: number) => (
                <li key={i}>
                  <button onClick={() => navigateTo(link?.href ?? '#')} className="text-sm text-left text-white/45 hover:text-white transition-colors duration-300">
                    {link?.label ?? ''}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Info */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "'Open Sans', sans-serif" }}>{t('footer.infoTitle') ?? ''}</h4>
            <ul className="space-y-2.5">
              {infoLinks?.map?.((link, i: number) => (
                <li key={i}>
                  {link?.external ? (
                    <a href={link?.href ?? '#'} className="text-sm text-white/45 hover:text-white transition-colors duration-300">
                      {link?.label ?? ''}
                    </a>
                  ) : (
                    <button onClick={() => navigateTo(link?.href ?? '#')} className="text-sm text-left text-white/45 hover:text-white transition-colors duration-300">
                      {link?.label ?? ''}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contacts */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "'Open Sans', sans-serif" }}>{t('footer.contactTitle') ?? ''}</h4>
            <div className="space-y-3">
              <a href="mailto:info@verumpraxis.kz" className="flex items-center gap-2 text-sm text-white/45 hover:text-white transition-colors duration-300">
                <Mail size={14} strokeWidth={1.5} style={{ color: 'var(--vp-accent)' }} />
                info@verumpraxis.kz
              </a>
              <a href="https://wa.me/77072506680" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/45 hover:text-white transition-colors duration-300">
                <WhatsAppIcon className="w-3.5 h-3.5" style={{ color: 'var(--vp-accent)' }} />
                +7 707 250 66 80
              </a>
              <a href="https://t.me/verumpraxis" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/45 hover:text-white transition-colors duration-300">
                <TelegramIcon className="w-3.5 h-3.5" style={{ color: 'var(--vp-accent)' }} />
                @verumpraxis
              </a>
            </div>
          </div>
        </div>

        {/* Social media */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <a
            href="https://www.youtube.com/channel/UCIK_cLugg7uYfo9krFh9_XQ"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all duration-300"
            aria-label="YouTube Verumpraxis"
          >
            <YouTubeIcon className="w-4 h-4" />
          </a>
          <a
            href="https://www.instagram.com/verumpraxis"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all duration-300"
            aria-label="Instagram Verumpraxis"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <a
            href="https://www.tiktok.com/@verumpraxis_kz"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all duration-300"
            aria-label="TikTok Verumpraxis"
          >
            <TikTokIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-xs text-white/30">
            {t('footer.copyright') ?? ''}
          </p>
          <a href="/privacy" className="text-xs text-white/40 hover:text-white transition-colors duration-300">
            {t('footer.privacy') ?? ''}
          </a>
        </div>
      </div>
    </footer>
  );
}
