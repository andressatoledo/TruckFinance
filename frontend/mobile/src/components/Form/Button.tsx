import { TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/themeContext';

interface ButtonProps {
  label?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number;
  paddingVertical?:number;
  paddingHorizontal?:number;
  marginTop?:number;
  icon?: string;
  onPress: () => void;
}

export function Button(props: ButtonProps) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        backgroundColor: props.backgroundColor || theme.colors.primary,
        borderColor: props.borderColor || theme.colors.primary,
        paddingVertical: props.paddingVertical || 16,
        paddingHorizontal: props.paddingHorizontal || 0,
        borderRadius: props.borderRadius || 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: props.marginTop || 24,
      }}
    >
      {props.icon && <MaterialCommunityIcons name={props.icon} size={20} color={theme.colors.text}/>}
      {props.label && <Text style={{ color: theme.colors.text, marginLeft: 8, fontSize: theme.sizes.mediumText.fontSize }}>{props.label}</Text>}
      
    </TouchableOpacity>
  );
}
