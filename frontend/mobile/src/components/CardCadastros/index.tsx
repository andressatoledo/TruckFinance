import React from 'react';
import { TouchableOpacity, View, Text , Animated} from 'react-native';
import { styles } from './styles';
import { useTheme } from '../../theme/themeContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRef } from 'react';

type RootNav = NativeStackNavigationProp<RootStackParamList>;


interface CardCadastroProps {
  title: string;
  subtitle?: string;
  count?: number;
  onPress?: () => void;
  icon: string;
}

export function CardCadastro({
  title,
  subtitle,
  count,
  // onPress,
  icon,
}: CardCadastroProps) {

  const navigation = useNavigation();
    const rootNavigation = navigation.getParent<RootNav>();
   const scale = useRef(new Animated.Value(1)).current;

    const onPress = () => {
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
  
      rootNavigation?.navigate('Pedagio',{});
    };

  const { theme } = useTheme();
  const stylesCardCadastro = styles(theme);

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={stylesCardCadastro.container}>
      {/* <Animated.View
        style={[
          // stylesCardViagem.card,
          // { transform: [{ scale }] },
        ]}
      > */}
        
      
    {/* <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={stylesCardCadastro.container}
    > */}
      <View style={stylesCardCadastro.left}>
        <View style={stylesCardCadastro.iconContainer}>
          <MaterialCommunityIcons
            name={icon}
            size={theme.sizes.iconSizeCard}
            style={stylesCardCadastro.icon}
          />
        </View>

        <View style={stylesCardCadastro.textContainer}>
          <Text style={stylesCardCadastro.title}>{title}</Text>
          {subtitle && (
            <Text style={stylesCardCadastro.subtitle}>{subtitle}</Text>
          )}
        </View>
      </View>

      <View style={stylesCardCadastro.right}>
        {typeof count === 'number' && (
          <View style={stylesCardCadastro.badge}>
            <Text style={stylesCardCadastro.badgeText}>{count}</Text>
          </View>
        )}
      </View>
      {/* </Animated.View> */}
    </TouchableOpacity>
  );
}
