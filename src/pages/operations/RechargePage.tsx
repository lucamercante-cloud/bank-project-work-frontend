import { useState } from "react";
import { RechargeLayout } from "../../components/layout/RechargeLayout";
import { PhoneRechargeForm} from "../../components/operations/RechargeForm";

export const PhoneRechargePage = () => {
    const [userBalance, setUserBalance] = useState(1250.00);

    return (
        <RechargeLayout>
            <main className="max-w-6xl w-full mx-auto px-8 py-10">
                {/* Header Pagina & Box Saldo */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">Ricarica Cellulare</h1>
                        <p className="text-xs text-slate-400 mt-1.5">
                            Ricarica il tuo credito telefonico in modo rapido, sicuro e tracciato.
                        </p>
                    </div>

                    {/* Card Saldo Disponibile */}
                    <div className="bg-[#0b101d] border border-slate-800/80 rounded-lg p-4 w-full md:w-64 shadow-lg">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                            SALDO DISPONIBILE
                        </p>
                        <p className="text-2xl font-extrabold text-[#59DE00]">
                            € {userBalance.toLocaleString("it-IT", { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                </div>

                {/* Form Operazione */}
                <PhoneRechargeForm
                    userBalance={userBalance}
                    onRechargeSuccess={(newBalance) => setUserBalance(newBalance)}
                />
            </main>
        </RechargeLayout>
    );
};