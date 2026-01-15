
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRef } from 'react';
import { styles } from './styles';
import { useTheme } from '../../theme/themeContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Tag } from '../Tag';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import {ViagemStatus } from '../../../shared/types/viagem';
import { useStatusColors } from './Tag';

type RootNav = NativeStackNavigationProp<RootStackParamList>;

interface CardViagemProps {
  viagemId: string;
  data?: string;
  rota?: string;
  toneladaValue?: string;
  freteValue?: string;
  dieselValue?: string;
  viagemStatus: ViagemStatus;
}

export function CardViagem(CardViagemProps: CardViagemProps) {
  const { theme } = useTheme();
  const stylesCardViagem = styles(theme);
  const navigation = useNavigation();
  const rootNavigation = navigation.getParent<RootNav>();

  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.97,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();

    rootNavigation?.navigate('ViagemForm', {
      mode: 'edit',
      viagemId: CardViagemProps.viagemId,
    });
  };

  // Status
  const statusColors = useStatusColors(CardViagemProps.viagemStatus);

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
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

          <Text style={stylesCardViagem.date}>{CardViagemProps.data}</Text>

          <Tag
            value={statusColors.value}
            textColor={ statusColors.textColor}
            backgroundColor={statusColors.backgroundColor}
          />
        </View>

        <Text style={stylesCardViagem.route}>{CardViagemProps.rota}</Text>

        <View style={stylesCardViagem.valuesRow}>
          <View style={[stylesCardViagem.box, stylesCardViagem.blue]}>
            <MaterialCommunityIcons
              name="weight"
              size={theme.sizes.iconSizeCard}
              style={stylesCardViagem.blue}
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
              style={stylesCardViagem.green}
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
              style={stylesCardViagem.yellow}
            />
            <Text style={stylesCardViagem.label}>Diesel</Text>
            <Text style={[stylesCardViagem.value, stylesCardViagem.yellow]}>
              R$ {CardViagemProps.dieselValue}
            </Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}
