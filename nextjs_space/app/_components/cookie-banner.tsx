'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { Cookie } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage?.getItem?.('vp-cookies');
    if (!accepted) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    try { localStorage?.setItem?.('vp-cookies', 'accepted'); } catch {}
    setShow(false);
  };

  const handleDecline = () => {
    try { localStorage?.setItem?.('vp-cookies', 'declined'); } catch {}
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="max-w-[800px] mx-auto rounded-lg p-4 flex flex-col sm:flex-row items-center gap-4 shadow-xl" style={{ backgroundColor: 'var(--vp-footer)' }}>
            <Cookie size={24} style={{ color: 'var(--vp-accent)' }} className="flex-shrink-0" />
            <p className="text-sm text-white/80 flex-1">{t('cookie.text') ?? ''}</p>
            <div className="flex gap-2">
              <button
                onClick={handleAccept}
                className="px-4 py-2 rounded text-white text-sm font-medium"
                style={{ backgroundColor: 'var(--vp-accent)' }}
              >
                {t('cookie.accept') ?? 'Accept'}
              </button>
              <button
                onClick={handleDecline}
                className="px-4 py-2 rounded text-white/60 text-sm border border-white/20 hover:bg-white/5"
              >
                {t('cookie.decline') ?? 'Decline'}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
