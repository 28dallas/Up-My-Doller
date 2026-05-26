'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Clock } from 'lucide-react'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import MarketTicker from '@/components/shared/MarketTicker'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { blogPosts } from '@/data/blogPosts'

const categories = ['All', 'Strategy', 'Tutorial', 'Market Analysis', 'Guide'] as const

export default function BlogPage() {
  const [category, setCategory] = useState<(typeof categories)[number]>('All')

  const posts = useMemo(() => {
    return category === 'All' ? blogPosts : blogPosts.filter((post) => post.category === category)
  }, [category])

  return (
    <>
      <Navbar />
      <MarketTicker />
      <main className="mx-auto min-h-screen max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Blog
          </span>
          <h1 className="mt-6 text-4xl font-bold text-white md:text-6xl">Guides, strategy ideas, and market thinking</h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
            Explore platform tutorials, copy-trading guides, volatility-index strategy breakdowns, and practical risk management lessons built for synthetic-index traders.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${category === item ? 'bg-primary text-black' : 'border border-border text-muted-foreground'}`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.slug} glow="green" className="flex flex-col">
              <div className="mb-4 rounded-[1.5rem] border border-border bg-background/40 p-6">
                <Badge variant="blue">{post.category}</Badge>
                <h2 className="mt-4 text-2xl font-bold text-white">{post.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
              </div>
              <div className="mt-auto flex items-center justify-between text-sm text-muted-foreground">
                <span>{post.author}</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime} min
                </span>
              </div>
              <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex text-sm font-semibold text-primary hover:underline">
                Read article
              </Link>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
