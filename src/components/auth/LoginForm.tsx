import { useState, type FormEvent } from "react";
import { login } from "../../services/auth.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLock,
    faUser,
    faEye,
    faEyeSlash,
    faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
        <div className="max-w-sm w-full mx-auto my-auto">
            {/* Header Icona e Titolo */}
            <div className="mb-8 text-center flex flex-col items-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 border border-emerald-200 text-lg">
                    <FontAwesomeIcon icon={faLock} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Accedi al Portale Riservato</h2>
                <p className="text-xs text-slate-500 mt-1.5">
                    Inserisci le tue credenziali per accedere in sicurezza al tuo caveau.
                </p>
            </div>

            {/* Alert Errore */}
            {error && (
                <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-md flex items-center gap-2">
                    <FontAwesomeIcon icon={faTriangleExclamation} className="text-rose-500 text-sm shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                        USERNAME O EMAIL
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 text-xs">
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                        <input
                            type="text"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="nome@azienda.com"
                            className="w-full bg-slate-50/70 border border-slate-200 rounded-md pl-9 pr-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all placeholder:text-slate-400"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                        PASSWORD DI SICUREZZA
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
                            className="w-full bg-slate-50/70 border border-slate-200 rounded-md pl-9 pr-24 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all placeholder:text-slate-400"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 flex items-center gap-1.5 text-[11px] font-bold text-emerald-500 hover:text-emerald-600 transition-colors uppercase"
                        >
                            <span>{showPassword ? "NASCONDI" : "MOSTRA"}</span>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-0.5">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium select-none">
                        <input type="checkbox" className="rounded border-slate-300 text-emerald-500 focus:ring-emerald-500 w-4 h-4 accent-emerald-500" defaultChecked />
                        Ricorda dispositivo
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-slate-950 text-white font-semibold py-3 rounded-md hover:bg-slate-900 transition-colors text-sm disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm mt-2"
                >
                    {isLoading ? (
                        <span>Autenticazione in corso...</span>
                    ) : (
                        <span>Accedi in modo Sicuro</span>
                    )}
                </button>
            </form>

            <p className="text-center text-xs text-slate-500 mt-6">
                Nuovo su GEMIT BANK? <a href="/register" className="text-emerald-500 font-semibold hover:underline">Crea Account</a>
            </p>
        </div>
    );
};