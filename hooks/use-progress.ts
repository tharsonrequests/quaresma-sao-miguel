"use client"

import { useCallback, useEffect, useState } from "react"
import { TOTAL_DAYS } from "@/lib/quaresma"

const STORAGE_KEY = "quaresma-sao-miguel-2026"

interface StoredProgress {
  watched: number[]
  lastWatched: number | null
}

const EMPTY: StoredProgress = { watched: [], lastWatched: null }

function read(): StoredProgress {
  if (typeof window === "undefined") return EMPTY
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw) as Partial<StoredProgress>
    return {
      watched: Array.isArray(parsed.watched) ? parsed.watched : [],
      lastWatched: typeof parsed.lastWatched === "number" ? parsed.lastWatched : null,
    }
  } catch {
    return EMPTY
  }
}

/**
 * Gerencia o progresso do usuário localmente (localStorage).
 * Nenhuma informação é enviada para servidores.
 */
export function useProgress() {
  const [progress, setProgress] = useState<StoredProgress>(EMPTY)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setProgress(read())
    setHydrated(true)
  }, [])

  const persist = useCallback((next: StoredProgress) => {
    setProgress(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // Ignora falhas de armazenamento (ex.: modo privado).
    }
  }, [])

  const markWatched = useCallback(
    (day: number) => {
      setProgress((prev) => {
        const watched = prev.watched.includes(day) ? prev.watched : [...prev.watched, day]
        const next = { watched, lastWatched: day }
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        } catch {
          // ignore
        }
        return next
      })
    },
    [],
  )

  const toggleWatched = useCallback(
    (day: number) => {
      setProgress((prev) => {
        const has = prev.watched.includes(day)
        const watched = has ? prev.watched.filter((d) => d !== day) : [...prev.watched, day]
        const next: StoredProgress = {
          watched,
          lastWatched: has ? prev.lastWatched : day,
        }
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        } catch {
          // ignore
        }
        return next
      })
    },
    [],
  )

  const reset = useCallback(() => persist(EMPTY), [persist])

  const isWatched = useCallback((day: number) => progress.watched.includes(day), [progress.watched])

  const percentage = Math.round((progress.watched.length / TOTAL_DAYS) * 100)

  return {
    hydrated,
    watched: progress.watched,
    watchedCount: progress.watched.length,
    lastWatched: progress.lastWatched,
    percentage,
    isWatched,
    markWatched,
    toggleWatched,
    reset,
  }
}
