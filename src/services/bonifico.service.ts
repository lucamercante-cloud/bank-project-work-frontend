import { api } from "./api";
import type { BonificoRequest } from "../types/BonificoRequest";
import type { BackendBonificoResponse } from "../types/BackendBonificoResponse";

export const processBonifico = async (
    data: BonificoRequest
): Promise<BackendBonificoResponse> => {
    const response = await api.post<BackendBonificoResponse>("/bonifici", data);
    return response.data;
};