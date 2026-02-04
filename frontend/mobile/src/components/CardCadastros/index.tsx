import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { styles } from './styles';
import { useTheme } from '../../theme/themeContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
  onPress,
  icon,
}: CardCadastroProps) {

  const { theme } = useTheme();
  console.log(theme);
  const stylesCardCadastro = styles(theme);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={stylesCardCadastro.container}
    >
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
    </TouchableOpacity>
  );
}
