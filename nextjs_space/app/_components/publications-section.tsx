'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, Tag, ArrowRight } from 'lucide-react';

export default function PublicationsSection() {
  const { t } = useI18n();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState(0);
  const categories = t('publications.categories') ?? [];
  const placeholders = t('publications.placeholders') ?? [];

  const filtered = activeCategory === 0
    ? placeholders
    : Array.isArray(placeholders)
      ? placeholders?.filter?.((p: any) => p?.category === categories?.[activeCategory])
      : [];

  return (
    <section id="publications" className="py-24 sm:py-28 md:py-36 gradient-dark" ref={ref}>
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-[42px] text-white mb-4">
            {t('publications.title') ?? ''}
          </h2>
          <p className="text-white/50 text-base">{t('publications.subtitle') ?? ''}</p>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
          {Array.isArray(categories) && categories?.map?.((cat: string, i: number) => (
            <button
              key={i}
              onClick={() => setActiveCategory(i)}
              className={`px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                activeCategory === i
                  ? 'text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
              style={{
                backgroundColor: activeCategory === i ? 'var(--vp-accent)' : 'transparent',
                borderRadius: 4,
                fontFamily: "'Open Sans', sans-serif",
              }}
            >
              {cat ?? ''}
            </button>
          ))}
        </div>

        {/* Section description */}
        <p className="text-center text-sm mb-10 text-white/40">
          {t('publications.comingSoon') ?? ''}
        </p>

        {/* Publication cards */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-7">
          {Array.isArray(filtered) && filtered?.map?.((item: any, i: number) => {
            const cardContent = (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-6 sm:p-7 hover:translate-y-[-4px] transition-all duration-400 h-full flex flex-col ${item?.slug ? 'group cursor-pointer' : ''}`}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 4,
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Tag size={14} strokeWidth={1.5} style={{ color: 'var(--vp-accent)' }} />
                  <span className="text-xs font-semibold" style={{ color: 'var(--vp-accent)', fontFamily: "'Open Sans', sans-serif" }}>{item?.category ?? ''}</span>
                </div>
                <h3 className="font-heading text-lg text-white mb-4 flex-1">{item?.title ?? ''}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <Clock size={12} strokeWidth={1.5} />
                    <span>{item?.date ?? ''}</span>
                  </div>
                  {item?.slug && (
                    <ArrowRight size={16} strokeWidth={1.5} className="text-white/30 group-hover:text-[var(--vp-accent)] transition-colors duration-300" />
                  )}
                </div>
              </motion.div>
            );
            return item?.slug ? (
              <Link key={i} href={item.slug} className="block">
                {cardContent}
              </Link>
            ) : (
              <div key={i}>{cardContent}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
