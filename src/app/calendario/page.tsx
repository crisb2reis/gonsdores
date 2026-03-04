import { ArrowRight, Clock, MapPin, User, ChevronRight } from "lucide-react";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";

// Dummy data for calendar
const events = [
    {
        id: 1,
        day: "15",
        month: "MAR",
        title: "Oração Semanal",
        category: "Terço",
        time: "19h30 - 21h00",
        place: "Igreja São Peregrino",
        leader: "Equipe Dirigente",
    },
    {
        id: 2,
        day: "22",
        month: "MAR",
        title: "Missa de Cura e Libertação",
        category: "Missa",
        time: "19h30 - 21h30",
        place: "Igreja Matriz",
        leader: "Pe. João",
    },
    {
        id: 3,
        day: "05",
        month: "ABR",
        title: "Seminário de Vida no Espírito S.",
        category: "Seminário",
        time: "08h00 - 17h00",
        place: "Salão Paroquial",
        leader: "Pregador Convidado",
    }
];

const preachers = [
    { name: "Pe. Marcos", role: "Pároco", img: getAssetPath("/preacher-1.png") },
    { name: "Diácono Silva", role: "Diácono", img: getAssetPath("/preacher-2.png") },
    { name: "Ana & Carlos", role: "Coordenadores", img: getAssetPath("/preacher-3.png") },
];

export default function Calendario() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <section className="bg-purple-900 py-20 text-center px-4 relative">
                <div className="absolute inset-0 bg-black/20 z-0"></div>
                <div className="relative z-10">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Calendário de Atividades</h1>
                    <p className="text-purple-100 text-lg max-w-2xl mx-auto">
                        Programe-se para os nossos próximos encontros e eventos especiais da comunidade.
                    </p>
                </div>
            </section>

            <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-10 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Events List */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">Próximos Eventos</h2>

                    <div className="space-y-4">
                        {events.map((event) => (
                            <div key={event.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start sm:items-center gap-6 group">

                                {/* Date Block */}
                                <div className="flex flex-col items-center justify-center bg-purple-100 w-20 h-24 rounded-xl shrink-0 group-hover:bg-purple-600 transition-colors duration-300">
                                    <span className="text-2xl font-bold text-purple-900 group-hover:text-white leading-none mb-1">{event.day}</span>
                                    <span className="text-sm font-semibold text-purple-700 group-hover:text-purple-100">{event.month}</span>
                                </div>

                                {/* Event Info */}
                                <div className="flex-grow space-y-3 w-full">
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-full uppercase tracking-wide">
                                            {event.category}
                                        </span>
                                        <h3 className="font-serif text-xl font-bold text-gray-900">{event.title}</h3>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-purple-400" />
                                            <span>{event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-purple-400" />
                                            <span>{event.place}</span>
                                        </div>
                                        <div className="flex items-center gap-2 sm:col-span-2">
                                            <User className="w-4 h-4 text-purple-400" />
                                            <span>Pregador / Condução: <strong>{event.leader}</strong></span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action arrow */}
                                <button className="hidden sm:flex shrink-0 w-12 h-12 rounded-full border border-gray-200 items-center justify-center text-gray-400 group-hover:bg-purple-50 group-hover:text-purple-600 group-hover:border-purple-200 transition-all">
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar: Featured Preachers */}
                <div className="lg:col-span-1 space-y-6">
                    <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">Próximos Pregadores</h2>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                        {preachers.map((preacher, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-purple-100">
                                    <Image
                                        src={preacher.img}
                                        alt={preacher.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{preacher.name}</h4>
                                    <p className="text-sm text-purple-600 font-medium">{preacher.role}</p>
                                </div>
                            </div>
                        ))}
                        <hr className="border-gray-100" />
                        <button className="w-full py-3 text-center text-sm font-semibold text-gray-600 hover:text-purple-700 transition-colors flex items-center justify-center gap-2">
                            Ver lista completa <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

            </section>
        </div>
    );
}
