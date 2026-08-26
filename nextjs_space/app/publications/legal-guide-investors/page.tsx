'use client';

import { I18nProvider } from '@/lib/i18n/context';
import Header from '../../_components/header';
import FooterSection from '../../_components/footer-section';
import FloatingButtons from '../../_components/floating-buttons';
import ScrollProgress from '../../_components/scroll-progress';
import InvestorGuideArticle from '../../_components/investor-guide-article';

export default function InvestorGuidePage() {
  return (
    <I18nProvider>
      <ScrollProgress />
      <Header />
      <main style={{ paddingTop: 72 }}>
        <InvestorGuideArticle />
      </main>
      <FooterSection />
      <FloatingButtons />
    </I18nProvider>
  );
}
