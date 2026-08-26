import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export default function robots(): MetadataRoute.Robots {
  let siteUrl = 'https://verumpraxis.kz';
  try {
    const headersList = headers();
    const host = headersList?.get?.('x-forwarded-host');
    if (host) siteUrl = `https://${host}`;
  } catch {}

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
