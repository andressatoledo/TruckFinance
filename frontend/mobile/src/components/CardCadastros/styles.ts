import { StyleSheet } from 'react-native';
import { ThemeType } from '../../theme/ThemeContext';

export const styles = (theme: ThemeType) => {
    
// const styleDefault = layout(theme);
  return StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundCard,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: theme.colors.backgroundCardDestaque ,
    alignItems: 'center',
    justifyContent: 'center',
  },

   icon: {
    color: theme.colors.detail, // sua cor base
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
    color:  theme.colors.text,
  },

  subtitle: {
    fontSize: 13,
    color:  theme.colors.opaco,
    marginTop: 2,
  },

  right: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  badge: {
    minWidth: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor:  theme.colors.backgroundCardDestaque,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },

  badgeText: {
    color:  theme.colors.text,
    fontSize: 13,
    fontWeight: '600',
  },

})};