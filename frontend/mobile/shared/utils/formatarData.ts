export function formatarData(data?: Date | string) {
  if (!data){
    return '--/--/----';
  }
    
  return new Date(data).toLocaleDateString('pt-BR');
}