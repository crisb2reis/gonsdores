"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Camera, Plus, Trash2, Calendar, Link as LinkIcon, Image as ImageIcon, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Photo {
    id: string;
    created_at: string;
    url: string;
    caption: string;
    event_date: string;
}

export default function AdminGaleria() {
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [isAdding, setIsAdding] = useState(false);

    // New Photo Form
    const [url, setUrl] = useState("");
    const [caption, setCaption] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("gallery_photos")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Erro ao buscar fotos:", error);
        } else {
            setPhotos(data || []);
        }
        setLoading(false);
    };

    const handleAddPhoto = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url || !caption || !eventDate) {
            alert("Preencha todos os campos.");
            return;
        }

        setSubmitting(true);
        const { error } = await supabase
            .from("gallery_photos")
            .insert([{ url, caption, event_date: eventDate }]);

        if (error) {
            console.error("Erro detalhado do Supabase:", error);
            alert(`Erro ao adicionar foto: ${error.message}${error.code ? ` (código: ${error.code})` : ''}`);
        } else {
            setIsAdding(false);
            setUrl("");
            setCaption("");
            setEventDate("");
            fetchPhotos();
        }
        setSubmitting(false);
    };

    const deletePhoto = async (id: string) => {
        if (!confirm("Tem certeza que deseja remover esta foto?")) return;
        const { error } = await supabase
            .from("gallery_photos")
            .delete()
            .eq("id", id);

        if (error) {
            alert("Erro ao excluir foto.");
        } else {
            setPhotos(prev => prev.filter(p => p.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">

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
                    </div>
                </div>

                {/* Add Form */}
                {isAdding && (
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-purple-100 mb-8 animate-slide-down">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Plus className="w-5 h-5 text-purple-600" />
                            Nova Foto
                        </h2>
                        <form onSubmit={handleAddPhoto} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Link da Imagem (URL)</label>
                                <div className="relative">
                                    <LinkIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                    <input
                                        type="url"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        placeholder="https://exemplo.com/foto.jpg"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                        required
                                    />
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1">Dica: Use links diretos de imagens hospedadas (Google Drive, Imgur, etc.)</p>
                            </div>
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
                ) : photos.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-200">
                        <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-gray-800">Nenhuma foto encontrada</h2>
                        <p className="text-gray-500 max-w-xs mx-auto mt-2">
                            Clique em "Adicionar Foto" para começar a preencher sua galeria.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {photos.map((p) => (
                            <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 group">
                                <div className="aspect-video relative bg-gray-100">
                                    <img src={p.url} alt={p.caption} className="w-full h-full object-cover" />
                                    <button
                                        onClick={() => deletePhoto(p.id)}
                                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="p-4">
                                    <p className="font-bold text-gray-900 truncate">{p.caption}</p>
                                    <div className="flex items-center gap-2 text-gray-500 text-xs mt-1">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(p.event_date).toLocaleDateString("pt-BR")}
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
