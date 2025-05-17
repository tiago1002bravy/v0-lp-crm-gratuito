"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ConversionPopupProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (email: string, name: string) => void
}

export function ConversionPopup({ isOpen, onClose, onSubmit }: ConversionPopupProps) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Modifique a função handleSubmit para não fechar o popup automaticamente
  // já que agora vamos redirecionar para outra página
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !name) return

    setIsSubmitting(true)

    // Enviar dados e redirecionar (o redirecionamento acontece no hook)
    onSubmit(email, name)

    // Não fechamos o popup aqui, pois o redirecionamento vai acontecer
    // e não precisamos mais do setTimeout
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-[#333]">Quero automatizar meu comercial</h3>
          <p className="text-[#666] mt-2">Preencha os dados abaixo para receber mais informações</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#666] mb-1">
              Nome
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome completo"
              required
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#666] mb-1">
              E-mail
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#9747FF] hover:bg-[#8A3DF9] text-white py-6 h-auto rounded-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Quero automatizar meu comercial"}
          </Button>

          <p className="text-xs text-center text-[#666] mt-4">
            Ao enviar, você concorda com nossa política de privacidade.
          </p>
        </form>
      </div>
    </div>
  )
}
