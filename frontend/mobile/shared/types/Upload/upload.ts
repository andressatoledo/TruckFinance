//Arquivo enquanto local
export type UploadFile = {
  uri: string;
  nome: string;
  tipo: string;
  tamanho?: number;
  dataUpload?: Date;
};

//Arquivo salvo
export type StoredFile = {
  url: string;
  nome: string;
  tipo: string;
  tamanho?: number;
  dataUpload?: Date;
};

export type FileItem = {
  uri?: string; // enquanto não sobe
  url?: string; // depois que sobe
  nome: string;
  tipo: string;
  tamanho?: number;
  dataUpload?: Date;
};