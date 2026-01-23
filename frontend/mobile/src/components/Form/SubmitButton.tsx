import { TouchableOpacity, Text, GestureResponderEvent } from 'react-native';
import { useTheme } from '../../theme/themeContext';

interface Props {
  label: string;
  onPress: (event: GestureResponderEvent) => void | Promise<void>;
}

export function SubmitButton({ label, onPress }: Props) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: theme.colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
      }}
    >
      <Text
        style={{
          color: theme.colors.text,
          marginLeft: 8,
          fontSize: theme.sizes.mediumText.fontSize,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
