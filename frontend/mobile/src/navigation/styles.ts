import { StyleSheet } from 'react-native';
import { ThemeType } from '../theme/ThemeContext';

export const useStyles = (theme: ThemeType) => {
  return StyleSheet.create({
    tabBar: {
      position: 'absolute',
      height: 65,
      backgroundColor: theme.colors.background,
      elevation: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    botaoCentral: {
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    botaoInterno: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: theme.colors.activeTab,
      justifyContent: 'center',
      alignItems: 'center',

    },
  });
};
