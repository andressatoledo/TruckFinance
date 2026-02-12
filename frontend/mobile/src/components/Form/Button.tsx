import { TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/themeContext';

interface ButtonProps {
  label?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  marginTop?: number;
  icon?: string;
  onPress: () => void;
  disabled?: boolean;
}

export function Button({
  label,
  backgroundColor,
  borderColor,
  borderRadius = 12,
  paddingVertical = 16,
  paddingHorizontal = 0,
  marginTop = 24,
  icon,
  onPress,
  disabled = false,
}: ButtonProps) {
  const { theme } = useTheme();

  const bgColor = disabled
    ? theme.colors.opaco
    : backgroundColor || theme.colors.primary;

  const brColor = disabled
    ? theme.colors.opaco
    : borderColor || theme.colors.primary;

  const textColor = disabled
    ? theme.colors.detail
    : theme.colors.text;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={{
        backgroundColor: bgColor,
        borderColor: brColor,
        paddingVertical,
        paddingHorizontal,
        borderRadius,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop,
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={textColor}
        />
      )}

      {label && (
        <Text
          style={{
            color: textColor,
            marginLeft: icon ? 8 : 0,
            fontSize: theme.sizes.mediumText.fontSize,
          }}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}
