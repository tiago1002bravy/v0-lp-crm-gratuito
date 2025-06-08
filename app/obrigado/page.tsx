"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Play } from "lucide-react"
import { useEffect, useState } from "react"

export default function ObrigadoCrmV1() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 relative overflow-hidden">
      {/* Elementos decorativos modernos */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 blur-3xl"></div>

      {/* Conteúdo principal */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 py-12">
        <div className="max-w-sm mx-auto">
          {/* Status de sucesso */}
          <div
            className={`flex items-center justify-center space-x-2 mb-6 transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}
          >
            <div className="h-1 w-12 rounded-full bg-green-500"></div>
            <div className="flex items-center bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
              <CheckCircle className="w-3 h-3 mr-1" />
              <span>Compra confirmada</span>
            </div>
            <div className="h-1 w-12 rounded-full bg-green-500"></div>
          </div>

          {/* HEADLINE */}
          <h1
            className={`text-3xl font-bold text-slate-900 mb-3 leading-tight transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Parabéns pela sua compra
          </h1>

          {/* SUBHEADLINE */}
          <p
            className={`text-slate-600 mb-8 leading-relaxed transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Você ganhou uma <span className="text-blue-600 font-medium">consultoria gratuita</span> para maximizar seus
            resultados com o CRM.
          </p>

          {/* VÍDEO */}
          <div
            className={`mb-8 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              {/* Overlay de gradiente sutil */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent z-10"></div>

              <div className="aspect-video bg-slate-200 relative">
                {/* Placeholder para o vídeo com design moderno */}
                <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                  <div className="text-center z-20">
                    <div className="relative mb-4">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto border border-white/20">
                        <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center transition-transform duration-300 hover:scale-105">
                          <Play className="w-6 h-6 text-white ml-1" />
                        </div>
                      </div>
                    </div>
                    <p className="text-white/90 font-medium text-sm">Estratégias avançadas de CRM</p>
                    <p className="text-white/60 text-xs mt-1">8 minutos</p>
                  </div>

                  {/* Imagem de fundo do vídeo */}
                  <div className="absolute inset-0 opacity-40">
                    <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800"></div>
                  </div>
                </div>

                {/* Descomente e substitua pela URL real do vídeo */}
                {/* 
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/SEU_VIDEO_ID"
                  title="Estratégias avançadas de CRM"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                */}
              </div>

              {/* Barra de progresso estilizada */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-700">
                <div className="h-full w-1/3 bg-blue-500"></div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div
            className={`space-y-4 transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            {/* Card de CTA com design moderno */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <h3 className="text-slate-900 font-medium mb-2">Agende sua consultoria</h3>
              <p className="text-slate-600 text-sm mb-4">
                Nossa equipe especializada está pronta para ajudar você a maximizar seus resultados.
              </p>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 font-medium rounded-xl flex items-center justify-center group">
                <span>Quero minha consultoria gratuita</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

              {/* Benefícios em design moderno */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <CheckCircle className="w-2 h-2 text-blue-600" />
                  </div>
                  <span className="text-xs text-slate-600">100% Gratuito</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <CheckCircle className="w-2 h-2 text-blue-600" />
                  </div>
                  <span className="text-xs text-slate-600">Sem compromisso</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <CheckCircle className="w-2 h-2 text-blue-600" />
                  </div>
                  <span className="text-xs text-slate-600">Personalizado</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <CheckCircle className="w-2 h-2 text-blue-600" />
                  </div>
                  <span className="text-xs text-slate-600">Especialistas</span>
                </div>
              </div>
            </div>

            {/* Indicador de vagas limitadas */}
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-center">
              <div className="w-2 h-2 rounded-full bg-amber-400 mr-2 animate-pulse"></div>
              <p className="text-amber-800 text-xs font-medium">Vagas limitadas - Apenas 10 disponíveis esta semana</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
