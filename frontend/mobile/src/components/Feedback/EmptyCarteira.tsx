import { View } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/themeContext';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

export function EmptyCarteira({
  title = 'Nenhum registro encontrado',
  description = 'Ainda não há dados cadastrados aqui.',
  icon = 'database-off-outline',
  actionLabel,
  onActionPress,
}: EmptyStateProps) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.9,
         marginTop: -10, 
      }}
    >
      <MaterialCommunityIcons
        name={icon as any}
        size={56}
        color={theme.colors.primary}
        style={{opacity: 0.8 }}
      />

      <Text
        style={{
          fontSize: 15,
          fontWeight: '600',
          textAlign: 'center',
          marginBottom: 6,
          color: theme.colors.text,
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          fontSize: 13,
          textAlign: 'center',
          opacity: 0.7,
          marginBottom: actionLabel ? 20 : 0,
          color: theme.colors.text,
        }}
      >
        {description}
      </Text>

      {actionLabel && onActionPress && (
        <Text
          onPress={onActionPress}
          style={{
            // marginTop: 0,
            marginBottom: 12,
            color: theme.colors.primary,
            fontWeight: '600',
          }}
        >
          {actionLabel}
        </Text>
      )}
    </View>
  );
}
