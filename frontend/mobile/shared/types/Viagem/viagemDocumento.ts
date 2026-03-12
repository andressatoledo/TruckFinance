
export type ViagemDocumentoTipo = String;

export interface ViagemDocumento {
  _id?: string; 

  viagemDocumentoTipo: ViagemDocumentoTipo;

  viagemDocumentoNome: string;

  viagemDocumentoUrl: string;

  viagemDocumentoMimeType: string;

  viagemDocumentoTamanho: number;

  viagemDocumentoDataUpload?: Date;

  viagemId: string;

  viagemDocumentoObservacao?: string;

  viagemDocumentoStatus?: 'Ativo' | 'Inativo';

  createdAt?: Date;
  updatedAt?: Date;
}
