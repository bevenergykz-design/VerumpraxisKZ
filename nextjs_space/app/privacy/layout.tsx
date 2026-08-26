import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
  description: 'Политика конфиденциальности юридической фирмы Verumpraxis. Порядок сбора, обработки и защиты персональных данных в соответствии с законодательством Республики Казахстан.',
  alternates: {
    canonical: 'https://verumpraxis.kz/privacy',
  },
  robots: { index: true, follow: true },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
