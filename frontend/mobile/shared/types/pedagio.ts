export interface Pedagio {
  /** IDs */
  _id?: string;         // MongoDB padrão
  pedagioId?: string;   // auto: true

  pedagioNome: string;
  pedagioRodovia: string;
  pedagioLocalizacao: string;
}
