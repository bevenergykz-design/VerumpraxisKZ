'use client';

import { useI18n } from '@/lib/i18n/context';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const { t } = useI18n();
  const stats = t('hero.stats') ?? [];

  return (
    <section
      className="relative min-h-screen flex flex-col z-[1]"
      style={{
        background: 'radial-gradient(ellipse at 70% 50%, #1D4E5F 0%, #0D2B36 70%)',
        paddingTop: 72,
      }}
    >
      {/* Geometric grid pattern */}
      <div className="absolute inset-0 pattern-grid opacity-[0.07]" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-5 sm:px-8 py-16 sm:py-24 md:py-32 flex-1 flex flex-col justify-center">
        <div className="mb-6 sm:mb-8">
          <span
            className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase"
            style={{ color: 'var(--vp-accent)', fontFamily: "'Open Sans', sans-serif" }}
          >
            {t('hero.label') ?? ''}
          </span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-white leading-[1.15] mb-6 sm:mb-8 max-w-4xl whitespace-pre-line">
          {t('hero.title') ?? ''}
        </h1>

        <p
          className="text-sm sm:text-base md:text-lg max-w-2xl mb-10 sm:mb-14 text-white/55 leading-relaxed"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          {t('hero.subtitle') ?? ''}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => document?.querySelector?.('#contact')?.scrollIntoView?.({ behavior: 'smooth' })}
            className="flex items-center justify-center gap-2.5 px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:brightness-110 text-sm sm:text-base cursor-pointer"
            style={{ backgroundColor: 'var(--vp-accent)', borderRadius: 4, fontFamily: "'Open Sans', sans-serif" }}
            aria-label={t('hero.cta') ?? 'Contact'}
          >
            {t('hero.cta') ?? ''}
            <ArrowRight size={18} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => document?.querySelector?.('#services')?.scrollIntoView?.({ behavior: 'smooth' })}
            className="flex items-center justify-center gap-2 px-8 py-3.5 font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 text-sm sm:text-base cursor-pointer"
            style={{ borderRadius: 4, fontFamily: "'Open Sans', sans-serif" }}
          >
            {t('hero.cta2') ?? ''}
          </button>
        </div>
      </div>

      {/* Stats bar at bottom */}
      <div
        className="relative z-10 mt-auto"
        style={{
          backgroundColor: 'rgba(10,30,38,0.8)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4">
          {Array.isArray(stats) && stats?.map?.((stat: any, i: number) => (
            <div
              key={i}
              className="py-5 sm:py-7 text-center"
              style={i > 0 ? { borderLeft: '1px solid rgba(255,255,255,0.1)' } : {}}
            >
              <div className="font-heading text-xl sm:text-2xl md:text-3xl mb-1" style={{ color: 'var(--vp-accent)' }}>
                {stat?.value ?? ''}
              </div>
              <div
                className="text-[10px] sm:text-xs text-white/45 uppercase tracking-[0.1em]"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                {stat?.label ?? ''}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
