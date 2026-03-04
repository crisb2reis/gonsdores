import { Calendar, Clock, MapPin, Users, Instagram, ListChecks } from "lucide-react";

export default function AtividadesSemanais() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-purple-900 py-20 text-center px-4">
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Oração Semanal</h1>
                <p className="text-purple-100 text-lg max-w-2xl mx-auto">
                    Participe dos nossos encontros e fortaleça sua fé. Temos atividades presenciais e online.
                </p>
            </section>

            <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-10 relative z-10 space-y-8">
                {/* Presencial Section */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-6">
                        <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                            <Calendar className="h-8 w-8 text-purple-700" />
                        </div>
                        <div>
                            <h2 className="font-serif text-2xl font-bold text-gray-900">Encontro Presencial</h2>
                            <p className="text-gray-500">Venha rezar conosco na paróquia</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <div className="flex items-start gap-4">
                            <Clock className="w-6 h-6 text-purple-600 mt-1" />
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Dia e Horário</p>
                                <p className="font-semibold text-gray-900">Terça-feira, 20h00</p>
                                <p className="text-sm text-gray-500">Logo após a Missa das 19h</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <MapPin className="w-6 h-6 text-purple-600 mt-1" />
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Local</p>
                                <p className="font-semibold text-gray-900">Igreja São Peregrino</p>
                                <a href="https://www.google.com/maps/search/Av.+São+João,+2600+-+Jardim+das+Colinas,+São+José+dos+Campos" target="_blank" rel="noopener noreferrer" className="text-sm text-purple-600 hover:text-purple-800 underline">Ver no mapa</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Users className="w-6 h-6 text-purple-600 mt-1" />
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Grupo</p>
                                <p className="font-semibold text-gray-900">Comunidade Geral</p>
                                <p className="text-sm text-gray-500">Aberto ao público</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <ListChecks className="w-6 h-6 text-purple-600 mt-1" />
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Atividade</p>
                                <p className="font-semibold text-gray-900">Santo Terço e Louvor</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            Estrutura da Oração
                        </h3>
                        <div className="space-y-4">
                            {[
                                "Acolhida com cânticos e louvores preparatórios.",
                                "Leitura de um trecho da Palavra de Deus.",
                                "Recitação dos mistérios do Santo Terço.",
                                "Momento de partilha e reflexão comunitária.",
                                "Oração final e bênção de encerramento."
                            ].map((step, index) => (
                                <div key={index} className="flex flex-row items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold text-sm shrink-0">
                                        {index + 1}
                                    </div>
                                    <p className="text-gray-700">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Online Section */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center">
                            <Instagram className="h-8 w-8 text-pink-600" />
                        </div>
                        <div>
                            <h2 className="font-serif text-2xl font-bold text-gray-900">Santo Terço Online</h2>
                            <p className="text-gray-500">Transmissão ao vivo pelo Instagram</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                        <div className="flex items-start gap-4">
                            <Clock className="w-6 h-6 text-pink-600 mt-1" />
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Dia e Horário</p>
                                <p className="font-semibold text-gray-900">Segunda-feira, 20h30</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Instagram className="w-6 h-6 text-pink-600 mt-1" />
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Canal</p>
                                <a href="https://www.instagram.com/gonsdores" target="_blank" rel="noopener noreferrer" className="font-semibold text-pink-600 hover:text-pink-700 underline">@gonsdores</a>
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-600">
                        Inicie a sua semana com a intercessão de Nossa Senhora. Junte-se à nossa live e envie suas intenções nos comentários.
                    </p>
                </div>
            </section>
        </div>
    );
}
