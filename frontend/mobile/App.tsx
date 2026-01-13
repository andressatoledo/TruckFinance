import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { ThemeProvider } from './src/theme/themeContext';
import { AppStack } from './src/navigation/appStack';

export default function App() {
  return (
    <ThemeProvider>
      <PaperProvider>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      </PaperProvider>
    </ThemeProvider>
  );
}
