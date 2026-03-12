import { Text, ScrollView, ActivityIndicator, View } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { layout } from '../../styles/layout';
import { useTheme } from '../../theme/themeContext';
import { CardViagem } from '../../components/CardViagem';
import { CarteiraViagemService } from '../../../shared/services/carteiraViagemService';
import type { CarteiraViagem } from '../../../shared/types/Viagem/carteiraViagem';
import type ViagemFiltro from '../../../shared/types/Viagem/viagemFiltro';

import { formatarData } from '../../../shared/utils/formatarData';
import { formatarRota } from '../../../shared/utils/formatarRota';
import { formatarValor } from '../../../shared/utils/formatarValor';

import { Calendario } from '../../components/Calendario';
import { FakeBottomSheet } from '../../components/Form/FakeButtonSheet';
import { useFilterSheet } from '../../hooks/Filter/useFilterSheet';
import { Button } from '../../components/Form/Button';
import { ViagemFilter } from './ViagemFilter';

export function Viagem() {
  const { theme } = useTheme();
  const styleDefault = layout(theme);

  const { visible, abrir, fechar } = useFilterSheet();

  const [viagens, setCarteira] = useState<CarteiraViagem[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ FILTRO ÚNICO
  const [filtroAtual, setFiltroAtual] = useState<ViagemFiltro>({});

  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  // 🔹 Atualiza filtro sem perder campos
  function atualizarFiltro(parcial: Partial<ViagemFiltro>) {
    setFiltroAtual((prev) => ({
      ...prev,
      ...parcial,
    }));
  }

  // 🔹 Busca centralizada
  const buscarViagens = useCallback(async (filtro?: ViagemFiltro) => {
    setLoading(true);
    try {
      const data = await CarteiraViagemService.buscarViagens(filtro);
      setCarteira(data);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔹 Sempre busca quando filtro muda
  useFocusEffect(
    useCallback(() => {
      buscarViagens(filtroAtual);
    }, [buscarViagens, filtroAtual])
  );

  // 🔹 Filtro do BottomSheet
  const aplicarFiltro = (filtro: ViagemFiltro) => {
    atualizarFiltro(filtro);
    fechar();
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styleDefault.container}
        contentContainerStyle={{
          paddingBottom: tabBarHeight + insets.bottom + 50,
        }}
      >

        <Calendario
          // dataInicio={filtroAtual.dataInicio ? new Date(filtroAtual.dataInicio) : null}
          // dataFim={filtroAtual.dataFim ? new Date(filtroAtual.dataFim) : null}
          // onChangeInicio={(date) => atualizarFiltro({ dataInicio: date ?? undefined, dataFim: undefined })}
          // onChangeFim={(date) => atualizarFiltro({ dataFim: date ?? undefined })}
          // filtroAtual={filtroAtual}              // << passa o filtro atual
          // atualizarFiltro={atualizarFiltro}      // << passa a função
        />



        <Button icon="filter" label="Filtrar" onPress={abrir} />

        <Text style={styleDefault.title}>Viagens</Text>

        {viagens.length === 0 && (
          <Text style={{ color: theme.colors.text }}>
            Nenhuma viagem encontrada
          </Text>
        )}

        {viagens.map(({ viagem, diesel }) => (
          <CardViagem
            key={viagem._id}
            viagemId={viagem._id}
            data={formatarData(viagem.viagemDataInicio)}
            rota={formatarRota(viagem)}
            toneladaValue={String(viagem.viagemToneladaCarregada ?? '-')}
            freteValue={formatarValor(viagem.viagemValorTonelada)}
            dieselValue={formatarValor(diesel.total)}
            viagemStatus={viagem.viagemStatus!}
          />
        ))}
      </ScrollView>

      <FakeBottomSheet visible={visible} onClose={fechar}>
        {/* <ViagemFilter
          onClose={fechar}
          onApplyFiltro={aplicarFiltro}
          dataInicio={filtroAtual.dataInicio}
          dataFim={filtroAtual.dataFim}
        /> */}
        <ViagemFilter
          filtroAtual={filtroAtual}
          onApplyFiltro={aplicarFiltro}
          onClose={fechar}
        />


      </FakeBottomSheet>
    </View>
  );
}
