"use client"

import { useState } from "react"

export function useConversionPopup() {
  const [isOpen, setIsOpen] = useState(false)

  const openPopup = () => {
    setIsOpen(true)
  }

  const closePopup = () => {
    setIsOpen(false)
  }

  const handleSubmit = (data: { name: string; email: string; phone: string }) => {
    // Apenas log dos dados - o redirecionamento é feito no componente
    console.log("Dados enviados:", data)

    // Salvar no localStorage para referência futura
    localStorage.setItem(
      "leadInfo",
      JSON.stringify({
        ...data,
        date: new Date().toISOString(),
      }),
    )
  }

  return {
    isOpen,
    openPopup,
    closePopup,
    handleSubmit,
  }
}
