// src/components/TotalCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/themeContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
interface TotalCardProps {
  label: string;          // Ex: "Frete Total"
  value: number | string; // Ex: 1200 ou "R$ 1.200,00"
  icon?: string; // Se quiser passar um ícone opcional
  backgroundColor?: string; // Cor do card opcional
  color?:string;
}

export function ValueCard({
  label,
  value,
  icon,
  backgroundColor,
  color
}: TotalCardProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: backgroundColor || theme.colors.backgroundCard,
          
        },
      ]}
    >
      {icon && (
              <MaterialCommunityIcons name={icon} size={theme.sizes.iconSizeValueCard} color={color} />)}
      <Text style={[styles.label, { color: theme.colors.text }]}>{label}</Text>
      <Text style={[styles.value, { color: color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    // Sombra (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    // Sombra (Android)
    elevation: 4,
  },
  iconContainer: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
  },
});
