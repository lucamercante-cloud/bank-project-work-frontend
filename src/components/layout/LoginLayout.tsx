import type { ReactNode } from "react";
import logoImg from "../../assets/gemini-svg.svg";

interface LoginLayoutProps {
    children: ReactNode;
}

export const LoginLayout = ({ children }: LoginLayoutProps) => {
    return (
        <main className="min-h-screen flex w-full bg-slate-950 text-slate-100 font-sans">
            {/* --- SEZIONE SINISTRA: Hero Banner --- */}
            <div
                className="hidden lg:flex flex-col justify-between w-1/2 p-12 bg-cover bg-center relative shrink-0"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200')" }}
            >
                <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px]"></div>

                {/* Logo */}
                <div className="relative z-10 flex items-center gap-3">
                    <img src={logoImg} className="h-[6vh]" alt="Logo" />
                    <span className="font-extrabold text-xl tracking-wider text-white">
                        GEMIT<span className="text-[#59DE00]">BANK</span>
                    </span>
                </div>

                {/* Contenuto Banner */}
                <div className="relative z-10 my-auto max-w-lg">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4 leading-tight">
                        La ricchezza di domani, <br />
                        <span className="text-[#59DE00]">progettata oggi.</span>
                    </h1>
                    <p className="text-slate-300 text-sm leading-relaxed max-w-md">
                        Accedi in modo sicuro ai tuoi conti privati globali, soluzioni di investimento personalizzate e strumenti di gestione della liquidità ad alta velocità.
                    </p>
                </div>

                {/* Footer Banner */}
                <div className="relative z-10 flex justify-between text-xs text-slate-500 border-t border-slate-800/80 pt-4">
                    <p>Gemit Bank Corporation © 2026</p>
                    <a href="#" className="text-[#59DE00] hover:underline">Registro Privato</a>
                </div>
            </div>

            {/* --- SEZIONE DESTRA: Qui viene iniettato il Form --- */}
            <div className="w-full lg:w-1/2 bg-white text-slate-900 flex flex-col justify-between p-8 md:p-16 overflow-y-auto shrink-0 [scrollbar-gutter:stable]">
                {children}
            </div>
        </main>
    );
};