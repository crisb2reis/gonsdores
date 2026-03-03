import Link from "next/link";
import { Menu, Heart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-full text-purple-800">
                <Heart className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg text-purple-900 leading-tight">Grupo de Oração</span>
                <span className="text-sm text-gray-500 font-sans leading-tight">Nossa Senhora das Dores</span>
              </div>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/" className="text-gray-700 hover:text-purple-800 font-medium transition-colors">Início</Link>
            <Link href="/nossa-senhora" className="text-gray-700 hover:text-purple-800 font-medium transition-colors text-sm lg:text-base">Nossa Senhora</Link>
            <Link href="/atividades-semanais" className="text-gray-700 hover:text-purple-800 font-medium transition-colors text-sm lg:text-base">Atividades</Link>
            <Link href="/calendario" className="text-gray-700 hover:text-purple-800 font-medium transition-colors text-sm lg:text-base">Calendário</Link>
            <Link href="/testemunhos" className="text-gray-700 hover:text-purple-800 font-medium transition-colors text-sm lg:text-base">Testemunhos</Link>
            <Link href="/pedidos-oracao" className="text-gray-700 hover:text-purple-800 font-medium transition-colors text-sm lg:text-base">Pedidos</Link>
          </div>
          <div className="flex items-center md:hidden">
            <button className="text-gray-600 hover:text-purple-800 focus:outline-none">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
