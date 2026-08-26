import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Legal Guide for Foreign Investors in Kazakhstan: Corporate Law, Tax & AIFC | Verumpraxis',
  },
  description: 'Legal guide for foreign investors in Kazakhstan: company registration, the AIFC advantage, tax structuring, employment law, dispute resolution and intellectual property protection. English speaking lawyers in Almaty. Юридический гайд для иностранных инвесторов в Казахстане: регистрация компании, МФЦА, налоги, M&A.',
  keywords: [
    'legal guide foreign investors Kazakhstan',
    'investing in Kazakhstan legal',
    'company registration Kazakhstan',
    'AIFC company formation',
    'tax structuring Kazakhstan',
    'foreign investment Kazakhstan law',
    'English speaking lawyers Almaty',
    'doing business in Kazakhstan',
    'юридический гайд инвесторам Казахстан',
    'регистрация компании иностранцу Казахстан',
    'МФЦА регистрация',
    'налоговое структурирование Казахстан',
    'Verumpraxis',
  ],
  alternates: {
    canonical: 'https://verumpraxis.kz/publications/legal-guide-investors',
  },
  openGraph: {
    title: 'Legal Guide for Foreign Investors in Kazakhstan: Corporate Law, Tax & AIFC',
    description: 'A comprehensive overview of the legal landscape for international businesses entering Kazakhstan and Central Asia — company registration, AIFC, tax, employment, dispute resolution and IP.',
    url: 'https://verumpraxis.kz/publications/legal-guide-investors',
    type: 'article',
    locale: 'en_US',
    alternateLocale: ['ru_RU'],
    images: [{ url: '/images/og_image.png', width: 1200, height: 630, alt: 'Legal Guide for Foreign Investors in Kazakhstan — Verumpraxis' }],
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Legal Guide for Foreign Investors in Kazakhstan: Corporate Law, Tax, AIFC, and Practical Considerations',
  description: 'A comprehensive overview of the legal landscape for international businesses and investors entering Kazakhstan and Central Asia — from company registration and the AIFC advantage to tax structuring, employment law, dispute resolution and intellectual property protection.',
  image: 'https://verumpraxis.kz/images/og_image.png',
  datePublished: '2026-05-01',
  dateModified: '2026-05-01',
  inLanguage: 'en',
  author: { '@type': 'Organization', name: 'Verumpraxis', url: 'https://verumpraxis.kz' },
  publisher: {
    '@type': 'Organization',
    name: 'Verumpraxis',
    logo: { '@type': 'ImageObject', url: 'https://verumpraxis.kz/images/og_image.png' },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://verumpraxis.kz/publications/legal-guide-investors' },
  about: ['Foreign investment Kazakhstan', 'AIFC', 'Corporate law Kazakhstan', 'Tax structuring', 'Doing business in Kazakhstan', 'Инвестиции в Казахстан'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://verumpraxis.kz' },
    { '@type': 'ListItem', position: 2, name: 'Публикации', item: 'https://verumpraxis.kz/publications' },
    { '@type': 'ListItem', position: 3, name: 'Legal Guide for Foreign Investors in Kazakhstan', item: 'https://verumpraxis.kz/publications/legal-guide-investors' },
  ],
};

export default function InvestorGuideLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
