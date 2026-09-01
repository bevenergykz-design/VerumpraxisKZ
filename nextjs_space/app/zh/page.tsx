import type { Metadata } from 'next';
import ClientApp from '../_components/client-app';


const LANGUAGES = {
  'ru': 'https://verumpraxis.kz',
  'en': 'https://verumpraxis.com',
  'kk': 'https://verumpraxis.kz/kz',
  'zh': 'https://verumpraxis.kz/zh',
  'x-default': 'https://verumpraxis.kz',
};

export const metadata: Metadata = {
  title: {
    absolute: '哈萨克斯坦阿拉木图律师事务所 | Verumpraxis',
  },
  description:
    'Verumpraxis 是位于哈萨克斯坦阿拉木图的律师事务所，为国际投资者和企业提供全方位法律服务：公司法、并购、税务、AIFC注册、争议解决、劳动法、数字法和知识产权。服务覆盖哈萨克斯坦及中亚地区。',
  keywords: [
    '阿拉木图律师',
    '哈萨克斯坦律师事务所',
    '哈萨克斯坦法律服务',
    '阿拉木图公司法',
    'AIFC 注册',
    '哈萨克斯坦税务律师',
    '哈萨克斯坦投资法律',
    'Verumpraxis',
  ],
  alternates: {
    canonical: 'https://verumpraxis.kz/zh',
    languages: LANGUAGES,
  },
  openGraph: {
    title: '哈萨克斯坦阿拉木图律师事务所 | Verumpraxis',
    description:
      '位于阿拉木图的律师事务所。为国际投资者和企业提供公司法、税务、AIFC、并购、争议解决等法律服务。',
    url: 'https://verumpraxis.kz/zh',
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: ['ru_RU', 'en_US', 'kk_KZ'],
    siteName: 'Verumpraxis',
    images: [{ url: '/images/og_image.png', width: 1200, height: 630, alt: 'Verumpraxis — 哈萨克斯坦阿拉木图律师事务所' }],
  },
};

export default function ChineseHome() {
  return <ClientApp initialLocale="zh" />;
}
