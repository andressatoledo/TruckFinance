import { Carreta } from "../types/Carreta/carreta";
import { CarretaFormData } from "../schemas/carreta.schema";

export function mapCarretaToForm(
  carreta: Carreta
): CarretaFormData {
  return {

    carretaPlaca: carreta.carretaPlaca,
    carretaStatus: carreta.carretaStatus,
    carretaQuantidadeEixosCheio: carreta.carretaQuantidadeEixosCheio,
    carretaQuantidadeEixosVazio: carreta.carretaQuantidadeEixosVazio,
    carretaTipo: carreta.carretaTipo
  
  };
}