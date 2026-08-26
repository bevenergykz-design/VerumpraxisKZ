import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Публикации: право, налоги, МФЦА, M&A | Verumpraxis',
  },
  description: 'Экспертные статьи юридической фирмы Verumpraxis: трудовое право, корпоративное право, налоговое планирование, МФЦА, M&A, цифровые активы, разрешение споров, интеллектуальная собственность. Практические рекомендации для бизнеса в Казахстане.',
  keywords: [
    'юридические статьи Казахстан', 'корпоративное право статья', 'налоговое право Казахстан',
    'МФЦА публикации', 'M&A Казахстан', 'цифровые активы Казахстан', 'правовой обзор',
    'трудовое право статья', 'юридический блог Алматы', 'Verumpraxis публикации',
  ],
  alternates: {
    canonical: 'https://verumpraxis.kz/publications',
  },
  openGraph: {
    title: 'Публикации Verumpraxis — Юридические статьи и экспертные обзоры',
    description: 'Трудовое право, корпоративное право, налоги, МФЦА, цифровые активы, разрешение споров — экспертные материалы от юристов Verumpraxis.',
    url: 'https://verumpraxis.kz/publications',
    type: 'website',
  },
};

export default function PublicationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
