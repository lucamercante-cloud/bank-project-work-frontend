import { api } from "./api";
import type { RechargeTransaction } from "../types/RechargeTransaction";

export interface RechargeResponse {
    success?: boolean;
    message?: string;
    nuovoSaldo?: number;
}

export async function processRecharge(transaction: RechargeTransaction): Promise<RechargeResponse> {
    const response = await api.post<RechargeResponse>("/ricariche", transaction);
    return response.data;
}