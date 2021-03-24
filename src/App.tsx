import React from 'react';
import {} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from 'navigators/root-stack-navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <RootStack />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
