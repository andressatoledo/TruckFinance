export function formatarData(data?: Date | string) {
    console.log('data',data)
  if (!data){
    return '--/--/----';
  }
    
  console.log(new Date(data).toLocaleDateString('pt-BR'))
  return new Date(data).toLocaleDateString('pt-BR');
}