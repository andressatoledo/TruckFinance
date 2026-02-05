import { View } from 'react-native';
import { useState,useCallback } from 'react';
import { Carteira } from '../../../components/Form/Carteira';
import { CarteiraItem } from '../../../components/Form/CarteiraItem';
import { FilterSheet } from '../../../components/Filtro/FilterSheet';
import { FakeBottomSheet } from '../../../components/Form/FakeButtonSheet';
import { useCarteira } from '../../../hooks/usePedagio';
import { useFilterSheet } from '../../../hooks/useFilterSheet';
import { useGenericFilter } from '../../../hooks/useGenericFilter';
import { PedagioFiltro } from './filtro';
import type FiltroPedagio from '../../../../shared/types/pedagioFiltro';
import { CarteiraHeader } from '../../../components/Form/CarteiraHeader';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/types'; // ajuste o path
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

export function Pedagio() {

    type PedagioNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PedagioForm'
>;

   const navigation = useNavigation<PedagioNavigationProp>();
  const { visible, abrir, fechar } = useFilterSheet();

  const {
    filters,
    setFilters,
    clearFilters,
  } = useGenericFilter<FiltroPedagio>();

  const { dados, buscarCarteira } = useCarteira();

  const [busca, setBusca] = useState('');


//   useEffect(() => {
//     buscarCarteira();
//   }, [buscarCarteira]);


//   useEffect(() => {
//     buscarCarteira({
//       ...filters,
//       pedagioNome: busca,
//     });
//   },  [busca, filters, buscarCarteira]);

    useFocusEffect(
    useCallback(() => {
        buscarCarteira({
        ...filters,
        pedagioNome: busca,
        });
    }, [buscarCarteira, filters, busca])
    );

  return (
    <View style={{ flex: 1 }}>
      <Carteira title="Pedágio">

        <CarteiraHeader
          placeholder="Buscar pedágio..."
          searchValue={busca}
          onSearchChange={setBusca}
          onFilterPress={abrir}
          onAddPress={() => {
            console.log('abrindo')
             navigation.navigate('PedagioForm', { mode: 'create' });
          }}
        />

        {dados.map((item) => (
          <CarteiraItem
            key={item._id}
            icon="boom-gate"
            title={item.pedagioNome}
            description={`${item.pedagioRodovia} - ${item.pedagioLocalizacao}`}
            onPress={() => {
              navigation.navigate(
                'PedagioForm',
                { pedagioId: item._id, mode: 'edit' } 
              );
            }}
          />
        ))}
      </Carteira>

    
      <FakeBottomSheet visible={visible} onClose={fechar}>
        <FilterSheet
          filters={PedagioFiltro}
          filtroAtual={filters}
          onApply={(data) => {
            setFilters(data);
            buscarCarteira({
              ...data,
              pedagioNome: busca,
            });
            fechar();
          }}
          onClear={() => {
            clearFilters();
            buscarCarteira({ pedagioNome: busca });
            fechar();
          }}
        />
      </FakeBottomSheet>
    </View>
  );
}
