import { Text, ScrollView, ActivityIndicator, View } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { layout } from '../../styles/layout';
import { useTheme } from '../../theme/themeContext';
import { CardViagem } from '../../components/CardViagem';
import { CarteiraViagemService } from '../../../shared/services/carteiraViagemService';
import type { Viagem } from '../../../shared/types/Viagem';
import type { CarteiraViagem } from '../../../shared/types/carteiraViagem';
import { formatarData } from '../../../shared/utils/formatarData';
import { formatarRota } from '../../../shared/utils/formatarRota';
import { formatarValor } from '../../../shared/utils/formatarValor';

export function Viagem() {
  const { theme } = useTheme();
  const styleDefault = layout(theme);

  // const [viagens, setViagens] = useState<Viagem[]>([]);
  const [viagens, setCarteira] = useState<CarteiraViagem[]>([]);
  const [loading, setLoading] = useState(true);

  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  //Buscar viagens
   const buscarViagens = async () => {
    setLoading(true);
    try {
      const data = await CarteiraViagemService.buscarViagens();
      setCarteira(data);
    } finally {
      setLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      buscarViagens();
    }, [])
  );
 

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    // <ScrollView style={styleDefault.container}>
    <ScrollView
      style={styleDefault.container}
      contentContainerStyle={{
        paddingBottom: tabBarHeight + insets.bottom + 50,
      }}
    >
      <Text style={styleDefault.title}>Viagens</Text>

      {viagens.length === 0 && (
        <Text style={{ color: theme.colors.text }}>
          Nenhuma viagem cadastrada
        </Text>
      )}

      {viagens.map((item) => {
        const viagem = item.viagem;
        const diesel = item.diesel;

        return (
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
        );
      })}

    </ScrollView>
  );
}
