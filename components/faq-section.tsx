"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  items: FAQItem[]
}

export function FAQSection({ items }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="border border-[#e5e5e5] rounded-lg overflow-hidden bg-white">
            <button
              onClick={() => toggleItem(index)}
              className="flex justify-between items-center w-full p-4 text-left focus:outline-none"
              aria-expanded={openIndex === index}
            >
              <span className="font-medium text-[#333]">{item.question}</span>
              <ChevronDown
                className={`h-5 w-5 text-[#9747FF] transition-transform ${
                  openIndex === index ? "transform rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4 pt-0 text-[#666] border-t border-[#e5e5e5]">{item.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}
