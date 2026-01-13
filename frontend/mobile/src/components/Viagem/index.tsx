import { View, Text, Pressable, Animated } from 'react-native';
import { useRef } from 'react';
import { styles } from './styles';
import { useTheme } from '../../theme/themeContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Tag } from '../Tag';
import { useNavigation } from '@react-navigation/native';

interface CardViagemProps {
  data: string;
  rota: string;
  toneladaValue: string;
  freteValue: string;
  dieselValue: string;

}


export function CardViagem(CardViagemProps: CardViagemProps) {
  const { theme } = useTheme();
  const stylesCardViagem = styles(theme);
  const navigation = useNavigation();

  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={() => navigation.navigate('Detalhes')}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View
        style={[
          stylesCardViagem.card,
          { transform: [{ scale }] },
        ]}
      >
        <View style={stylesCardViagem.dateRow}>
          <MaterialCommunityIcons
            name="calendar"
            size={theme.sizes.iconSizeCard}
            style={stylesCardViagem.calendar}
          />

          <Text style={stylesCardViagem.date}>{data}</Text>

          <Tag
            value="Pago"
            textColor={theme.colors.success}
            backgroundColor={theme.colors.success}
          />
        </View>

        <Text style={stylesCardViagem.route}>{rota}</Text>

        <View style={stylesCardViagem.valuesRow}>
          <View style={[stylesCardViagem.box, stylesCardViagem.blue]}>
            <MaterialCommunityIcons
              name="weight"
              size={theme.sizes.iconSizeCard}
            />
            <Text style={stylesCardViagem.label}>Tonelada</Text>
            <Text style={[stylesCardViagem.value, stylesCardViagem.blue]}>
              {CardViagemProps.toneladaValue}t
            </Text>
          </View>

          <View style={[stylesCardViagem.box, stylesCardViagem.green]}>
            <MaterialCommunityIcons
              name="currency-usd"
              size={theme.sizes.iconSizeCard}
            />
            <Text style={stylesCardViagem.label}>Frete</Text>
            <Text style={[stylesCardViagem.value, stylesCardViagem.green]}>
              R$ {CardViagemProps.freteValue}
            </Text>
          </View>

          <View style={[stylesCardViagem.box, stylesCardViagem.yellow]}>
            <MaterialCommunityIcons
              name="gas-station"
              size={theme.sizes.iconSizeCard}
            />
            <Text style={stylesCardViagem.label}>Diesel</Text>
            <Text style={[stylesCardViagem.value, stylesCardViagem.yellow]}>
              R$ {CardViagemProps.dieselValue}
            </Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}