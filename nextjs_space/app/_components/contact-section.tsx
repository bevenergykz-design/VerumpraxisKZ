'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { WhatsAppIcon, TelegramIcon } from './floating-buttons';

export default function ContactSection() {
  const { t } = useI18n();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
    honeypot: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formState?.honeypot) return;
    setStatus('loading');
    try {
      let res = await fetch('/send.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      }).catch(() => null);

      if (!res || !res.ok) {
        res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formState),
        }).catch(() => null);
      }

      const data = await res?.json?.();
      if (data?.success) {
        setStatus('success');
        setFormState({ name: '', email: '', service: '', message: '', honeypot: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const serviceOptions = t('contact.form.serviceOptions') ?? [];
  const inputClasses = "w-full px-5 py-3.5 bg-white/[0.04] border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[var(--vp-accent)] transition-all duration-300 text-sm";

  return (
    <section id="contact" className="gradient-dark py-24 sm:py-28 md:py-36">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-[42px] text-white mb-4">
            {t('contact.title') ?? ''}
          </h2>
          <p className="text-white/50 text-base">{t('contact.subtitle') ?? ''}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 sm:gap-16">
          {/* Form */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            {status === 'success' ? (
              <div className="p-10 text-center" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4 }}>
                <CheckCircle size={48} strokeWidth={1.5} className="mx-auto mb-5" style={{ color: '#4ade80' }} />
                <p className="text-white text-lg">{t('contact.form.success') ?? ''}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form">
                {/* Honeypot */}
                <div className="hidden">
                  <input
                    type="text"
                    name="honeypot"
                    value={formState?.honeypot ?? ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormState((prev: any) => ({ ...(prev ?? {}), honeypot: e?.target?.value ?? '' }))}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <input
                  type="text"
                  required
                  placeholder={t('contact.form.name') ?? 'Name'}
                  value={formState?.name ?? ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormState((prev: any) => ({ ...(prev ?? {}), name: e?.target?.value ?? '' }))}
                  className={inputClasses}
                  style={{ borderRadius: 4 }}
                  aria-label={t('contact.form.name') ?? 'Name'}
                />
                <input
                  type="email"
                  required
                  placeholder={t('contact.form.email') ?? 'Email'}
                  value={formState?.email ?? ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormState((prev: any) => ({ ...(prev ?? {}), email: e?.target?.value ?? '' }))}
                  className={inputClasses}
                  style={{ borderRadius: 4 }}
                  aria-label={t('contact.form.email') ?? 'Email'}
                />
                <select
                  required
                  value={formState?.service ?? ''}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormState((prev: any) => ({ ...(prev ?? {}), service: e?.target?.value ?? '' }))}
                  className={inputClasses}
                  style={{ borderRadius: 4 }}
                  aria-label={t('contact.form.service') ?? 'Service'}
                >
                  <option value="" className="text-gray-900">{t('contact.form.service') ?? 'Select a service'}</option>
                  {Array.isArray(serviceOptions) && serviceOptions?.map?.((opt: string, i: number) => (
                    <option key={i} value={opt ?? ''} className="text-gray-900">{opt ?? ''}</option>
                  ))}
                </select>
                <textarea
                  required
                  rows={4}
                  placeholder={t('contact.form.message') ?? 'Message'}
                  value={formState?.message ?? ''}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormState((prev: any) => ({ ...(prev ?? {}), message: e?.target?.value ?? '' }))}
                  className={`${inputClasses} resize-none`}
                  style={{ borderRadius: 4 }}
                  aria-label={t('contact.form.message') ?? 'Message'}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex items-center justify-center gap-2.5 w-full px-6 py-3.5 text-white font-semibold transition-all duration-300 hover:brightness-110 disabled:opacity-50"
                  style={{ backgroundColor: 'var(--vp-accent)', borderRadius: 4, fontFamily: "'Open Sans', sans-serif" }}
                >
                  <Send size={16} strokeWidth={1.5} />
                  {status === 'loading' ? '...' : t('contact.form.submit') ?? 'Submit'}
                </button>
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle size={16} strokeWidth={1.5} />
                    {t('contact.form.error') ?? ''}
                  </div>
                )}
                <p className="text-xs text-white/50 mt-2">
                  {t('contact.form.privacy') ?? ''}
                </p>
              </form>
            )}
          </motion.div>

          {/* Info + Map */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            <div className="space-y-5">
              <a href="mailto:info@verumpraxis.kz" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300">
                <Mail size={18} strokeWidth={1.5} style={{ color: 'var(--vp-accent)' }} />
                <span className="text-sm">info@verumpraxis.kz</span>
              </a>
              <a href="https://wa.me/77072506680" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300">
                <WhatsAppIcon className="w-[18px] h-[18px]" style={{ color: 'var(--vp-accent)' }} />
                <span className="text-sm">+7 707 250 66 80 (WhatsApp)</span>
              </a>
              <a href="https://t.me/verumpraxis" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300">
                <TelegramIcon className="w-[18px] h-[18px]" style={{ color: 'var(--vp-accent)' }} />
                <span className="text-sm">@verumpraxis (Telegram)</span>
              </a>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin size={18} strokeWidth={1.5} style={{ color: 'var(--vp-accent)' }} />
                <span className="text-sm">{t('contact.address') ?? ''}</span>
              </div>
            </div>

            {/* Map */}
            <div className="overflow-hidden" style={{ borderRadius: 4 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2908.418725511248!2d76.89565569999999!3d43.20070609999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836966b8f8a83b%3A0xc9838ae999e30775!2sVerumpraxis!5e0!3m2!1sru!2skz!4v1781715957533!5m2!1sru!2skz"
                width="100%"
                height="300"
                className="sm:h-[340px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Verumpraxis офис Кожабекова 19 Алматы"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
