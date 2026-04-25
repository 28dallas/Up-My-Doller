import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Clock, Tag } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { MOCK_BLOG_POSTS } from '@/lib/data'

const CATEGORIES = ['All', 'Strategy', 'Tutorial', 'Market Analysis', 'News']

const CATEGORY_COLORS: Record<string, 'green' | 'blue' | 'yellow' | 'gold'> = {
  strategy: 'green',
  tutorial: 'blue',
  market_analysis: 'yellow',
  news: 'gold',
}

const CATEGORY_LABELS: Record<string, string> = {
  strategy: 'Strategy',
  tutorial: 'Tutorial',
  market_analysis: 'Market Analysis',
  news: 'News',
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />

      <section className="pt-4 pb-10 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Trading <span className="gradient-text">Resources & Blog</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Strategies, tutorials, and market analysis from expert Deriv traders.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap bg-card border border-border text-muted-foreground hover:text-white hover:border-primary/50 transition-all first:bg-primary first:text-black first:border-primary"
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_BLOG_POSTS.map((post) => (
            <Card key={post.id} glow="green" className="flex flex-col group">
              <div className="w-full h-44 rounded-lg bg-gradient-to-br from-primary/10 to-gold/10 border border-border mb-4 flex items-center justify-center">
                <div className="text-3xl font-bold text-primary">Chart</div>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant={CATEGORY_COLORS[post.category] || 'default'}>
                  <Tag className="w-3 h-3 mr-1" />
                  {CATEGORY_LABELS[post.category]}
                </Badge>
                <div className="flex items-center gap-1 text-muted-foreground text-xs">
                  <Clock className="w-3 h-3" />
                  {post.read_time} min read
                </div>
              </div>
              <h3 className="text-white font-bold text-base mb-2 group-hover:text-primary transition-colors leading-snug flex-1">
                {post.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="text-primary text-sm font-semibold hover:text-primary/80 transition-colors">
                Read More -
              </Link>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
