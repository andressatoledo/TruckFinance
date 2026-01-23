export type RootStackParamList = {
  ViagemForm: {
    mode: 'create' | 'edit' | 'view';
    viagemId?: string;
    navigation?: undefined;
  };
  
  Tabs: undefined;

  ViagemFilter: {
    navigation?: undefined;
  };
  
};
