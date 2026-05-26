import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock } from 'lucide-react'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import MarketTicker from '@/components/shared/MarketTicker'
import Badge from '@/components/ui/Badge'
import { blogPosts } from '@/data/blogPosts'

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((entry) => entry.slug === params.slug)
  if (!post) notFound()

  const related = blogPosts.filter((entry) => entry.slug !== post.slug && entry.category === post.category).slice(0, 2)

  return (
    <>
      <Navbar />
      <MarketTicker />
      <main className="mx-auto min-h-screen max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.8fr,0.8fr]">
          <article className="rounded-[2rem] border border-border bg-card/80 p-8">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="blue">{post.category}</Badge>
              <span className="text-sm text-muted-foreground">{post.author}</span>
              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {post.readTime} min read
              </span>
            </div>
            <h1 className="mt-6 text-4xl font-bold text-white">{post.title}</h1>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{post.excerpt}</p>

            <div className="mt-8 space-y-6">
              {post.content.map((paragraph, index) => (
                <p key={`${post.slug}-${index}`} className="text-sm leading-8 text-slate-200">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          <aside className="space-y-6">
            <div className="sticky top-28 rounded-[2rem] border border-border bg-card/80 p-6">
              <h2 className="text-lg font-bold text-white">Start trading smarter</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Build bots, compare traders, and test workflows in a live-looking environment designed for African Deriv users.
              </p>
              <Link href="/auth/signup" className="mt-5 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-black">
                Create free account
              </Link>
            </div>

            {related.length > 0 && (
              <div className="rounded-[2rem] border border-border bg-card/80 p-6">
                <h2 className="text-lg font-bold text-white">Related posts</h2>
                <div className="mt-4 space-y-4">
                  {related.map((entry) => (
                    <Link key={entry.slug} href={`/blog/${entry.slug}`} className="block rounded-2xl border border-border bg-background/40 p-4 transition hover:border-primary/40">
                      <p className="font-semibold text-white">{entry.title}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{entry.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>
      <Footer />
    </>
  )
}
