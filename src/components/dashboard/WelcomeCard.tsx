import { Link } from "react-router-dom";

interface WelcomeCardProps {
    nome?: string;
    cognome?: string;
    saldoFinale?: number;
}

export const WelcomeCard = ({ nome, cognome, saldoFinale }: WelcomeCardProps) => {
    return (
        <div className="bg-[#0f1424] border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                    Benvenuto, {nome} {cognome}
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                    Monitora lo stato dei tuoi asset ed esegui operazioni di tesoreria in tempo reale.
                </p>
            </div>

            <div className="bg-[#141b2d] border border-slate-800 rounded-lg p-4 text-right min-w-[220px]">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Saldo Conto Corrente
                </span>
                <span className="text-2xl font-extrabold text-emerald-400 block mt-0.5">
                    € {saldoFinale?.toLocaleString("it-IT", { minimumFractionDigits: 2 }) ?? "0,00"}
                </span>
                <span className="text-[10px] text-emerald-500 font-medium flex items-center justify-end gap-1 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Fondi disponibili e garantiti
                </span>
            </div>
        </div>
    );
};
