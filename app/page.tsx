"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check, ChevronRight, Star } from "lucide-react"
import { motion } from "framer-motion"
import { ConversionPopup } from "@/components/conversion-popup"
import { useConversionPopup } from "@/hooks/use-conversion-popup"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { CountdownHeader } from "@/components/countdown-header"
import { FloatingCTA } from "@/components/floating-cta"
import { FAQSection } from "@/components/faq-section"

// Dados dos depoimentos (simplificados para apenas imagens)
const testimonials = [
  {
    id: 1,
    name: "Pablo Marçal",
    image: "/images/pablo-marcal.png",
  },
  {
    id: 2,
    name: "Cris Franklin",
    image: "/images/cris-franklin.png",
  },
  {
    id: 3,
    name: "Rafa Brito",
    image: "/images/rafa-brito.png",
  },
  {
    id: 4,
    name: "Marcello Safe",
    image: "/images/marcello-safe.png",
  },
  {
    id: 5,
    name: "Igor Moraes",
    image: "/images/igor-moraes.png",
  },
  {
    id: 6,
    name: "Cadu Neiva",
    image: "/images/cadu-neiva.png",
  },
]

// Dados do FAQ
const faqItems = [
  {
    question: "Preciso ter conhecimento técnico?",
    answer:
      "Não, o AutoCRM foi desenvolvido para ser intuitivo e fácil de usar. Fornecemos tutoriais detalhados e suporte para ajudar na implementação, mesmo se você não tiver experiência técnica. Nossos templates são prontos para usar e as automações são configuradas com poucos cliques.",
  },
  {
    question: "Quanto tempo leva para implementar?",
    answer:
      "A implementação básica pode ser feita em apenas 1 dia. Você receberá acesso imediato aos templates e poderá começar a usar o sistema em poucas horas. Para uma implementação completa com todas as automações, o processo leva em média 3 a 5 dias, dependendo da complexidade do seu negócio.",
  },
  {
    question: "Quanto vou gastar de ferramenta?",
    answer:
      "As ferramentas necessárias (ClickUp, Make.com e Google Sheets) possuem versões gratuitas que são suficientes para começar. Para negócios em crescimento, recomendamos os planos básicos que custam aproximadamente R$50/mês no total. Detalhamos todas as opções e custos nos materiais de treinamento para que você possa escolher o que melhor se adapta ao seu orçamento.",
  },
  {
    question: "Dá pra usar no plano gratuito?",
    answer:
      "Sim! Desenvolvemos o sistema para funcionar com os planos gratuitos das ferramentas. Você pode começar sem nenhum investimento adicional além do curso. À medida que seu negócio cresce, você pode optar por atualizar para planos pagos para acessar recursos avançados, mas isso não é obrigatório para obter resultados significativos.",
  },
]

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { isOpen, openPopup, closePopup, handleSubmit } = useConversionPopup()
  const currentYear = new Date().getFullYear()
  const videoRef = useRef<HTMLVideoElement>(null)

  // Criar data alvo para o contador (3 dias a partir de agora)
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 3)

  useEffect(() => {
    setIsLoaded(true)

    // Garantir que o vídeo seja reproduzido quando estiver pronto
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Erro ao reproduzir o vídeo:", error)
      })
    }
  }, [])

  const scrollToOffer = () => {
    const ofertaSection = document.getElementById("oferta")
    if (ofertaSection) {
      ofertaSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Barra de contador no topo */}
      <CountdownHeader targetDate={targetDate} onButtonClick={scrollToOffer} />

      {/* Popup de conversão */}
      <ConversionPopup isOpen={isOpen} onClose={closePopup} onSubmit={handleSubmit} />

      {/* Botão flutuante */}
      <FloatingCTA onClick={scrollToOffer} />

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
                  <span className="flex h-2 w-2 rounded-full bg-[#9747FF] mr-2"></span>
                  <span className="bg-gradient-to-r from-[#9747FF] to-[#8A3DF9] bg-clip-text text-transparent">
                    Lançamento com 90%OFF
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
                  <span className="inline-block bg-gradient-to-r from-[#9747FF] to-[#8A3DF9] bg-clip-text text-transparent">
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
                    <Button
                      className="bg-[#9747FF] hover:bg-[#8A3DF9] text-white rounded-full text-base font-medium px-6 py-3 h-auto group"
                      onClick={scrollToOffer}
                    >
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
                    <span>4.9/5 (7k+ avaliações)</span>
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
                        <div className="text-[#9747FF] flex items-center justify-center rounded-full bg-[#f5f2ff] h-5 w-5">
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
                    {[
                      "/images/person1.jpeg",
                      "/images/person2.jpeg",
                      "/images/person3.jpeg",
                      "/images/person4.jpeg",
                    ].map((src, index) => (
                      <div key={index} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative">
                        <Image
                          src={src || "/placeholder.svg"}
                          alt={`Usuário ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="32px"
                        />
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
                  {/* Vídeo em loop */}
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover rounded-xl"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="/videos/autocrm-demo.mov" type="video/mp4" />
                    Seu navegador não suporta vídeos.
                  </video>

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
                      <span className="text-xs font-bold text-white">BS</span>
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

            {/* Seções de recursos com layout padronizado */}
            <div className="space-y-24">
              {/* Pipeline de Vendas */}
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="flex flex-col gap-6">
                  <h3 className="text-3xl font-bold text-[#333]">Pipeline de Vendas</h3>
                  <p className="text-lg text-[#666] leading-relaxed">
                    Tenha total gestão das etapas do processo comercial, entenda como está a qualificação, agendamento,
                    FollowUp, ganhos e perdas.
                  </p>
                </div>
                <div className="rounded-xl overflow-hidden relative shadow-lg">
                  <div className="relative w-full aspect-[16/10]">
                    <Image
                      src="/images/template-gratuito-crm.svg"
                      alt="Pipeline de Vendas"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Automações estratégicas */}
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="order-2 md:order-1 rounded-xl overflow-hidden relative shadow-lg">
                  <div className="relative w-full aspect-[16/10]">
                    <Image
                      src="/images/automacoes-crm.png"
                      alt="Automações estratégicas"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="order-1 md:order-2 flex flex-col gap-6">
                  <h3 className="text-3xl font-bold text-[#333]">Automações estratégicas</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="text-[#00c875] flex items-center justify-center rounded-sm mt-1">
                        <Check className="h-6 w-6" />
                      </div>
                      <p className="text-lg text-[#666]">Cadastro automático dos leads</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="text-[#00c875] flex items-center justify-center rounded-sm mt-1">
                        <Check className="h-6 w-6" />
                      </div>
                      <p className="text-lg text-[#666]">Mensagens de WhatsApp com GPT</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="text-[#00c875] flex items-center justify-center rounded-sm mt-1">
                        <Check className="h-6 w-6" />
                      </div>
                      <p className="text-lg text-[#666]">Agendamento de reuniões no Google Calendar</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="text-[#00c875] flex items-center justify-center rounded-sm mt-1">
                        <Check className="h-6 w-6" />
                      </div>
                      <p className="text-lg text-[#666]">Lembrete de Reuniões via WhatsApp</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Dashboard de resultados */}
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="flex flex-col gap-6">
                  <h3 className="text-3xl font-bold text-[#333]">Dashboard de resultados</h3>
                  <p className="text-lg text-[#666] leading-relaxed">
                    Acompanhe os principais indicadores/métricas do seu processo de vendas sem precisar de um
                    conhecimento avançado em BI.
                  </p>
                </div>
                <div className="rounded-xl overflow-hidden relative shadow-lg">
                  <div className="relative w-full aspect-[16/10]">
                    <Image
                      src="/images/dashboard-comercial.svg"
                      alt="Dashboard de resultados"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Bônus */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center gap-4 mb-16">
              <div className="inline-flex items-center rounded-full border border-[#f0f0f0] bg-[#f5f2ff] px-3 py-1 text-sm font-medium text-[#9747FF] shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-[#9747FF] mr-2"></span>Bônus Exclusivos
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
                    <svg className="h-6 w-6 text-[#9747FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    <svg className="h-6 w-6 text-[#9747FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    <svg className="h-6 w-6 text-[#9747FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    <svg className="h-6 w-6 text-[#9747FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    <svg className="h-6 w-6 text-[#9747FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    <svg className="h-6 w-6 text-[#9747FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          </div>
        </section>

        {/* Seção de Preço */}
        <section id="oferta" className="py-20 bg-[#fafafa]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col items-center text-center gap-4 mb-12">
                <div className="inline-flex items-center rounded-full border border-[#f0f0f0] bg-[#f5f2ff] px-3 py-1 text-sm font-medium text-[#9747FF] shadow-sm">
                  <span className="flex h-2 w-2 rounded-full bg-[#9747FF] mr-2"></span>Oferta Especial
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
                        className="bg-[#9747FF] hover:bg-[#8A3DF9] text-white rounded-full py-6 text-lg font-medium h-auto"
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
                        <div className="flex items-center justify-center gap-1">
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

        {/* Nova Seção de Prova Social com Carrossel apenas de imagens - MOVIDA PARA O FINAL */}
        <section className="py-20 bg-gradient-to-b from-white to-[#f5f2ff]">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center gap-4 mb-16">
              <div className="inline-flex items-center rounded-full border border-[#f0f0f0] bg-white px-3 py-1 text-sm font-medium text-[#9747FF] shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-[#9747FF] mr-2"></span>Prova Social
              </div>
              <h2 className="text-3xl font-bold text-[#333] sm:text-4xl md:text-5xl">
                Usado pelos maiores especialistas
              </h2>
              <p className="text-xl text-[#666] max-w-[800px]">
                Veja quem já está utilizando o AutoCRM para transformar seu processo comercial
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <TestimonialCarousel testimonials={testimonials} />
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center"
              >
                <div className="text-4xl font-bold text-[#9747FF] mb-2">87%</div>
                <p className="text-[#666]">Aumento médio na taxa de conversão</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="text-4xl font-bold text-[#9747FF] mb-2">2.500+</div>
                <p className="text-[#666]">Empresas utilizando o AutoCRM</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div className="text-4xl font-bold text-[#9747FF] mb-2">65%</div>
                <p className="text-[#666]">Redução no tempo de fechamento</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col items-center text-center"
              >
                <div className="text-4xl font-bold text-[#9747FF] mb-2">4.9/5</div>
                <p className="text-[#666]">Avaliação média dos clientes</p>
              </motion.div>
            </div>

            {/* CTA */}
            <div className="mt-16 flex justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className="bg-[#9747FF] hover:bg-[#8A3DF9] text-white rounded-full py-6 px-8 text-lg font-medium h-auto"
                  onClick={scrollToOffer}
                >
                  Quero automatizar meu comercial agora
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Seção de FAQ */}
        <section className="py-16 bg-[#f5f2ff]">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center gap-4 mb-12">
              <div className="inline-flex items-center rounded-full border border-[#f0f0f0] bg-white px-3 py-1 text-sm font-medium text-[#9747FF] shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-[#9747FF] mr-2"></span>Dúvidas Frequentes
              </div>
              <h2 className="text-3xl font-bold text-[#333] sm:text-4xl">Perguntas Frequentes</h2>
              <p className="text-lg text-[#666] max-w-[800px]">
                Tire suas dúvidas sobre o AutoCRM e como ele pode transformar seu processo comercial
              </p>
            </div>

            <FAQSection items={faqItems} />

            <div className="mt-12 flex justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className="bg-[#9747FF] hover:bg-[#8A3DF9] text-white rounded-full py-3 px-6 text-base font-medium h-auto"
                  onClick={scrollToOffer}
                >
                  Automatizar comercial agora
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Rodapé */}
      <footer className="py-8 bg-[#f5f2ff] border-t border-[#e5e5e5]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-[#666] text-sm">© {currentYear} Bravy School. Todos os direitos reservados.</p>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-[#666] hover:text-[#9747FF] text-sm transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="text-[#666] hover:text-[#9747FF] text-sm transition-colors">
                Política de Privacidade
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
