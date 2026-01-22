import { StyleSheet } from 'react-native';
import { ThemeType } from '../../theme/ThemeContext';

export const styles = (theme: ThemeType) => {
    
// const styleDefault = layout(theme);
  return StyleSheet.create({
  card: {
    backgroundColor: theme.colors.backgroundCard,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    marginTop: 12,
    overflow: 'hidden',
  },

  centralizado: {
    flex: 1,
    padding: 16,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  container:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  principal: {
    color: theme.colors.detail,
    fontSize: theme.sizes.mediumText.fontSize,
  },

  secundario: {
    color: theme.colors.text,
    fontSize: theme.sizes.secundario.fontSize,
    },

   detalhe: {
    color: theme.colors.opaco,
    fontSize: theme.sizes.smallText.fontSize,
  },

  setas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '20%',
    marginTop: 8,
    backgroundColor: theme.colors.opaco,
  },

  setaPressionada: {
    opacity: 0.5,
    scaleX: 0.9,
    scaleY: 0.9,
  }

});

}