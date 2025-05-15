"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  targetDate: Date
  className?: string
}

export function CountdownTimer({ targetDate, className = "" }: CountdownTimerProps) {
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
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex items-center gap-3 md:gap-4">
        <div className="flex flex-col items-center">
          <div className="bg-[#9747FF] text-white text-xl md:text-2xl font-bold rounded-lg w-14 md:w-16 h-14 md:h-16 flex items-center justify-center">
            {String(timeLeft.days).padStart(2, "0")}
          </div>
          <span className="text-xs mt-1 text-[#666]">Dias</span>
        </div>
        <span className="text-xl md:text-2xl font-bold text-[#333]">:</span>
        <div className="flex flex-col items-center">
          <div className="bg-[#9747FF] text-white text-xl md:text-2xl font-bold rounded-lg w-14 md:w-16 h-14 md:h-16 flex items-center justify-center">
            {String(timeLeft.hours).padStart(2, "0")}
          </div>
          <span className="text-xs mt-1 text-[#666]">Horas</span>
        </div>
        <span className="text-xl md:text-2xl font-bold text-[#333]">:</span>
        <div className="flex flex-col items-center">
          <div className="bg-[#9747FF] text-white text-xl md:text-2xl font-bold rounded-lg w-14 md:w-16 h-14 md:h-16 flex items-center justify-center">
            {String(timeLeft.minutes).padStart(2, "0")}
          </div>
          <span className="text-xs mt-1 text-[#666]">Minutos</span>
        </div>
        <span className="text-xl md:text-2xl font-bold text-[#333]">:</span>
        <div className="flex flex-col items-center">
          <div className="bg-[#9747FF] text-white text-xl md:text-2xl font-bold rounded-lg w-14 md:w-16 h-14 md:h-16 flex items-center justify-center">
            {String(timeLeft.seconds).padStart(2, "0")}
          </div>
          <span className="text-xs mt-1 text-[#666]">Segundos</span>
        </div>
      </div>
    </div>
  )
}
