"use client";

import { useState } from "react";
import { X, Send, Heart, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

interface TestimonialModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function TestimonialModal({ isOpen, onClose }: TestimonialModalProps) {
    const [formData, setFormData] = useState({
        nome: "",
        testemunho: "",
        publicarComNome: "true"
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { error } = await supabase
                .from('testimonials')
                .insert([
                    {
                        nome: formData.nome,
                        testemunho: formData.testemunho,
                        publicar_com_nome: formData.publicarComNome === "true",
                        status: 'pending' // Default status for validation
                    }
                ]);

            if (error) throw error;

            setIsSuccess(true);
            // Reset form after success message
            setTimeout(() => {
                setIsSuccess(false);
                onClose();
                setFormData({ nome: "", testemunho: "", publicarComNome: "true" });
            }, 3000);
        } catch (err) {
            console.error("Erro ao enviar testemunho:", err);
            alert("Ocorreu um erro ao enviar seu testemunho. Verifique sua conexão ou tente novamente mais tarde.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden relative"
                    >
                        {/* Header */}
                        <div className="bg-purple-900 p-8 text-white relative">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <Heart className="w-10 h-10 text-purple-300 mb-4 fill-current" />
                            <h2 className="font-serif text-3xl font-bold">Compartilhe sua Graça</h2>
                            <p className="text-purple-100 mt-2">Sua história pode inspirar e fortalecer a fé de muitos irmãos.</p>
                        </div>

                        <div className="p-8">
                            {!isSuccess ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700" htmlFor="nome">
                                            Seu Nome
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            id="nome"
                                            value={formData.nome}
                                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                            placeholder="Como você gostaria de ser chamado?"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700" htmlFor="testemunho">
                                            Seu Testemunho
                                        </label>
                                        <textarea
                                            required
                                            id="testemunho"
                                            rows={5}
                                            value={formData.testemunho}
                                            onChange={(e) => setFormData({ ...formData, testemunho: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                                            placeholder="Conte-nos como Deus agiu em sua vida..."
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold text-gray-700 block">
                                            Opções de Publicação
                                        </label>
                                        <div className="flex flex-col gap-3">
                                            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                                                <input
                                                    type="radio"
                                                    name="publicarComNome"
                                                    value="true"
                                                    checked={formData.publicarComNome === "true"}
                                                    onChange={(e) => setFormData({ ...formData, publicarComNome: e.target.value })}
                                                    className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                                                />
                                                <span className="text-sm text-gray-600">Publicar com meu nome</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                                                <input
                                                    type="radio"
                                                    name="publicarComNome"
                                                    value="false"
                                                    checked={formData.publicarComNome === "false"}
                                                    onChange={(e) => setFormData({ ...formData, publicarComNome: e.target.value })}
                                                    className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                                                />
                                                <span className="text-sm text-gray-600">Publicar como anônimo</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                                        <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                        <p className="text-xs text-amber-800 leading-tight">
                                            <strong>Nota:</strong> Para garantir a segurança e o respeito de todos, seu testemunho será validado por um administrador antes de ser publicado no site.
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 bg-purple-700 hover:bg-purple-800 disabled:bg-purple-400 text-white rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Enviar Testemunho
                                            </>
                                        )}
                                    </button>
                                </form>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-12 text-center"
                                >
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Send className="w-10 h-10 text-green-600" />
                                    </div>
                                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">Enviado com Sucesso!</h3>
                                    <p className="text-gray-600 max-w-xs mx-auto">
                                        Obrigado por compartilhar! Seu testemunho foi enviado para nossa equipe e será publicado em breve após a validação.
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
