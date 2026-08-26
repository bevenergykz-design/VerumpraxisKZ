'use client';

import { useI18n } from '@/lib/i18n/context';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote } from 'lucide-react';

export default function AboutSection() {
  const { t } = useI18n();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="mission" className="gradient-dark py-24 sm:py-28 md:py-36" ref={ref}>
      <div className="max-w-[1000px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-[42px] text-white mb-10 sm:mb-14">
            {t('about.title') ?? ''}
          </h2>

          <div className="space-y-5 sm:space-y-6 text-base sm:text-[17px] max-w-3xl leading-relaxed" style={{ color: 'var(--vp-text-light)' }}>
            <p>{t('about.p1') ?? ''}</p>
            <p>{t('about.p2') ?? ''}</p>
            <p>{t('about.p3') ?? ''}</p>
          </div>

          {/* Mission block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 sm:mt-16 p-7 sm:p-10 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(58,154,191,0.1), rgba(42,112,144,0.06))',
              borderLeft: '3px solid var(--vp-accent)',
              borderRadius: 4,
            }}
          >
            <Quote size={36} className="absolute top-5 right-5 text-white/[0.06]" strokeWidth={1} />
            <p className="font-heading italic text-xl sm:text-2xl md:text-[28px] text-white leading-relaxed">
              {t('about.mission') ?? ''}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
