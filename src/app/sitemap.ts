import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://1stsavvy.com';
  const lastModified = new Date();

  const publicRoutes = [
    '',
    '/family',
    '/personal-finance',
    '/about',
    '/contact',
    '/faq',
    '/updates',
    '/privacy',
    '/terms',
    '/beta-terms',
    '/children-privacy',
    '/cookies',
  ];

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' || route === '/updates' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/family' || route === '/personal-finance' ? 0.9 : 0.7,
  }));
}
