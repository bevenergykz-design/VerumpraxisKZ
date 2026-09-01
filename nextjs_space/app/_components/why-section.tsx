'use client';

import { useI18n } from '@/lib/i18n/context';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe, Target, Layers, Rocket, Shield, Zap } from 'lucide-react';

const ICONS = [Globe, Target, Layers, Rocket, Shield, Zap];

export default function WhySection() {
  const { t } = useI18n();
  const cards = t('why.cards') ?? [];

  return (
    <section id="why" className="gradient-dark py-24 sm:py-28 md:py-36">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <motion.h2
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl sm:text-4xl md:text-[42px] text-white text-center mb-16 sm:mb-20"
        >
          {t('why.title') ?? ''}
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {Array.isArray(cards) && cards?.map?.((card: any, i: number) => {
            const Icon = ICONS?.[i] ?? Globe;
            return (
              <motion.div
                key={i}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-7 sm:p-8 hover:translate-y-[-4px] transition-all duration-400"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 4,
                }}
              >
                <Icon size={28} strokeWidth={1.5} style={{ color: 'var(--vp-accent)' }} className="mb-5" />
                <h3 className="font-heading text-xl text-white mb-3">{card?.title ?? ''}</h3>
                <p className="text-sm leading-relaxed text-white/55">{card?.text ?? ''}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
