'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Globe, Monitor, User, TrendingUp, Calculator, Gavel, Building, Briefcase, Lightbulb, CheckCircle, Plus, Minus, ArrowRight } from 'lucide-react';

const ACCORDION_ICONS = [Users, Globe, Monitor, User, TrendingUp, Calculator, Gavel, Building, Briefcase, Lightbulb];

export default function ServicesSection() {
  const { t } = useI18n();
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0]));
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const tabs = t('services.tabs') ?? [];

  const toggle = (i: number) => {
    setOpenIndices(prev => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  };

  return (
    <section id="services" className="gradient-dark py-24 sm:py-28 md:py-36" ref={ref}>
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl sm:text-4xl md:text-[42px] text-white text-center mb-14 sm:mb-16"
        >
          {t('services.title') ?? ''}
        </motion.h2>

        {/* Accordion */}
        <div className="space-y-3">
          {Array.isArray(tabs) && tabs?.map?.((tab: any, i: number) => {
            const Icon = ACCORDION_ICONS?.[i] ?? Briefcase;
            const isOpen = openIndices.has(i);

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{
                  backgroundColor: isOpen ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                {/* Header */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center gap-3 sm:gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left transition-colors duration-300 hover:bg-white/[0.03]"
                >
                  <Icon
                    size={22}
                    strokeWidth={1.5}
                    className="flex-shrink-0"
                    style={{ color: 'var(--vp-accent)' }}
                  />
                  <span
                    className="flex-1 text-lg sm:text-xl text-white/90"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 600,
                      fontSize: 'clamp(18px, 2.5vw, 20px)',
                    }}
                  >
                    {tab?.fullName ?? tab?.name ?? ''}
                  </span>
                  <span className="flex-shrink-0 transition-transform duration-300">
                    {isOpen ? (
                      <Minus size={20} strokeWidth={1.5} className="text-white/40" />
                    ) : (
                      <Plus size={20} strokeWidth={1.5} className="text-white/40" />
                    )}
                  </span>
                </button>

                {/* Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1">
                        {/* Description */}
                        <p
                          className="text-sm sm:text-base leading-relaxed text-white/55 mb-6"
                          style={{ fontFamily: "'Open Sans', sans-serif" }}
                        >
                          {tab?.desc ?? ''}
                        </p>

                        {/* Items intro */}
                        {tab?.itemsIntro && (
                          <p
                            className="text-xs sm:text-sm font-semibold text-white/65 mb-3"
                            style={{ fontFamily: "'Open Sans', sans-serif" }}
                          >
                            {tab.itemsIntro}
                          </p>
                        )}

                        {/* Bullet list */}
                        <ul className="space-y-3 mb-6">
                          {Array.isArray(tab?.items) && tab?.items?.map?.((item: string, j: number) => (
                            <li key={j} className="flex items-start gap-3">
                              <CheckCircle
                                size={16}
                                strokeWidth={1.5}
                                className="mt-0.5 flex-shrink-0"
                                style={{ color: 'var(--vp-accent)' }}
                              />
                              <span
                                className="text-sm leading-relaxed text-white/60"
                                style={{ fontFamily: "'Open Sans', sans-serif" }}
                              >
                                {item ?? ''}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {/* CTA */}
                        <button
                          onClick={() => document?.querySelector?.('#contact')?.scrollIntoView?.({ behavior: 'smooth' })}
                          className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-3"
                          style={{
                            color: 'var(--vp-accent)',
                            fontFamily: "'Open Sans', sans-serif",
                          }}
                        >
                          {t('services.discussProject') ?? 'Обсудить проект'}
                          <ArrowRight size={16} strokeWidth={1.5} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
