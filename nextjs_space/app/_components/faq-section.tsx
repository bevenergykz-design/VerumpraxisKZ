'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, ChevronUp } from 'lucide-react';

const VISIBLE_COUNT = 3;

export default function FaqSection() {
  const { t } = useI18n();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const items = t('faq.items') ?? [];
  const allItems = Array.isArray(items) ? items : [];
  const visibleItems = showAll ? allItems : allItems.slice(0, VISIBLE_COUNT);
  const hasMore = allItems.length > VISIBLE_COUNT;

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  const handleToggleAll = () => {
    setShowAll(!showAll);
    if (showAll) {
      // Closing: collapse any open item beyond the visible range
      if (openIndex !== null && openIndex >= VISIBLE_COUNT) {
        setOpenIndex(null);
      }
    }
  };

  return (
    <section id="faq" className="gradient-dark py-24 sm:py-28 md:py-36" ref={ref}>
      <div className="max-w-[800px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-[42px] text-white mb-4">
            {t('faq.title') ?? ''}
          </h2>
          <p className="text-white/50 text-base">{t('faq.subtitle') ?? ''}</p>
        </motion.div>

        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {visibleItems?.map?.((item: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, height: 0, marginBottom: 0, overflow: 'hidden' }}
                transition={{ duration: 0.3, delay: i >= VISIBLE_COUNT ? (i - VISIBLE_COUNT) * 0.04 : 0 }}
                layout
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 transition-all duration-300"
                  style={{
                    backgroundColor: openIndex === i ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 4,
                  }}
                  aria-expanded={openIndex === i}
                >
                  <h3 className="font-heading text-base md:text-lg pr-4 text-white">
                    {item?.q ?? ''}
                  </h3>
                  <ChevronDown
                    size={20}
                    strokeWidth={1.5}
                    className={`flex-shrink-0 mt-1 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                    style={{ color: 'var(--vp-accent)' }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 text-sm leading-relaxed text-white/55">
                        <div className="pt-3">{item?.a ?? ''}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show all / Show less toggle */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-center mt-8"
          >
            <button
              onClick={handleToggleAll}
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:brightness-125 px-6 py-3"
              style={{
                color: 'var(--vp-accent)',
                fontFamily: "'Open Sans', sans-serif",
                border: '1px solid rgba(58,154,191,0.3)',
                borderRadius: 4,
              }}
            >
              {showAll ? (t('faq.showLess') ?? 'Свернуть') : (t('faq.showAll') ?? 'Показать все вопросы')}
              {showAll ? (
                <ChevronUp size={16} strokeWidth={1.5} />
              ) : (
                <ChevronDown size={16} strokeWidth={1.5} />
              )}
            </button>
          </motion.div>
        )}
      </div>

      {/* FAQ Schema — always include all items for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: allItems?.map?.((item: any) => ({
              '@type': 'Question',
              name: item?.q ?? '',
              acceptedAnswer: { '@type': 'Answer', text: item?.a ?? '' },
            })),
          }),
        }}
      />
    </section>
  );
}
