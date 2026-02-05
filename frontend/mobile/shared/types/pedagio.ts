export interface Pedagio {
  /** IDs */
  _id?: string;         // MongoDB padrão
  pedagioNome: string;
  pedagioRodovia?: string;
  pedagioLocalizacao?: string;
}
