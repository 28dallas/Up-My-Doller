import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://up-my-doller-yn86.vercel.app', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://up-my-doller-yn86.vercel.app/bots', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://up-my-doller-yn86.vercel.app/pricing', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://up-my-doller-yn86.vercel.app/copy-trading', lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: 'https://up-my-doller-yn86.vercel.app/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://up-my-doller-yn86.vercel.app/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://up-my-doller-yn86.vercel.app/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]
}
