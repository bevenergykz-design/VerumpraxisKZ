import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://verumpraxis.kz';

  // hreflang alternates for the language variants of the homepage.
  const homeLanguages = {
    ru: siteUrl,
    en: 'https://verumpraxis.com',
    kk: `${siteUrl}/kz`,
    zh: `${siteUrl}/zh`,
    'x-default': siteUrl,
  };

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
      alternates: { languages: homeLanguages },
    },
    {
      url: `${siteUrl}/kz`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      alternates: { languages: homeLanguages },
    },
    {
      url: `${siteUrl}/zh`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      alternates: { languages: homeLanguages },
    },
    {
      url: `${siteUrl}/publications`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/publications/legal-guide-investors`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/publications/digital-assets`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
  ];
}
