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
    absolute: 'English Speaking Law Firm in Almaty, Kazakhstan | Verumpraxis',
  },
  description:
    'Verumpraxis is an English speaking law firm in Almaty, Kazakhstan. Full-service legal counsel for international investors and businesses: corporate law, M&A, tax advisory, AIFC registration, dispute resolution, employment law, digital law and intellectual property across Kazakhstan and Central Asia.',
  keywords: [
    'English speaking lawyer Almaty',
    'English speaking lawyers Kazakhstan',
    'law firm Almaty',
    'law firm Kazakhstan',
    'international law firm Almaty',
    'legal services Kazakhstan',
    'corporate lawyer Almaty',
    'AIFC law firm',
    'tax lawyer Kazakhstan',
    'foreign investment Kazakhstan legal',
    'business lawyer Almaty',
    'dispute resolution Kazakhstan',
    'M&A Kazakhstan',
    'company registration Kazakhstan',
    'attorney Almaty Kazakhstan',
  ],
  alternates: {
    canonical: 'https://verumpraxis.com',
    languages: LANGUAGES,
  },
  openGraph: {
    title: 'English Speaking Law Firm in Almaty, Kazakhstan | Verumpraxis',
    description:
      'English speaking lawyers in Almaty, Kazakhstan. Legal services for international investors and businesses: corporate law, M&A, tax, AIFC, dispute resolution, employment law, IP and digital law across Kazakhstan and Central Asia.',
    url: 'https://verumpraxis.com',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ru_RU', 'kk_KZ', 'zh_CN'],
    siteName: 'Verumpraxis',
    images: [{ url: '/images/og_image.png', width: 1200, height: 630, alt: 'Verumpraxis — English speaking law firm in Almaty, Kazakhstan' }],
  },
};

export default function EnglishHome() {
  return <ClientApp initialLocale="en" />;
}
