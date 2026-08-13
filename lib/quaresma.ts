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

/** Converte "AAAA-MM-DD" em uma data local à meia-noite. */
function parseLocalDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d)
}

/** Diferença em dias inteiros entre duas datas (b - a). */
export function diffInDays(a: Date, b: Date): number {
  return Math.round((atMidnight(b).getTime() - atMidnight(a).getTime()) / MS_PER_DAY)
}

/**
 * Calcula o dia atual da Quaresma com base na data fornecida (padrão: hoje).
 *
 * A liberação segue as datas reais de cada vídeo (que já pulam os domingos),
 * então aos domingos nenhum vídeo novo é liberado: permanece o do último
 * dia rezado.
 */
export function getCurrentDay(now: Date = new Date()): CurrentDayInfo {
  const today = atMidnight(now)
  const firstDate = parseLocalDate(videos[0].date)
  const lastDate = parseLocalDate(videos[videos.length - 1].date)

  // Ainda não começou.
  if (today.getTime() < firstDate.getTime()) {
    return {
      status: "before",
      currentDay: 0,
      totalDays: TOTAL_DAYS,
      video: null,
      daysUntilStart: diffInDays(today, firstDate),
    }
  }

  // Já terminou.
  if (today.getTime() > lastDate.getTime()) {
    return {
      status: "after",
      currentDay: TOTAL_DAYS,
      totalDays: TOTAL_DAYS,
      video: videos[TOTAL_DAYS - 1] ?? null,
      daysUntilStart: 0,
    }
  }

  // Em andamento: o dia atual é o do último vídeo cuja data já chegou.
  let currentDay = 0
  for (const v of videos) {
    if (parseLocalDate(v.date).getTime() <= today.getTime()) {
      currentDay = v.day
    }
  }

  return {
    status: "during",
    currentDay,
    totalDays: TOTAL_DAYS,
    video: videos[currentDay - 1] ?? null,
    daysUntilStart: 0,
  }
}

/** Um vídeo está desbloqueado se seu dia já chegou (ou a Quaresma terminou). */
export function isVideoUnlocked(video: Video, now: Date = new Date()): boolean {
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

/** URL de incorporação (embed) do YouTube. */
export function getEmbedUrl(youtubeId: string): string {
  return `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`
}

/** Formata "AAAA-MM-DD" para "DD/MM/AAAA". */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-")
  return `${d}/${m}/${y}`
}
