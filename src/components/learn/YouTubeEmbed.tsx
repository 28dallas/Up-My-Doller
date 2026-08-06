'use client'
import { useState } from 'react'
import { Play, Loader2 } from 'lucide-react'

interface YouTubeEmbedProps {
  videoId: string
  title?: string
}

export default function YouTubeEmbed({ videoId, title = 'Video Tutorial' }: YouTubeEmbedProps) {
  const [loaded, setLoaded] = useState(false)

  if (!loaded) {
    return (
      <button
        onClick={() => setLoaded(true)}
        className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-[#0a0e2e] border border-primary/30 group"
        aria-label={`Play ${title}`}
      >
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(0,230,118,0.4)] transition-transform group-hover:scale-110">
            <Play className="w-7 h-7 text-black" style={{ fill: 'black', marginLeft: 2 }} />
          </div>
          <span className="text-primary font-semibold text-sm">{title}</span>
        </div>
      </button>
    )
  }

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-primary/30 bg-black">
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
