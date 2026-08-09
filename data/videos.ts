/**
 * Fonte única de dados da Quaresma de São Miguel Arcanjo.
 *
 * Para adicionar ou alterar um vídeo, edite APENAS este arquivo.
 * - `youtubeId`: o ID do vídeo do YouTube (o trecho após `?v=` ou `youtu.be/`).
 * - `thumbnail`: opcional. Se ficar vazio, a miniatura oficial do YouTube é usada.
 * - `date`: a data de liberação no formato "AAAA-MM-DD".
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
    // Substitua pelo ID real do vídeo do YouTube de cada dia.
    youtubeId: "ZyXjTHdzy5I&list=PLFHiit_0T6mnxqwHwQIih1104GPU8znLS&index=39",
    thumbnail: THUMB,
    date: dateForDay(day),
  }
})
