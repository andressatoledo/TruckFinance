
import { StyleSheet } from 'react-native';
import { ThemeType } from '../../../theme/ThemeContext';
// import { layout } from '../../styles/layout';

export const styles = (theme: ThemeType,danger:boolean) => {
    
// const styleDefault = layout(theme);
  return StyleSheet.create({
    overlay: {
flex: 1,
backgroundColor: 'rgba(0,0,0,0.4)',
justifyContent: 'center',
alignItems: 'center',
padding: 20,
},
container: {
width: '100%',
backgroundColor: theme.colors.backgroundCard,
borderRadius: 16,
padding: 20,
},
title: {
fontSize: 18,
fontWeight: '600',
color: theme.colors.text,
marginBottom: 8,
},
description: {
fontSize: 14,
color: theme.colors.opaco,
marginBottom: 20,
},
actions: {
flexDirection: 'row',
justifyContent: 'flex-end',
gap: 12,
},
cancelBtn: {
paddingVertical: 10,
paddingHorizontal: 16,
borderRadius: 10,
backgroundColor: theme.colors.success,
},
confirmBtn: {
paddingVertical: 10,
paddingHorizontal: 16,
borderRadius: 10,
backgroundColor: danger
? theme.colors.error
: theme.colors.primary,
},
cancelText: {
color: theme.colors.text,
fontWeight: '500',
},
confirmText: {
color: '#fff',
fontWeight: '600',
},
})};
