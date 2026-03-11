import { View } from 'react-native';
import { useState, useCallback } from 'react';
import { Carteira } from '../../../components/Form/Carteira';
import { CarteiraItem } from '../../../components/Form/CarteiraItem';
import { FilterSheet } from '../../../components/Filtro/FilterSheet';
import { FakeBottomSheet } from '../../../components/Form/FakeButtonSheet';
import { useCarteira } from '../../../hooks/Pedagio/usePedagio';
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
import { ConfirmDialog } from '../../../components/Feedback/ConfirmDialog';
function description(item: TypePedagio): string {
  if (item.pedagioLocalizacao && item.pedagioRodovia) {
    return `Rod.: ${item.pedagioRodovia} • Loc.: ${item.pedagioLocalizacao}`;
  }

  if (item.pedagioLocalizacao) {
    return item.pedagioLocalizacao;
  }

  if (item.pedagioRodovia) {
    return item.pedagioRodovia;
  }

  return ''
}


export function Pedagio() {
  type PedagioNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'PedagioForm'
  >;

  const navigation = useNavigation<PedagioNavigationProp>();
  const { visible, abrir, fechar } = useFilterSheet();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
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
              onPressDelete={() => {
                setSelectedId(item._id ?? null);
                setConfirmVisible(true);
              }}
              
            />
          ))
        )}
      </Carteira>

      <ConfirmDialog
        visible={confirmVisible}
        title="Excluir pedágio"
        description="Deseja excluir este pedágio? Essa ação não poderá ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        danger
        onCancel={() => {
          setConfirmVisible(false);
          setSelectedId(null);
        }}
        onConfirm={() => {
          if (selectedId) {
            deletePedagio(selectedId);
          }
          setConfirmVisible(false);
          setSelectedId(null);
        }}
      />

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
