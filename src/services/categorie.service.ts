import { api } from "./api";

export async function getCategorie() {
    const response = await api.get("/categorie")
    return response.data
}