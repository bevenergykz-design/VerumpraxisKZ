'use client';

import React from 'react';
import { I18nProvider } from '@/lib/i18n/context';
import type { Locale } from '@/lib/i18n/translations';
import Header from './header';
import HeroSection from './hero-section';
import AboutSection from './about-section';
import WhySection from './why-section';
import ServicesSection from './services-section';
import TeamSection from './team-section';
import FaqSection from './faq-section';

import ContactSection from './contact-section';
import FooterSection from './footer-section';
import FloatingButtons from './floating-buttons';

import ScrollProgress from './scroll-progress';

export default function ClientApp({ initialLocale }: { initialLocale?: Locale }) {
  return (
    <I18nProvider initialLocale={initialLocale}>
      <ScrollProgress />
      <Header />
      <main>
        <HeroSection />
        <div className="section-divider" />
        <AboutSection />
        <div className="section-divider" />
        <WhySection />
        <div className="section-divider" />
        <ServicesSection />
        <div className="section-divider" />
        <TeamSection />
        <div className="section-divider" />
        <FaqSection />
        <div className="section-divider" />
        <ContactSection />
      </main>
      <FooterSection />
      <FloatingButtons />

    </I18nProvider>
  );
}
