import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppNavigator } from './navigation/AppNavigator';

export const AppWrapper = () => {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
};
