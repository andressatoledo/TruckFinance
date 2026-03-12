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

export interface CaminhaoDocumentos {
  ipva: DocumentoIPVA;
  seguro: DocumentoSeguro;
  crlv: DocumentoCRLV;
}
