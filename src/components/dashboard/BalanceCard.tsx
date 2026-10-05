import { Link } from "react-router-dom";

export const BalanceCard = () => {
    return (
        <div className="bg-[#0f1424] border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
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
            </div>
        </div>
    );
};