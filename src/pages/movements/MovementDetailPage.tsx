import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovimentoDetail } from "../../services/movimenti.service";
import { formatDate } from "../../utils/formatDate";
import type { Movimento } from "../../types/movimento";
import jsPDF from "jspdf";

export const MovementDetail = () => {
    const { id } = useParams<{ id: string }>();

    const [movimento, setMovimento] = useState<Movimento | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const data = await getMovimentoDetail(id);
                setMovimento(data);
            } catch (err) {
                console.error("Errore nel recupero del movimento:", err);
                setError("Impossibile caricare i dettagli del movimento.");
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [id]);

    if (loading) {
        return <div className="text-center py-10 text-slate-400">Caricamento dettaglio...</div>;
    }

    if (error || !movimento) {
        return (
            <div className="text-center py-10 text-rose-400">
                <p>{error || "Movimento non trovato."}</p>
                <Link to="/homepage" className="text-emerald-400 underline mt-4 inline-block">
                    Torna alla Home
                </Link>
            </div>
        );
    }

    const isPositive = movimento.categoriaMovimento?.tipologia === "Entrata";

    const exportPDF = () => {
        if (!movimento) return;

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("GEMIT BANK - Dettaglio Movimento", 14, 20);

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Documento generato il: ${new Date().toLocaleDateString("it-IT")}`, 14, 28);

        doc.setLineWidth(0.5);
        doc.line(14, 32, 196, 32);

        doc.setFontSize(12);
        doc.setTextColor(0);

        const isPositive = movimento.importo > 0;
        const importoFormattato = isPositive
            ? `+€ ${movimento.importo.toFixed(2)}`
            : `-€ ${Math.abs(movimento.importo).toFixed(2)}`;

        doc.text(`ID Movimento: ${movimento.id}`, 14, 45);
        doc.text(`Data e Ora Operazione: ${formatDate(movimento.data)}`, 14, 65);
        doc.text(`Categoria: ${movimento.categoriaMovimento?.nomeCategoria || "Generale"}`, 14, 75);
        doc.text(`Importo: ${importoFormattato}`, 14, 85);

        if (movimento.saldo !== undefined) {
            doc.text(`Saldo Associato: € ${movimento.saldo.toFixed(2)}`, 14, 95);
        }

        doc.text("Descrizione Estesa:", 14, 110);
        doc.setFontSize(10);

        const splitText = doc.splitTextToSize(movimento.descrizioneEstesa, 180);
        doc.text(splitText, 14, 118);

        doc.save(`movimento_${movimento.id}.pdf`);
    };

    return (
        <div className="max-w-4xl mx-auto my-8 px-4 text-white">
            {/* Navigazione Superiore */}
            <div className="mb-4">
                <Link to="/homepage" className="text-xs text-emerald-400 hover:underline font-semibold flex items-center gap-1">
                    &larr; Torna alla Home
                </Link>
            </div>

            <div className="mb-6">
                <h1 className="text-2xl font-bold">Dettaglio Movimento</h1>
                <p className="text-xs text-slate-400 mt-1">
                    Visualizza i dati completi e la tracciabilità della transazione selezionata.
                </p>
            </div>

            {/* Scheda Operazione Main Container */}
            <div className="bg-[#0f1424] border border-slate-800 rounded-xl p-6 relative">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
                        <h2 className="font-bold text-white text-base">Scheda Operazione</h2>
                    </div>
                </div>

                {/* Griglia Dettagli */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 mb-6">
                    <div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-semibold mb-1">
                            Movimento ID
                        </span>
                        <span className="font-mono text-sm font-semibold text-slate-200">{movimento.id}</span>
                    </div>
                    <div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-semibold mb-1">
                            Data e Ora Operazione
                        </span>
                        <span className="text-sm font-semibold text-slate-200">{formatDate(movimento.data)}</span>
                    </div>

                    <div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-semibold mb-1">
                            Categoria Movimento
                        </span>
                        <span className="text-sm font-semibold text-slate-200">
                            {movimento.categoriaMovimento?.id ? `${movimento.categoriaMovimento.id} — ` : ""}
                            {movimento.categoriaMovimento?.nomeCategoria || "Generale"}
                        </span>
                    </div>

                    <div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-semibold mb-1">
                            Importo
                        </span>
                        <span className={`text-xl font-bold ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
                            {isPositive ? `+€ ${movimento.importo.toFixed(2)}` : `-€ ${Math.abs(movimento.importo).toFixed(2)}`}
                        </span>
                    </div>

                    <div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-semibold mb-1">
                            Saldo Contabile Associato
                        </span>
                        <span className="text-base font-bold text-slate-200">
                            € {movimento.saldo ? movimento.saldo.toLocaleString("it-IT", { minimumFractionDigits: 2 }) : "24.350,75"}
                        </span>
                    </div>
                </div>

                {/* Descrizione Estesa */}
                <div className="mb-2">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-semibold mb-2">
                        Descrizione Estesa
                    </span>
                    <div className="bg-[#0a0d18] border border-slate-800/80 rounded-lg p-3 text-xs text-slate-300 leading-relaxed font-mono">
                        {movimento.descrizioneEstesa}
                    </div>
                </div>
            </div>

            {/* Pulsanti Azione */}
            <div className="mt-6 flex justify-end items-center gap-3">
                <button
                    onClick={exportPDF}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Esporta PDF
                </button>

                <Link
                    to="/homepage"
                    className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors"
                >
                    Torna alla Home
                </Link>
            </div>
        </div>
    );
};