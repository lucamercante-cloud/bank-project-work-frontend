import { useState } from "react";
import type { Provider } from "../../types/Provider";
import type { RechargeTransaction } from "../../types/RechargeTransaction";
import { PROVIDERS, RECHARGE_AMOUNTS } from "../../utils/rechargeConstants";
import { processRecharge } from "../../services/rechargeService";

interface PhoneRechargeFormProps {
    onRechargeSuccess?: () => void;
}

export const PhoneRechargeForm = ({ onRechargeSuccess }: PhoneRechargeFormProps) => {
    // Stati del Form
    const [selectedProvider, setSelectedProvider] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

    // Stati di Feedback UI
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Invio del Form e Chiamata API Backend
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        // Validazioni preliminari
        if (!selectedProvider) {
            setErrorMessage("Seleziona un operatore telefonico.");
            return;
        }
        if (!phoneNumber || phoneNumber.trim().length < 9) {
            setErrorMessage("Inserisci un numero di telefono valido.");
            return;
        }
        if (!selectedAmount) {
            setErrorMessage("Seleziona un taglio di ricarica.");
            return;
        }

        setIsLoading(true);

        try {
            const transactionData: RechargeTransaction = {
                numeroTelefono: phoneNumber.trim(),
                operatore: selectedProvider,
                taglio: selectedAmount,
            };

            await processRecharge(transactionData);

            if (onRechargeSuccess) {
                onRechargeSuccess();
            }

            setSuccessMessage(`Ricarica di €${selectedAmount} inviata con successo al numero ${phoneNumber}!`);

            // Reset dei campi del form
            setPhoneNumber("");
            setSelectedAmount(null);
            setSelectedProvider("");

        } catch (error: any) {
            const apiErrorMessage = error.response?.data?.message || "Si è verificato un errore durante l'elaborazione della ricarica.";
            setErrorMessage(apiErrorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-[#0b101d] border border-slate-800/80 rounded-xl p-6 md:p-8 space-y-8 shadow-2xl">
            
            {/* SEZIONE 1: Selezione Operatore */}
            <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    1. Seleziona Operatore
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {PROVIDERS.map((provider: Provider) => {
                        const isSelected = selectedProvider === provider.id;
                        return (
                            <button
                                key={provider.id}
                                type="button"
                                onClick={() => setSelectedProvider(provider.id)}
                                className={`p-4 rounded-lg border text-sm font-bold transition-all duration-200 flex items-center justify-center ${
                                    isSelected
                                        ? "bg-slate-800 border-[#59DE00] text-[#59DE00] shadow-md shadow-[#59DE00]/10"
                                        : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                                }`}
                            >
                                {provider.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* SEZIONE 2: Inserimento Numero di Telefono */}
            <div>
                <label htmlFor="phone" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    2. Numero di Telefono
                </label>
                <input
                    id="phone"
                    type="tel"
                    placeholder="es. 3331234567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#59DE00] transition-colors"
                />
            </div>

            {/* SEZIONE 3: Selezione Taglio Ricarica */}
            <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    3. Taglio Ricarica
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {RECHARGE_AMOUNTS.map((amount: number) => {
                        const isSelected = selectedAmount === amount;
                        return (
                            <button
                                key={amount}
                                type="button"
                                onClick={() => setSelectedAmount(amount)}
                                className={`py-3 px-2 rounded-lg border text-base font-extrabold transition-all duration-200 ${
                                    isSelected
                                        ? "bg-[#59DE00] text-black border-[#59DE00] shadow-lg shadow-[#59DE00]/20"
                                        : "bg-slate-900/60 border-slate-800 text-slate-200 hover:border-slate-700"
                                }`}
                            >
                                € {amount}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* MESSAGGI DI ERRORE O SUCCESSO */}
            {errorMessage && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-xs font-medium">
                    ⚠️ {errorMessage}
                </div>
            )}

            {successMessage && (
                <div className="bg-[#59DE00]/10 border border-[#59DE00]/30 rounded-lg p-3 text-[#59DE00] text-xs font-medium">
                    ✅ {successMessage}
                </div>
            )}

            {/* BOTTONE DI INVIO */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#59DE00] text-black border-2 border-[#59DE00] font-extrabold py-3.5 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-[#59DE00]/20 text-sm tracking-wide uppercase hover:bg-transparent hover:text-[#59DE00] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? "Elaborazione in corso..." : "Conferma Ricarica"}
            </button>
        </form>
    );
};