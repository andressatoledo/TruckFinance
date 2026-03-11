import { View, Text, TextInput, Pressable, KeyboardTypeOptions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/themeContext';
import { FormError } from './FormError';

interface Props {
  label: string;
  icon?: string;
  iconPosition?: 'top' | 'inside';
  value?: string;
  placeholder?: string;
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
  marginBottom?: number;
  error?: string;
}

export function InputField({
  label,
  icon,
  iconPosition = 'top',
  value,
  placeholder,
  editable = true,
  onPress,
  onChangeText,
  keyboardType = 'default',
  error,
  marginBottom,
}: Props) {
  const { theme } = useTheme();
  const isPressable = !!onPress && !editable;

  const borderColor = error
    ? theme.colors.error
    : theme.colors.primary;

  // const isNumeric = keyboardType === 'numeric';

  // valor exibido no input
  const displayValue = value ?? '';

function handleChange(text: string) {
  onChangeText?.(text);
}

  const InputContent = (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor,
        borderRadius: 10,
        backgroundColor: theme.colors.backgroundCard,
        paddingHorizontal: 12
      }}
    >
      {icon && iconPosition === 'inside' && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={theme.colors.primary}
          style={{ marginRight: 8 }}
        />
      )}

      <TextInput
        value={displayValue}
        placeholder={placeholder}
        editable={editable}
        keyboardType={keyboardType}
        onChangeText={handleChange}
        placeholderTextColor={theme.colors.opaco}
        style={{
          flex: 1,
          paddingVertical: 12,
          fontSize: theme.sizes.mediumText.fontSize,
          color: theme.colors.text
        }}
      />
    </View>
  );

  return (
    <View style={{ marginBottom: marginBottom || 16 }}>
      {(label || (icon && iconPosition === 'top')) && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 6
          }}
        >
          {icon && iconPosition === 'top' && (
            <MaterialCommunityIcons
              name={icon}
              size={18}
              color={theme.colors.detail}
            />
          )}

          {label && (
            <Text
              style={{
                marginLeft: icon && iconPosition === 'top' ? 6 : 0,
                color: theme.colors.text,
                fontSize: theme.sizes.mediumText.fontSize
              }}
            >
              {label}
            </Text>
          )}
        </View>
      )}

      {isPressable ? (
        <Pressable onPress={onPress}>{InputContent}</Pressable>
      ) : (
        InputContent
      )}

      <FormError message={error} />
    </View>
  );
}