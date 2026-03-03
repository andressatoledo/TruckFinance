import { View, Text } from 'react-native';

interface Props {
  title: string;
  subtitle?: string;
}

export function SectionTitle({ title, subtitle }: Props) {
  return (
    <View
      style={{
        marginTop: 24,
        marginBottom: 12,
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: '#F4F6FA',
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#2563EB', // azul moderno
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          color: '#1F2937',
        }}
      >
        {title}
      </Text>

      {subtitle && (
        <Text
          style={{
            fontSize: 13,
            color: '#6B7280',
            marginTop: 4,
          }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
}