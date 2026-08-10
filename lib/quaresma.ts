import { videos, type Video } from "@/data/videos"

/**
 * Configuração central da Quaresma.
 * Para mudar quando a Quaresma começa, altere apenas START_DATE.
 */
export const START_DATE = new Date(2026, 7, 15, 0, 0, 0, 0) // 15 de agosto de 2026
export const TOTAL_DAYS = videos.length // 40

const MS_PER_DAY = 1000 * 60 * 60 * 24

export type QuaresmaStatus = "before" | "during" | "after"

export interface CurrentDayInfo {
  /** Status geral em relação à data de hoje. */
  status: QuaresmaStatus
  /** Número do dia atual (1..TOTAL_DAYS). Só é relevante quando status === "during". */
  currentDay: number
  /** Total de dias da Quaresma. */
  totalDays: number
  /** Vídeo correspondente ao dia atual (quando "during"). */
  video: Video | null
  /** Dias restantes para o início (quando "before"). */
  daysUntilStart: number
}

/** Zera horas/minutos/segundos para comparar apenas o dia. */
function atMidnight(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

/** Diferença em dias inteiros entre duas datas (b - a). */
export function diffInDays(a: Date, b: Date): number {
  return Math.round((atMidnight(b).getTime() - atMidnight(a).getTime()) / MS_PER_DAY)
}

/**
 * Calcula o dia atual da Quaresma com base na data fornecida (padrão: hoje).
 */
export function getCurrentDay(now: Date = new Date()): CurrentDayInfo {
  const elapsed = diffInDays(START_DATE, now) // 0 no primeiro dia

  if (elapsed < 0) {
    return {
      status: "before",
      currentDay: 0,
      totalDays: TOTAL_DAYS,
      video: null,
      daysUntilStart: Math.abs(elapsed),
    }
  }

  if (elapsed >= TOTAL_DAYS) {
    return {
      status: "after",
      currentDay: TOTAL_DAYS,
      totalDays: TOTAL_DAYS,
      video: videos[TOTAL_DAYS - 1] ?? null,
      daysUntilStart: 0,
    }
  }

  const currentDay = elapsed + 1
  return {
    status: "during",
    currentDay,
    totalDays: TOTAL_DAYS,
    video: videos[currentDay - 1] ?? null,
    daysUntilStart: 0,
  }
}

/**
 * Controla se os vídeos ficam liberados por data ou todos de uma vez.
 * true  = todos os 40 vídeos disponíveis imediatamente.
 * false = cada dia é liberado automaticamente na sua data.
 */
export const RELEASE_ALL_NOW = true

/** Um vídeo está desbloqueado se seu dia já chegou (ou a Quaresma terminou). */
export function isVideoUnlocked(video: Video, now: Date = new Date()): boolean {
  if (RELEASE_ALL_NOW) return true
  const info = getCurrentDay(now)
  if (info.status === "after") return true
  if (info.status === "before") return false
  return video.day <= info.currentDay
}

/** Retorna a miniatura do vídeo (usa a do YouTube quando não há uma definida). */
export function getThumbnail(video: Video): string {
  if (video.thumbnail) return video.thumbnail
  if (video.youtubeId) return `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`
  return "/images/thumb-placeholder.png"
}

/** URL de incorporação (embed) do YouTube.
 * Usa o domínio "nocookie" e informa a origem correta — isso evita a maioria
 * dos casos de tela preta / "Video player configuration error" em iframes.
 */
export function getEmbedUrl(youtubeId: string): string {
  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  })
  if (typeof window !== "undefined") {
    params.set("origin", window.location.origin)
  }
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?${params.toString()}`
}

/** Link direto para assistir no YouTube (fallback quando o embed é bloqueado). */
export function getWatchUrl(youtubeId: string): string {
  return `https://www.youtube.com/watch?v=${youtubeId}`
}

/** Formata "AAAA-MM-DD" para "DD/MM/AAAA". */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-")
  return `${d}/${m}/${y}`
}
