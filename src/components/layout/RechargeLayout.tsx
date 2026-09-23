import type { ReactNode } from "react";
interface RechargeLayoutProps {
    children: ReactNode;
}

export const RechargeLayout = ({ children }: RechargeLayoutProps) => {
    return(
       
        <div className="min-h-screen bg-[#060a12] text-slate-100 flex flex-col justify-between selection:bg-[#59DE00] selection:text-black">
            <div className="flex-1 flex flex-col">
                {children}
            </div>
            {/* 3. FOOTER */}
            <footer className="border-t border-slate-800/60 bg-[#060a12] px-8 py-4 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p>Gemit Bank Corporation © 2026</p>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-slate-300 underline text-[#59DE00]">Privacy Policy</a>
                    <a href="#" className="hover:text-slate-300">Termini di Servizio</a>
                </div>
            </footer>
        </div>
    );
};
    