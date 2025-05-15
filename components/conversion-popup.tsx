"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getUtmParams } from "@/lib/utils"

interface ConversionPopupProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { name: string; email: string; phone: string }) => void
}

export function ConversionPopup({ isOpen, onClose, onSubmit }: ConversionPopupProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formComplete, setFormComplete] = useState(false)
  const [utmParams, setUtmParams] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
  })

  // Capturar parâmetros UTM quando o componente é montado
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = getUtmParams()
      setUtmParams(params)
    }
  }, [])

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setName("")
      setEmail("")
      setPhone("")
      setErrors({})
      setIsSubmitting(false)
      setIsSuccess(false)
    }
  }, [isOpen])

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  // Verificar se todos os campos estão preenchidos
  useEffect(() => {
    const isNameValid = name.trim().length > 0
    const isEmailValid = validateEmail(email)
    const isPhoneValid = phone.replace(/\D/g, "").length >= 10

    setFormComplete(isNameValid && isEmailValid && isPhoneValid)
  }, [name, email, phone])

  const validateEmail = (email: string) => {
    // Regex para validação básica de formato de e-mail
    const basicFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // Verificações adicionais
    if (!basicFormat.test(email)) {
      return false
    }

    // Verificar se tem pelo menos um ponto no domínio
    const parts = email.split("@")
    if (parts.length !== 2) {
      return false
    }

    // Verificar se o domínio tem pelo menos um ponto
    const domain = parts[1]
    if (!domain.includes(".")) {
      return false
    }

    // Verificar se não termina com ponto
    if (domain.endsWith(".")) {
      return false
    }

    // Verificar comprimento mínimo do domínio (a.b)
    if (domain.length < 3) {
      return false
    }

    return true
  }

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; phone?: string } = {}

    if (!name.trim()) newErrors.name = "Nome é obrigatório"

    if (!email.trim()) {
      newErrors.email = "E-mail é obrigatório"
    } else if (!validateEmail(email)) {
      newErrors.email = "E-mail inválido"
    }

    if (!phone.trim()) {
      newErrors.phone = "Telefone é obrigatório"
    } else if (!/^[0-9]{10,11}$/.test(phone.replace(/\D/g, ""))) {
      newErrors.phone = "Telefone inválido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Formatar o número de telefone para o formato internacional
  const formatPhoneForWebhook = (phoneNumber: string) => {
    const numbers = phoneNumber.replace(/\D/g, "")
    if (numbers.length >= 10) {
      return `+55${numbers}`
    }
    return `+55${numbers}`
  }

  const sendWebhook = async () => {
    try {
      const cleanPhone = phone.replace(/\D/g, "")
      const formattedPhone = formatPhoneForWebhook(phone)

      const webhookData = [
        {
          headers: {
            host: "n8n.bravy.com.br",
            "content-type": "application/json",
            "user-agent": "AutoCRM-Webhook",
          },
          params: {},
          query: {},
          body: {
            id: Math.floor(Math.random() * 100000),
            from: "crm-gratuito-v1",
            created: new Date().toISOString(),
            content: {
              name: name,
              email: email,
              whatsapp: `55${phone}`,
              utms: {
                utm_source: utmParams.utm_source,
                utm_medium: utmParams.utm_medium,
                utm_campaign: utmParams.utm_campaign,
                utm_term: utmParams.utm_term,
                utm_content: utmParams.utm_content,
              },
              from: "crm-gratuito-v1",
            },
            name: name,
            telefone: `55${phone}`,
            email: email,
            utm: {
              id: Math.floor(Math.random() * 100000),
              utmSource: utmParams.utm_source,
              utmMedium: utmParams.utm_medium,
              utmCampaign: utmParams.utm_campaign,
              utmTerm: utmParams.utm_term,
              utmContent: utmParams.utm_content,
            },
            whatsapp: formattedPhone,
            formatted_phone: formattedPhone,
          },
          webhookUrl: "https://n8n.bravy.com.br/webhook/crm",
          executionMode: "production",
        },
      ]

      const response = await fetch("https://n8n.bravy.com.br/webhook/crm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      })

      if (!response.ok) {
        console.error("Webhook error:", await response.text())
      }

      return response.ok
    } catch (error) {
      console.error("Error sending webhook:", error)
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Enviar dados para o webhook
      await sendWebhook()

      // Chamar o callback onSubmit
      onSubmit({ name, email, phone })

      // Mostrar mensagem de sucesso
      setIsSuccess(true)

      // Mostrar mensagem de sucesso brevemente antes de redirecionar
      setTimeout(() => {
        window.location.href = "https://payfast.greenn.com.br/107571/offer/WUwxD3"
      }, 1500)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")

    if (numbers.length <= 2) {
      return numbers
    } else if (numbers.length <= 6) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    } else if (numbers.length <= 10) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            onClick={onClose}
          />

          {/* Wrapper div with flexbox for centering */}
          <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md"
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors z-10 p-1"
                  aria-label="Fechar"
                >
                  <X size={24} />
                </button>

                {/* Content */}
                <div className="p-6 md:p-8">
                  {!isSuccess ? (
                    <>
                      {/* Header */}
                      <div className="mb-6 text-center">
                        <div className="inline-flex items-center rounded-full border border-[#f0f0f0] bg-[#f5f2ff] px-3 py-1 text-sm font-medium text-[#7b68ee] shadow-sm mb-4">
                          <span className="flex h-2 w-2 rounded-full bg-[#7b68ee] mr-2"></span>Oferta Exclusiva
                        </div>
                        <h3 className="text-2xl font-bold text-[#333] mb-2">
                          Garanta seu acesso ao{" "}
                          <span className="bg-gradient-to-r from-[#7b68ee] to-[#6a5acd] inline-block text-transparent bg-clip-text">
                            AutoCRM
                          </span>
                        </h3>
                        <p className="text-[#666]">
                          Preencha seus dados para receber acesso exclusivo e um desconto especial.
                        </p>
                      </div>

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-[#333] mb-1">
                            Nome completo
                          </label>
                          <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Digite seu nome completo"
                            className={`w-full h-12 ${errors.name ? "border-red-500" : ""}`}
                            disabled={isSubmitting}
                          />
                          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-[#333] mb-1">
                            E-mail
                          </label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite seu melhor e-mail"
                            className={`w-full h-12 ${errors.email ? "border-red-500" : ""}`}
                            disabled={isSubmitting}
                          />
                          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-[#333] mb-1">
                            WhatsApp
                          </label>
                          <Input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(formatPhone(e.target.value))}
                            placeholder="(00) 00000-0000"
                            className={`w-full h-12 ${errors.phone ? "border-red-500" : ""}`}
                            disabled={isSubmitting}
                          />
                          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                        </div>

                        <Button
                          type="submit"
                          className={`w-full rounded-full py-6 text-lg font-medium h-auto transition-colors duration-300 ${
                            formComplete
                              ? "bg-[#7b68ee] hover:bg-[#6a5acd] text-white"
                              : "bg-gray-400 text-gray-100 cursor-not-allowed hover:bg-gray-400"
                          }`}
                          disabled={isSubmitting || !formComplete}
                        >
                          {isSubmitting ? "Enviando..." : "Quero garantir meu acesso"}
                        </Button>

                        <p className="text-xs text-center text-[#666] mt-4">
                          Seus dados estão seguros e não serão compartilhados com terceiros. Ao se cadastrar, você
                          concorda com nossa política de privacidade.
                        </p>
                      </form>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="flex justify-center mb-4">
                        <CheckCircle size={64} className="text-green-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#333] mb-2">Cadastro realizado!</h3>
                      <p className="text-[#666]">
                        Obrigado por se cadastrar! Enviamos um e-mail com as instruções de acesso.
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="bg-[#f5f5f5] p-4 flex items-center justify-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-[#666]">4.9/5 (2.5k+ avaliações)</span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
