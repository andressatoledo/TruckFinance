import { View, Text, ScrollView } from 'react-native';

import { useOptionalTabBarHeight } from '../../hooks/useBottomTabBarHeight';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../../theme/themeContext';
import { styles } from './formStyles';

interface FormProps {
  title?: string;
  children: React.ReactNode;
}

export function Form({ title, children }: FormProps) {
  const { theme } = useTheme();
  const stylesForm = styles(theme);

  const tabBarHeight = useOptionalTabBarHeight();
  const insets = useSafeAreaInsets();

  const contentPaddingBottom =
    tabBarHeight +
    insets.bottom +
    80;

  return (
    <View style={stylesForm.container}>
      {title &&(
      <View style={stylesForm.header}>
        <Text style={stylesForm.title}>{title}</Text>
      </View>)}

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
