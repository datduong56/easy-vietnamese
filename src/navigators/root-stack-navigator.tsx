import { createStackNavigator } from '@react-navigation/stack';
import Homework from '@screens/homeword';
import Picture from '@screens/picture';
import VideoPlayer from '@screens/video-player';
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
      <Stack.Screen name="Picture" component={Picture} />
      <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
    </Stack.Navigator>
  );
};

export default RootStack;
