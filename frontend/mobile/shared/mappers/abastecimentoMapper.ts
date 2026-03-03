
import { Abastecimento } from '../types/Abastecimento/abastecimento';
import {
  AbastecimentoFormData,
} from '../../shared/schemas/abastecimento.schema';


export function mapAbastecimentoToForm(abastecimento: Abastecimento): AbastecimentoFormData {
  return {
     abastecimentoData: abastecimento.abastecimentoData
      ? new Date(abastecimento.abastecimentoData)
      : new Date(),
    abastecimentoKm: abastecimento.abastecimentoKm ?? 0,
    abastecimentoLitros: abastecimento.abastecimentoLitros ?? '',
    abastecimentoObservacao: abastecimento.abastecimentoObservacao ?? '',
    abastecimentoPrazoPagamento: abastecimento.abastecimentoPrazoPagamento ?? undefined,
    abastecimentoTipoPagamento: abastecimento.abastecimentoTipoPagamento ?? undefined,
    abastecimentoValor: abastecimento.abastecimentoValor ?? '',
    caminhaoId: abastecimento.caminhaoId ?? '',
  };
}
