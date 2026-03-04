import Link from "next/link";
import { Heart, Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Logo and Description */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-purple-100 rounded-full text-purple-800">
                                <Heart className="h-6 w-6" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-serif font-bold text-lg text-purple-900 leading-tight">Grupo de Oração</span>
                                <span className="text-sm text-gray-500 font-sans leading-tight">Nossa Senhora das Dores</span>
                            </div>
                        </Link>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                            Um grupo voltado à oração, esperança e paz. Juntos buscando a interseção de Nossa Senhora das Dores e a graça divina de Seu filho Jesus.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="p-2 border border-purple-200 rounded-full text-purple-800 hover:bg-purple-50 hover:border-purple-300 transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="p-2 border border-purple-200 rounded-full text-purple-800 hover:bg-purple-50 hover:border-purple-300 transition-colors">
                                <Facebook className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Links: Atividades */}
                    <div>
                        <h3 className="font-serif font-bold text-lg text-purple-900 mb-6">Atividades</h3>
                        <ul className="space-y-4">
                            <li><Link href="/atividades-semanais" className="text-gray-600 hover:text-purple-800 text-sm">Oração Semanal</Link></li>
                            <li><Link href="/calendario" className="text-gray-600 hover:text-purple-800 text-sm">Calendário de Eventos</Link></li>
                        </ul>
                    </div>

                    {/* Links: Comunidade */}
                    <div>
                        <h3 className="font-serif font-bold text-lg text-purple-900 mb-6">Comunidade</h3>
                        <ul className="space-y-4">
                            <li><Link href="/pedidos-oracao" className="text-gray-600 hover:text-purple-800 text-sm">Pedidos de Oração</Link></li>
                            <li><Link href="/testemunhos" className="text-gray-600 hover:text-purple-800 text-sm">Testemunhos</Link></li>
                            <li><Link href="/galeria" className="text-gray-600 hover:text-purple-800 text-sm">Galeria de Fotos</Link></li>
                            <li><Link href="/contato" className="text-gray-600 hover:text-purple-800 text-sm">Contato</Link></li>
                        </ul>
                    </div>

                    {/* Contatos */}
                    <div>
                        <h3 className="font-serif font-bold text-lg text-purple-900 mb-6">Contatos</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-600 text-sm">
                                <MapPin className="h-5 w-5 shrink-0 text-purple-600" />
                                <span>Paróquia São Peregrino<br />São José dos Campos - SP</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-600 text-sm">
                                <Phone className="h-5 w-5 shrink-0 text-purple-600" />
                                <span>(12) 3456-7890</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-600 text-sm">
                                <Mail className="h-5 w-5 shrink-0 text-purple-600" />
                                <span>contato@grupodeoracao.com.br</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
                    <p>© {new Date().getFullYear()} Grupo de Oração Nossa Senhora das Dores. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
