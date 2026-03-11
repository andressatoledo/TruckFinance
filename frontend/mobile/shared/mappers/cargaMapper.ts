import { Carga } from "../types/Carga/carga";
import { CargaFormData } from "../schemas/carga.schema";

export function mapCargaToForm(
  carga: Carga
): CargaFormData {
  return {
    cargaTipo: carga.cargaTipo,
  };
}