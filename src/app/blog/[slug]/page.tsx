import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Clock, Tag, ArrowLeft, Share2 } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { MOCK_BLOG_POSTS } from '@/lib/data'

const FULL_CONTENT: Record<string, string[]> = {
  'top-5-volatility-strategies-2024': [
    'The Volatility Index on Deriv is one of the most traded synthetic instruments in Africa. Unlike real forex markets, it runs 24/7 and is not affected by news events — making it ideal for automated bots.',
    '## 1. Over/Under Strategy\nThe Over/Under strategy bets on whether the last digit of the price will be over or under a specific number (usually 5). With a well-tuned martingale recovery, this strategy can achieve 60-70% win rates on Volatility 10.',
    '## 2. Rise/Fall with Trend Filter\nUsing a simple moving average to determine trend direction, then only taking Rise trades in uptrends and Fall trades in downtrends significantly improves accuracy.',
    '## 3. Even/Odd Digit Strategy\nThis strategy predicts whether the last digit of the closing price will be even or odd. The theoretical win rate is 50%, but with proper stake management and timing, traders report 55-62% win rates.',
    '## 4. Digit Match Strategy\nPredicting the exact last digit (0-9) pays out 9x your stake. While the win rate is ~10%, a single win recovers multiple losses. Best used with small stakes.',
    '## 5. Touch/No Touch Barriers\nSetting barrier levels based on recent high/low ranges and betting on No Touch can yield consistent returns during low-volatility periods.',
    '## Risk Management\nRegardless of strategy, always set a stop loss of 20-30% of your daily budget. Never chase losses with oversized stakes. The best traders are consistent, not aggressive.',
  ],
  'build-first-deriv-bot': [
    'Building your first Deriv bot used to require knowledge of XML and the DBot platform. With Pips Dollar Printer\'s no-code builder, you can create a fully functional bot in under 10 minutes.',
    '## Step 1: Choose Your Market\nStart with Volatility 10 Index — it has the lowest volatility and is most predictable for beginners. Avoid Crash/Boom markets until you have experience.',
    '## Step 2: Select a Strategy\nFor beginners, Over/Under is the safest starting point. Set the barrier to 5 (over or under) for a near 50/50 chance.',
    '## Step 3: Set Your Stake\nStart with the minimum stake ($0.35 on Deriv). Never risk more than 1-2% of your account on a single trade.',
    '## Step 4: Configure Martingale\nSet martingale multiplier to 1.5x. This means after a loss, your next stake is 1.5x the previous. Cap it at 5 levels maximum.',
    '## Step 5: Set Take Profit & Stop Loss\nSet take profit at 2x your daily target and stop loss at your daily budget. The bot will automatically stop when either is hit.',
    '## Step 6: Deploy\nClick "Deploy to Deriv" and connect your Deriv account via OAuth. Your bot will start trading immediately.',
  ],
  'boom-crash-market-analysis': [
    'Boom and Crash indices are among the most exciting — and risky — instruments on Deriv. Understanding their mechanics is essential before trading them with bots.',
    '## What are Boom & Crash Indices?\nBoom indices have a spike upward on average every 500 or 1000 ticks. Crash indices have a spike downward on average every 500 or 1000 ticks. The exact timing is random.',
    '## Boom 1000 vs Boom 500\nBoom 1000 spikes less frequently (every ~1000 ticks) but the spikes are larger. Boom 500 spikes more often with smaller moves. For bots, Boom 500 provides more trading opportunities.',
    '## Best Bot Strategies for Boom/Crash\nThe most effective strategy is to trade Rise on Boom indices and Fall on Crash indices — betting that the next spike will occur soon. This works best after a long period without a spike.',
    '## Risk Warning\nBoom and Crash indices are high-risk. A single spike against your position can wipe out multiple wins. Always use strict stop losses and never over-leverage.',
    '## Recommended Settings\nFor Boom 1000: Stake $1, Take Profit $20, Stop Loss $10. For Crash 500: Stake $0.5, Take Profit $15, Stop Loss $8. These are conservative settings for learning.',
  ],
}

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

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = MOCK_BLOG_POSTS.find((p) => p.slug === params.slug) ?? MOCK_BLOG_POSTS[0]
  const content = FULL_CONTENT[post.slug] ?? FULL_CONTENT[MOCK_BLOG_POSTS[0].slug]
  const related = MOCK_BLOG_POSTS.filter((p) => p.slug !== post.slug)

  const headings = content
    .filter((p) => p.startsWith('## '))
    .map((p) => p.replace('## ', ''))

  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20">
        <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="grid lg:grid-cols-4 gap-10">
          {/* Article */}
          <article className="lg:col-span-3">
            {/* Cover */}
            <div className="w-full h-56 rounded-2xl bg-gradient-to-br from-primary/10 to-gold/10 border border-border flex items-center justify-center mb-8">
              <div className="text-7xl">📈</div>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant={CATEGORY_COLORS[post.category] || 'default'}>
                <Tag className="w-3 h-3 mr-1" />
                {CATEGORY_LABELS[post.category]}
              </Badge>
              <div className="flex items-center gap-1 text-muted-foreground text-xs">
                <Clock className="w-3 h-3" />
                {post.read_time} min read
              </div>
              <span className="text-muted-foreground text-xs">{post.published_at}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{post.excerpt}</p>

            {/* Content */}
            <div className="prose prose-invert max-w-none space-y-5">
              {content.map((block, i) => {
                if (block.startsWith('## ')) {
                  return (
                    <h2 key={i} className="text-xl font-bold text-white mt-8 mb-3 pt-4 border-t border-border">
                      {block.replace('## ', '')}
                    </h2>
                  )
                }
                return (
                  <p key={i} className="text-muted-foreground leading-relaxed text-base">
                    {block}
                  </p>
                )
              })}
            </div>

            {/* Share */}
            <div className="mt-10 pt-6 border-t border-border flex items-center gap-3">
              <span className="text-muted-foreground text-sm">Share:</span>
              {['Twitter/X', 'Telegram', 'WhatsApp'].map((s) => (
                <button key={s} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-muted-foreground hover:text-white hover:border-primary/50 text-xs transition-all">
                  <Share2 className="w-3 h-3" />
                  {s}
                </button>
              ))}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Table of contents */}
            {headings.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-5 sticky top-24">
                <h3 className="text-white font-bold text-sm mb-4">Table of Contents</h3>
                <ul className="space-y-2">
                  {headings.map((h, i) => (
                    <li key={i}>
                      <a href={`#${h.toLowerCase().replace(/\s+/g, '-')}`} className="text-muted-foreground hover:text-primary text-xs transition-colors leading-relaxed block">
                        {i + 1}. {h}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related posts */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="text-white font-bold text-sm mb-4">Related Articles</h3>
              <div className="space-y-4">
                {related.map((p) => (
                  <Link key={p.id} href={`/blog/${p.slug}`} className="block group">
                    <div className="text-white text-xs font-medium group-hover:text-primary transition-colors leading-snug mb-1">
                      {p.title}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-xs">
                      <Clock className="w-3 h-3" />
                      {p.read_time} min read
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  )
}
