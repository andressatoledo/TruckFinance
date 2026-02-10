import { View } from 'react-native';
import { useTheme } from '../../theme/themeContext';
import { Text } from 'react-native-paper';
import {useStyles} from './styles'


interface DividerProps{
    margin?: number;
    text?: string;
    backgroundColor?: string;
}
export function Divider(DividerProps: DividerProps) {
   const { theme } = useTheme();
   const styleDivider = useStyles(theme);

  return (
    <View style={{ marginVertical: DividerProps.margin}}>
        {DividerProps.text && (
                <Text
                 style={styleDivider.sectionLabel}
                >  {DividerProps.text} </Text>
              )}

    <View
      style={{
        height: 1,
        backgroundColor: DividerProps.backgroundColor ?? theme.colors.primary,
        marginVertical: DividerProps.margin ?? 4,
      }}
    />
    </View>
  );
}