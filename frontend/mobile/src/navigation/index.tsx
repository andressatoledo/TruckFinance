import { enableScreens } from 'react-native-screens';
enableScreens();

import { NavigationContainer } from '@react-navigation/native';
import { AppStack } from './appStack';

export function Navigation() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
