"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, ChevronRight, Star } from "lucide-react"
import { motion } from "framer-motion"
import { ConversionPopup } from "@/components/conversion-popup"
import { useConversionPopup } from "@/hooks/use-conversion-popup"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { isOpen, openPopup, closePopup, handleSubmit } = useConversionPopup()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Popup de conversão */}
      <ConversionPopup isOpen={isOpen} onClose={closePopup} onSubmit={handleSubmit} />

      <header className="border-b border-[#f5f5f5] bg-white sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <motion.div initial={{ rotate: -10 }} animate={{ rotate: 0 }} transition={{ duration: 0.5 }}>
              <svg className="h-6 w-6 text-[#7b68ee]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </motion.div>
            <span className="text-xl font-bold">AutoCRM</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium text-[#333] hover:text-[#7b68ee] transition-colors">
              Recursos
            </Link>
            <Link href="#" className="text-sm font-medium text-[#333] hover:text-[#7b68ee] transition-colors">
              Preços
            </Link>
            <Link href="#" className="text-sm font-medium text-[#333] hover:text-[#7b68ee] transition-colors">
              Depoimentos
            </Link>
            <Link href="#" className="text-sm font-medium text-[#333] hover:text-[#7b68ee] transition-colors">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-sm font-medium text-[#333] hover:text-[#7b68ee] transition-colors hidden sm:block"
            >
              Login
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-[#7b68ee] hover:bg-[#6a5acd] text-white rounded-full text-sm font-medium px-4 py-2 h-auto"
                onClick={openPopup}
              >
                Começar agora
              </Button>
            </motion.div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 md:py-28 overflow-hidden relative">
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#f5f2ff] opacity-50 blur-3xl"></div>
            <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-[#f0f7ff] opacity-50 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-flex items-center rounded-full border border-[#f0f0f0] bg-white px-3 py-1 text-sm font-medium shadow-sm self-start"
                >
                  <span className="flex h-2 w-2 rounded-full bg-[#7b68ee] mr-2"></span>
                  <span className="bg-gradient-to-r from-[#7b68ee] to-[#6a5acd] bg-clip-text text-transparent">
                    A estrutura que os maiores players do Brasil usam
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl font-bold text-[#333] sm:text-4xl md:text-5xl lg:text-6xl"
                >
                  <span className="bg-gradient-to-r from-[#333] to-[#555] bg-clip-text text-transparent">
                    CRM 100% automatizado com templates, automações,{" "}
                  </span>
                  <span className="inline-block bg-gradient-to-r from-[#7b68ee] to-[#6a5acd] bg-clip-text text-transparent">
                    IA
                  </span>
                  <span className="bg-gradient-to-r from-[#333] to-[#555] bg-clip-text text-transparent">
                    {" "}
                    e dashboards.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-xl text-[#666] max-w-[600px]"
                >
                  Dobre a conversão do seu comercial com um processo automatizado utilizando IA e tenha todos os dados
                  para escalar com previsibilidade e segurança.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4 mt-4"
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-[#7b68ee] hover:bg-[#6a5acd] text-white rounded-full text-base font-medium px-6 py-3 h-auto group">
                      Automatizar comercial
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>

                  <div className="flex items-center gap-2 text-sm text-[#666]">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-[#ffcc00] text-[#ffcc00]" />
                      ))}
                    </div>
                    <span>4.9/5 (2.5k+ avaliações)</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {["Template de ClickUp", "Automações no make", "Dashboard comercial", "+ 10 Aulas bônus"].map(
                    (item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <div className="text-[#7b68ee] flex items-center justify-center rounded-full bg-[#f5f2ff] h-5 w-5">
                          <Check className="h-3 w-3" />
                        </div>
                        <p className="text-sm text-[#666]">{item}</p>
                      </motion.div>
                    ),
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isLoaded ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="flex gap-4 mt-8"
                >
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((user) => (
                      <div
                        key={user}
                        className="w-8 h-8 rounded-full border-2 border-white bg-[#f5f2ff] flex items-center justify-center overflow-hidden"
                      >
                        <span className="text-xs font-medium text-[#7b68ee]">{String.fromCharCode(64 + user)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-[#666]">
                    <span className="font-medium">+2.500</span> empresas já automatizaram seu comercial
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 50 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex justify-center lg:justify-end relative"
              >
                {/* Colorful glow effect */}
                <div className="absolute -inset-4 rounded-2xl overflow-hidden">
                  <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-purple-400/30 blur-3xl"></div>
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-yellow-400/30 blur-3xl"></div>
                  <div className="absolute top-1/2 -translate-y-1/2 -left-20 w-64 h-64 rounded-full bg-pink-400/20 blur-3xl"></div>
                  <div className="absolute top-1/2 -translate-y-1/2 -right-20 w-64 h-64 rounded-full bg-blue-400/20 blur-3xl"></div>
                </div>

                <div className="relative w-full max-w-[600px] aspect-[16/9] rounded-xl overflow-hidden z-10">
                  {/* Template CRM image */}
                  <Image
                    src="/images/template-crm.png"
                    alt="Template CRM"
                    fill
                    className="object-contain scale-110 origin-center"
                  />

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#7b68ee] flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </motion.div>
                  </div>

                  <div className="absolute bottom-4 right-4">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                      className="h-8 w-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center"
                    >
                      <svg className="h-4 w-4 text-[#7b68ee]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="absolute -bottom-16 left-1/4 transform -translate-x-1/2 hidden lg:block"
            >
              <div className="bg-white rounded-lg shadow-lg p-3 flex items-center gap-3 w-48">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-medium">Lead convertido</div>
                  <div className="text-xs text-[#666]">Agora mesmo</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              className="absolute top-10 right-10 transform translate-x-1/2 hidden lg:block"
            >
              <div className="bg-white rounded-lg shadow-lg p-3 flex items-center gap-3 w-40">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-medium">Nova reunião</div>
                  <div className="text-xs text-[#666]">Em 15 min</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-[#fafafa]">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center gap-4 mb-12">
              <h2 className="text-3xl font-bold text-[#333] sm:text-4xl md:text-5xl">
                Organize seu processo comercial
              </h2>
              <p className="text-xl text-[#666] max-w-[800px]">
                Estrutura completa para você copiar, colar e dobrar suas vendas sem precisar aumentar o volume de leads
              </p>
            </div>

            {/* Pipeline de Vendas */}
            <div className="grid md:grid-cols-2 gap-10 mb-20 items-center">
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold text-[#333]">Pipeline de Vendas</h3>
                <p className="text-[#666]">
                  Tenha total gestão das etapas do processo comercial, entenda como está a qualificação, agendamento,
                  FollowUp, ganhos e perdas.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden relative">
                <div className="relative w-full aspect-[16/9]">
                  <Image src="/images/pipeline-crm.png" alt="Pipeline de Vendas" fill className="object-contain" />
                </div>
              </div>
            </div>

            {/* Automações estratégicas */}
            <div className="grid md:grid-cols-2 gap-10 mb-20 items-center md:flex-row-reverse">
              <div className="flex flex-col gap-4 md:order-2">
                <h3 className="text-2xl font-bold text-[#333]">Automações estratégicas</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="text-[#00c875] flex items-center justify-center rounded-sm mt-1">
                      <Check className="h-5 w-5" />
                    </div>
                    <p className="text-[#666]">Cadastro automático dos leads</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="text-[#00c875] flex items-center justify-center rounded-sm mt-1">
                      <Check className="h-5 w-5" />
                    </div>
                    <p className="text-[#666]">Mensagens de WhatsApp com GPT</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="text-[#00c875] flex items-center justify-center rounded-sm mt-1">
                      <Check className="h-5 w-5" />
                    </div>
                    <p className="text-[#666]">Agendamento de reuniões no Google Calendar</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="text-[#00c875] flex items-center justify-center rounded-sm mt-1">
                      <Check className="h-5 w-5" />
                    </div>
                    <p className="text-[#666]">Lembrete de Reuniões via WhatsApp</p>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl overflow-hidden relative md:order-1">
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src="/images/automacoes-crm.png"
                    alt="Automações estratégicas"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Dashboard de resultados */}
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold text-[#333]">Dashboard de resultados</h3>
                <p className="text-[#666]">
                  Acompanhe os principais indicadores/métricas do seu processo de vendas sem precisar de um conhecimento
                  avançado em BI.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden relative">
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src="/images/dashboard-laptop.png"
                    alt="Dashboard de resultados"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Bônus */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center gap-4 mb-16">
              <div className="inline-flex items-center rounded-full border border-[#f0f0f0] bg-[#f5f2ff] px-3 py-1 text-sm font-medium text-[#7b68ee] shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-[#7b68ee] mr-2"></span>Bônus Exclusivos
              </div>
              <h2 className="text-3xl font-bold text-[#333] sm:text-4xl md:text-5xl">
                Materiais prontos para você implementar
              </h2>
              <p className="text-xl text-[#666] max-w-[800px]">
                Além da estrutura completa, você recebe estes materiais prontos para acelerar seus resultados
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Bônus 1 */}
              <div className="group relative overflow-hidden rounded-xl border border-[#f0f0f0] bg-white p-6 transition-all hover:shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f5f2ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-4 right-4 bg-[#e6f9f1] text-[#00c875] px-2 py-1 rounded-md text-xs font-medium">
                  Valor: R$ 97
                </div>
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f2ff]">
                    <svg className="h-6 w-6 text-[#7b68ee]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-[#333]">Modelos de Criativos Validados</h3>
                  <p className="text-[#666]">
                    Modelos de anúncios e posts que já foram testados e aprovados para atrair leads qualificados.
                  </p>
                </div>
              </div>

              {/* Bônus 2 */}
              <div className="group relative overflow-hidden rounded-xl border border-[#f0f0f0] bg-white p-6 transition-all hover:shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f5f2ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-4 right-4 bg-[#e6f9f1] text-[#00c875] px-2 py-1 rounded-md text-xs font-medium">
                  Valor: R$ 97
                </div>
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f2ff]">
                    <svg className="h-6 w-6 text-[#7b68ee]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-[#333]">Script de Qualificação</h3>
                  <p className="text-[#666]">
                    Roteiro completo para qualificar leads e identificar oportunidades de negócio de forma eficiente.
                  </p>
                </div>
              </div>

              {/* Bônus 3 */}
              <div className="group relative overflow-hidden rounded-xl border border-[#f0f0f0] bg-white p-6 transition-all hover:shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f5f2ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-4 right-4 bg-[#e6f9f1] text-[#00c875] px-2 py-1 rounded-md text-xs font-medium">
                  Valor: R$ 97
                </div>
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f2ff]">
                    <svg className="h-6 w-6 text-[#7b68ee]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-[#333]">Script para Sessão Estratégica</h3>
                  <p className="text-[#666]">
                    Guia passo a passo para conduzir reuniões estratégicas que convertem em vendas.
                  </p>
                </div>
              </div>

              {/* Bônus 4 */}
              <div className="group relative overflow-hidden rounded-xl border border-[#f0f0f0] bg-white p-6 transition-all hover:shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f5f2ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-4 right-4 bg-[#e6f9f1] text-[#00c875] px-2 py-1 rounded-md text-xs font-medium">
                  Valor: R$ 97
                </div>
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f2ff]">
                    <svg className="h-6 w-6 text-[#7b68ee]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-[#333]">Apresentação de Vendas</h3>
                  <p className="text-[#666]">
                    Template de apresentação profissional para impressionar seus clientes e fechar mais negócios.
                  </p>
                </div>
              </div>

              {/* Bônus 5 */}
              <div className="group relative overflow-hidden rounded-xl border border-[#f0f0f0] bg-white p-6 transition-all hover:shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f5f2ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-4 right-4 bg-[#e6f9f1] text-[#00c875] px-2 py-1 rounded-md text-xs font-medium">
                  Valor: R$ 297
                </div>
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f2ff]">
                    <svg className="h-6 w-6 text-[#7b68ee]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-[#333]">Modelo de Proposta</h3>
                  <p className="text-[#666]">
                    Template de proposta comercial que destaca o valor do seu serviço e facilita a decisão de compra.
                  </p>
                </div>
              </div>

              {/* Bônus 6 */}
              <div className="group relative overflow-hidden rounded-xl border border-[#f0f0f0] bg-white p-6 transition-all hover:shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f5f2ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-4 right-4 bg-[#e6f9f1] text-[#00c875] px-2 py-1 rounded-md text-xs font-medium">
                  Valor: R$ 197
                </div>
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f2ff]">
                    <svg className="h-6 w-6 text-[#7b68ee]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-[#333]">Descritivos de Cargos Comerciais</h3>
                  <p className="text-[#666]">
                    Descrições detalhadas de funções para montar uma equipe comercial de alto desempenho.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 flex flex-col items-center">
              <div className="bg-[#fafafa] rounded-xl p-6 mb-8 text-center max-w-xl">
                <p className="text-sm text-[#666] mb-2">Valor total dos bônus</p>
                <p className="text-3xl font-bold text-[#333] mb-1">R$ 882</p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Preço */}
        <section className="py-20 bg-[#fafafa]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col items-center text-center gap-4 mb-12">
                <div className="inline-flex items-center rounded-full border border-[#f0f0f0] bg-[#f5f2ff] px-3 py-1 text-sm font-medium text-[#7b68ee] shadow-sm">
                  <span className="flex h-2 w-2 rounded-full bg-[#7b68ee] mr-2"></span>Oferta Especial
                </div>
                <h2 className="text-3xl font-bold text-[#333] sm:text-4xl md:text-5xl">
                  Invista agora no seu sucesso comercial
                </h2>
                <p className="text-xl text-[#666] max-w-[800px]">
                  Acesso completo ao sistema, templates, automações e todos os bônus
                </p>
              </div>

              <div className="bg-white rounded-xl border border-[#f0f0f0] shadow-sm overflow-hidden">
                <div className="p-8 md:p-12">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-6">
                      <div className="text-[#666] text-lg mb-1">
                        De <span className="line-through">R$ 997,00</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-5xl md:text-6xl font-bold text-[#333]">R$ 97</span>
                        <span className="text-xl text-[#666]">,00</span>
                      </div>
                      <div className="text-[#00c875] font-medium mt-2">Economize R$ 900,00 (90% de desconto)</div>
                    </div>

                    <div className="grid gap-4 mb-8 w-full max-w-md">
                      <div className="flex items-center gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e6f9f1]">
                          <Check className="h-4 w-4 text-[#00c875]" />
                        </div>
                        <p className="text-[#666]">Acesso vitalício à plataforma</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e6f9f1]">
                          <Check className="h-4 w-4 text-[#00c875]" />
                        </div>
                        <p className="text-[#666]">Todos os templates e automações</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e6f9f1]">
                          <Check className="h-4 w-4 text-[#00c875]" />
                        </div>
                        <p className="text-[#666]">6 bônus exclusivos (valor: R$ 882)</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e6f9f1]">
                          <Check className="h-4 w-4 text-[#00c875]" />
                        </div>
                        <p className="text-[#666]">Suporte por 30 dias</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 w-full max-w-md">
                      <Button
                        className="bg-[#7b68ee] hover:bg-[#6a5acd] text-white rounded-full py-6 text-lg font-medium h-auto"
                        onClick={openPopup}
                      >
                        Quero automatizar meu comercial agora
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>

                      <div className="flex items-center justify-center gap-4 text-sm text-[#666]">
                        <div className="flex items-center gap-1">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                          <span>Compra segura</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                          </svg>
                          <span>Parcelamento em até 12x</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Prova Social */}
        <section className="py-20 bg-[#111]">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center gap-4 mb-10">
              <div className="inline-flex items-center rounded-full border border-[#333] bg-[#222] px-3 py-1 text-sm font-medium text-[#7b68ee] shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-[#7b68ee] mr-2"></span>
                <span className="text-white">Prova Social</span>
              </div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                O mesmo método que os grandes players usam
              </h2>
              <p className="text-xl text-gray-400 max-w-[800px]">
                Conheça alguns dos especialistas que utilizam e recomendam nossa metodologia
              </p>
            </div>

            {/* Grid de especialistas */}
            <div className="flex flex-col gap-2">
              {/* Linha superior - 2 especialistas principais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {/* Especialista 1 - Marcos Paulo (vídeo) */}
                <div className="relative overflow-hidden aspect-[3/2] md:aspect-[16/9]">
                  <div className="relative h-full">
                    <Image
                      src="/placeholder.svg?key=xcpf8"
                      alt="Marcos Paulo"
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  {/* Play button */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="w-16 h-16 rounded-full bg-[#e67e22] flex items-center justify-center cursor-pointer">
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Especialista 2 - Pablo Marçal */}
                <div className="relative overflow-hidden aspect-[3/2] md:aspect-[16/9]">
                  <div className="relative h-full">
                    <Image src="/images/pablo-marcal.png" alt="Pablo Marçal" fill className="object-contain" />
                  </div>
                </div>
              </div>

              {/* Linha inferior - 5 especialistas secundários */}
              <div className="grid grid-cols-5 gap-2">
                {/* Especialista 3 - Cris Franklin */}
                <div className="relative overflow-hidden aspect-[4/5]">
                  <div className="relative h-full">
                    <Image src="/images/cris-franklin.png" alt="Cris Franklin" fill className="object-contain" />
                  </div>
                </div>

                {/* Especialista 4 - Rafa Brito */}
                <div className="relative overflow-hidden aspect-[4/5]">
                  <div className="relative h-full">
                    <Image src="/images/rafa-brito.png" alt="Rafa Brito" fill className="object-contain" />
                  </div>
                </div>

                {/* Especialista 5 - Marcello Safe */}
                <div className="relative overflow-hidden aspect-[4/5]">
                  <div className="relative h-full">
                    <Image src="/images/marcello-safe.png" alt="Marcello Safe" fill className="object-contain" />
                  </div>
                </div>

                {/* Especialista 6 - Igor Moraes */}
                <div className="relative overflow-hidden aspect-[4/5]">
                  <div className="relative h-full">
                    <Image src="/images/igor-moraes.png" alt="Igor Moraes" fill className="object-contain" />
                  </div>
                </div>

                {/* Especialista 7 - Cadu Neiva */}
                <div className="relative overflow-hidden aspect-[4/5]">
                  <div className="relative h-full">
                    <Image src="/images/cadu-neiva.png" alt="Cadu Neiva" fill className="object-contain" />
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Final */}
            <div className="mt-16 flex flex-col items-center">
              <Button
                className="bg-[#7b68ee] hover:bg-[#6a5acd] text-white rounded-full py-6 px-8 text-lg font-medium h-auto"
                onClick={openPopup}
              >
                Quero automatizar meu comercial agora
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-[#f0f0f0] bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#7b68ee]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <span className="text-xl font-bold text-[#333]">AutoCRM</span>
            </div>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-[#666] hover:text-[#7b68ee] transition-colors">
                Termos
              </Link>
              <Link href="#" className="text-sm text-[#666] hover:text-[#7b68ee] transition-colors">
                Privacidade
              </Link>
              <Link href="#" className="text-sm text-[#666] hover:text-[#7b68ee] transition-colors">
                Contato
              </Link>
            </div>
            <div className="text-sm text-[#666]">
              © {new Date().getFullYear()} AutoCRM. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
