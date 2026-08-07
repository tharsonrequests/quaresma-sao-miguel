"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { CalendarClock, Play, Sparkles } from "lucide-react"
import { useQuaresma } from "@/hooks/use-quaresma"
import { useCountdown } from "@/hooks/use-countdown"
import { START_DATE, formatDate, getThumbnail } from "@/lib/quaresma"
import { useVideoModal } from "@/components/video-modal"
import { ProgressBar } from "@/components/progress-bar"

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-border bg-card/60 px-4 py-3 sm:px-6">
      <span className="font-serif text-3xl font-semibold tabular-nums text-gold sm:text-4xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
    </div>
  )
}

export function CurrentDay() {
  const { status, currentDay, totalDays, video, daysUntilStart, ready } = useQuaresma()
  const countdown = useCountdown(START_DATE)
  const { openVideo } = useVideoModal()

  const Section = ({ children }: { children: React.ReactNode }) => (
    <section id="hoje" className="mx-auto w-full max-w-4xl scroll-mt-24 px-4 py-16 sm:py-20">
      {children}
    </section>
  )

  if (!ready) {
    return (
      <Section>
        <div className="h-72 animate-pulse rounded-2xl border border-border bg-card/50" />
      </Section>
    )
  }

  return (
    <Section>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {status === "before" && (
          <div className="rounded-2xl border border-border bg-card/50 p-6 text-center sm:p-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gold">
              <CalendarClock className="size-3.5" /> Começa em {formatDate(START_DATE.toISOString().slice(0, 10))}
            </p>
            <h2 className="mt-6 text-balance font-serif text-3xl font-semibold sm:text-4xl">
              A Quaresma começa em breve
            </h2>
            <p className="mx-auto mt-3 max-w-md text-pretty text-muted-foreground">
              Prepare o coração. Faltam {daysUntilStart} {daysUntilStart === 1 ? "dia" : "dias"} para o início dos 40 dias de oração.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <CountdownUnit value={countdown.days} label="Dias" />
              <CountdownUnit value={countdown.hours} label="Horas" />
              <CountdownUnit value={countdown.minutes} label="Min" />
              <CountdownUnit value={countdown.seconds} label="Seg" />
            </div>
          </div>
        )}

        {status === "during" && video && (
          <>
            <div className="mb-6 flex flex-col items-center text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gold">
                <Sparkles className="size-3.5" /> Meditação de hoje
              </p>
              <h2 className="mt-4 text-balance font-serif text-3xl font-semibold sm:text-4xl">
                Dia {currentDay}: {video.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{formatDate(video.date)}</p>
            </div>

            <button
              type="button"
              onClick={() => openVideo(video)}
              aria-label={`Assistir ao vídeo do dia ${currentDay}: ${video.title}`}
              className="group relative block w-full overflow-hidden rounded-2xl border border-border shadow-xl shadow-background/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={getThumbnail(video) || "/placeholder.svg"}
                  alt={`Miniatura do dia ${currentDay}: ${video.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-gold-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play className="size-7 translate-x-0.5 fill-current" />
                </span>
              </div>
            </button>

            <div className="mt-8">
              <ProgressBar value={currentDay} max={totalDays} label={`Dia ${currentDay} de ${totalDays}`} />
            </div>
          </>
        )}

        {status === "after" && (
          <div className="rounded-2xl border border-border bg-card/50 p-6 text-center sm:p-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gold">
              <Sparkles className="size-3.5" /> Quaresma concluída
            </p>
            <h2 className="mt-6 text-balance font-serif text-3xl font-semibold sm:text-4xl">
              Perseverastes até o fim
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-pretty text-muted-foreground">
              Os 40 dias da Quaresma de São Miguel Arcanjo foram concluídos. Todos os vídeos estão liberados abaixo para
              que você continue meditando quando quiser. Que São Miguel continue a defender-vos no combate.
            </p>
            <div className="mt-8">
              <ProgressBar value={totalDays} max={totalDays} label={`${totalDays} de ${totalDays} dias`} />
            </div>
          </div>
        )}
      </motion.div>
    </Section>
  )
}
