import type { Metadata } from 'next';
import ClientApp from '../_components/client-app';


const LANGUAGES = {
  'ru': 'https://verumpraxis.kz',
  'en': 'https://verumpraxis.com',
  'kk': 'https://verumpraxis.kz/kz',
  'zh': 'https://verumpraxis.kz/zh',
  'x-default': 'https://verumpraxis.kz',
};

export const metadata: Metadata = {
  title: {
    absolute: 'Алматыдағы заң фирмасы, Қазақстан | Verumpraxis — Алматыдағы заңгер',
  },
  description:
    'Verumpraxis — Алматыдағы заң фирмасы. Халықаралық инвесторлар мен бизнеске арналған толық құқықтық қолдау: корпоративтік құқық, M&A, салық, АХҚО (AIFC), дауларды шешу, еңбек құқығы, цифрлық құқық және зияткерлік меншік. Қазақстан мен Орталық Азиядағы заң қызметтері.',
  keywords: [
    'Алматыдағы заңгер',
    'Қазақстандағы заң фирмасы',
    'заң қызметтері Алматы',
    'корпоративтік құқық Қазақстан',
    'салық заңгері Алматы',
    'АХҚО тіркеу',
    'дауларды шешу Қазақстан',
    'еңбек құқығы Қазақстан',
    'Verumpraxis',
  ],
  alternates: {
    canonical: 'https://verumpraxis.kz/kz',
    languages: LANGUAGES,
  },
  openGraph: {
    title: 'Алматыдағы заң фирмасы, Қазақстан | Verumpraxis',
    description:
      'Алматыдағы заң фирмасы Verumpraxis. Корпоративтік құқық, салық, АХҚО (AIFC), M&A, дауларды шешу, еңбек және цифрлық құқық бойынша заң қызметтері.',
    url: 'https://verumpraxis.kz/kz',
    type: 'website',
    locale: 'kk_KZ',
    alternateLocale: ['ru_RU', 'en_US', 'zh_CN'],
    siteName: 'Verumpraxis',
    images: [{ url: '/images/og_image.png', width: 1200, height: 630, alt: 'Verumpraxis — Алматыдағы заң фирмасы' }],
  },
};

export default function KazakhHome() {
  return <ClientApp initialLocale="kz" />;
}
