import { StyleSheet } from 'react-native';
import { ThemeType } from '../../theme/ThemeContext';

export const styles = (theme: ThemeType) => {
    
// const styleDefault = layout(theme);
  return StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.backgroundCard,
      borderRadius: 14,
      padding: 14,
      
      gap: 12,
    },

    icon: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.colors.backgroundCardDestaque,
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    pressableArea: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
},
    content: {
      flex: 1,
      paddingLeft: 10
    },

    title: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.text,
    },

    description: {
      fontSize: 13,
      color: theme.colors.opaco,
      marginTop: 2,
    },

    badge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
      borderWidth: 1,
      marginRight: 4,
    },

    badgeText: {
      fontSize: 12,
      fontWeight: '500',
    },
  });
}