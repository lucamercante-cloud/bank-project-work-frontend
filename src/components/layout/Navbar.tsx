import { NavLink, useNavigate } from "react-router-dom";
import { me } from "../../services/conto.service";
import { useEffect, useState } from "react";
import type { ContoCorrente } from "../../types/conto";
import { logout } from "../../services/auth.service";

const Navbar = () => {
    const navigate = useNavigate();

    const listBtnsNav = [
        { label: "Home", navigation: "/homepage" },
        { label: "Ricerca movimenti", navigation: "/ricerca-movimenti" },
        { label: "Ricarica", navigation: "/ricarica" },
        { label: "Bonifico", navigation: "/bonifico" },
        { label: "Profilo", navigation: "/profilo" },
    ];

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const [profile, setProfile] = useState<ContoCorrente | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await me();
                setProfile(data);
            }
            catch (err) {
                console.error("Errore nel recupero del profilo:", err);
            }
        };
        fetchProfile();
    }, []);

    const getInitials = (nome?: string, cognome?: string) => {
        if (!nome && !cognome) return "U";
        return `${nome?.charAt(0) || ''}${cognome?.charAt(0) || ''}`.toUpperCase();
    };

    return (
        /* Aggiunte le classi `sticky top-0 z-50` e `shadow-lg` */
        <nav className="sticky top-0 z-50 bg-[#090b16] border-b border-slate-800/80 px-8 py-3.5 w-full flex items-center justify-between text-slate-300 text-sm shadow-lg">
            {/* 1. SEZIONE SINISTRA: Logo + Link di Navigazione */}
            <div className="flex items-center gap-10">
                {/* Logo GEMIT BANK */}
                <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center p-1.5 shadow-md">
                        <img src="src/assets/gemini-svg.svg" alt="logo" className="w-full h-full object-contain" />
                    </div>
                    <NavLink to="/homepage">
                        <span className="font-extrabold text-white text-base tracking-wider">
                            GEMIT<span className="text-lime-400">BANK</span>
                        </span>
                    </NavLink>
                </div>

                {/* Lista Link */}
                <div className="flex items-center gap-6">
                    {listBtnsNav.map((btn, index) => (
                        <NavLink
                            key={index}
                            to={btn.navigation}
                            className={({ isActive }) =>
                                `px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${isActive
                                    ? "bg-emerald-950/80 text-lime-400 border border-lime-400/30 font-semibold"
                                    : "text-slate-400 hover:text-slate-200"
                                }`
                            }
                        >
                            {btn.label}
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* 2. SEZIONE DESTRA: Profilo Utente + Esci */}
            <div className="flex items-center gap-6">
                {profile ? (
                    <div className="flex items-center gap-3">
                        {/* Iniziali utente */}
                        <div className="w-9 h-9 bg-emerald-400 text-slate-950 font-bold text-xs rounded-full flex items-center justify-center shadow-sm">
                            {getInitials(profile.nomeTitolare, profile.cognomeTitolare)}
                        </div>
                        {/* Nome, Cognome e Numero Conto presi da `profile` */}
                        <div className="flex flex-col text-left">
                            <span className="font-bold text-white text-xs uppercase tracking-wide leading-tight">
                                {profile.nomeTitolare} {profile.cognomeTitolare}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">
                                Private Account #{profile.iban || profile.id}
                            </span>
                        </div>
                    </div>
                ) : (
                    /* Skeleton / Placeholder durante il caricamento */
                    <div className="text-xs text-slate-500 animate-pulse">Caricamento...</div>
                )}

                <div className="h-6 w-[1px] bg-slate-800"></div>

                <button
                    onClick={handleLogout}
                    className="text-xs font-semibold text-rose-500 hover:text-rose-400 underline transition-colors"
                >
                    Esci
                </button>
            </div>
        </nav>
    );
};

export default Navbar;