import { useState, type FormEvent } from "react";
import { login } from "../../services/auth.service";

export const LoginForm = () => {
    // 1. STATI PER I DATI DEL FORM
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 2. STATI DI INTERFACCIA
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 3. INVIO DEL FORM
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await login({ email, password });
            window.location.href = "/dashboard";
        } catch (err: any) {
            setError(err?.response?.data?.message || "Credenziali non valide o errore di rete.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex w-full bg-slate-950 text-slate-100">
            {/* --- SEZIONE SINISTRA: Hero Banner --- */}
            <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200')" }}>
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>

                {/* Logo */}
                <div className="relative z-10 flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center font-bold text-slate-950 text-sm">
                        G
                    </div>
                    <span className="font-semibold text-lg tracking-wider text-white">GEMIT BANK</span>
                </div>

                {/* Content Central Box */}
                <div className="relative z-10 my-auto max-w-lg">
                    <h1 className="text-3xl font-semibold tracking-tight text-white mb-3">
                        Piattaforma di Gestione <br />
                        <span className="text-emerald-400">Patrimoniale Avanzata</span>
                    </h1>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8">
                        Accedi in modo sicuro al tuo portafoglio, consulta le operazioni in tempo reale ed esegui disposizioni con protezione crittografica.
                    </p>

                    <div className="grid grid-cols-2 gap-6 border-t border-slate-800 pt-6">
                        <div>
                            <p className="text-xl font-bold text-white">$42B+</p>
                            <p className="text-xs text-slate-400 uppercase tracking-wider mt-0.5">Asset in Gestione</p>
                        </div>
                        <div>
                            <p className="text-xl font-bold text-white">256-Bit</p>
                            <p className="text-xs text-slate-400 uppercase tracking-wider mt-0.5">Crittografia TLS 1.3</p>
                        </div>
                    </div>
                </div>

                {/* Footer Banner */}
                <div className="relative z-10 flex justify-between text-xs text-slate-500 border-t border-slate-800/80 pt-4">
                    <p>© 2026 Gemit Bank Corporation</p>
                    <a href="#" className="hover:text-slate-300 transition-colors">Note Legali</a>
                </div>
            </div>

            {/* --- SEZIONE DESTRA: Form di Login --- */}
            <div className="w-full lg:w-1/2 bg-white text-slate-900 flex flex-col justify-between p-8 md:p-16">
                <div className="max-w-sm w-full mx-auto my-auto">

                    {/* Header Icona e Titolo */}
                    <div className="mb-8">
                        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-4 border border-emerald-100">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Accesso al Portale</h2>
                        <p className="text-xs text-slate-500 mt-1">
                            Inserisci le tue credenziali per autenticarti.
                        </p>
                    </div>

                    {/* Alert Errore */}
                    {error && (
                        <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-md flex items-center gap-2">
                            <svg className="w-4 h-4 shrink-0 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                Email o Username
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nome@azienda.com"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-md pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-md pl-9 pr-14 py-2 text-sm text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors uppercase"
                                >
                                    {showPassword ? "Nascondi" : "Mostra"}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs pt-0.5">
                            <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                                <input type="checkbox" className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" defaultChecked />
                                Ricorda dispositivo
                            </label>
                            <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                                Password dimenticata?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-slate-900 text-white font-medium py-2.5 rounded-md hover:bg-slate-800 transition-colors text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <span>Autenticazione in corso...</span>
                            ) : (
                                <span>Accedi in modo sicuro</span>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-xs text-slate-500 mt-8">
                        Non hai ancora un account? <a href="#" className="text-emerald-600 font-semibold hover:underline">Registrati</a>
                    </p>
                </div>

                {/* Footer Badges */}
                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <div className="flex justify-center items-center gap-6 text-[11px] text-slate-400 font-medium mb-2">
                        <span className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            SSL 256-Bit
                        </span>
                        <span>Membro FDIC</span>
                        <span>Assicurato SIPC</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-normal max-w-xs mx-auto">
                        Accesso riservato al personale e clienti autorizzati. Gli accessi non autorizzati saranno perseguiti a norma di legge.
                    </p>
                </div>
            </div>
        </div>
    );
};