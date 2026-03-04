import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Heart, MessageCircle, HeartHandshake, MapPin } from "lucide-react";
import { getAssetPath } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={getAssetPath("/hero-church.png")}
            alt="Interior da Igreja"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 to-purple-800/80 mix-blend-multiply" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Grupo de Oração <br className="hidden md:block" />
            Nossa Senhora das Dores
          </h1>
          <p className="text-purple-100 text-lg md:text-xl font-medium mb-2">
            Paróquia São Peregrino – São José dos Campos – SP
          </p>
          <p className="text-white/80 max-w-2xl mx-auto text-base md:text-lg mb-10">
            Um lugar de encontro espiritual, esperança e renovação da fé através da interseção de Maria.
          </p>
          <Link
            href="/pedidos-oracao"
            className="bg-white text-purple-900 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-purple-50 transition-all transform hover:-translate-y-1"
          >
            Deixe seu Pedido de Oração
          </Link>
        </div>
      </section>

      {/* Navigation Grid Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-purple-900 mb-4">Nossas Atividades</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Conheça as diversas formas de se engajar e participar da nossa comunidade de fé e oração.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/atividades-semanais" className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                <Clock className="h-8 w-8 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-serif font-bold text-xl text-gray-900 mb-3">Oração Semanal</h3>
              <p className="text-gray-500 text-sm">Encontros presenciais e virtuais para aprofundarmos nossa fé.</p>
            </Link>

            <Link href="/calendario" className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                <Calendar className="h-8 w-8 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-serif font-bold text-xl text-gray-900 mb-3">Calendário</h3>
              <p className="text-gray-500 text-sm">Acompanhe nossos eventos, seminários e datas importantes.</p>
            </Link>

            <Link href="/testemunhos" className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                <MessageCircle className="h-8 w-8 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-serif font-bold text-xl text-gray-900 mb-3">Testemunhos</h3>
              <p className="text-gray-500 text-sm">Histórias de graça e fé compartilhadas pelos nossos membros.</p>
            </Link>

            <Link href="/pedidos-oracao" className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                <HeartHandshake className="h-8 w-8 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-serif font-bold text-xl text-gray-900 mb-3">Pedidos de Oração</h3>
              <p className="text-gray-500 text-sm">Envie suas intenções, juntos rezaremos por você.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Weekly Highlight Section - Terço */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-purple-900 rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
            <div className="lg:w-1/2 relative min-h-[400px]">
              <Image
                src={getAssetPath("/terco.png")}
                alt="Pessoas rezando o terço"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-purple-900 via-transparent to-transparent opacity-90" />
            </div>
            <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-purple-900">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">Santo Terço</h2>
              <p className="text-purple-100 mb-8 max-w-lg leading-relaxed">
                Rezar o Terço é contemplar com Maria o rosto de Cristo. Junte-se a nós semanalmente para este momento de profunda conexão espiritual.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4 bg-purple-800/50 p-4 rounded-2xl border border-purple-700">
                  <Clock className="h-6 w-6 text-purple-300 shrink-0" />
                  <div>
                    <h4 className="text-white font-medium">Toda Terça-feira, 20h00</h4>
                    <p className="text-purple-200 text-sm">Após a Missa das 19h</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-purple-800/50 p-4 rounded-2xl border border-purple-700">
                  <MapPin className="h-6 w-6 text-purple-300 shrink-0" />
                  <div>
                    <h4 className="text-white font-medium">Capela Principal</h4>
                    <p className="text-purple-200 text-sm">Paróquia São Peregrino</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-4">Estrutura da Oração:</h4>
                <ol className="list-decimal list-inside text-purple-200 space-y-2">
                  <li>Acolhida e Louvor</li>
                  <li>Leitura da Palavra</li>
                  <li>Recitação do Terço e Contemplação</li>
                  <li>Partilha e Pedidos</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-purple-50 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-200 rounded-full blur-3xl opacity-50 z-0" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <Heart className="h-16 w-16 text-purple-600 mx-auto mb-6" />
          <h2 className="font-serif text-4xl py-2 font-bold text-purple-900 mb-6">Venha Rezar Conosco</h2>
          <p className="text-lg text-gray-600 mb-10">
            A oração em comunidade nos fortalece. Não deixe de colocar suas intenções nas mãos de Maria.
          </p>
          <Link
            href="/pedidos-oracao"
            className="inline-block bg-purple-700 text-white px-10 py-5 rounded-full font-bold shadow-lg hover:shadow-purple-500/30 hover:bg-purple-800 transition-all transform hover:-translate-y-1"
          >
            Deixe seu Pedido de Oração
          </Link>
        </div>
      </section>
    </div>
  );
}
