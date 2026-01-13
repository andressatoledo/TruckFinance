import { TouchableOpacity, Text } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/themeContext';

export function SubmitButton({ label, onPress }: any) {
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
      {/* <MaterialCommunityIcons name="content-save" size={20} color="#FFF" /> */}
      <Text style={{ color: theme.colors.text, marginLeft: 8, fontSize: theme.sizes.mediumText.fontSize }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
