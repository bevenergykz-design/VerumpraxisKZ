'use client';

import { I18nProvider } from '@/lib/i18n/context';
import Header from '../_components/header';
import FooterSection from '../_components/footer-section';
import PublicationsSection from '../_components/publications-section';
import FloatingButtons from '../_components/floating-buttons';
import ScrollProgress from '../_components/scroll-progress';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://verumpraxis.kz' },
    { '@type': 'ListItem', position: 2, name: 'Публикации', item: 'https://verumpraxis.kz/publications' },
  ],
};

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Публикации Verumpraxis',
  description: 'Экспертные статьи юридической фирмы Verumpraxis по корпоративному, налоговому, трудовому и цифровому праву Казахстана.',
  url: 'https://verumpraxis.kz/publications',
  isPartOf: { '@type': 'WebSite', name: 'Verumpraxis', url: 'https://verumpraxis.kz' },
  publisher: { '@type': 'Organization', name: 'Verumpraxis', url: 'https://verumpraxis.kz' },
};

export default function PublicationsPage() {
  return (
    <I18nProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <ScrollProgress />
      <Header />
      <main style={{ paddingTop: 72 }}>
        <PublicationsSection />
      </main>
      <FooterSection />
      <FloatingButtons />
    </I18nProvider>
  );
}
