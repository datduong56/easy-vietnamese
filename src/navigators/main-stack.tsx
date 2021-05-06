import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AuthStack from './auth-stack';
import BottomTabbar from './bottom-tabbar-navigator';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="BottomTabbar" component={BottomTabbar} />
    </Stack.Navigator>
  );
};

export default MainStack;
