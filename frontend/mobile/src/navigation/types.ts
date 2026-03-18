import { Mode } from '../../shared/types/Outros/mode';

export type RootStackParamList = {
  ViagemForm: {
    mode: Mode;
    viagemId?: string;
    navigation?: undefined;
  };

  Tabs: undefined;

  ViagemFilter: {
    navigation?: undefined;
  };

  Pedagio: {};

  PedagioForm: {
    mode: Mode;
    pedagioId?: string;
    navigation?: undefined;
  };

  Abastecimento: {};

  AbastecimentoForm: {
    mode: Mode;
    abastecimentoId?: string;
    navigation?: undefined;
  };

  Caminhao: {};

  CaminhaoForm: {
    mode: Mode;
    caminhaoId?: string;
    navigation?: undefined;
  };

  Carga: {};

  CargaForm: {
    mode: Mode;
    cargaId?: string;
    navigation?: undefined;
  };

  Carreta: {};

  CarretaForm: {
    mode: Mode;
    carretaId?: string;
    navigation?: undefined;
  };

  Empregadora: {};

  EmpregadoraForm: {
    mode: Mode;
    empregadoraId?: string;
    navigation?: undefined;
  };

  Manutencao: {};

  ManutencaoForm: {
    mode: Mode;
    manutencaoId?: string;
    navigation?: undefined;
  };
};
