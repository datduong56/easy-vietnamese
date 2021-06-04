import { createStackNavigator } from '@react-navigation/stack';
import StoriesList from '@screens/stories-list';
import StoryDetail from '@screens/story-detail';
import React from 'react';
import AuthStack from './auth-stack';
import BottomTabbar from './bottom-tabbar-navigator';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="BottomTabbar" component={BottomTabbar} />
      <Stack.Screen name="StoriesList" component={StoriesList} />
      <Stack.Screen name="StoryDetail" component={StoryDetail} />
    </Stack.Navigator>
  );
};

export default MainStack;
