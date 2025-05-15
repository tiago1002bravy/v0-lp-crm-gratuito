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
        // Se o tempo acabou, zera o contador
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    // Calcula o tempo restante imediatamente
    calculateTimeLeft()

    // Atualiza a cada segundo
    const timer = setInterval(calculateTimeLeft, 1000)

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="bg-[#9747FF] text-white py-4 md:py-5 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center text-left mb-3 sm:mb-0">
            <span className="font-medium mr-2 text-sm md:text-base">Oferta de lançamento encerra em:</span>
            <div className="flex items-center font-bold text-base md:text-lg">
              <div className="flex items-center">
                <span>{String(timeLeft.days).padStart(2, "0")}</span>
                <span className="mx-1 text-white/80">d</span>
              </div>
              <div className="flex items-center">
                <span>{String(timeLeft.hours).padStart(2, "0")}</span>
                <span className="mx-1 text-white/80">h</span>
              </div>
              <div className="flex items-center">
                <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
                <span className="mx-1 text-white/80">m</span>
              </div>
              <div className="flex items-center">
                <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
                <span className="ml-1 text-white/80">s</span>
              </div>
            </div>
          </div>

          <Button
            onClick={onButtonClick}
            className="bg-white text-[#9747FF] hover:bg-white/90 rounded-full py-2 px-5 h-auto text-sm md:text-base font-medium group"
          >
            Automatizar comercial
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}
