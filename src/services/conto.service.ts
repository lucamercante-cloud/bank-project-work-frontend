import { api } from "./api";
import type { ContoCorrente } from "../types/conto";

export async function me(): Promise<ContoCorrente> {
    const response = await api.get<ContoCorrente>("/conto-corrente/me");
    return response.data;
}