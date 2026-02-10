import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/themeContext';
import { styles } from './carteiraItemStyle';

type BadgeValue = number | 'ativo' | 'inativo' | string;

interface CadastroListItemProps {
  icon: string;
  title: string;
  description?: string;
  badge?: BadgeValue;
  onPress?: () => void;
  onPressDelete?: () => void;
}

export function CarteiraItem({
  icon,
  title,
  description,
  badge,
  onPress,
  onPressDelete,
}: CadastroListItemProps) {
  const { theme } = useTheme();
  const styleCarteiraItem = styles(theme);

  const badgeColor =
    badge === 'ativo'
      ? theme.colors.success
      : badge === 'inativo'
      ? theme.colors.error
      : theme.colors.detail;

  return (
    <View  style={styleCarteiraItem.card} >
       <TouchableOpacity onPress={onPress} style={styleCarteiraItem.pressableArea}>
      <View style={styleCarteiraItem.icon}>
        <MaterialCommunityIcons
          name={icon as any}
          size={20}
          color={theme.colors.detail}
        />
      </View>

      <View style={styleCarteiraItem.content}>
        <Text style={styleCarteiraItem.title}>{title}</Text>

        {description && (
          <Text style={styleCarteiraItem.description}>{description}</Text>
        )}
      </View>

      {badge !== undefined && (
        <View style={[styleCarteiraItem.badge, { borderColor: badgeColor }]}>
          <Text style={[styleCarteiraItem.badgeText, { color: badgeColor }]}>
            {badge}
          </Text>
        </View>
      )}
      
      <MaterialCommunityIcons
        name="chevron-right"
        size={22}
        color={theme.colors.opaco}
      />
    </TouchableOpacity>

      <TouchableOpacity onPress={onPressDelete} hitSlop={10}>
        <MaterialCommunityIcons
        name="trash-can"
        size={22}
        color={theme.colors.opaco}
      />
      </TouchableOpacity>
    </View>
  );
}
