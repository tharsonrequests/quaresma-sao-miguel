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
 * As datas são calculadas a partir de 15 de agosto de 2026 (Dia 1),
 * PULANDO os domingos (a Quaresma de São Miguel não é rezada aos domingos).
 * Assim, a devoção vai de 15/08 a 29/09 em 39 dias.
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
 * LINKS DOS 39 VÍDEOS.
 * Cole o link de cada dia na linha correspondente (entre as aspas).
 */
const LINKS: string[] = [
  "https://www.youtube.com/watch?v=ZyXjTHdzy5I&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=39", // Dia 1
  "https://www.youtube.com/watch?v=54Yn-gJxf_4&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=38", // Dia 2
  "https://www.youtube.com/watch?v=uQzslqg3cio&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=37", // Dia 3
  "https://www.youtube.com/watch?v=S0RdtSLmJ4I&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=36", // Dia 4
  "https://www.youtube.com/watch?v=Jl4JCz5bMaY&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=35", // Dia 5
  "https://www.youtube.com/watch?v=QhI8lkx1ZqE&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=34", // Dia 6
  "https://www.youtube.com/watch?v=j5E0YVNGgrk&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=33", // Dia 7
  "https://www.youtube.com/watch?v=TKFh9Ey4IeI&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=32", // Dia 8
  "https://www.youtube.com/watch?v=v7WumiqUaLc&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=31", // Dia 9
  "https://www.youtube.com/watch?v=u7xXem0hJwA&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=30", // Dia 10
  "https://www.youtube.com/watch?v=kOInW0Owb9s&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=29", // Dia 11
  "https://www.youtube.com/watch?v=lBPMs1cbRlk&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=28", // Dia 12
  "https://www.youtube.com/watch?v=914Hf72eBvg&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=27", // Dia 13
  "https://www.youtube.com/watch?v=RMdg9x2EPhg&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=26", // Dia 14
  "https://www.youtube.com/watch?v=xTqkluNeS48&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=25", // Dia 15
  "https://www.youtube.com/watch?v=PuIi8-zIbE4&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=24", // Dia 16
  "https://www.youtube.com/watch?v=iogb1Z2hWAQ&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=23", // Dia 17
  "https://www.youtube.com/watch?v=AfoIDm4542U&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=22", // Dia 18
  "https://www.youtube.com/watch?v=Kb3O_VXUYm0&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=21", // Dia 19
  "https://www.youtube.com/watch?v=ezh08xnX9gw&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=20", // Dia 20
  "https://www.youtube.com/watch?v=1_aq6MSuqLI&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=19", // Dia 21
  "https://www.youtube.com/watch?v=zAzZklHcPYE&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=18", // Dia 22
  "https://www.youtube.com/watch?v=FIKHjKzZDbc&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=17", // Dia 23
  "https://www.youtube.com/watch?v=RsT_KV9v3xY&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=16", // Dia 24
  "https://www.youtube.com/watch?v=SpH2Z0y9d_c&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=15", // Dia 25
  "https://www.youtube.com/watch?v=riffSesPLc0&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=14", // Dia 26
  "https://www.youtube.com/watch?v=Jmu8QEdFj4A&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=13", // Dia 27
  "https://www.youtube.com/watch?v=Fasgxlul-6U&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=12", // Dia 28
  "https://www.youtube.com/watch?v=hc-Mbrv7cjY&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=11", // Dia 29
  "https://www.youtube.com/watch?v=Bu_Ys2ihjXo&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=10", // Dia 30
  "https://www.youtube.com/watch?v=nWiMiqOktQQ&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=9", // Dia 31
  "https://www.youtube.com/watch?v=XsBrPYEOtVg&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=8", // Dia 32
  "https://www.youtube.com/watch?v=8xyInZxEcKE&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=7", // Dia 33
  "https://www.youtube.com/watch?v=NyIV5XYvuHk&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=6", // Dia 34
  "https://www.youtube.com/watch?v=s3iUXPmiesU&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=5", // Dia 35
  "https://www.youtube.com/watch?v=HkexMEMtdkE&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=4", // Dia 36
  "https://www.youtube.com/watch?v=uqpg_wW43mo&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=3", // Dia 37
  "https://www.youtube.com/watch?v=5hHIyKhxw-s&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=2", // Dia 38
  "https://www.youtube.com/watch?v=IccNQWfamUk&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=1", // Dia 39
]

/** Títulos meditativos para cada um dos 39 dias. */
const TITLES = [
  "A intercessão de Nossa Senhora",
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

/**
 * Gera as datas de liberação (AAAA-MM-DD) a partir de 15/08/2026,
 * PULANDO os domingos. A Quaresma de São Miguel não é rezada aos domingos,
 * então nenhum vídeo é liberado nesse dia — por isso a devoção vai de
 * 15 de agosto a 29 de setembro em exatamente 39 dias.
 */
function generateReleaseDates(count: number): string[] {
  const dates: string[] = []
  const cursor = new Date(Date.UTC(2026, 7, 15)) // 15 de agosto de 2026 (mês 7 = agosto)
  while (dates.length < count) {
    if (cursor.getUTCDay() !== 0) {
      // getUTCDay() === 0 é domingo — pulamos esse dia.
      dates.push(cursor.toISOString().slice(0, 10))
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1)
  }
  return dates
}

const RELEASE_DATES = generateReleaseDates(TITLES.length)

export const videos: Video[] = TITLES.map((title, i) => ({
  day: i + 1,
  title,
  // O ID é extraído automaticamente do link colado em LINKS.
  youtubeId: extractYouTubeId(LINKS[i] ?? ""),
  thumbnail: THUMB,
  date: RELEASE_DATES[i],
}))
