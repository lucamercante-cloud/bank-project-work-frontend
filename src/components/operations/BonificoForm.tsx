import { useState } from "react";
import { BonificoLayout } from "../layout/BonificoLayout";
import type { BonificoRequest } from "../../types/BonificoRequest";

interface BonificoFormProps {
    saldoDisponibile: number;
    onSubmit: (data: BonificoRequest) => Promise<void>;
    isLoading?: boolean;
    serverError?: string | null;
}

export const BonificoForm = ({
    saldoDisponibile,
    onSubmit,
    isLoading = false,
    serverError
}: BonificoFormProps) => {
    const [beneficiario, setBeneficiario] = useState("");
    const [importoInput, setImportoInput] = useState("");
    const [iban, setIban] = useState("");
    const [causale, setCausale] = useState("");
    
    // Data bloccata al giorno corrente (ISO format: YYYY-MM-DD)
    const [dataEsecuzione] = useState(
        new Date().toISOString().split("T")[0]
    );

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Calcoli dinamici
    const importoVal = parseFloat(importoInput) || 0;
    const totaleAddebitato = importoVal;
    const saldoDisponibileNum = Number(saldoDisponibile) || 0;
    const saldoPostOperazione = saldoDisponibileNum - totaleAddebitato;
    const isSaldoInsufficiente = importoVal > 0 && totaleAddebitato > saldoDisponibileNum;

    // Determinazione dinamica di Titolo e Messaggio di errore
    let currentError: string | null = null;
    let errorTitle: string = "Attenzione";

    if (errorMessage) {
        currentError = errorMessage;
        errorTitle = "Dati incompleti o errati";
    } else if (isSaldoInsufficiente) {
        currentError = "Il saldo disponibile non è sufficiente per completare l'operazione.";
        errorTitle = "Saldo insufficiente";
    } else if (serverError) {
        currentError = serverError;
        errorTitle = "Errore operazione";
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        // Validazione prioritaria dei campi
        if (!beneficiario.trim()) return setErrorMessage("Inserisci il nome del beneficiario.");
        if (importoVal <= 0) return setErrorMessage("Inserisci un importo valido maggiore di zero.");
        if (!iban.trim() || iban.length < 15) return setErrorMessage("Inserisci un codice IBAN valido.");
        if (isSaldoInsufficiente) return; // Blocco se il saldo non è sufficiente

        await onSubmit({
            beneficiario,
            importo: importoVal,
            iban,
            causale,
            dataEsecuzione
        });
    };

    return (
        <BonificoLayout>
            <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Banner Errore Dinamico */}
                {currentError && (
                    <div className="bg-red-950/40 border border-red-500/50 rounded-xl p-4 text-left flex items-start gap-3">
                        <span className="text-red-400 text-lg">⚠️</span>
                        <div>
                            <h4 className="text-xs font-bold text-red-400 uppercase tracking-wide">
                                {errorTitle}
                            </h4>
                            <p className="text-xs text-red-300/80 mt-0.5">
                                {currentError}
                            </p>
                        </div>
                    </div>
                )}

                {/* Beneficiario */}
                <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Beneficiario
                    </label>
                    <input
                        type="text"
                        value={beneficiario}
                        onChange={(e) => setBeneficiario(e.target.value)}
                        placeholder="Nome e Cognome o Ragione Sociale"
                        className="w-full bg-[#070913] border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#59DE00] transition-colors"
                    />
                </div>

                {/* Importo */}
                <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Importo
                    </label>
                    <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">€</span>
                        <input
                            type="number"
                            step="0.01"
                            value={importoInput}
                            onChange={(e) => setImportoInput(e.target.value)}
                            placeholder="0,00"
                            className="w-full bg-[#070913] border border-slate-800 rounded-lg pl-8 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#59DE00] transition-colors"
                        />
                    </div>
                </div>

                {/* IBAN */}
                <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        IBAN
                    </label>
                    <input
                        type="text"
                        value={iban}
                        onChange={(e) => setIban(e.target.value)}
                        placeholder="IT00 X000 0000 0000 0000 0000 000"
                        className="w-full bg-[#070913] border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#59DE00] transition-colors tracking-wide"
                    />
                </div>

                {/* Causale */}
                <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Causale
                    </label>
                    <input
                        type="text"
                        value={causale}
                        onChange={(e) => setCausale(e.target.value)}
                        placeholder="Causale del bonifico"
                        className="w-full bg-[#070913] border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#59DE00] transition-colors"
                    />
                </div>

                {/* Data Esecuzione (Disabilitata/Sola lettura) */}
                <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Data Esecuzione
                    </label>
                    <input
                        type="date"
                        value={dataEsecuzione}
                        disabled
                        className="w-full bg-[#070913]/50 border border-slate-800/60 rounded-lg px-4 py-2.5 text-sm text-slate-400 cursor-not-allowed focus:outline-none"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">
                        L'operazione verrà eseguita nella data odierna.
                    </p>
                </div>

                {/* Box Riepilogo Operazione */}
                <div className="bg-[#070913] border border-slate-800/80 rounded-xl p-4 space-y-2.5 text-xs text-left">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                        Riepilogo operazione
                    </p>

                    <div className="flex justify-between items-center">
                        <span className="text-slate-400">Importo bonifico</span>
                        <span className="text-[#59DE00] font-bold">€ {importoVal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-slate-400">Commissione</span>
                        <span className="text-slate-300">€ 0,00</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-slate-400">Totale addebitato</span>
                        <span className="text-slate-200 font-semibold">€ {totaleAddebitato.toFixed(2)}</span>
                    </div>

                    <div className="border-t border-slate-800/80 pt-2.5 flex justify-between items-center">
                        <span className="text-slate-400">Saldo post operazione</span>
                        <span className={`font-semibold ${saldoPostOperazione < 0 ? "text-red-400" : "text-slate-200"}`}>
                            € {saldoPostOperazione.toFixed(2)}
                        </span>
                    </div>
                </div>

                {/* Azioni */}
                <div className="pt-2 space-y-3">
                    <button
                        type="submit"
                        disabled={isLoading || isSaldoInsufficiente}
                        className="w-full bg-[#59DE00] hover:bg-[#4bc200] text-black font-extrabold py-3.5 px-6 rounded-lg transition-all text-xs uppercase tracking-wide cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Elaborazione..." : "Conferma Bonifico"}
                    </button>

                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="w-full text-center text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer py-1"
                    >
                        Annulla
                    </button>
                </div>
            </form>
        </BonificoLayout>
    );
};