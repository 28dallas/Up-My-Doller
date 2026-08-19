import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://up-my-doller-yn86.vercel.app', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://up-my-doller-yn86.vercel.app/learn', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://up-my-doller-yn86.vercel.app/learn/deriv-basics', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://up-my-doller-yn86.vercel.app/strategies', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
{ url: 'https://up-my-doller-yn86.vercel.app/strategies/alembert', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://up-my-doller-yn86.vercel.app/strategies/oscars-grind', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://up-my-doller-yn86.vercel.app/strategies/over-under', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://up-my-doller-yn86.vercel.app/strategies/rise-fall-trend', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://up-my-doller-yn86.vercel.app/strategies/even-odd', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://up-my-doller-yn86.vercel.app/strategies/digit-match', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://up-my-doller-yn86.vercel.app/strategies/touch-no-touch', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://up-my-doller-yn86.vercel.app/tools/risk-calculator', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://up-my-doller-yn86.vercel.app/tools/trading-times', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://up-my-doller-yn86.vercel.app/bots/recommended', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://up-my-doller-yn86.vercel.app/refer', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://up-my-doller-yn86.vercel.app/comparisons', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://up-my-doller-yn86.vercel.app/comparisons/deriv-vs-pocketoption', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://up-my-doller-yn86.vercel.app/comparisons/deriv-vs-binomo', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://up-my-doller-yn86.vercel.app/comparisons/deriv-vs-olymptrade', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://up-my-doller-yn86.vercel.app/bots', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://up-my-doller-yn86.vercel.app/pricing', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://up-my-doller-yn86.vercel.app/copy-trading', lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: 'https://up-my-doller-yn86.vercel.app/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://up-my-doller-yn86.vercel.app/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://up-my-doller-yn86.vercel.app/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]
}
