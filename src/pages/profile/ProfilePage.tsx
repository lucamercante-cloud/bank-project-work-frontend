import { useEffect, useState } from "react";
import { me } from "../../services/conto.service";
import type { ContoCorrente } from "../../types/conto";
import { NavLink } from "react-router-dom";

export const ProfilePage = () => {

    const [profile, setProfile] = useState<ContoCorrente | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const dataProfile = await me()
                setProfile(dataProfile)
            }
            catch (err) {
                console.error("Errore nel caricamento del profilo: ", err);
            }
        };
        fetchProfile()
    }, []);

    return (
        <div className="max-w-4xl mx-auto my-8 px-4 text-white">
            {/* Header di Pagina */}
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Profilo Utente</h1>
                    <p className="text-xs text-slate-400 mt-1">
                        Gestisci le tue informazioni personali e le impostazioni del conto.
                    </p>
                </div>
                <NavLink
                    to="/homepage"
                    className="text-xs text-emerald-400 hover:underline font-semibold flex items-center gap-1"
                >
                    &larr; Torna alla Home
                </NavLink>
            </div>

            <div className="space-y-6">
                {/* Card 1: Dati Personali */}
                <div className="bg-[#0f1424] border border-slate-800 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800">
                        <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
                        <h2 className="font-bold text-white text-base">Informazioni Personali</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8">
                        <div>
                            <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-semibold mb-1">
                                Nome
                            </span>
                            <span className="text-sm font-semibold text-slate-200">{profile?.nomeTitolare}</span>
                        </div>

                        <div>
                            <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-semibold mb-1">
                                Cognome
                            </span>
                            <span className="text-sm font-semibold text-slate-200">{profile?.cognomeTitolare}</span>
                        </div>

                        <div>
                            <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-semibold mb-1">
                                Indirizzo Email
                            </span>
                            <span className="text-sm font-semibold text-slate-200">{profile?.email}</span>
                        </div>
                    </div>
                </div>

                {/* Card 2: Dettagli Conto */}
                <div className="bg-[#0f1424] border border-slate-800 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800">
                        <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
                        <h2 className="font-bold text-white text-base">Dettagli Conto Corrente</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8 mb-6">
                        <div>
                            <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-semibold mb-1">
                                IBAN
                            </span>
                            <span className="font-mono text-sm font-semibold text-slate-200">
                                {profile?.iban}
                            </span>
                        </div>

                        <div>
                            <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-semibold mb-1">
                                Tipologia Conto
                            </span>
                            <span className="text-sm font-semibold text-slate-200">Private Account GEMIT-AIZ</span>
                        </div>

                        <div>
                            <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-semibold mb-1">
                                Stato Conto
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-xs font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800">
                                <span className="w-1.5 h-1.5 rounded-2xl bg-emerald-400"></span>
                                Attivo
                            </span>

                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-y-6 gap-x-8 mt-8">
                        <button className="px-4 py-2 rounded-lg bg-red-600/60 hover:bg-red-600 text-xs font-semibold text-slate-200 transition-colors cursor-pointer">
                            Modifica Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}