import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BottomTabbar from './bottom-tabbar-navigator';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabbar" component={BottomTabbar} />
      {/* <Stack.Screen name="AuthStack" component={AuthStack} /> */}
    </Stack.Navigator>
  );
};

export default RootStack;
