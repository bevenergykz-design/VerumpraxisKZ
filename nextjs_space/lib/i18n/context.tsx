'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { translations, type Locale } from './translations';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => any;
}

const I18nContext = createContext<I18nContextType>({
  locale: 'ru',
  setLocale: () => {},
  t: () => '',
});

export function I18nProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  /**
   * When provided (on dedicated language routes like /en, /kz, /zh) the locale is
   * forced for the initial server render so the HTML is delivered in that language
   * (critical for SEO / indexing). On such routes we ignore any stored preference.
   */
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale ?? 'ru');

  useEffect(() => {
    if (initialLocale) {
      // Route-locked language: persist it and set <html lang>, ignore stored value.
      try { localStorage?.setItem?.('vp-locale', initialLocale); } catch {}
      if (typeof document !== 'undefined') document.documentElement.lang = initialLocale;
      return;
    }
    const saved = localStorage?.getItem?.('vp-locale') as Locale | null;
    if (saved === 'ru' || saved === 'en' || saved === 'kz' || saved === 'zh') {
      setLocaleState(saved);
      if (typeof document !== 'undefined') document.documentElement.lang = saved;
    }
  }, [initialLocale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try { localStorage?.setItem?.('vp-locale', newLocale); } catch {}
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLocale;
    }
  }, []);

  const t = useCallback((key: string): any => {
    const keys = key?.split?.('.') ?? [];
    let result: any = translations?.[locale];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) return key;
    }
    return result ?? key;
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
