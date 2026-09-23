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
        </div>
    );
};
    