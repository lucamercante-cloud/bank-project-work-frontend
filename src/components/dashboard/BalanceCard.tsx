import { Link } from "react-router-dom";

export const BalanceCard = () => {
    return (
        <div className="bg-[#0f1424] border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                        Accesso Rapido
                    </span>
                </div>
                <h2 className="text-lg font-bold text-white">Inizia un Bonifico</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                    Apri subito la procedura di bonifico dalla Home, senza perdere di vista saldo, filtri e movimenti.
                </p>
            </div>

            <div className="flex items-center gap-3">
                <Link
                    to="/bonifico"
                    className="bg-[#59DE00] text-black font-bold text-xs px-5 py-2.5 rounded-lg hover:bg-white transition-all shadow-md flex items-center gap-2"
                >
                    Nuovo Bonifico &rarr;
                </Link>
                <Link
                    to="/ricerca-movimenti"
                    className="bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-all"
                >
                    Storico Bonifici
                </Link>
            </div>
        </div>
    );
};