"use client";

import { useState, useEffect } from "react";
import { Quote, Star, User, Heart } from "lucide-react";
import TestimonialModal from "@/components/TestimonialModal";
import { supabase } from "@/lib/supabase";

interface Testimonial {
    id: string;
    nome: string;
    testemunho: string;
    publicar_com_nome: boolean;
    created_at: string;
    location?: string;
    stars?: number;
}

const hardcodedTestimonials = [
    {
        id: "h1",
        nome: "Maria Silva",
        location: "SJC",
        created_at: "2025-01-10",
        testemunho: "Passei por um momento de grande aflição com a saúde do meu filho. Através do Terço das Dores e das orações do grupo, senti uma paz profunda que não consigo explicar. Meu filho se recuperou e minha fé foi renovada.",
        stars: 5,
        publicar_com_nome: true
    },
    {
        id: "h2",
        nome: "João Santos",
        location: "SJC",
        created_at: "2024-12-15",
        testemunho: "Encontrei no Grupo de Oração um verdadeiro porto seguro. Estava enfrentando muitas dificuldades no trabalho e na família, mas o acolhimento da comunidade me ajudou a superar cada obstáculo com a graça de Deus.",
        stars: 5,
        publicar_com_nome: true
    },
    {
        id: "h3",
        nome: "Ana Paula",
        location: "SJC",
        created_at: "2024-11-22",
        testemunho: "Depois de muitos anos longe da Igreja, o convite de uma amiga para o grupo de oração mudou tudo. Senti o chamado de Deus de volta para casa e hoje não consigo imaginar minha vida sem a Eucaristia e a oração comunitária.",
        stars: 5,
        publicar_com_nome: true
    }
];

export default function Testemunhos() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [supabaseTestimonials, setSupabaseTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .eq('status', 'approved')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setSupabaseTestimonials(data);
        }
    };

    const allTestimonials = [...supabaseTestimonials, ...hardcodedTestimonials];

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Hero Section */}
            <section className="bg-purple-900 py-24 text-center px-4 relative">
                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">Testemunhos de Fé</h1>
                    <p className="text-purple-100 text-lg md:text-xl max-w-2xl mx-auto">
                        Histórias reais de transformação, milagres e o amor de Deus manifestado em nossa comunidade.
                    </p>
                </div>
            </section>

            {/* Testimonials Grid */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allTestimonials.map((t) => (
                        <div key={t.id} className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100 flex flex-col hover:shadow-xl transition-all h-full">
                            <div className="flex justify-between items-start mb-6">
                                <Quote className="w-10 h-10 text-purple-200" />
                                <div className="flex gap-0.5 text-purple-600">
                                    {[...Array(t.stars || 5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-current" />
                                    ))}
                                </div>
                            </div>

                            <p className="text-gray-600 italic leading-relaxed mb-8 flex-grow whitespace-pre-wrap break-words">
                                "{t.testemunho}"
                            </p>

                            <hr className="border-gray-100 mb-6" />

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-400">
                                    <User className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 leading-tight">
                                        {t.publicar_com_nome ? t.nome : "Anônimo"}
                                    </h4>
                                    <p className="text-xs text-gray-400 font-medium">
                                        {t.location || "SJC"} • {new Date(t.created_at).toLocaleDateString('pt-BR')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Share Section */}
            <section className="py-24 bg-background text-center">
                <div className="max-w-3xl mx-auto px-4 flex flex-col items-center">
                    <div className="w-20 h-20 bg-purple-900 rounded-full flex items-center justify-center mb-8 shadow-xl">
                        <Heart className="w-10 h-10 text-white fill-current" />
                    </div>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-purple-950 mb-6">Compartilhe Seu Testemunho</h2>
                    <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl">
                        Você também experimentou o amor de Deus em sua vida? Compartilhe sua história e inspire outras pessoas a crescerem na fé.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-purple-700 text-white px-10 py-5 rounded-full font-bold shadow-lg hover:shadow-purple-500/30 hover:bg-purple-800 transition-all transform hover:-translate-y-1"
                    >
                        Enviar Testemunho
                    </button>
                </div>
            </section>

            {/* Modal */}
            <TestimonialModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}

