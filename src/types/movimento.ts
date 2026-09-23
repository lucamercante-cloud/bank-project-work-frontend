import type { CategoriaMovimento } from "./categoria";

export interface Movimento {
  id: string;
  data: string;
  importo: number;
  saldo: number;
  categoriaMovimento?: CategoriaMovimento;
  descrizioneEstesa: string;
}