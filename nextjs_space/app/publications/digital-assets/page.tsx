'use client';

import { I18nProvider } from '@/lib/i18n/context';
import Header from '../../_components/header';
import FooterSection from '../../_components/footer-section';
import FloatingButtons from '../../_components/floating-buttons';
import ScrollProgress from '../../_components/scroll-progress';
import DigitalAssetsArticle from '../../_components/digital-assets-article';

export default function DigitalAssetsPage() {
  return (
    <I18nProvider>
      <ScrollProgress />
      <Header />
      <main style={{ paddingTop: 72 }}>
        <DigitalAssetsArticle />
      </main>
      <FooterSection />
      <FloatingButtons />
    </I18nProvider>
  );
}
