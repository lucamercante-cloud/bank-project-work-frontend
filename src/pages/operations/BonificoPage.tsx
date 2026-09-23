import { useState, useEffect } from "react";
import { SaldoLayout } from "../../components/layout/saldoLayout";
import { BonificoForm } from "../../components/operations/BonificoForm";
import { BonificoSuccessCard } from "../../components/operations/BonificoSuccessCard";
import { getMovimenti } from "../../services/movimenti.service";
import { processBonifico } from "../../services/bonifico.service";
import type { BonificoRequest } from "../../types/BonificoRequest";
import type { BackendBonificoResponse } from "../../types/BackendBonificoResponse";



export const BonificoPage = () => {
    const [saldoFinale, setSaldoFinale] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const [completedTransaction, setCompletedTransaction] = useState<{
        backendData: BackendBonificoResponse;
        formData: BonificoRequest;
    } | null>(null);

    // Funzione per richiedere il saldo aggiornato REALE al backend
    const fetchSaldo = async () => {
        try {
            const movRes = await getMovimenti({ n: 1 });
            const saldoNumerico = Number(movRes?.saldoFinale) || 0;
            setSaldoFinale(saldoNumerico);
        } catch (error) {
            console.error("Errore nel recupero del saldo:", error);
        }
    };

    useEffect(() => {
        fetchSaldo();
    }, []);

    const handleBonificoSubmit = async (formData: BonificoRequest) => {
        setIsLoading(true);
        setServerError(null);

        try {
            // 1. Inviamo la richiesta POST per registrare la transazione nel DB backend
            const backendResponse = await processBonifico(formData);

            setCompletedTransaction({
                backendData: backendResponse,
                formData: formData
            });

            // 2. Richiediamo SUBITO il saldo aggiornato al backend (invece di calcolarlo visivamente)
            await fetchSaldo();

        } catch (err: any) {
            const errorMsg =
                err.response?.data?.message ||
                "Impossibile completare l'operazione. Riprova più tardi.";
            setServerError(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-6xl w-full mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">
                        Nuovo Bonifico
                    </h1>
                    <p className="text-xs text-slate-400 mt-1.5">
                        Invia denaro in modo rapido, sicuro e tracciato.
                    </p>
                </div>

                <SaldoLayout saldoFinale={saldoFinale} />
            </div>

            {completedTransaction ? (
                <BonificoSuccessCard
                    backendData={completedTransaction.backendData}
                    formData={completedTransaction.formData}
                    onReset={() => {
                        setCompletedTransaction(null);
                        setServerError(null);
                        fetchSaldo();
                    }}
                />
            ) : (
                <BonificoForm
                    saldoDisponibile={saldoFinale}
                    onSubmit={handleBonificoSubmit}
                    isLoading={isLoading}
                    serverError={serverError}
                />
            )}
        </div>
    );
};