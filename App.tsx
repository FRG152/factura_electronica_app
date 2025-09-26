import React from 'react';
import { Colors } from './src';
import AuthNavigator from './src/navigation/AuthNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, useColorScheme } from 'react-native';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.primary}
      />
      <AuthNavigator />
    </SafeAreaProvider>
  );
}

export default App;
