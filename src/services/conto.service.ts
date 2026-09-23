import { api } from "./api";
import type { ContoCorrente } from "../types/conto";

export async function me(): Promise<ContoCorrente> {
    const response = await api.get<ContoCorrente>("/conto-corrente/me");
    return response.data;
}

export async function cambiaPassword(): Promise<undefined> {
    const response = await api.patch<undefined>("/conto-corrente/password");
    return response.data;
}