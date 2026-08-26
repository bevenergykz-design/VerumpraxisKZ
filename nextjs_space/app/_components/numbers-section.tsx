'use client';

import { useEffect, useState, useRef } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, FolderOpen, Globe2, Users } from 'lucide-react';

const ICONS = [Calendar, FolderOpen, Globe2, Users];

function AnimatedCounter({ target, suffix, started }: { target: number; suffix: string; started: boolean }) {
  const [count, setCount] = useState(0);
  const animRef = useRef<any>(null);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;
    const animate = () => {
      current += step;
      if (current >= target) {
        setCount(target);
        return;
      }
      setCount(current);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [started, target]);

  return <span>{count}{suffix}</span>;
}

export default function NumbersSection() {
  const { t } = useI18n();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const items = t('numbers.items') ?? [];

  return (
    <section id="numbers" className="py-24 sm:py-28 md:py-36" ref={ref} style={{ background: 'linear-gradient(180deg, var(--vp-dark-end), var(--vp-dark-start))' }}>
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl sm:text-4xl md:text-[42px] text-white text-center mb-16 sm:mb-20"
        >
          {t('numbers.title') ?? ''}
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8">
          {Array.isArray(items) && items?.map?.((item: any, i: number) => {
            const Icon = ICONS?.[i] ?? Calendar;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="p-5 sm:p-7 md:p-8 text-center transition-all duration-300 hover:bg-white/[0.06]"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 4,
                }}
              >
                <Icon size={26} strokeWidth={1.5} className="mx-auto mb-4 sm:mb-5" style={{ color: 'white' }} />
                <div className="font-heading text-3xl sm:text-4xl md:text-5xl mb-2" style={{ color: 'var(--vp-accent)' }}>
                  <AnimatedCounter target={item?.value ?? 0} suffix={item?.suffix ?? ''} started={inView} />
                </div>
                <div className="text-xs sm:text-sm text-white/50" style={{ fontFamily: "'Open Sans', sans-serif" }}>{item?.label ?? ''}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
