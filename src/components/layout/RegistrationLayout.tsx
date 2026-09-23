import type { ReactNode } from "react";
import { motion } from "framer-motion";
import img from "../../assets/imgRegistration.jpg";
import logoImg from "../../assets/gemini-svg.svg";

interface RegisterLayoutProps {
    children: ReactNode;
}

const pageVariants = {
    initial: {
        opacity: 0,
        x: 8
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.35,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        x: -8,
        transition: {
            duration: 0.25,
            ease: "easeIn"
        }
    }
} as const;

export const RegisterLayout = ({ children }: RegisterLayoutProps) => {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 w-screen h-screen flex bg-slate-950 text-slate-100 font-sans overflow-hidden"
        >
            {/* --- SEZIONE SINISTRA: Form di Registrazione --- */}
            <div className="w-full lg:w-1/2 bg-white text-slate-900 flex flex-col justify-between p-8 md:p-16 h-full overflow-y-auto shrink-0 scrollbar-gutter:stable">
                {children}
            </div>

            {/* --- SEZIONE DESTRA: Hero Banner --- */}
            <div
                className="hidden lg:flex flex-col justify-between w-1/2 p-12 bg-cover bg-center relative h-full shrink-0"
                style={{ backgroundImage: `url(${img})` }}
            >
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]"></div>

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
                        Apri il tuo conto <br />
                        <span className="text-[#59DE00]">in pochi minuti</span>
                    </h1>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8">
                        Registrati per ottenere un conto corrente digitale, monitorare i movimenti e operare in totale sicurezza.
                    </p>
                    <div className="grid grid-cols-2 items-center gap-6 py-4">
                        <div>
                            <div className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                                $42B+
                            </div>
                            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-1">
                                Assets Engineered
                            </div>
                        </div>

                        <div className="flex items-center gap-6 border-l border-slate-700/60 pl-6">
                            <div>
                                <div className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                                    256-Bit
                                </div>
                                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-1">
                                    Military Encryption
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Banner */}
                <div className="relative z-10 flex justify-between text-xs text-slate-500 border-t border-slate-800/80 pt-4">
                    <p>© 2026 Gemit Bank Corporation</p>
                    <a href="#" className="hover:text-slate-300 transition-colors">Note Legali</a>
                </div>
            </div>
        </motion.div>
    );
};