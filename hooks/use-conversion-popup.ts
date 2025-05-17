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

  // Modifique a função handleSubmit para redirecionar para o novo link
  const handleSubmit = (email: string, name: string) => {
    // Aqui você pode implementar a lógica para enviar os dados para seu backend
    console.log("Dados enviados:", { email, name })

    // Salvar no localStorage para referência futura
    localStorage.setItem("leadInfo", JSON.stringify({ email, name, date: new Date().toISOString() }))

    // Redirecionar para o link de pagamento após salvar os dados
    window.location.href = "https://payfast.greenn.com.br/107757/offer/rt6nIP"
  }

  return {
    isOpen,
    openPopup,
    closePopup,
    handleSubmit,
  }
}
