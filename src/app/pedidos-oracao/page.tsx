"use client";

import { useState } from "react";
import { HeartHandshake, CheckCircle2 } from "lucide-react";

export default function PedidosOracao() {
    const [requestText, setRequestText] = useState("");

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-purple-900 py-20 text-center px-4 relative flex flex-col items-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                    <HeartHandshake className="h-10 w-10 text-purple-700" />
                </div>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Pedidos de Oração</h1>
                <p className="text-purple-100 text-lg max-w-2xl mx-auto">
                    "Pedi, e dar-se-vos-á; buscai, e encontrareis." Deixe sua intenção para que possamos rezar por você.
                </p>
            </section>

            <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 w-full -mt-10 relative z-10 space-y-16">
                {/* Form Section */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700" htmlFor="nome">Nome completo (Opcional)</label>
                                <input
                                    type="text"
                                    id="nome"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    placeholder="Seu nome"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700" htmlFor="email">E-mail (Opcional)</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    placeholder="seu@email.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 relative">
                            <label className="text-sm font-semibold text-gray-700" htmlFor="pedido">Seu Pedido de Oração *</label>
                            <textarea
                                id="pedido"
                                rows={5}
                                maxLength={500}
                                required
                                value={requestText}
                                onChange={(e) => setRequestText(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                                placeholder="Descreva sua intenção..."
                            />
                            <span className="absolute bottom-3 right-4 text-xs text-gray-400 font-medium">
                                {requestText.length}/500
                            </span>
                        </div>

                        <div className="space-y-3 pt-2 pb-4">
                            <label className="text-sm font-semibold text-gray-700">Visibilidade do Pedido</label>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="radio" name="visibility" value="private" className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300" defaultChecked />
                                    <span className="text-sm text-gray-600">Privado (Apenas equipe)</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="radio" name="visibility" value="public-anon" className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300" />
                                    <span className="text-sm text-gray-600">Público e Anônimo</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="radio" name="visibility" value="public-named" className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300" />
                                    <span className="text-sm text-gray-600">Público com Nome</span>
                                </label>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="w-full py-4 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
                        >
                            Enviar Pedido de Oração
                        </button>
                    </form>
                </div>

                {/* Community Feed / Intentions */}
                <div className="space-y-6">
                    <h2 className="font-serif text-3xl font-bold text-gray-900 border-b border-gray-200 pb-2">Pedidos da Comunidade</h2>
                    <div className="flex overflow-x-auto pb-6 gap-6 snap-x hide-scroll">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="min-w-[300px] sm:min-w-[350px] bg-white p-6 rounded-2xl shadow-sm border border-gray-100 shrink-0 snap-start">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <HeartHandshake className="w-5 h-5 text-purple-500" />
                                        <span className="font-semibold text-gray-900 text-sm">{item % 2 === 0 ? "Anônimo" : "Maria José"}</span>
                                    </div>
                                    <span className="text-xs text-gray-400 font-medium">Há 2 horas</span>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    "Peço oração pela restauração da saúde do meu marido que se encontra internado, e por forças para toda a nossa família neste momento difícil."
                                </p>
                                <button className="mt-4 text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors">
                                    Rezar por esta intenção
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonials / Agradecemos Por */}
                <div className="space-y-6">
                    <h2 className="font-serif text-3xl font-bold text-gray-900 border-b border-gray-200 pb-2">Agradecemos Por</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            "Graça alcançada em cirurgia de alto risco.",
                            "Reconciliação familiar e paz no lar.",
                            "Porta de emprego aberta após 2 anos.",
                            "Cura de depressão profunda e volta aos sacramentos."
                        ].map((text, idx) => (
                            <div key={idx} className="bg-purple-50 p-6 rounded-2xl border border-purple-100 flex items-start gap-4">
                                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                <p className="text-purple-900 font-medium">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </section>

            {/* Embedded styles for hiding scrollbar visually but keeping function */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .hide-scroll::-webkit-scrollbar {
          display: none;
        }
        .hide-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
        </div>
    );
}
