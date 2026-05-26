import type { MetadataRoute } from 'next'
import { bots } from '@/data/bots'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pipsdollarprinter.com'
  const routes = [
    '',
    '/pricing',
    '/blog',
    '/about',
    '/contact',
    '/terms',
    '/privacy',
    '/disclaimer',
    '/bots',
    '/copy-trading',
  ]

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))

  const blogSlugs = [
    'volatility-strategies-2026',
    'build-first-deriv-bot',
    'boom-crash-analysis-2026',
    'copy-trading-guide',
    'mpesa-deriv-guide-kenya',
    'risk-management-guide',
  ]

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const botEntries: MetadataRoute.Sitemap = bots.slice(0, 6).map((bot) => ({
    url: `${base}/bots#${bot.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...staticEntries, ...blogEntries, ...botEntries]
}
