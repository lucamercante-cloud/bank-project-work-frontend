import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { login } from "../../services/auth.service";
import logoImg from "../../assets/gemini-svg.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLock,
    faEnvelope,
    faEye,
    faEyeSlash,
    faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons";

// 1. Tipizzazione esplicita con "as const"
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

export const LoginForm = () => {
    // Stati per i dati del form
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Stati di interfaccia
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    // Invio del form
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setServerError(null);
        setIsLoading(true);

        try {
            await login({ email, password });
            window.location.href = "/dashboard";
        } catch (err: any) {
            setServerError(
                err?.response?.data?.message || "Credenziali non valide o errore di connessione."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            // 2. fixed inset-0 w-screen h-screen per bloccare la posizione assoluta durante la transizione
            className="fixed inset-0 w-screen h-screen flex bg-slate-950 text-slate-100 font-sans overflow-hidden"
        >
            {/* --- SEZIONE SINISTRA: Hero Banner --- */}
            <div
                className="hidden lg:flex flex-col justify-between w-1/2 p-12 bg-cover bg-center relative h-full shrink-0"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200')" }}
            >
                <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px]"></div>

                <div className="relative z-10 flex items-center gap-3">
                    <img src={logoImg} className="h-[6vh]" alt="Logo" />
                    <span className="font-extrabold text-xl tracking-wider text-white">
                        GEMIT<span className="text-[#59DE00]">BANK</span>
                    </span>
                </div>

                <div className="relative z-10 my-auto max-w-lg">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4 leading-tight">
                        La ricchezza di domani, <br />
                        <span className="text-[#59DE00]">progettata oggi.</span>
                    </h1>
                    <p className="text-slate-300 text-sm leading-relaxed max-w-md">
                        Accedi in modo sicuro ai tuoi conti privati globali, soluzioni di investimento personalizzate e strumenti di gestione della liquidità ad alta velocità.
                    </p>
                </div>

                <div className="relative z-10 flex justify-between text-xs text-slate-500 border-t border-slate-800/80 pt-4">
                    <p>Gemit Bank Corporation © 2026</p>
                    <a href="#" className="text-[#59DE00] hover:underline">Registro Privato</a>
                </div>
            </div>

            {/* --- SEZIONE DESTRA: Form di Login --- */}
            <div
                // 3. [scrollbar-gutter:stable] evita lo scatto orizzontale se compaiono messaggi di errore
                className="w-full lg:w-1/2 bg-white text-slate-900 flex flex-col justify-between p-8 md:p-16 h-full overflow-y-auto shrink-0 [scrollbar-gutter:stable]"
            >
                <div className="max-w-sm w-full mx-auto my-auto">

                    {/* Header con Icona Lucchetto */}
                    <div className="mb-8 text-center flex flex-col items-center">
                        <div className="w-12 h-12 bg-emerald-100 text-[#59DE00] rounded-full flex items-center justify-center mb-4 border border-emerald-200 text-lg">
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Accedi al Portale Riservato</h2>
                        <p className="text-xs text-slate-500 mt-1.5">
                            Inserisci le tue credenziali per accedere in sicurezza al tuo caveau.
                        </p>
                    </div>

                    {/* Alert Errore */}
                    {serverError && (
                        <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-md flex items-center gap-2">
                            <FontAwesomeIcon icon={faTriangleExclamation} className="text-rose-500 text-sm shrink-0" />
                            <span>{serverError}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                Email
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 text-xs">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nome@azienda.com"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-md pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#59DE00] focus:bg-white transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 text-xs">
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-md pl-9 pr-20 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#59DE00] focus:bg-white transition-all placeholder:text-slate-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors uppercase"
                                >
                                    <span>{showPassword ? "Nascondi" : "Mostra"}</span>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs pt-1">
                            <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                                <input type="checkbox" className="rounded border-slate-300 text-[#59DE00] focus:ring-[#59DE00] w-4 h-4 accent-[#59DE00]" />
                                Ricordami
                            </label>
                            <a href="#" className="text-[#59DE00] font-semibold hover:underline">Password dimenticata?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#59DE00] text-black font-bold py-2.5 rounded-md border border-[#59DE00] hover:bg-white hover:text-[#59DE00] transition-all duration-200 text-sm disabled:opacity-50 flex items-center justify-center gap-2 !mt-6"
                        >
                            {isLoading ? <span>Autenticazione in corso...</span> : <span>Accedi</span>}
                        </button>
                    </form>

                    <p className="text-center text-xs text-slate-500 mt-8">
                        Non hai ancora un account?{" "}
                        <Link to="/register" className="text-[#59DE00] font-semibold hover:underline">
                            Crea account
                        </Link>
                    </p>
                </div>
            </div>
        </motion.div>
    );
};