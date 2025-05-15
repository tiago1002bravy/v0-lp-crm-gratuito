"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface Card {
  src: string
  name: string
  tag: string
}

interface FocusCardsProps {
  cards: Card[]
  className?: string
}

export function FocusCards({ cards, className = "" }: FocusCardsProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

  return (
    <div className={`flex items-center justify-center gap-0 ${className}`}>
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className={`relative overflow-hidden transition-all duration-300 ease-out ${
            focusedIndex === index
              ? "w-[30%] z-10 scale-105"
              : focusedIndex === null
                ? "w-[20%]"
                : "w-[17.5%] opacity-70"
          }`}
          onMouseEnter={() => setFocusedIndex(index)}
          onMouseLeave={() => setFocusedIndex(null)}
        >
          <div className="relative aspect-[3/4]">
            <Image src={card.src || "/placeholder.svg"} alt={card.name} fill className="object-cover" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
            <p className="font-bold">{card.name}</p>
            <p className="text-sm text-gray-300">{card.tag}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
