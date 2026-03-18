import { View } from 'react-native';
import { useState, useCallback } from 'react';
import { Carteira } from '../../../components/Form/Carteira';
import { CarteiraItem } from '../../../components/Form/CarteiraItem';
import { FilterSheet } from '../../../components/Filtro/FilterSheet';
import { FakeBottomSheet } from '../../../components/Form/FakeButtonSheet';
import { useCarteira } from '../../../hooks/Manutencao/useManutencao';
import { useFilterSheet } from '../../../hooks/Filter/useFilterSheet';
import { useGenericFilter } from '../../../hooks/Filter/useGenericFilter';
import { ManutencaoFiltro } from './filtro';
import type FiltroManutencao  from '../../../../shared/types/Manutencao/manutencaoFiltro';
import { CarteiraHeader } from '../../../components/Form/CarteiraHeader';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/types'; // ajuste o path
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { Manutencao as TypeManutencao } from '../../../../shared/types/Manutencao/manutencao';
import { EmptyCarteira } from '../../../components/Feedback/EmptyCarteira';
import { ConfirmDialog } from '../../../components/Feedback/ConfirmDialog';
import { formatarData } from '../../../../shared/utils/formatarData';
import { formatarValor } from '../../../../shared/utils/formatarValor';


function description(item: TypeManutencao): string {
  if (item.manutencaoCategoria && item.manutencaoData && item.manutencaoValor ) {
    return `${item.manutencaoCategoria} • ${formatarData(item.manutencaoData)} • ${formatarValor(item.manutencaoValor)}`;
  }

  if (item.manutencaoCategoria && item.manutencaoData ) {
    return `${item.manutencaoCategoria} • ${formatarData(item.manutencaoData)} `;
  }

  if (item.manutencaoCategoria  && item.manutencaoValor ) {
    return `${item.manutencaoCategoria} • ${formatarValor(item.manutencaoValor)}`;
  }

  if (item.manutencaoData && item.manutencaoValor ) {
    return `${formatarData(item.manutencaoData)} • ${formatarValor(item.manutencaoValor)}`;
  }

  if (item.manutencaoCategoria) {
    return `${item.manutencaoCategoria} `;
  }
  if (item.manutencaoData) {
    return `${formatarData(item.manutencaoData)} `;
  }
    if (item.manutencaoValor) {
    return `${formatarValor(item.manutencaoValor)}`;
  }

  return ''
}

function title(item: TypeManutencao): string {


  if (item.caminhaoId && item.carretaId){
    if (item.caminhaoId.caminhaoNome && item.carretaId.carretaTipo) {
          return `${item.manutencaoDescricao} • ${item.caminhaoId.caminhaoNome} • ${item.carretaId.carretaTipo}`;
    }
  }

  if(item.caminhaoId){
    if (item.caminhaoId.caminhaoNome && item.caminhaoId.caminhaoPlaca) {
      return `${item.manutencaoDescricao} • ${item.caminhaoId.caminhaoNome} - ${item.caminhaoId.caminhaoPlaca}`;
    }
  }

  if (item.carretaId) {
    return `${item.manutencaoDescricao} • ${item.carretaId.carretaTipo} - ${item.carretaId.carretaPlaca}`;
  }

  return `${item.manutencaoDescricao}`
}


export function Manutencao() {
  type ManutencaoNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Manutencao'
  >;

  const navigation = useNavigation<ManutencaoNavigationProp>();
  const { visible, abrir, fechar } = useFilterSheet();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { filters, setFilters, clearFilters } =
    useGenericFilter<FiltroManutencao>();

  const { dados, buscarCarteira, deleteManutencao } = useCarteira();

  const [busca, setBusca] = useState('');

  useFocusEffect(
    useCallback(() => {
      buscarCarteira({
        ...filters,
        manutencaoDescricao: busca,
      });
    }, [buscarCarteira, filters, busca]),
  );

  return (
    <View style={{ flex: 1 }}>
      <Carteira title="Manutencao">
        <CarteiraHeader
          placeholder="Buscar manutenção..."
          searchValue={busca}
          onSearchChange={setBusca}
          onFilterPress={abrir}
          onAddPress={() => {
            navigation.navigate('ManutencaoForm', { mode: 'create' });
          }}
        />
        {dados.length === 0 ? (
          <EmptyCarteira />
        ) : (
          dados.map(item => (
            <CarteiraItem
              key={item._id}
              icon="wrench"
             title={title(item)}
              description={description(item)}
              onPress={() => {
                navigation.navigate('ManutencaoForm', {
                  manutencaoId: item._id,
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
        title="Excluir manutenção"
        description="Deseja excluir esta manutenção? Essa ação não poderá ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        danger
        onCancel={() => {
          setConfirmVisible(false);
          setSelectedId(null);
        }}
        onConfirm={() => {
          if (selectedId) {
            deleteManutencao(selectedId);
          }
          setConfirmVisible(false);
          setSelectedId(null);
        }}
      />

      <FakeBottomSheet visible={visible} onClose={fechar}>
        <FilterSheet
          filters={ManutencaoFiltro}
          filtroAtual={filters}
          onApply={data => {
            setFilters(data);
            buscarCarteira({
              ...data,
              manutencaoDescricao: busca,
            });
            fechar();
          }}
          onClear={() => {
            clearFilters();
            buscarCarteira({ manutencaoDescricao: busca });
            fechar();
          }}
        />
      </FakeBottomSheet>
    </View>
  );
}
