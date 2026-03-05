import Image from "next/image";
import { ChevronDown, Cross, Heart, Shield } from "lucide-react";
import { getAssetPath } from "@/lib/utils";

const seteDores = [
    {
        title: "1. A profecia de Simeão",
        description: "Simeão profetizou que uma espada de dor traspassaria a alma de Maria, revelando que seu Filho seria sinal de contradição.",
        verse: "Lucas 2, 34-35"
    },
    {
        title: "2. A fuga para o Egito",
        description: "Para salvar a vida de Jesus da perseguição de Herodes, Maria e José fogem para o Egito, enfrentando os perigos do deserto.",
        verse: "Mateus 2, 13-15"
    },
    {
        title: "3. A perda de Jesus em Jerusalém",
        description: "Por três dias, Maria e José procuram angustiados pelo Menino Jesus no Templo de Jerusalém.",
        verse: "Lucas 2, 41-50"
    },
    {
        title: "4. O encontro com Jesus no caminho do Calvário",
        description: "Maria contempla seu Filho carregando a cruz, sofrendo insultos e dores físicas imensas.",
        verse: "Lucas 23, 27-31"
    },
    {
        title: "5. Aos pés da Cruz",
        description: "Maria permanece fiel junto à cruz, testemunhando a agonia e morte de seu amado Filho.",
        verse: "João 19, 25-27"
    },
    {
        title: "6. Maria recebe Jesus em seus braços",
        description: "A dor da Mãe ao receber o corpo sem vida de seu Filho, descido da cruz e colocado em seu colo.",
        verse: "João 19, 38-40"
    },
    {
        title: "7. Jesus é colocado no sepulcro",
        description: "A última despedida de Maria ao ver o sepulcro ser fechado, guardando no coração a esperança da ressurreição.",
        verse: "João 19, 41-42"
    }
];

export default function NossaSenhora() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={getAssetPath("/nossa-senhora-hero.png")}
                        alt="Nossa Senhora das Dores"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-purple-900/40 to-transparent" />
                </div>
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center pt-20">
                    <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6">
                        Nossa Senhora das Dores
                    </h1>
                    <p className="text-purple-100 text-lg md:text-xl max-w-2xl mb-8">
                        A Mãe que permaneceu fiel aos pés da Cruz, ensinando-nos a transformar o sofrimento em oferta de amor.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="#sete-dores" className="bg-white text-purple-900 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-purple-50 transition-all">
                            Conheça as Sete Dores
                        </a>
                        <a href="#oracao" className="bg-purple-700 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-purple-800 transition-all">
                            Oração do Terço
                        </a>
                    </div>
                </div>
            </section>

            {/* Intro Context Section */}
            <section className="py-20 bg-background text-center md:text-left">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <span className="text-purple-600 font-bold tracking-widest uppercase text-sm mb-4 block">Mater Dolorosa</span>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-purple-900 mb-8">O Significado da Devoção</h2>
                    <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                        <p>
                            Nossa Senhora das Dores (ou Mater Dolorosa) é um dos títulos da Virgem Maria que recorda sua participação direta no mistério da Paixão de Cristo. Ela é a "Virgem Fiel" que não fugiu da dor, mas a abraçou com esperança.
                        </p>
                        <p>
                            Para o nosso Grupo de Oração, pertencente à Renovação Carismática Católica, a Virgem das Dores é modelo de perseverança. Sob seu manto, aprendemos que o sofrimento unido ao de Jesus não é em vão, mas torna-se caminho de santificação.
                        </p>
                    </div>
                </div>
            </section>

            {/* Sete Dores Section */}
            <section id="sete-dores" className="py-20 bg-background-soft">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-purple-900 mb-4">As Sete Dores de Maria</h2>
                        <p className="text-gray-600">Meditando os passos de dor e amor da Mãe de Deus.</p>
                    </div>

                    <div className="space-y-4">
                        {seteDores.map((dor, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-sm border border-purple-100 overflow-hidden group hover:border-purple-300 transition-all">
                                <div className="p-6 cursor-pointer flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-800 shrink-0">
                                            {index + 1}
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-900">{dor.title}</h3>
                                    </div>
                                    <ChevronDown className="text-purple-300 group-hover:text-purple-600 transition-colors" />
                                </div>
                                <div className="px-6 pb-8 pl-16 md:pl-20">
                                    <p className="text-gray-600 mb-4 italic">"{dor.description}"</p>
                                    <div className="flex items-center gap-2 text-purple-600 font-semibold text-sm">
                                        <Cross className="w-4 h-4" />
                                        <span>{dor.verse}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Terço das Dores Section */}
            <section id="oracao" className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-purple-900 rounded-[2.5rem] p-10 md:p-20 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-800 rounded-full -mr-20 -mt-20 blur-3xl opacity-50"></div>

                        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <Shield className="w-16 h-16 text-purple-300 mb-6" />
                                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">O Terço das Sete Dores</h2>
                                <p className="text-purple-100 text-lg mb-8 leading-relaxed">
                                    Diferente do Rosário tradicional, o Terço das Dores convida-nos a contemplar cada uma das sete dores de Maria, rezando um Pai-Nosso e sete Ave-Marias em cada mistério.
                                </p>
                                <ul className="space-y-4 text-purple-100">
                                    <li className="flex items-center gap-3">
                                        <Heart className="w-5 h-5 text-purple-400 shrink-0" />
                                        <span>Promessa de paz nas famílias que o rezam.</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Heart className="w-5 h-5 text-purple-400 shrink-0" />
                                        <span>Auxílio especial na hora da morte.</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Heart className="w-5 h-5 text-purple-400 shrink-0" />
                                        <span>Proteção contra os ataques do mal.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                                <h4 className="font-bold text-xl mb-4">Como rezar</h4>
                                <ol className="list-decimal list-inside space-y-4 text-purple-50">
                                    <li>Sinal da Cruz e ato de contrição.</li>
                                    <li>Anúncio de cada Dor acompanhado de meditação.</li>
                                    <li>1 Pai Nosso e 7 Ave Marias para cada dor.</li>
                                    <li>Ao final, 3 Ave Marias pelas lágrimas de Maria.</li>
                                    <li>Oração de encerramento.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
