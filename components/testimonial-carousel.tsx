"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Testimonial {
  id: number
  name: string
  image: string
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const goToPrevious = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  // Auto-play
  useEffect(() => {
    const interval = setInterval(goToNext, 3000)
    return () => clearInterval(interval)
  }, [currentIndex])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl relative aspect-square">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full">
              <Image
                src={testimonials[currentIndex].image || "/placeholder.svg"}
                alt={testimonials[currentIndex].name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={goToPrevious}
          className="bg-white rounded-full p-2 shadow-sm hover:bg-gray-50"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-5 w-5 text-[#666]" />
        </button>

        <div className="flex items-center gap-1">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-[#9747FF]" : "bg-[#e5e5e5]"}`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="bg-white rounded-full p-2 shadow-sm hover:bg-gray-50"
          aria-label="Próximo"
        >
          <ChevronRight className="h-5 w-5 text-[#666]" />
        </button>
      </div>
    </div>
  )
}
