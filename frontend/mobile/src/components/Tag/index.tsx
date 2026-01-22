import { Text, Pressable } from 'react-native';
import { styles } from './styles';
import { useTheme } from '../../theme/themeContext';

export interface TagProps {
  value: string;
  textColor: string;
  backgroundColor: string;
  isActive?: boolean;
  onPress?: () => void;
}

export function Tag({
  value,
  textColor,
  backgroundColor,
  isActive = false,
  onPress,
}: TagProps) {
  const { theme } = useTheme();
  const stylesTag = styles(theme);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        stylesTag.tag,
        {
          backgroundColor: isActive
            ? backgroundColor
            : backgroundColor + '20',
          borderColor: backgroundColor,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <Text
        style={[
          stylesTag.label,
          {
            color: isActive ? theme.colors.background : textColor,
          },
        ]}
      >
        {value}
      </Text>
    </Pressable>
  );
}
