export interface Movimento {
  movimentoID:  string;
  contoCorrenteID: number;
  data: Date;
  importo: number;
  saldo: number;
  categoriaMovimento: String;
  descrizioneEstesa: string;
}