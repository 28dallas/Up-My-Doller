import Link from 'next/link'
import { Clock, Tag } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { MOCK_BLOG_POSTS } from '@/lib/data'

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

export default function BlogPreviewSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="section-heading">Learn to Trade Smarter</h2>
            <p className="text-muted-foreground mt-2">Strategies, tutorials, and market analysis from expert traders.</p>
          </div>
          <Link href="/blog" className="text-primary hover:text-primary/80 text-sm font-semibold shrink-0">
            View All Articles →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {MOCK_BLOG_POSTS.map((post) => (
            <Card key={post.id} glow="green" className="flex flex-col group">
              {/* Cover image placeholder */}
              <div className="w-full h-40 rounded-lg bg-gradient-to-br from-primary/10 to-gold/10 border border-border mb-4 flex items-center justify-center">
                <div className="text-4xl">📈</div>
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

              <h3 className="text-white font-bold text-base mb-2 group-hover:text-primary transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">{post.excerpt}</p>

              <Link
                href={`/blog/${post.slug}`}
                className="text-primary text-sm font-semibold hover:text-primary/80 transition-colors"
              >
                Read More →
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
