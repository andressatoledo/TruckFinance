import { StyleSheet } from 'react-native';
import { ThemeType } from '../../theme/ThemeContext';
// import { layout } from '../../styles/layout';

export const styles = (theme: ThemeType) => {
    
// const styleDefault = layout(theme);
  return StyleSheet.create({
  card: {
    backgroundColor: theme.colors.backgroundCard,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    
  },
  cardPressable: {
    backgroundColor: theme.colors.backgroundCard,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },

  date: {
    fontSize: 12,
    color: theme.colors.text
  },

  route: {
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 8,
    color: theme.colors.text
  },

  valuesRow: {
    flexDirection: 'row',
    gap: 8,
  },

  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    color: theme.colors.text
  },
  calendar: {
    marginRight: 4,
    color: theme.colors.text
  },

  box: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    // backgroundColor: '#e6e6e6ff',
    alignItems: 'center',
  },
  blue: {
    backgroundColor: theme.colors.cardTonelada,
    color: theme.colors.cardToneladaText
  },
  green: {
    backgroundColor: theme.colors.cardFrete,
    color: theme.colors.cardFreteText
  },

  yellow: {
    backgroundColor: theme.colors.cardDiesel,
    color: theme.colors.cardDieselText
  },

  label: {
    fontSize: 12,
    color: '#e2e2e2ff',
  },

  value: {
    fontSize: 14,
    fontWeight: '600'
  },
})};