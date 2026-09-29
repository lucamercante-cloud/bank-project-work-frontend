import { useEffect, useRef, useState, type ReactNode } from "react";
import logoImg from "../../assets/gemini-svg.svg";

interface LoginLayoutProps {
    children: ReactNode;
    onResetSession?: () => void; // Callback per resettare la form
}

// 30 secondi in millisecondi
const INACTIVITY_LIMIT = 30 * 1000;

export const LoginLayout = ({ children, onResetSession }: LoginLayoutProps) => {
    const [isTimedOut, setIsTimedOut] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleTimeoutTrigger = () => {
        setIsTimedOut(true);
        if (onResetSession) {
            onResetSession(); // Reset dei dati della form alla scadenza
        }
    };

    const resetTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(handleTimeoutTrigger, INACTIVITY_LIMIT);
    };

    const handleResume = () => {
        setIsTimedOut(false);
        if (onResetSession) {
            onResetSession(); // Reset quando l'utente clicca su Riprendi
        }
        resetTimer();
    };

    useEffect(() => {
        const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];

        resetTimer();

        const handleActivity = () => {
            setIsTimedOut((prev) => {
                if (prev) {
                    if (onResetSession) onResetSession();
                    return false;
                }
                return prev;
            });
            resetTimer();
        };

        events.forEach((event) => {
            window.addEventListener(event, handleActivity);
        });

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            events.forEach((event) => {
                window.removeEventListener(event, handleActivity);
            });
        };
    }, []);

    return (
        <main className="min-h-screen flex w-full bg-slate-950 text-slate-100 font-sans relative">
            {/* --- OVERLAY TIMEOUT CON BLUR --- */}
            {isTimedOut && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 transition-all">
                    <div className="bg-[#0b101d] border border-amber-500/40 p-6 sm:p-8 rounded-2xl max-w-md w-full text-center shadow-2xl">
                        <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                            ⚠️
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Sessione Scaduta</h3>
                        <p className="text-xs text-slate-300 leading-relaxed mb-6">
                            La sessione di login è scaduta per inattività. Il modulo è stato ripristinato.
                        </p>
                        <button
                            type="button"
                            onClick={handleResume}
                            className="bg-[#59DE00] hover:bg-[#4bc200] text-black font-extrabold py-2.5 px-6 rounded-lg text-xs uppercase tracking-wide cursor-pointer transition-colors"
                        >
                            Riprendi Sessione
                        </button>
                    </div>
                </div>
            )}

            {/* --- SEZIONE SINISTRA: Hero Banner --- */}
            <div
                className="hidden lg:flex flex-col justify-between w-1/2 p-12 bg-cover bg-center relative shrink-0"
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

            {/* --- SEZIONE DESTRA: Form --- */}
            <div className="w-full lg:w-1/2 bg-white text-slate-900 flex flex-col justify-center items-center p-8 md:p-16 overflow-y-auto shrink-0 [scrollbar-gutter:stable]">
                {children}
            </div>
        </main>
    );
};