import type { Provider } from "../types/Provider";

// Lista degli operatori telefonici supportati
export const PROVIDERS: Provider[] = [
    { id: "tim", name: "TIM", color: "border-blue-500/50 text-blue-400" },
    { id: "vodafone", name: "Vodafone", color: "border-red-500/50 text-red-400" },
    { id: "iliad", name: "Iliad", color: "border-rose-600/50 text-rose-500" },
    { id: "windtre", name: "WindTre", color: "border-orange-500/50 text-orange-400" },
];

// Tagli di ricarica disponibili in Euro
export const RECHARGE_AMOUNTS: number[] = [5, 10, 15, 20, 30, 50];