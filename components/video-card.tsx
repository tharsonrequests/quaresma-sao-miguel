"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Check, Lock, Play } from "lucide-react"
import type { Video } from "@/data/videos"
import { formatDate, getThumbnail } from "@/lib/quaresma"
import { cn } from "@/lib/utils"

interface VideoCardProps {
  video: Video
  unlocked: boolean
  watched: boolean
  onPlay: (video: Video) => void
}

export function VideoCard({ video, unlocked, watched, onPlay }: VideoCardProps) {
  return (
    <motion.article
      id={`dia-${video.day}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group flex scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-border bg-card/50"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={getThumbnail(video) || "/placeholder.svg"}
          alt={`Miniatura do dia ${video.day}: ${video.title}`}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={cn(
            "object-cover transition-transform duration-500",
            unlocked ? "group-hover:scale-105" : "scale-105 blur-sm brightness-50",
          )}
        />
        <div className="absolute left-3 top-3 rounded-full bg-background/70 px-2.5 py-1 text-xs font-semibold tabular-nums text-foreground backdrop-blur-sm">
          Dia {video.day}
        </div>

        {watched && unlocked && (
          <div className="absolute right-3 top-3 inline-flex size-7 items-center justify-center rounded-full bg-gold text-gold-foreground shadow">
            <Check className="size-4" />
            <span className="sr-only">Assistido</span>
          </div>
        )}

        {!unlocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
            <Lock className="size-6 text-gold" aria-hidden="true" />
            <span className="px-3 text-xs font-medium text-foreground/90">
              Disponível em {formatDate(video.date)}
            </span>
          </div>
        )}

        {unlocked && (
          <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold/90 text-gold-foreground opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
            <Play className="size-5 translate-x-0.5 fill-current" />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-pretty font-serif text-lg font-semibold leading-snug">{video.title}</h3>
        <div className="mt-auto pt-4">
          <button
            type="button"
            disabled={!unlocked}
            onClick={() => onPlay(video)}
            aria-label={
              unlocked
                ? `Assistir ao dia ${video.day}: ${video.title}`
                : `Bloqueado até ${formatDate(video.date)}`
            }
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              unlocked
                ? "bg-gold text-gold-foreground hover:bg-gold/90"
                : "cursor-not-allowed bg-secondary text-muted-foreground",
            )}
          >
            {unlocked ? (
              <>
                <Play className="size-4 fill-current" /> Assistir
              </>
            ) : (
              <>
                <Lock className="size-4" /> Bloqueado
              </>
            )}
          </button>
        </div>
      </div>
    </motion.article>
  )
}
