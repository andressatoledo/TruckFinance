import { StyleSheet } from 'react-native';
import { ThemeType } from '../../theme/ThemeContext';

export const styles = (theme: ThemeType) =>
  StyleSheet.create({
    /* 🔹 Card geral */
    container: {
      backgroundColor: theme.colors.backgroundCard,
      borderRadius: 16,
      padding: 16,
      gap: 12,
    },

    /* 🔹 Header (setas + mês/ano) */
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 4,
    },

    headerTitle: {
      color: theme.colors.detail,
      fontSize: theme.sizes.largeText.fontSize,
      fontWeight: '600',
      textTransform: 'capitalize', // janeiro → Janeiro
    },

    /* 🔹 Texto do período */
    periodo: {
      color: theme.colors.text,
      fontSize: theme.sizes.smallText.fontSize,
      textAlign: 'center',
      opacity: 0.85,
    },

    /* 🔹 Calendário */
    calendar: {
      borderRadius: 12,
      overflow: 'hidden', // evita “vazar” do card
    },

    /* 🔹 Dia selecionado (caso use custom day) */
    daySelected: {
      backgroundColor: theme.colors.detail,
      borderRadius: 8,
    },

    dayTextSelected: {
      color: theme.colors.background,
      fontWeight: '600',
    },

    /* 🔹 Dia desabilitado */
    dayDisabled: {
      opacity: 0.4,
    },
  });
