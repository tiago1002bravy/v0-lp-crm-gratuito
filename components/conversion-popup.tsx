"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, Clock, ShieldCheck, Users, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [utmParams, setUtmParams] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
  })

  // Função para capturar parâmetros UTM
  const getUtmParams = () => {
    if (typeof window === "undefined") {
      return {
        utm_source: "",
        utm_medium: "",
        utm_campaign: "",
        utm_term: "",
        utm_content: "",
      }
    }

    const urlParams = new URLSearchParams(window.location.search)
    return {
      utm_source: urlParams.get("utm_source") || "",
      utm_medium: urlParams.get("utm_medium") || "",
      utm_campaign: urlParams.get("utm_campaign") || "",
      utm_term: urlParams.get("utm_term") || "",
      utm_content: urlParams.get("utm_content") || "",
    }
  }

  // Função para construir a URL de redirecionamento com UTMs
  const buildRedirectUrl = () => {
    const baseUrl =
      "https://payfast.greenn.com.br/107757/offer/rt6nIP?b_id_1=121754&b_offer_1=f40cUJ&b_id_2=121753&b_offer_2=2sU4ir&b_id_3=121755&b_offer_3=0QZPk0"

    if (typeof window === "undefined") {
      return baseUrl
    }

    const urlParams = new URLSearchParams(window.location.search)
    const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]
    const utmValues = {}

    utmKeys.forEach((key) => {
      const value = urlParams.get(key)
      if (value) {
        utmValues[key] = value
      }
    })

    // Construir a URL com os parâmetros UTM
    let finalUrl = baseUrl
    const utmString = new URLSearchParams(utmValues).toString()

    if (utmString) {
      finalUrl += `&${utmString}`
    }

    return finalUrl
  }

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
      setFocusedField(null)
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
                utm_term: utmParams.utm_content,
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

      // URL de redirecionamento fixa com todos os parâmetros
      const baseUrl =
        "https://payfast.greenn.com.br/107757/offer/rt6nIP?b_id_1=121754&b_offer_1=f40cUJ&b_id_2=121753&b_offer_2=2sU4ir&b_id_3=121755&b_offer_3=0QZPk0"

      // Adicionar UTMs se existirem
      let redirectUrl = baseUrl
      const urlParams = new URLSearchParams(window.location.search)
      const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]
      const utmParams = new URLSearchParams()

      utmKeys.forEach((key) => {
        const value = urlParams.get(key)
        if (value) {
          utmParams.append(key, value)
        }
      })

      const utmString = utmParams.toString()
      if (utmString) {
        redirectUrl = `${baseUrl}&${utmString}`
      }

      console.log("Redirecionando para:", redirectUrl)

      // Mostrar mensagem de sucesso brevemente antes de redirecionar
      setTimeout(() => {
        window.location.href = redirectUrl
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

  const getProgressPercentage = () => {
    let progress = 0
    if (name.trim()) progress += 33.33
    if (email.trim() && validateEmail(email)) progress += 33.33
    if (phone.replace(/\D/g, "").length >= 10) progress += 33.34
    return progress
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
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors z-10 p-1 bg-white/80 rounded-full shadow-sm"
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
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 inline-flex items-center justify-center">
                          <div className="bg-[#FF3636] text-white px-4 py-2 rounded-b-lg font-bold text-sm shadow-lg flex items-center gap-2 animate-pulse">
                            <Clock className="h-4 w-4" />
                            ÚLTIMOS DIAS COM 90% OFF
                          </div>
                        </div>

                        <div className="inline-flex items-center rounded-full border border-[#f0f0f0] bg-[#f5f2ff] px-3 py-1 text-sm font-medium text-[#9747FF] shadow-sm mb-4 mt-6">
                          <span className="flex h-2 w-2 rounded-full bg-[#9747FF] mr-2"></span>Oferta Exclusiva
                        </div>

                        <h3 className="text-2xl font-bold text-[#333] mb-2">
                          Automatize seu comercial com{" "}
                          <span className="bg-gradient-to-r from-[#9747FF] to-[#8A3DF9] inline-block text-transparent bg-clip-text">
                            90% de desconto
                          </span>
                        </h3>

                        <p className="text-[#666] mb-4">
                          Preencha o formulário abaixo para garantir seu acesso com desconto exclusivo
                        </p>

                        {/* Progress bar */}
                        <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
                          <div
                            className="bg-gradient-to-r from-[#9747FF] to-[#8A3DF9] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${getProgressPercentage()}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-[#333] mb-1">
                            Nome completo
                          </label>
                          <div
                            className={`relative ${focusedField === "name" ? "ring-2 ring-[#9747FF] rounded-md" : ""}`}
                          >
                            <Input
                              id="name"
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              onFocus={() => setFocusedField("name")}
                              onBlur={() => setFocusedField(null)}
                              placeholder="Digite seu nome completo"
                              className={`w-full h-12 pr-10 ${errors.name ? "border-red-500" : ""}`}
                              disabled={isSubmitting}
                            />
                            {name.trim() && (
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                                <Check className="h-5 w-5" />
                              </div>
                            )}
                          </div>
                          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-[#333] mb-1">
                            E-mail
                          </label>
                          <div
                            className={`relative ${focusedField === "email" ? "ring-2 ring-[#9747FF] rounded-md" : ""}`}
                          >
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              onFocus={() => setFocusedField("email")}
                              onBlur={() => setFocusedField(null)}
                              placeholder="Digite seu melhor e-mail"
                              className={`w-full h-12 pr-10 ${errors.email ? "border-red-500" : ""}`}
                              disabled={isSubmitting}
                            />
                            {email.trim() && validateEmail(email) && (
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                                <Check className="h-5 w-5" />
                              </div>
                            )}
                          </div>
                          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-[#333] mb-1">
                            WhatsApp
                          </label>
                          <div
                            className={`relative ${focusedField === "phone" ? "ring-2 ring-[#9747FF] rounded-md" : ""}`}
                          >
                            <Input
                              id="phone"
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(formatPhone(e.target.value))}
                              onFocus={() => setFocusedField("phone")}
                              onBlur={() => setFocusedField(null)}
                              placeholder="(00) 00000-0000"
                              className={`w-full h-12 pr-10 ${errors.phone ? "border-red-500" : ""}`}
                              disabled={isSubmitting}
                            />
                            {phone.replace(/\D/g, "").length >= 10 && (
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                                <Check className="h-5 w-5" />
                              </div>
                            )}
                          </div>
                          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                        </div>

                        <div className="pt-2">
                          <Button
                            type="submit"
                            className={`w-full rounded-full py-6 text-lg font-medium h-auto transition-all duration-300 relative overflow-hidden group ${
                              formComplete
                                ? "bg-[#9747FF] hover:bg-[#8A3DF9] text-white"
                                : "bg-gray-400 text-gray-100 cursor-not-allowed hover:bg-gray-400"
                            }`}
                            disabled={isSubmitting || !formComplete}
                          >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              {isSubmitting ? (
                                <>
                                  <svg
                                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                  Processando...
                                </>
                              ) : (
                                <>
                                  GARANTIR MEU DESCONTO DE 90%
                                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </>
                              )}
                            </span>
                            {formComplete && !isSubmitting && (
                              <span className="absolute inset-0 h-full w-full scale-0 rounded-full bg-white/10 transition-all duration-300 group-hover:scale-100"></span>
                            )}
                          </Button>
                        </div>

                        {/* Trust badges */}
                        <div className="flex flex-col gap-3 mt-6">
                          <div className="flex items-center gap-2 text-[#666] text-sm">
                            <ShieldCheck className="h-4 w-4 text-[#9747FF]" />
                            <span>Seus dados estão protegidos e não serão compartilhados</span>
                          </div>
                          <div className="flex items-center gap-2 text-[#666] text-sm">
                            <Users className="h-4 w-4 text-[#9747FF]" />
                            <span>Mais de 7.000 empresas já automatizaram seu comercial</span>
                          </div>
                        </div>
                      </form>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="flex justify-center mb-4">
                        <CheckCircle size={64} className="text-green-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#333] mb-2">Cadastro realizado com sucesso!</h3>
                      <p className="text-[#666] mb-4">
                        Estamos redirecionando você para a página de pagamento com 90% de desconto.
                      </p>
                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.5 }}
                          className="bg-green-500 h-2 rounded-full"
                        ></motion.div>
                      </div>
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
                  <span className="text-sm text-[#666]">4.9/5 (7k+ avaliações)</span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
