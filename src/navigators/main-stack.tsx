import { createStackNavigator } from '@react-navigation/stack';
import StoriesList from '@screens/stories-list';
import StoryDetail from '@screens/story-detail';
import React from 'react';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import AuthStack from './auth-stack';
import BottomTabbar from './bottom-tabbar-navigator';

const Stack = createStackNavigator();

const MainStack = () => {
  const token = useSelector(state => state.auth.token);
  const error = useSelector(state => state.auth.error);

  useEffect(() => {
    if (error) {
      Alert.alert('Lỗi', error);
    }
  }, [error]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!token && <Stack.Screen name="AuthStack" component={AuthStack} />}
      {token && (
        <>
          <Stack.Screen name="BottomTabbar" component={BottomTabbar} />
          <Stack.Screen name="StoriesList" component={StoriesList} />
          <Stack.Screen name="StoryDetail" component={StoryDetail} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainStack;
