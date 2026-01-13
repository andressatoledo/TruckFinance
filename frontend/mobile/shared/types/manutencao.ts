export interface Manutencao {
  /** IDs */
  _id?: string;           // MongoDB padrão
  manutencaoId?: string;  // auto: true

  manutencaoDescricao: string;
  manutencaoData: string | Date;
  manutencaoKmRodados: number;

  manutencaoTipo: string;

  caminhaoId?: string;
  carretaId?: string;

  manutencaoObservacao?: string;
}
