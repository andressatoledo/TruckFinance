/** Enum baseado no schema */
export type ViagemStatus =
  | 'AguardandoPagamento'
  | 'Pago';

export const ViagemStatus = [
  'AguardandoPagamento',
  'Pago',
] as const;
  

/** Documentos da viagem (PDFs) */
export interface ViagemDocumentos {
  nota?: ArrayBuffer | string; 
  cte?: ArrayBuffer | string;
}

/**
 * 👉 No front:
 * - ArrayBuffer → upload
 * - string → quando vier Base64 da API
 */

/** Totais da viagem */
export interface ViagemTotais {
  viagemPedagios: number;
  viagemFrete: number;
  viagemLucro: number;
}

/** Entidade principal Viagem */
export interface Viagem {
  /** IDs */
  _id: string;                // MongoDB padrão
  viagemId?: string;           // auto: true no schema

  viagemNumero: number;
  viagemSerial: string;

  empregadoraId: string;

  viagemDataRegistro?: string | Date;

  viagemToneladaCarregada: number;
  viagemValorTonelada: number;

  rotaVinculadaId: string;

  viagemStatus?: ViagemStatus;

  viagemDataPagamento?: string | Date;
  viagemDataInicio?: string | Date;
  viagemDataFim?: string | Date;

  viagemHorarioChegada?: string;
  viagemHorarioSaida?: string;

  caminhaoId: string;
  motoristaId: string;
  carretaId: string;

  viagemDistancia?: number;

  viagemDocumentos?: ViagemDocumentos;

  viagemTotais?: ViagemTotais;
  
}

export type ViagemPayload = Partial<Omit<Viagem, '_id'>>;