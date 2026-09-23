import { api } from "./api";

export async function getMovimenti(params?: { n?: number; categoriaId?: string; dataInizio?: string; dataFine?: string }) {
    const response = await api.get("/movimenti", { params })
    return response.data
}