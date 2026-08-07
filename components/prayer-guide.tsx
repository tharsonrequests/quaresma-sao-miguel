"use client"

import { motion } from "framer-motion"
import { Cross, Heart, PlayCircle, Sparkles, Flame } from "lucide-react"

const STEPS = [
  {
    icon: Cross,
    title: "Faça o sinal da cruz",
    text: "Comece em nome do Pai, do Filho e do Espírito Santo, colocando-se na presença de Deus.",
  },
  {
    icon: Heart,
    title: "Prepare seu coração",
    text: "Respire, aquiete a mente e peça a intercessão de São Miguel Arcanjo para este momento.",
  },
  {
    icon: PlayCircle,
    title: "Assista ao vídeo do dia",
    text: "Acompanhe a meditação diretamente aqui no site, sem distrações.",
  },
  {
    icon: Sparkles,
    title: "Reze com atenção",
    text: "Deixe a Palavra tocar sua vida. Fale com Deus com simplicidade e escute em silêncio.",
  },
  {
    icon: Flame,
    title: "Persevere durante os 40 dias",
    text: "A fidelidade dia após dia é o verdadeiro combate. Volte amanhã e continue.",
  },
]

export function PrayerGuide() {
  return (
    <section id="como-rezar" className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-16 sm:py-20">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gold">
          Passo a passo
        </p>
        <h2 className="mt-4 text-balance font-serif text-3xl font-semibold sm:text-4xl">Como rezar a Quaresma</h2>
        <p className="mt-3 text-pretty text-muted-foreground">
          Cinco passos simples para viver cada dia com profundidade e paz.
        </p>
      </div>

      <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((step, i) => {
          const Icon = step.icon
          return (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col rounded-2xl border border-border bg-card/50 p-6"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-serif text-2xl font-semibold text-gold/80 tabular-nums">{i + 1}</span>
              </div>
              <h3 className="mt-4 font-serif text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </motion.li>
          )
        })}
      </ol>
    </section>
  )
}
