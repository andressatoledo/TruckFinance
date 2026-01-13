import { View, Text, TextInput, Pressable , KeyboardTypeOptions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/themeContext';

interface Props {
  label: string;
  icon?: string;
  value?: string;
  placeholder?: string;
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
}

// export function InputField({
//   label,
//   icon,
//   value,
//   placeholder,
//   editable = true,
//   onPress,
// }: Props) {
//   const { theme } = useTheme();
//   return (
//     <View style={{ marginBottom: 16 }}>
//       <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
//         {icon && (
//         <MaterialCommunityIcons name={icon} size={18} color={theme.colors.detail} />)}
//         <Text style={{ marginLeft: 6, color: theme.colors.detail, fontSize: theme.sizes.mediumText.fontSize }}>
//           {label}
//         </Text>
//       </View>

//       <Pressable onPress={onPress} disabled={!onPress}>
//         <TextInput
//           value={value}
//           placeholder={placeholder}
//           editable={editable} // 🔒 impede digitação
//           pointerEvents="none"
//           style={{
//             borderWidth: 1,
//             borderColor: theme.colors.detail,
//             borderRadius: 10,
//             paddingHorizontal: 14,
//             paddingVertical: 12,
//             fontSize: theme.sizes.mediumText.fontSize,
//             backgroundColor: theme.colors.backgroundCard,
//             color: theme.colors.text,
//           }}
//         />
//       </Pressable>
//     </View>
//   );
// }



export function InputField({
  label,
  icon,
  value,
  placeholder,
  editable = true,
  onPress,
  onChangeText,
  keyboardType = 'default',
}: Props) {
  const { theme } = useTheme();
  const isPressable = !!onPress && !editable;

  return (
    <View style={{ marginBottom: 16 }}>
      {icon || label ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
          {icon && <MaterialCommunityIcons name={icon} size={18} color={theme.colors.detail} />}
          {label && (
            <Text style={{ marginLeft: 6, color: theme.colors.detail, fontSize: theme.sizes.mediumText.fontSize }}>
              {label}
            </Text>
          )}
        </View>
      ) : null}

      {isPressable ? (
        <Pressable onPress={onPress}>
          <TextInput
            value={value}
            placeholder={placeholder}
            editable={false} // só para mostrar valor, não digitar
            style={{
              borderWidth: 1,
              borderColor: theme.colors.detail,
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
            borderColor: theme.colors.detail,
            borderRadius: 10,
            paddingHorizontal: 14,
            paddingVertical: 12,
            fontSize: theme.sizes.mediumText.fontSize,
            backgroundColor: theme.colors.backgroundCard,
            color: theme.colors.text,
          }}
        />
      )}
    </View>
  );
}
