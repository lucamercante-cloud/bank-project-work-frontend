export interface BonificoRequest {
    beneficiario: string;
    importo: number;
    iban: string;
    causale: string;
    dataEsecuzione: string;
}