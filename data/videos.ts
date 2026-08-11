/**
 * Fonte única de dados da Quaresma de São Miguel Arcanjo.
 *
 * ▶ COMO ADICIONAR OS VÍDEOS
 * Cole o LINK COMPLETO do YouTube de cada dia dentro das aspas em `LINKS`,
 * na posição correspondente ao dia. Você NÃO precisa extrair o ID —
 * o site faz isso sozinho.
 *
 * Funciona com qualquer formato de link, por exemplo:
 *   - https://youtu.be/T_0SO0KJwvw
 *   - https://www.youtube.com/watch?v=T_0SO0KJwvw
 *   - https://www.youtube.com/embed/T_0SO0KJwvw
 *   - T_0SO0KJwvw (apenas o ID, se preferir)
 *
 * Deixe "" (vazio) nos dias que ainda não têm vídeo — eles aparecem
 * bloqueados até a data e mostram um aviso amigável quando abertos.
 *
 * As datas são calculadas a partir de 15 de agosto de 2026 (Dia 1).
 * Se você alterar a data inicial em `lib/quaresma.ts`, atualize também aqui.
 */

export interface Video {
  day: number
  title: string
  youtubeId: string
  thumbnail: string
  date: string
}

const THUMB = "/images/thumb-placeholder.png"

/**
 * LINKS DOS 40 VÍDEOS.
 * Cole o link de cada dia na linha correspondente (entre as aspas).
 */
const LINKS: string[] = [
  "https://www.youtube.com/watch?v=kGVELI-Bgxg&t=4s", // Dia 1
  "", // Dia 2
  "", // Dia 3
  "", // Dia 4
  "", // Dia 5
  "", // Dia 6
  "", // Dia 7
  "", // Dia 8
  "", // Dia 9
  "", // Dia 10
  "", // Dia 11
  "", // Dia 12
  "", // Dia 13
  "", // Dia 14
  "", // Dia 15
  "", // Dia 16
  "", // Dia 17
  "", // Dia 18
  "", // Dia 19
  "", // Dia 20
  "", // Dia 21
  "", // Dia 22
  "", // Dia 23
  "", // Dia 24
  "", // Dia 25
  "", // Dia 26
  "", // Dia 27
  "", // Dia 28
  "", // Dia 29
  "", // Dia 30
  "", // Dia 31
  "", // Dia 32
  "", // Dia 33
  "", // Dia 34
  "", // Dia 35
  "", // Dia 36
  "", // Dia 37
  "", // Dia 38
  "", // Dia 39
  "", // Dia 40
]

/** Títulos meditativos para cada um dos 40 dias. */
const TITLES = [
  "O chamado ao combate espiritual",
  "Quem é como Deus?",
  "A humildade dos anjos fiéis",
  "Vigiai e orai",
  "O escudo da fé",
  "A espada do Espírito",
  "Renunciar ao pecado",
  "O silêncio que cura",
  "A oração perseverante",
  "Confiar na Providência",
  "O combate contra o orgulho",
  "A paz do coração",
  "Servir com alegria",
  "A força da esperança",
  "O perdão que liberta",
  "A caridade sem medida",
  "Guardar os sentidos",
  "A pureza do olhar",
  "O jejum do coração",
  "A obediência amorosa",
  "Contra o desânimo",
  "A gratidão diária",
  "O poder da intercessão",
  "A luz na escuridão",
  "A firmeza na provação",
  "O desapego dos bens",
  "A verdade que salva",
  "A mansidão do Cordeiro",
  "A coragem dos santos",
  "A fidelidade nas pequenas coisas",
  "O combate final do dia",
  "A vitória pela cruz",
  "A confiança na misericórdia",
  "O anjo da guarda",
  "A vigilância constante",
  "O amor que vence o mal",
  "A entrega total",
  "A alegria da conversão",
  "A véspera da festa",
  "São Miguel, defendei-nos",
]

/**
 * Extrai o ID do vídeo do YouTube a partir de um link completo ou do próprio ID.
 * Retorna "" quando o campo está vazio.
 */
export function extractYouTubeId(input: string): string {
  const value = input.trim()
  if (!value) return ""

  // Já é um ID puro (11 caracteres, sem barras nem pontos).
  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value

  try {
    const url = new URL(value)
    // Formato curto: https://youtu.be/ID
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.split("/").filter(Boolean)[0] ?? ""
    }
    // Formato padrão: https://www.youtube.com/watch?v=ID
    const v = url.searchParams.get("v")
    if (v) return v
    // Formatos /embed/ID, /shorts/ID, /live/ID
    const parts = url.pathname.split("/").filter(Boolean)
    const idx = parts.findIndex((p) => p === "embed" || p === "shorts" || p === "live")
    if (idx >= 0 && parts[idx + 1]) return parts[idx + 1]
    return ""
  } catch {
    // Não é uma URL válida — devolve como está (tentativa de ID).
    return value
  }
}

/** Gera a data (AAAA-MM-DD) do dia N a partir de 15/08/2026. */
function dateForDay(day: number): string {
  const start = new Date(Date.UTC(2026, 7, 15)) // mês 7 = agosto
  start.setUTCDate(start.getUTCDate() + (day - 1))
  return start.toISOString().slice(0, 10)
}

export const videos: Video[] = Array.from({ length: 40 }, (_, i) => {
  const day = i + 1
  return {
    day,
    title: TITLES[i],
    // O ID é extraído automaticamente do link colado em LINKS.
    youtubeId: extractYouTubeId(LINKS[i] ?? ""),
    thumbnail: THUMB,
    date: dateForDay(day),
  }
})
