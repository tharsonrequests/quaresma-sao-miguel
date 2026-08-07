"use client"

import { motion } from "framer-motion"
import { ArrowDown, Sparkles } from "lucide-react"

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-4 py-24 text-center"
    >
      <motion.div variants={container} initial="hidden" animate="show" className="mx-auto max-w-3xl">
        <motion.p
          variants={item}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold"
        >
          <Sparkles className="size-3.5" aria-hidden="true" />
          40 dias de graça
        </motion.p>

        <motion.h1
          variants={item}
          className="text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          Quaresma de <span className="text-gradient-gold">São Miguel Arcanjo</span> 2026
        </motion.h1>

        <motion.p variants={item} className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted-foreground">
          40 dias de oração, fé e combate espiritual.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#hoje"
            className="inline-flex h-12 items-center justify-center rounded-full bg-gold px-8 text-base font-semibold text-gold-foreground shadow-lg shadow-gold/20 transition-transform hover:scale-[1.03] hover:bg-gold/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Começar hoje
          </a>
        </motion.div>

        <motion.blockquote
          variants={item}
          className="mx-auto mt-12 max-w-md text-pretty font-serif text-lg italic text-foreground/80"
        >
          &ldquo;São Miguel Arcanjo, defendei-nos no combate.&rdquo;
        </motion.blockquote>
      </motion.div>

      <motion.a
        href="#hoje"
        aria-label="Rolar para o dia de hoje"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="block"
        >
          <ArrowDown className="size-6" aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  )
}
