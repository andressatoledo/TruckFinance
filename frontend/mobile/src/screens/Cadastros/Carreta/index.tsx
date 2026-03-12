import { View } from 'react-native';
import { useState, useCallback } from 'react';
import { Carteira } from '../../../components/Form/Carteira';
import { CarteiraItem } from '../../../components/Form/CarteiraItem';
import { FilterSheet } from '../../../components/Filtro/FilterSheet';
import { FakeBottomSheet } from '../../../components/Form/FakeButtonSheet';
import { useCarteira } from '../../../hooks/Carreta/useCarreta';
import { useFilterSheet } from '../../../hooks/Filter/useFilterSheet';
import { useGenericFilter } from '../../../hooks/Filter/useGenericFilter';
import { CarretaFiltro } from './filtro';
import type FiltroCarreta  from '../../../../shared/types/Carreta/carretaFiltro';
import { CarteiraHeader } from '../../../components/Form/CarteiraHeader';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/types'; // ajuste o path
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { Carreta as TypeCarreta } from '../../../../shared/types/Carreta/carreta';
import { EmptyCarteira } from '../../../components/Feedback/EmptyCarteira';
import { ConfirmDialog } from '../../../components/Feedback/ConfirmDialog';

function description(item: TypeCarreta): string {
  if (item.carretaPlaca && item.carretaStatus ) {
    return `${item.carretaPlaca} • ${item.carretaStatus}`;
  }

  return ''
}


export function Carreta() {
  type CarretaNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Carreta'
  >;

  const navigation = useNavigation<CarretaNavigationProp>();
  const { visible, abrir, fechar } = useFilterSheet();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { filters, setFilters, clearFilters } =
    useGenericFilter<FiltroCarreta>();

  const { dados, buscarCarteira, deleteCarreta } = useCarteira();

  const [busca, setBusca] = useState('');

  useFocusEffect(
    useCallback(() => {
      buscarCarteira({
        ...filters,
        carretaPlaca: busca,
      });
    }, [buscarCarteira, filters, busca]),
  );

  return (
    <View style={{ flex: 1 }}>
      <Carteira title="Carreta">
        <CarteiraHeader
          placeholder="Buscar carreta..."
          searchValue={busca}
          onSearchChange={setBusca}
          onFilterPress={abrir}
          onAddPress={() => {
            navigation.navigate('CarretaForm', { mode: 'create' });
          }}
        />
        {dados.length === 0 ? (
          <EmptyCarteira />
        ) : (
          dados.map(item => (
            <CarteiraItem
              key={item._id}
              icon="truck"
             title={item.carretaTipo}
              description={description(item)}
              onPress={() => {
                navigation.navigate('CarretaForm', {
                  carretaId: item._id,
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
        title="Excluir carreta"
        description="Deseja excluir esta carreta? Essa ação não poderá ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        danger
        onCancel={() => {
          setConfirmVisible(false);
          setSelectedId(null);
        }}
        onConfirm={() => {
          if (selectedId) {
            deleteCarreta(selectedId);
          }
          setConfirmVisible(false);
          setSelectedId(null);
        }}
      />

      <FakeBottomSheet visible={visible} onClose={fechar}>
        <FilterSheet
          filters={CarretaFiltro}
          filtroAtual={filters}
          onApply={data => {
            setFilters(data);
            buscarCarteira({
              ...data,
              carretaPlaca: busca,
            });
            fechar();
          }}
          onClear={() => {
            clearFilters();
            buscarCarteira({ carretaPlaca: busca });
            fechar();
          }}
        />
      </FakeBottomSheet>
    </View>
  );
}
