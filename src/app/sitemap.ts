import type { MetadataRoute } from 'next';
import { bentoProjects } from '@/data/portfolio';
import { getSiteUrl } from '@/lib/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    ...bentoProjects.map((project) => ({
      url: `${siteUrl}/work/${project.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      images: [`${siteUrl}${project.image}`],
    })),
  ];
}
