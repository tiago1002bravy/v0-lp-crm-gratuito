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

  // Função para capturar parâmetros UTM da URL atual
  const getUtmParams = () => {
    if (typeof window === "undefined") {
      return ""
    }

    const urlParams = new URLSearchParams(window.location.search)
    const utmParams = new URLSearchParams()

    // Capturar todos os parâmetros UTM
    const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]

    utmKeys.forEach((key) => {
      const value = urlParams.get(key)
      if (value) {
        utmParams.append(key, value)
      }
    })

    return utmParams.toString()
  }

  // Função para construir a URL de redirecionamento com UTMs
  const buildRedirectUrl = () => {
    const baseUrl = "https://payfast.greenn.com.br/107757/offer/rt6nIP"
    const utmString = getUtmParams()

    if (utmString) {
      return `${baseUrl}?${utmString}`
    }

    return baseUrl
  }

  const handleSubmit = (data: { name: string; email: string; phone: string }) => {
    // Aqui você pode implementar a lógica para enviar os dados para seu backend
    console.log("Dados enviados:", data)

    // Salvar no localStorage para referência futura
    localStorage.setItem(
      "leadInfo",
      JSON.stringify({
        ...data,
        date: new Date().toISOString(),
        utms: getUtmParams(),
      }),
    )

    // Construir URL com UTMs e redirecionar
    const redirectUrl = buildRedirectUrl()
    console.log("Redirecionando para:", redirectUrl)

    window.location.href = redirectUrl
  }

  return {
    isOpen,
    openPopup,
    closePopup,
    handleSubmit,
  }
}
