"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Camera, Calendar, Maximize2, X, Play, Sparkles, Users, Filter, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { getAssetPath } from "@/lib/utils";

interface MediaItem {
    id: string;
    url: string[];
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
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
            const normalizedData = (data || []).map((item: any) => ({
                ...item,
                media_type: item.media_type || 'image',
                category: item.category || 'atividade',
                url: Array.isArray(item.url) ? item.url : [item.url]
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
        const firstUrl = Array.isArray(item.url) ? item.url[0] : item.url;
        if (item.media_type === 'image') return firstUrl;
        if (item.thumbnail_url) return item.thumbnail_url;

        const videoId = getYouTubeId(firstUrl);
        if (videoId) {
            return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
        }

        return firstUrl; // Fallback
    };

    const nextImage = () => {
        if (!selectedItem) return;
        setCurrentImageIndex((prev) => (prev + 1) % selectedItem.url.length);
    };

    const prevImage = () => {
        if (!selectedItem) return;
        setCurrentImageIndex((prev) => (prev - 1 + selectedItem.url.length) % selectedItem.url.length);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedItem) return;
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "Escape") setSelectedItem(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedItem]);
    
    const filteredItems = activeFilter === "todos" 
        ? items 
        : items.filter(item => item.category === activeFilter);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Header / Hero */}
            <section className="relative py-32 text-center px-4 overflow-hidden min-h-[400px] flex items-center justify-center">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src={getAssetPath("/galeria-bg.png")}
                        alt="Background Galeria"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-purple-900/60 backdrop-blur-[1px]"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-transparent to-background"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                    <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl animate-fade-in">
                        Galeria de Fotos
                    </h1>
                    <p className="text-purple-100 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
                        Momentos de fé, união e celebração em nossa comunidade.
                    </p>
                </div>
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
                                onClick={() => {
                                    setSelectedItem(item);
                                    setCurrentImageIndex(0);
                                }}
                            >
                                <img
                                    src={getThumbnail(item) as string}
                                    alt={item.caption}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => {
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

                                {item.url.length > 1 && (
                                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1.5 z-20 shadow-lg">
                                        <Images className="w-3 h-3" />
                                        +{item.url.length - 1} fotos
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
                        className="absolute top-6 right-6 text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all z-[70]"
                        onClick={() => setSelectedItem(null)}
                    >
                        <X className="w-8 h-8" />
                    </button>

                    {/* Navigation Buttons */}
                    {selectedItem.url.length > 1 && (
                        <>
                            <button
                                className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 hover:bg-white/10 rounded-full transition-all z-[70]"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    prevImage();
                                }}
                            >
                                <ChevronLeft className="w-10 h-10" />
                            </button>
                            <button
                                className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 hover:bg-white/10 rounded-full transition-all z-[70]"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    nextImage();
                                }}
                            >
                                <ChevronRight className="w-10 h-10" />
                            </button>
                        </>
                    )}

                    <div
                        className="relative w-full max-w-5xl max-h-full flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {selectedItem.media_type === 'video' ? (
                            <div className="w-full aspect-video rounded-lg overflow-hidden shadow-2xl bg-black">
                                {selectedItem.url[0].includes('youtube.com') || selectedItem.url[0].includes('youtu.be') ? (
                                    <iframe
                                        src={`https://www.youtube.com/embed/${getYouTubeId(selectedItem.url[0])}`}
                                        className="w-full h-full"
                                        title={selectedItem.caption}
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <video
                                        src={selectedItem.url[0]}
                                        controls
                                        className="w-full h-full"
                                        autoPlay
                                    >
                                        Seu navegador não suporta a tag de vídeo.
                                    </video>
                                )}
                            </div>
                        ) : (
                            <div className="relative group/modal flex flex-col items-center">
                                <img
                                    src={selectedItem.url[currentImageIndex]}
                                    alt={selectedItem.caption}
                                    className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl transition-all duration-300"
                                />
                                {selectedItem.url.length > 1 && (
                                    <div className="absolute bottom-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white/80 text-xs font-bold">
                                        {currentImageIndex + 1} de {selectedItem.url.length}
                                    </div>
                                )}
                            </div>
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
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.8s ease-out forwards;
                }
            `}} />
        </div>
    );
}
