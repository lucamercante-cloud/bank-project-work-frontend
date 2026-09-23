import { useEffect, useState } from "react";
import { SaldoLayout } from "../../components/layout/saldoLayout";
import { RechargeLayout } from "../../components/layout/RechargeLayout";
import { PhoneRechargeForm } from "../../components/operations/RechargeForm";
import { getMovimenti } from "../../services/movimenti.service";

export const PhoneRechargePage = () => {
    const [saldoFinale, setSaldoFinale] = useState<number>(0);

    // Funzione per richiedere l'ultimo saldo dal service
    const fetchSaldo = async () => {
        try {
            const movRes = await getMovimenti({ n: 1 });
            // Legge direttamente la proprietà saldoFinale dalla risposta API
            const saldo = movRes?.saldoFinale ?? 0;
            setSaldoFinale(saldo);
        } catch (error) {
            console.error("Errore durante il recupero del saldo:", error);
        }
    };

    // Recupera il saldo all'avvio della pagina
    useEffect(() => {
        fetchSaldo();
    }, []);

    return (
        <RechargeLayout>
            <main className="max-w-6xl w-full mx-auto px-8 py-10">
                {/* Header Pagina & Box Saldo */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">Ricarica Cellulare</h1>
                        <p className="text-xs text-slate-400 mt-1.5">
                            Ricarica il tuo credito telefonico in modo rapido, sicuro e tracciato.
                        </p>
                    </div>

                    {/* SaldoLayout riceve saldoFinale */}
                    <SaldoLayout saldoFinale={saldoFinale} />
                </div>

                {/* Form Operazione: richiama fetchSaldo quando la ricarica va a buon fine */}
                <PhoneRechargeForm onRechargeSuccess={fetchSaldo} />
            </main>
        </RechargeLayout>
    );
};