import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://verumpraxis.kz'),
  title: {
    default: 'Verumpraxis — Law Firm in Almaty, Kazakhstan | English Speaking Lawyers | Юридическая фирма в Алматы',
    template: '%s | Verumpraxis — Law Firm Almaty Kazakhstan',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  description: 'Verumpraxis — English speaking law firm in Almaty, Kazakhstan. Legal services for international investors and businesses: corporate law, M&A, tax advisory, AIFC, dispute resolution, employment law, digital law, intellectual property. Full-service legal counsel in Kazakhstan and Central Asia. Юридическая фирма в Алматы — юридические услуги для бизнеса и частных клиентов.',
  keywords: [
    /* English — general */
    'English speaking lawyers Almaty',
    'English speaking lawyers Kazakhstan',
    'legal services Almaty',
    'legal services Kazakhstan',
    'law firm Almaty',
    'law firm Kazakhstan',
    'international law firm Almaty',
    'lawyer in Almaty',
    'lawyer in Kazakhstan',
    'legal counsel Kazakhstan',
    'foreign investor legal support Kazakhstan',
    'business lawyer Almaty',
    'English speaking attorney Kazakhstan',
    'legal advice Almaty',
    'legal advisory Kazakhstan',
    'international legal services Central Asia',
    /* English — corporate & M&A */
    'corporate law Kazakhstan',
    'M&A Kazakhstan',
    'company registration Kazakhstan',
    'mergers and acquisitions Almaty',
    'due diligence Kazakhstan',
    'joint venture Kazakhstan',
    'corporate structuring Central Asia',
    /* English — tax */
    'tax law Kazakhstan',
    'tax advisory Almaty',
    'taxation of non-residents Kazakhstan',
    'double taxation treaty Kazakhstan',
    'tax planning Kazakhstan',
    /* English — AIFC */
    'AIFC registration',
    'AIFC law firm',
    'AIFC legal services',
    'Astana International Financial Centre',
    'AIFC company formation',
    'English law Kazakhstan',
    /* English — dispute resolution */
    'dispute resolution Kazakhstan',
    'international arbitration Kazakhstan',
    'AIFC Court',
    'litigation Kazakhstan',
    'commercial disputes Almaty',
    /* English — investment */
    'investment in Kazakhstan',
    'foreign investment Kazakhstan',
    'investor legal support Kazakhstan',
    'investment incentives Kazakhstan',
    /* English — employment */
    'employment law Kazakhstan',
    'labour law Kazakhstan',
    'work permits Kazakhstan',
    /* English — digital & IP */
    'digital law Kazakhstan',
    'data protection Kazakhstan',
    'intellectual property Kazakhstan',
    'trademark registration Kazakhstan',
    /* English — private clients */
    'immigration lawyer Kazakhstan',
    'residence permit Kazakhstan',
    'real estate lawyer Almaty',
    /* Общие */
    'юридическая фирма Алматы',
    'юридическая фирма Казахстан',
    'юридические услуги Алматы',
    'юридические услуги Казахстан',
    'юрист Алматы',
    'адвокат Алматы',
    'юридическая консультация Алматы',
    'юридическое сопровождение бизнеса',
    'юридический аутсорсинг Алматы',
    'Verumpraxis',
    /* Трудовое право */
    'трудовое право Алматы',
    'трудовое право Казахстан',
    'юрист по трудовым спорам',
    'трудовой договор Казахстан',
    'увольнение работника РК',
    'трудовой спор суд',
    'трудовой аудит',
    'коллективный договор',
    'согласительная комиссия',
    'сопровождение увольнения',
    /* Корпоративное право и M&A */
    'корпоративное право Казахстан',
    'корпоративный юрист Алматы',
    'M&A Казахстан',
    'слияния и поглощения',
    'регистрация ТОО',
    'регистрация компании Казахстан',
    'перерегистрация юридического лица',
    'реорганизация компании',
    'ликвидация ТОО',
    'уставный капитал',
    'корпоративное управление',
    'корпоративные споры',
    'Due Diligence',
    'правовой аудит',
    'банкротство Казахстан',
    /* Налоговое право */
    'налоговое право Казахстан',
    'налоговый юрист Алматы',
    'налоговое планирование',
    'налоговая оптимизация',
    'налогообложение нерезидентов',
    'двойное налогообложение',
    'налоговые споры',
    'Astana Hub налоги',
    'СЭЗ Казахстан',
    'налоговые льготы РК',
    /* Разрешение споров */
    'судебные споры Казахстан',
    'арбитраж Казахстан',
    'международный арбитраж',
    'арбитраж AIFC DIFC LCIA',
    'досудебное урегулирование',
    'медиация Казахстан',
    'представительство в суде',
    'исполнительное производство',
    'обжалование налоговых проверок',
    'взыскание задолженности',
    /* Право МФЦА */
    'МФЦА регистрация',
    'AIFC регистрация компании',
    'право МФЦА',
    'лицензирование МФЦА',
    'суд МФЦА',
    'английское право Казахстан',
    'венчурные фонды МФЦА',
    'финтех МФЦА',
    /* Иностранные юрисдикции */
    'регистрация компании за рубежом',
    'регистрация компании в США',
    'оффшор Казахстан',
    'траст защита активов',
    'SPV создание',
    'международные сделки',
    'трансграничный бизнес',
    'холдинговая структура',
    /* Цифровое право */
    'цифровое право Казахстан',
    'защита персональных данных',
    'криптовалюта Казахстан закон',
    'блокчейн юрист',
    'финтех право',
    'цифровые активы',
    'аудит персональных данных',
    'e-commerce право',
    /* Инвестиции */
    'инвестиционные проекты Казахстан',
    'инвестиционные преференции',
    'инвестиционный контракт',
    'EPC контракт',
    'инвестиционные фонды',
    'юридическое сопровождение инвестиций',
    /* Интеллектуальная собственность */
    'интеллектуальная собственность Казахстан',
    'регистрация товарного знака',
    'патент Казахстан',
    'авторское право',
    'NDA соглашение',
    'защита бренда',
    'товарный знак Алматы',
    /* Частные клиенты */
    'наследственное право Казахстан',
    'юрист по наследству Алматы',
    'сделки с недвижимостью юрист',
    'иммиграция Казахстан',
    'ВНЖ Казахстан',
    'гражданство Казахстан',
    'сопровождение сделок купли-продажи',
    'управление активами',
    'юрист по недвижимости Алматы',
  ],
  openGraph: {
    title: 'Verumpraxis — English Speaking Law Firm in Almaty, Kazakhstan | Legal Services for Investors',
    description: 'English speaking lawyers in Almaty, Kazakhstan. Legal services for international investors and businesses: corporate law, M&A, tax, AIFC, dispute resolution, employment law, IP, digital law. Full-service legal counsel in Kazakhstan and Central Asia.',
    images: [{ url: '/images/og_image.png', width: 1200, height: 630, alt: 'Verumpraxis — English speaking law firm in Almaty, Kazakhstan: corporate law, tax, AIFC, M&A, dispute resolution' }],
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ru_RU'],
    siteName: 'Verumpraxis',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://verumpraxis.kz',
    languages: {
      'ru': 'https://verumpraxis.kz',
      'en': 'https://verumpraxis.com',
      'kk': 'https://verumpraxis.kz/kz',
      'zh': 'https://verumpraxis.kz/zh',
      'x-default': 'https://verumpraxis.kz',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="google-site-verification" content="bboY_ALC-2rVj72g0ZUrN0y56JcCznSNHOs9b4BXfhE" />
        <meta name="yandex-verification" content="22a7fce8568c34e6" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              [style*="opacity:0"], [style*="opacity: 0"] {
                opacity: 1 !important;
                transform: none !important;
              }
            `,
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Z0YL95T9MS" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Z0YL95T9MS');
            `,
          }}
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <SchemaMarkup />
      </body>
    </html>
  );
}

function SchemaMarkup() {
  const siteUrl = 'https://verumpraxis.kz';
  const logoUrl = `${siteUrl}/images/og_image.png`;

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: 'Verumpraxis',
      alternateName: 'Верумпраксис',
      description: 'English speaking law firm in Almaty, Kazakhstan. Full-service legal counsel for international investors and businesses: employment law, corporate law and M&A, tax advisory, dispute resolution, AIFC law, digital law, data protection, investments, intellectual property, foreign jurisdictions, private clients. Legal services in Kazakhstan and Central Asia.',
      url: siteUrl,
      logo: logoUrl,
      image: logoUrl,
      telephone: '+77072506680',
      email: 'info@verumpraxis.kz',
      priceRange: '$$',
      areaServed: [
        { '@type': 'Country', name: 'Kazakhstan' },
        { '@type': 'Place', name: 'Central Asia' },
        { '@type': 'Place', name: 'International' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Юридические услуги',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Трудовое право', description: 'Юрист по трудовым спорам в Алматы. Трудовые договоры, увольнение работника, правовой аудит трудового законодательства, коллективные договоры, согласительные комиссии, представительство в суде по трудовым спорам.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Содействие в иностранных юрисдикциях', description: 'Регистрация компаний за рубежом: США, ОАЭ, Великобритания, Кипр. Создание SPV, трастов и фондов. Координация иностранных консультантов, международные сделки, импорт и экспорт.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Цифровое право и защита персональных данных', description: 'Юрист по цифровому праву в Казахстане. Криптовалюта, блокчейн, финтех, цифровые активы, токены, аудит персональных данных, e-commerce, сопровождение онлайн-платформ, кибербезопасность.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Услуги частным лицам', description: 'Юрист для частных клиентов в Алматы. Наследственное право, юрист по наследству, сделки с недвижимостью, купля-продажа, трасты, офшорное планирование, иммиграция, ВНЖ, гражданство Казахстан.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Инвестиции', description: 'Юридическое сопровождение инвестиций в Казахстане. Инвестиционные проекты, преференции, инвестиционные фонды, EPC-контракты, инвестиционные контракты, арбитражные споры, AML-комплаенс.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Налоговое право', description: 'Налоговый юрист Алматы. Налогообложение нерезидентов, двойное налогообложение, налоговые споры, налоговое структурирование, Astana Hub, СЭЗ, налоговые льготы и преференции РК.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Разрешение споров', description: 'Адвокат по судебным спорам в Алматы. Досудебное урегулирование, медиация, представительство во всех судебных инстанциях, международный арбитраж AIFC DIFC LCIA, взыскание задолженности, исполнение решений.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Право МФЦА', description: 'Регистрация компаний в МФЦА (AIFC). Фонды, трасты, управляющие компании. Лицензирование регулируемых видов деятельности, финтех в МФЦА, абонентское юридическое сопровождение.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Корпоративное право и M&A', description: 'Корпоративный юрист Алматы. Слияния и поглощения, регистрация ТОО, перерегистрация, реорганизация, ликвидация, Due Diligence, корпоративное управление, уставный капитал, банкротство.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Интеллектуальная собственность', description: 'Регистрация товарного знака в Казахстане и за рубежом. Патенты, авторское право, NDA, защита бренда, Due Diligence объектов ИС, защита от нарушений в судах и арбитражах.' } },
        ],
      },
      knowsAbout: [
        /* English */
        'Employment Law Kazakhstan', 'Labour Disputes', 'Corporate Law Kazakhstan', 'Company Registration Kazakhstan',
        'M&A Kazakhstan', 'Mergers and Acquisitions', 'Due Diligence', 'Tax Law Kazakhstan', 'Tax Advisory',
        'Dispute Resolution', 'International Arbitration', 'AIFC', 'AIFC Law', 'AIFC Registration', 'AIFC Court',
        'Digital Law', 'Data Protection', 'Cryptocurrency Law', 'Fintech', 'Blockchain',
        'Investment Law Kazakhstan', 'Foreign Investment', 'Intellectual Property', 'Trademark Registration',
        'Immigration Law Kazakhstan', 'Residence Permit', 'Real Estate Law',
        'English Speaking Lawyers Almaty', 'Legal Services Kazakhstan', 'Central Asia Legal Counsel',
        /* Russian */
        'Трудовое право', 'Корпоративное право', 'Налоговое право', 'Разрешение споров',
        'МФЦА', 'Право МФЦА', 'Цифровое право', 'Инвестиции',
        'Интеллектуальная собственность', 'Слияния и поглощения',
        'Наследственное право', 'Иммиграция', 'Юридические услуги Алматы',
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Кожабекова 19, 4 этаж, офис 8',
        addressLocality: 'Алматы',
        addressRegion: 'Алматы',
        postalCode: '050040',
        addressCountry: 'KZ',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 43.2007061,
        longitude: 76.8956557,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '19:00',
      },
      sameAs: [
        'https://www.youtube.com/channel/UCIK_cLugg7uYfo9krFh9_XQ',
        'https://www.instagram.com/verumpraxis',
        'https://www.tiktok.com/@verumpraxis_kz',
        'https://t.me/verumpraxis',
        'https://maps.google.com/?cid=14520602359486416757',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Verumpraxis',
      url: siteUrl,
      logo: logoUrl,
      foundingDate: '2023',
      numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 4, maxValue: 10 },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+77072506680',
        email: 'info@verumpraxis.kz',
        contactType: 'customer service',
        availableLanguage: ['Russian', 'English', 'Kazakh', 'Chinese'],
      },
      sameAs: [
        'https://www.youtube.com/channel/UCIK_cLugg7uYfo9krFh9_XQ',
        'https://www.instagram.com/verumpraxis',
        'https://www.tiktok.com/@verumpraxis_kz',
        'https://t.me/verumpraxis',
        'https://maps.google.com/?cid=14520602359486416757',
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Кожабекова 19, 4 этаж, офис 8',
        addressLocality: 'Алматы',
        addressCountry: 'KZ',
      },
    },

  ];

  return (
    <>
      {schemas?.map?.((schema: any, i: number) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}