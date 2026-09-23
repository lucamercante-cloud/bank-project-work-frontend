import { useNavigate } from "react-router-dom";
import type { BackendBonificoResponse } from "../../types/BackendBonificoResponse";
import type { BonificoRequest } from "../../types/BonificoRequest";

interface BonificoSuccessCardProps {
    backendData: BackendBonificoResponse;
    formData: BonificoRequest;
    onReset: () => void;
}

export const BonificoSuccessCard = ({
    backendData,
    formData,
    onReset
}: BonificoSuccessCardProps) => {
    const navigate = useNavigate();

    const dataFormattata = backendData.data
        ? new Date(backendData.data).toLocaleDateString("it-IT")
        : formData.dataEsecuzione;

    return (
        <div className="max-w-md mx-auto bg-[#0b101d] border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl text-center">
            
            <div className="flex justify-center mb-4">
                <div className="w-14 h-14 rounded-full border-2 border-[#59DE00] flex items-center justify-center bg-[#59DE00]/10">
                    <svg
                        className="w-7 h-7 text-[#59DE00]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
            </div>

            <h2 className="text-xl font-extrabold text-white mb-1">
                Bonifico completato!
            </h2>
            <p className="text-xs text-slate-400 mb-6">
                L'operazione è stata presa in carico correttamente.
            </p>

            <div className="bg-[#070913] border border-slate-800/80 rounded-xl p-4 text-left space-y-3 mb-6 text-xs">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                    Dettagli operazione
                </p>

                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Beneficiario</span>
                    <span className="text-white font-semibold">{formData.beneficiario}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-slate-400">IBAN</span>
                    <span className="text-white font-medium tracking-wide">{formData.iban}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Importo</span>
                    <span className="text-[#59DE00] font-bold">
                        € {backendData.importo.toFixed(2)}
                    </span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Commissione</span>
                    <span className="text-slate-300">€ 0,00</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Data esecuzione</span>
                    <span className="text-slate-300">{dataFormattata}</span>
                </div>

                <div className="border-t border-slate-800/80 pt-2.5 flex justify-between items-center">
                    <span className="text-slate-400">ID Operazione</span>
                    <span className="text-slate-400 text-[11px] font-mono">
                        {backendData.id}
                    </span>
                </div>
            </div>

            <div className="space-y-3">
                <button
                    onClick={() => navigate("/homepage")}
                    className="w-full bg-[#59DE00] hover:bg-[#4bc200] text-black font-extrabold py-3 px-6 rounded-lg transition-all text-xs uppercase tracking-wide cursor-pointer"
                >
                    Torna alla Home
                </button>

                <button
                    onClick={onReset}
                    className="block w-full text-center text-xs font-semibold text-[#59DE00] hover:underline pt-1 cursor-pointer"
                >
                    Fai un altro bonifico
                </button>
            </div>
        </div>
    );
};