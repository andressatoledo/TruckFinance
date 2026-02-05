import { StyleSheet } from 'react-native';
import { ThemeType } from '../../theme/themeContext';

export const styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      
    },

    header: {
      paddingHorizontal: 16,
      paddingVertical: 18,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.space,
      backgroundColor: theme.colors.surface,
      paddingTop: 40
    },

    title: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.text,
    },

    scroll: {
      flex: 1,
    },

    content: {
      padding: 16,
      gap: 12,
      
    },
  });
