import React from 'react';
import {} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from '@navigators/root-stack-navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from '@stores/index';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Provider store={store}>
          <RootStack />
        </Provider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
