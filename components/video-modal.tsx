"use client"

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, Share2, Volume2, X } from "lucide-react"
import type { Video } from "@/data/videos"
import { formatDate, getEmbedUrl } from "@/lib/quaresma"
import { useProgressContext } from "@/components/progress-provider"

interface VideoModalContextValue {
  openVideo: (video: Video) => void
}

const VideoModalContext = createContext<VideoModalContextValue | null>(null)

export function useVideoModal(): VideoModalContextValue {
  const ctx = useContext(VideoModalContext)
  if (!ctx) throw new Error("useVideoModal deve ser usado dentro de VideoModalProvider")
  return ctx
}

export function VideoModalProvider({ children }: { children: ReactNode }) {
  const [video, setVideo] = useState<Video | null>(null)
  const [copied, setCopied] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  // No celular o vídeo abre sem som (regra do sistema). Ao ativar o som,
  // remontamos o player para que ele recomece do início já com áudio.
  const [soundOn, setSoundOn] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const { markWatched } = useProgressContext()

  // Celulares/tablets (toque, sem mouse) bloqueiam autoplay COM som.
  // Detectamos esse caso para iniciar o vídeo silenciado — assim ele
  // reproduz com um único toque; no computador continua com som.
  // Combinamos vários sinais para funcionar em todos os aparelhos reais.
  useEffect(() => {
    const detect = () => {
      const coarse = window.matchMedia("(pointer: coarse)").matches
      const touch = navigator.maxTouchPoints > 0
      const mobileUA = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
      setIsMobile(coarse || touch || mobileUA)
    }
    detect()
    window.addEventListener("resize", detect)
    return () => window.removeEventListener("resize", detect)
  }, [])

  const openVideo = useCallback(
    (v: Video) => {
      setCopied(false)
      setSoundOn(false)
      setVideo(v)
      markWatched(v.day)
    },
    [markWatched],
  )

  const close = useCallback(() => setVideo(null), [])

  // Trava o scroll e permite fechar com ESC.
  useEffect(() => {
    if (!video) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [video, close])

  const handleShare = useCallback(async () => {
    if (!video) return
    const url = typeof window !== "undefined" ? `${window.location.origin}${window.location.pathname}#dia-${video.day}` : ""
    const shareData = {
      title: `Quaresma de São Miguel — Dia ${video.day}`,
      text: `${video.title} — Dia ${video.day} da Quaresma de São Miguel Arcanjo 2026.`,
      url,
    }
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(shareData)
        return
      }
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Compartilhamento cancelado pelo usuário — ignorar.
    }
  }, [video])

  return (
    <VideoModalContext.Provider value={{ openVideo }}>
      {children}
      <AnimatePresence>
        {video && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Dia ${video.day}: ${video.title}`}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              aria-label="Fechar vídeo"
              onClick={close}
              className="absolute inset-0 cursor-default bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="glass relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-border shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 p-4 sm:p-5">
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
                    Dia {video.day} · {formatDate(video.date)}
                  </p>
                  <h2 className="mt-1 truncate font-serif text-xl font-semibold">{video.title}</h2>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label="Fechar"
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="aspect-video w-full bg-black">
                {video.youtubeId ? (
                  <iframe
                    key={`${video.youtubeId}-${soundOn ? "som" : "mudo"}`}
                    src={getEmbedUrl(video.youtubeId, isMobile && !soundOn)}
                    title={`Dia ${video.day}: ${video.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="size-full"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center px-6 text-center text-sm text-muted-foreground">
                    Vídeo ainda não configurado. Adicione o <code className="mx-1 rounded bg-secondary px-1.5 py-0.5">youtubeId</code> em data/videos.ts.
                  </div>
                )}
              </div>

              {isMobile && video.youtubeId && !soundOn && (
                <div className="flex flex-col items-center gap-1.5 px-4 pt-4 text-center sm:px-5">
                  <button
                    type="button"
                    onClick={() => setSoundOn(true)}
                    className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <Volume2 className="size-4" />
                    Ativar som
                  </button>
                  <span className="text-xs text-muted-foreground">O vídeo recomeça do início com áudio.</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 p-4 sm:p-5">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {copied ? <Check className="size-4" /> : <Share2 className="size-4" />}
                  {copied ? "Link copiado" : "Compartilhar este dia"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </VideoModalContext.Provider>
  )
}
