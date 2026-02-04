import { View, Text, ScrollView } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../../theme/themeContext';
import { styles } from './formStyles';

interface FormProps {
  title: string;
  children: React.ReactNode;
}

export function Form({ title, children }: FormProps) {
  const { theme } = useTheme();
  const stylesForm = styles(theme);

  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  /**
   * Padding calculado automaticamente:
   * - BottomTab
   * - SafeArea (gestos / iPhone)
   * - respiro visual
   */
  const contentPaddingBottom =
    tabBarHeight +
    insets.bottom +
    80;

  return (
    <View style={stylesForm.container}>
      <View style={stylesForm.header}>
        <Text style={stylesForm.title}>{title}</Text>
      </View>

      <ScrollView
        style={stylesForm.scroll}
        contentContainerStyle={{
          paddingBottom: contentPaddingBottom,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={stylesForm.content}>
          {children}
        </View>
      </ScrollView>
    </View>
  );
}
