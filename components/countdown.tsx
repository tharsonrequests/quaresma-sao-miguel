"use client"

import { useCountdown } from "@/hooks/use-countdown"

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-border bg-card/60 px-4 py-3 sm:px-6">
      <span className="font-serif text-3xl font-semibold tabular-nums text-gold sm:text-4xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
    </div>
  )
}

/**
 * Contagem regressiva isolada.
 *
 * O `setInterval` (1s) vive AQUI dentro, então apenas este componente
 * re-renderiza a cada segundo — a seção pai (imagem, animações, barra de
 * progresso) permanece estável, evitando o "piscar" na tela.
 */
export function Countdown({ target }: { target: Date }) {
  const countdown = useCountdown(target)

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <CountdownUnit value={countdown.days} label="Dias" />
      <CountdownUnit value={countdown.hours} label="Horas" />
      <CountdownUnit value={countdown.minutes} label="Min" />
      <CountdownUnit value={countdown.seconds} label="Seg" />
    </div>
  )
}
