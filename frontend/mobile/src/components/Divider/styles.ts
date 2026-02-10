import { StyleSheet } from 'react-native';
import { ThemeType } from '../../theme/ThemeContext';

export const useStyles = (theme: ThemeType) => {
    console.log(theme)
  return StyleSheet.create({
    sectionLabel: {
    fontSize: theme.sizes.subtitle.fontSize,
    fontWeight: '600',
    letterSpacing: 0.6,
  
  },
  });
};
