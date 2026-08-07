"use client"

import { useEffect, useState } from "react"

export interface Countdown {
  days: number
  hours: number
  minutes: number
  seconds: number
  finished: boolean
}

/** Contagem regressiva até a data alvo, atualizada a cada segundo. */
export function useCountdown(target: Date): Countdown {
  const [remaining, setRemaining] = useState(() => target.getTime() - Date.now())

  useEffect(() => {
    const id = setInterval(() => setRemaining(target.getTime() - Date.now()), 1000)
    return () => clearInterval(id)
  }, [target])

  const clamped = Math.max(0, remaining)
  return {
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
    finished: clamped <= 0,
  }
}
