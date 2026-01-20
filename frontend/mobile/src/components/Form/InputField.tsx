import { View, Text, TextInput, Pressable, KeyboardTypeOptions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/themeContext';
import { FormError } from './FormError';

interface Props {
  label: string;
  icon?: string;
  value?: string;
  placeholder?: string;
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onPress?: () => void;
  onChangeText?: (text: string) => void;

  /** 🔴 mensagem de erro do formulário */
  error?: string;
}

export function InputField({
  label,
  icon,
  value,
  placeholder,
  editable = true,
  onPress,
  onChangeText,
  keyboardType = 'default',
  error,
}: Props) {
  const { theme } = useTheme();
  const isPressable = !!onPress && !editable;

  const borderColor = error
    ? theme.colors.error
    : theme.colors.detail;

  return (
    <View style={{ marginBottom: 16 }}>
      {/* Label */}
      {(icon || label) && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 6,
          }}
        >
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={18}
              color={theme.colors.detail}
            />
          )}

          {label && (
            <Text
              style={{
                marginLeft: icon ? 6 : 0,
                color: theme.colors.detail,
                fontSize: theme.sizes.mediumText.fontSize,
              }}
            >
              {label}
            </Text>
          )}
        </View>
      )}

      {/* Campo */}
      {isPressable ? (
        <Pressable onPress={onPress}>
          <TextInput
            value={value}
            placeholder={placeholder}
            editable={false}
            style={{
              borderWidth: 1,
              borderColor,
              borderRadius: 10,
              paddingHorizontal: 14,
              paddingVertical: 12,
              fontSize: theme.sizes.mediumText.fontSize,
              backgroundColor: theme.colors.backgroundCard,
              color: theme.colors.text,
            }}
          />
        </Pressable>
      ) : (
        <TextInput
          value={value}
          placeholder={placeholder}
          editable={editable}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          style={{
            borderWidth: 1,
            borderColor,
            borderRadius: 10,
            paddingHorizontal: 14,
            paddingVertical: 12,
            fontSize: theme.sizes.mediumText.fontSize,
            backgroundColor: theme.colors.backgroundCard,
            color: theme.colors.text,
          }}
        />
      )}

      {/* 🔴 Erro padronizado */}
      <FormError message={error} />
    </View>
  );
}
