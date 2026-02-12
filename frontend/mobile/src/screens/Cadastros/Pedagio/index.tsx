import { View } from 'react-native';
import { useState, useCallback } from 'react';
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
import { Pedagio as TypePedagio } from '../../../../shared/types/pedagio';
import { EmptyCarteira } from '../../../components/Feedback/EmptyCarteira';

function description(item: TypePedagio) {
  if (item.pedagioLocalizacao && item.pedagioRodovia) {
    return `${item.pedagioRodovia} • ${item.pedagioLocalizacao}`;
  }

  if (item.pedagioLocalizacao) {
    return item.pedagioLocalizacao;
  }

  if (item.pedagioRodovia) {
    return item.pedagioRodovia;
  }
}

export function Pedagio() {
  type PedagioNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'PedagioForm'
  >;

  const navigation = useNavigation<PedagioNavigationProp>();
  const { visible, abrir, fechar } = useFilterSheet();

  const { filters, setFilters, clearFilters } =
    useGenericFilter<FiltroPedagio>();

  const { dados, buscarCarteira, deletePedagio } = useCarteira();

  const [busca, setBusca] = useState('');

  useFocusEffect(
    useCallback(() => {
      buscarCarteira({
        ...filters,
        pedagioNome: busca,
      });
    }, [buscarCarteira, filters, busca]),
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
            console.log('abrindo');
            navigation.navigate('PedagioForm', { mode: 'create' });
          }}
        />
        {dados.length === 0 ? (
          <EmptyCarteira />
        ) : (
          dados.map(item => (
            <CarteiraItem
              key={item._id}
              icon="boom-gate"
              title={item.pedagioNome}
              description={description(item)}
              onPress={() => {
                navigation.navigate('PedagioForm', {
                  pedagioId: item._id,
                  mode: 'edit',
                });
              }}
              onPressDelete={() => deletePedagio(item._id ?? '')}
            />
          ))
        )}
      </Carteira>

      <FakeBottomSheet visible={visible} onClose={fechar}>
        <FilterSheet
          filters={PedagioFiltro}
          filtroAtual={filters}
          onApply={data => {
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
