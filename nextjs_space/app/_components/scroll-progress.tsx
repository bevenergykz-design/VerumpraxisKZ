'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window?.scrollY ?? 0;
      const docHeight = (document?.documentElement?.scrollHeight ?? 0) - (window?.innerHeight ?? 0);
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setWidth(progress);
    };
    window?.addEventListener?.('scroll', handleScroll, { passive: true });
    return () => window?.removeEventListener?.('scroll', handleScroll);
  }, []);

  return <div className="scroll-progress" style={{ width: `${width}%` }} />;
}
