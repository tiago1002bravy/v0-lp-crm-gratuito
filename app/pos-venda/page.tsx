import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function PosVenda() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header com ícone de sucesso */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>

            {/* Headline principal */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              🎉 Parabéns pela sua compra!
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-green-600 mb-6">
              Você ganhou uma Consultoria CRM Gratuita!
            </h2>

            {/* Subheadline */}
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Assista ao vídeo abaixo para entender como nossa consultoria especializada vai{" "}
              <strong>revolucionar seu negócio</strong> e aumentar suas vendas em até 300%
            </p>
          </div>

          {/* Card do vídeo */}
          <Card className="mb-8 shadow-2xl border-0">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <video controls className="w-full h-full object-cover" poster="/placeholder.svg?height=400&width=700">
                  <source src="/videos/V1-obrigado-crmautomatizado.mp4" type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
              </div>
            </CardContent>
          </Card>

          {/* CTA Principal */}
          <div className="text-center">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pronto para transformar seu negócio?</h3>
              <p className="text-gray-600 mb-6">
                Agende agora sua consultoria gratuita e descubra como implementar um CRM que realmente funciona para o
                seu negócio.
              </p>

              <Button
                size="lg"
                className="w-full md:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 px-8 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                🚀 Quero Minha Consultoria Gratuita
              </Button>

              <p className="text-sm text-gray-500 mt-4">⏰ Vagas limitadas • 100% gratuito • Sem compromisso</p>
            </div>
          </div>

          {/* Benefícios adicionais */}
          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Aumento de Vendas</h4>
              <p className="text-gray-600 text-sm">Estratégias comprovadas para aumentar sua conversão</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Implementação Rápida</h4>
              <p className="text-gray-600 text-sm">Configure seu CRM em poucos dias, não meses</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Suporte Especializado</h4>
              <p className="text-gray-600 text-sm">Acompanhamento personalizado para seu sucesso</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
