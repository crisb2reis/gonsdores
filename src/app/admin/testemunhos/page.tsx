"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Check, X, Shield, Clock, User } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";

interface Testimonial {
    id: string;
    created_at: string;
    nome: string;
    testemunho: string;
    publicar_com_nome: boolean;
    status: string;
}

export default function AdminTestemunhos() {
    const [loading, setLoading] = useState(true);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        fetchPendingTestimonials();
    }, []);

    const fetchPendingTestimonials = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .eq('status', 'pending')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Erro ao buscar testemunhos:", error);
        } else {
            setTestimonials(data || []);
        }
        setLoading(false);
    };

    const handleAction = async (id: string, newStatus: 'approved' | 'rejected') => {
        const { error } = await supabase
            .from('testimonials')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            alert("Erro ao atualizar status");
        } else {
            setTestimonials(testimonials.filter(t => t.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-700 rounded-2xl text-white">
                            <Shield className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Painel de Validação</h1>
                            <p className="text-gray-600">Gerencie os testemunhos enviados pela comunidade</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href="/admin/pedidos"
                            className="text-sm font-semibold text-purple-700 hover:text-purple-900 bg-white border border-purple-200 px-4 py-2 rounded-xl transition-colors"
                        >
                            Pedidos &rarr;
                        </Link>
                        <Link
                            href="/admin/galeria"
                            className="text-sm font-semibold text-purple-700 hover:text-purple-900 bg-white border border-purple-200 px-4 py-2 rounded-xl transition-colors"
                        >
                            Galeria &rarr;
                        </Link>
                        <LogoutButton />
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="w-12 h-12 border-4 border-purple-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-500 font-medium">Carregando testemunhos pendentes...</p>
                    </div>
                ) : testimonials.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-200">
                        <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-gray-800">Nada para validar no momento</h2>
                        <p className="text-gray-500 max-w-xs mx-auto mt-2">Novos testemunhos aparecerão aqui assim que forem enviados.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {testimonials.map((t) => (
                            <div key={t.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">
                                <div className="p-8 flex-grow">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <User className="w-5 h-5 text-purple-600" />
                                            <span className="font-bold text-gray-900">{t.nome}</span>
                                            {!t.publicar_com_nome && (
                                                <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Anônimo</span>
                                            )}
                                        </div>
                                        <span className="text-xs text-gray-400">
                                            {new Date(t.created_at).toLocaleDateString('pt-BR')}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed italic whitespace-pre-wrap break-words">
                                        "{t.testemunho}"
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-6 flex md:flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-gray-200">
                                    <button
                                        onClick={() => handleAction(t.id, 'approved')}
                                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                                    >
                                        <Check className="w-5 h-5" />
                                        Aprovar
                                    </button>
                                    <button
                                        onClick={() => handleAction(t.id, 'rejected')}
                                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-6 py-3 rounded-xl font-bold transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                        Recusar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
