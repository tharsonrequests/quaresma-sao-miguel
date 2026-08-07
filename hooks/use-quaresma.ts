"use client"

import { useEffect, useState } from "react"
import { getCurrentDay, type CurrentDayInfo, TOTAL_DAYS } from "@/lib/quaresma"

/**
 * Retorna o estado atual da Quaresma calculado no cliente.
 * Enquanto não hidratar, `ready` é false para evitar divergência de SSR.
 */
export function useQuaresma() {
  const [info, setInfo] = useState<CurrentDayInfo>({
    status: "before",
    currentDay: 0,
    totalDays: TOTAL_DAYS,
    video: null,
    daysUntilStart: 0,
  })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setInfo(getCurrentDay())
    setReady(true)
    // Reavalia à meia-noite / quando a aba volta ao foco.
    const onVisible = () => setInfo(getCurrentDay())
    document.addEventListener("visibilitychange", onVisible)
    return () => document.removeEventListener("visibilitychange", onVisible)
  }, [])

  return { ...info, ready }
}
