import React from 'react';
import {} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from 'navigators/root-stack-navigator';

const App = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default App;
