import { StyleSheet } from 'react-native';
import { ThemeType } from '../../theme/ThemeContext';



export const styles = (theme: ThemeType) =>
  StyleSheet.create({
    tag: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 'auto',
      paddingHorizontal: 12,
      paddingVertical: 6,

      borderRadius: 999, 
      borderWidth: 1,
    
    },

    label: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.warning,
    },
  });
