import React from 'react';
import { Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/themeContext';

type Props = {
  message?: string;
};

export function FormError({ message }: Props) {
  const { theme } = useTheme();

  if (!message) return null;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
      }}
    >
      <MaterialCommunityIcons
        name="alert-circle"
        size={14}
        color={theme.colors.error ?? '#E53935'}
        style={{ marginRight: 4 }}
      />

      <Text
        style={{
          color: theme.colors.error ?? '#E53935',
          fontSize: 12,
          lineHeight: 16,
        }}
      >
        {message}
      </Text>
    </View>
  );
}
