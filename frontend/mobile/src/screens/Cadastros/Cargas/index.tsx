import { View } from 'react-native';
import { useState, useCallback } from 'react';
import { Carteira } from '../../../components/Form/Carteira';
import { CarteiraItem } from '../../../components/Form/CarteiraItem';
import { FilterSheet } from '../../../components/Filtro/FilterSheet';
import { FakeBottomSheet } from '../../../components/Form/FakeButtonSheet';
import { useCarteira } from '../../../hooks/Carga/useCarga';
import { useFilterSheet } from '../../../hooks/useFilterSheet';
import { useGenericFilter } from '../../../hooks/useGenericFilter';
import { CargaFiltro } from './filtro';
import type FiltroCarga  from '../../../../shared/types/Carga/cargaFiltro';
import { CarteiraHeader } from '../../../components/Form/CarteiraHeader';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/types'; // ajuste o path
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { EmptyCarteira } from '../../../components/Feedback/EmptyCarteira';
import { ConfirmDialog } from '../../../components/Feedback/ConfirmDialog';


export function Carga() {
  type CargaNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Carga'
  >;

  const navigation = useNavigation<CargaNavigationProp>();
  const { visible, abrir, fechar } = useFilterSheet();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { filters, setFilters, clearFilters } =
    useGenericFilter<FiltroCarga>();

  const { dados, buscarCarteira, deleteCarga } = useCarteira();

  const [busca, setBusca] = useState('');

  useFocusEffect(
    useCallback(() => {
      buscarCarteira({
        ...filters,
        cargaTipo: busca,
      });
    }, [buscarCarteira, filters, busca]),
  );

  return (
    <View style={{ flex: 1 }}>
      <Carteira title="Carga">
        <CarteiraHeader
          placeholder="Buscar tipo de carga..."
          searchValue={busca}
          onSearchChange={setBusca}
          onFilterPress={(abrir)}
          onAddPress={() => {
            navigation.navigate('CargaForm', { mode: 'create' });
          }}
        />
        {dados.length === 0 ? (
          <EmptyCarteira />
        ) : (
          dados.map(item => (
            <CarteiraItem
              key={item._id}
              icon="weight"
             title={item.cargaTipo}
              description={''}
              onPress={() => {
                navigation.navigate('CargaForm', {
                  cargaId: item._id,
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
        title="Excluir carga"
        description="Deseja excluir esta carga? Essa ação não poderá ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        danger
        onCancel={() => {
          setConfirmVisible(false);
          setSelectedId(null);
        }}
        onConfirm={() => {
          if (selectedId) {
            deleteCarga(selectedId);
          }
          setConfirmVisible(false);
          setSelectedId(null);
        }}
      />

      <FakeBottomSheet visible={visible} onClose={fechar}>
        <FilterSheet
          filters={CargaFiltro}
          filtroAtual={filters}
          onApply={data => {
            setFilters(data);
            buscarCarteira({
              ...data,
              cargaTipo: busca,
            });
            fechar();
          }}
          onClear={() => {
            clearFilters();
            buscarCarteira({ cargaTipo: busca });
            fechar();
          }}
        />
      </FakeBottomSheet>
    </View>
  );
}
