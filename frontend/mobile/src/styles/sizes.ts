import { StyleSheet } from 'react-native';

export const sizes = () => {
  return StyleSheet.create({
    header: {fontSize: 56},
    subHeader: {fontSize: 32},
    title: {fontSize: 24, fontWeight: '600', marginBottom: 16},
    subtitle: {fontSize: 20},
    text: {fontSize: 16},
    smallText: {fontSize: 14},
    mediumText: {fontSize: 18},
    largeText: {fontSize: 22},
    inputHeight: {height: 48},
    buttonHeight: {height: 48}
  });
};
