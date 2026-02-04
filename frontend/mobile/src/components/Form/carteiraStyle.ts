import { StyleSheet } from 'react-native';
import { ThemeType } from '../../theme/ThemeContext';


export const styles = (theme: ThemeType) => {

  return StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
    },

    title: {
      fontSize: 22,
      fontWeight: '600',
      color: theme.colors.text,
    },

    addButton: {
      backgroundColor: theme.colors.detail,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },

    actions: {
      flexDirection: 'row',
      gap: 8,
      paddingHorizontal: 16,
      marginBottom: 12,
    },

    list: {
      paddingHorizontal: 16,
      paddingBottom: 24,
      gap: 12,
    },
  });
}