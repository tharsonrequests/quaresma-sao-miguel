"use client"

import { motion } from "framer-motion"
import { BookOpen, ShieldHalf, Users } from "lucide-react"

const CARDS = [
  {
    icon: BookOpen,
    title: "O que é",
    text: "A Quaresma de São Miguel é uma tradição de 40 dias de oração e penitência em honra ao Arcanjo, tempo de conversão e de combate espiritual contra o mal.",
  },
  {
    icon: Users,
    title: "Quem pode participar",
    text: "Todos são bem-vindos. Basta o desejo de rezar um pouco a cada dia e caminhar com fé, no seu ritmo, durante os 40 dias.",
  },
  {
    icon: ShieldHalf,
    title: "O objetivo espiritual",
    text: "Crescer na intimidade com Deus, fortalecer a fé, vencer as tentações e colocar-se sob a proteção de São Miguel Arcanjo.",
  },
]

export function AboutSection() {
  return (
    <section id="sobre" className="mx-auto w-full max-w-5xl scroll-mt-24 px-4 py-16 sm:py-20">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="text-balance font-serif text-3xl font-semibold sm:text-4xl">Sobre a Quaresma</h2>
        <p className="mt-3 text-pretty text-muted-foreground">
          Uma jornada de fé, silêncio e confiança, guiada pela intercessão de São Miguel Arcanjo.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {CARDS.map((card, i) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-border bg-card/50 p-6"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-gold/10 text-gold">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-serif text-xl font-semibold">{card.title}</h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{card.text}</p>
            </motion.div>
          )
        })}
      </div>

      <motion.blockquote
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto mt-12 max-w-2xl text-balance text-center font-serif text-2xl italic text-foreground/80"
      >
        &ldquo;Não temas, porque eu estou contigo.&rdquo;
      </motion.blockquote>
    </section>
  )
}
