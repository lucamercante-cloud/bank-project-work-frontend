export interface BackendBonificoResponse {
    id: string;
    data: string;
    importo: number;
    saldo: number;
    categoriaMovimento: {
        id: string;
        nomeCategoria: string;
        tipologia: string;
    };
    descrizioneEstesa: string;
}