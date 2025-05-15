"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"

interface AnimatedCounterProps {
  end: number
  duration?: number
  decimals?: number
  suffix?: string
  className?: string
}

export function AnimatedCounter({
  end,
  duration = 2000,
  decimals = 0,
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!isInView || hasAnimated) return

    let startTimestamp: number | null = null
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const currentCount = progress * end

      // Formatar o número com separador de milhar e decimais
      setCount(currentCount)

      if (progress < 1) {
        window.requestAnimationFrame(step)
      } else {
        setHasAnimated(true)
      }
    }

    window.requestAnimationFrame(step)
  }, [isInView, end, duration, hasAnimated])

  // Formatar o número com separador de milhar e decimais
  const formattedCount = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(count)

  return (
    <div ref={ref} className={className}>
      {formattedCount}
      {suffix}
    </div>
  )
}
