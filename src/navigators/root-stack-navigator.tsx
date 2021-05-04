import { createStackNavigator } from '@react-navigation/stack';
import Homework from '@screens/homeword';
import React from 'react';
import BottomTabbar from './bottom-tabbar-navigator';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator mode={'modal'} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabbar" component={BottomTabbar} />
      <Stack.Screen name="Homework" component={Homework} />
      {/* <Stack.Screen name="AuthStack" component={AuthStack} /> */}
    </Stack.Navigator>
  );
};

export default RootStack;
