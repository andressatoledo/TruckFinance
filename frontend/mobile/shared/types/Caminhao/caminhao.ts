// src/types/caminhao.ts

export type CaminhaoStatus =
  | 'Ativo'
  | 'Inativo'
  | 'Manutenção';

export type DocumentoStatusIPVA =
  | 'Válido'
  | 'A vencer'
  | 'Vencido';

export type DocumentoStatusSeguro =
  | 'Válido'
  | 'Expirado';

export type DocumentoStatusCRLV =
  | 'Válido'
  | 'Em processo'
  | 'Vencido';


export interface Documento {
  dataExpiracao: string | Date;
  status: string;
}


export interface DocumentoIPVA extends Documento {
  status: DocumentoStatusIPVA;
}

export interface DocumentoSeguro extends Documento {
  status: DocumentoStatusSeguro;
}

export interface DocumentoCRLV extends Documento {
  status: DocumentoStatusCRLV;
}

/** Conjunto de documentos do caminhão */
export interface CaminhaoDocumentos {
  ipva: DocumentoIPVA;
  seguro: DocumentoSeguro;
  crlv: DocumentoCRLV;
}

/** Entidade Caminhao (frontend) */
export interface Caminhao {
  /** IDs */
  _id?: string;             // MongoDB
  caminhaoId?: string;      // auto: true

  caminhaoNome: string;
  caminhaoAnoFabricacao: number;
  caminhaoPlaca: string;

  caminhaoDocumentos: CaminhaoDocumentos;

  caminhaoCapacidadeDeCarga: number;

  caminhaoUltimaManutencao?: string | Date;
  caminhaoTrocaDeOleo?: string | Date;

  caminhaoStatus: CaminhaoStatus;

  empregadoraId: string;
}
