import { Mode } from '../../shared/types/mode';

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
};
