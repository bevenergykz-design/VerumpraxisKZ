'use client';

import { I18nProvider } from '@/lib/i18n/context';
import Header from '../_components/header';
import FooterSection from '../_components/footer-section';
import FloatingButtons from '../_components/floating-buttons';
import ScrollProgress from '../_components/scroll-progress';
import PrivacyContent from '../_components/privacy-content';

export default function PrivacyPage() {
  return (
    <I18nProvider>
      <ScrollProgress />
      <Header />
      <main style={{ paddingTop: 72 }}>
        <PrivacyContent />
      </main>
      <FooterSection />
      <FloatingButtons />
    </I18nProvider>
  );
}
