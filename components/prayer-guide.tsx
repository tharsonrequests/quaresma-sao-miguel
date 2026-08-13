"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Cross, Heart, PlayCircle, Sparkles, Flame, Check, ListChecks } from "lucide-react"
import { cn } from "@/lib/utils"

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
    title: "Persevere a cada dia",
    text: "A fidelidade dia após dia é o verdadeiro combate. Volte amanhã e continue.",
  },
]

const CHECKLIST = [
  "Preparar um altar — uma imagem, estampa ou foto de São Miguel, com uma vela abençoada.",
  "Fazer uma boa confissão durante o período da Quaresma (de 15/08 a 29/09).",
  "Participar ao menos de uma missa por semana.",
  "Realizar uma penitência ao longo da Quaresma.",
  "Rezar por uma intenção — qual graça você deseja alcançar?",
  "Rezar as orações próprias desta devoção, postadas aqui diariamente nos vídeos.",
]

export function PrayerGuide() {
  const [checked, setChecked] = useState<boolean[]>(() => CHECKLIST.map(() => false))

  const toggle = (index: number) =>
    setChecked((prev) => prev.map((v, i) => (i === index ? !v : v)))

  const completed = checked.filter(Boolean).length

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

      <motion.div
        id="checklist"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-14 max-w-2xl scroll-mt-24 rounded-2xl border border-gold/25 bg-card/50 p-6 sm:p-8"
      >
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex size-11 items-center justify-center rounded-xl bg-gold/10 text-gold">
            <ListChecks className="size-5" aria-hidden="true" />
          </span>
          <h3 className="mt-4 text-balance font-serif text-2xl font-semibold">Checklist da Quaresma</h3>
          <p className="mt-2 text-pretty text-sm text-muted-foreground">
            Um roteiro simples para viver bem esta devoção. Marque cada passo conforme avança.
          </p>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-gold tabular-nums">
            {completed} de {CHECKLIST.length} concluídos
          </p>
        </div>

        <ul className="mt-6 flex flex-col gap-3">
          {CHECKLIST.map((item, i) => {
            const isChecked = checked[i]
            return (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-pressed={isChecked}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                    isChecked
                      ? "border-gold/40 bg-gold/10"
                      : "border-border bg-background/40 hover:bg-secondary",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-md border transition-colors",
                      isChecked ? "border-gold bg-gold text-gold-foreground" : "border-muted-foreground/40 text-transparent",
                    )}
                  >
                    <Check className="size-4" />
                  </span>
                  <span
                    className={cn(
                      "text-pretty text-sm leading-relaxed transition-colors",
                      isChecked ? "text-foreground/70 line-through" : "text-foreground/90",
                    )}
                  >
                    {item}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        <p className="mt-6 text-center text-xs italic text-muted-foreground">
          Aos domingos não se reza a Quaresma de São Miguel.
        </p>
      </motion.div>
    </section>
  )
}
