"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { HeartHandshake, Clock, User, Mail, Eye, EyeOff, Trash2 } from "lucide-react";

interface PrayerRequest {
    id: string;
    created_at: string;
    nome: string | null;
    email: string | null;
    pedido: string;
    visibilidade: string;
    status: string;
}

const visibilityLabels: Record<string, { label: string; color: string }> = {
    "private": { label: "Privado", color: "bg-gray-100 text-gray-600" },
    "public-anon": { label: "Público Anônimo", color: "bg-blue-100 text-blue-700" },
    "public-named": { label: "Público c/ Nome", color: "bg-purple-100 text-purple-700" },
};

export default function AdminPedidos() {
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState<PrayerRequest[]>([]);
    const [filter, setFilter] = useState<"all" | "pending" | "prayed">("all");

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("prayer_requests")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Erro ao buscar pedidos:", error);
        } else {
            setRequests(data || []);
        }
        setLoading(false);
    };

    const updateStatus = async (id: string, newStatus: string) => {
        const { error } = await supabase
            .from("prayer_requests")
            .update({ status: newStatus })
            .eq("id", id);

        if (error) {
            alert("Erro ao atualizar status.");
        } else {
            setRequests(prev =>
                prev.map(r => r.id === id ? { ...r, status: newStatus } : r)
            );
        }
    };

    const deleteRequest = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir este pedido?")) return;
        const { error } = await supabase
            .from("prayer_requests")
            .delete()
            .eq("id", id);

        if (error) {
            alert("Erro ao excluir pedido.");
        } else {
            setRequests(prev => prev.filter(r => r.id !== id));
        }
    };

    const filtered = requests.filter(r => filter === "all" ? true : r.status === filter);

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-700 rounded-2xl text-white">
                            <HeartHandshake className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Pedidos de Oração</h1>
                            <p className="text-gray-600">Gerencie os pedidos enviados pela comunidade</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href="/admin/testemunhos"
                            className="text-sm font-semibold text-purple-700 hover:text-purple-900 bg-white border border-purple-200 px-4 py-2 rounded-xl transition-colors"
                        >
                            Testemunhos &rarr;
                        </Link>
                        <Link
                            href="/admin/galeria"
                            className="text-sm font-semibold text-purple-700 hover:text-purple-900 bg-white border border-purple-200 px-4 py-2 rounded-xl transition-colors"
                        >
                            Galeria &rarr;
                        </Link>
                    </div>
                </div>

                {/* Stats + Filters */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    {(["all", "pending", "prayed"] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${filter === f
                                ? "bg-purple-700 text-white shadow"
                                : "bg-white text-gray-600 border border-gray-200 hover:border-purple-300"
                                }`}
                        >
                            {f === "all" ? `Todos (${requests.length})`
                                : f === "pending" ? `Pendentes (${requests.filter(r => r.status === "pending").length})`
                                    : `Orados (${requests.filter(r => r.status === "prayed").length})`}
                        </button>
                    ))}
                </div>

                {/* Content */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="w-12 h-12 border-4 border-purple-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-500 font-medium">Carregando pedidos...</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-200">
                        <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-gray-800">Nenhum pedido encontrado</h2>
                        <p className="text-gray-500 max-w-xs mx-auto mt-2">
                            Novos pedidos aparecerão aqui assim que forem enviados pela comunidade.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-5">
                        {filtered.map((r) => {
                            const vis = visibilityLabels[r.visibilidade] || visibilityLabels["private"];
                            const isPrayed = r.status === "prayed";
                            return (
                                <div
                                    key={r.id}
                                    className={`bg-white rounded-2xl shadow-sm border overflow-hidden flex flex-col md:flex-row transition-all ${isPrayed ? "border-green-200 opacity-70" : "border-gray-200"
                                        }`}
                                >
                                    {/* Left status bar */}
                                    <div className={`w-full md:w-2 shrink-0 ${isPrayed ? "bg-green-400" : "bg-purple-500"}`} />

                                    {/* Content */}
                                    <div className="p-6 flex-grow space-y-3">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${vis.color}`}>
                                                    {vis.label}
                                                </span>
                                                {isPrayed && (
                                                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide bg-green-100 text-green-700">
                                                        ✓ Orado
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {new Date(r.created_at).toLocaleString("pt-BR")}
                                            </span>
                                        </div>

                                        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                                            "{r.pedido}"
                                        </p>

                                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 pt-1">
                                            {r.nome && (
                                                <span className="flex items-center gap-1.5">
                                                    <User className="w-4 h-4 text-purple-400" />
                                                    {r.nome}
                                                </span>
                                            )}
                                            {r.email && (
                                                <span className="flex items-center gap-1.5">
                                                    <Mail className="w-4 h-4 text-purple-400" />
                                                    {r.email}
                                                </span>
                                            )}
                                            {!r.nome && !r.email && (
                                                <span className="text-gray-400 italic text-xs">Enviado sem identificação</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="bg-gray-50 p-5 flex md:flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-gray-200 shrink-0">
                                        <button
                                            onClick={() => updateStatus(r.id, isPrayed ? "pending" : "prayed")}
                                            title={isPrayed ? "Marcar como pendente" : "Marcar como orado"}
                                            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-colors ${isPrayed
                                                ? "bg-gray-100 hover:bg-gray-200 text-gray-600"
                                                : "bg-green-600 hover:bg-green-700 text-white"
                                                }`}
                                        >
                                            {isPrayed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            {isPrayed ? "Desfazer" : "Orado 🙏"}
                                        </button>
                                        <button
                                            onClick={() => deleteRequest(r.id)}
                                            title="Excluir pedido"
                                            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
