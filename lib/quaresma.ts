import { videos, type Video } from "@/data/videos"

/**
 * Configuração central da Quaresma.
 * Para mudar quando a Quaresma começa, altere apenas START_DATE.
 */
export const START_DATE = new Date(2026, 7, 15, 0, 0, 0, 0) // 15 de agosto de 2026
export const TOTAL_DAYS = videos.length // 39

const MS_PER_DAY = 1000 * 60 * 60 * 24

/**
 * ============================================================
 *  CONTROLES DE TESTE E EMERGÊNCIA
 *  (edite estas duas linhas quando precisar)
 * ============================================================
 *
 * 1) UNLOCK_ALL — RECURSO DE EMERGÊNCIA
 *    Coloque `true` para LIBERAR TODOS os vídeos imediatamente,
 *    ignorando as datas. Use caso a liberação automática por data
 *    falhe e você precise abrir tudo na hora. Volte para `false`
 *    para retomar a liberação diária normal.
 *
 * 2) SIMULATED_DATE — TESTE DA LIBERAÇÃO DIÁRIA
 *    Para simular um dia específico, escreva a data aqui no formato
 *    "AAAA-MM-DD" (ex.: "2026-08-20"). O site vai se comportar como
 *    se hoje fosse essa data. Deixe `null` para usar a data real.
 *
 *    Dica: também dá para simular pela URL, sem mexer no código,
 *    adicionando `?simular=2026-08-20` no fim do endereço do site.
 *    (A data da URL tem prioridade sobre a definida aqui.)
 */
export const UNLOCK_ALL = false
export const SIMULATED_DATE: string | null = null

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

/**
 * Retorna a data que deve ser considerada como "hoje".
 * Prioridade: parâmetro `?simular=` na URL > constante SIMULATED_DATE >
 * data real do dispositivo. Serve para testar a liberação diária.
 */
export function getEffectiveNow(): Date {
  // 1) URL: ?simular=AAAA-MM-DD (só existe no navegador)
  if (typeof window !== "undefined") {
    const param = new URLSearchParams(window.location.search).get("simular")
    if (param) {
      const d = parseLocalDate(param)
      if (!Number.isNaN(d.getTime())) return d
    }
  }
  // 2) Constante SIMULATED_DATE
  if (SIMULATED_DATE) {
    const d = parseLocalDate(SIMULATED_DATE)
    if (!Number.isNaN(d.getTime())) return d
  }
  // 3) Data real
  return new Date()
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
export function getCurrentDay(now: Date = getEffectiveNow()): CurrentDayInfo {
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
export function isVideoUnlocked(video: Video, now: Date = getEffectiveNow()): boolean {
  // Recurso de emergência: libera tudo de uma vez.
  if (UNLOCK_ALL) return true
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
  // autoplay=1 + playsinline=1 fazem o vídeo iniciar sozinho ao abrir o
  // modal (a abertura já é um clique do usuário), evitando um 2º clique.
  const params = new URLSearchParams({
    autoplay: "1",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
  })
  return `https://www.youtube.com/embed/${youtubeId}?${params.toString()}`
}

/** Formata "AAAA-MM-DD" para "DD/MM/AAAA". */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-")
  return `${d}/${m}/${y}`
}
