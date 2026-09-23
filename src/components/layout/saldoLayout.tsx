interface saldoFinaleProps {
    saldoFinale: number
}

export const SaldoLayout = ({ saldoFinale }: saldoFinaleProps) => {

    return (
        <div className="bg-[#141b2d] border border-slate-800 rounded-lg p-4 text-right min-w-55">
            <span className="text-[10px] font-bold text-slate-200 uppercase tracking-wider block">
                Saldo Conto Corrente
            </span>
            <span className="text-2xl font-extrabold text-[#59DE00] block mt-0.5">
                € {saldoFinale.toLocaleString("it-IT", { minimumFractionDigits: 2 }) ?? "0,00"}
            </span>
            <span className="text-[10px] text-[#59DE00] font-medium flex items-center justify-end gap-1 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#59DE00]"></span> Fondi disponibili e garantiti
            </span>
        </div>
    )
}