import { View } from 'react-native';
import { useState, useCallback } from 'react';
import { Carteira } from '../../../components/Form/Carteira';
import { CarteiraItem } from '../../../components/Form/CarteiraItem';
import { FilterSheet } from '../../../components/Filtro/FilterSheet';
import { FakeBottomSheet } from '../../../components/Form/FakeButtonSheet';
import { useCarteira } from '../../../hooks/Empregadora/useEmpregadora';
import { useFilterSheet } from '../../../hooks/Filter/useFilterSheet';
import { useGenericFilter } from '../../../hooks/Filter/useGenericFilter';
import { EmpregadoraFiltro } from './filtro';
import type FiltroEmpregadora  from '../../../../shared/types/Empregadora/empregadoraFiltro';
import { CarteiraHeader } from '../../../components/Form/CarteiraHeader';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/types'; // ajuste o path
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { Empregadora as TypeEmpregadora } from '../../../../shared/types/Empregadora/empregadora';
import { EmptyCarteira } from '../../../components/Feedback/EmptyCarteira';
import { ConfirmDialog } from '../../../components/Feedback/ConfirmDialog';

function description(item: TypeEmpregadora): string {
  if (item.empregadoraPrazoPagamento && item.empregadoraStatus ) {
    return `${item.empregadoraPrazoPagamento} • ${item.empregadoraStatus}`;
  }

  return ''
}


export function Empregadora() {
  type EmpregadoraNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Empregadora'
  >;

  const navigation = useNavigation<EmpregadoraNavigationProp>();
  const { visible, abrir, fechar } = useFilterSheet();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { filters, setFilters, clearFilters } =
    useGenericFilter<FiltroEmpregadora>();

  const { dados, buscarCarteira, deleteEmpregadora } = useCarteira();

  const [busca, setBusca] = useState('');

  useFocusEffect(
    useCallback(() => {
      buscarCarteira({
        ...filters,
        empregadoraNome: busca,
      });
    }, [buscarCarteira, filters, busca]),
  );

  return (
    <View style={{ flex: 1 }}>
      <Carteira title="Empregadora">
        <CarteiraHeader
          placeholder="Buscar empregadora..."
          searchValue={busca}
          onSearchChange={setBusca}
          onFilterPress={abrir}
          onAddPress={() => {
            navigation.navigate('EmpregadoraForm', { mode: 'create' });
          }}
        />
        {dados.length === 0 ? (
          <EmptyCarteira />
        ) : (
          dados.map(item => (
            <CarteiraItem
              key={item._id}
              icon="truck"
             title={item.empregadoraNome}
              description={description(item)}
              onPress={() => {
                navigation.navigate('EmpregadoraForm', {
                  empregadoraId: item._id,
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
        title="Excluir empregadora"
        description="Deseja excluir esta empregadora? Essa ação não poderá ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        danger
        onCancel={() => {
          setConfirmVisible(false);
          setSelectedId(null);
        }}
        onConfirm={() => {
          if (selectedId) {
            deleteEmpregadora(selectedId);
          }
          setConfirmVisible(false);
          setSelectedId(null);
        }}
      />

      <FakeBottomSheet visible={visible} onClose={fechar}>
        <FilterSheet
          filters={EmpregadoraFiltro}
          filtroAtual={filters}
          onApply={data => {
            setFilters(data);
            buscarCarteira({
              ...data,
              empregadoraNome: busca,
            });
            fechar();
          }}
          onClear={() => {
            clearFilters();
            buscarCarteira({ empregadoraNome: busca });
            fechar();
          }}
        />
      </FakeBottomSheet>
    </View>
  );
}
