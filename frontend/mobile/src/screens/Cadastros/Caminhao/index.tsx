import { View } from 'react-native';
import { useState, useCallback } from 'react';
import { Carteira } from '../../../components/Form/Carteira';
import { CarteiraItem } from '../../../components/Form/CarteiraItem';
import { FilterSheet } from '../../../components/Filtro/FilterSheet';
import { FakeBottomSheet } from '../../../components/Form/FakeButtonSheet';
import { useCarteira } from '../../../hooks/Caminhao/useCaminhao';
import { useFilterSheet } from '../../../hooks/useFilterSheet';
import { useGenericFilter } from '../../../hooks/useGenericFilter';
import { CaminhaoFiltro } from './filtro';
import type FiltroCaminhao  from '../../../../shared/types/Caminhao/caminhaoFiltro';
import { CarteiraHeader } from '../../../components/Form/CarteiraHeader';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/types'; // ajuste o path
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { Caminhao as TypeCaminhao } from '../../../../shared/types/Caminhao/caminhao';
import { EmptyCarteira } from '../../../components/Feedback/EmptyCarteira';
import { ConfirmDialog } from '../../../components/Feedback/ConfirmDialog';

function description(item: TypeCaminhao): string {
  if (item.caminhaoPlaca && item.caminhaoStatus ) {
    return `${item.caminhaoPlaca} • ${item.caminhaoStatus}`;
  }

  return ''
}


export function Caminhao() {
  type CaminhaoNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Caminhao'
  >;

  const navigation = useNavigation<CaminhaoNavigationProp>();
  const { visible, abrir, fechar } = useFilterSheet();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { filters, setFilters, clearFilters } =
    useGenericFilter<FiltroCaminhao>();

  const { dados, buscarCarteira, deleteCaminhao } = useCarteira();

  const [busca, setBusca] = useState('');

  useFocusEffect(
    useCallback(() => {
      buscarCarteira({
        ...filters,
        caminhaoNome: busca,
      });
    }, [buscarCarteira, filters, busca]),
  );

  return (
    <View style={{ flex: 1 }}>
      <Carteira title="Caminhao">
        <CarteiraHeader
          placeholder="Buscar caminhao..."
          searchValue={busca}
          onSearchChange={setBusca}
          onFilterPress={abrir}
          onAddPress={() => {
            navigation.navigate('CaminhaoForm', { mode: 'create' });
          }}
        />
        {dados.length === 0 ? (
          <EmptyCarteira />
        ) : (
          dados.map(item => (
            <CarteiraItem
              key={item._id}
              icon="fuel"
             title={item.caminhaoNome}
              description={description(item)}
              onPress={() => {
                navigation.navigate('CaminhaoForm', {
                  caminhaoId: item._id,
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
        title="Excluir caminhão"
        description="Deseja excluir este caminhão? Essa ação não poderá ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        danger
        onCancel={() => {
          setConfirmVisible(false);
          setSelectedId(null);
        }}
        onConfirm={() => {
          if (selectedId) {
            deleteCaminhao(selectedId);
          }
          setConfirmVisible(false);
          setSelectedId(null);
        }}
      />

      <FakeBottomSheet visible={visible} onClose={fechar}>
        <FilterSheet
          filters={CaminhaoFiltro}
          filtroAtual={filters}
          onApply={data => {
            setFilters(data);
            buscarCarteira({
              ...data,
              caminhaoNome: busca,
            });
            fechar();
          }}
          onClear={() => {
            clearFilters();
            buscarCarteira({ caminhaoNome: busca });
            fechar();
          }}
        />
      </FakeBottomSheet>
    </View>
  );
}
