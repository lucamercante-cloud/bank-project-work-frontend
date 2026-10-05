import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WelcomeCard } from "../../components/dashboard/WelcomeCard";
import { BalanceCard } from "../../components/dashboard/BalanceCard";
import { Filter } from "../../components/dashboard/filter";
import { RecentMovements } from "../../components/dashboard/RecentMovements";

import { me } from "../../services/conto.service";
import { getMovimenti } from "../../services/movimenti.service";
import { getCategorie } from "../../services/categorie.service";

export const HomePage = () => {
    const navigate = useNavigate();
    const [conto, setConto] = useState<any>(null);
    const [movimenti, setMovimenti] = useState<any[]>([]);
    const [categorie, setCategorie] = useState<any[]>([]);
    const [saldoFinale, setSaldoFinale] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState(false);

    // Caricamento iniziale dei dati con verifica del Token
    useEffect(() => {
        const loadInitialData = async () => {
            // 1. Verifica immediata della presenza del token
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login", { replace: true });
                return;
            }

            try {
                const [contoRes, movRes, catRes] = await Promise.all([
                    me(),
                    getMovimenti({ n: 5 }),
                    getCategorie()
                ]);
                setConto(contoRes);

                const listaMovimenti = Array.isArray(movRes)
                    ? movRes
                    : movRes?.movimenti || movRes?.data || [];

                const saldo = movRes.saldoFinale;
                setMovimenti(listaMovimenti);
                setSaldoFinale(saldo);

                const listaCategorie = Array.isArray(catRes)
                    ? catRes
                    : catRes?.categorie || catRes?.data || [];
                setCategorie(listaCategorie);

            } catch (err) {
                console.error("Errore nel caricamento della homepage:", err);
                // 2. Se il token c'era ma non è valido o è scaduto (errore API), pulisci e manda al login
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login", { replace: true });
            } finally {
                setLoading(false);
            }
        };

        loadInitialData();
    }, [navigate]);

    // Gestione della ricerca via filtri
    const handleFilterSearch = async (
        n: number,
        categoriaId: string,
        dataInizio: string,
        dataFine: string
    ) => {
        try {
            const filters: Record<string, any> = { n };
            if (categoriaId) filters.categoriaId = categoriaId;
            if (dataInizio) filters.dataInizio = dataInizio;
            if (dataFine) filters.dataFine = dataFine;
            const res = await getMovimenti(filters);

            const listaMovimenti = Array.isArray(res)
                ? res
                : res?.movimenti || res?.data || [];

            if (filters.categoriaId || filters.dataInizio || filters.dataFine) { setFilter(true) }
            else { setFilter(false) }

            setMovimenti(listaMovimenti);
        } catch (err) {
            console.error("Errore durante il filtraggio dei movimenti:", err);
        }
    };

    const handleExportCSV = async () => {
        try {
            const res = await getMovimenti({});
            const tuttiIMovimenti = Array.isArray(res)
                ? res
                : res?.movimenti || res?.data || [];

            if (tuttiIMovimenti.length === 0) {
                alert("Nessun movimento da esportare.");
                return;
            }

            // Intestazioni CSV
            const headers = ["ID", "Data", "Descrizione", "Categoria", "Tipologia", "Importo (€)"];

            // Mappatura delle righe
            const rows = tuttiIMovimenti.map((m: any) => [
                m.id,
                m.data,
                `"${(m.descrizioneEstesa || "").replace(/"/g, '""')}"`,
                `"${m.categoriaMovimento?.nomeCategoria || "Generale"}"`,
                m.categoriaMovimento?.tipologia || "-",
                m.importo
            ]);

            const csvContent =
                "data:text/csv;charset=utf-8,\uFEFF" +
                [headers.join(";"), ...rows.map((e: any[]) => e.join(";"))].join("\n");

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `estratto_conto_${new Date().toISOString().slice(0, 10)}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        catch (err) {
            console.error("Errore durante l'esportazione dei movimenti: ", err);
            alert("Si è verificato un errore durante l'esportazione");
        }
    };

    return (
        <div className="min-h-screen bg-[#070913] text-slate-100 font-sans">
            <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
                {!loading ? (
                    <>
                        {/* 1. Benvenuto + Saldo */}
                        <WelcomeCard
                            nome={conto?.nomeTitolare || conto?.nome}
                            cognome={conto?.cognomeTitolare || conto?.cognome}
                            saldoFinale={saldoFinale}
                        />

                        {/* 2. Accesso Rapido Bonifico */}
                        <BalanceCard />

                        {/* 3. Filtri di Ricerca */}
                        <Filter categorie={categorie} onSearch={handleFilterSearch} />

                        {/* 4. Tabella Ultimi Movimenti */}
                        <RecentMovements movimenti={movimenti} saldoFinale={saldoFinale} isFiltered={filter} onExport={handleExportCSV} />
                    </>
                ) : (
                    <div className="text-center py-20 text-slate-500 animate-pulse">
                        Caricamento dati del conto...
                    </div>
                )}
            </main>
        </div>
    );
};