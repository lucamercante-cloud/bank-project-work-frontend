import type{ ReactNode } from "react";

interface BonificoLayoutProps {
    children: ReactNode;
}

export const BonificoLayout = ({ children }: BonificoLayoutProps) => {
    return (
        <div className="max-w-xl mx-auto bg-[#0b101d] border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            {children}
        </div>
    );
};