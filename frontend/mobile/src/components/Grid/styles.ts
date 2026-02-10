import { StyleSheet } from 'react-native';
import { ThemeType } from '../../theme/ThemeContext';

export const useStyles = (theme: ThemeType) => {
  return StyleSheet.create({
    container: { marginVertical: 10 },

    actionText: { color: theme.colors.text },
    card: {
  backgroundColor: theme.colors.backgroundCard,
  borderRadius: 18,
  padding: 18,
  marginBottom: 18,

  borderLeftWidth: 4,
  borderLeftColor: theme.colors.primary,

  elevation: 4,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 12,
  // paddingVertical: 18,
},
    field: {
      marginBottom: 14,
    },

    label: {
      fontSize: theme.sizes.mediumText.fontSize,
      color: theme.colors.text,
      marginBottom: 4,
      letterSpacing: 0.4,
      
    },

    value: {
      fontSize: theme.sizes.mediumText.fontSize,
      color: theme.colors.text,
    },

    input: {
      borderWidth: 1,
      borderColor: theme.colors.primary,
      borderRadius: 8,
      padding: 10,
      fontSize: theme.sizes.mediumText.fontSize,
      color: theme.colors.text,
    },

    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 12,
    },

    editBtn: {
      backgroundColor: theme.colors.primary,
      padding: 12,
      borderRadius: 10,
      flex: 1,
      marginRight: 6,
      alignItems: 'center',
    },
    saveBtn: {
      backgroundColor: theme.colors.primary,
      padding: 12,
      borderRadius: 8,
      flex: 1,
      marginRight: 6,
      alignItems: 'center',
    },
    cancelBtn: {
      backgroundColor: theme.colors.error,
      padding: 12,
      borderRadius: 8,
      flex: 1,
      marginRight: 6,
      alignItems: 'center',
    },
    deleteBtn: {
      backgroundColor: theme.colors.error,
      padding: 12,
      borderRadius: 10,
      flex: 1,
      marginRight: 6,
      alignItems: 'center',
    },
  });
};
