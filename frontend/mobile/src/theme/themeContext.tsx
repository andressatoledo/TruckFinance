import React, { createContext, useContext, useState } from 'react';
import { lightTheme, darkTheme } from '../styles/theme';
import { useColorScheme } from 'react-native';

export type ThemeType = typeof lightTheme | typeof darkTheme;

type ThemeContextData = {
  theme: ThemeType;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    
    const scheme = useColorScheme() || 'light';
    const [theme, setTheme] = useState(
    scheme === 'dark' ? darkTheme : lightTheme
    );
    

  function toggleTheme() {
    setTheme((prev) => (prev.mode === 'light' ? darkTheme : lightTheme));
  }

  return <ThemeContext.Provider value = {{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;

}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
