"use client";

import { useState } from "react";
import { Clock, MapPin, User, X } from "lucide-react";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";

interface CalendarEvent {
    id: number;
    day: string;
    month: string;
    title: string;
    category?: string;
    time: string;
    place: string;
    leader: string;
}

const events: CalendarEvent[] = [
    {
        id: 1,
        day: "03",
        month: "MAR",
        title: "Famílias que oram justas permanecem unidas",
        // category: "Especial",
        time: "19h50 - 21h00",
        place: "Igreja São Peregrino",
        leader: "Denilson - GO NS Dores",
    },
    {
        id: 2,
        day: "10",
        month: "MAR",
        title: "O perdão como chave de cura dentro do lar",
        // category: "Formação",
        time: "19h50 - 21h00",
        place: "Igreja São Peregrino",
        leader: "Flaviano - Missão Coração em Chamas",
    },
    {
        id: 3,
        day: "17",
        month: "MAR",
        title: "O Espírito Santo renova a casa: reconstruindo famílias sobre a rocha",
        // category: "Louvor",
        time: "19h50 - 21h00",
        place: "Igreja São Peregrino",
        leader: "Cesar Flores - GO NS Dores",
    },
    {
        id: 4,
        day: "24",
        month: "MAR",
        title: "Cura das gerações: rompendo ciclos espirituais e emocionais",
        // category: "Louvor",
        time: "19h50 - 21h00",
        place: "Igreja São Peregrino",
        leader: "Sebastião - GO NS Dores",
    }
];

const preachers = [
    { name: "Denilson", role: "Pregador", img: getAssetPath("/denilson.jpeg") },
    { name: "Flaviano", role: "Pregador", img: getAssetPath("/flaviano.jpeg") },
    { name: "Cesar Flores", role: "Pregador", img: getAssetPath("/cesar_flores.jpeg") },
    { name: "Sebastião", role: "Pregador", img: getAssetPath("/sebastiao.jpeg") },
];

export default function Calendario() {
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <section className="relative py-32 text-center px-4 overflow-hidden min-h-[400px] flex items-center justify-center">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src={getAssetPath("/calendario-bg.png")}
                        alt="Background Calendário"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-purple-900/60 backdrop-blur-[1px]"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-transparent to-background"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl animate-fade-in">
                        Calendário de Atividades
                    </h1>
                    <p className="text-purple-100 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
                        Programe-se para os nossos próximos encontros e eventos especiais da comunidade.
                    </p>
                </div>
            </section>

            <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-20 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                                <div
                                    className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-purple-100 cursor-pointer hover:border-purple-400 transition-all group"
                                    onClick={() => setSelectedImg(preacher.img)}
                                >
                                    <Image
                                        src={preacher.img}
                                        alt={preacher.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{preacher.name}</h4>
                                    <p className="text-sm text-purple-600 font-medium">{preacher.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox / Modal */}
            {selectedImg && (
                <div
                    className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 animate-fade-in"
                    onClick={() => setSelectedImg(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all"
                        onClick={() => setSelectedImg(null)}
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <div
                        className="relative max-w-full max-h-full flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImg}
                            alt="Pregador"
                            className="max-h-[85vh] w-auto object-contain rounded-lg shadow-2xl"
                        />
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}} />
        </div>
    );
}
