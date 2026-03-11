import { View, Text } from 'react-native';
import { useTheme } from '../../theme/themeContext';

interface Props {
  title: string;
  subtitle?: string;
}

export function SectionTitle({ title, subtitle }: Props) {
  const { theme } = useTheme();


  return (
    <View
      style={{
        marginBottom: 12,
        paddingVertical: 10,
        paddingHorizontal: 12,

        borderRadius: 12,
        // borderLeftWidth: 4,
        // borderLeftColor: theme.colors.primary, 

        // borderColor: theme.colors.primary,
        // borderWidth: 1,

        borderBottomWidth: 2,
        borderBottomColor: theme.colors.primary, 
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          color: theme.colors.text, 
        }}
      >
        {title}
      </Text>

      {subtitle && (
        <Text
          style={{
            fontSize: 13,
            color: theme.colors.opaco,
            marginTop: 4,
          }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
}