"use client"

import { useState, useEffect } from "react"

export function useConversionPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Open popup after 5 seconds if user hasn't interacted
  useEffect(() => {
    if (!hasShown && !hasInteracted) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        setHasShown(true)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [hasShown, hasInteracted])

  // Track user interaction
  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true)
    }

    window.addEventListener("click", handleInteraction)
    window.addEventListener("scroll", handleInteraction)

    return () => {
      window.removeEventListener("click", handleInteraction)
      window.removeEventListener("scroll", handleInteraction)
    }
  }, [])

  // Show popup when user is about to leave
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !isOpen && !sessionStorage.getItem("popupClosed") && hasInteracted) {
        setIsOpen(true)
        setHasShown(true)
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isOpen, hasInteracted])

  const openPopup = () => setIsOpen(true)

  const closePopup = () => {
    setIsOpen(false)
    sessionStorage.setItem("popupClosed", "true")
  }

  const handleSubmit = (data: { name: string; email: string; phone: string }) => {
    console.log("Form submitted:", data)
    // Salvar os dados do lead no localStorage
    localStorage.setItem(
      "leadInfo",
      JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
      }),
    )

    // O redirecionamento será feito pelo componente ConversionPopup
  }

  return {
    isOpen,
    openPopup,
    closePopup,
    handleSubmit,
  }
}
