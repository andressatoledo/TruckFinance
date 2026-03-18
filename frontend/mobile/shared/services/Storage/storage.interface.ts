export interface IStorageProvider {
  upload(file: File): Promise<{
    url: string;
    nome: string;
    tipo: string;
    tamanho: number;
  }>;

  delete(url: string): Promise<void>;
}