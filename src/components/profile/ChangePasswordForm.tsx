import { useState } from "react";
import { changePassword } from "../../services/password.service";

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export const ChangePasswordModal = ({
    isOpen,
    onClose,
    onSuccess
}: ChangePasswordModalProps) => {
    const [vecchiaPassword, setVecchiaPassword] = useState("");
    const [nuovaPassword, setNuovaPassword] = useState("");
    const [confermaNuovaPassword, setConfermaNuovaPassword] = useState("");
    
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!vecchiaPassword || !nuovaPassword || !confermaNuovaPassword) {
            setError("Compila tutti i campi obbligatori.");
            return;
        }

        if (nuovaPassword !== confermaNuovaPassword) {
            setError("La nuova password e la conferma non coincidono.");
            return;
        }

        try {
            setIsLoading(true);
            
            // Effettua la PATCH
            await changePassword({
                vecchiaPassword,
                nuovaPassword,
                confermaNuovaPassword
            });

            // Reset dello stato locale
            setVecchiaPassword("");
            setNuovaPassword("");
            setConfermaNuovaPassword("");
            
            if (onSuccess) onSuccess();
            onClose();

        } catch (err: any) {
            // Gestione dei codici di errore HTTP dal backend
            if (err.response?.status === 400) {
                setError(
                    err.response?.data?.message || 
                    "Vecchia password non corretta o la nuova password non rispetta i criteri di sicurezza."
                );
            } else if (err.response?.status === 401) {
                setError("Sessione scaduta. Per favore rieffettua il login.");
            } else {
                setError("Si è verificato un errore imprevisto. Riprova più tardi.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        /* Overlay con sfondo sfocato (backdrop-blur) */
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
            
            {/* Contenitore Modale */}
            <div className="w-full max-w-md bg-[#0b101d] border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative text-left">
                
                {/* Tasto Chiudi (X) */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer text-lg p-1"
                >
                    ✕
                </button>

                <h3 className="text-xl font-extrabold text-white mb-1">
                    Modifica Password
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                    Inserisci la password attuale per autorizzare la modifica.
                </p>

                {/* Banner Errore */}
                {error && (
                    <div className="bg-red-950/40 border border-red-500/50 rounded-xl p-3 mb-4 text-xs text-red-300">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Vecchia Password */}
                    <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            Vecchia Password
                        </label>
                        <input
                            type="password"
                            value={vecchiaPassword}
                            onChange={(e) => setVecchiaPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-[#070913] border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#59DE00] transition-colors"
                        />
                    </div>

                    {/* Nuova Password */}
                    <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            Nuova Password
                        </label>
                        <input
                            type="password"
                            value={nuovaPassword}
                            onChange={(e) => setNuovaPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-[#070913] border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#59DE00] transition-colors"
                        />
                    </div>

                    {/* Conferma Nuova Password */}
                    <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            Conferma Nuova Password
                        </label>
                        <input
                            type="password"
                            value={confermaNuovaPassword}
                            onChange={(e) => setConfermaNuovaPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-[#070913] border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#59DE00] transition-colors"
                        />
                    </div>

                    {/* Bottoni di Azione */}
                    <div className="pt-2 space-y-2.5">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#59DE00] hover:bg-[#4bc200] text-black font-extrabold py-3 px-6 rounded-lg transition-all text-xs uppercase tracking-wide cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Aggiornamento..." : "Conferma Cambio Password"}
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full text-center text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer py-1"
                        >
                            Annulla
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};