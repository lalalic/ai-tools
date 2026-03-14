import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://smartai-tools.vercel.app'
  const tools = ['writer', 'email', 'translator', 'code', 'summarizer', 'social', 'resume', 'seo']

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...tools.map(tool => ({
      url: `${base}/tools/${tool}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ]
}
