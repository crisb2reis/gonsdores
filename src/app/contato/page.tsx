import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";

export default function Contato() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <section className="bg-purple-900 py-20 text-center px-4">
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Contato</h1>
                <p className="text-purple-100 text-lg max-w-2xl mx-auto">
                    Estamos aqui para ouvir e acolher. Fale com a coordenação do Grupo de Oração para dúvidas, sugestões ou informações.
                </p>
            </section>

            <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-10 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Contact Info Cards */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex justify-center items-center shrink-0">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-1">Telefone da Paróquia</h3>
                            <p className="text-gray-600">(12) 3456-7890</p>
                            <p className="text-sm text-gray-400 mt-1">Secretaria: Seg-Sex, 08h-18h</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex justify-center items-center shrink-0">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-1">WhatsApp (Coordenação)</h3>
                            <p className="text-gray-600">(12) 98765-4321</p>
                            <a href="#" className="inline-block mt-2 text-sm text-purple-600 font-semibold hover:text-purple-800 transition-colors">Enviar mensagem</a>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex justify-center items-center shrink-0">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-1">E-mail</h3>
                            <p className="text-gray-600">contato@grupodeoracao.com.br</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex justify-center items-center shrink-0">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-1">Endereço (Encontros)</h3>
                            <p className="text-gray-600">Paróquia São Peregrino<br />Rua Exemplo, 123 - Centro<br />São José dos Campos - SP</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                    <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Envie uma Mensagem</h2>
                    <form className="space-y-4">
                        <div className="space-y-1 text-sm font-semibold text-gray-700">
                            <label>Nome Completo</label>
                            <input type="text" className="w-full px-4 py-3 bg-background-soft border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Seu nome" />
                        </div>
                        <div className="space-y-1 text-sm font-semibold text-gray-700">
                            <label>E-mail</label>
                            <input type="email" className="w-full px-4 py-3 bg-background-soft border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="seu@email.com" />
                        </div>
                        <div className="space-y-1 text-sm font-semibold text-gray-700">
                            <label>Mensagem</label>
                            <textarea rows={5} className="w-full px-4 py-3 flex-grow bg-background-soft border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" placeholder="Escreva sua dúvida, sugestão ou comentário..."></textarea>
                        </div>
                        <div className="pt-2">
                            <button type="button" className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-4 rounded-xl shadow-md transition-all">Enviar Mensagem</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
