"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Play, Sparkles } from "lucide-react"
import { getEmbedUrl } from "@/lib/quaresma"

/**
 * Vídeo introdutório fixo: ensina como se preparar para a
 * Quaresma de São Miguel Arcanjo.
 *
 * Para trocar o vídeo, altere apenas o INTRO_YOUTUBE_ID abaixo
 * (o trecho após `youtu.be/` ou `?v=` no link do YouTube).
 */
const INTRO_YOUTUBE_ID = "T_0SO0KJwvw"

export function IntroVideo() {
  const [playing, setPlaying] = useState(false)

  return (
    <section id="preparacao" className="mx-auto w-full max-w-4xl scroll-mt-24 px-4 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gold">
            <Sparkles className="size-3.5" aria-hidden="true" /> Comece por aqui
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl font-semibold sm:text-4xl">
            Como se preparar para a Quaresma de São Miguel
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-muted-foreground">
            Antes de iniciar os 40 dias, assista a esta introdução e prepare o coração para o combate espiritual.
          </p>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-black shadow-xl shadow-background/40">
          {playing ? (
            <iframe
              src={getEmbedUrl(INTRO_YOUTUBE_ID)}
              title="Como se preparar para a Quaresma de São Miguel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="size-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Assistir ao vídeo: Como se preparar para a Quaresma de São Miguel"
              className="group absolute inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <Image
                src={`https://i.ytimg.com/vi/${INTRO_YOUTUBE_ID}/maxresdefault.jpg`}
                alt="Miniatura do vídeo de preparação para a Quaresma de São Miguel"
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
              <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-gold-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Play className="size-7 translate-x-0.5 fill-current" aria-hidden="true" />
              </span>
            </button>
          )}
        </div>
      </motion.div>
    </section>
  )
}
