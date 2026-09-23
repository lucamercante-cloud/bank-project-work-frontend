import { useEffect, useState } from "react";
import { WelcomeCard } from "../../components/dashboard/WelcomeCard";
import { BalanceCard } from "../../components/dashboard/BalanceCard";
import { Filter } from "../../components/dashboard/filter";
import { RecentMovements } from "../../components/dashboard/RecentMovements";

import { me } from "../../services/conto.service";
import { getMovimenti } from "../../services/movimenti.service";
import { getCategorie } from "../../services/categorie.service";

export const HomePage = () => {
    const [conto, setConto] = useState<any>(null);
    const [movimenti, setMovimenti] = useState<any[]>([]);
    const [categorie, setCategorie] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Caricamento iniziale dei dati (Profilo, Categorie e ultimi 5 movimenti)
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const [contoRes, movRes, catRes] = await Promise.all([
                    me(),
                    getMovimenti({ n: 5 }), // Scarica i primi 5 movimenti
                    getCategorie()
                ]);
                setConto(contoRes);

                const listaMovimenti = Array.isArray(movRes)
                    ? movRes
                    : movRes?.movimenti || movRes?.data || [];
                setMovimenti(listaMovimenti);

                const listaCategorie = Array.isArray(catRes)
                    ? catRes
                    : catRes?.categorie || catRes?.data || [];
                setCategorie(listaCategorie);

            } catch (err) {
                console.error("Errore nel caricamento della homepage:", err);
            } finally {
                setLoading(false);
            }
        };

        loadInitialData();
    }, []);

    // Gestione della ricerca via filtri
    const handleFilterSearch = async (filters: any) => {
        try {
            const data = await getMovimenti(filters);
            setMovimenti(data);
        } catch (err) {
            console.error("Errore durante il filtraggio dei movimenti:", err);
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
                            saldo={conto?.saldo}
                        />

                        {/* 2. Accesso Rapido Bonifico */}
                        <BalanceCard />

                        {/* 3. Filtri di Ricerca */}
                        <Filter categorie={categorie} onSearch={handleFilterSearch} />

                        {/* 4. Tabella Ultimi Movimenti */}
                        <RecentMovements movimenti={movimenti} saldoFinale={conto?.saldo} />
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