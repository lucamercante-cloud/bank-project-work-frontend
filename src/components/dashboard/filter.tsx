import React, { useState } from "react";

interface FilterProps {
    categorie: Array<{ id: string; nomeCategoria: string }>;
    onSearch: (n: number, categoriaId: string, dataInizio: string, dataFine: string) => void;
}

export const Filter = ({ categorie, onSearch }: FilterProps) => {
    const [numMovimenti, setNumMovimenti] = useState(5);
    const [categoriaId, setCategoriaId] = useState("");
    const [dataInizio, setDataInizio] = useState("");
    const [dataFine, setDataFine] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(numMovimenti, categoriaId, dataInizio, dataFine);
    };

    return (
        <form onSubmit={handleSearch} className="bg-[#0f1424] border border-slate-800 rounded-xl p-6 text-xs">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-emerald-400 font-bold">|||</span>
                <span className="font-bold uppercase tracking-wider text-slate-300">Filtri di Ricerca Movimenti</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">N. Movimenti</label>
                    <input
                        type="number"
                        value={numMovimenti}
                        onChange={(e) => setNumMovimenti(Number(e.target.value))}
                        className="w-full bg-[#141b2d] border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Categoria</label>
                    <select
                        value={categoriaId}
                        onChange={(e) => setCategoriaId(e.target.value)}
                        className="w-full bg-[#141b2d] border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                    >
                        <option value="">Tutte le Categorie</option>
                        {categorie.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.nomeCategoria}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Data Da</label>
                    <input
                        type="date"
                        value={dataInizio}
                        onChange={(e) => setDataInizio(e.target.value)}
                        className="w-full bg-[#141b2d] border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Data A</label>
                    <input
                        type="date"
                        value={dataFine}
                        onChange={(e) => setDataFine(e.target.value)}
                        className="w-full bg-[#141b2d] border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full bg-[#59DE00] text-black font-bold py-2 rounded-lg hover:bg-white transition-all"
                    >
                        Cerca
                    </button>
                </div>
            </div>
        </form>
    );

}

