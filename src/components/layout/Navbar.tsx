import { NavLink, useNavigate } from "react-router-dom";
import { me } from "../../services/conto.service";
import { useEffect, useState } from "react";
import type { ContoCorrente } from "../../types/conto";
import { logout } from "../../services/auth.service";
import logoSvg from "../../assets/gemini-svg.svg";

const Navbar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const listBtnsNav = [
        { label: "Home", navigation: "/homepage" },
        { label: "Ricarica", navigation: "/ricarica" },
        { label: "Bonifico", navigation: "/bonifico" }
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

    const linkClass = (isActive: boolean) =>
        `px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${isActive
            ? "bg-emerald-950/80 text-lime-400 border border-lime-400/30 font-semibold"
            : "text-slate-400 hover:text-slate-200"
        }`;

    return (
        <nav className="sticky top-0 z-50 bg-[#090b16] border-b border-slate-800/80 w-full text-slate-300 text-sm shadow-lg">
            <div className="px-4 sm:px-8 py-3.5 flex items-center justify-between">
                {/* 1. SEZIONE SINISTRA: Logo + Link di Navigazione */}
                <div className="flex items-center gap-10">
                    <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center p-1.5 shadow-md">
                            <img src={logoSvg} alt="logo" className="w-full h-full object-contain" />
                        </div>
                        <NavLink to="/homepage">
                            <span className="font-extrabold text-white text-base tracking-wider">
                                GEMIT<span className="text-lime-400">BANK</span>
                            </span>
                        </NavLink>
                    </div>

                    {/* Link: solo desktop */}
                    <div className="hidden md:flex items-center gap-6">
                        {listBtnsNav.map((btn, index) => (
                            <NavLink
                                key={index}
                                to={btn.navigation}
                                className={({ isActive }) => linkClass(isActive)}
                            >
                                {btn.label}
                            </NavLink>
                        ))}
                    </div>
                </div>

                {/* 2. SEZIONE DESTRA */}
                <div className="flex items-center gap-4 md:gap-6">
                    {profile ? (
                        <NavLink to="/profilo">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-emerald-400 text-slate-950 font-bold text-xs rounded-full flex items-center justify-center shadow-sm">
                                    {getInitials(profile.nomeTitolare, profile.cognomeTitolare)}
                                </div>
                                {/* Nome e conto: nascosti sotto sm */}
                                <div className="hidden sm:flex flex-col text-left">
                                    <span className="font-bold text-white text-xs uppercase tracking-wide leading-tight">
                                        {profile.nomeTitolare} {profile.cognomeTitolare}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-medium">
                                        Private Account #{profile.iban || profile.id}
                                    </span>
                                </div>
                            </div>
                        </NavLink>
                    ) : (
                        <div className="text-xs text-slate-500 animate-pulse">Caricamento...</div>
                    )}

                    <div className="hidden md:block h-6 w-px bg-slate-800"></div>

                    <button
                        onClick={handleLogout}
                        className="hidden md:block px-4 py-1.5 rounded-xl border-2 border-red-500 bg-[#060a12] text-red-500 text-xs font-bold hover:bg-red-500 hover:text-black transition-all duration-200 cursor-pointer"
                    >
                        Esci
                    </button>

                    {/* Hamburger: solo mobile */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-1.5 text-slate-300 hover:text-white cursor-pointer"
                        aria-label="Menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 6l12 12M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Menu mobile */}
            {menuOpen && (
                <div className="md:hidden border-t border-slate-800/80 px-4 py-3 flex flex-col gap-2">
                    {listBtnsNav.map((btn, index) => (
                        <NavLink
                            key={index}
                            to={btn.navigation}
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) => `block ${linkClass(isActive)}`}
                        >
                            {btn.label}
                        </NavLink>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="mt-1 w-full px-4 py-2 rounded-xl border-2 border-red-500 bg-[#060a12] text-red-500 text-xs font-bold hover:bg-red-500 hover:text-black transition-all duration-200 cursor-pointer"
                    >
                        Esci
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;