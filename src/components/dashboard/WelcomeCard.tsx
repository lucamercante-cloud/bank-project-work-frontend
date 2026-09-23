import { SaldoLayout } from "../layout/saldoLayout";

interface WelcomeCardProps {
    nome?: string;
    cognome?: string;
    saldoFinale: number
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
            <SaldoLayout saldoFinale={saldoFinale} />
        </div>
    );
};
