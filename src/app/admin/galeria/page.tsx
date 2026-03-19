"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Camera, Plus, Trash2, Calendar, Link as LinkIcon, Image as ImageIcon, Loader2, AlertCircle, Play } from "lucide-react";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

interface MediaItem {
    id: string;
    created_at: string;
    url: string;
    caption: string;
    event_date: string;
    media_type: 'image' | 'video';
    category?: string; // 'evento' ou 'atividade'
    thumbnail_url?: string;
}

export default function AdminGaleria() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<MediaItem[]>([]);
    const [isAdding, setIsAdding] = useState(false);

    // New Media Form
    const [url, setUrl] = useState("");
    const [caption, setCaption] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
    const [category, setCategory] = useState("atividade");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const fetchMedia = async (showLoading = true) => {
        if (showLoading) setLoading(true);
        const { data, error } = await supabase
            .from("gallery_photos")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Erro ao buscar mídia:", error);
        } else {
            // Normalize data to ensure media_type exists
            const normalizedData = (data || []).map((item: MediaItem) => ({
                ...item,
                media_type: item.media_type || 'image',
                category: item.category || 'atividade'
            }));
            setItems(normalizedData);
        }
        setLoading(false);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchMedia(false);
    }, []);

    const handleAddMedia = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url || !caption || !eventDate) {
            alert("Preencha todos os campos.");
            return;
        }

        setSubmitting(true);
        const { error } = await supabase
            .from("gallery_photos")
            .insert([{
                url,
                caption,
                event_date: eventDate,
                media_type: mediaType,
                category: category,
                thumbnail_url: mediaType === 'video' ? thumbnailUrl : null
            }]);

        if (error) {
            console.error("Erro detalhado do Supabase:", error);
            alert(`Erro ao adicionar: ${error.message}${error.code ? ` (código: ${error.code})` : ''}`);
        } else {
            setIsAdding(false);
            setUrl("");
            setCaption("");
            setEventDate("");
            setMediaType('image');
            setCategory('atividade');
            setThumbnailUrl("");
            fetchMedia(true);
        }
        setSubmitting(false);
    };

    const deleteMedia = async (id: string) => {
        if (!confirm("Tem certeza que deseja remover este item?")) return;
        const { error } = await supabase
            .from("gallery_photos")
            .delete()
            .eq("id", id);

        if (error) {
            alert("Erro ao excluir item.");
        } else {
            setItems(prev => prev.filter(p => p.id !== id));
        }
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

    return (
        <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">

                {!isSupabaseConfigured && (
                    <div className="mb-6 bg-red-50 border-2 border-red-200 p-4 rounded-2xl flex items-center gap-3 text-red-700">
                        <AlertCircle className="w-6 h-6 shrink-0" />
                        <div>
                            <p className="font-bold">Atenção: Banco de dados não configurado!</p>
                            <p className="text-sm text-red-600">O GitHub Pages ainda não recebeu suas chaves do Supabase. Verifique os &quot;Secrets&quot; no GitHub e aguarde o novo deploy terminar.</p>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-700 rounded-2xl text-white">
                            <Camera className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Gerenciar Galeria</h1>
                            <p className="text-gray-600">Adicione ou remova fotos de eventos</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href="/admin/testemunhos"
                            className="text-sm font-semibold text-gray-600 hover:text-purple-700 bg-white border border-gray-200 px-4 py-2 rounded-xl transition-colors"
                        >
                            &larr; Admin
                        </Link>
                        <button
                            onClick={() => setIsAdding(!isAdding)}
                            className="flex items-center gap-2 bg-purple-700 text-white px-5 py-2 rounded-xl font-bold hover:bg-purple-800 transition-all shadow-md"
                        >
                            {isAdding ? "Cancelar" : <><Plus className="w-4 h-4" /> Adicionar Foto</>}
                        </button>
                        <LogoutButton />
                    </div>
                </div>

                {/* Add Form */}
                {isAdding && (
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-purple-100 mb-8 animate-slide-down">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Plus className="w-5 h-5 text-purple-600" />
                            Nova Mídia
                        </h2>
                        <form onSubmit={handleAddMedia} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2 flex items-center gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-2">
                                <span className="text-sm font-semibold text-gray-700">Tipo de Mídia:</span>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="mediaType"
                                            value="image"
                                            checked={mediaType === 'image'}
                                            onChange={() => setMediaType('image')}
                                            className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                                        />
                                        <span className={`text-sm ${mediaType === 'image' ? 'text-purple-700 font-bold' : 'text-gray-600'}`}>Foto</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="mediaType"
                                            value="video"
                                            checked={mediaType === 'video'}
                                            onChange={() => setMediaType('video')}
                                            className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                                        />
                                        <span className={`text-sm ${mediaType === 'video' ? 'text-purple-700 font-bold' : 'text-gray-600'}`}>Vídeo</span>
                                    </label>
                                </div>
                            </div>

                            <div className="md:col-span-2 flex items-center gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-2">
                                <span className="text-sm font-semibold text-gray-700">Categoria:</span>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="category"
                                            value="atividade"
                                            checked={category === 'atividade'}
                                            onChange={() => setCategory('atividade')}
                                            className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                                        />
                                        <span className={`text-sm ${category === 'atividade' ? 'text-purple-700 font-bold' : 'text-gray-600'}`}>Atividade do Grupo</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="category"
                                            value="evento"
                                            checked={category === 'evento'}
                                            onChange={() => setCategory('evento')}
                                            className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                                        />
                                        <span className={`text-sm ${category === 'evento' ? 'text-purple-700 font-bold' : 'text-gray-600'}`}>Evento Especial</span>
                                    </label>
                                </div>
                            </div>



                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-semibold text-gray-700">
                                    {mediaType === 'image' ? 'Link da Imagem (URL)' : 'Link do Vídeo (URL)'}
                                </label>
                                <div className="relative">
                                    <LinkIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                    <input
                                        type="url"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        placeholder={mediaType === 'image' ? "https://exemplo.com/foto.jpg" : "https://youtube.com/watch?v=..."}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                        required
                                    />
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1">
                                    {mediaType === 'image'
                                        ? "Dica: Use links diretos de imagens hospedadas (Google Drive, Imgur, etc.)"
                                        : "Dica: Suporta links do YouTube, Shorts ou arquivos .mp4 diretos."}
                                </p>
                            </div>

                            {mediaType === 'video' && (
                                <div className="md:col-span-2 space-y-2 animate-fade-in">
                                    <label className="text-sm font-semibold text-gray-700">Capa do Vídeo (Thumbnail URL) - Opcional</label>
                                    <div className="relative">
                                        <ImageIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                        <input
                                            type="url"
                                            value={thumbnailUrl}
                                            onChange={(e) => setThumbnailUrl(e.target.value)}
                                            placeholder="https://exemplo.com/capa.jpg"
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                        />
                                    </div>
                                </div>
                            )}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Legenda / Evento</label>
                                <input
                                    type="text"
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    placeholder="Ex: Retiro Espiritual 2024"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Data do Evento</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                    <input
                                        type="date"
                                        value={eventDate}
                                        onChange={(e) => setEventDate(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2 pt-2">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-4 bg-purple-700 text-white rounded-xl font-bold hover:bg-purple-800 disabled:bg-purple-300 transition-all flex items-center justify-center gap-2"
                                >
                                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Publicar na Galeria"}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Content */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="w-12 h-12 border-4 border-purple-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-500 font-medium">Carregando fotos...</p>
                    </div>
                ) : items.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-200">
                        <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-gray-800">Nenhuma mídia encontrada</h2>
                        <p className="text-gray-500 max-w-xs mx-auto mt-2">
                            Clique em &quot;Adicionar&quot; para começar a preencher sua galeria.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 group">
                                <div className="aspect-video relative bg-gray-100">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={getThumbnail(item)}
                                        alt={item.caption}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            // Fallback for broken images
                                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop";
                                        }}
                                    />

                                    {item.media_type === 'video' && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="bg-purple-700/80 text-white p-3 rounded-full shadow-xl">
                                                <Play className="w-5 h-5 fill-current" />
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => deleteMedia(item.id)}
                                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                        <p className="font-bold text-gray-900 truncate">{item.caption}</p>
                                        <div className="flex gap-1">
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${item.media_type === 'video' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                                                {item.media_type}
                                            </span>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${item.category === 'evento' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(item.event_date).toLocaleDateString("pt-BR")}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes slideDown {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-down {
            animation: slideDown 0.3s ease-out forwards;
        }
      `}} />
        </div>
    );
}
