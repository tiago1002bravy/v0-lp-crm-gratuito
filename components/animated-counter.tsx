"use client"

import { useState, useEffect, useRef } from "react"

interface AnimatedCounterProps {
  end: number
  start?: number
  duration?: number
  decimals?: number
  suffix?: string
  className?: string
}

export function AnimatedCounter({
  end,
  start = 0,
  duration = 2000,
  decimals = 0,
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(start)
  const countRef = useRef(start)
  const startTimeRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    // Função para animar o contador
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp
      }

      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1)
      const currentCount = start + progress * (end - start)

      countRef.current = currentCount
      setCount(currentCount)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    // Iniciar a animação
    rafRef.current = requestAnimationFrame(animate)

    // Limpar a animação quando o componente for desmontado
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [start, end, duration])

  // Formatar o número com decimais
  const formattedCount = count.toFixed(decimals)

  return (
    <span className={className}>
      {formattedCount}
      {suffix}
    </span>
  )
}
