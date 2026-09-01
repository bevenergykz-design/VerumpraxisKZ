'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Camera } from 'lucide-react';
import Image from 'next/image';

function truncateBio(bio: string, maxChars = 120): { short: string; isTruncated: boolean } {
  if (!bio || bio.length <= maxChars) return { short: bio, isTruncated: false };
  // Find the end of the sentence nearest to maxChars
  const dotIndex = bio.indexOf('.', maxChars - 30);
  if (dotIndex !== -1 && dotIndex < maxChars + 40) {
    const cut = bio.slice(0, dotIndex + 1);
    return { short: cut, isTruncated: cut.length < bio.length };
  }
  // Fallback: cut at space
  const spaceIndex = bio.lastIndexOf(' ', maxChars);
  const cut = bio.slice(0, spaceIndex > 0 ? spaceIndex : maxChars);
  return { short: cut + '…', isTruncated: true };
}

function TeamCard({ member, index, readMoreLabel, readLessLabel }: {
  member: any; index: number; readMoreLabel: string; readLessLabel: string;
}) {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const bio = member?.bio ?? '';
  const { short, isTruncated } = truncateBio(bio, 130);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="overflow-hidden hover:translate-y-[-4px] transition-all duration-400"
      style={{
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 4,
      }}
    >
      {/* Photo */}
      {member?.photo ? (
        <div className="relative h-72 sm:h-80" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
          <Image
            src={member.photo}
            alt={member?.name ?? 'Team member'}
            fill
            className="object-cover"
            style={{ objectPosition: 'center 10%' }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : (
        <div
          className="h-60 flex flex-col items-center justify-center gap-3"
          style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
        >
          <Camera size={36} strokeWidth={1} className="text-white/15" />
          <span className="text-xs tracking-[0.1em] uppercase text-white/25" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            {t('team.comingSoon') ?? 'Coming Soon'}
          </span>
        </div>
      )}
      <div className="p-6 sm:p-7">
        <h3 className="font-heading text-xl text-white mb-1.5">{member?.name ?? ''}</h3>
        <p className="text-sm font-semibold mb-2" style={{ color: 'var(--vp-accent)', fontFamily: "'Open Sans', sans-serif" }}>{member?.role ?? ''}</p>
        <p className="text-xs mb-3 text-white/35" style={{ fontFamily: "'Open Sans', sans-serif" }}>{member?.spec ?? ''}</p>

        <div className="text-sm leading-relaxed text-white/55">
          <AnimatePresence mode="wait" initial={false}>
            {expanded ? (
              <motion.p
                key="full"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {bio}
              </motion.p>
            ) : (
              <motion.p
                key="short"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {short}
              </motion.p>
            )}
          </AnimatePresence>
          {isTruncated && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2.5 text-xs font-semibold tracking-wide uppercase transition-colors duration-200 hover:brightness-125"
              style={{ color: 'var(--vp-accent)', fontFamily: "'Open Sans', sans-serif" }}
            >
              {expanded ? readLessLabel : readMoreLabel}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamSection() {
  const { t } = useI18n();
  const members = t('team.members') ?? [];
  const readMoreLabel = t('team.readMore') ?? 'Read more';
  const readLessLabel = t('team.readLess') ?? 'Read less';

  return (
    <section id="team" className="gradient-dark py-24 sm:py-28 md:py-36">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl sm:text-4xl md:text-[42px] text-white text-center mb-16 sm:mb-20"
        >
          {t('team.title') ?? ''}
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-6">
          {Array.isArray(members) && members?.map?.((member: any, i: number) => (
            <TeamCard
              key={i}
              member={member}
              index={i}
              readMoreLabel={readMoreLabel}
              readLessLabel={readLessLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
