import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import type { Movimento } from "../../types/movimento";

interface RecentMovementsProps {
    movimenti: Movimento[];
    saldoFinale: number
}

export const RecentMovements = ({ movimenti, saldoFinale }: RecentMovementsProps) => {
    return (
        <div className="bg-[#0f1424] border border-slate-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
                    <h3 className="font-bold text-white text-base">Ultimi {movimenti.length} Movimenti</h3>
                </div>
                <span className="text-[10px] text-slate-500">Valuta: EUR (€)</span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                    <thead>
                        <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                            <th className="pb-3">Data</th>
                            <th className="pb-3">Descrizione</th>
                            <th className="pb-3 text-center">Categoria</th>
                            <th className="pb-3 text-right">Importo</th>
                            <th className="pb-3 text-right">Dettagli</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                        {movimenti.map((m) => {
                            const isPositive = m.categoriaMovimento?.tipologia === "Entrata";
                            return (
                                <tr key={m.id} className="hover:bg-slate-900/40 transition-colors">
                                    <td className="py-3.5 text-slate-400">{formatDate(m.data)}</td>
                                    <td className="py-3.5 font-medium text-white">{m.descrizioneEstesa}</td>
                                    <td className="py-3.5 text-center">
                                        <span className="px-3 py-1 rounded-full text-[10px] font-medium border border-slate-700 bg-slate-900 text-slate-300">
                                            {m.categoriaMovimento?.nomeCategoria || "Generale"}
                                        </span>
                                    </td>
                                    <td className={`py-3.5 text-right font-bold ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
                                        {isPositive ? `+€ ${m.importo.toFixed(2)}` : `-€ ${Math.abs(m.importo).toFixed(2)}`}
                                    </td>
                                    <td className="py-3.5 text-right">
                                        <Link to={`/movimenti/${m.id}`} className="text-emerald-400 hover:underline font-semibold">
                                            Dettagli
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-500">I saldi si intendono aggiornati in tempo reale.</span>
                <span className="font-bold text-slate-300">
                    Saldo Finale: <span className="text-emerald-400 text-base ml-2">€ {saldoFinale?.toLocaleString("it-IT", { minimumFractionDigits: 2 })}</span>
                </span>
            </div>
        </div>
    );
};