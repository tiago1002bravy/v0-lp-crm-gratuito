"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface CountdownHeaderProps {
  targetDate: Date
  onButtonClick: () => void
}

export function CountdownHeader({ targetDate, onButtonClick }: CountdownHeaderProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        // Se o tempo acabou, zerar o contador
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    // Calcular inicialmente
    calculateTimeLeft()

    // Atualizar a cada segundo
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="bg-[#9747FF] text-white py-3 px-4 sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-2 text-sm md:text-base">
          <span className="font-medium">Oferta especial por tempo limitado:</span>
          <div className="flex items-center gap-1">
            <div className="bg-white/20 rounded px-2 py-1 min-w-[28px] text-center">
              {String(timeLeft.days).padStart(2, "0")}
            </div>
            <span>:</span>
            <div className="bg-white/20 rounded px-2 py-1 min-w-[28px] text-center">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <span>:</span>
            <div className="bg-white/20 rounded px-2 py-1 min-w-[28px] text-center">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <span>:</span>
            <div className="bg-white/20 rounded px-2 py-1 min-w-[28px] text-center">
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
          </div>
        </div>

        <Button
          onClick={onButtonClick}
          className="bg-white text-[#9747FF] hover:bg-gray-100 rounded-full text-sm px-4 py-1 h-auto"
        >
          Automatizar comercial
          <ChevronRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
