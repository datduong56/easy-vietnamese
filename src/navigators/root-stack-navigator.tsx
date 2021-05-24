import { createStackNavigator } from '@react-navigation/stack';
import Homework from '@screens/homeword';
import Voice from '@screens/voice';
import React from 'react';
import MainStack from './main-stack';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator mode={'modal'} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainStack" component={MainStack} />
      <Stack.Screen name="Homework" component={Homework} />
      <Stack.Screen name="Voice" component={Voice} />
    </Stack.Navigator>
  );
};

export default RootStack;
