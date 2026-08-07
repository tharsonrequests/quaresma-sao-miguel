"use client"

import { videos } from "@/data/videos"
import { isVideoUnlocked } from "@/lib/quaresma"
import { useQuaresma } from "@/hooks/use-quaresma"
import { useProgressContext } from "@/components/progress-provider"
import { useVideoModal } from "@/components/video-modal"
import { VideoCard } from "@/components/video-card"
import { ProgressBar } from "@/components/progress-bar"

export function VideoGrid() {
  const { ready } = useQuaresma()
  const { openVideo } = useVideoModal()
  const { isWatched, watchedCount, percentage, hydrated } = useProgressContext()

  const now = new Date()

  return (
    <section id="todos-os-dias" className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-16 sm:py-20">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="text-balance font-serif text-3xl font-semibold sm:text-4xl">Todos os 40 dias</h2>
        <p className="mt-3 text-pretty text-muted-foreground">
          Um vídeo por dia. Os próximos são liberados automaticamente na data certa.
        </p>
        {hydrated && (
          <div className="mx-auto mt-6 max-w-md">
            <ProgressBar value={watchedCount} max={videos.length} label={`${watchedCount} de ${videos.length} assistidos`} />
            <span className="sr-only">{percentage}% concluído</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {videos.map((video) => {
          const unlocked = ready ? isVideoUnlocked(video, now) : false
          return (
            <VideoCard
              key={video.day}
              video={video}
              unlocked={unlocked}
              watched={isWatched(video.day)}
              onPlay={openVideo}
            />
          )
        })}
      </div>
    </section>
  )
}
