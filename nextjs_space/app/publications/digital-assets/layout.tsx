import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Регулирование цифровых активов в Казахстане: правовой режим, риски и возможности',
  description: 'Обзор правового режима цифровых активов в Казахстане. Закон о цифровых активах, регулирование МФЦА, лицензирование криптобирж, KYC/AML, налогообложение майнинга, цифровой тенге. Юридическое сопровождение проектов.',
  keywords: [
    'цифровые активы Казахстан',
    'криптовалюта Казахстан закон',
    'регулирование криптовалют РК',
    'МФЦА криптовалюта',
    'AIFC crypto regulation',
    'лицензирование криптобирж Казахстан',
    'KYC AML Казахстан',
    'майнинг Казахстан налог',
    'цифровой тенге',
    'закон о цифровых активах',
    'Bitcoin Казахстан',
    'финтех МФЦА лицензия',
    'Verumpraxis',
  ],
  alternates: {
    canonical: 'https://verumpraxis.kz/publications/digital-assets',
  },
  openGraph: {
    title: 'Регулирование цифровых активов в Казахстане — Verumpraxis',
    description: 'Системный анализ правового режима цифровых активов, рисков и возможностей для бизнеса в Казахстане и МФЦА.',
    url: 'https://verumpraxis.kz/publications/digital-assets',
    type: 'article',
    locale: 'ru_RU',
    images: [{ url: '/images/og_image.png', width: 1200, height: 630, alt: 'Регулирование цифровых активов в Казахстане — Verumpraxis' }],
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Регулирование цифровых активов в Казахстане: правовой режим, риски и возможности для бизнеса',
  description: 'Обзор правового режима цифровых активов в Казахстане: закон о цифровых активах, регулирование МФЦА, лицензирование криптобирж, KYC/AML, налогообложение майнинга, цифровой тенге.',
  image: 'https://verumpraxis.kz/images/og_image.png',
  datePublished: '2026-04-15',
  dateModified: '2026-04-15',
  inLanguage: 'ru',
  author: { '@type': 'Organization', name: 'Verumpraxis', url: 'https://verumpraxis.kz' },
  publisher: {
    '@type': 'Organization',
    name: 'Verumpraxis',
    logo: { '@type': 'ImageObject', url: 'https://verumpraxis.kz/images/og_image.png' },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://verumpraxis.kz/publications/digital-assets' },
  about: ['Цифровые активы', 'Криптовалюта Казахстан', 'МФЦА', 'Digital assets Kazakhstan', 'Cryptocurrency regulation'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://verumpraxis.kz' },
    { '@type': 'ListItem', position: 2, name: 'Публикации', item: 'https://verumpraxis.kz/publications' },
    { '@type': 'ListItem', position: 3, name: 'Цифровые активы в Казахстане', item: 'https://verumpraxis.kz/publications/digital-assets' },
  ],
};

export default function DigitalAssetsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
