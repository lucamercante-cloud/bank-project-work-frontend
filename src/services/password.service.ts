import { api } from "./api";
import type { Changepass } from "../types/changepass";

export const changePassword = async (payload: Changepass): Promise<boolean> => {
    // Eseguiamo la richiesta PATCH
    const response = await api.patch("/conto-corrente/password", payload);
    
    // Se il server risponde con status 200 o 204 (No Content), l'operazione è andata a buon fine
    return response.status === 200 || response.status === 204;
};