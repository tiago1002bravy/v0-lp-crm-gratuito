"use client"

import { useEffect } from "react"

// Função para enviar eventos personalizados para o GTM
export const gtmEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters,
    })
  }
}

// Hook para eventos automáticos
export function useGTMEvents() {
  useEffect(() => {
    // Evento de página carregada
    gtmEvent("page_loaded", {
      page_title: document.title,
      page_location: window.location.href,
    })
  }, [])

  return { gtmEvent }
}

// Componente para eventos específicos
export function GTMEvents() {
  useGTMEvents()
  return null
}

// Declaração de tipos para o dataLayer
declare global {
  interface Window {
    dataLayer: any[]
  }
}
