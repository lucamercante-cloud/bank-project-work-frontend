import type { ReactNode } from "react";

interface LoginLayoutProps {
    children: ReactNode;
}

export const LoginLayout = ({ children }: LoginLayoutProps) => {
    return (
        <main className="min-h-screen flex w-full bg-slate-950 text-slate-100 font-sans">
            {/* --- SEZIONE SINISTRA: Hero Banner --- */}
            <div
                className="hidden lg:flex flex-col justify-between w-1/2 p-12 bg-cover bg-center relative"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200')" }}
            >
                <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px]"></div>

                {/* Logo */}
                <div className="relative z-10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-slate-950 text-sm shadow-md overflow-hidden p-1">
                        <img src="src/assets/gemini-svg.svg" alt="logo svg" className="w-full h-full object-contain" />
                    </div>
                    <span className="font-bold text-lg tracking-wider text-white">GEMIT BANK</span>
                </div>

                {/* Contenuto Banner */}
                <div className="relative z-10 my-auto max-w-lg">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4 leading-tight">
                        La ricchezza di domani, <br />
                        <span className="text-emerald-400">progettata oggi.</span>
                    </h1>
                    <p className="text-slate-300 text-sm leading-relaxed max-w-md">
                        Accedi in modo sicuro ai tuoi conti privati globali, soluzioni di investimento personalizzate e strumenti di gestione della liquidità ad alta velocità.
                    </p>
                </div>

                {/* Footer Banner */}
                <div className="relative z-10 flex justify-between text-xs text-slate-500">
                    <p>Gemit Bank Corporation © 2026</p>
                    <a href="#" className="text-emerald-500 hover:underline">Registro Privato</a>
                </div>
            </div>

            {/* --- SEZIONE DESTRA: Qui dentro viene iniettato `children` (il form) --- */}
            <div className="w-full lg:w-1/2 bg-white text-slate-900 flex flex-col justify-between p-8 md:p-16">
                {children}
            </div>
        </main>
    );
};