"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { ConversionPopup } from "@/components/conversion-popup";
import { useConversionPopup } from "@/hooks/use-conversion-popup";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { CountdownHeader } from "@/components/countdown-header";
import { FloatingCTA } from "@/components/floating-cta";
import { FAQSection } from "@/components/faq-section";
import { AnimatedCounter } from "@/components/animated-counter";
import { GTMEvents, gtmEvent } from "@/components/gtm-events";

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
];

// Dados do FAQ
const faqItems = [
    {
        question: "Preciso ter conhecimento técnico?",
        answer: "Não, a estrutura tem aulas explicativas de como usar.",
    },
    {
        question: "Quanto tempo leva para implementar?",
        answer: "Se você não tiver nenhum conhecimento, em até 7 dias você consegue deixar tudo rodando. Se você já entender de ClickUp e make, você terá uma curva bem menor.",
    },
    {
        question: "Quanto vou gastar de ferramenta?",
        answer: "O make você poderá usar no plano gratuito, já o ClickUp terá um custo de U$19,00 e vamos dar cupons com 30 dias gratuitos nas demais ferramentas.",
    },
    {
        question: "Dá pra usar no plano gratuito?",
        answer: "O make você poderá usar no plano gratuito, já o ClickUp terá um custo de U$19,00 e vamos dar cupons com 30 dias gratuitos nas demais ferramentas.",
    },
    {
        question: "O produto tem garantia?",
        answer: "Sim, oferecemos garantia de 7 dias. Se você não ficar satisfeito com o produto por qualquer motivo, devolvemos 100% do seu dinheiro. Sem perguntas. Queremos que você tenha total confiança na sua compra.",
    },
];

export default function Home() {
    const [isLoaded, setIsLoaded] = useState(false);
    const { isOpen, openPopup, closePopup, handleSubmit } =
        useConversionPopup();
    const currentYear = new Date().getFullYear();

    // Criar data alvo para o contador (3 dias a partir de agora)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const scrollToOffer = () => {
        // Enviar evento para GTM
        gtmEvent("scroll_to_offer", {
            event_category: "engagement",
            event_label: "scroll_to_offer_button",
        });

        const ofertaSection = document.getElementById("oferta");
        if (ofertaSection) {
            ofertaSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handlePopupOpen = () => {
        // Enviar evento para GTM
        gtmEvent("popup_opened", {
            event_category: "conversion",
            event_label: "conversion_popup_opened",
        });
        openPopup();
    };

    const handleFormSubmit = (data: {
        name: string;
        email: string;
        phone: string;
    }) => {
        // Enviar evento para GTM
        gtmEvent("form_submitted", {
            event_category: "conversion",
            event_label: "lead_form_submitted",
            user_data: {
                email: data.email,
                phone: data.phone,
            },
        });
        handleSubmit(data);
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Componente para eventos GTM */}
            <GTMEvents />

            {/* Barra de contador no topo */}
            <CountdownHeader
                targetDate={targetDate}
                onButtonClick={() => {
                    gtmEvent("header_cta_clicked", {
                        event_category: "engagement",
                        event_label: "header_automatizar_comercial",
                    });
                    scrollToOffer();
                }}
            />

            {/* Popup de conversão */}
            <ConversionPopup
                isOpen={isOpen}
                onClose={closePopup}
                onSubmit={handleFormSubmit}
            />

            {/* Botão flutuante */}
            <FloatingCTA
                onClick={() => {
                    gtmEvent("floating_cta_clicked", {
                        event_category: "engagement",
                        event_label: "floating_button",
                    });
                    scrollToOffer();
                }}
            />

            <main className="flex-1">
                <section className="relative py-8 w-screen flex flex-col justify-center items-center bg-transparent overflow-hidden">
                    {/* Static logo with hover effect */}
                </section>

                <section className="pb-20 md:pb-28 overflow-hidden relative">
                    {/* Background elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#f5f2ff] opacity-50 blur-3xl"></div>
                        <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-[#f0f7ff] opacity-50 blur-3xl"></div>
                    </div>

                    <div className="container mx-auto px-4 relative">
                        <div className="max-w-3xl mx-auto">
                            <div className="flex flex-col gap-6">
                                <div>
                                    <a href="https://www.instagram.com/bravyschool/" target="_blank" className="relative z-10 mb-2 group flex items-end">
                                        <Image
                                            alt="Bravy School"
                                            src="/logo/bravy-black.svg"
                                            width={100}
                                            height={140}
                                            className="relative z-10 transition-all duration-300 group-hover:scale-105"
                                        />
                                    </a>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{
                                            opacity: isLoaded ? 1 : 0,
                                            y: isLoaded ? 0 : 20,
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.1,
                                        }}
                                        className="inline-flex items-center rounded-full border px-3 border-[#f0f0f0] bg-white  py-1 text-sm font-medium shadow-sm self-start"
                                    >
                                        <span className="flex h-2 w-2 rounded-full bg-[#9747FF] mr-2"></span>
                                        <span className="bg-gradient-to-r from-[#9747FF] to-[#8A3DF9] bg-clip-text text-transparent">
                                            Lançamento com 90%OFF
                                        </span>
                                    </motion.div>
                                </div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{
                                        opacity: isLoaded ? 1 : 0,
                                        y: isLoaded ? 0 : 20,
                                    }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="text-3xl font-bold text-[#333] sm:text-4xl md:text-5xl lg:text-6xl"
                                >
                                    <span className="bg-gradient-to-r from-[#333] to-[#555] bg-clip-text text-transparent">
                                        CRM 100% automatizado com templates,
                                        automações,{" "}
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
                                    animate={{
                                        opacity: isLoaded ? 1 : 0,
                                        y: isLoaded ? 0 : 20,
                                    }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="text-xl text-[#666] max-w-[600px]"
                                >
                                    Dobre a conversão do seu comercial com um
                                    processo automatizado utilizando IA e tenha
                                    todos os dados para escalar com
                                    previsibilidade e segurança.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{
                                        opacity: isLoaded ? 1 : 0,
                                        y: isLoaded ? 0 : 20,
                                    }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="flex flex-col sm:flex-row gap-4 mt-4"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button
                                            className="bg-[#9747FF] hover:bg-[#8A3DF9] text-white rounded-full text-base font-medium px-6 py-3 h-auto group"
                                            onClick={() => {
                                                gtmEvent("hero_cta_clicked", {
                                                    event_category:
                                                        "conversion",
                                                    event_label:
                                                        "hero_automatizar_comercial",
                                                });
                                                scrollToOffer();
                                            }}
                                        >
                                            Automatizar comercial
                                            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </motion.div>

                                    <div className="flex items-center gap-2 text-sm text-[#666]">
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className="h-4 w-4 fill-[#ffcc00] text-[#ffcc00]"
                                                />
                                            ))}
                                        </div>
                                        <span>4.9/5 (7k+ avaliações)</span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{
                                        opacity: isLoaded ? 1 : 0,
                                        y: isLoaded ? 0 : 20,
                                    }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                    className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3"
                                >
                                    {[
                                        "Template de ClickUp",
                                        "Automações no make",
                                        "Dashboard comercial",
                                        "+ 10 Aulas bônus",
                                    ].map((item, index) => (
                                        <motion.div
                                            key={item}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{
                                                opacity: isLoaded ? 1 : 0,
                                                x: isLoaded ? 0 : -20,
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                delay: 0.6 + index * 0.1,
                                            }}
                                            className="flex items-center gap-2"
                                        >
                                            <div className="text-[#9747FF] flex items-center justify-center rounded-full bg-[#f5f2ff] h-5 w-5">
                                                <Check className="h-3 w-3" />
                                            </div>
                                            <p className="text-sm text-[#666]">
                                                {item}
                                            </p>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isLoaded ? 1 : 0 }}
                                    transition={{ duration: 0.5, delay: 1 }}
                                    className="flex gap-4 mt-8"
                                >
                                    <div className="flex -space-x-2">
                                        {[
                                            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6077.JPG-Jf2gEOPY7rV15nFAeqk73xbCzg9tSg.jpeg",
                                            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6079.JPG-rFrdIXc1iBYkBqsQXOmLqDiFEblpE1.jpeg",
                                            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6075.jpg-sgAPism9ZN0bpGBjF2Rkw83GMTFD7i.jpeg",
                                            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6076.jpg-b3VMx89Aj5AAX8QoXSWCqVrj6I26XB.jpeg",
                                        ].map((src, index) => (
                                            <div
                                                key={index}
                                                className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative"
                                            >
                                                <Image
                                                    src={
                                                        src ||
                                                        "/placeholder.svg"
                                                    }
                                                    alt={`Usuário ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                    sizes="32px"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-sm text-[#666]">
                                        <span className="font-medium">
                                            <AnimatedCounter
                                                end={7000}
                                                duration={2500}
                                            />
                                        </span>{" "}
                                        empresas já automatizaram seu comercial com a Bravy
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-[#fafafa]">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col items-center text-center gap-4 mb-12">
                            <h2 className="text-3xl font-bold text-[#333] sm:text-4xl md:text-5xl">
                                Organize seu processo comercial
                            </h2>
                            <p className="text-xl text-[#666] max-w-[800px]">
                                Estrutura completa para você copiar, colar e
                                dobrar suas vendas sem precisar aumentar o
                                volume de leads
                            </p>
                        </div>

                        {/* Seções de recursos com layout padronizado */}
                        <div className="space-y-24">
                            {/* Pipeline de Vendas */}
                            <div className="grid md:grid-cols-2 gap-10 items-center">
                                <div className="flex flex-col gap-6">
                                    <h3 className="text-3xl font-bold text-[#333]">
                                        Pipeline de Vendas
                                    </h3>
                                    <p className="text-lg text-[#666] leading-relaxed">
                                        Tenha total gestão das etapas do
                                        processo comercial, entenda como está a
                                        qualificação, agendamento, FollowUp,
                                        ganhos e perdas.
                                    </p>
                                </div>
                                <div className="rounded-xl overflow-hidden relative shadow-lg">
                                    <div className="relative w-full aspect-[16/10]">
                                        <Image
                                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Print%20Pipeline.png-Y180KFZWhckc9hAuZWUSlullygG9rI.jpeg"
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
                                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Print%20Automac%CC%A7o%CC%83es-D6DTZrbDR06LGE51VnMmiGN2AGjIoB.png"
                                            alt="Automações estratégicas"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                                <div className="order-1 md:order-2 flex flex-col gap-6">
                                    <h3 className="text-3xl font-bold text-[#333]">
                                        Automações estratégicas
                                    </h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <div className="text-[#00c875] flex items-center justify-center rounded-sm mt-1">
                                                <Check className="h-6 w-6" />
                                            </div>
                                            <p className="text-lg text-[#666]">
                                                Cadastro automático dos leads
                                            </p>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="text-[#00c875] flex items-center justify-center rounded-sm mt-1">
                                                <Check className="h-6 w-6" />
                                            </div>
                                            <p className="text-lg text-[#666]">
                                                Mensagens de WhatsApp com GPT
                                            </p>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="text-[#00c875] flex items-center justify-center rounded-sm mt-1">
                                                <Check className="h-6 w-6" />
                                            </div>
                                            <p className="text-lg text-[#666]">
                                                Agendamento de reuniões no
                                                Google Calendar
                                            </p>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="text-[#00c875] flex items-center justify-center rounded-sm mt-1">
                                                <Check className="h-6 w-6" />
                                            </div>
                                            <p className="text-lg text-[#666]">
                                                Lembrete de Reuniões via
                                                WhatsApp
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Dashboard de resultados */}
                            <div className="grid md:grid-cols-2 gap-10 items-center">
                                <div className="flex flex-col gap-6">
                                    <h3 className="text-3xl font-bold text-[#333]">
                                        Dashboard de resultados
                                    </h3>
                                    <p className="text-lg text-[#666] leading-relaxed">
                                        Acompanhe os principais
                                        indicadores/métricas do seu processo de
                                        vendas sem precisar de um conhecimento
                                        avançado em BI.
                                    </p>
                                </div>
                                <div className="rounded-xl overflow-hidden relative shadow-lg">
                                    <div className="relative w-full aspect-[16/10]">
                                        <Image
                                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Print%20Dash%20Comercial-HQihgowNWylG1mBXlf7Z3odu0ulsdb.svg"
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
                                <span className="flex h-2 w-2 rounded-full bg-[#9747FF] mr-2"></span>
                                Bônus Exclusivos
                            </div>
                            <h2 className="text-3xl font-bold text-[#333] sm:text-4xl md:text-5xl">
                                Materiais prontos para você implementar
                            </h2>
                            <p className="text-xl text-[#666] max-w-[800px]">
                                Além da estrutura completa, você recebe estes
                                materiais prontos para acelerar seus resultados
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
                                        <svg
                                            className="h-6 w-6 text-[#9747FF]"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-[#333]">
                                        Modelos de Criativos Validados
                                    </h3>
                                    <p className="text-[#666]">
                                        Modelos de anúncios e posts que já foram
                                        testados e aprovados para atrair leads
                                        qualificados.
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
                                        <svg
                                            className="h-6 w-6 text-[#9747FF]"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-[#333]">
                                        Script de Qualificação
                                    </h3>
                                    <p className="text-[#666]">
                                        Roteiro completo para qualificar leads e
                                        identificar oportunidades de negócio de
                                        forma eficiente.
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
                                        <svg
                                            className="h-6 w-6 text-[#9747FF]"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-[#333]">
                                        Script para Sessão Estratégica
                                    </h3>
                                    <p className="text-[#666]">
                                        Guia passo a passo para conduzir
                                        reuniões estratégicas que convertem em
                                        vendas.
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
                                        <svg
                                            className="h-6 w-6 text-[#9747FF]"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-[#333]">
                                        Apresentação de Vendas
                                    </h3>
                                    <p className="text-[#666]">
                                        Template de apresentação profissional
                                        para impressionar seus clientes e fechar
                                        mais negócios.
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
                                        <svg
                                            className="h-6 w-6 text-[#9747FF]"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-[#333]">
                                        Modelo de Proposta
                                    </h3>
                                    <p className="text-[#666]">
                                        Template de proposta comercial que
                                        destaca o valor do seu serviço e
                                        facilita a decisão de compra.
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
                                        <svg
                                            className="h-6 w-6 text-[#9747FF]"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-[#333]">
                                        Descritivos de Cargos Comerciais
                                    </h3>
                                    <p className="text-[#666]">
                                        Descrições detalhadas de funções para
                                        montar uma equipe comercial de alto
                                        desempenho.
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
                                    <span className="flex h-2 w-2 rounded-full bg-[#9747FF] mr-2"></span>
                                    Oferta Especial
                                </div>
                                <h2 className="text-3xl font-bold text-[#333] sm:text-4xl md:text-5xl">
                                    Invista agora no seu sucesso comercial
                                </h2>
                                <p className="text-xl text-[#666] max-w-[800px]">
                                    Acesso completo a estrutura com processos,
                                    automações, dashboards e todos os bônus
                                </p>
                            </div>

                            <div className="bg-white rounded-xl border border-[#f0f0f0] shadow-sm overflow-hidden">
                                <div className="p-8 md:p-12">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="mb-6">
                                            <div className="text-[#666] text-lg mb-1">
                                                De{" "}
                                                <span className="line-through">
                                                    R$ 997,00
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-center gap-2">
                                                <span className="text-5xl md:text-6xl font-bold text-[#333]">
                                                    R$ 47
                                                </span>
                                                <span className="text-xl text-[#666]">
                                                    ,00
                                                </span>
                                            </div>
                                            <div className="text-[#666] text-lg mt-1">
                                                ou 12x de R$ 4,83
                                            </div>
                                            <div className="text-[#00c875] font-medium mt-2">
                                                Economize R$ 950,00 (95% de
                                                desconto)
                                            </div>
                                        </div>

                                        <div className="grid gap-4 mb-8 w-full max-w-md">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e6f9f1]">
                                                    <Check className="h-4 w-4 text-[#00c875]" />
                                                </div>
                                                <p className="text-[#666]">
                                                    Acesso vitalício à
                                                    plataforma
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e6f9f1]">
                                                    <Check className="h-4 w-4 text-[#00c875]" />
                                                </div>
                                                <p className="text-[#666]">
                                                    Todos os templates e
                                                    automações
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e6f9f1]">
                                                    <Check className="h-4 w-4 text-[#00c875]" />
                                                </div>
                                                <p className="text-[#666]">
                                                    6 bônus exclusivos (valor:
                                                    R$ 882)
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e6f9f1]">
                                                    <Check className="h-4 w-4 text-[#00c875]" />
                                                </div>
                                                <p className="text-[#666]">
                                                    Suporte por 30 dias
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-4 w-full max-w-md">
                                            <Button
                                                className="bg-[#9747FF] hover:bg-[#8A3DF9] text-white rounded-full py-6 text-lg font-medium h-auto"
                                                onClick={() => {
                                                    gtmEvent(
                                                        "purchase_intent",
                                                        {
                                                            event_category:
                                                                "conversion",
                                                            event_label:
                                                                "pricing_section_cta",
                                                            value: 47,
                                                            currency: "BRL",
                                                        }
                                                    );
                                                    handlePopupOpen();
                                                }}
                                            >
                                                Quero automatizar meu comercial
                                                agora
                                                <ChevronRight className="ml-2 h-5 w-5" />
                                            </Button>

                                            <div className="flex items-center justify-center gap-4 text-sm text-[#666]">
                                                <div className="flex items-center gap-1">
                                                    <svg
                                                        className="h-4 w-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
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
                                                    <svg
                                                        className="h-4 w-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                                        />
                                                    </svg>
                                                    <span>
                                                        Parcelamento em até 12x
                                                    </span>
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
                                <span className="flex h-2 w-2 rounded-full bg-[#9747FF] mr-2"></span>
                                Usuários
                            </div>
                            <h2 className="text-3xl font-bold text-[#333] sm:text-4xl md:text-5xl">
                                Usado pelos maiores especialistas
                            </h2>
                            <p className="text-xl text-[#666] max-w-[800px]">
                                Veja quem já está utilizando o AutoCRM para
                                transformar seu processo comercial
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
                                <AnimatedCounter
                                    end={87}
                                    suffix="%"
                                    className="text-4xl font-bold text-[#9747FF] mb-2"
                                />
                                <p className="text-[#666]">
                                    Aumento médio na taxa de conversão
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="flex flex-col items-center text-center"
                            >
                                <AnimatedCounter
                                    end={7000}
                                    className="text-4xl font-bold text-[#9747FF] mb-2"
                                />
                                <p className="text-[#666]">
                                    Empresas utilizando o AutoCRM
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="flex flex-col items-center text-center"
                            >
                                <AnimatedCounter
                                    end={65}
                                    suffix="%"
                                    className="text-4xl font-bold text-[#9747FF] mb-2"
                                />
                                <p className="text-[#666]">
                                    Redução no tempo de fechamento
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="flex flex-col items-center text-center"
                            >
                                <AnimatedCounter
                                    end={4.9}
                                    suffix="/5"
                                    decimals={1}
                                    className="text-4xl font-bold text-[#9747FF] mb-2"
                                />
                                <p className="text-[#666]">
                                    Avaliação média dos clientes
                                </p>
                            </motion.div>
                        </div>

                        {/* CTA */}
                        <div className="mt-16 flex justify-center">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    className="bg-[#9747FF] hover:bg-[#8A3DF9] text-white rounded-full py-6 px-8 text-lg font-medium h-auto"
                                    onClick={() => {
                                        gtmEvent("social_proof_cta_clicked", {
                                            event_category: "conversion",
                                            event_label:
                                                "social_proof_section_cta",
                                        });
                                        scrollToOffer();
                                    }}
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
                                <span className="flex h-2 w-2 rounded-full bg-[#9747FF] mr-2"></span>
                                Dúvidas Frequentes
                            </div>
                            <h2 className="text-3xl font-bold text-[#333] sm:text-4xl">
                                Perguntas Frequentes
                            </h2>
                            <p className="text-lg text-[#666] max-w-[800px]">
                                Tire suas dúvidas sobre como podemos transformar
                                seu processo comercial
                            </p>
                        </div>

                        <FAQSection items={faqItems} />

                        <div className="mt-12 flex justify-center">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    className="bg-[#9747FF] hover:bg-[#8A3DF9] text-white rounded-full py-3 px-6 text-base font-medium h-auto"
                                    onClick={() => {
                                        gtmEvent("faq_cta_clicked", {
                                            event_category: "conversion",
                                            event_label: "faq_section_cta",
                                        });
                                        scrollToOffer();
                                    }}
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
                            <p className="text-[#666] text-sm">
                                © {currentYear} Bravy School. Todos os direitos
                                reservados.
                            </p>
                        </div>
                        <div className="flex items-center gap-6">
                            <a
                                href="#"
                                className="text-[#666] hover:text-[#9747FF] text-sm transition-colors"
                            >
                                Termos de Uso
                            </a>
                            <a
                                href="#"
                                className="text-[#666] hover:text-[#9747FF] text-sm transition-colors"
                            >
                                Política de Privacidade
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
