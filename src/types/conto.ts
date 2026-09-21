export interface ContoCorrente {
  id: string;
  email: string;
  nomeTitolare: string;
  cognomeTitolare: string;
  dataApertura: string;
  iban?: string | null;
}