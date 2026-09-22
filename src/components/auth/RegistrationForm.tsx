import { useState, type FormEvent } from "react";
import { register } from "../../services/auth.service";
import img from "../../assets/imgRegistration.jpg";
import img2diobastardp from "../../assets/gemini-svg.svg"
export const RegistrationForm = () => {
    // Stati per i dati del form
    const [nomeTitolare, setNomeTitolare] = useState("");
    const [cognomeTitolare, setCognomeTitolare] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confermaPassword, setConfermaPassword] = useState("");

    // Stati di interfaccia
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    // Invio del form
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setServerError(null);
        setSuccessMessage(null);

        if (password !== confermaPassword) {
            setPasswordMismatch(true);
            return;
        }
        setPasswordMismatch(false);

        setIsLoading(true);

        try {
            const result = await register({
                nomeTitolare,
                cognomeTitolare,
                email,
                password,
                confermaPassword
            });

            setSuccessMessage(
                result.message ||
                "Registrazione avvenuta con successo. Controlla la tua email per confermare l'account."
            );

            setNomeTitolare("");
            setCognomeTitolare("");
            setEmail("");
            setPassword("");
            setConfermaPassword("");
        } catch (err: any) {
            setServerError(
                err?.response?.data?.message || "Registrazione non riuscita. Riprova più tardi."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex w-full bg-slate-950 text-slate-100">
            {/* --- SEZIONE SINISTRA: Form di Registrazione --- */}
            <div className="w-full lg:w-1/2 bg-white text-slate-900 flex flex-col justify-between p-8 md:p-16">
                <div className="max-w-sm w-full mx-auto my-auto">

                    <div className="mb-8 text-center flex flex-col items-center">
                        <img src={img2diobastardp} className="h-[4vh] mb-4" alt="Logo" />
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Crea il tuo account</h2>
                        <p className="text-xs text-slate-500 mt-1">
                            Compila i campi per aprire un nuovo conto corrente.
                        </p>
                    </div>

                    {serverError && (
                        <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-md flex items-center gap-2">
                            <svg className="w-4 h-4 shrink-0 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{serverError}</span>
                        </div>
                    )}

                    {successMessage && (
                        <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-md flex items-center gap-2">
                            <svg className="w-4 h-4 shrink-0 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span>{successMessage}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={nomeTitolare}
                                    onChange={(e) => setNomeTitolare(e.target.value)}
                                    placeholder="Mario"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Cognome
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={cognomeTitolare}
                                    onChange={(e) => setCognomeTitolare(e.target.value)}
                                    placeholder="Rossi"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="nome@azienda.com"
                                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-md pl-3 pr-14 py-2 text-sm text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
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

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                Conferma password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={confermaPassword}
                                onChange={(e) => setConfermaPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                            />
                            {passwordMismatch && (
                                <p className="text-rose-600 text-[11px] mt-1">Le password non coincidono.</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-slate-900 text-white font-medium py-2.5 rounded-md hover:bg-slate-800 transition-colors text-sm disabled:opacity-50 flex items-center justify-center gap-2 !mt-6"
                        >
                            {isLoading ? <span>Registrazione in corso...</span> : <span>Crea account</span>}
                        </button>
                    </form>

                    <p className="text-center text-xs text-slate-500 mt-8">
                        Hai già un account? <a href="/login" className="text-[#59DE00] font-semibold hover:underline">Accedi</a>
                    </p>
                </div>
            </div>

            {/* --- SEZIONE DESTRA: Hero Banner --- */}
            <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 bg-cover bg-center relative" style={{ backgroundImage: `url(${img})` }}>
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-s"></div>

                <div className="relative z-10 flex items-center gap-3">
                    <img src={img2diobastardp} className="h-[6vh]"></img>
                    <span className="font-bold text-xl tracking-wider text-white">
                        GEMIT<span className="text-[#59DE00]">BANK</span>
                    </span>
                </div>

                <div className="relative z-10 my-auto max-w-lg">
                    <h1 className="text-3xl font-semibold tracking-tight text-white mb-3">
                        Apri il tuo conto <br />
                        <span className="text-[#59DE00]">in pochi minuti</span>
                    </h1>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8">
                        Registrati per ottenere un conto corrente digitale, monitorare i movimenti e operare in totale sicurezza.
                    </p>
                    <div className="grid grid-cols-2 items-center gap-6 py-4">
                        {/* Colonna Sinistra */}
                        <div>
                            <div className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                                $42B+
                            </div>
                            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-1">
                                Assets Engineered
                            </div>
                        </div>

                        {/* Divisore verticale + Colonna Destra */}
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

                <div className="relative z-10 flex justify-between text-xs text-slate-500 border-t border-slate-800/80 pt-4">
                    <p>© 2026 Gemit Bank Corporation</p>
                    <a href="#" className="hover:text-slate-300 transition-colors">Note Legali</a>
                </div>
            </div>
        </div>
    );
};