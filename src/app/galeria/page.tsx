"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Camera, Calendar, Maximize2, X, Play, Shield, Sparkles, Users, Filter } from "lucide-react";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";

interface MediaItem {
    id: string;
    url: string;
    caption: string;
    event_date: string;
    media_type: 'image' | 'video';
    category: 'evento' | 'atividade';
    thumbnail_url?: string;
}

export default function Galeria() {
    const [items, setItems] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
    const [activeFilter, setActiveFilter] = useState<string>("todos");

    useEffect(() => {
        fetchMedia();
    }, []);

    const fetchMedia = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("gallery_photos")
            .select("*")
            .order("event_date", { ascending: false });

        if (error) {
            console.error("Erro ao buscar mídia:", error);
        } else {
            // Se media_type ou category forem nulos, assumimos valores padrão
            const normalizedData = (data || []).map(item => ({
                ...item,
                media_type: item.media_type || 'image',
                category: item.category || 'atividade'
            }));
            setItems(normalizedData);
        }
        setLoading(false);
    };

    const getYouTubeId = (url: string) => {
        if (!url) return "";
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\/shorts\/|\/live\/)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : "";
    };

    const getThumbnail = (item: MediaItem) => {
        if (item.media_type === 'image') return item.url;
        if (item.thumbnail_url) return item.thumbnail_url;

        const videoId = getYouTubeId(item.url);
        if (videoId) {
            return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
        }

        return item.url; // Fallback
    };
    
    const filteredItems = activeFilter === "todos" 
        ? items 
        : items.filter(item => item.category === activeFilter);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Header / Hero */}
            <section className="bg-purple-900 py-20 text-center px-4">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Camera className="h-10 w-10 text-purple-700" />
                </div>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Galeria de Fotos</h1>
                <p className="text-purple-100 text-lg max-w-2xl mx-auto">
                    Momentos de fé, união e celebração em nossa comunidade.
                </p>
            </section>

            {/* Filter Tabs */}
            <div className="bg-white sticky top-0 z-40 border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center space-x-2 md:space-x-8 py-4 overflow-x-auto no-scrollbar">
                        <button
                            onClick={() => setActiveFilter("todos")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${activeFilter === "todos"
                                    ? "bg-purple-700 text-white shadow-md shadow-purple-200"
                                    : "text-gray-500 hover:bg-gray-100"
                                }`}
                        >
                            <Filter className="w-4 h-4" />
                            Todos
                        </button>
                        <button
                            onClick={() => setActiveFilter("evento")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${activeFilter === "evento"
                                    ? "bg-amber-600 text-white shadow-md shadow-amber-200"
                                    : "text-gray-500 hover:bg-gray-100"
                                }`}
                        >
                            <Sparkles className="w-4 h-4" />
                            Eventos
                        </button>
                        <button
                            onClick={() => setActiveFilter("atividade")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${activeFilter === "atividade"
                                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-200"
                                    : "text-gray-500 hover:bg-gray-100"
                                }`}
                        >
                            <Users className="w-4 h-4" />
                            Atividades
                        </button>
                    </div>
                </div>
            </div>

            {/* Gallery Grid */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-purple-700 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-500 font-medium">Carregando memórias...</p>
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                        <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-gray-800">Nenhuma mídia encontrada</h2>
                        <p className="text-gray-500 mt-2">Tente outro filtro ou volte mais tarde.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className="group relative aspect-square bg-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                                onClick={() => setSelectedItem(item)}
                            >
                                <img
                                    src={getThumbnail(item)}
                                    alt={item.caption}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => {
                                        // Fallback for broken images
                                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop";
                                    }}
                                />

                                {item.media_type === 'video' && (
                                    <div className="absolute inset-0 flex items-center justify-center z-10">
                                        <div className="bg-purple-600/90 text-white p-4 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <Play className="w-6 h-6 fill-current" />
                                        </div>
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        <div className="flex items-center gap-1.5 text-white/90 text-xs bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(item.event_date).toLocaleDateString("pt-BR")}
                                        </div>
                                        <div className={`flex items-center gap-1.5 text-white text-[10px] font-bold uppercase px-2 py-1 rounded-lg backdrop-blur-md ${item.category === 'evento' ? 'bg-amber-500/80 shadow-lg shadow-amber-900/20' : 'bg-emerald-500/80 shadow-lg shadow-emerald-900/20'}`}>
                                            {item.category === 'evento' ? <Sparkles className="w-2.5 h-2.5" /> : <Users className="w-2.5 h-2.5" />}
                                            {item.category}
                                        </div>
                                    </div>
                                    <p className="text-white font-semibold text-lg leading-tight mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.caption}</p>
                                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white transform scale-0 group-hover:scale-100 transition-transform duration-300">
                                        <Maximize2 className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Lightbox / Modal */}
            {selectedItem && (
                <div
                    className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 animate-fade-in"
                    onClick={() => setSelectedItem(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all"
                        onClick={() => setSelectedItem(null)}
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <div
                        className="relative w-full max-w-5xl max-h-full flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {selectedItem.media_type === 'video' ? (
                            <div className="w-full aspect-video rounded-lg overflow-hidden shadow-2xl bg-black">
                                {selectedItem.url.includes('youtube.com') || selectedItem.url.includes('youtu.be') ? (
                                    <iframe
                                        src={`https://www.youtube.com/embed/${getYouTubeId(selectedItem.url)}`}
                                        className="w-full h-full"
                                        title={selectedItem.caption}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <video
                                        src={selectedItem.url}
                                        controls
                                        className="w-full h-full"
                                        autoPlay
                                    >
                                        Seu navegador não suporta a tag de vídeo.
                                    </video>
                                )}
                            </div>
                        ) : (
                            <img
                                src={selectedItem.url}
                                alt={selectedItem.caption}
                                className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl"
                            />
                        )}
                        <div className="mt-6 text-center max-w-3xl">
                            <p className="text-white text-xl font-medium mb-2">{selectedItem.caption}</p>
                            <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
                                <Calendar className="w-4 h-4" />
                                {new Date(selectedItem.event_date).toLocaleDateString("pt-BR")}
                            </div>
                        </div>
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
