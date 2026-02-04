import { StyleSheet } from 'react-native';
import { ThemeType } from '../theme/ThemeContext';

export const layout = (theme: ThemeType) => {
  return StyleSheet.create({
    container: {
      // flex: 1,
      paddingBottom: 16,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 30,
      backgroundColor: theme.colors.background,
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    header: {fontSize: 56, color: theme.colors.text},
    subHeader: {fontSize: 32, color: theme.colors.text},
    title: {fontSize: 24, fontWeight: '600', marginBottom: 20, color: theme.colors.text},
    subtitle: {fontSize: 20, color: theme.colors.text},
    text: {fontSize: 16, color: theme.colors.text},
    smallText: {fontSize: 14, color: theme.colors.text},
    mediumText: {fontSize: 18, color: theme.colors.text},
    largeText: {fontSize: 22, color: theme.colors.text},
    inputHeight: {height: 48},
    buttonHeight: {height: 48}
  });
};


