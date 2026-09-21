export interface ContoCorrente {
  contoCorrenteID: string;
  email: string;
  nomeTitolare: string;
  cognomeTitolare: string;
  dataApertura: Date;
  iban: string | null;
}