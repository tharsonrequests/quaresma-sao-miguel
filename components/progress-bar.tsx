"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ProgressBarProps {
  value: number
  max: number
  label?: string
  className?: string
}

/** Barra de progresso elegante e acessível. */
export function ProgressBar({ value, max, label, className }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, Math.round((value / max) * 100)))

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-foreground/90">{label}</span>
          <span className="tabular-nums text-muted-foreground">{pct}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label ?? "Progresso"}
        className="h-2.5 w-full overflow-hidden rounded-full bg-secondary"
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-gold/70 to-gold"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}
